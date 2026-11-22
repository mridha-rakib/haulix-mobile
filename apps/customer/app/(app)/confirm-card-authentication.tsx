/**
 * HAULIX Customer Mobile App — Phase 03.39
 * Screen C29-3D: Confirm Card Authentication (3D Secure 2.0 / Issuer Authentication)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:676 (430 × 932 px)
 * - Spanish Variant: Node 766:1062 (430 × 914 px)
 *
 * Upstream Entry:
 * - From C29-M (/secure-card-setup) via "Simulate secure authorization" CTA.
 *
 * Security & Zero Sensitive Data Invariants:
 * - Pure frontend simulation of 3D Secure / EMV 3DS authentication flow.
 * - Under no circumstances does HAULIX collect, receive, log, or store CVV,
 *   full PAN, bank OTPs, or customer financial credentials.
 * - Outgoing routing:
 *   - "Simulate successful authentication" -> /payment-authorization-pending (C29-P).
 *   - "Cancel and return to payment methods" -> /choose-payment-method (C29).
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
	recordCardAuthenticationRequired,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function ShieldCheckIcon() {
	return (
		<Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
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

function BankBuildingIcon() {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
			<Path
				d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7v3h20V7L12 2z"
				stroke={colors.brand}
				strokeWidth={1.75}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

function InfoCircleIcon() {
	return (
		<Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
			<Circle cx={12} cy={12} r={10} stroke="#F2C94C" strokeWidth={2} />
			<Path
				d="M12 16v-4M12 8h.01"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

export default function ConfirmCardAuthenticationScreen() {
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
		recordCardAuthenticationRequired();
		return subscribeToW04Draft((updated) => setDraft({ ...updated }));
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/secure-card-setup",
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

	const handleContinueSuccess = useCallback(() => {
		router.push({
			pathname: "/payment-authorization-pending",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleCancel = useCallback(() => {
		router.push({
			pathname: "/choose-payment-method",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

	return (
		<HaulixSafeArea>
			<View style={styles.container} testID="c29-3d-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c29_3dCardAuthentication.backA11y")}
					testID="c29-3d-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c29-3d-scroll-view"
				>
					{/* 4-Step Progress Indicator */}
					<View style={styles.progressContainer}>
						<Text style={styles.progressLabel} testID="c29-3d-progress-label">
							{t("c29_3dCardAuthentication.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "75%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c29-3d-title">
							{t("c29_3dCardAuthentication.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c29-3d-subtitle">
							{t("c29_3dCardAuthentication.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.locationChip} testID="c29-3d-location-chip">
						<View style={styles.locationDot} />
						<Text style={styles.locationText}>
							{t("c29_3dCardAuthentication.serviceArea")}
						</Text>
					</View>

					{/* Security Capsule Badge */}
					<View
						style={styles.securityBadgeCapsule}
						testID="c29-3d-security-badge"
					>
						<ShieldCheckIcon />
						<Text style={styles.securityBadgeText}>
							{t("c29_3dCardAuthentication.securityBadge")}
						</Text>
					</View>

					{/* Issuer Authentication Simulation Card */}
					<View style={styles.issuerCard} testID="c29-3d-issuer-card">
						<View style={styles.issuerHeaderRow}>
							<BankBuildingIcon />
							<View style={styles.issuerHeaderTexts}>
								<Text style={styles.issuerBankTitle}>
									{t("c29_3dCardAuthentication.issuerBankTitle")}
								</Text>
								<Text style={styles.issuerCardEnding}>
									{t("c29_3dCardAuthentication.cardEndingLabel")}:{" "}
									{t("c29_3dCardAuthentication.cardEndingValue")}
								</Text>
							</View>
						</View>

						<View style={styles.issuerDivider} />

						<View style={styles.issuerDetailsRow}>
							<Text style={styles.issuerDetailLabel}>
								{t("c29_3dCardAuthentication.holdAmountLabel")}
							</Text>
							<Text
								style={styles.issuerDetailValue}
								testID="c29-3d-hold-amount"
							>
								{t("c29_3dCardAuthentication.holdAmountValue")}
							</Text>
						</View>

						<View style={styles.issuerDetailsRow}>
							<Text style={styles.issuerDetailLabel}>
								{currentLocale === "es" ? "ARTÍCULOS" : "CONFIRMED ITEMS"}
							</Text>
							<Text style={styles.issuerScopeValue} numberOfLines={1}>
								{confirmedItems}
							</Text>
						</View>

						<View style={styles.noticeBox}>
							<View style={styles.noticeBoxHeader}>
								<InfoCircleIcon />
								<Text style={styles.noticeBoxTitle}>
									{t("c29_3dCardAuthentication.verificationNoticeTitle")}
								</Text>
							</View>
							<Text style={styles.noticeBoxBody}>
								{t("c29_3dCardAuthentication.verificationNoticeBody")}
							</Text>
						</View>
					</View>

					{/* Security Guarantee Card */}
					<View
						style={styles.securityGuaranteeCard}
						testID="c29-3d-security-guarantee"
					>
						<View style={styles.guaranteeHeaderRow}>
							<ShieldCheckIcon />
							<Text style={styles.guaranteeTitle}>
								{t("c29_3dCardAuthentication.securityGuaranteeTitle")}
							</Text>
						</View>
						<Text style={styles.guaranteeBody}>
							{t("c29_3dCardAuthentication.securityGuaranteeBody")}
						</Text>
					</View>

					{/* Primary Action Button */}
					<Pressable
						onPress={handleContinueSuccess}
						accessibilityRole="button"
						accessibilityLabel={t("c29_3dCardAuthentication.primaryCta")}
						testID="c29-3d-primary-cta"
					>
						<View style={styles.primaryButton}>
							<Text style={styles.primaryButtonText}>
								{t("c29_3dCardAuthentication.primaryCta")}
							</Text>
						</View>
					</Pressable>

					{/* Secondary Action Button */}
					<Pressable
						onPress={handleCancel}
						accessibilityRole="button"
						accessibilityLabel={t("c29_3dCardAuthentication.secondaryCta")}
						testID="c29-3d-secondary-cta"
					>
						<View style={styles.secondaryButton}>
							<Text style={styles.secondaryButtonText}>
								{t("c29_3dCardAuthentication.secondaryCta")}
							</Text>
						</View>
					</Pressable>

					{/* Prototype Disclaimer */}
					<View style={styles.footerNoteContainer}>
						<Text style={styles.footerNoteText}>
							{t("c29_3dCardAuthentication.uiNote")}
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
	securityBadgeCapsule: {
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
	securityBadgeText: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 1,
		flex: 1,
	},
	issuerCard: {
		backgroundColor: "#161D1A",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.2)",
		padding: 20,
		marginBottom: 16,
	},
	issuerHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
	},
	issuerHeaderTexts: {
		flex: 1,
	},
	issuerBankTitle: {
		fontSize: 15,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		letterSpacing: 0.5,
	},
	issuerCardEnding: {
		fontSize: 13,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		marginTop: 2,
	},
	issuerDivider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 16,
	},
	issuerDetailsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
		gap: 12,
		minHeight: 26,
	},
	issuerDetailLabel: {
		flex: 1,
		flexShrink: 1,
		minWidth: 0,
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		lineHeight: 16,
	},
	issuerDetailValue: {
		flexShrink: 0,
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		textAlign: "right",
	},
	issuerScopeValue: {
		flexShrink: 0,
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.primaryText,
		maxWidth: "55%",
		textAlign: "right",
	},
	noticeBox: {
		backgroundColor: "rgba(242, 201, 76, 0.08)",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(242, 201, 76, 0.25)",
		padding: 12,
	},
	noticeBoxHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 6,
	},
	noticeBoxTitle: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: "#F2C94C",
		letterSpacing: 0.8,
	},
	noticeBoxBody: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	securityGuaranteeCard: {
		backgroundColor: colors.surface,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 24,
	},
	guaranteeHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 8,
	},
	guaranteeTitle: {
		fontSize: 12,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		letterSpacing: 0.8,
	},
	guaranteeBody: {
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
