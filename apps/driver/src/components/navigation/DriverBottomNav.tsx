import { spacing } from "@haulix/design-tokens";
import { type Href, usePathname, useRouter } from "expo-router";
import type React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../i18n";
import {
	TabEarningsIcon,
	TabHomeIcon,
	TabJobsIcon,
	TabMessagesIcon,
	TabProfileIcon,
} from "../icons/DriverIcons";

export interface TabItem {
	key: string;
	label: string;
	route: string;
	icon: (active: boolean) => React.ReactNode;
}

export interface DriverBottomNavProps {
	activeTab?: "home" | "jobs" | "earnings" | "messages" | "profile";
	activeTabOverride?: "home" | "jobs" | "earnings" | "messages" | "profile";
}

export function DriverBottomNav({
	activeTab,
	activeTabOverride,
}: DriverBottomNavProps = {}) {
	const router = useRouter();
	const pathname = usePathname();
	const insets = useSafeAreaInsets();
	const { t } = useDriverTranslation();
	const override = activeTab || activeTabOverride;

	const tabs: TabItem[] = [
		{
			key: "home",
			label: t("driver.tabs.home", "Home"),
			route: "/(app)/(tabs)",
			icon: (active) => <TabHomeIcon active={active} size={22} />,
		},
		{
			key: "jobs",
			label: t("driver.tabs.jobs", "Jobs"),
			route: "/(app)/(tabs)/jobs",
			icon: (active) => <TabJobsIcon active={active} size={22} />,
		},
		{
			key: "earnings",
			label: t("driver.tabs.earnings", "Earnings"),
			route: "/(app)/(tabs)/earnings",
			icon: (active) => <TabEarningsIcon active={active} size={22} />,
		},
		{
			key: "messages",
			label: t("driver.tabs.messages", "Messages"),
			route: "/(app)/(tabs)/messages",
			icon: (active) => <TabMessagesIcon active={active} size={22} />,
		},
		{
			key: "profile",
			label: t("driver.tabs.profile", "Profile"),
			route: "/(app)/(tabs)/profile",
			icon: (active) => <TabProfileIcon active={active} size={22} />,
		},
	];

	const isTabActive = (tab: TabItem) => {
		if (override) {
			return override === tab.key;
		}
		if (tab.key === "home") {
			return (
				pathname === "/(app)/(tabs)" ||
				pathname === "/(app)/(tabs)/" ||
				pathname === "/"
			);
		}
		return pathname.includes(tab.key);
	};

	return (
		<View
			style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}
		>
			<View style={styles.tabsRow}>
				{tabs.map((tab) => {
					const active = isTabActive(tab);
					return (
						<Pressable
							key={tab.key}
							onPress={() => router.push(tab.route as Href)}
							style={styles.tabButton}
							accessibilityRole="tab"
							accessibilityState={{ selected: active }}
						>
							<View style={styles.iconContainer}>{tab.icon(active)}</View>
							<Text
								style={[
									styles.tabLabel,
									active ? styles.tabLabelActive : styles.tabLabelInactive,
								]}
							>
								{tab.label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#0D1111",
		borderTopWidth: 1,
		borderTopColor: "#222B27",
		paddingTop: spacing[2],
	},
	tabsRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	tabButton: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing[1],
	},
	iconContainer: {
		height: 26,
		alignItems: "center",
		justifyContent: "center",
	},
	tabLabel: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 10,
		marginTop: 3,
		letterSpacing: 0.2,
	},
	tabLabelActive: {
		color: "#BAFF42",
	},
	tabLabelInactive: {
		color: "#8E9E99",
	},
});
