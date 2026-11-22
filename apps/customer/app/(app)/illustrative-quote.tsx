import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	BackHandler,
	Image,
	type ImageSourcePropType,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
	C24Q_ILLUSTRATIVE_TOTAL,
	C24Q_INCLUDED_ITEMS,
	C24Q_PRICE_ROWS,
} from "../../src/fixtures/c32Quote";

const ITEM_IMAGES: Record<string, ImageSourcePropType> = {
	sofa: require("../../assets/images/intake/c18j-sofa.png"),
	mattresses: require("../../assets/images/intake/c18j-mattresses.png"),
	table: require("../../assets/images/intake/c18j-table.png"),
};

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function IllustrativeQuoteScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
	const profile = useCustomerProfile(currentLocale);

	const customerName =
		currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
	const bookingId = "HX-DEMO-1027";

	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

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
				pathname: "/quote-processing",
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

	const handleReviewBreakdown = useCallback(() => {
		router.push({
			pathname: "/itemized-quote",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleRecalculate = useCallback(() => {
		router.push({
			pathname: "/quote-revision",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleExpiredExample = useCallback(() => {
		router.push({
			pathname: "/quote-expired",
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
					backA11y={t("c24qIllustrativeQuote.backA11y")}
					testID="c24q-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c24q-scroll-container"
				>
					{/* Notice Banner */}
					{noticeMessage && (
						<View style={styles.noticeBanner} testID="c24q-notice-banner">
							<Text style={styles.noticeBannerText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								style={styles.noticeDismissButton}
								testID="c24q-notice-dismiss"
							>
								<Text style={styles.noticeDismissText}>
									{t("c24qIllustrativeQuote.noticeDismiss")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* Flow Marker / W03 */}
					<View style={styles.flowMarker} testID="c24q-flow-marker">
						<Text style={styles.flowMarkerActive}>
							{t("c24qIllustrativeQuote.flowMarker")}
						</Text>
						<Text style={styles.flowMarkerSub}>
							{t("c24qIllustrativeQuote.flowSub")}
						</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headingSection}>
						<Text style={styles.screenTitle}>
							{t("c24qIllustrativeQuote.title")}
						</Text>
						<Text style={styles.screenSubtitle}>
							{t("c24qIllustrativeQuote.subtitle", {
								name:
									currentLocale === "es"
										? "Bryan"
										: profile.name.split(" ")[0] || "Sarah",
							})}
						</Text>
					</View>

					{/* Customer / Saved Booking Ledger */}
					<View style={styles.ledgerBadge} testID="c24q-customer-chip">
						<Text style={styles.ledgerBadgeText}>
							{t("c24qIllustrativeQuote.customerContext", {
								name: customerName.toUpperCase(),
								bookingId,
							})}
						</Text>
					</View>

					{/* Section: Included items */}
					<View style={styles.cardSection} testID="c24q-items-section">
						<Text style={styles.sectionTitle}>
							{t("c24qIllustrativeQuote.sectionItemsTitle")}
						</Text>

						{C24Q_INCLUDED_ITEMS.map((item) => (
							<View
								key={item.id}
								style={styles.itemRow}
								testID={`c24q-item-${item.itemKey}`}
							>
								<View style={styles.itemImageContainer}>
									<Image
										source={ITEM_IMAGES[item.imageKey]}
										style={styles.itemImage}
										resizeMode="cover"
									/>
								</View>
								<View style={styles.itemDetails}>
									<Text style={styles.itemTitle}>
										{t(`c24qIllustrativeQuote.${item.titleKey}`)}
									</Text>
									<Text style={styles.itemSubtitle}>
										{t(`c24qIllustrativeQuote.${item.qtyKey}`)}
									</Text>
									<Text style={styles.itemWeight}>
										{t(`c24qIllustrativeQuote.${item.weightKey}`)}
									</Text>
								</View>
							</View>
						))}
					</View>

					{/* Section: Estimated service subtotal */}
					<View style={styles.cardSection} testID="c24q-subtotal-section">
						<Text style={styles.sectionTitle}>
							{t("c24qIllustrativeQuote.sectionSubtotalTitle")}
						</Text>

						{C24Q_PRICE_ROWS.map((row) => (
							<View
								key={row.id}
								style={styles.priceRow}
								testID={`c24q-${row.id}`}
							>
								<Text style={styles.priceLabel}>
									{t(`c24qIllustrativeQuote.${row.labelKey}`)}
								</Text>
								<Text style={styles.priceAmount}>{row.amount}</Text>
							</View>
						))}
					</View>

					{/* Section: Illustrative estimate */}
					<View style={styles.cardSection} testID="c24q-estimate-section">
						<Text style={styles.sectionTitle}>
							{t("c24qIllustrativeQuote.sectionEstimateTitle")}
						</Text>

						<View style={styles.totalBox} testID="c24q-total-card">
							<Text style={styles.totalAmount}>{C24Q_ILLUSTRATIVE_TOTAL}</Text>
							<Text style={styles.totalSubnote}>
								{t("c24qIllustrativeQuote.estimateSubtotalNote")}
							</Text>
							<Text style={styles.totalExtraNote}>
								{t("c24qIllustrativeQuote.estimateNoExtra")}
							</Text>
						</View>
					</View>

					{/* Action CTAs */}
					<View style={styles.actionsContainer} testID="c24q-actions">
						<Pressable
							style={styles.primaryButton}
							onPress={handleReviewBreakdown}
							accessibilityRole="button"
							accessibilityLabel={t("c24qIllustrativeQuote.primaryCta")}
							testID="c24q-primary-cta"
						>
							<Text style={styles.primaryButtonText}>
								{t("c24qIllustrativeQuote.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={styles.secondaryButton}
							onPress={handleRecalculate}
							accessibilityRole="button"
							accessibilityLabel={t("c24qIllustrativeQuote.secondaryCta")}
							testID="c24q-secondary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c24qIllustrativeQuote.secondaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={styles.secondaryButton}
							onPress={handleExpiredExample}
							accessibilityRole="button"
							accessibilityLabel={t("c24qIllustrativeQuote.tertiaryCta")}
							testID="c24q-tertiary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c24qIllustrativeQuote.tertiaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Disclaimer / Footer */}
					<View style={styles.footerDisclaimer} testID="c24q-footer">
						<Text style={styles.footerDemoText}>
							{t("c24qIllustrativeQuote.footerDemo")}
						</Text>
						<Text style={styles.footerSrsText}>
							{t("c24qIllustrativeQuote.footerSrs")}
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
	noticeBanner: {
		backgroundColor: "#1A2510",
		borderWidth: 1,
		borderColor: colors.brand,
		borderRadius: 12,
		padding: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	noticeBannerText: {
		fontFamily: fontFamily.medium,
		fontSize: 12,
		color: colors.brand,
		flex: 1,
		marginRight: 8,
	},
	noticeDismissButton: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 6,
		backgroundColor: "#222827",
	},
	noticeDismissText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.primaryText,
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
		letterSpacing: 0.5,
	},
	cardSection: {
		backgroundColor: colors.surface,
		borderRadius: 17,
		padding: 18,
		gap: 12,
	},
	sectionTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 17,
		color: colors.primaryText,
	},
	itemRow: {
		backgroundColor: colors.elevated,
		borderRadius: 11,
		paddingLeft: 8,
		paddingRight: 12,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 11,
	},
	itemImageContainer: {
		width: 90,
		height: 74,
		borderRadius: 8,
		overflow: "hidden",
		backgroundColor: colors.surface,
	},
	itemImage: {
		width: 90,
		height: 74,
	},
	itemDetails: {
		flex: 1,
		gap: 5,
	},
	itemTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
	},
	itemSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
	},
	itemWeight: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.brand,
	},
	priceRow: {
		backgroundColor: colors.elevated,
		borderRadius: 8,
		paddingHorizontal: 12,
		height: 44,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	priceLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.primaryText,
	},
	priceAmount: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
	},
	totalBox: {
		backgroundColor: colors.brand,
		borderRadius: 13,
		paddingHorizontal: 17,
		paddingVertical: 14,
		gap: 6,
	},
	totalAmount: {
		fontFamily: fontFamily.bold,
		fontSize: 33,
		color: colors.background,
		lineHeight: 38,
	},
	totalSubnote: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.background,
	},
	totalExtraNote: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: colors.background,
	},
	actionsContainer: {
		gap: 11,
		marginTop: 4,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		height: 52,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: colors.background,
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: "#35403B",
		height: 56,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.brand,
	},
	footerDisclaimer: {
		gap: 4,
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
