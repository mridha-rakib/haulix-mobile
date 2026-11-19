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
import { C22E_DEFAULT_LEDGER } from "../../src/fixtures/c29AiResults";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AIMissingPhotosScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
  const bookingId = C22E_DEFAULT_LEDGER.bookingId;

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
      router.push("/ai-recognition");
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleReviewPhotos = useCallback(() => {
    setNoticeMessage(t("c22eAiMissingPhotos.noticeReviewPhotos"));
    setTimeout(() => {
      router.push({
        pathname: "/ai-recognition",
        params: { previewLocale: currentLocale },
      });
    }, 400);
  }, [router, currentLocale, t]);

  const handleManualDetails = useCallback(() => {
    setNoticeMessage(t("c22eAiMissingPhotos.noticeManualDetails"));
  }, [t]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c22eAiMissingPhotos.backA11y")}
          testID="c22e-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c22e-scroll-container"
        >
          {/* Upcoming Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c22e-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c22e-notice-dismiss"
                accessibilityRole="button"
                accessibilityLabel={t("c22eAiMissingPhotos.noticeDismiss")}
              >
                <Text style={styles.noticeDismissText}>
                  {t("c22eAiMissingPhotos.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker */}
          <View style={styles.flowMarkerCard} testID="c22e-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c22eAiMissingPhotos.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c22eAiMissingPhotos.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c22eAiMissingPhotos.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c22eAiMissingPhotos.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c22e-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c22eAiMissingPhotos.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: No uploaded image evidence */}
          <View style={styles.missingCard} testID="c22e-missing-card">
            <View style={styles.feedbackNoticeBox}>
              <View style={styles.infoIconWrapper}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke="#ADB7B1" strokeWidth={2} />
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
                  {t("c22eAiMissingPhotos.sectionMissingTitle")}
                </Text>
                <Text style={styles.feedbackSupporting}>
                  {t("c22eAiMissingPhotos.missingSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.guidanceText}>{t("c22eAiMissingPhotos.missingGuidance")}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionGroup}>
            <Pressable
              onPress={handleReviewPhotos}
              style={styles.primaryButton}
              testID="c22e-review-photos-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22eAiMissingPhotos.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>{t("c22eAiMissingPhotos.primaryCta")}</Text>
            </Pressable>

            <Pressable
              onPress={handleManualDetails}
              style={styles.secondaryButton}
              testID="c22e-manual-details-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22eAiMissingPhotos.secondaryManualDetailsCta")}
            >
              <Text style={styles.secondaryButtonText}>
                {t("c22eAiMissingPhotos.secondaryManualDetailsCta")}
              </Text>
            </Pressable>
          </View>

          {/* Developer Handoff / Rate Disclaimer */}
          <View style={styles.footerDisclaimer}>
            <Text style={styles.disclaimerText}>{t("c22eAiMissingPhotos.footerDemo")}</Text>
            <Text style={styles.disclaimerText}>{t("c22eAiMissingPhotos.footerSrs")}</Text>
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
  },
  noticeBanner: {
    backgroundColor: colors.elevated,
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.primaryText,
    lineHeight: 18,
    marginRight: 10,
  },
  noticeDismissButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.brand,
    borderRadius: 8,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.background,
  },
  flowMarkerCard: {
    backgroundColor: colors.surface,
    height: 34,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
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
    marginBottom: 16,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    color: colors.primaryText,
    lineHeight: 30,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  ledgerBadge: {
    backgroundColor: "#1A2510",
    borderRadius: 8,
    height: 37,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  ledgerBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.3,
  },
  missingCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#35403B",
    gap: 12,
  },
  feedbackNoticeBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 13,
    paddingVertical: 10,
    gap: 12,
  },
  infoIconWrapper: {
    width: 23,
    height: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackTextWrapper: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
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
  guidanceText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  actionGroup: {
    gap: 11,
    marginBottom: 16,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
  disclaimerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
    lineHeight: 14,
  },
});
