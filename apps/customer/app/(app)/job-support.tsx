/**
 * HAULIX Customer Mobile App — Phase 03.58
 * Screen: Customer Support Hub (W07 Canonical State: SUPPORT)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:7443 (EN: "W07-EN / SUPPORT · Customer support")
 * - Frame ID: 893:7849 (ES: "W07-ES / SUPPORT · Atención al cliente")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Dedicated W07 booking-management support flow distinct from W05 and W06.
 * - Interactive topic selection, input state, and photo evidence toggle without server mutation.
 * - Unrestricted frontend navigation; zero route guards.
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
	C32BriefcaseIcon,
	C32CalendarIcon,
	C32CreditCardIcon,
	C32HelpCircleIcon,
	C32InfoIcon,
	C32MessageSquareIcon,
	C32PackageIcon,
	C32SmartphoneIcon,
	C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";

type SupportTopic =
	| "changes"
	| "driver"
	| "service"
	| "payment"
	| "app"
	| "other";

function TopicChipButton({
	topic,
	label,
	selected,
	onSelect,
	icon,
	testID,
}: {
	topic: SupportTopic;
	label: string;
	selected: boolean;
	onSelect: (topic: SupportTopic) => void;
	icon: React.ReactNode;
	testID: string;
}) {
	return (
		<Pressable
			accessibilityRole="button"
			onPress={() => onSelect(topic)}
			style={[styles.topicChip, selected && styles.topicChipSelected]}
			testID={testID}
		>
			{icon}
			<Text
				style={[styles.topicChipText, selected && styles.topicChipTextSelected]}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export default function JobSupportScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

	const [selectedTopic, setSelectedTopic] = useState<SupportTopic>("changes");
	const [descriptionText, setDescriptionText] = useState("");
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

	const handleSubmitSampleCase = useCallback(() => {
		router.push({
			pathname: "/job-support-submitted",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleSeePendingCase = useCallback(() => {
		router.push({
			pathname: "/job-support-pending",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleReturnToBooking = useCallback(() => {
		router.push({
			pathname: "/job-details",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
			{/* Brand Header */}
			<View style={styles.headerRow} testID="w07-support-header">
				<Pressable
					accessibilityLabel={t("w07Support.backA11y")}
					accessibilityRole="button"
					onPress={handleBack}
					style={styles.backCircle}
					testID="w07-support-back-button"
				>
					<Text style={styles.backArrowText}>←</Text>
				</Pressable>

				<View style={styles.wordmarkContainer}>
					<Text style={styles.wordmarkHaul}>{t("w07Support.brandHaul")}</Text>
					<Text style={styles.wordmarkIx}>{t("w07Support.brandIx")}</Text>
				</View>

				<View style={styles.moreButton}>
					<Text style={styles.moreText}>{t("w07Support.menuDots")}</Text>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				testID="w07-support-scroll"
			>
				{/* Hero Section */}
				<View style={styles.heroSection}>
					<Text style={styles.heroTitle}>{t("w07Support.screenTitle")}</Text>
					<Text style={styles.heroSubtitle}>
						{t("w07Support.screenSubtitle")}
					</Text>
				</View>

				{/* Status / Workflow policy badge */}
				<View style={styles.badgeBanner}>
					<View style={styles.badgeIconWrapper}>
						<C32MessageSquareIcon color={colors.brand} size={18} />
					</View>
					<Text style={styles.badgeText}>{t("w07Support.badgeSupport")}</Text>
				</View>

				{/* Card: Booking and visual reference */}
				<View style={styles.cardContainer}>
					<View style={styles.bookingCardInner}>
						<View style={styles.sofaThumbnail}>
							<C32BriefcaseIcon color={colors.secondaryText} size={28} />
						</View>
						<View style={styles.bookingMeta}>
							<Text style={styles.bookingRefText}>
								{t("w07Support.bookingRef")}
							</Text>
							<Text style={styles.bookingServiceText}>
								{t("w07Support.serviceCategory")}
							</Text>
							<Text style={styles.bookingItemsText}>
								{t("w07Support.itemSummary")}
							</Text>
							<View style={styles.scheduleRow}>
								<C32CalendarIcon color={colors.secondaryText} size={14} />
								<Text style={styles.scheduleText}>
									{t("w07Support.serviceSchedule")}
								</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Card: Support Case Composition */}
				<View style={styles.cardContainer}>
					<Text style={styles.sectionHeading}>
						{t("w07Support.questionHeading")}
					</Text>

					{/* Topics Grid: Row 1 */}
					<View style={styles.topicRow}>
						<TopicChipButton
							icon={
								<C32CalendarIcon
									color={
										selectedTopic === "changes"
											? colors.brand
											: colors.secondaryText
									}
									size={20}
								/>
							}
							label={t("w07Support.topicChanges")}
							onSelect={setSelectedTopic}
							selected={selectedTopic === "changes"}
							testID="w07-support-topic-changes"
							topic="changes"
						/>
						<TopicChipButton
							icon={
								<C32TruckIcon
									color={
										selectedTopic === "driver"
											? colors.brand
											: colors.secondaryText
									}
									size={20}
								/>
							}
							label={t("w07Support.topicDriver")}
							onSelect={setSelectedTopic}
							selected={selectedTopic === "driver"}
							testID="w07-support-topic-driver"
							topic="driver"
						/>
						<TopicChipButton
							icon={
								<C32PackageIcon
									color={
										selectedTopic === "service"
											? colors.brand
											: colors.secondaryText
									}
									size={20}
								/>
							}
							label={t("w07Support.topicService")}
							onSelect={setSelectedTopic}
							selected={selectedTopic === "service"}
							testID="w07-support-topic-service"
							topic="service"
						/>
					</View>

					{/* Topics Grid: Row 2 */}
					<View style={styles.topicRow}>
						<TopicChipButton
							icon={
								<C32CreditCardIcon
									color={
										selectedTopic === "payment"
											? colors.brand
											: colors.secondaryText
									}
									size={20}
								/>
							}
							label={t("w07Support.topicPayment")}
							onSelect={setSelectedTopic}
							selected={selectedTopic === "payment"}
							testID="w07-support-topic-payment"
							topic="payment"
						/>
						<TopicChipButton
							icon={
								<C32SmartphoneIcon
									color={
										selectedTopic === "app"
											? colors.brand
											: colors.secondaryText
									}
									size={20}
								/>
							}
							label={t("w07Support.topicApp")}
							onSelect={setSelectedTopic}
							selected={selectedTopic === "app"}
							testID="w07-support-topic-app"
							topic="app"
						/>
						<TopicChipButton
							icon={
								<C32HelpCircleIcon
									color={
										selectedTopic === "other"
											? colors.brand
											: colors.secondaryText
									}
									size={20}
								/>
							}
							label={t("w07Support.topicOther")}
							onSelect={setSelectedTopic}
							selected={selectedTopic === "other"}
							testID="w07-support-topic-other"
							topic="other"
						/>
					</View>

					{/* Description Input */}
					<View style={styles.inputSection}>
						<Text style={styles.inputLabel}>{t("w07Support.inputLabel")}</Text>
						<TextInput
							multiline
							numberOfLines={4}
							onChangeText={setDescriptionText}
							placeholder={t("w07Support.inputPlaceholder")}
							placeholderTextColor={colors.secondaryText}
							style={styles.textInput}
							testID="w07-support-description-input"
							value={descriptionText}
						/>
					</View>

					{/* Attachment Row */}
					<Pressable
						accessibilityRole="button"
						onPress={() => setEvidenceAttached((prev) => !prev)}
						style={[
							styles.attachmentRow,
							evidenceAttached && styles.attachmentRowActive,
						]}
						testID="w07-support-attachment-button"
					>
						<C32InfoIcon
							color={evidenceAttached ? colors.brand : colors.secondaryText}
							size={18}
						/>
						<Text
							style={[
								styles.attachmentText,
								evidenceAttached && styles.attachmentTextActive,
							]}
						>
							{evidenceAttached
								? t("w07Support.attachmentActive")
								: t("w07Support.attachmentLabel")}
						</Text>
					</Pressable>

					<View style={styles.dividerSubtle} />

					{/* Case status / Job linked notice */}
					<View style={styles.caseStatusBox}>
						<Text style={styles.caseStatusTitle}>
							{t("w07Support.caseStatusTitle")}
						</Text>
						<Text style={styles.caseStatusDesc}>
							{t("w07Support.caseStatusDesc")}
						</Text>
					</View>
				</View>

				{/* Action CTAs */}
				<View style={styles.actionSection}>
					<Pressable
						accessibilityRole="button"
						onPress={handleSubmitSampleCase}
						style={styles.primaryButton}
						testID="w07-support-submit-button"
					>
						<Text style={styles.primaryButtonText}>
							{t("w07Support.primaryCta")}
						</Text>
					</Pressable>

					<Pressable
						accessibilityRole="button"
						onPress={handleSeePendingCase}
						style={styles.secondaryButton}
						testID="w07-support-pending-button"
					>
						<Text style={styles.secondaryButtonText}>
							{t("w07Support.secondaryCta")}
						</Text>
					</Pressable>

					<Pressable
						accessibilityRole="button"
						onPress={handleReturnToBooking}
						style={styles.tertiaryLink}
						testID="w07-support-return-link"
					>
						<Text style={styles.tertiaryText}>
							{t("w07Support.tertiaryCta")}
						</Text>
					</Pressable>
				</View>

				{/* Prototype Disclaimer */}
				<Text style={styles.disclaimerText}>
					{t("w07Support.prototypeDisclaimer")}
				</Text>
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
		height: 56,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.elevated,
	},
	backCircle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.surface,
		alignItems: "center",
		justifyContent: "center",
	},
	backArrowText: {
		fontSize: 20,
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
	},
	wordmarkContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	wordmarkHaul: {
		fontSize: 20,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
	},
	wordmarkIx: {
		fontSize: 20,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	moreButton: {
		width: 40,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	moreText: {
		fontSize: 20,
		color: colors.secondaryText,
		fontFamily: fontFamily.bold,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 16,
		paddingBottom: 40,
		gap: 16,
	},
	heroSection: {
		gap: 6,
	},
	heroTitle: {
		fontSize: 24,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		lineHeight: 30,
	},
	heroSubtitle: {
		fontSize: 13,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	badgeBanner: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 12,
		gap: 10,
		borderWidth: 1,
		borderColor: colors.elevated,
	},
	badgeIconWrapper: {
		width: 24,
		height: 24,
		borderRadius: 12,
		backgroundColor: "rgba(186, 255, 66, 0.15)",
		alignItems: "center",
		justifyContent: "center",
	},
	badgeText: {
		fontSize: 12,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
		letterSpacing: 0.5,
	},
	cardContainer: {
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 16,
		padding: 16,
		gap: 14,
	},
	bookingCardInner: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
	},
	sofaThumbnail: {
		width: 80,
		height: 70,
		borderRadius: 10,
		backgroundColor: "#1c2420",
		alignItems: "center",
		justifyContent: "center",
	},
	bookingMeta: {
		flex: 1,
		gap: 3,
	},
	bookingRefText: {
		fontSize: 11,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	bookingServiceText: {
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	bookingItemsText: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
	},
	scheduleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginTop: 2,
	},
	scheduleText: {
		fontSize: 11,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
	},
	sectionHeading: {
		fontSize: 16,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
	},
	topicRow: {
		flexDirection: "row",
		gap: 8,
	},
	topicChip: {
		flex: 1,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 6,
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},
	topicChipSelected: {
		borderColor: colors.brand,
		backgroundColor: "#1e2722",
	},
	topicChipText: {
		fontSize: 11,
		fontFamily: fontFamily.semiBold,
		color: colors.secondaryText,
		textAlign: "center",
	},
	topicChipTextSelected: {
		color: colors.primaryText,
	},
	inputSection: {
		gap: 6,
	},
	inputLabel: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	textInput: {
		backgroundColor: "#111614",
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 12,
		padding: 12,
		color: colors.primaryText,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		minHeight: 80,
		textAlignVertical: "top",
	},
	attachmentRow: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#111614",
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 14,
		gap: 10,
	},
	attachmentRowActive: {
		borderColor: colors.brand,
		backgroundColor: "rgba(186, 255, 66, 0.08)",
	},
	attachmentText: {
		fontSize: 12,
		fontFamily: fontFamily.semiBold,
		color: colors.secondaryText,
	},
	attachmentTextActive: {
		color: colors.brand,
	},
	dividerSubtle: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 4,
	},
	caseStatusBox: {
		gap: 3,
	},
	caseStatusTitle: {
		fontSize: 12,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	caseStatusDesc: {
		fontSize: 11,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
	},
	actionSection: {
		gap: 10,
		marginTop: 4,
	},
	primaryButton: {
		height: 52,
		borderRadius: 14,
		backgroundColor: colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonText: {
		fontSize: 15,
		fontFamily: fontFamily.bold,
		color: colors.surface,
	},
	secondaryButton: {
		height: 52,
		borderRadius: 14,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonText: {
		fontSize: 15,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	tertiaryLink: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
	},
	tertiaryText: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	disclaimerText: {
		fontSize: 10,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		textAlign: "center",
		marginTop: 4,
	},
});
