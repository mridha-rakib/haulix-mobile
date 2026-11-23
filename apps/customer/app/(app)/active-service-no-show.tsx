/**
 * HAULIX Customer Mobile App — Phase 03.53
 * Screen: Active Service — No Show (W06 Canonical State: NO_SHOW)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:7563 (EN: "W06-EN / NO_SHOW · Driver no-show review")
 * - Frame ID: 883:7927 (ES: "W06-ES / NO_SHOW · Revisión por ausencia")
 * - Parent Section: 881:5131 (EN) / 881:5132 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Distinct from W05 /driver-no-show (this is the in-service active W06 state).
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32BoxIcon,
  C32CalendarIcon,
  C32CheckCircleIcon,
  C32ClockIcon,
  C32LocationPinIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function ActiveServiceNoShowScreen() {
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
        pathname: "/active-service-working",
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

  const handleRequestReplacement = useCallback(() => {
    router.push({
      pathname: "/driver-reassigned",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReviewCancellation = useCallback(() => {
    router.push({
      pathname: "/no-driver-fee-free-cancellation",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleSupportLink = useCallback(() => {
    router.push({
      pathname: "/dispatch-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06NoShow.stepAssigned"),
    t("w06NoShow.stepEnroute"),
    t("w06NoShow.stepArrived"),
    t("w06NoShow.stepService"),
    t("w06NoShow.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06NoShow.backA11y")}
        testID="w06-no-show-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-no-show-scroll"
      >
        {/* 5-Step Service Stages: Steps 0 & 1 active, Step 2 arrival alert */}
        <View style={styles.progressTrackContainer} testID="w06-progress-track">
          <View style={styles.progressLinkingTrack} />
          <View style={[styles.progressCompletedTrack, { width: "50%" }]} />
          <View style={styles.progressNodesRow}>
            {stages.map((stepName, idx) => {
              const isCompleted = idx < 2;
              const isActive = idx === 2;
              return (
                <View key={stepName} style={styles.progressNodeItem}>
                  <View
                    style={[
                      styles.progressDot,
                      isCompleted && styles.progressDotCompleted,
                      isActive && styles.progressDotAlert,
                    ]}
                  />
                  <Text
                    style={[
                      styles.progressNodeLabel,
                      isActive && styles.progressNodeLabelAlert,
                      isCompleted && styles.progressNodeLabelCompleted,
                    ]}
                    numberOfLines={1}
                  >
                    {stepName}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Location Chip */}
        <View style={styles.locationChip} testID="w06-no-show-location-chip">
          <C32LocationPinIcon size={14} color={colors.brand} />
          <Text style={styles.locationChipText} numberOfLines={1}>
            {t("w06NoShow.serviceArea")}
          </Text>
        </View>

        {/* Screen Headline & Subtitle */}
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle} testID="w06-no-show-title">
            {t("w06NoShow.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w06-no-show-subtitle">
            {t("w06NoShow.screenSubtitle")}
          </Text>
        </View>

        {/* Job Card with No-Show Warning Badge */}
        <View style={styles.jobCard} testID="w06-no-show-job-card">
          <View style={styles.jobCardHeader}>
            <View style={styles.warningBadge}>
              <Text style={styles.warningBadgeText}>{t("w06NoShow.statusBadge")}</Text>
            </View>
            <Text style={styles.bookingRefText}>
              {t("w06NoShow.bookingRefPrefix")} {t("w06NoShow.bookingRefValue")}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32BoxIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06NoShow.serviceLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06NoShow.serviceValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32TruckIcon size={18} color="#38BDF8" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06NoShow.driverLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06NoShow.driverValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32CalendarIcon size={18} color="#F59E0B" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06NoShow.windowLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06NoShow.windowValue")}</Text>
            </View>
          </View>
        </View>

        {/* Verified Exception Card */}
        <View style={styles.detailsCard} testID="w06-no-show-details-card">
          <Text style={styles.detailsCategory}>{t("w06NoShow.cardCategoryLabel")}</Text>
          <Text style={styles.detailsHeading}>{t("w06NoShow.cardHeading")}</Text>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ClockIcon size={18} color="#F59E0B" />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06NoShow.insight1Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06NoShow.insight1Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ShieldCheckIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06NoShow.insight2Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06NoShow.insight2Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32CheckCircleIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06NoShow.insight3Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06NoShow.insight3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={handleRequestReplacement}
          accessibilityRole="button"
          accessibilityLabel={t("w06NoShow.primaryCta")}
          testID="w06-no-show-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w06NoShow.primaryCta")}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={handleReviewCancellation}
          accessibilityRole="button"
          accessibilityLabel={t("w06NoShow.secondaryCta")}
          testID="w06-no-show-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w06NoShow.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.altLinkButton}
          onPress={handleSupportLink}
          accessibilityRole="button"
          accessibilityLabel={t("w06NoShow.alternativeLink")}
          testID="w06-no-show-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w06NoShow.alternativeLink")}</Text>
        </Pressable>

        {/* Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w06NoShow.prototypeDisclaimer")}</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 36,
  },
  progressTrackContainer: {
    marginBottom: 20,
    paddingTop: 8,
    position: "relative",
  },
  progressLinkingTrack: {
    position: "absolute",
    top: 15,
    left: 20,
    right: 20,
    height: 3,
    backgroundColor: colors.elevated,
    borderRadius: 2,
  },
  progressCompletedTrack: {
    position: "absolute",
    top: 15,
    left: 20,
    height: 3,
    backgroundColor: colors.brand,
    borderRadius: 2,
  },
  progressNodesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressNodeItem: {
    alignItems: "center",
    width: 60,
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.elevated,
    marginBottom: 6,
  },
  progressDotCompleted: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  progressDotAlert: {
    backgroundColor: "#F59E0B",
    borderColor: "#F59E0B",
    transform: [{ scale: 1.2 }],
  },
  progressNodeLabel: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    textAlign: "center",
  },
  progressNodeLabelAlert: {
    color: "#F59E0B",
    fontFamily: fontFamily.bold,
  },
  progressNodeLabelCompleted: {
    color: colors.primaryText,
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    gap: 6,
  },
  locationChipText: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  headerBlock: {
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  screenSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  jobCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 16,
  },
  jobCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  warningBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.4)",
  },
  warningBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: "#F59E0B",
    letterSpacing: 0.6,
  },
  bookingRefText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
  },
  divider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    gap: 12,
  },
  iconCol: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  textCol: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: 10,
    fontFamily: fontFamily.semiBold,
    color: colors.secondaryText,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 20,
  },
  detailsCategory: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: "#F59E0B",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  detailsHeading: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 14,
  },
  pointRow: {
    flexDirection: "row",
    marginVertical: 8,
    gap: 12,
  },
  pointIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(245, 158, 11, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  pointTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  pointTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 2,
  },
  pointDescription: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 16,
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
    marginTop: 8,
  },
  footerDisclaimer: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    opacity: 0.7,
  },
});
