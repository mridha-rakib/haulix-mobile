/**
 * HAULIX Customer Mobile App — Phase 03.59
 * Screen: Refund & Dispute (W07 Canonical State: REFUND)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:7923 (EN: "W07-EN / REFUND · Refund & dispute")
 * - Frame ID: 893:8329 (ES: "W07-ES / REFUND · Reembolso y disputa")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend simulation; no actual financial or payment mutations.
 * - Interactive reason selection, details input, and evidence toggle.
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

export type RefundReason = "notCompleted" | "duplicate" | "noShow" | "quality";

export function ReasonChipButton({
	reason,
	label,
	selected,
	onSelect,
	icon,
	testID,
}: {
	reason: RefundReason;
	label: string;
	selected: boolean;
	onSelect: (reason: RefundReason) => void;
	icon: React.ReactNode;
	testID: string;
}) {
	return (
		<Pressable
			accessibilityRole="button"
			onPress={() => onSelect(reason)}
			style={[styles.reasonChip, selected && styles.reasonChipSelected]}
			testID={testID}
		>
			{icon}
			<Text
				style={[
					styles.reasonChipText,
					selected && styles.reasonChipTextSelected,
				]}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export default function JobRefundScreen() {
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
				pathname: "/job-details",
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

	const handleSubmitExample = useCallback(() => {
		router.push({
			pathname: "/job-refund-pending",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleBackToBooking = useCallback(() => {
		router.push({
			pathname: "/job-details",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleAskSupport = useCallback(() => {
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
			<View style={styles.headerRow} testID="w07-refund-header">
				<Pressable
					accessibilityLabel={t("w07Refund.backA11y")}
					accessibilityRole="button"
					hitSlop={8}
					onPress={handleBack}
					style={styles.backButton}
					testID="w07-refund-back-btn"
				>
					<Text style={styles.backChevron}>‹</Text>
				</Pressable>
				<View style={styles.brandTitleContainer}>
					<Text style={styles.brandHaul}>{t("w07Refund.brandHaul")}</Text>
					<Text style={styles.brandIx}>{t("w07Refund.brandIx")}</Text>
				</View>
				<Pressable
					accessibilityLabel="Menu"
					accessibilityRole="button"
					hitSlop={8}
					style={styles.menuButton}
					testID="w07-refund-menu-btn"
				>
					<Text style={styles.menuDots}>{t("w07Refund.menuDots")}</Text>
				</Pressable>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				testID="w07-refund-scroll"
			>
				{/* Title and Subtitle */}
				<View style={styles.titleContainer}>
					<Text style={styles.screenTitle} testID="w07-refund-title">
						{t("w07Refund.screenTitle")}
					</Text>
					<Text style={styles.screenSubtitle} testID="w07-refund-subtitle">
						{t("w07Refund.screenSubtitle")}
					</Text>
				</View>

				{/* Status Badge */}
				<View style={styles.sectionBadge} testID="w07-refund-badge">
					<View style={styles.sectionBadgeIconWrap}>
						<C32AlertTriangleIcon color="#F59E0B" size={14} />
					</View>
					<Text style={styles.sectionBadgeText}>{t("w07Refund.badge")}</Text>
				</View>

				{/* Booking Card */}
				<View style={styles.bookingCard} testID="w07-refund-booking-card">
					<View style={styles.bookingCardTop}>
						<View style={styles.bookingImagePlaceholder}>
							<C32BriefcaseIcon color={colors.brand} size={24} />
						</View>
						<View style={styles.bookingCardInfo}>
							<Text style={styles.bookingRefText}>
								{t("w07Refund.bookingRef")}
							</Text>
							<Text style={styles.bookingCategoryText}>
								{t("w07Refund.serviceCategory")}
							</Text>
							<Text style={styles.bookingItemsText}>
								{t("w07Refund.itemSummary")} · 4 pieces across 3 categories
							</Text>
						</View>
					</View>
					<View style={styles.cardDivider} />
					<View style={styles.bookingScheduleRow}>
						<C32CalendarIcon color={colors.secondaryText} size={14} />
						<Text style={styles.bookingScheduleText}>
							{t("w07Refund.serviceSchedule")}
						</Text>
					</View>
				</View>

				{/* Payment Review Card */}
				<View style={styles.reviewCard} testID="w07-refund-review-card">
					<Text style={styles.reviewHeading}>{t("w07Refund.cardHeading")}</Text>

					{/* Quote & Review Amount Row */}
					<View style={styles.amountRow}>
						<View style={styles.amountCol}>
							<Text style={styles.amountLabel}>
								{t("w07Refund.quoteLabel")}
							</Text>
							<Text style={styles.quoteValue}>
								{t("w07Refund.quoteAmount")}
							</Text>
						</View>
						<View style={styles.amountColRight}>
							<Text style={styles.amountLabel}>
								{t("w07Refund.reviewAmountLabel")}
							</Text>
							<Text style={styles.reviewStatusValue}>
								{t("w07Refund.reviewAmountStatus")}
							</Text>
						</View>
					</View>

					{/* Stripe Note */}
					<View style={styles.stripeNoteWrap}>
						<C32InfoIcon color={colors.secondaryText} size={13} />
						<Text style={styles.stripeNoteText}>
							{t("w07Refund.stripeNote")}
						</Text>
					</View>

					{/* Reason Section */}
					<Text style={styles.reasonHeading}>
						{t("w07Refund.reasonHeading")}
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
							label={t("w07Refund.reasonNotCompleted")}
							onSelect={setSelectedReason}
							reason="notCompleted"
							selected={selectedReason === "notCompleted"}
							testID="w07-refund-chip-notCompleted"
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
							label={t("w07Refund.reasonDuplicate")}
							onSelect={setSelectedReason}
							reason="duplicate"
							selected={selectedReason === "duplicate"}
							testID="w07-refund-chip-duplicate"
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
							label={t("w07Refund.reasonNoShow")}
							onSelect={setSelectedReason}
							reason="noShow"
							selected={selectedReason === "noShow"}
							testID="w07-refund-chip-noShow"
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
							label={t("w07Refund.reasonQuality")}
							onSelect={setSelectedReason}
							reason="quality"
							selected={selectedReason === "quality"}
							testID="w07-refund-chip-quality"
						/>
					</View>

					{/* Additional Details */}
					<Text style={styles.inputLabel}>{t("w07Refund.detailsLabel")}</Text>
					<TextInput
						accessibilityLabel={t("w07Refund.detailsLabel")}
						multiline
						numberOfLines={3}
						onChangeText={setDetailsText}
						placeholder={t("w07Refund.detailsPlaceholder")}
						placeholderTextColor={colors.secondaryText}
						style={styles.textInput}
						testID="w07-refund-input"
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
						testID="w07-refund-attachment-btn"
					>
						<Text
							style={[
								styles.attachmentText,
								evidenceAttached && styles.attachmentTextActive,
							]}
						>
							{evidenceAttached
								? t("w07Refund.attachmentActive")
								: t("w07Refund.attachmentLabel")}
						</Text>
					</Pressable>

					{/* Notice Box */}
					<View style={styles.noticeBox} testID="w07-refund-notice">
						<View style={styles.noticeIconWrap}>
							<C32InfoIcon color="#F59E0B" size={16} />
						</View>
						<View style={styles.noticeContent}>
							<Text style={styles.noticeTitle}>
								{t("w07Refund.noticeTitle")}
							</Text>
							<Text style={styles.noticeDesc}>{t("w07Refund.noticeDesc")}</Text>
						</View>
					</View>
				</View>

				{/* Primary CTA */}
				<Pressable
					accessibilityRole="button"
					onPress={handleSubmitExample}
					style={styles.primaryButton}
					testID="w07-refund-primary-cta"
				>
					<Text style={styles.primaryButtonText}>
						{t("w07Refund.primaryCta")}
					</Text>
				</Pressable>

				{/* Secondary CTA */}
				<Pressable
					accessibilityRole="button"
					onPress={handleBackToBooking}
					style={styles.secondaryButton}
					testID="w07-refund-secondary-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("w07Refund.secondaryCta")}
					</Text>
				</Pressable>

				{/* Tertiary Action */}
				<Pressable
					accessibilityRole="button"
					onPress={handleAskSupport}
					style={styles.tertiaryLink}
					testID="w07-refund-tertiary-cta"
				>
					<Text style={styles.tertiaryLinkText}>
						{t("w07Refund.tertiaryCta")}
					</Text>
				</Pressable>

				{/* Prototype Disclaimer */}
				<Text style={styles.disclaimerText}>
					{t("w07Refund.prototypeDisclaimer")}
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
		backgroundColor: "rgba(245, 158, 11, 0.12)",
		borderColor: "rgba(245, 158, 11, 0.3)",
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
		color: "#F59E0B",
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
		color: "#F59E0B",
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
	reasonChip: {
		alignItems: "center",
		backgroundColor: colors.background,
		borderColor: colors.elevated,
		borderRadius: 8,
		borderWidth: 1,
		flexDirection: "row",
		marginBottom: 8,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: "48.5%",
	},
	reasonChipSelected: {
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderColor: colors.brand,
	},
	reasonChipText: {
		color: colors.secondaryText,
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: 12,
		marginLeft: 6,
	},
	reasonChipTextSelected: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
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
		backgroundColor: "rgba(245, 158, 11, 0.08)",
		borderColor: "rgba(245, 158, 11, 0.25)",
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
		color: "#F59E0B",
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
