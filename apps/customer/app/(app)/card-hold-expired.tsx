/**
 * HAULIX Customer Mobile App — Phase 03.39
 * Screen C30-E: Your Card Hold Expired (Payment Authorization Recovery)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:883 (430 × 899 px)
 * - Spanish Variant: Node 766:1269 (430 × 914 px)
 *
 * Upstream Entry:
 * - From C29-P (/payment-authorization-pending) via "Simulate expired hold (C30-E)".
 *
 * CRITICAL CANONICAL IDENTITY:
 * - C30-E is strictly "Your card hold expired", NOT Driver Assigned.
 *
 * Financial Integrity & Demonstration Invariants:
 * - Clear declaration that no funds were deducted ($0.00 charged).
 * - Customer inventory scope and non-binding quote ($356.00) remain strictly preserved.
 * - Outgoing routing:
 *   - "Re-authorize payment" -> /choose-payment-method (C29).
 *   - "Back to scheduling" -> /choose-service-time (C27).
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
	recordHoldExpired,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function ClockExpiryIcon() {
	return (
		<Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
			<Circle cx={12} cy={12} r={10} stroke="#F2C94C" strokeWidth={2} />
			<Path
				d="M12 6v6l4 2"
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

export default function CardHoldExpiredScreen() {
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
		recordHoldExpired();
		return subscribeToW04Draft((updated) => setDraft({ ...updated }));
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/choose-payment-method",
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

	const handleReauthorizePayment = useCallback(() => {
		router.push({
			pathname: "/choose-payment-method",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleBackToScheduling = useCallback(() => {
		router.push({
			pathname: "/choose-service-time",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleReviewFreshHold = useCallback(() => {
		router.push({
			pathname: "/review-fresh-card-hold",
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
			<View style={styles.container} testID="c30e-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c30eCardHoldExpired.backA11y")}
					testID="c30e-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c30e-scroll-view"
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
						<Text style={styles.progressLabel} testID="c30e-progress-label">
							{t("c30eCardHoldExpired.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "75%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c30e-title">
							{t("c30eCardHoldExpired.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c30e-subtitle">
							{t("c30eCardHoldExpired.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.locationChip} testID="c30e-location-chip">
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t("c30eCardHoldExpired.serviceArea")}
						</Text>
					</View>

					{/* Expired Status Badge Capsule */}
					<View style={styles.expiredBadgeCapsule} testID="c30e-expired-badge">
						<ClockExpiryIcon />
						<Text style={styles.expiredBadgeText}>
							{t("c30eCardHoldExpired.expiredBadge")}
						</Text>
					</View>

					{/* Release Details Card */}
					<View style={styles.cardContainer} testID="c30e-details-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c30eCardHoldExpired.releaseDetailsHeading")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c30eCardHoldExpired.statusLabel")}
							</Text>
							<Text style={styles.detailTextValue}>
								{t("c30eCardHoldExpired.statusValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c30eCardHoldExpired.priorHoldLabel")}
							</Text>
							<Text style={styles.detailPriorAmount}>
								{t("c30eCardHoldExpired.priorHoldValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c30eCardHoldExpired.currentChargeLabel")}
							</Text>
							<Text
								style={styles.detailCurrentCharge}
								testID="c30e-current-charge"
							>
								{t("c30eCardHoldExpired.currentChargeValue")}
							</Text>
						</View>

						<View style={styles.divider} />

						<Text style={styles.expirationNoticeText}>
							{t("c30eCardHoldExpired.expirationNotice")}
						</Text>

						{/* Zero Charge Guarantee Box */}
						<View style={styles.noChargeBox}>
							<CheckShieldIcon />
							<Text style={styles.noChargeText}>
								{currentLocale === "es"
									? "Retención liberada automáticamente · $0.00 cobrado"
									: "Hold automatically released · $0.00 charged"}
							</Text>
						</View>
					</View>

					{/* Preserved Booking Snapshot Card */}
					<View style={styles.cardContainer} testID="c30e-preserved-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c30eCardHoldExpired.preservedBookingHeading")}
						</Text>

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c30eCardHoldExpired.pickupAreaLabel")}
							</Text>
							<Text style={styles.snapshotValue}>{pickupArea}</Text>
						</View>

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c30eCardHoldExpired.confirmedItemsLabel")}
							</Text>
							<Text style={styles.snapshotValue}>{confirmedItems}</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c30eCardHoldExpired.estimateLabel")}
							</Text>
							<Text style={styles.snapshotAmount}>
								{t("c30eCardHoldExpired.estimateValue")}
							</Text>
						</View>
					</View>

					{/* Primary Action Button */}
					<Pressable
						onPress={handleReauthorizePayment}
						accessibilityRole="button"
						accessibilityLabel={t("c30eCardHoldExpired.primaryCta")}
						testID="c30e-primary-cta"
					>
						<View style={styles.primaryButton}>
							<Text style={styles.primaryButtonText}>
								{t("c30eCardHoldExpired.primaryCta")}
							</Text>
						</View>
					</Pressable>

					{/* Secondary Action Button */}
					<Pressable
						onPress={handleBackToScheduling}
						accessibilityRole="button"
						accessibilityLabel={t("c30eCardHoldExpired.secondaryCta")}
						testID="c30e-secondary-cta"
					>
						<View style={styles.secondaryButton}>
							<Text style={styles.secondaryButtonText}>
								{t("c30eCardHoldExpired.secondaryCta")}
							</Text>
						</View>
					</Pressable>

					{/* Fresh Hold Review Trigger -> C30-C */}
					<Pressable
						onPress={handleReviewFreshHold}
						style={styles.assistanceLink}
						accessibilityRole="button"
						accessibilityLabel="Review fresh hold"
						testID="c30e-assistance-trigger"
					>
						<Text style={styles.assistanceLinkText}>
							{currentLocale === "es"
								? "¿Deseas renovar la retención? Revisar nueva retención ›"
								: "Need to renew your hold? Review fresh hold ›"}
						</Text>
					</Pressable>

					{/* Prototype Disclaimer */}
					<View style={styles.footerNoteContainer}>
						<Text style={styles.footerNoteText}>
							{t("c30eCardHoldExpired.uiNote")}
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
	expiredBadgeCapsule: {
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
	expiredBadgeText: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: "#F2C94C",
		letterSpacing: 1,
		flex: 1,
	},
	bannerContainer: {
		backgroundColor: "#161D1A",
		borderWidth: 1,
		borderColor: "#F2C94C",
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
	detailTextValue: {
		fontSize: 13,
		fontFamily: fontFamily.medium,
		color: colors.primaryText,
	},
	detailPriorAmount: {
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		color: colors.secondaryText,
		textDecorationLine: "line-through",
		flexShrink: 0,
		textAlign: "right",
	},
	detailCurrentCharge: {
		fontSize: 16,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		flexShrink: 0,
		textAlign: "right",
	},
	divider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 12,
	},
	expirationNoticeText: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
		marginBottom: 12,
	},
	noChargeBox: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.2)",
		borderRadius: 10,
		padding: 12,
		gap: 10,
	},
	noChargeText: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.brand,
		flex: 1,
		lineHeight: 17,
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
	secondaryButton: {
		height: 48,
		backgroundColor: colors.surface,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.elevated,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 14,
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
	},
	secondaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
	},
	assistanceLink: {
		alignItems: "center",
		paddingVertical: 8,
		marginBottom: 12,
	},
	assistanceLinkText: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.brand,
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
