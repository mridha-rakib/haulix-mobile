import { Redirect } from "expo-router";

/**
 * Root index — redirects to the auth entry point.
 * Authentication state is determined server-side; this is a routing stub only.
 */
export default function RootIndex() {
  return <Redirect href="/(auth)/sign-in" />;
}
