/**
 * HAULIX Customer Mobile App — Phase 03.41
 * Screen C31-F: Booking Not Yet Confirmed (Unconfirmed Request Outcome Demonstration)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:1221 (430 × 1007 px)
 * - Spanish Variant: Node 766:1607 (430 × 1040 px)
 *
 * Upstream Entry:
 * - From C31-P (/checking-booking-status) via unconfirmed outcome transition or QA simulation.
 *
 * CRITICAL SEMANTIC INVARIANTS:
 * - "Booking not yet confirmed" does NOT mean dispatch failed, payment was declined,
 *   or the customer cancelled.
 * - Active pre-authorization hold ($356.00 USD) remains uncaptured; zero charges incurred.
 * - Customer confirmed inventory preserved: 4 pieces across 3 categories.
 * - Direct recovery path to alternative scheduling window (C27-S) or queued waiting.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getEffectiveConfirmedItems,
  getW04Draft,
  recordBookingNotConfirmed,
  SAMPLE_DATES,
  SAMPLE_WINDOWS,
  subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function PendingClockHeroIcon() {
  return (
    <Svg width={44} height={44} viewBox="0 0 48 48" fill="none">
      <Circle
        cx={24}
        cy={24}
        r={22}
        fill="rgba(245, 158, 11, 0.12)"
        stroke={colors.warning}
        strokeWidth={2}
      />
      <Path d="M24 14v11l7 4" stroke={colors.warning} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function HourglassSmallIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 00-.586-1.414L12 12l-4.414 4.414A2 2 0 007 17.828V22M7 2v4.172a2 2 0 00.586 1.414L12 12l4.414-4.414A2 2 0 0017 6.172V2"
        stroke={colors.warning}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function BookingNotConfirmedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);
  const [keepWaitingFeedbackVisible, setKeepWaitingFeedbackVisible] = useState(false);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    recordBookingNotConfirmed();
    return subscribeToW04Draft((updated) => setDraft({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/checking-booking-status",
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

  const handleChooseAnotherWindow = useCallback(() => {
    router.push({
      pathname: "/select-available-window",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleKeepWaiting = useCallback(() => {
    setKeepWaitingFeedbackVisible(true);
    setTimeout(() => {
      router.push("/(app)");
    }, 1500);
  }, [router]);

  const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

  const selectedDate = SAMPLE_DATES.find((d) => d.id === draft.selectedDateId);
  const selectedWindow = SAMPLE_WINDOWS.find((w) => w.id === draft.selectedWindowId);
  const formattedWindow =
    selectedDate && selectedWindow
      ? currentLocale === "es"
        ? `${selectedDate.fullDateEs} · ${selectedWindow.windowEs}`
        : `${selectedDate.fullDateEn} · ${selectedWindow.windowEn}`
      : t("c31fBookingNotConfirmed.defaultWindow");

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c31f-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c31fBookingNotConfirmed.backA11y")}
          testID="c31f-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c31f-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>HAULIX</Text>
            <Text style={styles.progressText}>{t("c31fBookingNotConfirmed.progressLabel")}</Text>
          </View>

          {/* Hero Icon */}
          <View style={styles.heroIconContainer} testID="c31f-hero-icon">
            <PendingClockHeroIcon />
          </View>

          {/* Screen Title & Subtitle */}
          <Text style={styles.screenTitle}>{t("c31fBookingNotConfirmed.screenTitle")}</Text>
          <Text style={styles.screenSubtitle}>{t("c31fBookingNotConfirmed.screenSubtitle")}</Text>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c31f-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c31fBookingNotConfirmed.serviceArea")}</Text>
          </View>

          {/* Status Badge Capsule */}
          <View style={styles.statusBadgeCapsule} testID="c31f-status-badge">
            <HourglassSmallIcon />
            <Text style={styles.statusBadgeText}>{t("c31fBookingNotConfirmed.statusBadge")}</Text>
          </View>

          {/* Status Details Card */}
          <View style={styles.cardContainer} testID="c31f-status-card">
            <Text style={styles.cardHeaderTitle}>{t("c31fBookingNotConfirmed.cardHeading")}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c31fBookingNotConfirmed.statusLabel")}</Text>
              <Text style={styles.detailAmberValue} testID="c31f-status-value">
                {t("c31fBookingNotConfirmed.statusValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c31fBookingNotConfirmed.holdStatusLabel")}</Text>
              <Text style={styles.detailTextValue} testID="c31f-hold-status">
                {t("c31fBookingNotConfirmed.holdStatusValue")}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c31fBookingNotConfirmed.windowLabel")}</Text>
              <Text
                style={[styles.detailTextValue, { maxWidth: "60%", textAlign: "right" }]}
                testID="c31f-requested-window"
              >
                {formattedWindow}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {currentLocale === "es" ? "ARTÍCULOS CONFIRMADOS" : "CONFIRMED ITEMS"}
              </Text>
              <Text
                style={[styles.detailTextValue, { maxWidth: "60%", textAlign: "right" }]}
                testID="c31f-confirmed-items"
              >
                {confirmedItems}
              </Text>
            </View>
          </View>

          {/* Guidance / Options Card */}
          <View style={styles.cardContainer} testID="c31f-options-card">
            <Text style={styles.cardHeaderTitle}>
              {t("c31fBookingNotConfirmed.guidanceHeading")}
            </Text>

            <View style={styles.optionRow}>
              <View style={styles.optionDot} />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{t("c31fBookingNotConfirmed.option1Title")}</Text>
                <Text style={styles.optionDesc}>{t("c31fBookingNotConfirmed.option1Desc")}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.optionRow}>
              <View style={[styles.optionDot, { backgroundColor: colors.brand }]} />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{t("c31fBookingNotConfirmed.option2Title")}</Text>
                <Text style={styles.optionDesc}>{t("c31fBookingNotConfirmed.option2Desc")}</Text>
              </View>
            </View>
          </View>

          {/* Keep Waiting Feedback Banner */}
          {keepWaitingFeedbackVisible && (
            <View style={styles.feedbackBox} testID="c31f-waiting-feedback">
              <Text style={styles.feedbackText}>
                {t("c31fBookingNotConfirmed.keepWaitingNotice")}
              </Text>
            </View>
          )}

          {/* Primary Action Button (Choose Another Window) */}
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleChooseAnotherWindow}
            accessibilityRole="button"
            accessibilityLabel={t("c31fBookingNotConfirmed.primaryCta")}
            testID="c31f-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("c31fBookingNotConfirmed.primaryCta")}</Text>
          </Pressable>

          {/* Secondary Action Button (Keep Waiting & Return Home) */}
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleKeepWaiting}
            accessibilityRole="button"
            accessibilityLabel={t("c31fBookingNotConfirmed.secondaryCta")}
            testID="c31f-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>
              {t("c31fBookingNotConfirmed.secondaryCta")}
            </Text>
          </Pressable>

          {/* Prototype Disclaimer */}
          <View style={styles.footerNoteContainer}>
            <Text style={styles.footerNoteText}>{t("c31fBookingNotConfirmed.uiNote")}</Text>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 16,
  },
  brandText: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 2,
  },
  progressText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  heroIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 14,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  screenSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  locationChip: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161D1A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#222D28",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
    gap: 6,
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.warning,
  },
  locationText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  statusBadgeCapsule: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.35)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
    gap: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.warning,
    letterSpacing: 0.8,
  },
  cardContainer: {
    backgroundColor: "#131817",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E2724",
    padding: 18,
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.4,
  },
  detailAmberValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.warning,
  },
  detailTextValue: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.primaryText,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E2724",
    marginVertical: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6,
    gap: 12,
  },
  optionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.warning,
    marginTop: 6,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 3,
  },
  optionDesc: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  feedbackBox: {
    backgroundColor: "#171B19",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.3)",
    padding: 14,
    marginBottom: 16,
  },
  feedbackText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.brand,
    textAlign: "center",
    lineHeight: 18,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.background,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#26332E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  secondaryButtonPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  footerNoteContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  footerNoteText: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    opacity: 0.7,
    textAlign: "center",
  },
});
