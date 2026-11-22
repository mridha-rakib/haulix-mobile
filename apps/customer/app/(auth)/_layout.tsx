import { Stack } from "expo-router";

/**
 * Auth route group layout.
 * No bottom navigation shown here — authentication screens are full-screen only.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}
