import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  // ─── Identity ───────────────────────────────────────────────────────────────
  // NOTE: Identifiers below are PROPOSED placeholders, pending ownership confirmation.
  name: "HAULIX",
  slug: "haulix-customer",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "haulix-customer",

  // ─── Icons & Splash ─────────────────────────────────────────────────────────
  icon: "./assets/branding/icon.png",
  userInterfaceStyle: "dark",

  // ─── Platform ───────────────────────────────────────────────────────────────
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.haulix.customer", // PROPOSED — pending ownership confirmation
    buildNumber: "1",
    icon: "./assets/branding/icon.png",
  },
  android: {
    package: "com.haulix.customer", // PROPOSED — pending ownership confirmation
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
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you select a profile photo for QA preview.",
        cameraPermission:
          "The app accesses your camera to let you take a profile photo for QA preview.",
      },
    ],
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
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? "d414e6fe-00cc-40df-97e2-af4f3e2027c8",
    },
  },
});
