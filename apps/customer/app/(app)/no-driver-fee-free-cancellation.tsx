/**
 * HAULIX Customer Mobile App — Phase 03.38
 * Screen C27-X: No-Driver Fee-Free Cancellation
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 773:776 (430 × 753 px)
 * - Spanish Variant: Node 773:993 (430 × 786 px)
 *
 * Upstream Entry:
 * - From C27-N (/no-eligible-driver) via "Cancel without fee" CTA.
 *
 * Core Behavioral Rule:
 * - When an ASAP request fails to match an online eligible driver, the user can
 *   cancel fee-free ($0.00 cancellation fee).
 * - No cancellation fee is ever applied before a driver is verified and assigned.
 * - Outgoing routes:
 *   - "Start another request" -> /choose-service-time (C27)
 *   - "Schedule for another date" -> /select-available-window (C27-S)
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getEffectiveConfirmedItems,
  getW04Draft,
  recordFeeFreeCancellation,
  subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function CheckShieldIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function NoDriverFeeFreeCancellationScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    recordFeeFreeCancellation();
    return subscribeToW04Draft((updated) => setDraft({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/no-eligible-driver",
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

  const handleStartAnotherRequest = useCallback(() => {
    router.push({
      pathname: "/choose-service-time",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleScheduleAnotherDate = useCallback(() => {
    router.push({
      pathname: "/select-available-window",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const pickupArea = currentLocale === "es" ? draft.pickupAreaEs : draft.pickupAreaEn;
  const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c27x-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c27xNoDriverCancellation.backA11y")}
          testID="c27x-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c27x-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandHaul}>
              HAUL<Text style={styles.brandIx}>IX</Text>
            </Text>
            <Text style={styles.tagline}>
              {currentLocale === "es" ? "LO RECOGEMOS TODO." : "WE HAUL IT ALL."}
            </Text>
          </View>

          {/* 4-Step Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel} testID="c27x-progress-label">
              {t("c27xNoDriverCancellation.progressLabel")}
            </Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "25%" }]} />
            </View>
          </View>

          {/* Screen Title & Subtitle */}
          <View style={styles.headerBlock}>
            <Text style={styles.screenTitle} testID="c27x-title">
              {t("c27xNoDriverCancellation.screenTitle")}
            </Text>
            <Text style={styles.screenSubtitle} testID="c27x-subtitle">
              {t("c27xNoDriverCancellation.screenSubtitle")}
            </Text>
          </View>

          {/* Location Chip */}
          <View style={styles.chipContainer}>
            <Text style={styles.chipText}>{t("c27xNoDriverCancellation.serviceArea")}</Text>
          </View>

          {/* Fee-Free Status Card */}
          <View style={styles.statusCard} testID="c27x-status-card">
            <View style={styles.statusHeader}>
              <CheckShieldIcon />
              <View style={styles.cancelledBadge} testID="c27x-cancelled-badge">
                <Text style={styles.cancelledBadgeText}>
                  {t("c27xNoDriverCancellation.cancelledBadge")}
                </Text>
              </View>
            </View>
            <Text style={styles.summaryTitle}>{t("c27xNoDriverCancellation.summaryTitle")}</Text>
            <Text style={styles.summaryExplanation}>
              {t("c27xNoDriverCancellation.summaryExplanation")}
            </Text>
          </View>

          {/* Request Resolution Card */}
          <View style={styles.detailsCard} testID="c27x-details-card">
            <Text style={styles.sectionHeading}>
              {t("c27xNoDriverCancellation.detailsHeading")}
            </Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t("c27xNoDriverCancellation.requestTypeLabel")}
              </Text>
              <Text style={styles.detailValue}>
                {t("c27xNoDriverCancellation.requestTypeValue")}
              </Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t("c27xNoDriverCancellation.cancellationFeeLabel")}
              </Text>
              <Text
                style={[styles.detailValue, { color: colors.brand, fontFamily: fontFamily.bold }]}
              >
                {t("c27xNoDriverCancellation.cancellationFeeValue")}
              </Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t("c27xNoDriverCancellation.paymentHoldLabel")}
              </Text>
              <Text style={styles.detailValue}>
                {t("c27xNoDriverCancellation.paymentHoldValue")}
              </Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>LOCATION</Text>
              <Text style={styles.detailValue}>{pickupArea}</Text>
            </View>

            <View style={styles.detailDivider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>CONFIRMED ITEMS</Text>
              <Text style={styles.detailValue}>{confirmedItems}</Text>
            </View>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
              onPress={handleStartAnotherRequest}
              accessibilityRole="button"
              accessibilityLabel={t("c27xNoDriverCancellation.primaryCta")}
              testID="c27x-primary-cta"
            >
              <Text style={styles.primaryButtonText}>
                {t("c27xNoDriverCancellation.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
              onPress={handleScheduleAnotherDate}
              accessibilityRole="button"
              accessibilityLabel={t("c27xNoDriverCancellation.secondaryCta")}
              testID="c27x-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c27xNoDriverCancellation.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Prototype Disclosure Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerNote}>{t("c27xNoDriverCancellation.uiNote")}</Text>
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
    paddingTop: 12,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  brandHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  brandIx: {
    color: colors.brand,
  },
  tagline: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 1.2,
  },
  progressContainer: {
    marginBottom: 18,
  },
  progressLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.brand,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: colors.elevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.brand,
    borderRadius: 2,
  },
  headerBlock: {
    marginBottom: 16,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.primaryText,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondaryText,
  },
  chipContainer: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 18,
  },
  chipText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderColor: colors.brand,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cancelledBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  cancelledBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  summaryTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primaryText,
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  summaryExplanation: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.secondaryText,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  sectionHeading: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  detailValue: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
    maxWidth: "60%",
    textAlign: "right",
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 8,
  },
  actionContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.background,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primaryText,
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  footerNote: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
    textAlign: "center",
  },
});
