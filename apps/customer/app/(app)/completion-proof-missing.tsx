/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Screen: Completion Proof Missing (W08 Canonical State: PROOF_MISSING)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 907:6913 (EN: "W08-EN / PROOF_MISSING · Completion proof missing")
 * - Frame ID: 907:9813 (ES: "W08-ES / PROOF_MISSING · Falta prueba de finalización")
 * - Parent Section: 902:6811 (EN) / 902:6812 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration; distinct from PROOF_DENIED.
 * - Missing evidence must not be displayed as uploaded or confirmed.
 * - Sourced actions to retry photo review, open issue, or visit My Jobs.
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
import { C32AlertTriangleIcon } from "../../src/components/dispatch/C32Icons";

export default function CompletionProofMissingScreen() {
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

  const handleRetryReview = useCallback(() => {
    router.push({
      pathname: "/completion-proof",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleOpenIssue = useCallback(() => {
    router.push({
      pathname: "/completion-issue",
      params: {
        ...(params.previewLocale ? { previewLocale: params.previewLocale } : {}),
        initialTopic: "missing",
      },
    });
  }, [router, params.previewLocale]);

  const handlePreviewDenied = useCallback(() => {
    router.push({
      pathname: "/completion-proof-denied",
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
        backA11y={t("w08ProofMissing.backA11y")}
        onBack={handleBack}
        testID="w08-proof-missing-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w08-proof-missing-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle} testID="w08-proof-missing-title">
            {t("w08ProofMissing.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle} testID="w08-proof-missing-subtitle">
            {t("w08ProofMissing.screenSubtitle")}
          </Text>
        </View>

        {/* Status Badge */}
        <W08StatusBadge
          label={t("w08ProofMissing.badgeProof")}
          testID="w08-proof-missing-status-badge"
        />

        {/* Booking Reference Card */}
        <W08BookingCard
          bookingRef={t("w08ProofMissing.bookingRef")}
          itemSummary={t("w08ProofMissing.itemSummary")}
          serviceCategory={t("w08ProofMissing.serviceCategory")}
          serviceSchedule={t("w08ProofMissing.serviceSchedule")}
          testID="w08-proof-missing-booking-card"
        />

        {/* Proof Missing Content Card */}
        <View style={styles.proofCard} testID="w08-proof-missing-content-card">
          <Text style={styles.proofHeading}>{t("w08ProofMissing.proofHeading")}</Text>

          {/* Missing Evidence Callout Box */}
          <View style={styles.missingNoticeBox}>
            <C32AlertTriangleIcon color={colors.warning} size={24} />
            <View style={styles.missingNoticeTextWrap}>
              <Text style={styles.missingNoticeHeading}>
                {t("w08ProofMissing.missingNoticeHeading")}
              </Text>
              <Text style={styles.missingNoticeText}>{t("w08ProofMissing.missingNoticeText")}</Text>
            </View>
          </View>

          {/* Source Notice */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoTag}>{t("w08ProofMissing.sourceHeading")}</Text>
            <Text style={styles.infoDescription}>{t("w08ProofMissing.sourceDescription")}</Text>
          </View>

          {/* Requirement Notice */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoTag}>{t("w08ProofMissing.requirementHeading")}</Text>
            <Text style={styles.infoDescription}>
              {t("w08ProofMissing.requirementDescription")}
            </Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionsSection}>
          <Pressable
            accessibilityLabel={t("w08ProofMissing.primaryCta")}
            accessibilityRole="button"
            onPress={handleRetryReview}
            style={styles.primaryButton}
            testID="w08-proof-missing-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w08ProofMissing.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08ProofMissing.secondaryCta")}
            accessibilityRole="button"
            onPress={handleOpenIssue}
            style={styles.secondaryButton}
            testID="w08-proof-missing-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w08ProofMissing.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08ProofMissing.tertiaryLink")}
            accessibilityRole="button"
            onPress={handleMyJobs}
            style={styles.tertiaryLink}
            testID="w08-proof-missing-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w08ProofMissing.tertiaryLink")}</Text>
          </Pressable>

          {/* QA Preview Shortcut to Denied State */}
          <Pressable
            accessibilityRole="button"
            onPress={handlePreviewDenied}
            style={styles.tertiaryLink}
            testID="w08-proof-missing-denied-preview-btn"
          >
            <Text style={styles.tertiaryLinkTextSubtle}>
              {t("w08ProofMissing.previewDeniedBtn")}
            </Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <W08PrototypeDisclaimer
          text={t("w08ProofMissing.prototypeDisclaimer")}
          testID="w08-proof-missing-disclaimer"
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
  missingNoticeBox: {
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 186, 74, 0.08)",
    borderColor: colors.warning,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 14,
  },
  missingNoticeTextWrap: {
    flex: 1,
    gap: 4,
  },
  missingNoticeHeading: {
    color: colors.warning,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
  missingNoticeText: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
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
  tertiaryLinkTextSubtle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
});
