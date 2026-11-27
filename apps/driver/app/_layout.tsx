import "../global.css";
import "@haulix/logger";
import { colors } from "@haulix/design-tokens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useGlobalSearchParams } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DriverDemoScreenNavigator } from "../src/components/demo/DriverDemoScreenNavigator";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
import { useAppBootstrap } from "../src/hooks/useAppBootstrap";
import { changeLocale } from "../src/i18n";

import { useDriverAuthStore } from "../src/stores/authStore";
import { useDispatchCrewStore } from "../src/stores/dispatchCrewStore";

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync();

function DemoParamsWatcher() {
  const params = useGlobalSearchParams<{
    lang?: string;
    role?: string;
    scenario?: string;
    clean?: string;
  }>();
  const setRole = useDriverAuthStore((s) => s.setRole);
  const setCleanMode = useDriverAuthStore((s) => s.setCleanMode);
  const setScenario = useDispatchCrewStore((s) => s.setScenario);

  useEffect(() => {
    if (params.lang === "es" || params.lang === "en") {
      changeLocale(params.lang);
    }
    if (params.role === "PRIMARY_DRIVER" || params.role === "HELPER") {
      setRole(params.role);
    }
    if (params.scenario) {
      setScenario(params.scenario as Parameters<typeof setScenario>[0]);
    }
    if (params.clean === "1") {
      setCleanMode(true);
    } else if (params.clean === "0") {
      setCleanMode(false);
    }
  }, [params.lang, params.role, params.scenario, params.clean, setRole, setCleanMode, setScenario]);

  return null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  const { isReady, onLayoutRootView } = useAppBootstrap();

  if (!isReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <View style={{ flex: 1, backgroundColor: colors.background }} onLayout={onLayoutRootView}>
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
                animation: "fade",
              }}
            />
            <DemoParamsWatcher />
            <DriverDemoScreenNavigator />
          </View>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
