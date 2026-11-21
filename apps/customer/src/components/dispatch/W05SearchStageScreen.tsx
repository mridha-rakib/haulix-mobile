/**
 * HAULIX Customer Mobile App — Phase 03.47
 * Reusable Dispatch Search Stage Screen (S20, S30, S40, S50)
 *
 * Authoritative Master Reference:
 * - S20: Node 844:4670 (EN) / Node 844:6820 (ES)
 * - S30: Node 844:4769 (EN) / Node 844:6919 (ES)
 * - S40: Node 844:4868 (EN) / Node 844:7018 (ES)
 * - S50: Node 844:4967 (EN) / Node 844:7117 (ES)
 *
 * UNRESTRICTED FRONTEND ROUTING:
 * - Pure frontend deterministic presentation.
 * - Zero auth guards, zero dispatch prerequisite blocks.
 * - Direct deep-link accessible with Back navigation and locale preservation.
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
import {
	getW05DispatchState,
	simulateDriverMatched,
	subscribeToW05DispatchState,
} from "../../fixtures/c32Dispatch";
import { HaulixDispatchMap } from "../map/HaulixDispatchMap";
import { FlowHeaderBack } from "../navigation/FlowHeaderBack";
import { C32RadarIcon } from "./C32Icons";

export type W05SearchStage = "s20" | "s30" | "s40" | "s50";

export interface W05SearchStageScreenProps {
	stage: W05SearchStage;
	nextRoute: string;
	backRoute: string;
	previewMatchRoute?: string;
	cancelRoute?: string;
	testIDPrefix: string;
}

export function W05SearchStageScreen({
	stage,
	nextRoute,
	backRoute,
	previewMatchRoute = "/driver-matched",
	cancelRoute = "/cancellation-windows",
	testIDPrefix,
}: W05SearchStageScreenProps) {
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
				pathname: backRoute as unknown as `/${string}`,
				params: params.previewLocale
					? { previewLocale: params.previewLocale }
					: {},
			});
		}
	}, [router, backRoute, params.previewLocale]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handlePrimaryNext = useCallback(() => {
		router.push({
			pathname: nextRoute as unknown as `/${string}`,
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, nextRoute, params.previewLocale]);

	const handlePreviewMatch = useCallback(() => {
		simulateDriverMatched();
		router.push({
			pathname: previewMatchRoute as unknown as `/${string}`,
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, previewMatchRoute, params.previewLocale]);

	const handleCancellation = useCallback(() => {
		router.push({
			pathname: cancelRoute as unknown as `/${string}`,
			params: {
				fromPhase: "searching",
				searchStage: stage,
				...(params.previewLocale
					? { previewLocale: params.previewLocale }
					: {}),
			},
		});
	}, [router, cancelRoute, stage, params.previewLocale]);

	// Stage translation key mapping
	const translationKey =
		stage === "s20"
			? "w05S20"
			: stage === "s30"
				? "w05S30"
				: stage === "s40"
					? "w05S40"
					: "w05S50";

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID={`${testIDPrefix}-screen`}>
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t(`${translationKey}.backA11y`)}
					testID={`${testIDPrefix}-header-back`}
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID={`${testIDPrefix}-scroll-view`}
				>
					{/* Progress Label */}
					<View style={styles.brandRow}>
						<Text style={styles.progressText}>
							{t(`${translationKey}.progressLabel`)}
						</Text>
					</View>

					{/* Screen Headline & Subtitle */}
					<Text style={styles.screenTitle}>
						{t(`${translationKey}.screenTitle`)}
					</Text>
					<Text style={styles.screenSubtitle}>
						{t(`${translationKey}.screenSubtitle`)}
					</Text>

					{/* Location Chip */}
					<View
						style={styles.locationChip}
						testID={`${testIDPrefix}-location-chip`}
					>
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t(`${translationKey}.serviceArea`)}
						</Text>
					</View>

					{/* Status Badge Capsule */}
					<View
						style={styles.statusBadgeCapsule}
						testID={`${testIDPrefix}-status-badge`}
					>
						<C32RadarIcon size={16} color={colors.brand} />
						<Text style={styles.statusBadgeText}>
							{t(`${translationKey}.statusBadge`)}
						</Text>
					</View>

					{/* Authentic Localized Map Viewport */}
					<View
						style={styles.mapCardWrap}
						testID={`${testIDPrefix}-map-container`}
					>
						<HaulixDispatchMap
							mode={stage}
							locale={currentLocale}
							showControls={false}
							pickupLabel="Phoenix, AZ"
							testID={`${testIDPrefix}-dispatch-map`}
						/>
					</View>

					{/* Summary Card */}
					<View
						style={styles.cardContainer}
						testID={`${testIDPrefix}-summary-card`}
					>
						<View style={styles.summaryHeaderRow}>
							<Text style={styles.cardHeaderTitle}>
								{t(`${translationKey}.bookingRefPrefix`)}{" "}
								{t(`${translationKey}.bookingRefValue`)}
							</Text>
							<Text style={styles.cardHeaderSub}>DEMO</Text>
						</View>

						<Text style={styles.statusExplanationText}>
							{t(`${translationKey}.statusExplanation`)}
						</Text>

						<View style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t(`${translationKey}.serviceLabel`)}
							</Text>
							<Text
								style={[
									styles.detailTextValue,
									{ maxWidth: "65%", textAlign: "right" },
								]}
								testID={`${testIDPrefix}-service-value`}
							>
								{t(`${translationKey}.serviceValue`)}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t(`${translationKey}.dateLabel`)}
							</Text>
							<Text
								style={styles.detailTextValue}
								testID={`${testIDPrefix}-date-value`}
							>
								{t(`${translationKey}.dateValue`)}
							</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t(`${translationKey}.quoteLabel`)}
							</Text>
							<Text
								style={styles.detailAmountValue}
								testID={`${testIDPrefix}-quote-value`}
							>
								{t(`${translationKey}.quoteValue`)}
							</Text>
						</View>
					</View>

					{/* Activity Timeline Card */}
					<View
						style={styles.cardContainer}
						testID={`${testIDPrefix}-activity-card`}
					>
						<Text style={styles.cardHeaderTitle}>
							{t(`${translationKey}.activityHeader`)}
						</Text>

						<View style={styles.timelineList}>
							{/* Step 1 */}
							<View style={styles.timelineItem}>
								<View style={styles.timelineDot} />
								<View style={styles.timelineContent}>
									<Text style={styles.timelineTitle}>
										{t(`${translationKey}.activity1Title`)}
									</Text>
									<Text style={styles.timelineDesc}>
										{t(`${translationKey}.activity1Desc`)}
									</Text>
								</View>
							</View>

							{/* Step 2 */}
							<View style={styles.timelineItem}>
								<View style={styles.timelineDotActive} />
								<View style={styles.timelineContent}>
									<Text style={styles.timelineTitle}>
										{t(`${translationKey}.activity2Title`)}
									</Text>
									<Text style={styles.timelineDesc}>
										{t(`${translationKey}.activity2Desc`)}
									</Text>
								</View>
							</View>

							{/* Step 3 */}
							<View
								style={[
									styles.timelineItem,
									{ borderLeftWidth: 0, paddingBottom: 0 },
								]}
							>
								<View style={styles.timelineDotPending} />
								<View style={styles.timelineContent}>
									<Text style={styles.timelineTitle}>
										{t(`${translationKey}.activity3Title`)}
									</Text>
									<Text style={styles.timelineDesc}>
										{t(`${translationKey}.activity3Desc`)}
									</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Action CTAs */}
					<View style={styles.actionsContainer}>
						<Pressable
							onPress={handlePrimaryNext}
							style={styles.primaryLimeButton}
							accessibilityRole="button"
							accessibilityLabel={t(`${translationKey}.primaryCta`)}
							testID={`${testIDPrefix}-primary-btn`}
						>
							<Text style={styles.primaryLimeButtonText}>
								{t(`${translationKey}.primaryCta`)}
							</Text>
						</Pressable>

						<Pressable
							onPress={handlePreviewMatch}
							style={styles.secondaryDarkButton}
							accessibilityRole="button"
							accessibilityLabel={t(`${translationKey}.secondaryCta`)}
							testID={`${testIDPrefix}-preview-match-btn`}
						>
							<Text style={styles.secondaryDarkButtonText}>
								{t(`${translationKey}.secondaryCta`)}
							</Text>
						</Pressable>

						<Pressable
							onPress={handleCancellation}
							style={styles.linkButton}
							accessibilityRole="button"
							accessibilityLabel={t(`${translationKey}.alternativeLink`)}
							testID={`${testIDPrefix}-cancellation-link`}
						>
							<Text style={styles.linkButtonText}>
								{t(`${translationKey}.alternativeLink`)}
							</Text>
						</Pressable>
					</View>

					{/* Prototype Footer Disclaimer */}
					<View style={styles.footerContainer}>
						<Text style={styles.footerNoteText}>
							{t(`${translationKey}.prototypeDisclaimer`)}
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
		paddingHorizontal: 16,
		paddingTop: 8,
		paddingBottom: 40,
	},
	brandRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
	},
	progressText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
		letterSpacing: 0.5,
	},
	screenTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 24,
		lineHeight: 30,
		color: colors.primaryText,
		marginBottom: 4,
		letterSpacing: -0.4,
	},
	screenSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		color: colors.secondaryText,
		lineHeight: 18,
		marginBottom: 10,
	},
	locationChip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#131817",
		borderColor: "#1E2724",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 4,
		alignSelf: "flex-start",
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
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: "#ADB7B1",
		letterSpacing: 0.5,
	},
	statusBadgeCapsule: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderColor: "rgba(186, 255, 66, 0.35)",
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 4,
		alignSelf: "flex-start",
		marginBottom: 10,
		gap: 8,
	},
	statusBadgeText: {
		fontFamily: fontFamily.bold,
		fontSize: 11,
		color: colors.brand,
		letterSpacing: 0.5,
	},
	mapCardWrap: {
		borderRadius: 14,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#1E2724",
		marginBottom: 12,
	},
	cardContainer: {
		backgroundColor: "#131817",
		borderColor: "#1E2724",
		borderWidth: 1,
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
	},
	summaryHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	cardHeaderTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 13,
		color: colors.primaryText,
		letterSpacing: 0.8,
	},
	cardHeaderSub: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.secondaryText,
		letterSpacing: 0.5,
	},
	statusExplanationText: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		color: colors.secondaryText,
		lineHeight: 18,
		marginBottom: 10,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 6,
	},
	detailLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.secondaryText,
	},
	detailTextValue: {
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.primaryText,
	},
	detailAmountValue: {
		fontFamily: fontFamily.bold,
		fontSize: 13,
		color: colors.brand,
	},
	divider: {
		height: 1,
		backgroundColor: "#1E2724",
		marginVertical: 8,
	},
	timelineList: {
		marginTop: 12,
	},
	timelineItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		borderLeftWidth: 1,
		borderLeftColor: "#26332E",
		paddingLeft: 14,
		paddingBottom: 16,
		marginLeft: 6,
		position: "relative",
	},
	timelineDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: colors.brand,
		position: "absolute",
		left: -5,
		top: 2,
	},
	timelineDotActive: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#38BDF8",
		position: "absolute",
		left: -5,
		top: 2,
	},
	timelineDotPending: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#4B5563",
		position: "absolute",
		left: -5,
		top: 2,
	},
	timelineContent: {
		flex: 1,
	},
	timelineTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
		marginBottom: 2,
	},
	timelineDesc: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 16,
	},
	actionsContainer: {
		gap: 12,
		marginBottom: 20,
	},
	primaryLimeButton: {
		backgroundColor: colors.brand,
		borderRadius: 14,
		height: 52,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryLimeButtonText: {
		fontFamily: fontFamily.bold,
		fontSize: 15,
		color: "#0B0F0E",
	},
	secondaryDarkButton: {
		backgroundColor: "transparent",
		borderColor: "#26332E",
		borderWidth: 1,
		borderRadius: 14,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryDarkButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: "#ADB7B1",
	},
	linkButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
	},
	linkButtonText: {
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.brand,
		textDecorationLine: "underline",
	},
	footerContainer: {
		alignItems: "center",
		paddingTop: 8,
	},
	footerNoteText: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: "#687771",
		textAlign: "center",
	},
});
