/**
 * HAULIX Customer Mobile App — Phase 03.41
 * Screen C31-S: Your Booking Is Recorded (Scheduled Booking Outcome Demonstration)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:1089 (430 × 1001 px)
 * - Spanish Variant: Node 766:1475 (430 × 1001 px)
 *
 * Upstream Entry:
 * - From C31-P (/checking-booking-status) via scheduled outcome transition or QA simulation.
 *
 * CRITICAL SEMANTIC INVARIANTS:
 * - "Booking recorded" does NOT mean a driver has been assigned, crew dispatched,
 *   service guaranteed, or payment captured.
 * - Symmetrical non-binding estimate strictly $356.00 USD.
 * - Customer confirmed inventory preserved: 4 pieces across 3 categories.
 * - No fake live backend booking creation or fake production booking IDs.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
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
	recordBookingRecorded,
	SAMPLE_DATES,
	SAMPLE_WINDOWS,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function CheckShieldHeroIcon() {
	return (
		<Svg width={44} height={44} viewBox="0 0 48 48" fill="none">
			<Circle
				cx={24}
				cy={24}
				r={22}
				fill="rgba(186, 255, 66, 0.12)"
				stroke={colors.brand}
				strokeWidth={2}
			/>
			<Path
				d="M15 24.5l6 6 12-13"
				stroke={colors.brand}
				strokeWidth={3}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

function CheckmarkPillIcon() {
	return (
		<Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
			<Path
				d="M5 13l4 4L19 7"
				stroke={colors.brand}
				strokeWidth={2.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default function BookingRecordedScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [draft, setDraft] = useState(getW04Draft);
	const [futureNoticeVisible, setFutureNoticeVisible] = useState(false);

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	useEffect(() => {
		recordBookingRecorded();
		return subscribeToW04Draft((updated) => setDraft({ ...updated }));
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/checking-booking-status",
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

	const handleViewOverview = useCallback(() => {
		setFutureNoticeVisible(true);
		router.push({
			pathname: "/searching-for-driver",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

	// Derive human-readable service window
	const selectedDate = SAMPLE_DATES.find((d) => d.id === draft.selectedDateId);
	const selectedWindow = SAMPLE_WINDOWS.find(
		(w) => w.id === draft.selectedWindowId,
	);
	const formattedWindow =
		selectedDate && selectedWindow
			? currentLocale === "es"
				? `${selectedDate.fullDateEs} · ${selectedWindow.windowEs}`
				: `${selectedDate.fullDateEn} · ${selectedWindow.windowEn}`
			: t("c31sBookingRecorded.defaultWindow");

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID="c31s-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c31sBookingRecorded.backA11y")}
					testID="c31s-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c31s-scroll-view"
				>
					{/* Brand Row */}
					<View style={styles.brandRow}>
						<Text style={styles.brandText}>HAULIX</Text>
						<Text style={styles.progressText}>
							{t("c31sBookingRecorded.progressLabel")}
						</Text>
					</View>

					{/* Hero Icon */}
					<View style={styles.heroIconContainer} testID="c31s-hero-icon">
						<CheckShieldHeroIcon />
					</View>

					{/* Screen Title & Subtitle */}
					<Text style={styles.screenTitle}>
						{t("c31sBookingRecorded.screenTitle")}
					</Text>
					<Text style={styles.screenSubtitle}>
						{t("c31sBookingRecorded.screenSubtitle")}
					</Text>

					{/* Location Chip */}
					<View style={styles.locationChip} testID="c31s-location-chip">
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t("c31sBookingRecorded.serviceArea")}
						</Text>
					</View>

					{/* Status Badge Capsule */}
					<View style={styles.statusBadgeCapsule} testID="c31s-status-badge">
						<CheckmarkPillIcon />
						<Text style={styles.statusBadgeText}>
							{t("c31sBookingRecorded.statusBadge")}
						</Text>
					</View>

					{/* Recorded Summary Card */}
					<View style={styles.cardContainer} testID="c31s-summary-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c31sBookingRecorded.cardHeading")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c31sBookingRecorded.bookingRefLabel")}
							</Text>
							<Text style={styles.detailCodeValue} testID="c31s-booking-ref">
								{t("c31sBookingRecorded.bookingRefValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c31sBookingRecorded.statusLabel")}
							</Text>
							<Text
								style={styles.detailActiveValue}
								testID="c31s-booking-status"
							>
								{t("c31sBookingRecorded.statusValue")}
							</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c31sBookingRecorded.windowLabel")}
							</Text>
							<Text
								style={[
									styles.detailTextValue,
									{ maxWidth: "60%", textAlign: "right" },
								]}
								testID="c31s-service-window"
							>
								{formattedWindow}
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
								testID="c31s-confirmed-items"
							>
								{confirmedItems}
							</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c31sBookingRecorded.holdAmountLabel")}
							</Text>
							<Text style={styles.detailAmountValue} testID="c31s-hold-amount">
								{t("c31sBookingRecorded.holdAmountValue")}
							</Text>
						</View>

						<Text style={styles.explanationText}>
							{t("c31sBookingRecorded.holdClarification")}
						</Text>
					</View>

					{/* Next Steps Guidance Card */}
					<View style={styles.cardContainer} testID="c31s-next-steps-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c31sBookingRecorded.nextStepsHeading")}
						</Text>

						<View style={styles.stepItemRow}>
							<View style={styles.stepNumberBadge}>
								<Text style={styles.stepNumberText}>1</Text>
							</View>
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitle}>
									{t("c31sBookingRecorded.step1Title")}
								</Text>
								<Text style={styles.stepItemDesc}>
									{t("c31sBookingRecorded.step1Desc")}
								</Text>
							</View>
						</View>

						<View style={styles.stepItemRow}>
							<View style={styles.stepNumberBadge}>
								<Text style={styles.stepNumberText}>2</Text>
							</View>
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitle}>
									{t("c31sBookingRecorded.step2Title")}
								</Text>
								<Text style={styles.stepItemDesc}>
									{t("c31sBookingRecorded.step2Desc")}
								</Text>
							</View>
						</View>

						<View style={styles.stepItemRow}>
							<View style={styles.stepNumberBadge}>
								<Text style={styles.stepNumberText}>3</Text>
							</View>
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitle}>
									{t("c31sBookingRecorded.step3Title")}
								</Text>
								<Text style={styles.stepItemDesc}>
									{t("c31sBookingRecorded.step3Desc")}
								</Text>
							</View>
						</View>
					</View>

					{/* Future Notice Banner for Overview CTA */}
					{futureNoticeVisible && (
						<View style={styles.futureNoticeBox} testID="c31s-future-notice">
							<Text style={styles.futureNoticeText}>
								{t("c31sBookingRecorded.futureNoticeOverview")}
							</Text>
						</View>
					)}

					{/* Primary Action Button (View Service Overview) */}
					<Pressable
						style={({ pressed }) => [
							styles.primaryButton,
							pressed && styles.primaryButtonPressed,
						]}
						onPress={handleViewOverview}
						accessibilityRole="button"
						accessibilityLabel={t("c31sBookingRecorded.primaryCta")}
						testID="c31s-primary-cta"
					>
						<Text style={styles.primaryButtonText}>
							{t("c31sBookingRecorded.primaryCta")}
						</Text>
					</Pressable>

					{/* Secondary Action Button (Back to Home) */}
					<Pressable
						style={({ pressed }) => [
							styles.secondaryButton,
							pressed && styles.secondaryButtonPressed,
						]}
						onPress={handleBackToHome}
						accessibilityRole="button"
						accessibilityLabel={t("c31sBookingRecorded.secondaryCta")}
						testID="c31s-secondary-cta"
					>
						<Text style={styles.secondaryButtonText}>
							{t("c31sBookingRecorded.secondaryCta")}
						</Text>
					</Pressable>

					{/* Prototype Disclaimer */}
					<View style={styles.footerNoteContainer}>
						<Text style={styles.footerNoteText}>
							{t("c31sBookingRecorded.uiNote")}
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
	brandText: {
		fontSize: 16,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 2,
	},
	progressText: {
		fontSize: 11,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		letterSpacing: 0.8,
	},
	heroIconContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		marginBottom: 14,
	},
	screenTitle: {
		fontSize: 24,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		textAlign: "center",
		marginBottom: 6,
		letterSpacing: -0.3,
	},
	screenSubtitle: {
		fontSize: 14,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		textAlign: "center",
		lineHeight: 20,
		marginBottom: 18,
		paddingHorizontal: 16,
	},
	locationChip: {
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#161D1A",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#222D28",
		paddingHorizontal: 12,
		paddingVertical: 5,
		marginBottom: 10,
		gap: 6,
	},
	locationDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: colors.brand,
	},
	locationText: {
		fontSize: 11,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		letterSpacing: 0.5,
	},
	statusBadgeCapsule: {
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(186, 255, 66, 0.12)",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.35)",
		paddingHorizontal: 12,
		paddingVertical: 6,
		marginBottom: 20,
		gap: 6,
	},
	statusBadgeText: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.8,
	},
	cardContainer: {
		backgroundColor: "#131817",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#1E2724",
		padding: 18,
		marginBottom: 16,
	},
	cardHeaderTitle: {
		fontSize: 12,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		marginBottom: 14,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 6,
	},
	detailLabel: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		letterSpacing: 0.4,
	},
	detailCodeValue: {
		fontSize: 13,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		letterSpacing: 0.5,
	},
	detailActiveValue: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	detailTextValue: {
		fontSize: 13,
		fontFamily: fontFamily.medium,
		color: colors.primaryText,
	},
	detailAmountValue: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	divider: {
		height: 1,
		backgroundColor: "#1E2724",
		marginVertical: 8,
	},
	explanationText: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
		marginTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#1E2724",
		paddingTop: 10,
	},
	stepItemRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 14,
		gap: 12,
	},
	stepNumberBadge: {
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: "rgba(186, 255, 66, 0.15)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.3)",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 1,
	},
	stepNumberText: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	stepTextContainer: {
		flex: 1,
	},
	stepItemTitle: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		marginBottom: 3,
	},
	stepItemDesc: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 17,
	},
	futureNoticeBox: {
		backgroundColor: "#161D1A",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.25)",
		padding: 14,
		marginBottom: 16,
	},
	futureNoticeText: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.brand,
		lineHeight: 18,
		textAlign: "center",
	},
	primaryButton: {
		height: 52,
		backgroundColor: colors.brand,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
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
	secondaryButton: {
		height: 50,
		backgroundColor: "transparent",
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#26332E",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	secondaryButtonPressed: {
		backgroundColor: "rgba(255, 255, 255, 0.04)",
	},
	secondaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
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
