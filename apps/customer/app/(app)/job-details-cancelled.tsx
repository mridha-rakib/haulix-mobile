/**
 * HAULIX Customer Mobile App — Phase 03.56
 * Screen: Cancelled Booking Details (W07 Canonical State: DETAILS_CANCELLED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:6458 (EN: "W07-EN / DETAILS_CANCELLED · Cancelled booking details")
 * - Frame ID: 893:6864 (ES: "W07-ES / DETAILS_CANCELLED · Detalles de reserva cancelada")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Cancellation status and fees strictly sourced from server state; zero fabricated capture.
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import {
	BackHandler,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	C32BriefcaseIcon,
	C32CalendarIcon,
	C32CheckCircleIcon,
	C32CreditCardIcon,
	C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";

export default function JobDetailsCancelledScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

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
				pathname: "/my-jobs",
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

	const handleBackToMyJobs = useCallback(() => {
		router.push({
			pathname: "/my-jobs",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleDiscussCancellation = useCallback(() => {
		router.push({
			pathname: "/job-support",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleRefundDispute = useCallback(() => {
		router.push({
			pathname: "/job-refund",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
			{/* Brand Header */}
			<View style={styles.headerRow} testID="w07-details-cancelled-header">
				<Pressable
					accessibilityLabel={t("w07DetailsCancelled.backA11y")}
					accessibilityRole="button"
					hitSlop={8}
					onPress={handleBack}
					style={styles.backButton}
					testID="w07-details-cancelled-back-btn"
				>
					<Text style={styles.backChevron}>‹</Text>
				</Pressable>
				<View style={styles.brandTitleContainer}>
					<Text style={styles.brandHaul}>
						{t("w07DetailsCancelled.brandHaul")}
					</Text>
					<Text style={styles.brandIx}>{t("w07DetailsCancelled.brandIx")}</Text>
				</View>
				<View style={styles.menuDotsContainer}>
					<Text style={styles.menuDotsText}>
						{t("w07DetailsCancelled.menuDots")}
					</Text>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="w07-details-cancelled-scroll"
			>
				{/* Title and Subtitle */}
				<View style={styles.titleContainer}>
					<Text style={styles.screenTitle} testID="w07-details-cancelled-title">
						{t("w07DetailsCancelled.screenTitle")}
					</Text>
					<Text
						style={styles.screenSubtitle}
						testID="w07-details-cancelled-subtitle"
					>
						{t("w07DetailsCancelled.screenSubtitle")}
					</Text>
				</View>

				{/* Cancelled Badge */}
				<View style={styles.sectionBadge} testID="w07-details-cancelled-badge">
					<View style={styles.sectionBadgeIconWrap}>
						<Text style={styles.badgeAlertIcon}>✕</Text>
					</View>
					<Text style={styles.sectionBadgeText}>
						{t("w07DetailsCancelled.badgeCancelled")}
					</Text>
				</View>

				{/* Booking Card */}
				<View
					style={styles.bookingCard}
					testID="w07-details-cancelled-booking-card"
				>
					<View style={styles.bookingCardTop}>
						<View style={styles.bookingImagePlaceholder}>
							<C32BriefcaseIcon size={24} color={colors.error || "#EF4444"} />
						</View>
						<View style={styles.bookingCardInfo}>
							<Text style={styles.bookingRefText}>
								{t("w07DetailsCancelled.bookingRef")}
							</Text>
							<Text style={styles.bookingCategoryText}>
								{t("w07DetailsCancelled.serviceCategory")}
							</Text>
							<Text style={styles.bookingItemsText}>
								{t("w07DetailsCancelled.itemSummary")} · 4 pieces across 3
								categories
							</Text>
						</View>
					</View>
					<View style={styles.cardDivider} />
					<View style={styles.bookingScheduleRow}>
						<C32CalendarIcon size={14} color={colors.secondaryText} />
						<Text style={styles.bookingScheduleText}>
							{t("w07DetailsCancelled.serviceSchedule")}
						</Text>
					</View>
				</View>

				{/* Booking Timeline Card */}
				<View
					style={styles.timelineCard}
					testID="w07-details-cancelled-timeline-card"
				>
					<Text style={styles.timelineHeading}>
						{t("w07DetailsCancelled.timelineHeading")}
					</Text>

					{/* Step 1 */}
					<View style={styles.timelineRow}>
						<View style={styles.timelineIconCol}>
							<View style={[styles.timelineNode, styles.timelineNodeDone]}>
								<C32CheckCircleIcon size={12} color={colors.background} />
							</View>
							<View style={styles.timelineLine} />
						</View>
						<View style={styles.timelineTextCol}>
							<Text style={styles.timelineStepTitle}>
								{t("w07DetailsCancelled.timelineStep1Title")}
							</Text>
							<Text style={styles.timelineStepDesc}>
								{t("w07DetailsCancelled.timelineStep1Desc")}
							</Text>
						</View>
					</View>

					{/* Step 2 */}
					<View style={styles.timelineRow}>
						<View style={styles.timelineIconCol}>
							<View style={[styles.timelineNode, styles.timelineNodeDone]}>
								<C32TruckIcon size={12} color={colors.background} />
							</View>
							<View style={styles.timelineLine} />
						</View>
						<View style={styles.timelineTextCol}>
							<Text style={styles.timelineStepTitle}>
								{t("w07DetailsCancelled.timelineStep2Title")}
							</Text>
							<Text style={styles.timelineStepDesc}>
								{t("w07DetailsCancelled.timelineStep2Desc")}
							</Text>
						</View>
					</View>

					{/* Step 3 - Cancelled / Server State */}
					<View style={styles.timelineRow}>
						<View style={styles.timelineIconCol}>
							<View style={[styles.timelineNode, styles.timelineNodeAlert]}>
								<Text style={styles.timelineNodeAlertText}>✕</Text>
							</View>
						</View>
						<View style={styles.timelineTextCol}>
							<Text style={styles.timelineStepTitle}>
								{t("w07DetailsCancelled.timelineStep3Title")}
							</Text>
							<Text style={styles.timelineStepDesc}>
								{t("w07DetailsCancelled.timelineStep3Desc")}
							</Text>
						</View>
					</View>
				</View>

				{/* Demo Quote Card */}
				<View
					style={styles.quoteCard}
					testID="w07-details-cancelled-quote-card"
				>
					<View style={styles.quoteIconWrap}>
						<C32CreditCardIcon size={18} color={colors.brand} />
					</View>
					<View style={styles.quoteTextWrap}>
						<Text style={styles.quoteHeading}>
							{t("w07DetailsCancelled.quoteHeading")}
						</Text>
						<Text style={styles.quoteValue}>
							$356.00 USD · {t("w07DetailsCancelled.quoteValue")}
						</Text>
					</View>
				</View>

				{/* Action Buttons */}
				<Pressable
					accessibilityLabel={t("w07DetailsCancelled.primaryCta")}
					accessibilityRole="button"
					onPress={handleBackToMyJobs}
					style={({ pressed }) => [
						styles.primaryButton,
						pressed && styles.primaryButtonPressed,
					]}
					testID="w07-details-cancelled-primary-cta"
				>
					<Text style={styles.primaryButtonText}>
						{t("w07DetailsCancelled.primaryCta")}
					</Text>
				</Pressable>

				<Pressable
					accessibilityLabel={t("w07DetailsCancelled.secondaryCta")}
					accessibilityRole="button"
					onPress={handleDiscussCancellation}
					style={({ pressed }) => [
						styles.secondaryButton,
						pressed && styles.secondaryButtonPressed,
					]}
					testID="w07-details-cancelled-secondary-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("w07DetailsCancelled.secondaryCta")}
					</Text>
				</Pressable>

				<Pressable
					accessibilityLabel={t("w07DetailsCancelled.altLink")}
					accessibilityRole="button"
					onPress={handleRefundDispute}
					style={({ pressed }) => [
						styles.linkButton,
						pressed && styles.linkButtonPressed,
					]}
					testID="w07-details-cancelled-alt-link"
				>
					<Text style={styles.linkButtonText}>
						{t("w07DetailsCancelled.altLink")}
					</Text>
				</Pressable>

				{/* UI Prototype Disclaimer */}
				<View style={styles.disclaimerContainer}>
					<Text style={styles.disclaimerText}>
						{t("w07DetailsCancelled.prototypeDisclaimer")}
					</Text>
				</View>
			</ScrollView>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 8,
		paddingBottom: 12,
	},
	backButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		alignItems: "center",
		justifyContent: "center",
	},
	backChevron: {
		color: colors.primaryText,
		fontSize: 22,
		fontFamily: fontFamily.semiBold,
		marginTop: -2,
	},
	brandTitleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	brandHaul: {
		color: colors.primaryText,
		fontSize: 20,
		fontFamily: fontFamily.bold,
		letterSpacing: 2,
	},
	brandIx: {
		color: colors.brand,
		fontSize: 20,
		fontFamily: fontFamily.bold,
		letterSpacing: 2,
	},
	menuDotsContainer: {
		width: 36,
		height: 36,
		alignItems: "center",
		justifyContent: "center",
	},
	menuDotsText: {
		color: colors.secondaryText,
		fontSize: 16,
		fontFamily: fontFamily.bold,
		letterSpacing: 2,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingBottom: 32,
	},
	titleContainer: {
		marginTop: 8,
		marginBottom: 16,
	},
	screenTitle: {
		color: colors.primaryText,
		fontSize: 22,
		fontFamily: fontFamily.bold,
		lineHeight: 28,
	},
	screenSubtitle: {
		color: colors.secondaryText,
		fontSize: 14,
		fontFamily: fontFamily.regular,
		marginTop: 4,
		lineHeight: 20,
	},
	sectionBadge: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: "rgba(239, 68, 68, 0.12)",
		borderWidth: 1,
		borderColor: "rgba(239, 68, 68, 0.28)",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
		marginBottom: 16,
	},
	sectionBadgeIconWrap: {
		marginRight: 6,
	},
	badgeAlertIcon: {
		color: "#EF4444",
		fontSize: 11,
		fontFamily: fontFamily.bold,
	},
	sectionBadgeText: {
		color: "#EF4444",
		fontSize: 11,
		fontFamily: fontFamily.bold,
		letterSpacing: 0.5,
	},
	bookingCard: {
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
	},
	bookingCardTop: {
		flexDirection: "row",
		alignItems: "center",
	},
	bookingImagePlaceholder: {
		width: 48,
		height: 48,
		borderRadius: 12,
		backgroundColor: colors.elevated,
		borderWidth: 1,
		borderColor: colors.elevated,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 14,
	},
	bookingCardInfo: {
		flex: 1,
	},
	bookingRefText: {
		color: colors.brand,
		fontSize: 12,
		fontFamily: fontFamily.semiBold,
		letterSpacing: 0.5,
	},
	bookingCategoryText: {
		color: colors.primaryText,
		fontSize: 16,
		fontFamily: fontFamily.semiBold,
		marginTop: 2,
	},
	bookingItemsText: {
		color: colors.secondaryText,
		fontSize: 13,
		fontFamily: fontFamily.regular,
		marginTop: 2,
	},
	cardDivider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 12,
	},
	bookingScheduleRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	bookingScheduleText: {
		color: colors.secondaryText,
		fontSize: 13,
		fontFamily: fontFamily.medium,
		marginLeft: 8,
	},
	timelineCard: {
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
	},
	timelineHeading: {
		color: colors.primaryText,
		fontSize: 15,
		fontFamily: fontFamily.semiBold,
		marginBottom: 14,
	},
	timelineRow: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	timelineIconCol: {
		alignItems: "center",
		width: 24,
		marginRight: 12,
	},
	timelineNode: {
		width: 22,
		height: 22,
		borderRadius: 11,
		alignItems: "center",
		justifyContent: "center",
	},
	timelineNodeDone: {
		backgroundColor: colors.brand,
	},
	timelineNodeAlert: {
		backgroundColor: "rgba(239, 68, 68, 0.2)",
		borderWidth: 1,
		borderColor: "#EF4444",
	},
	timelineNodeAlertText: {
		color: "#EF4444",
		fontSize: 11,
		fontFamily: fontFamily.bold,
	},
	timelineLine: {
		width: 2,
		height: 28,
		backgroundColor: colors.elevated,
		marginVertical: 2,
	},
	timelineTextCol: {
		flex: 1,
		paddingBottom: 14,
	},
	timelineStepTitle: {
		color: colors.primaryText,
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
	},
	timelineStepDesc: {
		color: colors.secondaryText,
		fontSize: 12,
		fontFamily: fontFamily.regular,
		marginTop: 2,
	},
	quoteCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 14,
		padding: 14,
		marginBottom: 20,
	},
	quoteIconWrap: {
		width: 36,
		height: 36,
		borderRadius: 10,
		backgroundColor: "rgba(34, 197, 94, 0.12)",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	quoteTextWrap: {
		flex: 1,
	},
	quoteHeading: {
		color: colors.secondaryText,
		fontSize: 11,
		fontFamily: fontFamily.semiBold,
		letterSpacing: 0.5,
	},
	quoteValue: {
		color: colors.primaryText,
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		marginTop: 2,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		borderRadius: 14,
		paddingVertical: 14,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
	},
	primaryButtonPressed: {
		opacity: 0.88,
	},
	primaryButtonText: {
		color: colors.background,
		fontSize: 15,
		fontFamily: fontFamily.bold,
		letterSpacing: 0.5,
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 14,
		paddingVertical: 14,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
	},
	secondaryButtonText: {
		color: colors.primaryText,
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
	},
	linkButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
	},
	linkButtonPressed: {
		opacity: 0.7,
	},
	linkButtonText: {
		color: colors.brand,
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
	},
	disclaimerContainer: {
		marginTop: 20,
		paddingVertical: 10,
		alignItems: "center",
	},
	disclaimerText: {
		color: colors.secondaryText,
		fontSize: 11,
		fontFamily: fontFamily.regular,
		textAlign: "center",
	},
});
