/**
 * HAULIX Customer Mobile App — Phase 03.40
 * Screen C31-P: Checking Booking Status (Booking Queue Demonstration)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:1021 (430 × 1027 px)
 * - Spanish Variant: Node 766:1407 (430 × 1060 px)
 *
 * Upstream Entry:
 * - From C30-CA (/new-authorization-consent) via "Check booking status" CTA.
 * - From C29-P (/payment-authorization-pending) via "Simulate successful hold completion" action.
 *
 * CRITICAL BACKEND BOUNDARY & ZERO MOCK POLLING:
 * - Pure frontend demonstration of the booking verification queue.
 * - Does NOT make backend API calls, create database bookings, or dispatch drivers.
 * - Symmetrical non-binding estimate strictly $356.00 USD.
 * - Outgoing routing:
 *   - "Back to home" -> /
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	BackHandler,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getEffectiveConfirmedItems,
	getW04Draft,
	recordBookingStatusChecking,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function CheckCircleGreenIcon() {
	return (
		<Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
			<Circle
				cx={12}
				cy={12}
				r={10}
				fill="rgba(186, 255, 66, 0.15)"
				stroke={colors.brand}
				strokeWidth={2}
			/>
			<Path
				d="M8 12l3 3 5-5"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

function PendingCircleIcon() {
	return (
		<Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
			<Circle
				cx={12}
				cy={12}
				r={9}
				stroke={colors.secondaryText}
				strokeWidth={2}
				strokeDasharray="3 3"
			/>
		</Svg>
	);
}

export default function CheckingBookingStatusScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [draft, setDraft] = useState(getW04Draft);

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	useEffect(() => {
		recordBookingStatusChecking();
		return subscribeToW04Draft((updated) => setDraft({ ...updated }));
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/new-authorization-consent",
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

	const handleBackToHome = useCallback(() => {
		router.push("/(app)");
	}, [router]);

	const handleViewBookingRecorded = useCallback(() => {
		router.push({
			pathname: "/booking-recorded",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleViewAsapRequestRecorded = useCallback(() => {
		router.push({
			pathname: "/asap-request-recorded",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleViewBookingNotConfirmed = useCallback(() => {
		router.push({
			pathname: "/booking-not-confirmed",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID="c31p-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c31pCheckingBookingStatus.backA11y")}
					testID="c31p-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c31p-scroll-view"
				>
					{/* Brand Row */}
					<View style={styles.brandRow}>
						<Text style={styles.brandHaul}>
							HAUL<Text style={styles.brandIx}>IX</Text>
						</Text>
						<Text style={styles.tagline}>
							{currentLocale === "es"
								? "LO RECOGEMOS TODO."
								: "WE HAUL IT ALL."}
						</Text>
					</View>

					{/* 4-Step Progress Indicator */}
					<View style={styles.progressContainer}>
						<Text style={styles.progressLabel} testID="c31p-progress-label">
							{t("c31pCheckingBookingStatus.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "100%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c31p-title">
							{t("c31pCheckingBookingStatus.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c31p-subtitle">
							{t("c31pCheckingBookingStatus.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.locationChip} testID="c31p-location-chip">
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t("c31pCheckingBookingStatus.serviceArea")}
						</Text>
					</View>

					{/* Status Badge Capsule with Activity Indicator */}
					<View style={styles.statusBadgeCapsule} testID="c31p-status-badge">
						<ActivityIndicator size="small" color={colors.brand} />
						<Text style={styles.statusBadgeText}>
							{t("c31pCheckingBookingStatus.statusBadge")}
						</Text>
					</View>

					{/* Request Verification Summary Card */}
					<View style={styles.cardContainer} testID="c31p-summary-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c31pCheckingBookingStatus.summaryHeading")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c31pCheckingBookingStatus.bookingRefLabel")}
							</Text>
							<Text style={styles.detailTextValueBrand}>
								{t("c31pCheckingBookingStatus.bookingRefValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c31pCheckingBookingStatus.quoteLabel")}
							</Text>
							<Text style={styles.detailAmountValue} testID="c31p-quote-amount">
								{t("c31pCheckingBookingStatus.quoteValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{currentLocale === "es"
									? "ARTÍCULOS CONFIRMADOS"
									: "CONFIRMED ITEMS"}
							</Text>
							<Text
								style={[
									styles.detailTextValue,
									{ maxWidth: "60%", textAlign: "right" },
								]}
							>
								{confirmedItems}
							</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c31pCheckingBookingStatus.statusDetailLabel")}
							</Text>
							<Text style={styles.detailTextValue}>
								{t("c31pCheckingBookingStatus.statusDetailValue")}
							</Text>
						</View>
					</View>

					{/* Verification Steps Card */}
					<View style={styles.cardContainer} testID="c31p-steps-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c31pCheckingBookingStatus.stepsHeading")}
						</Text>

						{/* Step 1 */}
						<View style={styles.stepItemRow}>
							<CheckCircleGreenIcon />
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitle}>
									{t("c31pCheckingBookingStatus.step1Title")}
								</Text>
								<Text style={styles.stepItemStatusDone}>
									{t("c31pCheckingBookingStatus.step1Status")}
								</Text>
							</View>
						</View>

						{/* Step 2 */}
						<View style={styles.stepItemRow}>
							<ActivityIndicator
								size="small"
								color={colors.brand}
								style={{ width: 18 }}
							/>
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitleActive}>
									{t("c31pCheckingBookingStatus.step2Title")}
								</Text>
								<Text style={styles.stepItemStatusActive}>
									{t("c31pCheckingBookingStatus.step2Status")}
								</Text>
							</View>
						</View>

						{/* Step 3 */}
						<View style={styles.stepItemRow}>
							<PendingCircleIcon />
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitlePending}>
									{t("c31pCheckingBookingStatus.step3Title")}
								</Text>
								<Text style={styles.stepItemStatusPending}>
									{t("c31pCheckingBookingStatus.step3Status")}
								</Text>
							</View>
						</View>
					</View>

					{/* Demonstration Roadmap Banner */}
					<View style={styles.roadmapBox} testID="c31p-roadmap-banner">
						<Text style={styles.roadmapTitle}>
							{t("c31pCheckingBookingStatus.roadmapNoticeTitle")}
						</Text>
						<Text style={styles.roadmapBody}>
							{t("c31pCheckingBookingStatus.roadmapNoticeBody")}
						</Text>
					</View>

					{/* Demonstration Outcome Simulation Triggers */}
					<View style={styles.demoSection} testID="c31p-demo-outcomes-section">
						<Text style={styles.demoSectionHeading}>
							{currentLocale === "es"
								? "SIMULACIÓN DE RESULTADOS (DEMO)"
								: "OUTCOME DEMONSTRATIONS (QA)"}
						</Text>

						<Pressable
							style={({ pressed }) => [
								styles.demoActionButton,
								styles.demoSuccessButton,
								pressed && styles.demoButtonPressed,
							]}
							onPress={handleViewBookingRecorded}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c31pCheckingBookingStatus.simulateBookingRecorded",
							)}
							testID="c31p-simulate-scheduled-btn"
						>
							<Text style={styles.demoSuccessButtonText}>
								{t("c31pCheckingBookingStatus.simulateBookingRecorded")}
							</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								styles.demoActionButton,
								styles.demoAsapButton,
								pressed && styles.demoButtonPressed,
							]}
							onPress={handleViewAsapRequestRecorded}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c31pCheckingBookingStatus.simulateAsapRecorded",
							)}
							testID="c31p-simulate-asap-btn"
						>
							<Text style={styles.demoAsapButtonText}>
								{t("c31pCheckingBookingStatus.simulateAsapRecorded")}
							</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								styles.demoActionButton,
								styles.demoWarningButton,
								pressed && styles.demoButtonPressed,
							]}
							onPress={handleViewBookingNotConfirmed}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c31pCheckingBookingStatus.simulateNotConfirmed",
							)}
							testID="c31p-simulate-not-confirmed-btn"
						>
							<Text style={styles.demoWarningButtonText}>
								{t("c31pCheckingBookingStatus.simulateNotConfirmed")}
							</Text>
						</Pressable>
					</View>

					{/* Primary Action Button */}
					<Pressable
						style={({ pressed }) => [
							styles.primaryButton,
							pressed && styles.primaryButtonPressed,
						]}
						onPress={handleBackToHome}
						accessibilityRole="button"
						accessibilityLabel={t("c31pCheckingBookingStatus.primaryCta")}
						testID="c31p-primary-cta"
					>
						<Text style={styles.primaryButtonText}>
							{t("c31pCheckingBookingStatus.primaryCta")}
						</Text>
					</Pressable>

					{/* Prototype Disclaimer */}
					<View style={styles.footerNoteContainer}>
						<Text style={styles.footerNoteText}>
							{t("c31pCheckingBookingStatus.uiNote")}
						</Text>
					</View>
				</ScrollView>
			</View>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	brandRow: {
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "space-between",
		marginTop: 4,
		marginBottom: 16,
	},
	brandHaul: {
		fontSize: 22,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		letterSpacing: 1.5,
	},
	brandIx: {
		color: colors.brand,
	},
	tagline: {
		fontSize: 10,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		letterSpacing: 1.2,
	},
	progressContainer: {
		marginBottom: 20,
	},
	progressLabel: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 1.2,
		marginBottom: 8,
	},
	progressBarBackground: {
		height: 4,
		backgroundColor: colors.elevated,
		borderRadius: 2,
		overflow: "hidden",
	},
	progressBarFill: {
		height: "100%",
		backgroundColor: colors.brand,
		borderRadius: 2,
	},
	headerBlock: {
		marginBottom: 16,
	},
	screenTitle: {
		fontSize: 26,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		lineHeight: 32,
		marginBottom: 8,
	},
	screenSubtitle: {
		fontSize: 14,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 20,
	},
	locationChip: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: colors.elevated,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 20,
		marginBottom: 16,
	},
	locationDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: colors.brand,
		marginRight: 6,
	},
	locationText: {
		fontSize: 11,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		letterSpacing: 0.5,
	},
	statusBadgeCapsule: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.25)",
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 12,
		gap: 10,
		marginBottom: 20,
	},
	statusBadgeText: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 1,
		flex: 1,
	},
	cardContainer: {
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 18,
		marginBottom: 16,
	},
	cardHeaderTitle: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
		letterSpacing: 1,
		marginBottom: 14,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	detailLabel: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
	},
	detailTextValue: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	detailTextValueBrand: {
		fontSize: 13,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	detailAmountValue: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	divider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 12,
	},
	stepItemRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 14,
	},
	stepTextContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	stepItemTitle: {
		fontSize: 13,
		fontFamily: fontFamily.medium,
		color: colors.primaryText,
	},
	stepItemStatusDone: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	stepItemTitleActive: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	stepItemStatusActive: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	stepItemTitlePending: {
		fontSize: 13,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
	},
	stepItemStatusPending: {
		fontSize: 11,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
	},
	roadmapBox: {
		backgroundColor: "#161D1A",
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.25)",
		padding: 16,
		marginBottom: 24,
	},
	roadmapTitle: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.8,
		marginBottom: 6,
	},
	roadmapBody: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	demoSection: {
		backgroundColor: "#111615",
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#1E2724",
		padding: 16,
		marginBottom: 20,
		gap: 10,
	},
	demoSectionHeading: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		marginBottom: 4,
	},
	demoActionButton: {
		height: 44,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
	},
	demoButtonPressed: {
		opacity: 0.85,
	},
	demoSuccessButton: {
		backgroundColor: "rgba(186, 255, 66, 0.12)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.4)",
	},
	demoSuccessButtonText: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	demoAsapButton: {
		backgroundColor: "rgba(56, 189, 248, 0.12)",
		borderWidth: 1,
		borderColor: "rgba(56, 189, 248, 0.4)",
	},
	demoAsapButtonText: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: "#38BDF8",
	},
	demoWarningButton: {
		backgroundColor: "rgba(245, 158, 11, 0.12)",
		borderWidth: 1,
		borderColor: "rgba(245, 158, 11, 0.4)",
	},
	demoWarningButtonText: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.warning,
	},
	primaryButton: {
		height: 52,
		backgroundColor: colors.brand,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	primaryButtonPressed: {
		opacity: 0.88,
	},
	primaryButtonText: {
		fontSize: 15,
		fontFamily: fontFamily.bold,
		color: colors.background,
		letterSpacing: 0.3,
	},
	footerNoteContainer: {
		alignItems: "center",
		paddingVertical: 12,
	},
	footerNoteText: {
		fontSize: 10,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		opacity: 0.7,
		textAlign: "center",
	},
});
