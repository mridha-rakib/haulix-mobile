/**
 * HAULIX Customer Mobile App — Phase 03.58
 * Screen: Support Request Received (W07 Canonical State: SUPPORT_SUBMITTED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:7539 (EN: "W07-EN / SUPPORT_SUBMITTED · Support request received")
 * - Frame ID: 893:7945 (ES: "W07-ES / SUPPORT_SUBMITTED · Solicitud de soporte recibida")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Deterministic submission demonstration without creating real backend tickets.
 * - Sourced next steps to track support case or review request failure preview.
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32BriefcaseIcon,
  C32CalendarIcon,
  C32CheckCircleIcon,
  C32CreditCardIcon,
  C32HelpCircleIcon,
  C32PackageIcon,
  C32SmartphoneIcon,
  C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";

export default function JobSupportSubmittedScreen() {
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
        pathname: "/job-support",
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

  const handleTrackCase = useCallback(() => {
    router.push({
      pathname: "/job-support-pending",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReturnToBooking = useCallback(() => {
    router.push({
      pathname: "/job-details",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePreviewFailure = useCallback(() => {
    router.push({
      pathname: "/job-support-failed",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-support-submitted-header">
        <Pressable
          accessibilityLabel={t("w07SupportSubmitted.backA11y")}
          accessibilityRole="button"
          onPress={handleBack}
          style={styles.backCircle}
          testID="w07-support-submitted-back-button"
        >
          <Text style={styles.backArrowText}>←</Text>
        </Pressable>

        <View style={styles.wordmarkContainer}>
          <Text style={styles.wordmarkHaul}>{t("w07SupportSubmitted.brandHaul")}</Text>
          <Text style={styles.wordmarkIx}>{t("w07SupportSubmitted.brandIx")}</Text>
        </View>

        <View style={styles.moreButton}>
          <Text style={styles.moreText}>{t("w07SupportSubmitted.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-support-submitted-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{t("w07SupportSubmitted.screenTitle")}</Text>
          <Text style={styles.heroSubtitle}>{t("w07SupportSubmitted.screenSubtitle")}</Text>
        </View>

        {/* Status / Workflow policy badge */}
        <View style={styles.badgeBanner}>
          <View style={styles.badgeIconWrapper}>
            <C32CheckCircleIcon color={colors.brand} size={18} />
          </View>
          <Text style={styles.badgeText}>{t("w07SupportSubmitted.badgeSubmitted")}</Text>
        </View>

        {/* Card: Booking and visual reference */}
        <View style={styles.cardContainer}>
          <View style={styles.bookingCardInner}>
            <View style={styles.sofaThumbnail}>
              <C32BriefcaseIcon color={colors.secondaryText} size={28} />
            </View>
            <View style={styles.bookingMeta}>
              <Text style={styles.bookingRefText}>{t("w07SupportSubmitted.bookingRef")}</Text>
              <Text style={styles.bookingServiceText}>
                {t("w07SupportSubmitted.serviceCategory")}
              </Text>
              <Text style={styles.bookingItemsText}>{t("w07SupportSubmitted.itemSummary")}</Text>
              <View style={styles.scheduleRow}>
                <C32CalendarIcon color={colors.secondaryText} size={14} />
                <Text style={styles.scheduleText}>{t("w07SupportSubmitted.serviceSchedule")}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card: Support Case Composition */}
        <View style={styles.cardContainer}>
          <Text style={styles.sectionHeading}>{t("w07SupportSubmitted.questionHeading")}</Text>

          {/* Topics Row 1 */}
          <View style={styles.topicRow}>
            <View style={[styles.topicChip, styles.topicChipSelected]}>
              <C32CalendarIcon color={colors.brand} size={20} />
              <Text style={[styles.topicChipText, styles.topicChipTextSelected]}>
                {t("w07SupportSubmitted.topicChanges")}
              </Text>
            </View>
            <View style={styles.topicChip}>
              <C32TruckIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportSubmitted.topicDriver")}</Text>
            </View>
            <View style={styles.topicChip}>
              <C32PackageIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportSubmitted.topicService")}</Text>
            </View>
          </View>

          {/* Topics Row 2 */}
          <View style={styles.topicRow}>
            <View style={styles.topicChip}>
              <C32CreditCardIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportSubmitted.topicPayment")}</Text>
            </View>
            <View style={styles.topicChip}>
              <C32SmartphoneIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportSubmitted.topicApp")}</Text>
            </View>
            <View style={styles.topicChip}>
              <C32HelpCircleIcon color={colors.secondaryText} size={20} />
              <Text style={styles.topicChipText}>{t("w07SupportSubmitted.topicOther")}</Text>
            </View>
          </View>

          {/* Case status / Job linked notice */}
          <View style={styles.dividerSubtle} />
          <View style={styles.caseStatusBox}>
            <Text style={styles.caseStatusTitle}>{t("w07SupportSubmitted.caseStatusTitle")}</Text>
            <Text style={styles.caseStatusDesc}>{t("w07SupportSubmitted.caseStatusDesc")}</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionSection}>
          <Pressable
            accessibilityRole="button"
            onPress={handleTrackCase}
            style={styles.primaryButton}
            testID="w07-support-submitted-track-button"
          >
            <Text style={styles.primaryButtonText}>{t("w07SupportSubmitted.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleReturnToBooking}
            style={styles.secondaryButton}
            testID="w07-support-submitted-return-button"
          >
            <Text style={styles.secondaryButtonText}>{t("w07SupportSubmitted.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handlePreviewFailure}
            style={styles.tertiaryLink}
            testID="w07-support-submitted-failed-link"
          >
            <Text style={styles.tertiaryText}>{t("w07SupportSubmitted.tertiaryCta")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <Text style={styles.disclaimerText}>{t("w07SupportSubmitted.prototypeDisclaimer")}</Text>
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
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
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
