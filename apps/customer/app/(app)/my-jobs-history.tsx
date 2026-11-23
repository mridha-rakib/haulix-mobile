/**
 * HAULIX Customer Mobile App — Phase 03.55
 * Screen: My Jobs — History (W07 Canonical State: HOME_HISTORY)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:6033 (EN: "W07-EN / HOME_HISTORY · Booking history")
 * - Frame ID: 893:6439 (ES: "W07-ES / HOME_HISTORY · Historial de reservas")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - CustomerBottomNav with activeTab="jobs".
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
  C32CreditCardIcon,
  C32LocationPinIcon,
  C32ShieldCheckIcon,
} from "../../src/components/dispatch/C32Icons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";

export default function MyJobsHistoryScreen() {
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

  const handleReturnToJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleViewPastDetails = useCallback(() => {
    router.push({
      pathname: "/job-details-history",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleViewCancelledDetails = useCallback(() => {
    router.push({
      pathname: "/job-details-cancelled",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-history-header">
        <Pressable
          accessibilityLabel={t("w07HomeHistory.backA11y")}
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBack}
          style={styles.backButton}
          testID="w07-history-back-btn"
        >
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <View style={styles.brandTitleContainer}>
          <Text style={styles.brandHaul}>{t("w07HomeHistory.brandHaul")}</Text>
          <Text style={styles.brandIx}>{t("w07HomeHistory.brandIx")}</Text>
        </View>
        <View style={styles.menuDotsContainer}>
          <Text style={styles.menuDotsText}>{t("w07HomeHistory.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-history-scroll"
      >
        {/* Title and Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle} testID="w07-history-title">
            {t("w07HomeHistory.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w07-history-subtitle">
            {t("w07HomeHistory.screenSubtitle")}
          </Text>
        </View>

        {/* Section Badge */}
        <View style={styles.sectionBadge} testID="w07-history-badge">
          <View style={styles.sectionBadgeIconWrap}>
            <C32CalendarIcon size={14} color={colors.brand} />
          </View>
          <Text style={styles.sectionBadgeText}>{t("w07HomeHistory.badgeHistory")}</Text>
        </View>

        {/* Filter Tabs / Pills */}
        <View style={styles.filterPillsRow} testID="w07-history-filter-pills">
          <Pressable onPress={handleReturnToJobs} style={styles.filterPill} accessibilityRole="tab">
            <Text style={styles.filterPillText}>{t("w07HomeHistory.tabActive")}</Text>
          </Pressable>
          <View style={styles.filterPill}>
            <Text style={styles.filterPillText}>{t("w07HomeHistory.tabScheduled")}</Text>
          </View>
          <View style={[styles.filterPill, styles.filterPillActive]}>
            <Text style={styles.filterPillActiveText}>{t("w07HomeHistory.tabHistory")}</Text>
          </View>
        </View>

        {/* Completed Job History Card */}
        <View style={styles.bookingCard} testID="w07-history-booking-card">
          <View style={styles.bookingCardTop}>
            <View style={styles.bookingImagePlaceholder}>
              <C32BriefcaseIcon size={24} color={colors.brand} />
            </View>
            <View style={styles.bookingCardInfo}>
              <Text style={styles.bookingRefText}>{t("w07HomeHistory.bookingRef")}</Text>
              <Text style={styles.bookingCategoryText}>{t("w07HomeHistory.serviceCategory")}</Text>
              <Text style={styles.bookingItemsText}>
                {t("w07HomeHistory.itemSummary")} · 4 pieces across 3 categories
              </Text>
            </View>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.bookingScheduleRow}>
            <C32CalendarIcon size={14} color={colors.secondaryText} />
            <Text style={styles.bookingScheduleText}>{t("w07HomeHistory.serviceSchedule")}</Text>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard} testID="w07-history-status-card">
          <Text style={styles.statusCardHeading}>{t("w07HomeHistory.cardHeading")}</Text>

          <View style={styles.statusRow}>
            <View style={styles.statusIconWrap}>
              <C32ShieldCheckIcon size={16} color={colors.brand} />
            </View>
            <View style={styles.statusTextWrap}>
              <Text style={styles.statusLabel}>{t("w07HomeHistory.jobStatusLabel")}</Text>
              <Text style={styles.statusValue}>{t("w07HomeHistory.jobStatusValue")}</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusIconWrap}>
              <C32CreditCardIcon size={16} color={colors.brand} />
            </View>
            <View style={styles.statusTextWrap}>
              <Text style={styles.statusLabel}>{t("w07HomeHistory.quoteLabel")}</Text>
              <Text style={styles.statusValue}>$356.00 USD · DEMO</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <View style={styles.statusIconWrap}>
              <C32LocationPinIcon size={16} color={colors.brand} />
            </View>
            <View style={styles.statusTextWrap}>
              <Text style={styles.statusLabel}>{t("w07HomeHistory.pickupLabel")}</Text>
              <Text style={styles.statusValue}>{t("w07HomeHistory.pickupValue")}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />
          <Text style={styles.disclaimerOwnerText}>{t("w07HomeHistory.disclaimerOwner")}</Text>
        </View>

        {/* Action Buttons */}
        <Pressable
          accessibilityLabel={t("w07HomeHistory.primaryCta")}
          accessibilityRole="button"
          onPress={handleViewPastDetails}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          testID="w07-history-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w07HomeHistory.primaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07HomeHistory.secondaryCta")}
          accessibilityRole="button"
          onPress={handleViewCancelledDetails}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          testID="w07-history-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w07HomeHistory.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07HomeHistory.altLink")}
          accessibilityRole="button"
          onPress={handleReturnToJobs}
          style={styles.altLinkButton}
          testID="w07-history-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w07HomeHistory.altLink")}</Text>
        </Pressable>

        {/* Prototype Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w07HomeHistory.prototypeDisclaimer")}</Text>
        </View>
      </ScrollView>

      {/* Customer Bottom Navigation */}
      <CustomerBottomNav activeTab="jobs" />
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
  filterPillsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  filterPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterPillText: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.secondaryText,
  },
  filterPillActiveText: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.background,
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
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 20,
  },
  statusCardHeading: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 14,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  statusIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  statusLabel: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  statusValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  disclaimerOwnerText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    opacity: 0.8,
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
