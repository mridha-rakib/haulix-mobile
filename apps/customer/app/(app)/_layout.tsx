import { Stack } from "expo-router";

/**
 * App route group.
 * Phase 03.47C: Unguarded frontend preview mode — all screens remain directly
 * accessible without mock tokens or backend blockers.
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
