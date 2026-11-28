import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function VerificationActionScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { role } = useDriverAuthStore();
	const [supportModalVisible, setSupportModalVisible] = useState(false);

	const handleResubmit = () => {
		if (role === "PRIMARY_DRIVER") {
			router.push("/(auth)/driver-documents");
		} else {
			router.push("/(auth)/helper-verification");
		}
	};

	const handleContactSupport = () => {
		setSupportModalVisible(true);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.verificationAction.title")}
				subtitle={t("driver.verificationAction.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Action Required Banner Card */}
				<View style={styles.actionBannerCard}>
					<View style={styles.actionBadge}>
						<Text style={styles.actionBadgeText}>
							{t("driver.verificationAction.actionRequiredBadge")}
						</Text>
					</View>
					<Text style={styles.bannerTitle}>
						{t("driver.verificationAction.bannerTitle")}
					</Text>
					<Text style={styles.bannerSub}>
						{t("driver.verificationAction.bannerSub")}
					</Text>
				</View>

				<View style={{ height: spacing[3] }} />

				{/* Detail Item 1: Identity Document */}
				<View style={styles.detailCard}>
					<Text style={styles.detailTitle}>
						{t("driver.verificationAction.itemIdentityTitle")}
					</Text>
					<Text style={styles.detailSub}>
						{t("driver.verificationAction.itemIdentitySub")}
					</Text>
				</View>

				<View style={{ height: spacing[2.5] }} />

				{/* Detail Item 2: Eligibility State */}
				<View style={styles.detailCard}>
					<Text style={styles.detailTitle}>
						{t("driver.verificationAction.itemEligibilityTitle")}
					</Text>
					<Text style={styles.detailSub}>
						{t("driver.verificationAction.itemEligibilitySub")}
					</Text>
				</View>

				<View style={{ height: spacing[4] }} />

				{/* Monorepo Policy Callout */}
				<InfoCard
					title={t("driver.verificationAction.noBypassTitle")}
					body={t("driver.verificationAction.noBypassBody")}
					variant="highlight"
				/>

				<View style={{ height: spacing[6] }} />

				{/* Action CTAs */}
				<ActionCtaButton
					label={t("driver.verificationAction.resubmitCta")}
					onPress={handleResubmit}
					variant="primary"
					size="large"
				/>

				<View style={{ height: spacing[3] }} />

				<ActionCtaButton
					label={t("driver.verificationAction.contactSupportCta")}
					onPress={handleContactSupport}
					variant="outline"
					size="large"
				/>
			</ScrollView>

			{/* Support Dependency Disclosure Modal (Phase DW-F09) */}
			<Modal
				visible={supportModalVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setSupportModalVisible(false)}
			>
				<View style={styles.modalBackdrop}>
					<View style={styles.modalCard}>
						<View style={styles.modalTag}>
							<Text style={styles.modalTagText}>DW-F09 DEPENDENCY</Text>
						</View>
						<Text style={styles.modalTitle}>Support & Dispute Center</Text>
						<Text style={styles.modalBody}>
							Live support ticketing and dispute handling are scheduled for
							Milestone DW-F09 (Profile, History, Safety & Support · Screen
							DW26/DW40).
							{"\n\n"}
							In this preview, you can test document re-upload by tapping
							"Resubmit documents" or switch verification scenarios in the QA
							Navigator.
						</Text>
						<Pressable
							onPress={() => setSupportModalVisible(false)}
							style={({ pressed }) => [
								styles.modalCloseBtn,
								pressed && styles.btnPressed,
							]}
						>
							<Text style={styles.modalCloseText}>Got it · Close Preview</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
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
		paddingBottom: spacing[8],
	},
	actionBannerCard: {
		backgroundColor: "#1C1414",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#4A2020",
	},
	actionBadge: {
		backgroundColor: "#3A1A1A",
		paddingHorizontal: spacing[2.5],
		paddingVertical: spacing[1],
		borderRadius: radius.full,
		alignSelf: "flex-start",
		marginBottom: spacing[2.5],
	},
	actionBadgeText: {
		fontFamily: "Inter_700Bold",
		fontSize: 10,
		color: "#FF6B6B",
		letterSpacing: 0.5,
	},
	bannerTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 18,
		color: "#F6F8F6",
		marginBottom: spacing[1],
	},
	bannerSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#ADB8B0",
		lineHeight: 18,
	},
	detailCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.lg,
		padding: spacing[3],
		borderWidth: 1,
		borderColor: "#232C28",
	},
	detailTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
		marginBottom: 2,
	},
	detailSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#8E9E99",
	},
	modalBackdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		justifyContent: "center",
		alignItems: "center",
		padding: spacing[4],
	},
	modalCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[5],
		borderWidth: 1,
		borderColor: "#2B3532",
		width: "100%",
		maxWidth: 380,
	},
	modalTag: {
		backgroundColor: "#202826",
		paddingHorizontal: spacing[2.5],
		paddingVertical: 3,
		borderRadius: radius.sm,
		alignSelf: "flex-start",
		marginBottom: spacing[3],
	},
	modalTagText: {
		fontFamily: "Inter_700Bold",
		fontSize: 10,
		color: "#BAFF42",
		letterSpacing: 0.5,
	},
	modalTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 18,
		color: "#F6F8F6",
		marginBottom: spacing[2],
	},
	modalBody: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#ADB8B0",
		lineHeight: 20,
		marginBottom: spacing[5],
	},
	modalCloseBtn: {
		backgroundColor: "#BAFF42",
		paddingVertical: spacing[3],
		borderRadius: radius.full,
		alignItems: "center",
	},
	modalCloseText: {
		fontFamily: "Inter_700Bold",
		fontSize: 14,
		color: "#080B0B",
	},
	btnPressed: {
		opacity: 0.85,
	},
});
