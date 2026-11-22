import { colors, fontFamily, radius, spacing } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C18CheckIcon,
  C20RCheckboxIcon,
  C20RDeclarationCheckIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  C20R_SAFETY_ROWS,
  getAcknowledgementsState,
  setAcknowledgement,
  subscribeToAcknowledgements,
} from "../../src/fixtures/c20rSafety";

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
 * Screen 3: C20-R Safety & Restrictions
 *
 * Authoritative Figma:
 *   - English: Node 382:1873 (430 × 1269 px)
 *   - Spanish: Node 980:10115 (430 × 1269 px)
 *
 * Scope: Safety questions and controlled customer acknowledgements.
 * Two actual checkboxes must be explicitly confirmed to advance.
 */
export default function ServiceRestrictionsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLocale = getCurrentLocale() as "en" | "es";
  const profile = useCustomerProfile(currentLocale);
  const bookingId = "HX-DEMO-1027";
  const [acks, setAcks] = useState(() => getAcknowledgementsState());
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [isValidationAlert, setIsValidationAlert] = useState(false);

  useEffect(() => {
    return subscribeToAcknowledgements(setAcks);
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

  const toggleItemsRep = useCallback(() => {
    setAcknowledgement("itemsRepresentRequest", !acks.itemsRepresentRequest);
  }, [acks.itemsRepresentRequest]);

  const toggleDisclosed = useCallback(() => {
    setAcknowledgement("disclosedSafetyRisks", !acks.disclosedSafetyRisks);
  }, [acks.disclosedSafetyRisks]);

  const handleAcknowledgeAndReview = useCallback(() => {
    if (!acks.itemsRepresentRequest || !acks.disclosedSafetyRisks) {
      setIsValidationAlert(true);
      setNoticeMessage(t("c20r.validationRequired"));
      return;
    }
    setIsValidationAlert(false);
    router.push("/intake-review");
  }, [acks.disclosedSafetyRisks, acks.itemsRepresentRequest, router, t]);

  const handleNeedHelp = useCallback(() => {
    router.push("/restricted-material");
  }, [router]);

  const handleIncompleteAccess = useCallback(() => {
    router.push("/access-validation");
  }, [router]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c20r-header-back" onBack={handleBack} backA11y={t("c20r.backA11y")} />

      {noticeMessage && (
        <View
          style={[styles.noticeBox, isValidationAlert && styles.noticeBoxAlert]}
          testID="c20r-notice-banner"
        >
          <Text style={[styles.noticeText, isValidationAlert && styles.noticeTextAlert]}>
            {noticeMessage}
          </Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c20r.noticeDismiss")}
            testID="c20r-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c20r.noticeDismiss")}</Text>
          </Pressable>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="c20r-scroll-container"
      >
        {/* Step Indicator */}
        <View style={styles.stepBadge} testID="c20r-step-indicator">
          <Text style={styles.stepBadgeBrand}>{t("c20r.stepIndicator")}</Text>
          <Text style={styles.stepBadgeSub}>{t("c20r.stepSub")}</Text>
        </View>

        {/* Screen Heading */}
        <View style={styles.headingSection} testID="c20r-heading-section">
          <Text style={styles.screenTitle}>{t("c20r.title")}</Text>
          <Text style={styles.screenSubtitle}>{t("c20r.subtitle")}</Text>
        </View>

        {/* Customer Booking Context Chip */}
        <View style={styles.customerContextRow} testID="c20r-customer-context-chip">
          <C18CheckIcon size={17} color={colors.brand} />
          <Text style={styles.customerContextText}>
            {`${profile.name.toUpperCase()} · ${bookingId}`}
          </Text>
        </View>

        {/* Section: Safety questions */}
        <View style={styles.sectionCard} testID="c20r-safety-questions-card">
          <Text style={styles.sectionTitle}>{t("c20r.sectionQuestionsTitle")}</Text>

          <View style={styles.questionsList}>
            {C20R_SAFETY_ROWS.map((row) => (
              <View key={row.id} style={styles.questionRow} testID={`c20r-question-${row.id}`}>
                <C20RDeclarationCheckIcon size={23} color={colors.brand} />
                <View style={styles.questionTextCol}>
                  <Text style={styles.questionLabel}>
                    {currentLocale === "es" ? row.labelEs : row.label}
                  </Text>
                  <Text style={styles.questionValue}>
                    {row.getValue(profile.name, currentLocale)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section: Customer acknowledgement */}
        <View style={styles.sectionCard} testID="c20r-acknowledgement-card">
          <Text style={styles.sectionTitle}>{t("c20r.sectionAckTitle")}</Text>

          {/* Checkbox 1: Items represent request */}
          <Pressable
            style={styles.checkboxRow}
            onPress={toggleItemsRep}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: acks.itemsRepresentRequest }}
            accessibilityLabel={t("c20r.ackItemsLabel")}
            testID="c20r-ack-checkbox-items"
          >
            <C20RCheckboxIcon checked={acks.itemsRepresentRequest} size={20} />
            <Text
              style={[
                styles.ackLabelText,
                acks.itemsRepresentRequest && styles.ackLabelTextChecked,
              ]}
            >
              {t("c20r.ackItemsLabel")}
            </Text>
          </Pressable>

          {/* Checkbox 2: Disclosed safety risks */}
          <Pressable
            style={styles.checkboxRow}
            onPress={toggleDisclosed}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: acks.disclosedSafetyRisks }}
            accessibilityLabel={t("c20r.ackDisclosedLabel")}
            testID="c20r-ack-checkbox-disclosed"
          >
            <C20RCheckboxIcon checked={acks.disclosedSafetyRisks} size={20} />
            <Text
              style={[styles.ackLabelText, acks.disclosedSafetyRisks && styles.ackLabelTextChecked]}
            >
              {t("c20r.ackDisclosedLabel")}
            </Text>
          </Pressable>

          {/* Disclaimer */}
          <Text style={styles.ackDisclaimerText}>{t("c20r.ackDisclaimer")}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection} testID="c20r-actions-section">
          {/* Primary CTA */}
          <Pressable
            style={styles.primaryButton}
            onPress={handleAcknowledgeAndReview}
            accessibilityRole="button"
            accessibilityLabel={t("c20r.acknowledgeCta")}
            testID="c20r-acknowledge-button"
          >
            <Text style={styles.primaryButtonText}>{t("c20r.acknowledgeCta")}</Text>
          </Pressable>

          {/* Secondary CTA: Need help with item -> C20-X */}
          <Pressable
            style={styles.secondaryButton}
            onPress={handleNeedHelp}
            accessibilityRole="button"
            accessibilityLabel={t("c20r.needHelpCta")}
            testID="c20r-need-help-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c20r.needHelpCta")}</Text>
          </Pressable>

          {/* Tertiary CTA: Incomplete access -> C20-V */}
          <Pressable
            style={styles.secondaryButton}
            onPress={handleIncompleteAccess}
            accessibilityRole="button"
            accessibilityLabel={t("c20r.incompleteAccessCta")}
            testID="c20r-incomplete-access-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c20r.incompleteAccessCta")}</Text>
          </Pressable>
        </View>

        {/* Footer Disclaimers */}
        <View style={styles.footerSection} testID="c20r-footer-section">
          <Text style={styles.footerNotice}>{t("c20r.footerDemo")}</Text>
          <Text style={styles.footerNotice}>{t("c20r.footerSrs")}</Text>
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
  noticeBoxAlert: {
    backgroundColor: "rgba(243, 109, 109, 0.12)",
    borderColor: "#F36D6D",
  },
  noticeText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
    flex: 1,
    marginRight: 8,
  },
  noticeTextAlert: {
    color: "#F36D6D",
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
  questionsList: {
    gap: 10,
  },
  questionRow: {
    backgroundColor: "#222827",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  questionTextCol: {
    flex: 1,
    gap: 4,
  },
  questionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: "#F6F8F6",
  },
  questionValue: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#ADB7B1",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
    paddingVertical: 2,
  },
  ackLabelText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: "#ADB7B1",
    flex: 1,
  },
  ackLabelTextChecked: {
    color: "#F6F8F6",
    fontFamily: fontFamily.medium,
  },
  ackDisclaimerText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: "#ADB7B1",
    marginTop: 4,
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
