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
import { C22D_SUGGESTED_ITEMS } from "../../src/fixtures/c29AiResults";

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

export default function AISuggestedItemsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
  const customerFirstName = customerName.split(" ")[0] ?? customerName;
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
      router.push("/ai-processing");
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleVerifyItems = useCallback(() => {
    router.push({
      pathname: "/verify-suggested-inventory",
      params: { previewLocale: currentLocale },
    });
  }, [router, currentLocale]);

  const handleUncertainItem = useCallback(() => {
    router.push({
      pathname: "/measurement-clarification",
      params: { previewLocale: currentLocale },
    });
  }, [router, currentLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c22dAiSuggestedItems.backA11y")}
          testID="c22d-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c22d-scroll-container"
        >
          {/* Upcoming Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c22d-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c22d-notice-dismiss"
                accessibilityRole="button"
                accessibilityLabel={t("c22dAiSuggestedItems.noticeDismiss")}
              >
                <Text style={styles.noticeDismissText}>
                  {t("c22dAiSuggestedItems.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker */}
          <View style={styles.flowMarkerCard} testID="c22d-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c22dAiSuggestedItems.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c22dAiSuggestedItems.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c22dAiSuggestedItems.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c22dAiSuggestedItems.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c22d-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c22dAiSuggestedItems.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: AI suggestions · unconfirmed */}
          <View style={styles.suggestionsCard} testID="c22d-suggestions-card">
            <Text style={styles.cardHeading}>
              {t("c22dAiSuggestedItems.sectionSuggestionsTitle")}
            </Text>

            {C22D_SUGGESTED_ITEMS.map((item) => {
              const imageSource = ITEM_IMAGES[item.imageKey];
              let title = "";
              let aiSuggests = "";
              let statusText = "";

              if (item.nameKey === "sofa") {
                title = t("c22dAiSuggestedItems.itemSofaTitle");
                aiSuggests = t("c22dAiSuggestedItems.itemSofaAiSuggests");
                statusText = t("c22dAiSuggestedItems.itemSofaNeedsConfirmation", {
                  customerFirstName,
                });
              } else if (item.nameKey === "mattress") {
                title = t("c22dAiSuggestedItems.itemMattressTitle");
                aiSuggests = t("c22dAiSuggestedItems.itemMattressAiSuggests");
                statusText = t("c22dAiSuggestedItems.itemMattressQuantityMismatch");
              } else {
                title = t("c22dAiSuggestedItems.itemDiningTableTitle");
                aiSuggests = t("c22dAiSuggestedItems.itemDiningTableAiSuggests");
                statusText = t("c22dAiSuggestedItems.itemDiningTableNeedsConfirmation");
              }

              return (
                <View key={item.id} style={styles.itemRow} testID={`c22d-item-${item.id}`}>
                  {imageSource && (
                    <Image
                      source={imageSource}
                      style={styles.itemThumb}
                      resizeMode="cover"
                      accessibilityLabel={title}
                    />
                  )}
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{title}</Text>
                    <Text style={styles.itemAiSuggests}>{aiSuggests}</Text>
                    <Text style={styles.itemStatusText}>{statusText}</Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Section: One quantity mismatch found */}
          <View style={styles.mismatchCard} testID="c22d-mismatch-card">
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
                  {t("c22dAiSuggestedItems.sectionMismatchTitle")}
                </Text>
                <Text style={styles.feedbackSupporting}>
                  {t("c22dAiSuggestedItems.mismatchSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.mismatchBodyText}>
              {t("c22dAiSuggestedItems.mismatchNotice", { customerFirstName })}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionGroup}>
            <Pressable
              onPress={handleVerifyItems}
              style={styles.primaryButton}
              testID="c22d-primary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22dAiSuggestedItems.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>{t("c22dAiSuggestedItems.primaryCta")}</Text>
            </Pressable>

            <Pressable
              onPress={handleUncertainItem}
              style={styles.secondaryButton}
              testID="c22d-uncertain-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22dAiSuggestedItems.secondaryUncertainCta")}
            >
              <Text style={styles.secondaryButtonText}>
                {t("c22dAiSuggestedItems.secondaryUncertainCta")}
              </Text>
            </Pressable>
          </View>

          {/* Developer Handoff / Rate Disclaimer */}
          <View style={styles.footerDisclaimer}>
            <Text style={styles.disclaimerText}>{t("c22dAiSuggestedItems.footerDemo")}</Text>
            <Text style={styles.disclaimerText}>{t("c22dAiSuggestedItems.footerSrs")}</Text>
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
  suggestionsCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#35403B",
    gap: 12,
  },
  cardHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
    marginBottom: 4,
  },
  itemRow: {
    backgroundColor: colors.elevated,
    borderRadius: 11,
    height: 94,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 12,
  },
  itemThumb: {
    width: 90,
    height: 74,
    borderRadius: 8,
  },
  itemInfo: {
    marginLeft: 11,
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  itemTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
  },
  itemAiSuggests: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
  },
  itemStatusText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.brand,
  },
  mismatchCard: {
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
  mismatchBodyText: {
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
