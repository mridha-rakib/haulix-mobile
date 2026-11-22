/**
 * HAULIX Customer Mobile App — Phase 03.48
 * Screen: RESTART · Finding a replacement driver
 *
 * Route: /dispatch-retry
 * Authoritative Figma Reference:
 * - EN: Node 844:5641
 * - ES: Node 844:7791
 *
 * UNRESTRICTED FRONTEND ROUTING:
 * - Direct deep-link accessible without auth or prerequisite guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
	BackHandler,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	C32BellIcon,
	C32BoxIcon,
	C32CalendarIcon,
	C32CheckCircleIcon,
	C32ClockIcon,
	C32LocationPinIcon,
	C32SearchIcon,
	C32ShieldCheckIcon,
} from "../../src/components/dispatch/C32Icons";
import { W05ProgressTracker } from "../../src/components/dispatch/W05ProgressTracker";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getW05DispatchState,
	subscribeToW05DispatchState,
} from "../../src/fixtures/c32Dispatch";

export default function DispatchRetryScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [_dispatchState, setDispatchState] = useState(getW05DispatchState);

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	useEffect(() => {
		return subscribeToW05DispatchState((updated) =>
			setDispatchState({ ...updated }),
		);
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/helper-matching",
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

	// Primary CTA: Demo: replacement accepts -> navigate to driver profile details
	const handleReplacementAccepts = useCallback(() => {
		router.push({
			pathname: "/driver-profile-details",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	// Secondary CTA: No eligible replacement -> navigate to no driver available
	const handleNoEligibleReplacement = useCallback(() => {
		router.push({
			pathname: "/no-driver-available",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	// Alternative recovery link: Contact support -> cancellation windows / support
	const handleContactSupport = useCallback(() => {
		router.push({
			pathname: "/cancellation-windows",
			params: {
				fromPhase: "restart",
				...(params.previewLocale
					? { previewLocale: params.previewLocale }
					: {}),
			},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID="w05-dispatch-retry-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("w05Restart.backA11y")}
					testID="w05-dispatch-retry-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="w05-dispatch-retry-scroll"
				>
					{/* 5-Node Dispatch Progress Tracker - Active Step: Dispatch */}
					<W05ProgressTracker
						activeStep="dispatch"
						testID="w05-dispatch-retry-tracker"
					/>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="w05-dispatch-retry-title">
							{t("w05Restart.screenTitle")}
						</Text>
						<Text
							style={styles.screenSubtitle}
							testID="w05-dispatch-retry-subtitle"
						>
							{t("w05Restart.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View
						style={styles.locationChip}
						testID="w05-dispatch-retry-location-chip"
					>
						<C32LocationPinIcon size={16} color={colors.brand} />
						<Text style={styles.locationText}>
							{t("w05Restart.serviceArea")}
						</Text>
					</View>

					{/* Map Card Viewport */}
					<View style={styles.mapCardWrap} testID="w05-dispatch-retry-map-wrap">
						<HaulixDispatchMap
							mode="driver_reassigned"
							locale={currentLocale}
							mapBadgeLabel={t("w05Restart.mapLabel")}
							testID="w05-dispatch-retry-map"
						/>
					</View>

					{/* Card: Dispatch Summary */}
					<View
						style={styles.summaryCard}
						testID="w05-dispatch-retry-summary-card"
					>
						<View style={styles.summaryHeaderRow}>
							<View style={styles.statusPill}>
								<C32SearchIcon size={14} color={colors.brand} />
								<Text style={styles.statusPillText}>
									{t("w05Restart.statusBadge")}
								</Text>
							</View>
							<View style={styles.bookingRefWrap}>
								<Text style={styles.bookingRefPrefix}>
									{t("w05Restart.bookingRefPrefix")}
								</Text>
								<Text style={styles.bookingRefNumber}>
									{t("w05Restart.bookingRefValue")}
								</Text>
							</View>
						</View>

						<Text style={styles.explanationText}>
							{t("w05Restart.statusExplanation")}
						</Text>

						<View style={styles.cardDivider} />

						{/* Detail Row: SERVICE */}
						<View style={styles.detailRow}>
							<View style={styles.detailIconWrap}>
								<C32BoxIcon size={16} color="#ADB7B1" />
							</View>
							<View style={styles.detailTexts}>
								<Text style={styles.detailLabel}>
									{t("w05Restart.serviceLabel")}
								</Text>
								<Text style={styles.detailValue}>
									{t("w05Restart.serviceValue")}
								</Text>
							</View>
						</View>

						{/* Detail Row: DATE · DEMO */}
						<View style={styles.detailRow}>
							<View style={styles.detailIconWrap}>
								<C32CalendarIcon size={16} color="#ADB7B1" />
							</View>
							<View style={styles.detailTexts}>
								<Text style={styles.detailLabel}>
									{t("w05Restart.dateLabel")}
								</Text>
								<Text style={styles.detailValue}>
									{t("w05Restart.dateValue")}
								</Text>
							</View>
						</View>

						{/* Detail Row: ILLUSTRATIVE QUOTE (Resilient layout) */}
						<View style={styles.detailRow}>
							<View style={styles.detailIconWrap}>
								<C32ShieldCheckIcon size={16} color="#ADB7B1" />
							</View>
							<View style={styles.detailTexts}>
								<Text style={styles.detailLabel}>
									{t("w05Restart.quoteLabel")}
								</Text>
								<Text style={styles.quoteValue}>
									{t("w05Restart.quoteValue")}
								</Text>
							</View>
						</View>
					</View>

					{/* Card: Dispatch Activity */}
					<View
						style={styles.activityCard}
						testID="w05-dispatch-retry-activity-card"
					>
						<Text style={styles.activityHeader}>
							{t("w05Restart.activityHeader")}
						</Text>

						{/* Item 0 */}
						<View style={styles.activityItem}>
							<View style={styles.activityIconHalo}>
								<C32CheckCircleIcon size={16} color={colors.brand} />
							</View>
							<View style={styles.activityCopy}>
								<Text style={styles.activityTitle}>
									{t("w05Restart.activity1Title")}
								</Text>
								<Text style={styles.activityDesc}>
									{t("w05Restart.activity1Desc")}
								</Text>
							</View>
						</View>

						{/* Item 1 */}
						<View style={styles.activityItem}>
							<View style={styles.activityIconHalo}>
								<C32ClockIcon size={16} color={colors.brand} />
							</View>
							<View style={styles.activityCopy}>
								<Text style={styles.activityTitle}>
									{t("w05Restart.activity2Title")}
								</Text>
								<Text style={styles.activityDesc}>
									{t("w05Restart.activity2Desc")}
								</Text>
							</View>
						</View>

						{/* Item 2 */}
						<View style={styles.activityItem}>
							<View style={styles.activityIconHalo}>
								<C32BellIcon size={16} color={colors.brand} />
							</View>
							<View style={styles.activityCopy}>
								<Text style={styles.activityTitle}>
									{t("w05Restart.activity3Title")}
								</Text>
								<Text style={styles.activityDesc}>
									{t("w05Restart.activity3Desc")}
								</Text>
							</View>
						</View>
					</View>

					{/* Action Buttons */}
					<View style={styles.actionsWrap}>
						<Pressable
							style={styles.primaryButton}
							onPress={handleReplacementAccepts}
							accessibilityRole="button"
							accessibilityLabel={t("w05Restart.primaryCta")}
							testID="w05-dispatch-retry-primary-cta"
						>
							<Text style={styles.primaryButtonText}>
								{t("w05Restart.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={styles.secondaryButton}
							onPress={handleNoEligibleReplacement}
							accessibilityRole="button"
							accessibilityLabel={t("w05Restart.secondaryCta")}
							testID="w05-dispatch-retry-secondary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("w05Restart.secondaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={styles.alternativeLinkWrap}
							onPress={handleContactSupport}
							accessibilityRole="button"
							accessibilityLabel={t("w05Restart.alternativeLink")}
							testID="w05-dispatch-retry-alternative-link"
						>
							<Text style={styles.alternativeLinkText}>
								{t("w05Restart.alternativeLink")}
							</Text>
						</Pressable>
					</View>

					{/* Prototype Disclaimer */}
					<Text style={styles.disclaimerText}>
						{t("w05Restart.prototypeDisclaimer")}
					</Text>
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
	headerBlock: {
		alignItems: "center",
		marginBottom: 16,
	},
	screenTitle: {
		fontSize: 24,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		textAlign: "center",
		lineHeight: 32,
		marginBottom: 8,
	},
	screenSubtitle: {
		fontSize: 13,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		textAlign: "center",
		lineHeight: 18,
		paddingHorizontal: 8,
	},
	locationChip: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "#121716",
		borderWidth: 1,
		borderColor: "#1E2723",
		paddingHorizontal: 12,
		paddingVertical: 7,
		borderRadius: 12,
		marginBottom: 16,
		gap: 8,
	},
	locationText: {
		fontSize: 11,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
		letterSpacing: 0.5,
	},
	mapCardWrap: {
		width: "100%",
		borderRadius: 19,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#1E2723",
		marginBottom: 16,
	},
	summaryCard: {
		backgroundColor: "#121716",
		borderRadius: 19,
		borderWidth: 1,
		borderColor: "#35403A",
		padding: 18,
		marginBottom: 16,
	},
	summaryHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	statusPill: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#202724",
		paddingHorizontal: 8,
		paddingVertical: 6,
		borderRadius: 10,
		gap: 6,
	},
	statusPillText: {
		fontSize: 10,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.6,
	},
	bookingRefWrap: {
		alignItems: "flex-end",
	},
	bookingRefPrefix: {
		fontSize: 9,
		fontFamily: fontFamily.regular,
		color: "#AFBAB4",
		lineHeight: 12,
	},
	bookingRefNumber: {
		fontSize: 11,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		lineHeight: 15,
	},
	explanationText: {
		fontSize: 11,
		fontFamily: fontFamily.medium,
		color: "#AFBAB4",
		lineHeight: 16,
		marginBottom: 12,
	},
	cardDivider: {
		height: 1,
		backgroundColor: "rgba(51, 69, 59, 0.55)",
		marginBottom: 14,
	},
	detailRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		gap: 12,
		minHeight: 32,
	},
	detailIconWrap: {
		width: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	detailTexts: {
		flex: 1,
		minWidth: 0,
	},
	detailLabel: {
		fontSize: 10,
		fontFamily: fontFamily.medium,
		color: "#AFBAB4",
		letterSpacing: 0.8,
		lineHeight: 14,
	},
	detailValue: {
		fontSize: 12,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		lineHeight: 17,
	},
	quoteValue: {
		fontSize: 13,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		lineHeight: 18,
	},
	activityCard: {
		backgroundColor: "#121716",
		borderRadius: 19,
		borderWidth: 1,
		borderColor: "#35403A",
		padding: 18,
		marginBottom: 20,
	},
	activityHeader: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		marginBottom: 16,
	},
	activityItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 14,
		gap: 12,
	},
	activityIconHalo: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "rgba(186, 255, 66, 0.09)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.18)",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 2,
	},
	activityCopy: {
		flex: 1,
		minWidth: 0,
	},
	activityTitle: {
		fontSize: 12,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		lineHeight: 17,
		marginBottom: 2,
	},
	activityDesc: {
		fontSize: 10,
		fontFamily: fontFamily.regular,
		color: "#A6B8AD",
		lineHeight: 15,
	},
	actionsWrap: {
		gap: 10,
		marginBottom: 16,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		height: 52,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	primaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		color: "#080B0B",
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		height: 52,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#35403B",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	secondaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	alternativeLinkWrap: {
		alignItems: "center",
		paddingVertical: 8,
	},
	alternativeLinkText: {
		fontSize: 11,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
	},
	disclaimerText: {
		fontSize: 9,
		fontFamily: fontFamily.regular,
		color: "#76827B",
		textAlign: "center",
		marginTop: 8,
	},
});
