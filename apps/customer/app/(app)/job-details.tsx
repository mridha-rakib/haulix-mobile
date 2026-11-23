/**
 * HAULIX Customer Mobile App — Phase 03.55
 * Screen: Booking Details (W07 Canonical State: DETAILS)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:6294 (EN: "W07-EN / DETAILS · Booking details")
 * - Frame ID: 893:6700 (ES: "W07-ES / DETAILS · Detalles de la reserva")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Displays 3-step booking timeline: Request created, Driver accepted, Service.
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
  C32ClockIcon,
  C32CreditCardIcon,
  C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";

export default function JobDetailsScreen() {
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
        pathname: "/my-jobs",
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

  const handleRequestReschedule = useCallback(() => {
    router.push({
      pathname: "/job-reschedule",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReviewCancellation = useCallback(() => {
    router.push({
      pathname: "/job-cancel-fee",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleGetSupport = useCallback(() => {
    router.push({
      pathname: "/active-service-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-details-header">
        <Pressable
          accessibilityLabel={t("w07Details.backA11y")}
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBack}
          style={styles.backButton}
          testID="w07-details-back-btn"
        >
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <View style={styles.brandTitleContainer}>
          <Text style={styles.brandHaul}>{t("w07Details.brandHaul")}</Text>
          <Text style={styles.brandIx}>{t("w07Details.brandIx")}</Text>
        </View>
        <View style={styles.menuDotsContainer}>
          <Text style={styles.menuDotsText}>{t("w07Details.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-details-scroll"
      >
        {/* Title and Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle} testID="w07-details-title">
            {t("w07Details.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w07-details-subtitle">
            {t("w07Details.screenSubtitle")}
          </Text>
        </View>

        {/* Status Badge */}
        <View style={styles.sectionBadge} testID="w07-details-badge">
          <View style={styles.sectionBadgeIconWrap}>
            <C32CheckCircleIcon size={14} color={colors.brand} />
          </View>
          <Text style={styles.sectionBadgeText}>{t("w07Details.badgeAssigned")}</Text>
        </View>

        {/* Booking Card */}
        <View style={styles.bookingCard} testID="w07-details-booking-card">
          <View style={styles.bookingCardTop}>
            <View style={styles.bookingImagePlaceholder}>
              <C32BriefcaseIcon size={24} color={colors.brand} />
            </View>
            <View style={styles.bookingCardInfo}>
              <Text style={styles.bookingRefText}>{t("w07Details.bookingRef")}</Text>
              <Text style={styles.bookingCategoryText}>{t("w07Details.serviceCategory")}</Text>
              <Text style={styles.bookingItemsText}>
                {t("w07Details.itemSummary")} · 4 pieces across 3 categories
              </Text>
            </View>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.bookingScheduleRow}>
            <C32CalendarIcon size={14} color={colors.secondaryText} />
            <Text style={styles.bookingScheduleText}>{t("w07Details.serviceSchedule")}</Text>
          </View>
        </View>

        {/* Booking Timeline Card */}
        <View style={styles.timelineCard} testID="w07-details-timeline-card">
          <Text style={styles.timelineHeading}>{t("w07Details.timelineHeading")}</Text>

          {/* Step 1 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineIconCol}>
              <View style={[styles.timelineNode, styles.timelineNodeDone]}>
                <C32CheckCircleIcon size={12} color={colors.background} />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineStepTitle}>{t("w07Details.timelineStep1Title")}</Text>
              <Text style={styles.timelineStepDesc}>{t("w07Details.timelineStep1Desc")}</Text>
            </View>
          </View>

          {/* Step 2 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineIconCol}>
              <View style={[styles.timelineNode, styles.timelineNodeDone]}>
                <C32TruckIcon size={12} color={colors.background} />
              </View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineStepTitle}>{t("w07Details.timelineStep2Title")}</Text>
              <Text style={styles.timelineStepDesc}>{t("w07Details.timelineStep2Desc")}</Text>
            </View>
          </View>

          {/* Step 3 */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineIconCol}>
              <View style={[styles.timelineNode, styles.timelineNodeActive]}>
                <C32ClockIcon size={12} color={colors.brand} />
              </View>
            </View>
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineStepTitle}>{t("w07Details.timelineStep3Title")}</Text>
              <Text style={styles.timelineStepDesc}>{t("w07Details.timelineStep3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Demo Quote Card */}
        <View style={styles.quoteCard} testID="w07-details-quote-card">
          <View style={styles.quoteIconWrap}>
            <C32CreditCardIcon size={18} color={colors.brand} />
          </View>
          <View style={styles.quoteTextWrap}>
            <Text style={styles.quoteHeading}>{t("w07Details.quoteHeading")}</Text>
            <Text style={styles.quoteValue}>$356.00 USD · {t("w07Details.quoteValue")}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          accessibilityLabel={t("w07Details.primaryCta")}
          accessibilityRole="button"
          onPress={handleRequestReschedule}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          testID="w07-details-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w07Details.primaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07Details.secondaryCta")}
          accessibilityRole="button"
          onPress={handleReviewCancellation}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          testID="w07-details-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w07Details.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07Details.altLink")}
          accessibilityRole="button"
          onPress={handleGetSupport}
          style={styles.altLinkButton}
          testID="w07-details-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w07Details.altLink")}</Text>
        </Pressable>

        {/* Prototype Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w07Details.prototypeDisclaimer")}</Text>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.elevated,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  backChevron: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginTop: -2,
  },
  brandTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandHaul: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  brandIx: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  menuDotsContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  menuDotsText: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  titleContainer: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignSelf: "flex-start",
    marginBottom: 14,
    gap: 6,
  },
  sectionBadgeIconWrap: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.6,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 14,
    marginBottom: 16,
  },
  bookingCardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bookingImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  bookingCardInfo: {
    flex: 1,
    minWidth: 0,
  },
  bookingRefText: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    marginBottom: 2,
  },
  bookingCategoryText: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 2,
  },
  bookingItemsText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 10,
  },
  bookingScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bookingScheduleText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.primaryText,
  },
  timelineCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 16,
  },
  timelineHeading: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 14,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timelineIconCol: {
    alignItems: "center",
    width: 24,
    marginRight: 10,
  },
  timelineNode: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineNodeDone: {
    backgroundColor: colors.brand,
  },
  timelineNodeActive: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    borderWidth: 1.5,
    borderColor: colors.brand,
  },
  timelineLine: {
    width: 2,
    height: 28,
    backgroundColor: colors.elevated,
    marginVertical: 2,
  },
  timelineTextCol: {
    flex: 1,
    paddingBottom: 10,
  },
  timelineStepTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 2,
  },
  timelineStepDesc: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  quoteCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.3)",
  },
  quoteIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  quoteTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  quoteHeading: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  quoteValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  primaryButton: {
    height: 50,
    backgroundColor: colors.brand,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.background,
  },
  secondaryButton: {
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  altLinkButton: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 16,
  },
  altLinkText: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    textDecorationLine: "underline",
  },
  footerWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  footerDisclaimer: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    opacity: 0.7,
  },
});
