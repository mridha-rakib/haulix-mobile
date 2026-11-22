/**
 * HAULIX Customer Mobile App — Phase 03.38
 * Screen C28-U: Booking Terms Changed
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:536 (430 × 1052 px)
 * - Spanish Variant: Node 766:922 (430 × 1052 px)
 *
 * Upstream Entry:
 * - From C28 (/review-booking) via "Policy was updated" CTA.
 *
 * Core Behavioral Rule:
 * - Policy update invalidates previously accepted terms consent.
 * - Calling "Review updated terms" updates termsVersion to "2026.11-v2", sets
 *   termsConsentAccepted: false, and returns to /review-booking where customer
 *   must explicitly re-consent before payment can be unlocked.
 * - Symmetrical non-binding subtotal strictly $356.00 USD.
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
	invalidateTermsConsent,
	SAMPLE_DATES,
	SAMPLE_WINDOWS,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function AlertTriangleIcon() {
	return (
		<Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
			<Path
				d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 9v4"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
			/>
			<Circle cx={12} cy={17} r={1} fill="#F2C94C" />
		</Svg>
	);
}

function CheckCircleSmallIcon() {
	return (
		<Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
			<Circle cx={12} cy={12} r={10} stroke={colors.brand} strokeWidth={2} />
			<Path
				d="M8 12l2.5 2.5L16 9"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default function BookingTermsChangedScreen() {
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
		return subscribeToW04Draft((updated) => setDraft({ ...updated }));
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/review-booking",
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

	const handleReviewUpdatedTerms = useCallback(() => {
		invalidateTermsConsent("policy_updated");
		router.push({
			pathname: "/review-booking",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleBackToScheduling = useCallback(() => {
		router.push({
			pathname: "/select-available-window",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const selectedDate =
		SAMPLE_DATES.find((d) => d.id === draft.selectedDateId) ?? SAMPLE_DATES[0];
	const selectedWindow =
		SAMPLE_WINDOWS.find((w) => w.id === draft.selectedWindowId) ??
		SAMPLE_WINDOWS[0];

	const timeSummary =
		draft.timingMode === "asap"
			? currentLocale === "es"
				? "Lo antes posible · Sujeto a conductor"
				: "ASAP · Subject to driver"
			: currentLocale === "es"
				? `${selectedDate.fullDateEs} · ${selectedWindow.shortEs} MST`
				: `${selectedDate.fullDateEn} · ${selectedWindow.shortEn} MST`;

	const pickupArea =
		currentLocale === "es" ? draft.pickupAreaEs : draft.pickupAreaEn;
	const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID="c28u-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c28uBookingTermsChanged.backA11y")}
					testID="c28u-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c28u-scroll-view"
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
						<Text style={styles.progressLabel} testID="c28u-progress-label">
							{t("c28uBookingTermsChanged.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "50%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c28u-title">
							{t("c28uBookingTermsChanged.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c28u-subtitle">
							{t("c28uBookingTermsChanged.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.chipContainer}>
						<Text style={styles.chipText}>
							{t("c28uBookingTermsChanged.serviceArea")}
						</Text>
					</View>

					{/* Warning Banner Card */}
					<View style={styles.warningCard} testID="c28u-warning-card">
						<View style={styles.warningHeader}>
							<AlertTriangleIcon />
							<View style={styles.warningBadge} testID="c28u-warning-badge">
								<Text style={styles.warningBadgeText}>
									{t("c28uBookingTermsChanged.warningBadge")}
								</Text>
							</View>
						</View>
						<Text style={styles.warningTitle}>
							{t("c28uBookingTermsChanged.warningTitle")}
						</Text>
						<Text style={styles.warningExplanation}>
							{t("c28uBookingTermsChanged.warningExplanation")}
						</Text>
					</View>

					{/* What Changed Section */}
					<View style={styles.changesCard} testID="c28u-changes-card">
						<Text style={styles.sectionHeading}>
							{t("c28uBookingTermsChanged.summaryHeading")}
						</Text>

						<View style={styles.changeRow}>
							<CheckCircleSmallIcon />
							<Text style={styles.changeText}>
								{t("c28uBookingTermsChanged.changeItem1")}
							</Text>
						</View>

						<View style={styles.changeRow}>
							<CheckCircleSmallIcon />
							<Text style={styles.changeText}>
								{t("c28uBookingTermsChanged.changeItem2")}
							</Text>
						</View>

						<View style={styles.changeRow}>
							<CheckCircleSmallIcon />
							<Text style={styles.changeText}>
								{t("c28uBookingTermsChanged.changeItem3")}
							</Text>
						</View>
					</View>

					{/* Preserved Scope & Estimate Card */}
					<View style={styles.snapshotCard} testID="c28u-snapshot-card">
						<Text style={styles.sectionHeading}>
							{t("c28uBookingTermsChanged.preservedScopeHeading")}
						</Text>

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c28uBookingTermsChanged.pickupAreaLabel")}
							</Text>
							<Text style={styles.snapshotValue}>{pickupArea}</Text>
						</View>

						<View style={styles.snapshotDivider} />

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c28uBookingTermsChanged.confirmedItemsLabel")}
							</Text>
							<Text style={styles.snapshotValue}>{confirmedItems}</Text>
						</View>

						<View style={styles.snapshotDivider} />

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>TIMING</Text>
							<Text style={styles.snapshotValue}>{timeSummary}</Text>
						</View>

						<View style={styles.snapshotDivider} />

						<View style={styles.priceRow}>
							<Text style={styles.priceLabel}>
								{t("c28uBookingTermsChanged.estimateLabel")}
							</Text>
							<Text style={styles.priceValue} testID="c28u-price-value">
								{t("c28uBookingTermsChanged.estimateValue")}
							</Text>
						</View>
					</View>

					{/* Consent Invalidation Callout */}
					<View style={styles.noticePanel} testID="c28u-notice-panel">
						<Text style={styles.noticeTitle}>
							{t("c28uBookingTermsChanged.noticeTitle")}
						</Text>
						<Text style={styles.noticeBody}>
							{t("c28uBookingTermsChanged.noticeExplanation")}
						</Text>
					</View>

					{/* Action CTAs */}
					<View style={styles.actionContainer}>
						<Pressable
							style={({ pressed }) => [
								styles.primaryButton,
								pressed && styles.primaryButtonPressed,
							]}
							onPress={handleReviewUpdatedTerms}
							accessibilityRole="button"
							accessibilityLabel={t("c28uBookingTermsChanged.primaryCta")}
							testID="c28u-primary-cta"
						>
							<Text style={styles.primaryButtonText}>
								{t("c28uBookingTermsChanged.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								styles.secondaryButton,
								pressed && styles.secondaryButtonPressed,
							]}
							onPress={handleBackToScheduling}
							accessibilityRole="button"
							accessibilityLabel={t("c28uBookingTermsChanged.secondaryCta")}
							testID="c28u-secondary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c28uBookingTermsChanged.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Prototype Disclosure Footer */}
					<View style={styles.footerContainer}>
						<Text style={styles.footerNote}>
							{t("c28uBookingTermsChanged.uiNote")}
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
		paddingTop: 12,
		paddingBottom: 40,
	},
	brandRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	brandHaul: {
		fontFamily: fontFamily.bold,
		fontSize: 22,
		color: colors.primaryText,
		letterSpacing: 0.5,
	},
	brandIx: {
		color: colors.brand,
	},
	tagline: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.secondaryText,
		letterSpacing: 1.2,
	},
	progressContainer: {
		marginBottom: 18,
	},
	progressLabel: {
		fontFamily: fontFamily.bold,
		fontSize: 12,
		color: colors.brand,
		letterSpacing: 1.2,
		marginBottom: 6,
	},
	progressBarBackground: {
		height: 4,
		backgroundColor: colors.elevated,
		borderRadius: 2,
		overflow: "hidden",
	},
	progressBarFill: {
		height: 4,
		backgroundColor: colors.brand,
		borderRadius: 2,
	},
	headerBlock: {
		marginBottom: 16,
	},
	screenTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 26,
		lineHeight: 32,
		color: colors.primaryText,
		marginBottom: 6,
	},
	screenSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 14,
		lineHeight: 20,
		color: colors.secondaryText,
	},
	chipContainer: {
		alignSelf: "flex-start",
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginBottom: 18,
	},
	chipText: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.secondaryText,
		letterSpacing: 0.8,
	},
	warningCard: {
		backgroundColor: "#1C170E",
		borderColor: "#F2C94C",
		borderWidth: 1.5,
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
	},
	warningHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	warningBadge: {
		backgroundColor: "rgba(242, 201, 76, 0.18)",
		borderColor: "#F2C94C",
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 3,
	},
	warningBadgeText: {
		fontFamily: fontFamily.bold,
		fontSize: 10,
		color: "#F2C94C",
		letterSpacing: 0.8,
	},
	warningTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 14,
		color: "#F2C94C",
		letterSpacing: 0.6,
		marginBottom: 6,
	},
	warningExplanation: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		color: colors.primaryText,
	},
	changesCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderWidth: 1,
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
	},
	sectionHeading: {
		fontFamily: fontFamily.bold,
		fontSize: 11,
		color: colors.secondaryText,
		letterSpacing: 1.2,
		marginBottom: 12,
	},
	changeRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 10,
	},
	changeText: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		color: colors.primaryText,
		marginLeft: 10,
	},
	snapshotCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderWidth: 1,
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
	},
	snapshotRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 4,
	},
	snapshotLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.secondaryText,
		letterSpacing: 0.8,
	},
	snapshotValue: {
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.primaryText,
		maxWidth: "60%",
		textAlign: "right",
	},
	snapshotDivider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 8,
	},
	priceRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 6,
	},
	priceLabel: {
		fontFamily: fontFamily.bold,
		fontSize: 13,
		color: colors.primaryText,
	},
	priceValue: {
		fontFamily: fontFamily.bold,
		fontSize: 20,
		color: colors.brand,
	},
	noticePanel: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderWidth: 1,
		borderRadius: 12,
		padding: 14,
		marginBottom: 20,
	},
	noticeTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 11,
		color: colors.brand,
		letterSpacing: 1,
		marginBottom: 4,
	},
	noticeBody: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 17,
		color: colors.secondaryText,
	},
	actionContainer: {
		gap: 12,
		marginBottom: 24,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		borderRadius: 12,
		paddingVertical: 15,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonPressed: {
		opacity: 0.88,
	},
	primaryButtonText: {
		fontFamily: fontFamily.bold,
		fontSize: 15,
		color: colors.background,
		letterSpacing: 0.5,
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderWidth: 1,
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
	},
	secondaryButtonText: {
		fontFamily: fontFamily.bold,
		fontSize: 14,
		color: colors.primaryText,
	},
	footerContainer: {
		alignItems: "center",
		paddingTop: 8,
	},
	footerNote: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
		textAlign: "center",
	},
});
