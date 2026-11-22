/**
 * HAULIX Customer Mobile App — Phase 03.38
 * Screen C29-M: Secure Card Setup / Provider Handoff Demo
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 814:4531 (430 × 1041 px)
 * - Spanish Variant: Node 814:4604 (430 × 1121 px)
 *
 * Upstream Entry:
 * - From C29 (/choose-payment-method) via "Continue with card" CTA.
 *
 * Strict Security & Provider Boundary Rules:
 * - NON-INTERACTIVE CARD PRESENTATION: This screen demonstrates the external payment
 *   provider handoff boundary (e.g. Stripe Elements / Payment Sheet).
 * - ZERO SENSITIVE DATA STORAGE: Under no circumstances does HAULIX collect, store,
 *   log, or transmit primary account numbers (PAN), CVVs, expiration dates, or bank credentials.
 * - Outgoing routing:
 *   - "Simulate secure authorization" -> displays honest demonstration notice.
 *   - "Change payment method" -> returns to /choose-payment-method (C29).
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
import Svg, { Path, Rect } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getEffectiveConfirmedItems,
	getW04Draft,
	recordSecureCardSetupDemo,
	subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function LockShieldIcon() {
	return (
		<Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
			<Path
				d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Rect
				x={9}
				y={11}
				width={6}
				height={5}
				rx={1}
				stroke={colors.brand}
				strokeWidth={1.5}
			/>
			<Path
				d="M10 11V9a2 2 0 114 0v2"
				stroke={colors.brand}
				strokeWidth={1.5}
			/>
		</Svg>
	);
}

function CardChipIcon() {
	return (
		<Svg width={28} height={20} viewBox="0 0 28 20" fill="none">
			<Rect
				x={1}
				y={1}
				width={26}
				height={18}
				rx={3}
				stroke="#F2C94C"
				strokeWidth={1.5}
			/>
			<Path
				d="M1 8h26M1 12h26M10 1v18M18 1v18"
				stroke="#F2C94C"
				strokeWidth={1}
			/>
		</Svg>
	);
}

export default function SecureCardSetupScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [draft, setDraft] = useState(getW04Draft);
	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	useEffect(() => {
		recordSecureCardSetupDemo();
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

	const handleSimulateAuthorization = useCallback(() => {
		router.push({
			pathname: "/confirm-card-authentication",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleChangePaymentMethod = useCallback(() => {
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
			<View style={styles.container} testID="c29m-screen">
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c29mSecureCardSetup.backA11y")}
					testID="c29m-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c29m-scroll-view"
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
						<Text style={styles.progressLabel} testID="c29m-progress-label">
							{t("c29mSecureCardSetup.progressLabel")}
						</Text>
						<View style={styles.progressBarBackground}>
							<View style={[styles.progressBarFill, { width: "75%" }]} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.headerBlock}>
						<Text style={styles.screenTitle} testID="c29m-title">
							{t("c29mSecureCardSetup.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle} testID="c29m-subtitle">
							{t("c29mSecureCardSetup.screenSubtitle")}
						</Text>
					</View>

					{/* Location Chip */}
					<View style={styles.chipContainer}>
						<Text style={styles.chipText}>
							{t("c29mSecureCardSetup.serviceArea")}
						</Text>
					</View>

					{/* Security Badge Capsule */}
					<View
						style={styles.securityBadgeCapsule}
						testID="c29m-security-badge"
					>
						<LockShieldIcon />
						<Text style={styles.securityBadgeText}>
							{t("c29mSecureCardSetup.securityBadge")}
						</Text>
					</View>

					{/* Notice Banner */}
					{noticeMessage && (
						<View
							style={styles.noticeBanner}
							testID="c29m-future-notice-banner"
						>
							<Text style={styles.noticeBannerText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								style={styles.noticeDismiss}
								accessibilityRole="button"
								testID="c29m-dismiss-notice"
							>
								<Text style={styles.noticeDismissText}>
									{t("c29mSecureCardSetup.dismissNotice")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* Visual Provider Handoff Card Mock */}
					<View style={styles.providerCard} testID="c29m-provider-card">
						<View style={styles.providerHeader}>
							<CardChipIcon />
							<Text style={styles.providerBrand}>STRIPE · DEMO</Text>
						</View>

						<View style={styles.cardFieldBlock}>
							<Text style={styles.cardFieldLabel}>
								{t("c29mSecureCardSetup.cardNumberLabel")}
							</Text>
							<Text style={styles.cardNumberValue} testID="c29m-card-number">
								{t("c29mSecureCardSetup.cardNumberValue")}
							</Text>
						</View>

						<View style={styles.cardRow}>
							<View style={styles.cardHalfCol}>
								<Text style={styles.cardFieldLabel}>
									{t("c29mSecureCardSetup.cardholderLabel")}
								</Text>
								<Text style={styles.cardFieldValue} testID="c29m-cardholder">
									{t("c29mSecureCardSetup.cardholderValue")}
								</Text>
							</View>

							<View style={styles.cardHalfCol}>
								<Text style={styles.cardFieldLabel}>
									{t("c29mSecureCardSetup.expiryLabel")}
								</Text>
								<Text style={styles.cardFieldValue} testID="c29m-expiry">
									{t("c29mSecureCardSetup.expiryValue")}
								</Text>
							</View>
						</View>
					</View>

					{/* Authorization Hold Details */}
					<View style={styles.detailsCard} testID="c29m-details-card">
						<View style={styles.authRow}>
							<Text style={styles.authLabel}>
								{t("c29mSecureCardSetup.authAmountLabel")}
							</Text>
							<Text style={styles.authAmount} testID="c29m-auth-amount">
								{t("c29mSecureCardSetup.authAmountValue")}
							</Text>
						</View>
						<Text style={styles.authExplanation}>
							{t("c29mSecureCardSetup.authExplanation")}
						</Text>

						<View style={styles.divider} />

						<View style={styles.metaRow}>
							<Text style={styles.metaLabel}>LOCATION</Text>
							<Text style={styles.metaValue}>{pickupArea}</Text>
						</View>
						<View style={styles.metaRow}>
							<Text style={styles.metaLabel}>SCOPE</Text>
							<Text style={styles.metaValue}>{confirmedItems}</Text>
						</View>
					</View>

					{/* Security Disclosure Card */}
					<View style={styles.disclosureCard} testID="c29m-disclosure-card">
						<Text style={styles.disclosureTitle}>
							{t("c29mSecureCardSetup.demoNoticeTitle")}
						</Text>
						<Text style={styles.disclosureBody}>
							{t("c29mSecureCardSetup.demoNoticeBody")}
						</Text>
					</View>

					{/* Action CTAs */}
					<View style={styles.actionContainer}>
						<Pressable
							onPress={handleSimulateAuthorization}
							accessibilityRole="button"
							accessibilityLabel={t("c29mSecureCardSetup.primaryCta")}
							testID="c29m-primary-cta"
						>
							<View style={styles.primaryButton}>
								<Text style={styles.primaryButtonText}>
									{t("c29mSecureCardSetup.primaryCta")}
								</Text>
							</View>
						</Pressable>

						<Pressable
							onPress={handleChangePaymentMethod}
							accessibilityRole="button"
							accessibilityLabel={t("c29mSecureCardSetup.secondaryCta")}
							testID="c29m-secondary-cta"
						>
							<View style={styles.secondaryButton}>
								<Text style={styles.secondaryButtonText}>
									{t("c29mSecureCardSetup.secondaryCta")}
								</Text>
							</View>
						</Pressable>
					</View>

					{/* Prototype Disclosure Footer */}
					<View style={styles.footerContainer}>
						<Text style={styles.footerNote}>
							{t("c29mSecureCardSetup.uiNote")}
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
		marginBottom: 16,
	},
	chipText: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.secondaryText,
		letterSpacing: 0.8,
	},
	securityBadgeCapsule: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(186, 255, 66, 0.12)",
		borderColor: colors.brand,
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 18,
		gap: 8,
	},
	securityBadgeText: {
		fontFamily: fontFamily.bold,
		fontSize: 11,
		color: colors.brand,
		letterSpacing: 0.8,
	},
	noticeBanner: {
		backgroundColor: "rgba(186, 255, 66, 0.15)",
		borderColor: colors.brand,
		borderWidth: 1,
		borderRadius: 10,
		padding: 12,
		marginBottom: 16,
	},
	noticeBannerText: {
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.primaryText,
		lineHeight: 18,
		marginBottom: 6,
	},
	noticeDismiss: {
		alignSelf: "flex-end",
	},
	noticeDismissText: {
		fontFamily: fontFamily.bold,
		fontSize: 12,
		color: colors.brand,
	},
	providerCard: {
		backgroundColor: "#161D1A",
		borderColor: colors.elevated,
		borderWidth: 1.5,
		borderRadius: 16,
		padding: 20,
		marginBottom: 18,
	},
	providerHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	providerBrand: {
		fontFamily: fontFamily.bold,
		fontSize: 12,
		color: colors.secondaryText,
		letterSpacing: 1,
	},
	cardFieldBlock: {
		marginBottom: 16,
	},
	cardFieldLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 10,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		marginBottom: 4,
	},
	cardNumberValue: {
		fontFamily: fontFamily.bold,
		fontSize: 18,
		color: colors.primaryText,
		letterSpacing: 2,
	},
	cardRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardHalfCol: {
		flex: 1,
	},
	cardFieldValue: {
		fontFamily: fontFamily.bold,
		fontSize: 13,
		color: colors.primaryText,
	},
	detailsCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderWidth: 1,
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
	},
	authRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
		gap: 12,
		minHeight: 28,
	},
	authLabel: {
		fontFamily: fontFamily.bold,
		fontSize: 12,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		flex: 1,
		flexShrink: 1,
		minWidth: 0,
		lineHeight: 16,
	},
	authAmount: {
		fontFamily: fontFamily.bold,
		fontSize: 20,
		color: colors.brand,
		flexShrink: 0,
		textAlign: "right",
	},
	authExplanation: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 16,
	},
	divider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 10,
	},
	metaRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 3,
	},
	metaLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 10,
		color: colors.secondaryText,
		letterSpacing: 0.8,
	},
	metaValue: {
		fontFamily: fontFamily.medium,
		fontSize: 12,
		color: colors.primaryText,
	},
	disclosureCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderWidth: 1,
		borderRadius: 12,
		padding: 14,
		marginBottom: 20,
	},
	disclosureTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 11,
		color: colors.brand,
		letterSpacing: 1,
		marginBottom: 4,
	},
	disclosureBody: {
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
