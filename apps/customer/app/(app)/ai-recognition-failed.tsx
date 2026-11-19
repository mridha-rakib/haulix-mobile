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
import { C22F_DEFAULT_LEDGER } from "../../src/fixtures/c29AiResults";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AIRecognitionFailedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string; attachmentCount?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
  const customerFirstName = customerName.split(" ")[0] ?? customerName;
  const bookingId = C22F_DEFAULT_LEDGER.bookingId;
  const attachmentCount =
    params.attachmentCount !== undefined
      ? Number.parseInt(params.attachmentCount, 10)
      : C22F_DEFAULT_LEDGER.attachmentCount;

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

  const handleRetry = useCallback(() => {
    setNoticeMessage(t("c22fAiRecognitionFailed.noticeRetryDemo"));
    setTimeout(() => {
      router.push({
        pathname: "/ai-processing",
        params: { previewLocale: currentLocale },
      });
    }, 400);
  }, [router, currentLocale, t]);

  const handleManualDetails = useCallback(() => {
    setNoticeMessage(t("c22fAiRecognitionFailed.noticeManualDetails"));
  }, [t]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c22fAiRecognitionFailed.backA11y")}
          testID="c22f-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c22f-scroll-container"
        >
          {/* Upcoming Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c22f-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c22f-notice-dismiss"
                accessibilityRole="button"
                accessibilityLabel={t("c22fAiRecognitionFailed.noticeDismiss")}
              >
                <Text style={styles.noticeDismissText}>
                  {t("c22fAiRecognitionFailed.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker */}
          <View style={styles.flowMarkerCard} testID="c22f-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c22fAiRecognitionFailed.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c22fAiRecognitionFailed.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c22fAiRecognitionFailed.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c22fAiRecognitionFailed.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c22f-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c22fAiRecognitionFailed.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Recognition service unavailable */}
          <View style={styles.errorCard} testID="c22f-error-card">
            <View style={styles.feedbackNoticeBox}>
              <View style={styles.infoIconWrapper}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke="#F36D6D" strokeWidth={2} />
                  <Path
                    d="M12 16V12M12 8H12.01"
                    stroke="#F36D6D"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <View style={styles.feedbackTextWrapper}>
                <Text style={styles.feedbackTitle}>
                  {t("c22fAiRecognitionFailed.sectionErrorTitle")}
                </Text>
                <Text style={styles.feedbackSupporting}>
                  {t("c22fAiRecognitionFailed.errorSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.guidanceText}>
              {t("c22fAiRecognitionFailed.errorGuidance", { customerFirstName })}
            </Text>
            <Text style={styles.noticeBodyText}>{t("c22fAiRecognitionFailed.errorNotice")}</Text>
          </View>

          {/* Section: Preserved draft */}
          <View style={styles.draftCard} testID="c22f-draft-card">
            <Text style={styles.cardHeading}>{t("c22fAiRecognitionFailed.sectionDraftTitle")}</Text>
            <Text style={styles.draftSummaryText}>
              {t("c22fAiRecognitionFailed.draftSummary", {
                bookingId,
                attachmentCount,
              })}
            </Text>
            <Text style={styles.draftNoticeText}>{t("c22fAiRecognitionFailed.draftNotice")}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionGroup}>
            <Pressable
              onPress={handleRetry}
              style={styles.primaryButton}
              testID="c22f-retry-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22fAiRecognitionFailed.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>
                {t("c22fAiRecognitionFailed.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleManualDetails}
              style={styles.secondaryButton}
              testID="c22f-manual-details-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22fAiRecognitionFailed.secondaryManualDetailsCta")}
            >
              <Text style={styles.secondaryButtonText}>
                {t("c22fAiRecognitionFailed.secondaryManualDetailsCta")}
              </Text>
            </Pressable>
          </View>

          {/* Developer Handoff / Rate Disclaimer */}
          <View style={styles.footerDisclaimer}>
            <Text style={styles.disclaimerText}>{t("c22fAiRecognitionFailed.footerDemo")}</Text>
            <Text style={styles.disclaimerText}>{t("c22fAiRecognitionFailed.footerSrs")}</Text>
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
  errorCard: {
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
    borderColor: "#F36D6D",
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
  noticeBodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  draftCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#35403B",
    gap: 10,
  },
  cardHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
    marginBottom: 2,
  },
  draftSummaryText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  draftNoticeText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
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
