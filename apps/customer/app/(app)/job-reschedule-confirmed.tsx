/**
 * HAULIX Customer Mobile App — Phase 03.57
 * Screen: New Schedule Confirmed (W07 Canonical State: RESCHED_CONFIRMED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:6852 (EN: "W07-EN / RESCHED_CONFIRMED · New schedule confirmed")
 * - Frame ID: 893:7258 (ES: "W07-ES / RESCHED_CONFIRMED · Nuevo horario confirmado")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Illustrative successful schedule-change outcome (server owns actual changes).
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
  C32InfoIcon,
} from "../../src/components/dispatch/C32Icons";

export default function JobRescheduleConfirmedScreen() {
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

  const handleViewUpdatedBooking = useCallback(() => {
    router.push({
      pathname: "/job-details",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleGoToMyJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleAskAssistance = useCallback(() => {
    router.push({
      pathname: "/active-service-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const dateChips = [
    {
      day: t("w07ReschedConfirmed.dateTueDay"),
      num: t("w07ReschedConfirmed.dateTueNum"),
    },
    {
      day: t("w07ReschedConfirmed.dateWedDay"),
      num: t("w07ReschedConfirmed.dateWedNum"),
    },
    {
      day: t("w07ReschedConfirmed.dateThuDay"),
      num: t("w07ReschedConfirmed.dateThuNum"),
    },
    {
      day: t("w07ReschedConfirmed.dateFriDay"),
      num: t("w07ReschedConfirmed.dateFriNum"),
    },
  ];

  const timeSlots = [
    t("w07ReschedConfirmed.timeSlot1"),
    t("w07ReschedConfirmed.timeSlot2"),
    t("w07ReschedConfirmed.timeSlot3"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-resched-confirmed-header">
        <Pressable
          accessibilityLabel={t("w07ReschedConfirmed.backA11y")}
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBack}
          style={styles.backButton}
          testID="w07-resched-confirmed-back-btn"
        >
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <View style={styles.brandTitleContainer}>
          <Text style={styles.brandHaul}>{t("w07ReschedConfirmed.brandHaul")}</Text>
          <Text style={styles.brandIx}>{t("w07ReschedConfirmed.brandIx")}</Text>
        </View>
        <View style={styles.menuDotsContainer}>
          <Text style={styles.menuDotsText}>{t("w07ReschedConfirmed.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-resched-confirmed-scroll"
      >
        {/* Title and Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle} testID="w07-resched-confirmed-title">
            {t("w07ReschedConfirmed.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w07-resched-confirmed-subtitle">
            {t("w07ReschedConfirmed.screenSubtitle")}
          </Text>
        </View>

        {/* Confirmed Badge */}
        <View style={styles.sectionBadge} testID="w07-resched-confirmed-badge">
          <View style={styles.sectionBadgeIconWrap}>
            <C32CheckCircleIcon size={14} color={colors.brand} />
          </View>
          <Text style={styles.sectionBadgeText}>{t("w07ReschedConfirmed.badgeConfirmed")}</Text>
        </View>

        {/* Booking Card */}
        <View style={styles.bookingCard} testID="w07-resched-confirmed-booking-card">
          <View style={styles.bookingCardTop}>
            <View style={styles.bookingImagePlaceholder}>
              <C32BriefcaseIcon size={24} color={colors.brand} />
            </View>
            <View style={styles.bookingCardInfo}>
              <Text style={styles.bookingRefText}>{t("w07ReschedConfirmed.bookingRef")}</Text>
              <Text style={styles.bookingCategoryText}>
                {t("w07ReschedConfirmed.serviceCategory")}
              </Text>
              <Text style={styles.bookingItemsText}>
                {t("w07ReschedConfirmed.itemSummary")} · 4 pieces across 3 categories
              </Text>
            </View>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.bookingScheduleRow}>
            <C32CalendarIcon size={14} color={colors.secondaryText} />
            <Text style={styles.bookingScheduleText}>
              {t("w07ReschedConfirmed.serviceSchedule")}
            </Text>
          </View>
        </View>

        {/* Confirmed Date Section */}
        <View style={styles.sectionCard} testID="w07-resched-confirmed-date-section">
          <Text style={styles.sectionHeading}>{t("w07ReschedConfirmed.dateHeading")}</Text>
          <Text style={styles.sectionSubheading}>{t("w07ReschedConfirmed.dateSubheading")}</Text>

          <View style={styles.dateChipsRow}>
            {dateChips.map((chip, idx) => {
              const isSelected = idx === 1; // WED 04 confirmed
              return (
                <View
                  key={chip.day + chip.num}
                  style={[styles.dateChip, isSelected && styles.dateChipSelected]}
                  testID={`w07-resched-confirmed-date-chip-${idx}`}
                >
                  <Text style={[styles.dateChipDay, isSelected && styles.dateChipTextSelected]}>
                    {chip.day}
                  </Text>
                  <Text style={[styles.dateChipNum, isSelected && styles.dateChipTextSelected]}>
                    {chip.num}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Confirmed Time Windows Section */}
        <View style={styles.sectionCard} testID="w07-resched-confirmed-time-section">
          <Text style={styles.sectionHeading}>{t("w07ReschedConfirmed.timeHeading")}</Text>

          <View style={styles.timeSlotsRow}>
            {timeSlots.map((slot, idx) => {
              const isSelected = idx === 1; // 12-2 PM confirmed
              return (
                <View
                  key={slot}
                  style={[styles.timeChip, isSelected && styles.timeChipSelected]}
                  testID={`w07-resched-confirmed-time-chip-${idx}`}
                >
                  <C32ClockIcon
                    size={14}
                    color={isSelected ? colors.background : colors.secondaryText}
                  />
                  <Text style={[styles.timeChipText, isSelected && styles.timeChipTextSelected]}>
                    {slot}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Policy Notice Box */}
        <View style={styles.noticeBox} testID="w07-resched-confirmed-notice-box">
          <View style={styles.noticeIconWrap}>
            <C32InfoIcon size={16} color={colors.brand} />
          </View>
          <View style={styles.noticeTextWrap}>
            <Text style={styles.noticePolicyText}>{t("w07ReschedConfirmed.noticePolicy")}</Text>
            <Text style={styles.noticeSampleText}>{t("w07ReschedConfirmed.noticeSample")}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          accessibilityLabel={t("w07ReschedConfirmed.primaryCta")}
          accessibilityRole="button"
          onPress={handleViewUpdatedBooking}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          testID="w07-resched-confirmed-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w07ReschedConfirmed.primaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07ReschedConfirmed.secondaryCta")}
          accessibilityRole="button"
          onPress={handleGoToMyJobs}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          testID="w07-resched-confirmed-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w07ReschedConfirmed.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07ReschedConfirmed.altLink")}
          accessibilityRole="button"
          onPress={handleAskAssistance}
          style={({ pressed }) => [styles.linkButton, pressed && styles.linkButtonPressed]}
          testID="w07-resched-confirmed-alt-link"
        >
          <Text style={styles.linkButtonText}>{t("w07ReschedConfirmed.altLink")}</Text>
        </Pressable>

        {/* UI Prototype Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{t("w07ReschedConfirmed.prototypeDisclaimer")}</Text>
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
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
    color: colors.primaryText,
    fontSize: 22,
    fontFamily: fontFamily.semiBold,
    marginTop: -2,
  },
  brandTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandHaul: {
    color: colors.primaryText,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    letterSpacing: 2,
  },
  brandIx: {
    color: colors.brand,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    letterSpacing: 2,
  },
  menuDotsContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  menuDotsText: {
    color: colors.secondaryText,
    fontSize: 16,
    fontFamily: fontFamily.bold,
    letterSpacing: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  titleContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  screenTitle: {
    color: colors.primaryText,
    fontSize: 22,
    fontFamily: fontFamily.bold,
    lineHeight: 28,
  },
  screenSubtitle: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    marginTop: 4,
    lineHeight: 20,
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(34, 197, 94, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.28)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 16,
  },
  sectionBadgeIconWrap: {
    marginRight: 6,
  },
  sectionBadgeText: {
    color: colors.brand,
    fontSize: 11,
    fontFamily: fontFamily.bold,
    letterSpacing: 0.5,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bookingCardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookingImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  bookingCardInfo: {
    flex: 1,
  },
  bookingRefText: {
    color: colors.brand,
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.5,
  },
  bookingCategoryText: {
    color: colors.primaryText,
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    marginTop: 2,
  },
  bookingItemsText: {
    color: colors.secondaryText,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 12,
  },
  bookingScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookingScheduleText: {
    color: colors.secondaryText,
    fontSize: 13,
    fontFamily: fontFamily.medium,
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeading: {
    color: colors.primaryText,
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    marginBottom: 4,
  },
  sectionSubheading: {
    color: colors.secondaryText,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginBottom: 14,
  },
  dateChipsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  dateChip: {
    flex: 1,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  dateChipSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  dateChipDay: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.5,
  },
  dateChipNum: {
    color: colors.primaryText,
    fontSize: 18,
    fontFamily: fontFamily.bold,
    marginTop: 2,
  },
  dateChipTextSelected: {
    color: colors.background,
  },
  timeSlotsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 10,
  },
  timeChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
    gap: 6,
  },
  timeChipSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  timeChipText: {
    color: colors.primaryText,
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
  },
  timeChipTextSelected: {
    color: colors.background,
  },
  noticeBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(34, 197, 94, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.22)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  noticeIconWrap: {
    marginTop: 2,
    marginRight: 10,
  },
  noticeTextWrap: {
    flex: 1,
  },
  noticePolicyText: {
    color: colors.primaryText,
    fontSize: 13,
    fontFamily: fontFamily.medium,
    lineHeight: 18,
  },
  noticeSampleText: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: fontFamily.regular,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: fontFamily.bold,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    color: colors.primaryText,
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
  },
  linkButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  linkButtonPressed: {
    opacity: 0.7,
  },
  linkButtonText: {
    color: colors.brand,
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
  },
  disclaimerContainer: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  disclaimerText: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: fontFamily.regular,
    textAlign: "center",
  },
});
