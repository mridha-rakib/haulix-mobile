/**
 * HAULIX Customer Mobile App — Phase 03.58
 * Screen: Could Not Send Support Request (W07 Canonical State: SUPPORT_FAILED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:7827 (EN: "W07-EN / SUPPORT_FAILED · Could not send support request")
 * - Frame ID: 893:8233 (ES: "W07-ES / SUPPORT_FAILED · No se pudo enviar solicitud")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Deterministic failure outcome allowing draft editing and retry without duplicate tickets.
 * - Sourced actions to retry, return to booking, or navigate to My Jobs.
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32AlertTriangleIcon,
  C32BriefcaseIcon,
  C32CalendarIcon,
  C32CreditCardIcon,
  C32HelpCircleIcon,
  C32PackageIcon,
  C32SmartphoneIcon,
  C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";

export default function JobSupportFailedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{
    previewLocale?: string;
    originatingCategory?: string;
  }>();

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  const supportOriginRoute =
    params.originatingCategory === "driver"
      ? "/job-support-driver"
      : params.originatingCategory === "service"
        ? "/job-support-service"
        : params.originatingCategory === "payment"
          ? "/job-support-payment"
          : params.originatingCategory === "other"
            ? "/job-support-other"
            : "/job-support";

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: supportOriginRoute as any,
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    }
  }, [router, params.previewLocale, supportOriginRoute]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleEditAndRetry = useCallback(() => {
    if (supportOriginRoute === "/job-support") {
      router.push({
        pathname: "/job-support",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    } else {
      router.push({
        pathname: supportOriginRoute as any,
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    }
  }, [router, params.previewLocale, supportOriginRoute]);

  const handleReturnToBooking = useCallback(() => {
    router.push({
      pathname: "/job-details",
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
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-support-failed-header">
        <Pressable
          accessibilityLabel={t("w07SupportFailed.backA11y")}
          accessibilityRole="button"
          onPress={handleBack}
          style={styles.backCircle}
          testID="w07-support-failed-back-button"
        >
          <Text style={styles.backArrowText}>←</Text>
        </Pressable>

        <View style={styles.wordmarkContainer}>
          <Text style={styles.wordmarkHaul}>{t("w07SupportFailed.brandHaul")}</Text>
          <Text style={styles.wordmarkIx}>{t("w07SupportFailed.brandIx")}</Text>
        </View>

        <View style={styles.moreButton}>
          <Text style={styles.moreText}>{t("w07SupportFailed.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-support-failed-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{t("w07SupportFailed.screenTitle")}</Text>
          <Text style={styles.heroSubtitle}>{t("w07SupportFailed.screenSubtitle")}</Text>
        </View>

        {/* Status / Workflow policy badge */}
        <View style={styles.badgeBanner}>
          <View style={styles.badgeIconWrapper}>
            <C32AlertTriangleIcon color={colors.warning} size={18} />
          </View>
          <Text style={styles.badgeText}>{t("w07SupportFailed.badgeFailed")}</Text>
        </View>

        {/* Card: Booking and visual reference */}
        <View style={styles.cardContainer}>
          <View style={styles.bookingCardInner}>
            <View style={styles.sofaThumbnail}>
              <C32BriefcaseIcon color={colors.secondaryText} size={28} />
            </View>
            <View style={styles.bookingMeta}>
              <Text style={styles.bookingRefText}>{t("w07SupportFailed.bookingRef")}</Text>
              <Text style={styles.bookingServiceText}>{t("w07SupportFailed.serviceCategory")}</Text>
              <Text style={styles.bookingItemsText}>
                {`${t("w07SupportFailed.itemSummary")} · ${t("common.inventoryScope")}`}
              </Text>
              <View style={styles.scheduleRow}>
                <C32CalendarIcon color={colors.secondaryText} size={14} />
                <Text style={styles.scheduleText}>{t("w07SupportFailed.serviceSchedule")}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card: Support Case Composition */}
        <View style={styles.cardContainer}>
          <Text style={styles.sectionHeading}>{t("w07SupportFailed.questionHeading")}</Text>

          {/* Topics Row 1 */}
          <View style={styles.topicRow}>
            <View style={[styles.topicChip, styles.topicChipSelected]}>
              <C32CalendarIcon color={colors.brand} size={20} />
              <Text style={[styles.topicChipText, styles.topicChipTextSelected]}>
                {t("w07SupportFailed.topicChanges")}
              </Text>
            </View>
            <View style={styles.topicChip}>
              <C32TruckIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportFailed.topicDriver")}</Text>
            </View>
            <View style={styles.topicChip}>
              <C32PackageIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportFailed.topicService")}</Text>
            </View>
          </View>

          {/* Topics Row 2 */}
          <View style={styles.topicRow}>
            <View style={styles.topicChip}>
              <C32CreditCardIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportFailed.topicPayment")}</Text>
            </View>
            <View style={styles.topicChip}>
              <C32SmartphoneIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportFailed.topicApp")}</Text>
            </View>
            <View style={styles.topicChip}>
              <C32HelpCircleIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportFailed.topicOther")}</Text>
            </View>
          </View>

          {/* Case status / Job linked notice */}
          <View style={styles.dividerSubtle} />
          <View style={styles.caseStatusBox}>
            <Text style={styles.caseStatusTitle}>{t("w07SupportFailed.caseStatusTitle")}</Text>
            <Text style={styles.caseStatusDesc}>{t("w07SupportFailed.caseStatusDesc")}</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionSection}>
          <Pressable
            accessibilityRole="button"
            onPress={handleEditAndRetry}
            style={styles.primaryButton}
            testID="w07-support-failed-retry-button"
          >
            <Text style={styles.primaryButtonText}>{t("w07SupportFailed.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleReturnToBooking}
            style={styles.secondaryButton}
            testID="w07-support-failed-return-button"
          >
            <Text style={styles.secondaryButtonText}>{t("w07SupportFailed.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleMyJobs}
            style={styles.tertiaryLink}
            testID="w07-support-failed-jobs-link"
          >
            <Text style={styles.tertiaryText}>{t("w07SupportFailed.tertiaryCta")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <Text style={styles.disclaimerText}>{t("w07SupportFailed.prototypeDisclaimer")}</Text>
      </ScrollView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.elevated,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrowText: {
    fontSize: 20,
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
  },
  wordmarkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordmarkHaul: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
  },
  wordmarkIx: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.brand,
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  moreText: {
    fontSize: 20,
    color: colors.secondaryText,
    fontFamily: fontFamily.bold,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  heroSection: {
    gap: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  badgeBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  badgeIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 186, 74, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.warning,
    letterSpacing: 0.5,
  },
  cardContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  bookingCardInner: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  sofaThumbnail: {
    width: 80,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#1c2420",
    alignItems: "center",
    justifyContent: "center",
  },
  bookingMeta: {
    flex: 1,
    gap: 3,
  },
  bookingRefText: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
  },
  bookingServiceText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  bookingItemsText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  scheduleText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
  },
  topicRow: {
    flexDirection: "row",
    gap: 8,
  },
  topicChip: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  topicChipSelected: {
    borderColor: colors.brand,
    backgroundColor: "#1e2722",
  },
  topicChipText: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: colors.secondaryText,
    textAlign: "center",
  },
  topicChipTextSelected: {
    color: colors.primaryText,
  },
  dividerSubtle: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 4,
  },
  caseStatusBox: {
    gap: 3,
  },
  caseStatusTitle: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
  },
  caseStatusDesc: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  actionSection: {
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.surface,
  },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  tertiaryLink: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tertiaryText: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
  },
  disclaimerText: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    marginTop: 4,
  },
});
