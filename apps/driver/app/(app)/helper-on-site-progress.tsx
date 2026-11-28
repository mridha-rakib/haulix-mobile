import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	AlertTriangleIcon,
	CheckmarkIcon,
	ChevronLeftIcon,
	PackageCubeIcon,
	ShieldCheckIcon,
} from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import { useServiceProgressStore } from "../../src/stores/serviceProgressStore";

export default function HelperOnSiteProgressScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { activeJobId, getServiceProgress } = useServiceProgressStore();
	const progress = getServiceProgress(activeJobId);
	const [infoMessage, setInfoMessage] = useState<string | null>(null);

	const handleBack = () => {
		router.push("/(app)/helper-active-job" as Href);
	};

	const handleCaptureEvidence = () => {
		const notice = t("driver.helperOnSiteProgress.previewDependencyNotice");
		setInfoMessage(notice);
		Alert.alert("DW-F07 Dependency", notice, [
			{ text: "OK", onPress: () => setInfoMessage(null) },
		]);
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
						{t("driver.helperOnSiteProgress.title")}
					</Text>
					<Text style={styles.subtitle}>
						{t("driver.helperOnSiteProgress.subtitle")}
					</Text>
				</View>

				{/* Card 1: On site · Example */}
				<View style={styles.cardLarge}>
					<View style={styles.cardHeaderRow}>
						<View style={styles.cardIconWrap}>
							<CheckmarkIcon size={22} color="#BAFF42" />
						</View>
						<Text style={styles.cardTitle}>
							{t("driver.helperOnSiteProgress.onSiteTitle")}
						</Text>
					</View>
					<Text style={styles.cardDesc}>
						{t("driver.helperOnSiteProgress.onSiteDesc")}
					</Text>
				</View>

				{/* Card 2: Assigned tasks */}
				<View style={styles.cardLarge}>
					<View style={styles.cardHeaderRow}>
						<View style={styles.cardIconWrap}>
							<PackageCubeIcon size={22} color="#BAFF42" />
						</View>
						<Text style={styles.cardTitle}>
							{t("driver.helperOnSiteProgress.assignedTasksTitle")}
						</Text>
					</View>
					<Text style={styles.cardDesc}>
						{t("driver.helperOnSiteProgress.assignedTasksDesc")}
					</Text>
				</View>

				{/* Card 3: Safety confirmation */}
				<View style={styles.cardLarge}>
					<View style={styles.cardHeaderRow}>
						<View style={styles.cardIconWrap}>
							<ShieldCheckIcon size={22} color="#BAFF42" />
						</View>
						<Text style={styles.cardTitle}>
							{t("driver.helperOnSiteProgress.safetyTitle")}
						</Text>
					</View>
					<Text style={styles.cardDesc}>
						{t("driver.helperOnSiteProgress.safetyDesc")}
					</Text>
				</View>

				{/* Card 4: No unilateral completion */}
				<View style={styles.cardLarge}>
					<View style={styles.cardHeaderRow}>
						<View style={styles.cardIconWrap}>
							<AlertTriangleIcon size={22} color="#BAFF42" />
						</View>
						<Text style={styles.cardTitle}>
							{t("driver.helperOnSiteProgress.noUnilateralTitle")}
						</Text>
					</View>
					<Text style={styles.cardDesc}>
						{t("driver.helperOnSiteProgress.noUnilateralDesc")}
					</Text>
				</View>

				{/* Temporary in-UI dependency notification if alert dismissed */}
				{infoMessage && (
					<View style={styles.dependencyCard}>
						<Text style={styles.dependencyText}>{infoMessage}</Text>
					</View>
				)}

				<View style={{ height: spacing[3] }} />

				{/* Action Button */}
				<View style={styles.actionsContainer}>
					<Pressable
						onPress={handleCaptureEvidence}
						style={{
							backgroundColor: "#BAFF42",
							borderRadius: 16,
							paddingVertical: 14,
							alignItems: "center",
							justifyContent: "center",
						}}
						accessibilityRole="button"
						accessibilityLabel={t(
							"driver.helperOnSiteProgress.captureEvidenceCta",
						)}
					>
						<Text
							style={{
								fontFamily: "Inter_700Bold",
								fontSize: 14,
								color: "#080B0B",
								letterSpacing: 0.3,
							}}
						>
							{t("driver.helperOnSiteProgress.captureEvidenceCta")}
						</Text>
					</Pressable>
				</View>
			</ScrollView>

			{/* 5-Tab Bar (Figma DW63: Jobs Tab Active) */}
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
	dependencyCard: {
		backgroundColor: "#1C2420",
		borderWidth: 1,
		borderColor: "#BAFF42",
		borderRadius: 12,
		padding: spacing[3],
		marginBottom: spacing[3],
	},
	dependencyText: {
		fontFamily: "Inter_500Medium",
		fontSize: 12,
		color: "#BAFF42",
		textAlign: "center",
	},
	actionsContainer: {
		marginBottom: spacing[3],
	},
});
