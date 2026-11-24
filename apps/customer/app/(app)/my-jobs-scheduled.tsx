/**
 * HAULIX Customer Mobile App — Phase 03.60
 * Screen: Scheduled Bookings (W07 Canonical State: HOME_SCHEDULED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 897:6671 (EN: "W07-EN / HOME_SCHEDULED · Scheduled bookings")
 * - Frame ID: 897:7145 (ES: "W07-ES / HOME_SCHEDULED · Reservas programadas")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Illustrative quote: $356.00 USD.
 * - Symmetrical bottom navigation (CustomerBottomNav with activeTab="jobs").
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
	C32ClockIcon,
	C32CreditCardIcon,
	C32LocationPinIcon,
	C32ShieldCheckIcon,
} from "../../src/components/dispatch/C32Icons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";

export default function MyJobsScheduledScreen() {
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

	const handleSeeActive = useCallback(() => {
		router.push({
			pathname: "/my-jobs",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleSeeHistory = useCallback(() => {
		router.push({
			pathname: "/my-jobs-history",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleViewBookingDetails = useCallback(() => {
		router.push({
			pathname: "/job-details",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleRequestReschedule = useCallback(() => {
		router.push({
			pathname: "/job-reschedule",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleEmptyStatePreview = useCallback(() => {
		router.push({
			pathname: "/my-jobs-empty",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top"]} style={styles.safeArea}>
			{/* Brand Header */}
			<View style={styles.headerRow} testID="w07-scheduled-header">
				<Pressable
					accessibilityLabel={t("w07HomeScheduled.backA11y")}
					accessibilityRole="button"
					hitSlop={8}
					onPress={handleBack}
					style={styles.backButton}
					testID="w07-scheduled-back-btn"
				>
					<Text style={styles.backChevron}>‹</Text>
				</Pressable>
				<View style={styles.brandTitleContainer}>
					<Text style={styles.brandHaul}>
						{t("w07HomeScheduled.brandHaul")}
					</Text>
					<Text style={styles.brandIx}>{t("w07HomeScheduled.brandIx")}</Text>
				</View>
				<View style={styles.menuDotsButton}>
					<Text style={styles.menuDotsText}>
						{t("w07HomeScheduled.menuDots")}
					</Text>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="w07-scheduled-scroll"
			>
				{/* Title and Subtitle */}
				<View style={styles.titleContainer}>
					<Text style={styles.screenTitle} testID="w07-scheduled-title">
						{t("w07HomeScheduled.screenTitle")}
					</Text>
					<Text style={styles.screenSubtitle} testID="w07-scheduled-subtitle">
						{t("w07HomeScheduled.screenSubtitle")}
					</Text>
				</View>

				{/* Section Badge */}
				<View style={styles.sectionBadge} testID="w07-scheduled-badge">
					<View style={styles.sectionBadgeIconWrap}>
						<C32BriefcaseIcon size={14} color={colors.brand} />
					</View>
					<Text style={styles.sectionBadgeText}>
						{t("w07HomeScheduled.badgeScheduled")}
					</Text>
				</View>

				{/* Booking Card */}
				<View style={styles.bookingCard} testID="w07-scheduled-booking-card">
					<View style={styles.bookingCardTop}>
						<View style={styles.bookingImagePlaceholder}>
							<C32BriefcaseIcon size={24} color={colors.brand} />
						</View>
						<View style={styles.bookingCardInfo}>
							<Text style={styles.bookingRefText}>
								{t("w07HomeScheduled.bookingRef")}
							</Text>
							<Text style={styles.bookingCategoryText}>
								{t("w07HomeScheduled.serviceCategory")}
							</Text>
							<Text style={styles.bookingItemsText}>
								{t("w07HomeScheduled.itemSummary")} ·{" "}
								{t("common.inventoryScope")}
							</Text>
						</View>
					</View>
					<View style={styles.cardDivider} />
					<View style={styles.bookingScheduleRow}>
						<C32CalendarIcon size={14} color={colors.secondaryText} />
						<Text style={styles.bookingScheduleText}>
							{t("w07HomeScheduled.serviceSchedule")}
						</Text>
					</View>
				</View>

				{/* Filter Tabs / Pills */}
				<View style={styles.filterPillsRow} testID="w07-scheduled-filter-pills">
					<Pressable
						accessibilityRole="tab"
						onPress={handleSeeActive}
						style={styles.filterPill}
						testID="w07-scheduled-tab-active"
					>
						<Text style={styles.filterPillText}>
							{t("w07HomeScheduled.tabActive")}
						</Text>
					</Pressable>
					<View
						style={[styles.filterPill, styles.filterPillActive]}
						testID="w07-scheduled-tab-scheduled"
					>
						<Text style={styles.filterPillActiveText}>
							{t("w07HomeScheduled.tabScheduled")}
						</Text>
					</View>
					<Pressable
						accessibilityRole="tab"
						onPress={handleSeeHistory}
						style={styles.filterPill}
						testID="w07-scheduled-tab-history"
					>
						<Text style={styles.filterPillText}>
							{t("w07HomeScheduled.tabHistory")}
						</Text>
					</Pressable>
				</View>

				{/* Status Card / Job Management */}
				<View style={styles.statusCard} testID="w07-scheduled-status-card">
					<Text style={styles.statusCardHeading}>
						{t("w07HomeScheduled.cardHeading")}
					</Text>

					<View style={styles.statusRow}>
						<View style={styles.statusIconWrap}>
							<C32ShieldCheckIcon size={16} color={colors.brand} />
						</View>
						<View style={styles.statusTextWrap}>
							<Text style={styles.statusLabel}>
								{t("w07HomeScheduled.jobStatusLabel")}
							</Text>
							<Text style={styles.statusValue}>
								{t("w07HomeScheduled.jobStatusValue")}
							</Text>
						</View>
					</View>

					<View style={styles.statusRow}>
						<View style={styles.statusIconWrap}>
							<C32CreditCardIcon size={16} color={colors.brand} />
						</View>
						<View style={styles.statusTextWrap}>
							<Text style={styles.statusLabel}>
								{t("w07HomeScheduled.quoteLabel")}
							</Text>
							<Text style={styles.statusValue}>
								{t("w07HomeScheduled.quoteValue")}
							</Text>
						</View>
					</View>

					<View style={styles.statusRow}>
						<View style={styles.statusIconWrap}>
							<C32LocationPinIcon size={16} color={colors.brand} />
						</View>
						<View style={styles.statusTextWrap}>
							<Text style={styles.statusLabel}>
								{t("w07HomeScheduled.pickupLabel")}
							</Text>
							<Text style={styles.statusValue}>
								{t("w07HomeScheduled.pickupValue")}
							</Text>
						</View>
					</View>

					<View style={styles.policyNoticeBox}>
						<View style={styles.policyIconWrap}>
							<C32ClockIcon size={14} color={colors.secondaryText} />
						</View>
						<Text style={styles.policyNoticeText}>
							{t("w07HomeScheduled.jobInfoNote")}
						</Text>
					</View>
				</View>

				{/* Primary CTA */}
				<Pressable
					accessibilityRole="button"
					onPress={handleViewBookingDetails}
					style={styles.primaryButton}
					testID="w07-scheduled-primary-cta"
				>
					<Text style={styles.primaryButtonText}>
						{t("w07HomeScheduled.primaryCta")}
					</Text>
				</Pressable>

				{/* Secondary CTA */}
				<Pressable
					accessibilityRole="button"
					onPress={handleRequestReschedule}
					style={styles.secondaryButton}
					testID="w07-scheduled-secondary-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("w07HomeScheduled.secondaryCta")}
					</Text>
				</Pressable>

				{/* Tertiary CTA / Link */}
				<Pressable
					accessibilityRole="button"
					onPress={handleEmptyStatePreview}
					style={styles.tertiaryLink}
					testID="w07-scheduled-tertiary-cta"
				>
					<Text style={styles.tertiaryLinkText}>
						{t("w07HomeScheduled.tertiaryCta")}
					</Text>
				</Pressable>

				{/* Prototype Disclaimer */}
				<Text style={styles.disclaimerText}>
					{t("w07HomeScheduled.prototypeDisclaimer")}
				</Text>
			</ScrollView>

			{/* Canonical Customer Bottom Navigation */}
			<CustomerBottomNav activeTab="jobs" />
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: colors.background,
		flex: 1,
	},
	headerRow: {
		alignItems: "center",
		flexDirection: "row",
		height: 48,
		justifyContent: "space-between",
		paddingHorizontal: 16,
	},
	backButton: {
		alignItems: "center",
		height: 36,
		justifyContent: "center",
		width: 36,
	},
	backChevron: {
		color: colors.primaryText,
		fontFamily: fontFamily.medium,
		fontSize: 28,
		marginTop: -2,
	},
	brandTitleContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
	brandHaul: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 16,
		letterSpacing: 1.5,
	},
	brandIx: {
		color: colors.brand,
		fontFamily: fontFamily.bold,
		fontSize: 16,
		letterSpacing: 1.5,
	},
	menuDotsButton: {
		alignItems: "center",
		height: 36,
		justifyContent: "center",
		width: 36,
	},
	menuDotsText: {
		color: colors.secondaryText,
		fontSize: 18,
		letterSpacing: 2,
	},
	scrollContent: {
		paddingBottom: 110,
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	titleContainer: {
		marginBottom: 12,
	},
	screenTitle: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 22,
		letterSpacing: -0.3,
		marginBottom: 4,
	},
	screenSubtitle: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 14,
		lineHeight: 20,
	},
	sectionBadge: {
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: "rgba(186, 255, 66, 0.12)",
		borderColor: "rgba(186, 255, 66, 0.3)",
		borderRadius: 6,
		borderWidth: 1,
		flexDirection: "row",
		marginBottom: 16,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	sectionBadgeIconWrap: {
		marginRight: 6,
	},
	sectionBadgeText: {
		color: colors.brand,
		fontFamily: fontFamily.bold,
		fontSize: 11,
		letterSpacing: 0.8,
	},
	bookingCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 16,
		padding: 14,
	},
	bookingCardTop: {
		flexDirection: "row",
	},
	bookingImagePlaceholder: {
		alignItems: "center",
		backgroundColor: colors.background,
		borderColor: colors.elevated,
		borderRadius: 8,
		borderWidth: 1,
		height: 48,
		justifyContent: "center",
		marginRight: 12,
		width: 48,
	},
	bookingCardInfo: {
		flex: 1,
	},
	bookingRefText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
		fontSize: 12,
		marginBottom: 2,
	},
	bookingCategoryText: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 15,
		marginBottom: 2,
	},
	bookingItemsText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 13,
	},
	cardDivider: {
		backgroundColor: colors.elevated,
		height: 1,
		marginVertical: 10,
	},
	bookingScheduleRow: {
		alignItems: "center",
		flexDirection: "row",
	},
	bookingScheduleText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		marginLeft: 6,
	},
	filterPillsRow: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 16,
	},
	filterPill: {
		alignItems: "center",
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 20,
		borderWidth: 1,
		flex: 1,
		justifyContent: "center",
		paddingVertical: 8,
	},
	filterPillActive: {
		backgroundColor: colors.brand,
		borderColor: colors.brand,
	},
	filterPillText: {
		color: colors.primaryText,
		fontFamily: fontFamily.medium,
		fontSize: 13,
	},
	filterPillActiveText: {
		color: colors.background,
		fontFamily: fontFamily.bold,
		fontSize: 13,
	},
	statusCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 16,
		padding: 14,
	},
	statusCardHeading: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 15,
		marginBottom: 12,
	},
	statusRow: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 10,
	},
	statusIconWrap: {
		alignItems: "center",
		backgroundColor: colors.background,
		borderRadius: 6,
		height: 28,
		justifyContent: "center",
		marginRight: 10,
		width: 28,
	},
	statusTextWrap: {
		flex: 1,
	},
	statusLabel: {
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
		fontSize: 10,
		letterSpacing: 0.8,
		marginBottom: 2,
	},
	statusValue: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
	},
	policyNoticeBox: {
		alignItems: "center",
		backgroundColor: colors.background,
		borderColor: colors.elevated,
		borderRadius: 8,
		borderWidth: 1,
		flexDirection: "row",
		marginTop: 4,
		padding: 10,
	},
	policyIconWrap: {
		marginRight: 8,
	},
	policyNoticeText: {
		color: colors.secondaryText,
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 16,
	},
	primaryButton: {
		alignItems: "center",
		backgroundColor: colors.brand,
		borderRadius: 10,
		height: 48,
		justifyContent: "center",
		marginBottom: 10,
	},
	primaryButtonText: {
		color: colors.background,
		fontFamily: fontFamily.bold,
		fontSize: 15,
	},
	secondaryButton: {
		alignItems: "center",
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 10,
		borderWidth: 1,
		height: 48,
		justifyContent: "center",
		marginBottom: 12,
	},
	secondaryButtonText: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
	},
	tertiaryLink: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
		paddingVertical: 6,
	},
	tertiaryLinkText: {
		color: colors.brand,
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
	},
	disclaimerText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 11,
		lineHeight: 16,
		textAlign: "center",
	},
});
