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
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C23_VERIFICATION_ITEMS } from "../../src/fixtures/c30Verification";

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

export default function VerifySuggestedInventoryScreen() {
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
			router.push("/ai-suggested-items");
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleCorrectQuantity = useCallback(() => {
		router.push({
			pathname: "/correct-ai-items",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleMeasurementsClarification = useCallback(() => {
		router.push({
			pathname: "/measurement-clarification",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleWrongSuggestion = useCallback(() => {
		router.push({
			pathname: "/rejected-ai-identification",
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
					backA11y={t("c23VerifySuggestedInventory.backA11y")}
					testID="c23-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c23-scroll-container"
				>
					{/* Notice Banner */}
					{noticeMessage && (
						<View style={styles.noticeBanner} testID="c23-notice-banner">
							<Text style={styles.noticeBannerText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								style={styles.noticeDismissButton}
								testID="c23-notice-dismiss"
							>
								<Text style={styles.noticeDismissText}>
									{t("c23VerifySuggestedInventory.noticeDismiss")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* Flow Marker / W03 */}
					<View style={styles.flowMarker} testID="c23-flow-marker">
						<Text style={styles.flowMarkerActive}>
							{t("c23VerifySuggestedInventory.flowMarker")}
						</Text>
						<Text style={styles.flowMarkerSub}>
							{t("c23VerifySuggestedInventory.flowSub")}
						</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headingSection}>
						<Text style={styles.screenTitle}>
							{t("c23VerifySuggestedInventory.title")}
						</Text>
						<Text style={styles.screenSubtitle}>
							{t("c23VerifySuggestedInventory.subtitle")}
						</Text>
					</View>

					{/* Customer / Saved Booking Ledger */}
					<View style={styles.ledgerBadge} testID="c23-customer-chip">
						<Text style={styles.ledgerBadgeText}>
							{t("c23VerifySuggestedInventory.customerContext", {
								name: customerName.toUpperCase(),
								bookingId,
							})}
						</Text>
					</View>

					{/* Section: Compare suggestions with your draft */}
					<View style={styles.sectionCard} testID="c23-compare-card">
						<Text style={styles.cardHeading}>
							{t("c23VerifySuggestedInventory.sectionCompareTitle")}
						</Text>

						{C23_VERIFICATION_ITEMS.map((item) => {
							const imageSource = ITEM_IMAGES[item.imageKey];
							let title = "";
							let customerInputText = "";
							let aiSuggestsText = "";

							if (item.key === "sofa") {
								title = t("c23VerifySuggestedInventory.itemSofaTitle");
								customerInputText = t(
									"c23VerifySuggestedInventory.itemSofaCustomer",
								);
								aiSuggestsText = t("c23VerifySuggestedInventory.itemSofaAi");
							} else if (item.key === "mattresses") {
								title = t("c23VerifySuggestedInventory.itemMattressTitle");
								customerInputText = t(
									"c23VerifySuggestedInventory.itemMattressCustomer",
								);
								aiSuggestsText = t(
									"c23VerifySuggestedInventory.itemMattressAi",
								);
							} else {
								title = t("c23VerifySuggestedInventory.itemTableTitle");
								customerInputText = t(
									"c23VerifySuggestedInventory.itemTableCustomer",
								);
								aiSuggestsText = t("c23VerifySuggestedInventory.itemTableAi");
							}

							return (
								<View
									key={item.id}
									style={styles.itemRow}
									testID={`c23-item-${item.key}`}
								>
									<View style={styles.itemThumbWrapper}>
										<Image
											source={imageSource}
											style={styles.itemThumb}
											resizeMode="cover"
											accessibilityLabel={title}
											testID={`c23-item-image-${item.key}`}
										/>
									</View>
									<View style={styles.itemInfo}>
										<Text style={styles.itemTitle}>{title}</Text>
										<Text style={styles.itemCustomerInput}>
											{customerInputText}
										</Text>
										<Text style={styles.itemAiSuggests}>{aiSuggestsText}</Text>
									</View>
								</View>
							);
						})}
					</View>

					{/* Section: Your correction is required */}
					<View style={styles.sectionCard} testID="c23-correction-card">
						<View style={styles.feedbackNoticeBox}>
							<View style={styles.infoIconWrapper}>
								<Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
									<Circle
										cx={12}
										cy={12}
										r={10}
										stroke="#ADB7B1"
										strokeWidth={2}
									/>
									<Path
										d="M12 16V12M12 8H12.01"
										stroke="#ADB7B1"
										strokeWidth={2}
										strokeLinecap="round"
									/>
								</Svg>
							</View>
							<View style={styles.feedbackTextWrapper}>
								<Text style={styles.feedbackTitle}>
									{t("c23VerifySuggestedInventory.sectionCorrectionTitle")}
								</Text>
								<Text style={styles.feedbackSupporting}>
									{t("c23VerifySuggestedInventory.correctionSupporting")}
								</Text>
							</View>
						</View>
						<Text style={styles.correctionNoticeText}>
							{t("c23VerifySuggestedInventory.correctionGuidance")}
						</Text>
					</View>

					{/* Actions / Prototype Navigation */}
					<View style={styles.actionGroup}>
						<Pressable
							onPress={handleCorrectQuantity}
							style={styles.primaryButton}
							accessibilityRole="button"
							accessibilityLabel={t("c23VerifySuggestedInventory.primaryCta")}
							testID="c23-correct-qty-btn"
						>
							<Text style={styles.primaryButtonText}>
								{t("c23VerifySuggestedInventory.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							onPress={handleMeasurementsClarification}
							style={styles.secondaryButton}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c23VerifySuggestedInventory.secondaryMeasurementsCta",
							)}
							testID="c23-measurements-btn"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c23VerifySuggestedInventory.secondaryMeasurementsCta")}
							</Text>
						</Pressable>

						<Pressable
							onPress={handleWrongSuggestion}
							style={styles.secondaryButton}
							accessibilityRole="button"
							accessibilityLabel={t(
								"c23VerifySuggestedInventory.secondaryWrongCta",
							)}
							testID="c23-wrong-suggestion-btn"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c23VerifySuggestedInventory.secondaryWrongCta")}
							</Text>
						</Pressable>
					</View>

					{/* Developer Handoff / Rate Disclaimer */}
					<View style={styles.footerDisclaimer}>
						<Text style={styles.footerDisclaimerText}>
							{t("c23VerifySuggestedInventory.footerDemo")}
						</Text>
						<Text style={styles.footerDisclaimerSub}>
							{t("c23VerifySuggestedInventory.footerSrs")}
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
		paddingTop: 10,
		paddingBottom: 34,
		gap: 17,
	},
	noticeBanner: {
		backgroundColor: "#1C2422",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.brand,
		padding: 14,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	noticeBannerText: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		color: colors.primaryText,
		lineHeight: 18,
		marginRight: 10,
	},
	noticeDismissButton: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		backgroundColor: colors.elevated,
		borderRadius: 6,
	},
	noticeDismissText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		color: colors.brand,
	},
	flowMarker: {
		height: 34,
		backgroundColor: colors.surface,
		borderRadius: 9,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
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
		gap: 8,
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
		lineHeight: 16,
	},
	ledgerBadge: {
		height: 37,
		backgroundColor: "#1A2510",
		borderRadius: 8,
		justifyContent: "center",
		paddingLeft: 12,
	},
	ledgerBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
	},
	sectionCard: {
		backgroundColor: colors.surface,
		borderRadius: 17,
		paddingHorizontal: 18,
		paddingTop: 16,
		paddingBottom: 18,
		gap: 12,
	},
	cardHeading: {
		fontFamily: fontFamily.semiBold,
		fontSize: 17,
		color: colors.primaryText,
	},
	itemRow: {
		backgroundColor: colors.elevated,
		borderRadius: 11,
		height: 94,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 8,
		gap: 11,
	},
	itemThumbWrapper: {
		width: 90,
		height: 74,
		borderRadius: 8,
		overflow: "hidden",
	},
	itemThumb: {
		width: 90,
		height: 74,
		borderRadius: 8,
	},
	itemInfo: {
		flex: 1,
		gap: 6,
	},
	itemTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
	},
	itemCustomerInput: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
	},
	itemAiSuggests: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.brand,
	},
	feedbackNoticeBox: {
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#35403B",
		paddingLeft: 16,
		paddingRight: 13,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		minHeight: 92,
	},
	infoIconWrapper: {
		width: 23,
		height: 23,
		alignItems: "center",
		justifyContent: "center",
	},
	feedbackTextWrapper: {
		flex: 1,
		gap: 7,
	},
	feedbackTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
		lineHeight: 18,
	},
	feedbackSupporting: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
	},
	correctionNoticeText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: "#ADB7B1",
		lineHeight: 16,
	},
	actionGroup: {
		gap: 11,
	},
	primaryButton: {
		height: 52,
		backgroundColor: colors.brand,
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
		height: 56,
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#35403B",
		justifyContent: "center",
		alignItems: "center",
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.brand,
	},
	footerDisclaimer: {
		gap: 7,
	},
	footerDisclaimerText: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
	footerDisclaimerSub: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
});
