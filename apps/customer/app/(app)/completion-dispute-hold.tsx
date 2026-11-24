/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Screen: Dispute Under Admin Review (W08 Canonical State: DISPUTE_HOLD)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 907:7316 (EN: "W08-EN / DISPUTE_HOLD · Dispute under Admin review")
 * - Frame ID: 907:10216 (ES: "W08-ES / DISPUTE_HOLD · Disputa bajo revisión de Admin")
 * - Parent Section: 902:6811 (EN) / 902:6812 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Capturable payment authorization is held; settlement is not automatic.
 * - Customer can inspect case details and authorization deadline safely.
 * - Zero route guards; unrestricted direct access.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	BackHandler,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	W08BookingCard,
	W08DecisionCard,
	W08Header,
	W08PrototypeDisclaimer,
	W08StatusBadge,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionDisputeHoldScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{
		previewLocale?: string;
		issueTopic?: string;
		issueDesc?: string;
	}>();

	const [caseModalVisible, setCaseModalVisible] = useState(false);
	const [deadlineModalVisible, setDeadlineModalVisible] = useState(false);

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/completion-issue",
				params: params.previewLocale
					? { previewLocale: params.previewLocale }
					: {},
			});
		}
	}, [router, params.previewLocale]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleReviewCaseDetails = useCallback(() => {
		setCaseModalVisible(true);
	}, []);

	const handleAuthorizationDeadline = useCallback(() => {
		setDeadlineModalVisible(true);
	}, []);

	const handleMyJobs = useCallback(() => {
		router.push({
			pathname: "/my-jobs",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
			<W08Header
				backA11y={t("w08DisputeHold.backA11y")}
				onBack={handleBack}
				testID="w08-dispute-hold-header"
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="w08-dispute-hold-scroll"
			>
				{/* Hero Section */}
				<View style={styles.heroSection}>
					<Text style={styles.heroTitle} testID="w08-dispute-hold-title">
						{t("w08DisputeHold.screenTitle")}
					</Text>
					<Text style={styles.heroSubtitle} testID="w08-dispute-hold-subtitle">
						{t("w08DisputeHold.screenSubtitle")}
					</Text>
				</View>

				{/* Status Badge */}
				<W08StatusBadge
					label={t("w08DisputeHold.badgeConfirmation")}
					testID="w08-dispute-hold-status-badge"
				/>

				{/* Booking Reference Card */}
				<W08BookingCard
					bookingRef={t("w08DisputeHold.bookingRef")}
					itemSummary={t("w08DisputeHold.itemSummary")}
					serviceCategory={t("w08DisputeHold.serviceCategory")}
					serviceSchedule={t("w08DisputeHold.serviceSchedule")}
					testID="w08-dispute-hold-booking-card"
				/>

				{/* 3-Step Decision Card */}
				<W08DecisionCard
					heading={t("w08DisputeHold.decisionHeading")}
					info1Label={t("w08DisputeHold.info1Label")}
					info1Text={t("w08DisputeHold.info1Text")}
					info2Label={t("w08DisputeHold.info2Label")}
					info2Text={t("w08DisputeHold.info2Text")}
					info3Label={t("w08DisputeHold.info3Label")}
					info3Text={t("w08DisputeHold.info3Text")}
					testID="w08-dispute-hold-decision-card"
				/>

				{/* Admin Review Active Alert */}
				<View style={styles.alertContainer} testID="w08-dispute-hold-notice">
					<View style={styles.alertBadge}>
						<Text style={styles.alertBadgeText}>
							{t("w08DisputeHold.holdNoticeHeading")}
						</Text>
					</View>
					<Text style={styles.alertDescription}>
						{t("w08DisputeHold.holdNoticeText")}
					</Text>
				</View>

				{/* Safeguard Deadline Box */}
				<View
					style={styles.safeguardContainer}
					testID="w08-dispute-hold-deadline-box"
				>
					<Text style={styles.safeguardHeading}>
						🛡️ {t("w08DisputeHold.deadlineNoticeHeading")}
					</Text>
					<Text style={styles.safeguardDescription}>
						{t("w08DisputeHold.deadlineNoticeText")}
					</Text>
				</View>

				{/* Actions */}
				<View style={styles.actionsSection}>
					<Pressable
						accessibilityLabel={t("w08DisputeHold.primaryCta")}
						accessibilityRole="button"
						onPress={handleReviewCaseDetails}
						style={styles.primaryButton}
						testID="w08-dispute-hold-primary-cta"
					>
						<Text style={styles.primaryButtonText}>
							{t("w08DisputeHold.primaryCta")}
						</Text>
					</Pressable>

					<Pressable
						accessibilityLabel={t("w08DisputeHold.secondaryCta")}
						accessibilityRole="button"
						onPress={handleAuthorizationDeadline}
						style={styles.secondaryButton}
						testID="w08-dispute-hold-secondary-cta"
					>
						<Text style={styles.secondaryButtonText}>
							{t("w08DisputeHold.secondaryCta")}
						</Text>
					</Pressable>

					<Pressable
						accessibilityLabel={t("w08DisputeHold.tertiaryLink")}
						accessibilityRole="button"
						onPress={handleMyJobs}
						style={styles.tertiaryLink}
						testID="w08-dispute-hold-tertiary-link"
					>
						<Text style={styles.tertiaryLinkText}>
							{t("w08DisputeHold.tertiaryLink")}
						</Text>
					</Pressable>
				</View>

				{/* Prototype Disclaimer */}
				<W08PrototypeDisclaimer
					text={t("w08DisputeHold.prototypeDisclaimer")}
					testID="w08-dispute-hold-disclaimer"
				/>
			</ScrollView>

			{/* Case Details Modal */}
			<Modal
				animationType="fade"
				onRequestClose={() => setCaseModalVisible(false)}
				transparent
				visible={caseModalVisible}
			>
				<View style={styles.modalBackdrop}>
					<View style={styles.modalContent} testID="w08-case-modal">
						<Text style={styles.modalEmoji}>📋</Text>
						<Text style={styles.modalTitle}>
							{t("w08DisputeHold.screenTitle")}
						</Text>
						<View style={styles.modalCaseDetails}>
							<Text style={styles.caseDetailRow}>
								<Text style={styles.caseDetailLabel}>Reference: </Text>
								<Text style={styles.caseDetailValue}>HX-AZ-DEMO-0042</Text>
							</Text>
							<Text style={styles.caseDetailRow}>
								<Text style={styles.caseDetailLabel}>Status: </Text>
								<Text style={styles.caseDetailValue}>ADMIN_REVIEW_PENDING</Text>
							</Text>
							<Text style={styles.caseDetailRow}>
								<Text style={styles.caseDetailLabel}>Payment Hold: </Text>
								<Text style={styles.caseDetailValue}>
									$356.00 (Captured hold paused)
								</Text>
							</Text>
							{params.issueTopic ? (
								<Text style={styles.caseDetailRow}>
									<Text style={styles.caseDetailLabel}>Issue Topic: </Text>
									<Text style={styles.caseDetailValue}>
										{params.issueTopic}
									</Text>
								</Text>
							) : null}
							{params.issueDesc ? (
								<Text style={styles.caseDetailRow}>
									<Text style={styles.caseDetailLabel}>Note: </Text>
									<Text style={styles.caseDetailValue}>{params.issueDesc}</Text>
								</Text>
							) : null}
						</View>
						<Pressable
							accessibilityRole="button"
							onPress={() => setCaseModalVisible(false)}
							style={styles.modalCloseButton}
							testID="w08-case-modal-close"
						>
							<Text style={styles.modalCloseButtonText}>
								{t("w08DisputeHold.modalClose")}
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{/* Deadline Info Modal */}
			<Modal
				animationType="fade"
				onRequestClose={() => setDeadlineModalVisible(false)}
				transparent
				visible={deadlineModalVisible}
			>
				<View style={styles.modalBackdrop}>
					<View style={styles.modalContent} testID="w08-deadline-modal">
						<Text style={styles.modalEmoji}>⏳</Text>
						<Text style={styles.modalTitle}>
							{t("w08DisputeHold.deadlineNoticeHeading")}
						</Text>
						<Text style={styles.modalDescription}>
							{t("w08DisputeHold.deadlineNoticeText")}
						</Text>
						<Pressable
							accessibilityRole="button"
							onPress={() => setDeadlineModalVisible(false)}
							style={styles.modalCloseButton}
							testID="w08-deadline-modal-close"
						>
							<Text style={styles.modalCloseButtonText}>
								{t("w08DisputeHold.modalClose")}
							</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: colors.background,
		flex: 1,
	},
	scrollContent: {
		gap: 16,
		paddingBottom: 40,
		paddingHorizontal: 20,
		paddingTop: 12,
	},
	heroSection: {
		gap: 6,
	},
	heroTitle: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 26,
		lineHeight: 32,
	},
	heroSubtitle: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 18,
	},
	alertContainer: {
		backgroundColor: "rgba(239, 68, 68, 0.08)",
		borderColor: "rgba(239, 68, 68, 0.3)",
		borderRadius: 16,
		borderWidth: 1,
		gap: 8,
		padding: 16,
	},
	alertBadge: {
		alignSelf: "flex-start",
		backgroundColor: "rgba(239, 68, 68, 0.15)",
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	alertBadgeText: {
		color: "#EF4444",
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
	},
	alertDescription: {
		color: colors.primaryText,
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 18,
	},
	safeguardContainer: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 16,
		borderWidth: 1,
		gap: 6,
		padding: 16,
	},
	safeguardHeading: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
	},
	safeguardDescription: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 17,
	},
	actionsSection: {
		gap: 10,
		marginTop: 4,
	},
	primaryButton: {
		alignItems: "center",
		backgroundColor: colors.brand,
		borderRadius: 12,
		height: 52,
		justifyContent: "center",
	},
	primaryButtonText: {
		color: colors.background,
		fontFamily: fontFamily.bold,
		fontSize: 14,
	},
	secondaryButton: {
		alignItems: "center",
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 12,
		borderWidth: 1,
		height: 52,
		justifyContent: "center",
	},
	secondaryButtonText: {
		color: colors.brand,
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
	},
	tertiaryLink: {
		alignItems: "center",
		paddingVertical: 4,
	},
	tertiaryLinkText: {
		color: colors.brand,
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
	},
	modalBackdrop: {
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.75)",
		flex: 1,
		justifyContent: "center",
		padding: 24,
	},
	modalContent: {
		alignItems: "center",
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 20,
		borderWidth: 1,
		gap: 12,
		padding: 24,
		width: "100%",
	},
	modalEmoji: {
		fontSize: 48,
	},
	modalTitle: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 16,
		textAlign: "center",
	},
	modalCaseDetails: {
		backgroundColor: colors.background,
		borderColor: colors.elevated,
		borderRadius: 12,
		borderWidth: 1,
		gap: 6,
		padding: 12,
		width: "100%",
	},
	caseDetailRow: {
		fontSize: 12,
		lineHeight: 18,
	},
	caseDetailLabel: {
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
	},
	caseDetailValue: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
	},
	modalDescription: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		textAlign: "center",
	},
	modalCloseButton: {
		alignItems: "center",
		backgroundColor: colors.brand,
		borderRadius: 10,
		height: 44,
		justifyContent: "center",
		marginTop: 8,
		width: "100%",
	},
	modalCloseButtonText: {
		color: colors.background,
		fontFamily: fontFamily.bold,
		fontSize: 14,
	},
});
