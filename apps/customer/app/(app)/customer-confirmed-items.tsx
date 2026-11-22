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

export default function CustomerConfirmedItemsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
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
        pathname: "/correct-ai-items",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
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

  const handleCalculateQuote = useCallback(() => {
    router.push({
      pathname: "/quote-processing",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleEditItems = useCallback(() => {
    router.push({
      pathname: "/correct-ai-items",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c23sCustomerConfirmedItems.backA11y")}
          testID="c23s-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c23s-scroll-container"
        >
          {/* Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c23s-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c23s-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>
                  {t("c23sCustomerConfirmedItems.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c23s-flow-marker">
            <Text style={styles.flowMarkerActive}>
              {t("c23sCustomerConfirmedItems.flowMarker")}
            </Text>
            <Text style={styles.flowMarkerSub}>{t("c23sCustomerConfirmedItems.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c23sCustomerConfirmedItems.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c23sCustomerConfirmedItems.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c23s-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c23sCustomerConfirmedItems.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Confirmed for pricing */}
          <View style={styles.cardSection} testID="c23s-confirmed-section">
            <Text style={styles.sectionTitle}>
              {t("c23sCustomerConfirmedItems.sectionConfirmedTitle")}
            </Text>

            {/* Confirmed Item 1: 3-seat sofa */}
            <View style={styles.itemCard} testID="c23s-item-sofa">
              <Image source={ITEM_IMAGES.sofa} style={styles.itemImage} resizeMode="cover" />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>
                  {t("c23sCustomerConfirmedItems.itemSofaTitle")}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {t("c23sCustomerConfirmedItems.itemSofaDetails")}
                </Text>
                <Text style={styles.itemDimensions}>
                  {t("c23sCustomerConfirmedItems.itemSofaDimensions")}
                </Text>
              </View>
            </View>

            {/* Confirmed Item 2: Queen mattresses */}
            <View style={styles.itemCard} testID="c23s-item-mattresses">
              <Image source={ITEM_IMAGES.mattresses} style={styles.itemImage} resizeMode="cover" />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>
                  {t("c23sCustomerConfirmedItems.itemMattressesTitle")}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {t("c23sCustomerConfirmedItems.itemMattressesDetails")}
                </Text>
                <Text style={styles.itemDimensions}>
                  {t("c23sCustomerConfirmedItems.itemMattressesDimensions")}
                </Text>
              </View>
            </View>

            {/* Confirmed Item 3: Dining table */}
            <View style={styles.itemCard} testID="c23s-item-table">
              <Image source={ITEM_IMAGES.table} style={styles.itemImage} resizeMode="cover" />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>
                  {t("c23sCustomerConfirmedItems.itemTableTitle")}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {t("c23sCustomerConfirmedItems.itemTableDetails")}
                </Text>
                <Text style={styles.itemDimensions}>
                  {t("c23sCustomerConfirmedItems.itemTableDimensions")}
                </Text>
              </View>
            </View>
          </View>

          {/* Section: Inputs carried into quotation */}
          <View style={styles.cardSection} testID="c23s-inputs-section">
            <Text style={styles.sectionTitle}>
              {t("c23sCustomerConfirmedItems.sectionInputsTitle")}
            </Text>
            <Text style={styles.inputDetailText}>
              {t("c23sCustomerConfirmedItems.inputPickup")}
            </Text>
            <Text style={styles.inputDetailText}>
              {t("c23sCustomerConfirmedItems.inputAccess")}
            </Text>
            <Text style={styles.inputDetailText}>
              {t("c23sCustomerConfirmedItems.inputEvidence")}
            </Text>
          </View>

          {/* Section: Confirmation recorded (prototype) */}
          <View style={styles.cardSection} testID="c23s-notice-section">
            <View style={styles.feedbackNoticeCard}>
              <View style={styles.feedbackNoticeIcon}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke={colors.brand} strokeWidth={2} />
                  <Path d="M12 16V12" stroke={colors.brand} strokeWidth={2} strokeLinecap="round" />
                  <Circle cx={12} cy={8} r={1} fill={colors.brand} />
                </Svg>
              </View>
              <View style={styles.feedbackNoticeContent}>
                <Text style={styles.feedbackNoticeTitle}>
                  {t("c23sCustomerConfirmedItems.sectionNoticeTitle")}
                </Text>
                <Text style={styles.feedbackNoticeSupporting}>
                  {t("c23sCustomerConfirmedItems.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>
              {t("c23sCustomerConfirmedItems.noticeParagraph")}
            </Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c23s-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleCalculateQuote}
              accessibilityRole="button"
              accessibilityLabel={t("c23sCustomerConfirmedItems.primaryCta")}
              testID="c23s-primary-cta"
            >
              <Text style={styles.primaryButtonText}>
                {t("c23sCustomerConfirmedItems.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleEditItems}
              accessibilityRole="button"
              accessibilityLabel={t("c23sCustomerConfirmedItems.secondaryCta")}
              testID="c23s-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c23sCustomerConfirmedItems.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c23s-footer">
            <Text style={styles.footerDemoText}>{t("c23sCustomerConfirmedItems.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c23sCustomerConfirmedItems.footerSrs")}</Text>
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
    color: colors.primaryText,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    flex: 1,
  },
  noticeDismissButton: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  noticeDismissText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
  flowMarker: {
    backgroundColor: colors.surface,
    height: 34,
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  flowMarkerActive: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  flowMarkerSub: {
    color: "#788580",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
  headingSection: {
    gap: 8,
  },
  screenTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 32,
  },
  screenSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  ledgerBadge: {
    backgroundColor: "#1A2510",
    height: 37,
    borderRadius: 8,
    paddingLeft: 12,
    justifyContent: "center",
  },
  ledgerBadgeText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
  },
  itemCard: {
    backgroundColor: colors.elevated,
    borderRadius: 11,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  itemImage: {
    width: 90,
    height: 74,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    gap: 6,
  },
  itemTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
  itemSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  itemDimensions: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  inputDetailText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  feedbackNoticeCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  feedbackNoticeIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackNoticeContent: {
    flex: 1,
    gap: 2,
  },
  feedbackNoticeTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
  feedbackNoticeSupporting: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  noticeParagraph: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
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
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
  footerDisclaimer: {
    gap: 7,
    marginTop: 8,
    paddingBottom: 16,
  },
  footerDemoText: {
    color: "#788580",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
  footerSrsText: {
    color: "#788580",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
});
