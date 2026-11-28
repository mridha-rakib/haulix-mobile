import { Tabs } from "expo-router";
import { DriverBottomNav } from "../../../src/components/navigation/DriverBottomNav";

export default function TabsLayout() {
	return (
		<Tabs
			tabBar={() => <DriverBottomNav />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="jobs" />
			<Tabs.Screen name="earnings" />
			<Tabs.Screen name="messages" />
			<Tabs.Screen name="profile" />
		</Tabs>
	);
}
