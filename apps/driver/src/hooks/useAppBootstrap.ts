import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { driverLogger } from "@haulix/logger";
import { type AppBootstrapState, createBootstrapMachine } from "@haulix/utils";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";
import { initDriverI18n } from "../i18n";

const BOOTSTRAP_TIMEOUT_MS = 4000;

export interface BootstrapResult {
  status: AppBootstrapState;
  isReady: boolean;
  onLayoutRootView: () => Promise<void>;
  error?: Error;
}

export function useAppBootstrap(): BootstrapResult {
  const machine = useMemo(() => createBootstrapMachine(), []);
  const [status, setStatus] = useState<AppBootstrapState>(machine.getState());
  const [i18nReady, setI18nReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    return machine.subscribe((nextState) => {
      setStatus(nextState);
    });
  }, [machine]);

  useEffect(() => {
    let mounted = true;
    initDriverI18n("en")
      .then(() => {
        if (mounted) setI18nReady(true);
      })
      .catch((err) => {
        driverLogger.warn("Non-fatal i18n initialization warning", err);
        if (mounted) setI18nReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (machine.getState() === "bootstrapping") {
        driverLogger.warn("Driver app bootstrap watchdog timer elapsed — forcing splash dismissal");
        machine.send("TIMEOUT");
        SplashScreen.hideAsync().catch(() => {});
      }
    }, BOOTSTRAP_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [machine]);

  useEffect(() => {
    if (machine.getState() !== "bootstrapping") return;

    if (fontError) {
      driverLogger.error("Font loading encountered error — running in degraded mode", fontError);
      machine.send("NON_FATAL_ERROR");
      SplashScreen.hideAsync().catch(() => {});
      return;
    }

    if (fontsLoaded && i18nReady) {
      machine.send("RESOURCES_LOADED");
    }
  }, [fontsLoaded, fontError, i18nReady, machine]);

  const onLayoutRootView = useCallback(async () => {
    if (status === "ready" || status === "degraded") {
      try {
        await SplashScreen.hideAsync();
        driverLogger.info("HAULIX Driver app ready", { status });
      } catch (err) {
        driverLogger.warn("Failed to hide native splash screen", err);
      }
    }
  }, [status]);

  const isReady = status === "ready" || status === "degraded";

  return {
    status,
    isReady,
    onLayoutRootView,
    error: fontError ?? undefined,
  };
}
