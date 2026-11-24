/**
 * HAULIX Customer Mobile App — Phase 03.59
 * Screen: Review Request Not Sent (W07 Canonical State: REFUND_FAILED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:8275 (EN: "W07-EN / REFUND_FAILED · Review request not sent")
 * - Frame ID: 893:8681 (ES: "W07-ES / REFUND_FAILED · Solicitud de revisión no enviada")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend simulation; request failure exception demo.
 * - Symmetrical localization with zero route guards.
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
	TextInput,
	View,
} from "react-native";
import {
	C32AlertTriangleIcon,
	C32BriefcaseIcon,
	C32CalendarIcon,
	C32CreditCardIcon,
	C32HelpCircleIcon,
	C32InfoIcon,
	C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";
import { type RefundReason, ReasonChipButton } from "./job-refund";

export default function JobRefundFailedScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

	const [selectedReason, setSelectedReason] =
		useState<RefundReason>("notCompleted");
	const [detailsText, setDetailsText] = useState("");
	const [evidenceAttached, setEvidenceAttached] = useState(false);

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
				pathname: "/job-refund",
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

	const handleEditRequest = useCallback(() => {
		router.push({
			pathname: "/job-refund",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleViewBooking = useCallback(() => {
		router.push({
			pathname: "/job-details",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleContactSupport = useCallback(() => {
		router.push({
			pathname: "/job-support",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
			{/* Brand Header */}
			<View style={styles.headerRow} testID="w07-refund-failed-header">
				<Pressable
					accessibilityLabel={t("w07RefundFailed.backA11y")}
					accessibilityRole="button"
					hitSlop={8}
					onPress={handleBack}
					style={styles.backButton}
					testID="w07-refund-failed-back-btn"
				>
					<Text style={styles.backChevron}>‹</Text>
				</Pressable>
				<View style={styles.brandTitleContainer}>
					<Text style={styles.brandHaul}>{t("w07RefundFailed.brandHaul")}</Text>
					<Text style={styles.brandIx}>{t("w07RefundFailed.brandIx")}</Text>
				</View>
				<Pressable
					accessibilityLabel="Menu"
					accessibilityRole="button"
					hitSlop={8}
					style={styles.menuButton}
					testID="w07-refund-failed-menu-btn"
				>
					<Text style={styles.menuDots}>{t("w07RefundFailed.menuDots")}</Text>
				</Pressable>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				testID="w07-refund-failed-scroll"
			>
				{/* Title and Subtitle */}
				<View style={styles.titleContainer}>
					<Text style={styles.screenTitle} testID="w07-refund-failed-title">
						{t("w07RefundFailed.screenTitle")}
					</Text>
					<Text
						style={styles.screenSubtitle}
						testID="w07-refund-failed-subtitle"
					>
						{t("w07RefundFailed.screenSubtitle")}
					</Text>
				</View>

				{/* Status Badge */}
				<View style={styles.sectionBadge} testID="w07-refund-failed-badge">
					<View style={styles.sectionBadgeIconWrap}>
						<C32AlertTriangleIcon color={colors.error || "#EF4444"} size={14} />
					</View>
					<Text style={styles.sectionBadgeText}>
						{t("w07RefundFailed.badge")}
					</Text>
				</View>

				{/* Booking Card */}
				<View
					style={styles.bookingCard}
					testID="w07-refund-failed-booking-card"
				>
					<View style={styles.bookingCardTop}>
						<View style={styles.bookingImagePlaceholder}>
							<C32BriefcaseIcon color={colors.error || "#EF4444"} size={24} />
						</View>
						<View style={styles.bookingCardInfo}>
							<Text style={styles.bookingRefText}>
								{t("w07RefundFailed.bookingRef")}
							</Text>
							<Text style={styles.bookingCategoryText}>
								{t("w07RefundFailed.serviceCategory")}
							</Text>
							<Text style={styles.bookingItemsText}>
								{t("w07RefundFailed.itemSummary")} · 4 pieces across 3
								categories
							</Text>
						</View>
					</View>
					<View style={styles.cardDivider} />
					<View style={styles.bookingScheduleRow}>
						<C32CalendarIcon color={colors.secondaryText} size={14} />
						<Text style={styles.bookingScheduleText}>
							{t("w07RefundFailed.serviceSchedule")}
						</Text>
					</View>
				</View>

				{/* Payment Review Card */}
				<View style={styles.reviewCard} testID="w07-refund-failed-review-card">
					<Text style={styles.reviewHeading}>
						{t("w07RefundFailed.cardHeading")}
					</Text>

					{/* Quote & Review Amount Row */}
					<View style={styles.amountRow}>
						<View style={styles.amountCol}>
							<Text style={styles.amountLabel}>
								{t("w07RefundFailed.quoteLabel")}
							</Text>
							<Text style={styles.quoteValue}>
								{t("w07RefundFailed.quoteAmount")}
							</Text>
						</View>
						<View style={styles.amountColRight}>
							<Text style={styles.amountLabel}>
								{t("w07RefundFailed.reviewAmountLabel")}
							</Text>
							<Text style={styles.reviewStatusValue}>
								{t("w07RefundFailed.reviewAmountStatus")}
							</Text>
						</View>
					</View>

					{/* Stripe Note */}
					<View style={styles.stripeNoteWrap}>
						<C32InfoIcon color={colors.secondaryText} size={13} />
						<Text style={styles.stripeNoteText}>
							{t("w07RefundFailed.stripeNote")}
						</Text>
					</View>

					{/* Reason Section */}
					<Text style={styles.reasonHeading}>
						{t("w07RefundFailed.reasonHeading")}
					</Text>
					<View style={styles.reasonGrid}>
						<ReasonChipButton
							icon={
								<C32AlertTriangleIcon
									color={
										selectedReason === "notCompleted"
											? colors.brand
											: colors.secondaryText
									}
									size={14}
								/>
							}
							label={t("w07RefundFailed.reasonNotCompleted")}
							onSelect={setSelectedReason}
							reason="notCompleted"
							selected={selectedReason === "notCompleted"}
							testID="w07-refund-failed-chip-notCompleted"
						/>
						<ReasonChipButton
							icon={
								<C32CreditCardIcon
									color={
										selectedReason === "duplicate"
											? colors.brand
											: colors.secondaryText
									}
									size={14}
								/>
							}
							label={t("w07RefundFailed.reasonDuplicate")}
							onSelect={setSelectedReason}
							reason="duplicate"
							selected={selectedReason === "duplicate"}
							testID="w07-refund-failed-chip-duplicate"
						/>
						<ReasonChipButton
							icon={
								<C32TruckIcon
									color={
										selectedReason === "noShow"
											? colors.brand
											: colors.secondaryText
									}
									size={14}
								/>
							}
							label={t("w07RefundFailed.reasonNoShow")}
							onSelect={setSelectedReason}
							reason="noShow"
							selected={selectedReason === "noShow"}
							testID="w07-refund-failed-chip-noShow"
						/>
						<ReasonChipButton
							icon={
								<C32HelpCircleIcon
									color={
										selectedReason === "quality"
											? colors.brand
											: colors.secondaryText
									}
									size={14}
								/>
							}
							label={t("w07RefundFailed.reasonQuality")}
							onSelect={setSelectedReason}
							reason="quality"
							selected={selectedReason === "quality"}
							testID="w07-refund-failed-chip-quality"
						/>
					</View>

					{/* Additional Details */}
					<Text style={styles.inputLabel}>
						{t("w07RefundFailed.detailsLabel")}
					</Text>
					<TextInput
						accessibilityLabel={t("w07RefundFailed.detailsLabel")}
						multiline
						numberOfLines={3}
						onChangeText={setDetailsText}
						placeholder={t("w07RefundFailed.detailsPlaceholder")}
						placeholderTextColor={colors.secondaryText}
						style={styles.textInput}
						testID="w07-refund-failed-input"
						value={detailsText}
					/>

					{/* Attachment Toggle */}
					<Pressable
						accessibilityRole="button"
						onPress={() => setEvidenceAttached(!evidenceAttached)}
						style={[
							styles.attachmentButton,
							evidenceAttached && styles.attachmentButtonActive,
						]}
						testID="w07-refund-failed-attachment-btn"
					>
						<Text
							style={[
								styles.attachmentText,
								evidenceAttached && styles.attachmentTextActive,
							]}
						>
							{evidenceAttached
								? t("w07RefundFailed.attachmentActive")
								: t("w07RefundFailed.attachmentLabel")}
						</Text>
					</Pressable>

					{/* Notice Box */}
					<View style={styles.noticeBox} testID="w07-refund-failed-notice">
						<View style={styles.noticeIconWrap}>
							<C32InfoIcon color={colors.error || "#EF4444"} size={16} />
						</View>
						<View style={styles.noticeContent}>
							<Text style={styles.noticeTitle}>
								{t("w07RefundFailed.noticeTitle")}
							</Text>
							<Text style={styles.noticeDesc}>
								{t("w07RefundFailed.noticeDesc")}
							</Text>
						</View>
					</View>
				</View>

				{/* Primary CTA */}
				<Pressable
					accessibilityRole="button"
					onPress={handleEditRequest}
					style={styles.primaryButton}
					testID="w07-refund-failed-primary-cta"
				>
					<Text style={styles.primaryButtonText}>
						{t("w07RefundFailed.primaryCta")}
					</Text>
				</Pressable>

				{/* Secondary CTA */}
				<Pressable
					accessibilityRole="button"
					onPress={handleViewBooking}
					style={styles.secondaryButton}
					testID="w07-refund-failed-secondary-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("w07RefundFailed.secondaryCta")}
					</Text>
				</Pressable>

				{/* Tertiary Action */}
				<Pressable
					accessibilityRole="button"
					onPress={handleContactSupport}
					style={styles.tertiaryLink}
					testID="w07-refund-failed-tertiary-cta"
				>
					<Text style={styles.tertiaryLinkText}>
						{t("w07RefundFailed.tertiaryCta")}
					</Text>
				</Pressable>

				{/* Prototype Disclaimer */}
				<Text style={styles.disclaimerText}>
					{t("w07RefundFailed.prototypeDisclaimer")}
				</Text>
			</ScrollView>
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
	menuButton: {
		alignItems: "center",
		height: 36,
		justifyContent: "center",
		width: 36,
	},
	menuDots: {
		color: colors.secondaryText,
		fontSize: 18,
		letterSpacing: 2,
	},
	scrollContent: {
		paddingBottom: 40,
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
		backgroundColor: "rgba(239, 68, 68, 0.12)",
		borderColor: "rgba(239, 68, 68, 0.3)",
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
		color: colors.error || "#EF4444",
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
	reviewCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: 16,
		padding: 14,
	},
	reviewHeading: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 16,
		marginBottom: 12,
	},
	amountRow: {
		backgroundColor: colors.background,
		borderColor: colors.elevated,
		borderRadius: 8,
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
		padding: 12,
	},
	amountCol: {
		flex: 1,
	},
	amountColRight: {
		alignItems: "flex-end",
		flex: 1,
	},
	amountLabel: {
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
		fontSize: 10,
		letterSpacing: 0.6,
		marginBottom: 2,
	},
	quoteValue: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 16,
	},
	reviewStatusValue: {
		color: colors.error || "#EF4444",
		fontFamily: fontFamily.medium,
		fontSize: 13,
	},
	stripeNoteWrap: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 16,
		paddingHorizontal: 2,
	},
	stripeNoteText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 12,
		marginLeft: 6,
	},
	reasonHeading: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		marginBottom: 10,
	},
	reasonGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 14,
	},
	inputLabel: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		marginBottom: 8,
	},
	textInput: {
		backgroundColor: colors.background,
		borderColor: colors.elevated,
		borderRadius: 8,
		borderWidth: 1,
		color: colors.primaryText,
		fontFamily: fontFamily.regular,
		fontSize: 14,
		marginBottom: 12,
		minHeight: 76,
		padding: 10,
		textAlignVertical: "top",
	},
	attachmentButton: {
		alignItems: "center",
		backgroundColor: colors.background,
		borderColor: colors.elevated,
		borderRadius: 8,
		borderWidth: 1,
		justifyContent: "center",
		marginBottom: 14,
		paddingVertical: 10,
	},
	attachmentButtonActive: {
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderColor: colors.brand,
	},
	attachmentText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
		fontSize: 13,
	},
	attachmentTextActive: {
		color: colors.brand,
		fontFamily: fontFamily.semiBold,
	},
	noticeBox: {
		backgroundColor: "rgba(239, 68, 68, 0.08)",
		borderColor: "rgba(239, 68, 68, 0.25)",
		borderRadius: 8,
		borderWidth: 1,
		flexDirection: "row",
		padding: 10,
	},
	noticeIconWrap: {
		marginRight: 8,
		marginTop: 2,
	},
	noticeContent: {
		flex: 1,
	},
	noticeTitle: {
		color: colors.error || "#EF4444",
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		marginBottom: 2,
	},
	noticeDesc: {
		color: colors.secondaryText,
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
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
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
