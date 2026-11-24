/**
 * HAULIX Customer Mobile App — Phase 03.62
 * Screen: 24-Hour Response Window (W08 Canonical State: NO_REPLY)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 907:7414 (EN: "W08-EN / NO_REPLY · 24-hour response window")
 * - Frame ID: 907:10314 (ES: "W08-ES / NO_REPLY · Plazo de respuesta de 24 horas")
 * - Parent Section: 902:6811 (EN) / 902:6812 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Customer response window represents the 24-hour SLA before automatic closure eligibility.
 * - Customer silence alone never guarantees capture without valid proof & clean authorization.
 * - Zero route guards; unrestricted direct access.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  W08BookingCard,
  W08DecisionCard,
  W08Header,
  W08PrototypeDisclaimer,
  W08StatusBadge,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionNoReplyScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

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

  const handleEligibleClosure = useCallback(() => {
    router.push({
      pathname: "/completion-auto-eligible",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleBlockedClosure = useCallback(() => {
    router.push({
      pathname: "/completion-auto-blocked",
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
        backA11y={t("w08NoReply.backA11y")}
        onBack={handleBack}
        testID="w08-no-reply-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w08-no-reply-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle} testID="w08-no-reply-title">
            {t("w08NoReply.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle} testID="w08-no-reply-subtitle">
            {t("w08NoReply.screenSubtitle")}
          </Text>
        </View>

        {/* Status Badge */}
        <W08StatusBadge
          label={t("w08NoReply.badgeConfirmation")}
          testID="w08-no-reply-status-badge"
        />

        {/* Booking Reference Card */}
        <W08BookingCard
          bookingRef={t("w08NoReply.bookingRef")}
          itemSummary={t("w08NoReply.itemSummary")}
          serviceCategory={t("w08NoReply.serviceCategory")}
          serviceSchedule={t("w08NoReply.serviceSchedule")}
          testID="w08-no-reply-booking-card"
        />

        {/* 3-Step Decision Card */}
        <W08DecisionCard
          heading={t("w08NoReply.decisionHeading")}
          info1Label={t("w08NoReply.info1Label")}
          info1Text={t("w08NoReply.info1Text")}
          info2Label={t("w08NoReply.info2Label")}
          info2Text={t("w08NoReply.info2Text")}
          info3Label={t("w08NoReply.info3Label")}
          info3Text={t("w08NoReply.info3Text")}
          testID="w08-no-reply-decision-card"
        />

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Pressable
            accessibilityLabel={t("w08NoReply.primaryCta")}
            accessibilityRole="button"
            onPress={handleEligibleClosure}
            style={styles.primaryButton}
            testID="w08-no-reply-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w08NoReply.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08NoReply.secondaryCta")}
            accessibilityRole="button"
            onPress={handleBlockedClosure}
            style={styles.secondaryButton}
            testID="w08-no-reply-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w08NoReply.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08NoReply.tertiaryLink")}
            accessibilityRole="button"
            onPress={handleMyJobs}
            style={styles.tertiaryLink}
            testID="w08-no-reply-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w08NoReply.tertiaryLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <W08PrototypeDisclaimer
          text={t("w08NoReply.prototypeDisclaimer")}
          testID="w08-no-reply-disclaimer"
        />
      </ScrollView>
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
});
