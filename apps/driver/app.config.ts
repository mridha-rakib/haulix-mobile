import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  // ─── Identity ───────────────────────────────────────────────────────────────
  // NOTE: Identifiers below are PROPOSED placeholders, pending ownership confirmation.
  name: "HAULIX Driver & Worker",
  slug: "haulix-driver",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "haulix-driver",

  // ─── Icons & Splash ─────────────────────────────────────────────────────────
  icon: "./assets/branding/icon.png",
  userInterfaceStyle: "dark",

  // ─── Platform ───────────────────────────────────────────────────────────────
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.haulix.driver", // PROPOSED — pending ownership confirmation
    buildNumber: "1",
    icon: "./assets/branding/icon.png",
  },
  android: {
    package: "com.haulix.driver", // PROPOSED — pending ownership confirmation
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/branding/adaptive-icon.png",
      backgroundColor: "#080B0B",
      monochromeImage: "./assets/branding/monochrome-icon.png",
    },
  },
  web: {
    favicon: "./assets/branding/favicon.png",
    bundler: "metro",
  },

  // ─── Expo Router ────────────────────────────────────────────────────────────
  plugins: [
    "expo-router",
    "expo-font",
    "expo-secure-store",
    [
      "expo-splash-screen",
      {
        image: "./assets/branding/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#080B0B",
        dark: {
          image: "./assets/branding/splash-icon.png",
          backgroundColor: "#080B0B",
        },
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },

  // ─── Extra config (safe — public only) ──────────────────────────────────────
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? "",
    appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? "development",
    driverRoleSource: "SERVER_AUTHORITATIVE", // Role assignment always comes from backend
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? "b3505d80-1384-46fe-a530-e0985c515560",
    },
  },
});
