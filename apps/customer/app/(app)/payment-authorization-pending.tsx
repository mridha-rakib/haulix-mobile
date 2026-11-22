/**
 * HAULIX Customer Mobile App — Phase 03.39
 * Screen C29-P: Payment Authorization Pending / Processing Queue
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:745 (430 × 899 px)
 * - Spanish Variant: Node 766:1131 (430 × 914 px)
 *
 * Upstream Entry:
 * - From C29-3D (/confirm-card-authentication) via "Simulate successful authentication" CTA.
 *
 * Demonstration & Security Rules:
 * - Pure frontend simulation of the temporary card hold authorization queue.
 * - Symmetrical non-binding amount strictly $356.00 USD.
 * - Zero live payment transactions, no real card holds or charges placed.
 * - Outgoing routing:
 *   - "Simulate declined authorization (C30-D)" -> /payment-authorization-declined
 *   - "Simulate expired hold (C30-E)" -> /card-hold-expired
 *   - "Simulate successful hold completion" -> banner for future C31 dispatch matching.
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
	recordAuthorizationProcessing,
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

export default function PaymentAuthorizationPendingScreen() {
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
		recordAuthorizationProcessing();
		return subscribeToW04Draft((updated) => setDraft({ ...updated }));
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/confirm-card-authentication",
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

	const handleSimulateDeclined = useCallback(() => {
		router.push({
			pathname: "/payment-authorization-declined",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleSimulateExpired = useCallback(() => {
		router.push({
			pathname: "/card-hold-expired",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleSimulateSuccess = useCallback(() => {
		router.push({
			pathname: "/checking-booking-status",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID="c29p-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c29pPaymentAuthorization.backA11y")}
					testID="c29p-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c29p-scroll-view"
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
						<Text style={styles.progressLabel} testID="c29p-progress-label">
							{t("c29pPaymentAuthorization.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "75%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c29p-title">
							{t("c29pPaymentAuthorization.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c29p-subtitle">
							{t("c29pPaymentAuthorization.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.locationChip} testID="c29p-location-chip">
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t("c29pPaymentAuthorization.serviceArea")}
						</Text>
					</View>

					{/* Processing Status Badge */}
					<View style={styles.statusBadgeCapsule} testID="c29p-status-badge">
						<ActivityIndicator size="small" color={colors.brand} />
						<Text style={styles.statusBadgeText}>
							{t("c29pPaymentAuthorization.statusBadge")}
						</Text>
					</View>

					{/* Temporary Hold Details Card */}
					<View style={styles.detailsCard} testID="c29p-hold-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c29pPaymentAuthorization.holdSummaryHeading")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c29pPaymentAuthorization.holdAmountLabel")}
							</Text>
							<Text style={styles.detailAmountValue} testID="c29p-hold-amount">
								{t("c29pPaymentAuthorization.holdAmountValue")}
							</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c29pPaymentAuthorization.holdTypeLabel")}
							</Text>
							<Text style={styles.detailTextValue}>
								{t("c29pPaymentAuthorization.holdTypeValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c29pPaymentAuthorization.paymentMethodLabel")}
							</Text>
							<Text style={styles.detailTextValue}>
								{t("c29pPaymentAuthorization.paymentMethodValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{currentLocale === "es" ? "ARTÍCULOS" : "CONFIRMED ITEMS"}
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

						<Text style={styles.explanationText}>
							{t("c29pPaymentAuthorization.holdExplanation")}
						</Text>
					</View>

					{/* Processing Steps Card */}
					<View style={styles.stepsCard} testID="c29p-steps-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c29pPaymentAuthorization.stepsHeading")}
						</Text>

						{/* Step 1 */}
						<View style={styles.stepItemRow}>
							<CheckCircleGreenIcon />
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitle}>
									{t("c29pPaymentAuthorization.step1Title")}
								</Text>
								<Text style={styles.stepItemStatusDone}>
									{t("c29pPaymentAuthorization.step1Status")}
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
									{t("c29pPaymentAuthorization.step2Title")}
								</Text>
								<Text style={styles.stepItemStatusActive}>
									{t("c29pPaymentAuthorization.step2Status")}
								</Text>
							</View>
						</View>

						{/* Step 3 */}
						<View style={styles.stepItemRow}>
							<PendingCircleIcon />
							<View style={styles.stepTextContainer}>
								<Text style={styles.stepItemTitlePending}>
									{t("c29pPaymentAuthorization.step3Title")}
								</Text>
								<Text style={styles.stepItemStatusPending}>
									{t("c29pPaymentAuthorization.step3Status")}
								</Text>
							</View>
						</View>
					</View>

					{/* Demonstration Simulation Options */}
					<View style={styles.demoSection} testID="c29p-demo-section">
						<Text style={styles.demoSectionHeading}>
							{t("c29pPaymentAuthorization.demoOptionsHeading")}
						</Text>

						{/* Simulate Declined Button */}
						<Pressable
							onPress={handleSimulateDeclined}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c29pPaymentAuthorization.simulateDeclinedCta",
							)}
							testID="c29p-simulate-declined-cta"
						>
							<View
								style={[styles.demoActionButton, styles.demoDeclinedButton]}
							>
								<Text style={styles.demoDeclinedButtonText}>
									{t("c29pPaymentAuthorization.simulateDeclinedCta")}
								</Text>
							</View>
						</Pressable>

						{/* Simulate Expired Button */}
						<Pressable
							onPress={handleSimulateExpired}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c29pPaymentAuthorization.simulateExpiredCta",
							)}
							testID="c29p-simulate-expired-cta"
						>
							<View style={[styles.demoActionButton, styles.demoExpiredButton]}>
								<Text style={styles.demoExpiredButtonText}>
									{t("c29pPaymentAuthorization.simulateExpiredCta")}
								</Text>
							</View>
						</Pressable>

						{/* Simulate Success Button */}
						<Pressable
							onPress={handleSimulateSuccess}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c29pPaymentAuthorization.simulateSuccessCta",
							)}
							testID="c29p-simulate-success-cta"
						>
							<View style={styles.primaryButton}>
								<Text style={styles.primaryButtonText}>
									{t("c29pPaymentAuthorization.simulateSuccessCta")}
								</Text>
							</View>
						</Pressable>
					</View>

					{/* Prototype Disclaimer */}
					<View style={styles.footerNoteContainer}>
						<Text style={styles.footerNoteText}>
							{t("c29pPaymentAuthorization.uiNote")}
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
	bannerContainer: {
		backgroundColor: "#161D1A",
		borderWidth: 1,
		borderColor: colors.brand,
		borderRadius: 12,
		padding: 14,
		marginBottom: 16,
	},
	bannerText: {
		fontSize: 13,
		fontFamily: fontFamily.medium,
		color: colors.primaryText,
		lineHeight: 18,
		marginBottom: 8,
	},
	bannerDismiss: {
		alignSelf: "flex-end",
		paddingVertical: 4,
		paddingHorizontal: 10,
	},
	bannerDismissText: {
		fontSize: 12,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	detailsCard: {
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
		gap: 12,
		minHeight: 26,
	},
	detailLabel: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		flex: 1,
		flexShrink: 1,
		minWidth: 0,
		lineHeight: 16,
	},
	detailAmountValue: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		flexShrink: 0,
		textAlign: "right",
	},
	detailTextValue: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	divider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 12,
	},
	explanationText: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
		marginTop: 6,
	},
	stepsCard: {
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 18,
		marginBottom: 20,
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
	demoSection: {
		marginBottom: 16,
	},
	demoSectionHeading: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
		letterSpacing: 1,
		marginBottom: 12,
	},
	demoActionButton: {
		height: 48,
		borderRadius: 14,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	demoDeclinedButton: {
		backgroundColor: "rgba(242, 201, 76, 0.08)",
		borderColor: "rgba(242, 201, 76, 0.3)",
	},
	demoDeclinedButtonText: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: "#F2C94C",
	},
	demoExpiredButton: {
		backgroundColor: "rgba(242, 201, 76, 0.08)",
		borderColor: "rgba(242, 201, 76, 0.3)",
	},
	demoExpiredButtonText: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: "#F2C94C",
	},
	demoButtonPressed: {
		opacity: 0.8,
	},
	primaryButton: {
		height: 52,
		backgroundColor: colors.brand,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 4,
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
