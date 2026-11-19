import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function CorrectAiItemsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
  const bookingId = "HX-DEMO-1027";

  const [quantity, setQuantity] = useState("2");
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
        pathname: "/verify-suggested-inventory",
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

  const handleSaveAndConfirm = useCallback(() => {
    router.push({
      pathname: "/customer-confirmed-items",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReturnToComparison = useCallback(() => {
    router.push({
      pathname: "/verify-suggested-inventory",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c23cCorrectAiItems.backA11y")}
          testID="c23c-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c23c-scroll-container"
        >
          {/* Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c23c-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c23c-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>{t("c23cCorrectAiItems.backA11y")}</Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c23c-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c23cCorrectAiItems.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c23cCorrectAiItems.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c23cCorrectAiItems.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c23cCorrectAiItems.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c23c-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c23cCorrectAiItems.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Queen mattress correction */}
          <View style={styles.cardSection} testID="c23c-correction-section">
            <Text style={styles.sectionTitle}>
              {t("c23cCorrectAiItems.sectionCorrectionTitle")}
            </Text>

            {/* Field: Correct item name */}
            <View style={styles.fieldCard} testID="c23c-field-name">
              <Text style={styles.fieldLabel}>{t("c23cCorrectAiItems.fieldItemNameLabel")}</Text>
              <Text style={styles.fieldValue}>{t("c23cCorrectAiItems.fieldItemNameValue")}</Text>
            </View>

            {/* Field: Number of mattresses */}
            <View style={styles.fieldCard} testID="c23c-field-quantity">
              <Text style={styles.fieldLabel}>{t("c23cCorrectAiItems.fieldQuantityLabel")}</Text>
              <View style={styles.quantityRow}>
                <Text style={styles.fieldValueHighlight}>{quantity}</Text>
                <View style={styles.quantityControls}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => setQuantity((q) => Math.max(1, parseInt(q, 10) - 1).toString())}
                    accessibilityLabel="Decrease quantity"
                    testID="c23c-qty-decrease"
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </Pressable>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => setQuantity((q) => (parseInt(q, 10) + 1).toString())}
                    accessibilityLabel="Increase quantity"
                    testID="c23c-qty-increase"
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Field: Dimensions per item */}
            <View style={styles.fieldCard} testID="c23c-field-dimensions">
              <Text style={styles.fieldLabel}>{t("c23cCorrectAiItems.fieldDimensionsLabel")}</Text>
              <Text style={styles.fieldValue}>{t("c23cCorrectAiItems.fieldDimensionsValue")}</Text>
            </View>

            {/* Field: Weight per item */}
            <View style={styles.fieldCard} testID="c23c-field-weight">
              <Text style={styles.fieldLabel}>{t("c23cCorrectAiItems.fieldWeightLabel")}</Text>
              <Text style={styles.fieldValue}>{t("c23cCorrectAiItems.fieldWeightValue")}</Text>
            </View>

            {/* Field: Supporting photo */}
            <View style={styles.fieldCard} testID="c23c-field-photo">
              <Text style={styles.fieldLabel}>{t("c23cCorrectAiItems.fieldPhotoLabel")}</Text>
              <Text style={styles.fieldValue}>{t("c23cCorrectAiItems.fieldPhotoValue")}</Text>
            </View>
          </View>

          {/* Section: Updated draft inputs */}
          <View style={styles.cardSection} testID="c23c-notice-section">
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
                  {t("c23cCorrectAiItems.sectionNoticeTitle")}
                </Text>
                <Text style={styles.feedbackNoticeSupporting}>
                  {t("c23cCorrectAiItems.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>{t("c23cCorrectAiItems.noticeParagraph")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c23c-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleSaveAndConfirm}
              accessibilityRole="button"
              accessibilityLabel={t("c23cCorrectAiItems.primaryCta")}
              testID="c23c-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c23cCorrectAiItems.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleReturnToComparison}
              accessibilityRole="button"
              accessibilityLabel={t("c23cCorrectAiItems.secondaryCta")}
              testID="c23c-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>{t("c23cCorrectAiItems.secondaryCta")}</Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c23c-footer">
            <Text style={styles.footerDemoText}>{t("c23cCorrectAiItems.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c23cCorrectAiItems.footerSrs")}</Text>
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
  fieldCard: {
    backgroundColor: colors.elevated,
    borderRadius: 11,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 4,
  },
  fieldLabel: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  fieldValue: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
  fieldValueHighlight: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityControls: {
    flexDirection: "row",
    gap: 8,
  },
  quantityButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: 6,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
    fontSize: 16,
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
