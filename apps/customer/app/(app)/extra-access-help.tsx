import { colors, fontFamily, radius, spacing } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C18CheckIcon, C20ECheckAmberIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  declineHandlingRequest,
  getHandlingRequestState,
  saveHandlingRequestDraft,
  subscribeToHandlingRequest,
} from "../../src/fixtures/c20eHandlingRequest";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

/**
 * HAULIX Customer Mobile App — Phase 03.23
 * Screen 1: C20-E Extra Access Help / Request Additional Handling
 *
 * Authoritative Figma:
 *   - English: Node 382:1767 (430 × 1195 px)
 *   - Spanish: Node 980:9977 (430 × 1195 px)
 *
 * Scope: Optional labor / disassembly request.
 * NOTE: Does NOT approve disassembly labor, extra workers, pricing, or vehicle capacity.
 */
export default function ExtraAccessHelpScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLocale = getCurrentLocale() as "en" | "es";
  const profile = useCustomerProfile(currentLocale);
  const bookingId = "HX-DEMO-1027";
  const [handlingState, setHandlingState] = useState(() => getHandlingRequestState());
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  useEffect(() => {
    return subscribeToHandlingRequest(setHandlingState);
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/access-details");
    }
  }, [router]);

  useEffect(() => {
    if (Platform.OS === "android") {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        handleBack();
        return true;
      });
      return () => sub.remove();
    }
  }, [handleBack]);

  const handleSaveRequest = useCallback(() => {
    saveHandlingRequestDraft();
    setNoticeMessage(t("c20e.noticeSaved"));
    setTimeout(() => {
      handleBack();
    }, 1200);
  }, [handleBack, t]);

  const handleDeclineRequest = useCallback(() => {
    declineHandlingRequest();
    setNoticeMessage(t("c20e.noticeDeclined"));
    setTimeout(() => {
      handleBack();
    }, 1000);
  }, [handleBack, t]);

  const reqItem = handlingState.exampleRequest;
  const taskText = currentLocale === "es" ? reqItem.taskEs : reqItem.task;
  const locText = currentLocale === "es" ? reqItem.locationEs : reqItem.location;
  const accessText = currentLocale === "es" ? reqItem.accessEs : reqItem.access;
  const scopeText = currentLocale === "es" ? reqItem.scopeStatusEs : reqItem.scopeStatus;

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c20e-header-back" onBack={handleBack} backA11y={t("c20e.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c20e-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c20e.noticeDismiss")}
            testID="c20e-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c20e.noticeDismiss")}</Text>
          </Pressable>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="c20e-scroll-container"
      >
        {/* Step Indicator */}
        <View style={styles.stepBadge} testID="c20e-step-indicator">
          <Text style={styles.stepBadgeBrand}>{t("c20e.stepIndicator")}</Text>
          <Text style={styles.stepBadgeSub}>{t("c20e.stepSub")}</Text>
        </View>

        {/* Screen Heading */}
        <View style={styles.headingSection} testID="c20e-heading-section">
          <Text style={styles.screenTitle}>{t("c20e.title")}</Text>
          <Text style={styles.screenSubtitle}>{t("c20e.subtitle")}</Text>
        </View>

        {/* Customer Booking Context Chip */}
        <View style={styles.customerContextRow} testID="c20e-customer-context-chip">
          <C18CheckIcon size={17} color={colors.brand} />
          <Text style={styles.customerContextText}>
            {`${profile.name.toUpperCase()} · ${bookingId}`}
          </Text>
        </View>

        {/* Section: Example handling request */}
        <View style={styles.sectionCard} testID="c20e-example-request-card">
          <Text style={styles.sectionTitle}>{t("c20e.sectionExampleTitle")}</Text>

          <View style={styles.detailRowsList}>
            {/* Task */}
            <View style={styles.detailRow} testID="c20e-row-task">
              <Text style={styles.detailLabel}>{t("c20e.labelTask")}</Text>
              <Text style={styles.detailValue}>{taskText}</Text>
            </View>

            {/* Location */}
            <View style={styles.detailRow} testID="c20e-row-location">
              <Text style={styles.detailLabel}>{t("c20e.labelLocation")}</Text>
              <Text style={styles.detailValue}>{locText}</Text>
            </View>

            {/* Access */}
            <View style={styles.detailRow} testID="c20e-row-access">
              <Text style={styles.detailLabel}>{t("c20e.labelAccess")}</Text>
              <Text style={styles.detailValue}>{accessText}</Text>
            </View>

            {/* Scope status */}
            <View style={styles.detailRow} testID="c20e-row-scope-status">
              <Text style={styles.detailLabel}>{t("c20e.labelScopeStatus")}</Text>
              <Text style={styles.detailValue}>{scopeText}</Text>
            </View>
          </View>
        </View>

        {/* Section: Optional work requires approval */}
        <View style={styles.sectionCard} testID="c20e-review-card">
          <Text style={styles.sectionTitle}>{t("c20e.sectionReviewTitle")}</Text>

          <View style={styles.badgeRow}>
            <C20ECheckAmberIcon size={18} color="#FFC85A" />
            <Text style={styles.badgeText}>{t("c20e.reviewBadge")}</Text>
          </View>

          <Text style={styles.guidanceText}>{t("c20e.reviewGuidance1")}</Text>
          <Text style={styles.guidanceSub}>{t("c20e.reviewGuidance2")}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection} testID="c20e-actions-section">
          <Pressable
            style={styles.primaryButton}
            onPress={handleSaveRequest}
            accessibilityRole="button"
            accessibilityLabel={t("c20e.saveRequestCta")}
            testID="c20e-save-request-button"
          >
            <Text style={styles.primaryButtonText}>{t("c20e.saveRequestCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleDeclineRequest}
            accessibilityRole="button"
            accessibilityLabel={t("c20e.doNotRequestCta")}
            testID="c20e-decline-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c20e.doNotRequestCta")}</Text>
          </Pressable>
        </View>

        {/* Footer Disclaimers */}
        <View style={styles.footerSection} testID="c20e-footer-section">
          <Text style={styles.footerNotice}>{t("c20e.footerDemo")}</Text>
          <Text style={styles.footerNotice}>{t("c20e.footerSrs")}</Text>
        </View>
      </ScrollView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  noticeBox: {
    marginHorizontal: 22,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.md,
    backgroundColor: "#1A2510",
    borderWidth: 1,
    borderColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
    flex: 1,
    marginRight: 8,
  },
  noticeDismiss: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: "#ADB7B1",
  },
  stepBadge: {
    flexDirection: "row",
    alignItems: "center",
    height: 33,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 9,
    alignSelf: "flex-start",
    marginBottom: spacing[3],
  },
  stepBadgeBrand: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
  },
  stepBadgeSub: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: "#ADB7B1",
  },
  headingSection: {
    marginBottom: spacing[3],
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 31,
    color: "#F6F8F6",
    marginBottom: 6,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: "#ADB7B1",
  },
  customerContextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 39,
    paddingHorizontal: 12,
    backgroundColor: "#1A2510",
    borderRadius: 9,
    marginBottom: spacing[4],
  },
  customerContextText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    paddingHorizontal: 16,
    paddingVertical: 17,
    marginBottom: spacing[4],
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#F6F8F6",
    marginBottom: 13,
  },
  detailRowsList: {
    gap: 10,
  },
  detailRow: {
    backgroundColor: "#222827",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#ADB7B1",
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: "#F6F8F6",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 32,
    paddingHorizontal: 10,
    backgroundColor: "#222827",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: "#ADB7B1",
  },
  guidanceText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    color: "#ADB7B1",
    marginBottom: 8,
  },
  guidanceSub: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    color: "#ADB7B1",
  },
  actionsSection: {
    gap: 11,
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#080B0B",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerSection: {
    gap: 10,
    marginTop: spacing[1],
  },
  footerNotice: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
    lineHeight: 14,
  },
});
