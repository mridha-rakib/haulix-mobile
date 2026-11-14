import { Stack } from "expo-router";

/**
 * Protected app route group.
 * Only accessible when authenticated (enforced by server-side session).
 */
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
  );
}
