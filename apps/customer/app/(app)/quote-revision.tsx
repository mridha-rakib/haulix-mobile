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
import { C24REV_CORRECTION_ITEMS } from "../../src/fixtures/c33QuoteTerms";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function QuoteRevisionScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
	const profile = useCustomerProfile(currentLocale);

	const customerName =
		currentLocale === "es" ? "SARAH MITCHELL" : profile.name.toUpperCase();
	const bookingId = "HX-DEMO-1027";

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n?.language]);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/illustrative-quote",
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

	const handleRecalculate = useCallback(() => {
		router.push({
			pathname: "/quote-processing",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleEditMeasurements = useCallback(() => {
		router.push({
			pathname: "/correct-ai-items",
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
					backA11y={t("c24revQuoteRevision.backA11y")}
					testID="c24rev-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c24rev-scroll-container"
				>
					{/* Flow Marker / W03 */}
					<View style={styles.flowMarker} testID="c24rev-flow-marker">
						<Text style={styles.flowMarkerActive}>
							{t("c24revQuoteRevision.flowMarker")}
						</Text>
						<Text style={styles.flowMarkerSub}>
							{t("c24revQuoteRevision.flowSub")}
						</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headingSection}>
						<Text style={styles.screenTitle}>
							{t("c24revQuoteRevision.title")}
						</Text>
						<Text style={styles.screenSubtitle}>
							{t("c24revQuoteRevision.subtitle")}
						</Text>
					</View>

					{/* Customer / Saved Booking Ledger */}
					<View style={styles.ledgerBadge} testID="c24rev-customer-chip">
						<Text style={styles.ledgerBadgeText}>
							{t("c24revQuoteRevision.customerContext", {
								name: customerName,
								bookingId,
							})}
						</Text>
					</View>

					{/* Section: Customer corrections */}
					<View style={styles.cardSection} testID="c24rev-corrections-section">
						<Text style={styles.sectionTitle}>
							{t("c24revQuoteRevision.sectionCorrectionsTitle")}
						</Text>
						{C24REV_CORRECTION_ITEMS.map((item) => (
							<Text
								key={item.id}
								style={styles.correctionParagraph}
								testID={`c24rev-${item.id}`}
							>
								{t(`c24revQuoteRevision.${item.textKey}`)}
							</Text>
						))}
					</View>

					{/* Section: Quote is being refreshed */}
					<View style={styles.cardSection} testID="c24rev-notice-section">
						<View style={styles.infoNoticeCard}>
							<View style={styles.infoNoticeIcon}>
								<Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
									<Circle
										cx={12}
										cy={12}
										r={10}
										stroke={colors.brand}
										strokeWidth={2}
									/>
									<Line
										x1={12}
										y1={8}
										x2={12}
										y2={12}
										stroke={colors.brand}
										strokeWidth={2}
										strokeLinecap="round"
									/>
									<Circle cx={12} cy={16} r={1} fill={colors.brand} />
								</Svg>
							</View>
							<View style={styles.infoNoticeContent}>
								<Text style={styles.infoNoticeTitle}>
									{t("c24revQuoteRevision.noticeTitle")}
								</Text>
								<Text style={styles.infoNoticeSupporting}>
									{t("c24revQuoteRevision.noticeSupporting")}
								</Text>
							</View>
						</View>
						<Text style={styles.noticeParagraph}>
							{t("c24revQuoteRevision.guidanceRules")}
						</Text>
						<Text style={styles.noticeParagraph}>
							{t("c24revQuoteRevision.guidanceObsolete")}
						</Text>
					</View>

					{/* Action CTAs */}
					<View style={styles.actionsContainer} testID="c24rev-actions">
						<Pressable
							style={styles.primaryButton}
							onPress={handleRecalculate}
							accessibilityRole="button"
							accessibilityLabel={t("c24revQuoteRevision.primaryCta")}
							testID="c24rev-primary-cta"
						>
							<Text style={styles.primaryButtonText}>
								{t("c24revQuoteRevision.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={styles.secondaryButton}
							onPress={handleEditMeasurements}
							accessibilityRole="button"
							accessibilityLabel={t("c24revQuoteRevision.secondaryCta")}
							testID="c24rev-secondary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c24revQuoteRevision.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Disclaimer / Footer */}
					<View style={styles.footerDisclaimer} testID="c24rev-footer">
						<Text style={styles.footerDemoText}>
							{t("c24revQuoteRevision.footerDemo")}
						</Text>
						<Text style={styles.footerSrsText}>
							{t("c24revQuoteRevision.footerSrs")}
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
		paddingTop: 8,
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
	sectionTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 17,
		color: colors.primaryText,
	},
	correctionParagraph: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	infoNoticeCard: {
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#35403B",
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	infoNoticeIcon: {
		width: 23,
		height: 23,
		alignItems: "center",
		justifyContent: "center",
	},
	infoNoticeContent: {
		flex: 1,
		gap: 4,
	},
	infoNoticeTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
		lineHeight: 18,
	},
	infoNoticeSupporting: {
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
