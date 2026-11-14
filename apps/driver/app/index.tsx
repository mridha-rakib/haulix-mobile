import { Redirect } from "expo-router";

/**
 * Root index — redirects to driver auth entry.
 * Role assignment (Primary Driver vs Helper) is determined by the backend only.
 */
export default function RootIndex() {
  return <Redirect href="/(auth)/welcome" />;
}
