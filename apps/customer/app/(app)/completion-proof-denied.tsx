/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Screen: Evidence Access Restricted (W08 Canonical State: PROOF_DENIED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 907:7015 (EN: "W08-EN / PROOF_DENIED · Evidence access restricted")
 * - Frame ID: 907:9915 (ES: "W08-ES / PROOF_DENIED · Acceso a pruebas restringido")
 * - Parent Section: 902:6811 (EN) / 902:6812 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Restricted evidence is masked/obscured to safeguard customer premises and cargo privacy.
 * - Distinct from PROOF_MISSING; represents access permission boundaries.
 * - Sourced actions to return to My Jobs or contact support.
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
  W08Header,
  W08PrototypeDisclaimer,
  W08StatusBadge,
} from "../../src/components/completion/W08CompletionCard";
import { C32LockIcon } from "../../src/components/dispatch/C32Icons";

export default function CompletionProofDeniedScreen() {
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

  const handleReturnToJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleContactSupport = useCallback(() => {
    router.push({
      pathname: "/job-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleJobDetails = useCallback(() => {
    router.push({
      pathname: "/job-details",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <W08Header
        backA11y={t("w08ProofDenied.backA11y")}
        onBack={handleBack}
        testID="w08-proof-denied-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w08-proof-denied-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle} testID="w08-proof-denied-title">
            {t("w08ProofDenied.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle} testID="w08-proof-denied-subtitle">
            {t("w08ProofDenied.screenSubtitle")}
          </Text>
        </View>

        {/* Status Badge */}
        <W08StatusBadge
          label={t("w08ProofDenied.badgeProof")}
          testID="w08-proof-denied-status-badge"
        />

        {/* Booking Reference Card */}
        <W08BookingCard
          bookingRef={t("w08ProofDenied.bookingRef")}
          itemSummary={t("w08ProofDenied.itemSummary")}
          serviceCategory={t("w08ProofDenied.serviceCategory")}
          serviceSchedule={t("w08ProofDenied.serviceSchedule")}
          testID="w08-proof-denied-booking-card"
        />

        {/* Proof Content Card with Masked Confidential Access */}
        <View style={styles.proofCard} testID="w08-proof-denied-content-card">
          <Text style={styles.proofHeading}>{t("w08ProofDenied.proofHeading")}</Text>

          {/* Masked Restricted Access Notice */}
          <View style={styles.restrictedNoticeBox}>
            <View style={styles.restrictedIconWrap}>
              <C32LockIcon color={colors.brand} size={28} />
            </View>
            <Text style={styles.restrictedBadge}>{t("w08ProofDenied.restrictedBadge")}</Text>
            <Text style={styles.restrictedMessage}>{t("w08ProofDenied.restrictedMessage")}</Text>
          </View>

          {/* Source Notice */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoTag}>{t("w08ProofDenied.sourceHeading")}</Text>
            <Text style={styles.infoDescription}>{t("w08ProofDenied.sourceDescription")}</Text>
          </View>

          {/* Requirement Notice */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoTag}>{t("w08ProofDenied.requirementHeading")}</Text>
            <Text style={styles.infoDescription}>{t("w08ProofDenied.requirementDescription")}</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionsSection}>
          <Pressable
            accessibilityLabel={t("w08ProofDenied.primaryCta")}
            accessibilityRole="button"
            onPress={handleReturnToJobs}
            style={styles.primaryButton}
            testID="w08-proof-denied-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w08ProofDenied.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08ProofDenied.secondaryCta")}
            accessibilityRole="button"
            onPress={handleContactSupport}
            style={styles.secondaryButton}
            testID="w08-proof-denied-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w08ProofDenied.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08ProofDenied.tertiaryLink")}
            accessibilityRole="button"
            onPress={handleJobDetails}
            style={styles.tertiaryLink}
            testID="w08-proof-denied-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w08ProofDenied.tertiaryLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <W08PrototypeDisclaimer
          text={t("w08ProofDenied.prototypeDisclaimer")}
          testID="w08-proof-denied-disclaimer"
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
  proofCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 18,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  proofHeading: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },
  restrictedNoticeBox: {
    alignItems: "center",
    backgroundColor: "#111614",
    borderColor: colors.elevated,
    borderRadius: 14,
    borderWidth: 1,
    gap: 8,
    padding: 20,
  },
  restrictedIconWrap: {
    alignItems: "center",
    backgroundColor: "rgba(186, 255, 66, 0.1)",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  restrictedBadge: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  restrictedMessage: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },
  infoBlock: {
    gap: 3,
  },
  infoTag: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  infoDescription: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
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
