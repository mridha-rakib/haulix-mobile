/**
 * HAULIX Customer Mobile App — Phase 03.34
 * Screen C26-R: Scope Acceptance Recovery
 *
 * Authoritative Figma References:
 * - English: Node 412:1517 (430 × 814 px)
 * - Spanish: Node 987:11501 (430 × 814 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Recovery demonstration state for save failure; no live server error codes or fabricated persistence.
 * - Preserves customer confirmed inventory, photos and pickup details; no duplicate booking.
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
import Svg, { Circle, Line } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C25A_DEFAULT_DRAFT } from "../../src/fixtures/c34ScopeAcceptance";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function ScopeAcceptanceRecoveryScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
	const profile = useCustomerProfile(currentLocale);

	const customerName =
		currentLocale === "es" ? "SARAH MITCHELL" : profile.name.toUpperCase();
	const bookingId = C25A_DEFAULT_DRAFT.bookingId;

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace({
				pathname: "/quote-acceptance-review",
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

	const handleRetryAccepting = useCallback(() => {
		router.replace({
			pathname: "/quote-acceptance-review",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleReviewEstimate = useCallback(() => {
		router.push({
			pathname: "/itemized-quote",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea>
			<View style={styles.container}>
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c26rScopeAcceptanceRecovery.backA11y")}
					testID="c26r-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c26r-scroll-container"
				>
					{/* Flow Marker / W03 */}
					<View style={styles.flowMarker} testID="c26r-flow-marker">
						<Text style={styles.flowMarkerActive}>
							{t("c26rScopeAcceptanceRecovery.flowMarker")}
						</Text>
						<Text style={styles.flowMarkerSub}>
							{t("c26rScopeAcceptanceRecovery.flowSub")}
						</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headingSection}>
						<Text style={styles.screenTitle}>
							{t("c26rScopeAcceptanceRecovery.title")}
						</Text>
						<Text style={styles.screenSubtitle}>
							{t("c26rScopeAcceptanceRecovery.subtitle")}
						</Text>
					</View>

					{/* Customer / Saved Booking Ledger */}
					<View style={styles.ledgerBadge} testID="c26r-customer-chip">
						<Text style={styles.ledgerBadgeText}>
							{t("c26rScopeAcceptanceRecovery.customerContext", {
								name: customerName,
								bookingId,
							})}
						</Text>
					</View>

					{/* Section: Save failed · no booking created */}
					<View style={styles.cardSection} testID="c26r-error-section">
						<View style={styles.errorNoticeCard}>
							<View style={styles.errorNoticeIcon}>
								<Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
									<Circle
										cx={12}
										cy={12}
										r={10}
										stroke="#F36D6D"
										strokeWidth={2}
									/>
									<Line
										x1={12}
										y1={8}
										x2={12}
										y2={12}
										stroke="#F36D6D"
										strokeWidth={2}
										strokeLinecap="round"
									/>
									<Circle cx={12} cy={16} r={1} fill="#F36D6D" />
								</Svg>
							</View>
							<View style={styles.errorNoticeContent}>
								<Text style={styles.errorNoticeTitle}>
									{t("c26rScopeAcceptanceRecovery.noticeErrorTitle")}
								</Text>
								<Text style={styles.errorNoticeSupporting}>
									{t("c26rScopeAcceptanceRecovery.noticeErrorSupporting")}
								</Text>
							</View>
						</View>
						<Text style={styles.noticeParagraph}>
							{t("c26rScopeAcceptanceRecovery.noticeErrorExplanation")}
						</Text>
					</View>

					{/* Actions / Prototype Navigation */}
					<View style={styles.actionsContainer}>
						<Pressable
							style={styles.primaryButton}
							onPress={handleRetryAccepting}
							testID="c26r-primary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("c26rScopeAcceptanceRecovery.primaryCta")}
						>
							<Text style={styles.primaryButtonText}>
								{t("c26rScopeAcceptanceRecovery.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={styles.secondaryButton}
							onPress={handleReviewEstimate}
							testID="c26r-secondary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("c26rScopeAcceptanceRecovery.secondaryCta")}
						>
							<Text style={styles.secondaryButtonText}>
								{t("c26rScopeAcceptanceRecovery.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Developer Handoff / Rate Disclaimer */}
					<View style={styles.footerDisclaimer} testID="c26r-footer">
						<Text style={styles.footerDemoText}>
							{t("c26rScopeAcceptanceRecovery.footerDemo")}
						</Text>
						<Text style={styles.footerSrsText}>
							{t("c26rScopeAcceptanceRecovery.footerSrs")}
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
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 12,
		paddingBottom: 40,
		gap: 16,
	},
	flowMarker: {
		backgroundColor: colors.surface,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 9,
		flexDirection: "row",
		alignItems: "center",
	},
	flowMarkerActive: {
		fontFamily: fontFamily.semiBold,
		fontSize: 10,
		color: colors.brand,
	},
	flowMarkerSub: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
	headingSection: {
		gap: 6,
	},
	screenTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 25,
		color: colors.primaryText,
		lineHeight: 30,
	},
	screenSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	ledgerBadge: {
		backgroundColor: "#1A2510",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 8,
		alignSelf: "stretch",
	},
	ledgerBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
	},
	cardSection: {
		backgroundColor: colors.surface,
		borderRadius: 17,
		paddingHorizontal: 18,
		paddingTop: 16,
		paddingBottom: 18,
		gap: 12,
	},
	errorNoticeCard: {
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(243, 109, 109, 0.3)",
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	errorNoticeIcon: {
		width: 23,
		height: 23,
		alignItems: "center",
		justifyContent: "center",
	},
	errorNoticeContent: {
		flex: 1,
		gap: 4,
	},
	errorNoticeTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: "#F36D6D",
		lineHeight: 18,
	},
	errorNoticeSupporting: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
	},
	noticeParagraph: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	actionsContainer: {
		gap: 11,
		marginTop: 4,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		borderRadius: 12,
		height: 52,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	primaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: colors.background,
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#35403B",
		height: 52,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.brand,
	},
	footerDisclaimer: {
		gap: 7,
		marginTop: 8,
	},
	footerDemoText: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
	footerSrsText: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
});
