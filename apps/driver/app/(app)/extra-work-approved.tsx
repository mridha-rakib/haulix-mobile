import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	CheckmarkIcon,
	ChevronLeftIcon,
	ShieldCheckIcon,
} from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import { useServiceProgressStore } from "../../src/stores/serviceProgressStore";

export default function ExtraWorkApprovedScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { activeRequestId, applyApprovedScope } = useServiceProgressStore();

	const handleBack = () => {
		router.push("/(app)/extra-work-pending" as Href);
	};

	const handleBackToProgress = () => {
		if (activeRequestId) {
			applyApprovedScope(activeRequestId);
		}
		router.push("/(app)/on-site-progress" as Href);
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Top Header */}
				<View style={styles.header}>
					<Pressable
						onPress={handleBack}
						style={styles.backButton}
						accessibilityRole="button"
						accessibilityLabel="Back"
					>
						<ChevronLeftIcon size={24} color="#F6F8F6" />
					</Pressable>
					<Text style={styles.title}>
						{t("driver.extraWorkApproved.title")}
					</Text>
					<Text style={styles.subtitle}>
						{t("driver.extraWorkApproved.subtitle")}
					</Text>
				</View>

				{/* Card 1: Both Approvals Recorded */}
				<View style={styles.cardLarge}>
					<View style={styles.cardHeaderRow}>
						<View style={styles.cardIconWrap}>
							<CheckmarkIcon size={22} color="#BAFF42" />
						</View>
						<Text style={styles.cardTitle}>
							{t("driver.extraWorkApproved.bothRecordedTitle")}
						</Text>
					</View>
					<Text style={styles.cardDesc}>
						{t("driver.extraWorkApproved.bothRecordedDesc")}
					</Text>

					<View style={styles.approvalsBadgeRow}>
						<View style={styles.approvalBadge}>
							<CheckmarkIcon size={14} color="#080B0B" />
							<Text style={styles.approvalBadgeText}>ADMIN APPROVED</Text>
						</View>
						<View style={styles.approvalBadge}>
							<CheckmarkIcon size={14} color="#080B0B" />
							<Text style={styles.approvalBadgeText}>CUSTOMER ACCEPTED</Text>
						</View>
					</View>
				</View>

				{/* Card 2: Continue Safely */}
				<View style={styles.cardLarge}>
					<View style={styles.cardHeaderRow}>
						<View style={styles.cardIconWrap}>
							<ShieldCheckIcon size={22} color="#BAFF42" />
						</View>
						<Text style={styles.cardTitle}>
							{t("driver.extraWorkApproved.continueSafelyTitle")}
						</Text>
					</View>
					<Text style={styles.cardDesc}>
						{t("driver.extraWorkApproved.continueSafelyDesc")}
					</Text>
				</View>

				<View style={{ height: spacing[4] }} />

				{/* Action Button */}
				<View style={styles.actionsContainer}>
					<Pressable
						onPress={handleBackToProgress}
						style={{
							backgroundColor: "#BAFF42",
							borderRadius: 16,
							paddingVertical: 14,
							alignItems: "center",
							justifyContent: "center",
						}}
						accessibilityRole="button"
						accessibilityLabel={t("driver.extraWorkApproved.backToProgressCta")}
					>
						<Text
							style={{
								fontFamily: "Inter_700Bold",
								fontSize: 14,
								color: "#080B0B",
								letterSpacing: 0.3,
							}}
						>
							{t("driver.extraWorkApproved.backToProgressCta")}
						</Text>
					</Pressable>
				</View>
			</ScrollView>

			{/* 5-Tab Bar (Figma DW52: Jobs Tab Active) */}
			<DriverBottomNav activeTab="jobs" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	scrollContent: {
		paddingHorizontal: spacing[4],
		paddingTop: spacing[2],
		paddingBottom: spacing[4],
	},
	header: {
		marginBottom: spacing[3],
	},
	backButton: {
		marginBottom: spacing[2],
		alignSelf: "flex-start",
	},
	title: {
		fontFamily: "Inter_700Bold",
		fontSize: 24,
		color: "#F6F8F6",
	},
	subtitle: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#9EA8A3",
		marginTop: 4,
	},
	cardLarge: {
		backgroundColor: "#131917",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#232D29",
		padding: spacing[4],
		marginBottom: spacing[3],
	},
	cardHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing[2],
	},
	cardIconWrap: {
		width: 40,
		height: 40,
		borderRadius: 10,
		backgroundColor: "rgba(186, 255, 66, 0.1)",
		justifyContent: "center",
		alignItems: "center",
		marginRight: spacing[3],
	},
	cardTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 16,
		color: "#F6F8F6",
		flex: 1,
	},
	cardDesc: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#A2AEA8",
		lineHeight: 18,
	},
	approvalsBadgeRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: spacing[3],
		paddingTop: spacing[2],
		borderTopWidth: 1,
		borderTopColor: "rgba(255, 255, 255, 0.06)",
	},
	approvalBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#BAFF42",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 8,
		gap: 5,
	},
	approvalBadgeText: {
		fontFamily: "Inter_700Bold",
		fontSize: 11,
		color: "#080B0B",
		letterSpacing: 0.4,
	},
	actionsContainer: {
		marginBottom: spacing[3],
	},
});
