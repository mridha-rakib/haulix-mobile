/**
 * HAULIX Customer Mobile App — Phase 03.40
 * Screen C30-R: Restore Secure Authorization (Payment Recovery)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:952 (430 × 1041 px)
 * - Spanish Variant: Node 766:1338 (430 × 1041 px)
 *
 * Upstream Entry:
 * - From C30-D (/payment-authorization-declined) via "Restore session" trigger.
 *
 * Financial & Security Invariants:
 * - Pure frontend simulation of the payment session restoration checkpoint.
 * - Zero real Stripe session creation or PaymentIntent generation.
 * - Customer inventory scope and non-binding quote ($356.00) remain strictly preserved.
 * - Outgoing routing:
 *   - "Proceed to hold review" -> /review-fresh-card-hold (C30-C).
 *   - "Choose another payment method" -> /choose-payment-method (C29).
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
import Svg, { Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getEffectiveConfirmedItems,
	getW04Draft,
	recordAuthorizationRestoration,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function RefreshShieldAmberIcon() {
	return (
		<Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 8v4l3 3"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

function CheckShieldIcon() {
	return (
		<Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M9 12l2 2 4-4"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

export default function RestoreSecureAuthorizationScreen() {
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
		recordAuthorizationRestoration();
		return subscribeToW04Draft((updated) => setDraft({ ...updated }));
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/payment-authorization-declined",
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

	const handleProceedToHoldReview = useCallback(() => {
		router.push({
			pathname: "/review-fresh-card-hold",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleChooseAnotherMethod = useCallback(() => {
		router.push({
			pathname: "/choose-payment-method",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const pickupArea =
		currentLocale === "es" ? draft.pickupAreaEs : draft.pickupAreaEn;
	const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID="c30r-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c30rRestoreAuthorization.backA11y")}
					testID="c30r-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c30r-scroll-view"
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
						<Text style={styles.progressLabel} testID="c30r-progress-label">
							{t("c30rRestoreAuthorization.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "75%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c30r-title">
							{t("c30rRestoreAuthorization.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c30r-subtitle">
							{t("c30rRestoreAuthorization.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.locationChip} testID="c30r-location-chip">
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t("c30rRestoreAuthorization.serviceArea")}
						</Text>
					</View>

					{/* Restoration Status Badge Capsule */}
					<View style={styles.statusBadgeCapsule} testID="c30r-status-badge">
						<RefreshShieldAmberIcon />
						<Text style={styles.statusBadgeText}>
							{t("c30rRestoreAuthorization.statusBadge")}
						</Text>
					</View>

					{/* Restoration Reason Card */}
					<View style={styles.cardContainer} testID="c30r-reason-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c30rRestoreAuthorization.reasonHeading")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c30rRestoreAuthorization.cardLabel")}
							</Text>
							<Text style={styles.detailTextValue}>
								{t("c30rRestoreAuthorization.cardValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c30rRestoreAuthorization.priorAmountLabel")}
							</Text>
							<Text style={styles.detailAmountValue} testID="c30r-prior-amount">
								{t("c30rRestoreAuthorization.priorAmountValue")}
							</Text>
						</View>

						<View style={styles.divider} />

						<Text style={styles.explanationText}>
							{t("c30rRestoreAuthorization.reasonExplanation")}
						</Text>
					</View>

					{/* Preserved Booking Snapshot Card */}
					<View style={styles.cardContainer} testID="c30r-preserved-card">
						<Text style={styles.cardHeaderTitle}>
							{currentLocale === "es"
								? "SOLICITUD CONSERVADA"
								: "PRESERVED BOOKING REQUEST"}
						</Text>

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{currentLocale === "es" ? "ZONA DE RECOGIDA" : "PICKUP AREA"}
							</Text>
							<Text style={styles.snapshotValue}>{pickupArea}</Text>
						</View>

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{currentLocale === "es"
									? "ARTÍCULOS CONFIRMADOS"
									: "CONFIRMED ITEMS"}
							</Text>
							<Text style={styles.snapshotValue}>{confirmedItems}</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{currentLocale === "es"
									? "COTIZACIÓN ILUSTRATIVA"
									: "ILLUSTRATIVE QUOTE"}
							</Text>
							<Text style={styles.snapshotAmount}>
								{draft.illustrativeSubtotal}
							</Text>
						</View>
					</View>

					{/* Security Guarantee Box */}
					<View style={styles.securityBox} testID="c30r-security-box">
						<View style={styles.securityHeaderRow}>
							<CheckShieldIcon />
							<Text style={styles.securityTitle}>
								{t("c30rRestoreAuthorization.securityNoticeTitle")}
							</Text>
						</View>
						<Text style={styles.securityBody}>
							{t("c30rRestoreAuthorization.securityNoticeBody")}
						</Text>
					</View>

					{/* Primary Action Button */}
					<Pressable
						style={({ pressed }) => [
							styles.primaryButton,
							pressed && styles.primaryButtonPressed,
						]}
						onPress={handleProceedToHoldReview}
						accessibilityRole="button"
						accessibilityLabel={t("c30rRestoreAuthorization.primaryCta")}
						testID="c30r-primary-cta"
					>
						<Text style={styles.primaryButtonText}>
							{t("c30rRestoreAuthorization.primaryCta")}
						</Text>
					</Pressable>

					{/* Secondary Action Button */}
					<Pressable
						style={({ pressed }) => [
							styles.secondaryButton,
							pressed && styles.secondaryButtonPressed,
						]}
						onPress={handleChooseAnotherMethod}
						accessibilityRole="button"
						accessibilityLabel={t("c30rRestoreAuthorization.secondaryCta")}
						testID="c30r-secondary-cta"
					>
						<Text style={styles.secondaryButtonText}>
							{t("c30rRestoreAuthorization.secondaryCta")}
						</Text>
					</Pressable>

					{/* Prototype Disclaimer */}
					<View style={styles.footerNoteContainer}>
						<Text style={styles.footerNoteText}>
							{t("c30rRestoreAuthorization.uiNote")}
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
		backgroundColor: "rgba(242, 201, 76, 0.08)",
		borderWidth: 1,
		borderColor: "rgba(242, 201, 76, 0.3)",
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 12,
		gap: 10,
		marginBottom: 20,
	},
	statusBadgeText: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: "#F2C94C",
		letterSpacing: 1,
		flex: 1,
	},
	cardContainer: {
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
	},
	detailLabel: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
	},
	detailTextValue: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	detailAmountValue: {
		fontSize: 16,
		fontFamily: fontFamily.bold,
		color: "#F2C94C",
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
	},
	snapshotRow: {
		marginBottom: 10,
	},
	snapshotLabel: {
		fontSize: 10,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		marginBottom: 2,
	},
	snapshotValue: {
		fontSize: 13,
		fontFamily: fontFamily.medium,
		color: colors.primaryText,
	},
	snapshotAmount: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	securityBox: {
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.2)",
		borderRadius: 14,
		padding: 16,
		marginBottom: 24,
	},
	securityHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 6,
	},
	securityTitle: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.8,
	},
	securityBody: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
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
		height: 48,
		backgroundColor: colors.surface,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.elevated,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
	},
	secondaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
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
