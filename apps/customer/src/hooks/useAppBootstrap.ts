import {
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
} from "@expo-google-fonts/inter";
import { initI18n } from "@haulix/i18n";
import { customerLogger } from "@haulix/logger";
import { type AppBootstrapState, createBootstrapMachine } from "@haulix/utils";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";

// Maximum time to hold native splash screen before forced transition to degraded (safety watchdog)
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

	// Subscribe state changes
	useEffect(() => {
		return machine.subscribe((nextState) => {
			setStatus(nextState);
		});
	}, [machine]);

	// Step 1: Initialize i18n
	useEffect(() => {
		let mounted = true;
		initI18n("en")
			.then(() => {
				if (mounted) setI18nReady(true);
			})
			.catch((err) => {
				customerLogger.warn("Non-fatal i18n initialization warning", err);
				if (mounted) setI18nReady(true); // Graceful degradation
			});

		return () => {
			mounted = false;
		};
	}, []);

	// Step 2: Safety timeout watchdog to prevent infinite splash hang on low-end devices
	useEffect(() => {
		const timer = setTimeout(() => {
			if (machine.getState() === "bootstrapping") {
				customerLogger.warn(
					"App bootstrap watchdog timer elapsed — forcing splash dismissal",
				);
				machine.send("TIMEOUT");
				SplashScreen.hideAsync().catch(() => {});
			}
		}, BOOTSTRAP_TIMEOUT_MS);

		return () => clearTimeout(timer);
	}, [machine]);

	// Step 3: Evaluate state transitions
	useEffect(() => {
		if (machine.getState() !== "bootstrapping") return;

		if (fontError) {
			customerLogger.error(
				"Font loading encountered error — running in degraded mode",
				fontError,
			);
			machine.send("NON_FATAL_ERROR");
			SplashScreen.hideAsync().catch(() => {});
			return;
		}

		if (fontsLoaded && i18nReady) {
			machine.send("RESOURCES_LOADED");
		}
	}, [fontsLoaded, fontError, i18nReady, machine]);

	// Step 4: Dismiss splash on root view layout
	const onLayoutRootView = useCallback(async () => {
		if (status === "ready" || status === "degraded") {
			try {
				await SplashScreen.hideAsync();
				customerLogger.info("HAULIX Customer app ready", { status });
			} catch (err) {
				customerLogger.warn("Failed to hide native splash screen", err);
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
