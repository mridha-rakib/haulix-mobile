/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Screen: Confirm Completed Service (W08 Canonical State: CONFIRM)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 907:7117 (EN: "W08-EN / CONFIRM · Confirm completed service?")
 * - Frame ID: 907:10017 (ES: "W08-ES / CONFIRM · ¿Confirmar servicio finalizado?")
 * - Parent Section: 902:6811 (EN) / 902:6812 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Customer completion confirmation is distinct from backend payment capture or final settlement.
 * - Sourced actions to confirm completion (demo acknowledgement) or report an issue.
 * - Zero route guards; unrestricted direct access.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  W08BookingCard,
  W08DecisionCard,
  W08Header,
  W08PrototypeDisclaimer,
  W08StatusBadge,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionConfirmScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/completion-proof",
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

  const handleConfirmCompletion = useCallback(() => {
    setConfirmModalVisible(true);
  }, []);

  const handleAcknowledgeCompletion = useCallback(() => {
    setConfirmModalVisible(false);
    router.push({
      pathname: "/completion-capture-pending",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReportIssue = useCallback(() => {
    router.push({
      pathname: "/completion-issue",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleMyJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <W08Header
        backA11y={t("w08Confirm.backA11y")}
        onBack={handleBack}
        testID="w08-confirm-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w08-confirm-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle} testID="w08-confirm-title">
            {t("w08Confirm.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle} testID="w08-confirm-subtitle">
            {t("w08Confirm.screenSubtitle")}
          </Text>
        </View>

        {/* Status Badge */}
        <W08StatusBadge
          label={t("w08Confirm.badgeConfirmation")}
          testID="w08-confirm-status-badge"
        />

        {/* Booking Reference Card */}
        <W08BookingCard
          bookingRef={t("w08Confirm.bookingRef")}
          itemSummary={t("w08Confirm.itemSummary")}
          serviceCategory={t("w08Confirm.serviceCategory")}
          serviceSchedule={t("w08Confirm.serviceSchedule")}
          testID="w08-confirm-booking-card"
        />

        {/* 3-Step Decision Card */}
        <W08DecisionCard
          heading={t("w08Confirm.decisionHeading")}
          info1Label={t("w08Confirm.info1Label")}
          info1Text={t("w08Confirm.info1Text")}
          info2Label={t("w08Confirm.info2Label")}
          info2Text={t("w08Confirm.info2Text")}
          info3Label={t("w08Confirm.info3Label")}
          info3Text={t("w08Confirm.info3Text")}
          testID="w08-confirm-decision-card"
        />

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Pressable
            accessibilityLabel={t("w08Confirm.primaryCta")}
            accessibilityRole="button"
            onPress={handleConfirmCompletion}
            style={styles.primaryButton}
            testID="w08-confirm-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w08Confirm.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08Confirm.secondaryCta")}
            accessibilityRole="button"
            onPress={handleReportIssue}
            style={styles.secondaryButton}
            testID="w08-confirm-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w08Confirm.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08Confirm.tertiaryLink")}
            accessibilityRole="button"
            onPress={handleMyJobs}
            style={styles.tertiaryLink}
            testID="w08-confirm-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w08Confirm.tertiaryLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <W08PrototypeDisclaimer
          text={t("w08Confirm.prototypeDisclaimer")}
          testID="w08-confirm-disclaimer"
        />
      </ScrollView>

      {/* Confirmation Acknowledgement Modal */}
      <Modal
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
        transparent
        visible={confirmModalVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent} testID="w08-confirm-ack-modal">
            <Text style={styles.modalEmoji}>✅</Text>
            <Text style={styles.modalTitle}>{t("w08Confirm.confirmedModalHeading")}</Text>
            <Text style={styles.modalDescription}>{t("w08Confirm.confirmedModalText")}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={handleAcknowledgeCompletion}
              style={styles.modalCloseButton}
              testID="w08-confirm-modal-close"
            >
              <Text style={styles.modalCloseButtonText}>{t("w08Confirm.confirmedModalClose")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  heroSection: {
    gap: 6,
  },
  heroTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
  },
  heroSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  actionsSection: {
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 12,
    borderWidth: 1,
    height: 52,
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  tertiaryLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  tertiaryLinkText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
  modalBackdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    padding: 24,
    width: "100%",
  },
  modalEmoji: {
    fontSize: 56,
  },
  modalTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    textAlign: "center",
  },
  modalDescription: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  modalCloseButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
    marginTop: 8,
    width: "100%",
  },
  modalCloseButtonText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
});
