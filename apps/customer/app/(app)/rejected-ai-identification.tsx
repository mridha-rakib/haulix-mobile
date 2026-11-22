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

const MATTRESS_IMAGE: ImageSourcePropType = require("../../assets/images/intake/c18j-mattresses.png");

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function RejectedAiIdentificationScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
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

  const handleCorrectCount = useCallback(() => {
    router.push({
      pathname: "/correct-ai-items",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReturnToVerification = useCallback(() => {
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
          backA11y={t("c23rRejectedAiIdentification.backA11y")}
          testID="c23r-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c23r-scroll-container"
        >
          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c23r-flow-marker">
            <Text style={styles.flowMarkerActive}>
              {t("c23rRejectedAiIdentification.flowMarker")}
            </Text>
            <Text style={styles.flowMarkerSub}>{t("c23rRejectedAiIdentification.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c23rRejectedAiIdentification.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c23rRejectedAiIdentification.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c23r-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c23rRejectedAiIdentification.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Customer evidence */}
          <View style={styles.cardSection} testID="c23r-evidence-section">
            <Text style={styles.sectionTitle}>
              {t("c23rRejectedAiIdentification.sectionEvidenceTitle")}
            </Text>

            <View style={styles.itemCard} testID="c23r-item-mattresses">
              <Image source={MATTRESS_IMAGE} style={styles.itemImage} resizeMode="cover" />
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{t("c23rRejectedAiIdentification.itemTitle")}</Text>
                <Text style={styles.itemSubtitle}>
                  {t("c23rRejectedAiIdentification.itemCustomerUnits")}
                </Text>
                <Text style={styles.itemMismatch}>
                  {t("c23rRejectedAiIdentification.itemAiSuggestionWrong")}
                </Text>
              </View>
            </View>
          </View>

          {/* Section: Keep the customer's validated items */}
          <View style={styles.cardSection} testID="c23r-notice-section">
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
                  {t("c23rRejectedAiIdentification.sectionNoticeTitle")}
                </Text>
                <Text style={styles.feedbackNoticeSupporting}>
                  {t("c23rRejectedAiIdentification.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>
              {t("c23rRejectedAiIdentification.noticeParagraph")}
            </Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c23r-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleCorrectCount}
              accessibilityRole="button"
              accessibilityLabel={t("c23rRejectedAiIdentification.primaryCta")}
              testID="c23r-primary-cta"
            >
              <Text style={styles.primaryButtonText}>
                {t("c23rRejectedAiIdentification.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleReturnToVerification}
              accessibilityRole="button"
              accessibilityLabel={t("c23rRejectedAiIdentification.secondaryCta")}
              testID="c23r-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c23rRejectedAiIdentification.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c23r-footer">
            <Text style={styles.footerDemoText}>
              {t("c23rRejectedAiIdentification.footerDemo")}
            </Text>
            <Text style={styles.footerSrsText}>{t("c23rRejectedAiIdentification.footerSrs")}</Text>
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
  itemMismatch: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 11,
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
