/**
 * HAULIX Customer Mobile App — Phase 03.51
 * Screen: Active Service — Working (W06 Canonical State: WORKING)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:5809 (EN: "W06-EN / WORKING · Service is in progress")
 * - Frame ID: 883:6173 (ES: "W06-ES / WORKING · Servicio en curso")
 * - Parent Section: 881:5131 (EN) / 881:5132 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
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
  C32ClockIcon,
  C32LocationPinIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
  C32UsersIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function ActiveServiceWorkingScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

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
        pathname: "/active-service-driver-arrived",
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

  const handleOpenConversation = useCallback(() => {
    router.push({
      pathname: "/active-service-chat",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleExtraWork = useCallback(() => {
    router.push({
      pathname: "/active-service-extra-request",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleMoreOptions = useCallback(() => {
    router.push({
      pathname: "/active-service-gps-offline",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06Working.stepAssigned"),
    t("w06Working.stepEnroute"),
    t("w06Working.stepArrived"),
    t("w06Working.stepService"),
    t("w06Working.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06Working.backA11y")}
        testID="w06-working-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-working-scroll"
      >
        {/* 5-Step Service Stages: Assigned, En route, Arrived completed; Service active */}
        <View style={styles.progressTrackContainer} testID="w06-progress-track">
          <View style={styles.progressLinkingTrack} />
          <View style={[styles.progressCompletedTrack, { width: "75%" }]} />
          <View style={styles.progressNodesRow}>
            {stages.map((stepName, idx) => {
              const isCompleted = idx < 3;
              const isActive = idx === 3;
              return (
                <View key={stepName} style={styles.progressNodeItem}>
                  <View
                    style={[
                      styles.progressDot,
                      isCompleted && styles.progressDotCompleted,
                      isActive && styles.progressDotActive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.progressNodeLabel,
                      isActive && styles.progressNodeLabelActive,
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
        <View style={styles.locationChip} testID="w06-working-location-chip">
          <C32LocationPinIcon size={14} color={colors.brand} />
          <Text style={styles.locationChipText} numberOfLines={1}>
            {t("w06Working.serviceArea")}
          </Text>
        </View>

        {/* Screen Headline & Subtitle */}
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle} testID="w06-working-title">
            {t("w06Working.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w06-working-subtitle">
            {t("w06Working.screenSubtitle")}
          </Text>
        </View>

        {/* Active Job Information Card */}
        <View style={styles.jobCard} testID="w06-working-job-card">
          <View style={styles.jobCardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{t("w06Working.statusBadge")}</Text>
            </View>
            <Text style={styles.bookingRefText}>
              {t("w06Working.bookingRefPrefix")} {t("w06Working.bookingRefValue")}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32BoxIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06Working.serviceLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06Working.serviceValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32TruckIcon size={18} color="#38BDF8" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06Working.driverLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06Working.driverValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32CalendarIcon size={18} color={colors.secondaryText} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06Working.dateLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06Working.dateValue")}</Text>
            </View>
          </View>
        </View>

        {/* Service in Progress Next Updates Card */}
        <View style={styles.detailsCard} testID="w06-working-details-card">
          <Text style={styles.detailsCategory}>{t("w06Working.cardCategoryLabel")}</Text>
          <Text style={styles.detailsHeading}>{t("w06Working.cardHeading")}</Text>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32UsersIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06Working.insight1Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06Working.insight1Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ShieldCheckIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06Working.insight2Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06Working.insight2Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ClockIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06Working.insight3Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06Working.insight3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Order Inventory Summary */}
        <View style={styles.orderSummaryCard} testID="w06-working-summary-card">
          <Text style={styles.summaryCategory}>
            {currentLocale === "es" ? "ALCANCE CONFIRMADO" : "CONFIRMED SCOPE"}
          </Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {currentLocale === "es" ? "Artículos confirmados" : "Confirmed inventory"}
            </Text>
            <Text style={styles.summaryValue}>4 pieces (3 categories)</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {currentLocale === "es" ? "Tarifa autorizada" : "Authorized hold"}
            </Text>
            <Text style={styles.summaryPrice}>$356.00 USD</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={handleOpenConversation}
          accessibilityRole="button"
          accessibilityLabel={t("w06Working.primaryCta")}
          testID="w06-working-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w06Working.primaryCta")}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={handleExtraWork}
          accessibilityRole="button"
          accessibilityLabel={t("w06Working.secondaryCta")}
          testID="w06-working-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w06Working.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.altLinkButton}
          onPress={handleMoreOptions}
          accessibilityRole="button"
          accessibilityLabel={t("w06Working.alternativeLink")}
          testID="w06-working-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w06Working.alternativeLink")}</Text>
        </Pressable>

        {/* Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w06Working.prototypeDisclaimer")}</Text>
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
  progressDotActive: {
    backgroundColor: colors.background,
    borderColor: colors.brand,
    borderWidth: 3,
  },
  progressNodeLabel: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    textAlign: "center",
  },
  progressNodeLabelActive: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
  },
  progressNodeLabelCompleted: {
    color: colors.primaryText,
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(189, 255, 0, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(189, 255, 0, 0.2)",
  },
  locationChipText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  headerBlock: {
    marginBottom: 18,
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 20,
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
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: "rgba(189, 255, 0, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(189, 255, 0, 0.35)",
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  bookingRefText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
  },
  divider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    gap: 12,
  },
  iconCol: {
    width: 28,
    alignItems: "center",
  },
  textCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.6,
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
    marginBottom: 16,
  },
  detailsCategory: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
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
    backgroundColor: "rgba(189, 255, 0, 0.08)",
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
  orderSummaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 14,
    marginBottom: 20,
  },
  summaryCategory: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  summaryValue: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  summaryPrice: {
    fontSize: 13,
    fontFamily: fontFamily.bold,
    color: colors.brand,
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
