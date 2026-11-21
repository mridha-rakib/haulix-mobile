/**
 * HAULIX Customer Mobile App — Phase 03.39
 * Screen C30-D: Authorization Was Declined (Payment Recovery)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:814 (430 × 899 px)
 * - Spanish Variant: Node 766:1200 (430 × 914 px)
 *
 * Upstream Entry:
 * - From C29-P (/payment-authorization-pending) via "Simulate declined authorization (C30-D)".
 *
 * CRITICAL CANONICAL IDENTITY:
 * - C30-D is strictly "Authorization was declined", NOT Driver Dispatching.
 *
 * Financial Integrity & Demonstration Invariants:
 * - Clear declaration that no funds were charged and no hold was placed.
 * - Customer inventory scope and non-binding quote ($356.00) remain strictly preserved.
 * - Outgoing routing:
 *   - "Try another payment method" -> /choose-payment-method (C29).
 *   - "Retry with same card" -> /secure-card-setup (C29-M).
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
	recordAuthorizationDeclined,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function AlertTriangleAmberIcon() {
	return (
		<Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
			<Path
				d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 9v4M12 17h.01"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
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

export default function PaymentAuthorizationDeclinedScreen() {
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
		recordAuthorizationDeclined();
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

	const handleTryAnotherMethod = useCallback(() => {
		router.push({
			pathname: "/choose-payment-method",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleRetrySameCard = useCallback(() => {
		router.push({
			pathname: "/secure-card-setup",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleRestoreAuthorization = useCallback(() => {
		router.push({
			pathname: "/restore-secure-authorization",
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
			<View style={styles.container} testID="c30d-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c30dAuthorizationDeclined.backA11y")}
					testID="c30d-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c30d-scroll-view"
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
						<Text style={styles.progressLabel} testID="c30d-progress-label">
							{t("c30dAuthorizationDeclined.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "75%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c30d-title">
							{t("c30dAuthorizationDeclined.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c30d-subtitle">
							{t("c30dAuthorizationDeclined.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.locationChip} testID="c30d-location-chip">
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t("c30dAuthorizationDeclined.serviceArea")}
						</Text>
					</View>

					{/* Declined Status Badge Capsule */}
					<View
						style={styles.declinedBadgeCapsule}
						testID="c30d-declined-badge"
					>
						<AlertTriangleAmberIcon />
						<Text style={styles.declinedBadgeText}>
							{t("c30dAuthorizationDeclined.declinedBadge")}
						</Text>
					</View>

					{/* Decline Details Card */}
					<View style={styles.cardContainer} testID="c30d-details-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c30dAuthorizationDeclined.declinedHeading")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c30dAuthorizationDeclined.cardLabel")}
							</Text>
							<Text style={styles.detailTextValue}>
								{t("c30dAuthorizationDeclined.cardValue")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c30dAuthorizationDeclined.attemptedAmountLabel")}
							</Text>
							<Text
								style={styles.detailAmountValue}
								testID="c30d-attempted-amount"
							>
								{t("c30dAuthorizationDeclined.attemptedAmountValue")}
							</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.reasonBox}>
							<Text style={styles.reasonLabel}>
								{t("c30dAuthorizationDeclined.reasonLabel")}
							</Text>
							<Text style={styles.reasonText}>
								{t("c30dAuthorizationDeclined.reasonValue")}
							</Text>
						</View>

						{/* Zero Charge Guarantee Box */}
						<View style={styles.noChargeBox}>
							<CheckShieldIcon />
							<Text style={styles.noChargeText}>
								{t("c30dAuthorizationDeclined.noChargeStatement")}
							</Text>
						</View>
					</View>

					{/* Preserved Booking Snapshot Card */}
					<View style={styles.cardContainer} testID="c30d-preserved-card">
						<Text style={styles.cardHeaderTitle}>
							{t("c30dAuthorizationDeclined.preservedBookingHeading")}
						</Text>

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c30dAuthorizationDeclined.pickupAreaLabel")}
							</Text>
							<Text style={styles.snapshotValue}>{pickupArea}</Text>
						</View>

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c30dAuthorizationDeclined.confirmedItemsLabel")}
							</Text>
							<Text style={styles.snapshotValue}>{confirmedItems}</Text>
						</View>

						<View style={styles.divider} />

						<View style={styles.snapshotRow}>
							<Text style={styles.snapshotLabel}>
								{t("c30dAuthorizationDeclined.estimateLabel")}
							</Text>
							<Text style={styles.snapshotAmount}>
								{t("c30dAuthorizationDeclined.estimateValue")}
							</Text>
						</View>
					</View>

					{/* Primary Action Button */}
					<Pressable
						onPress={handleTryAnotherMethod}
						accessibilityRole="button"
						accessibilityLabel={t("c30dAuthorizationDeclined.primaryCta")}
						testID="c30d-primary-cta"
					>
						<View style={styles.primaryButton}>
							<Text style={styles.primaryButtonText}>
								{t("c30dAuthorizationDeclined.primaryCta")}
							</Text>
						</View>
					</Pressable>

					{/* Secondary Action Button */}
					<Pressable
						onPress={handleRetrySameCard}
						accessibilityRole="button"
						accessibilityLabel={t("c30dAuthorizationDeclined.secondaryCta")}
						testID="c30d-secondary-cta"
					>
						<View style={styles.secondaryButton}>
							<Text style={styles.secondaryButtonText}>
								{t("c30dAuthorizationDeclined.secondaryCta")}
							</Text>
						</View>
					</Pressable>

					{/* Support Notice Trigger -> C30-R */}
					<Pressable
						onPress={handleRestoreAuthorization}
						style={styles.supportLink}
						accessibilityRole="button"
						accessibilityLabel="Restore authorization"
						testID="c30d-support-trigger"
					>
						<Text style={styles.supportLinkText}>
							{currentLocale === "es"
								? "¿Necesitas restaurar la autorización? Restaurar sesión ›"
								: "Need to restore authorization? Restore session ›"}
						</Text>
					</Pressable>

					{/* Prototype Disclaimer */}
					<View style={styles.footerNoteContainer}>
						<Text style={styles.footerNoteText}>
							{t("c30dAuthorizationDeclined.uiNote")}
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
	declinedBadgeCapsule: {
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
	declinedBadgeText: {
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
	reasonBox: {
		backgroundColor: colors.elevated,
		borderRadius: 10,
		padding: 12,
		marginBottom: 12,
	},
	reasonLabel: {
		fontSize: 10,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		marginBottom: 4,
	},
	reasonText: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.primaryText,
		lineHeight: 17,
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
	supportLink: {
		alignItems: "center",
		paddingVertical: 8,
		marginBottom: 12,
	},
	supportLinkText: {
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
