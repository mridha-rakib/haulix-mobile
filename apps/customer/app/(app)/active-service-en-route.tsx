/**
 * HAULIX Customer Mobile App — Phase 03.50
 * Screen: Active Service — En Route (W06 Canonical State: ENROUTE)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:5245 (EN: "W06-EN / ENROUTE · Driver is on the way")
 * - Frame ID: 883:5609 (ES: "W06-ES / ENROUTE · El conductor está en camino")
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
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32BoxIcon,
  C32CalendarIcon,
  C32CheckCircleIcon,
  C32ClockIcon,
  C32LocationPinIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
  C32UsersIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import { getW05DispatchState, subscribeToW05DispatchState } from "../../src/fixtures/c32Dispatch";

export default function ActiveServiceEnRouteScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [_dispatchState, setDispatchState] = useState(getW05DispatchState);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    return subscribeToW05DispatchState((updated) => setDispatchState({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/active-service-awaiting-departure",
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

  const handleViewEtaPending = useCallback(() => {
    router.push({
      pathname: "/active-service-eta-pending",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePreviewArrived = useCallback(() => {
    router.push({
      pathname: "/active-service-driver-arrived",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleMoreOptionsChat = useCallback(() => {
    router.push({
      pathname: "/active-service-gps-offline",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06Enroute.stepAssigned"),
    t("w06Enroute.stepEnroute"),
    t("w06Enroute.stepArrived"),
    t("w06Enroute.stepService"),
    t("w06Enroute.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06Enroute.backA11y")}
        testID="w06-enroute-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-enroute-scroll"
      >
        {/* 5-Step Service Stages */}
        <View style={styles.progressTrackContainer} testID="w06-progress-track">
          <View style={styles.progressLinkingTrack} />
          <View style={[styles.progressCompletedTrack, { width: "30%" }]} />
          <View style={styles.progressNodesRow}>
            {stages.map((stepName, idx) => (
              <View key={stepName} style={styles.progressNodeItem}>
                <View
                  style={[
                    styles.progressDot,
                    idx <= 1 ? styles.progressDotActive : styles.progressDotInactive,
                  ]}
                />
                <Text
                  style={[
                    styles.progressNodeLabel,
                    idx === 1 ? styles.progressNodeLabelActive : styles.progressNodeLabelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {stepName}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroHeading} testID="w06-hero-heading">
            {t("w06Enroute.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle}>{t("w06Enroute.screenSubtitle")}</Text>
        </View>

        {/* Location Area Badge */}
        <View style={styles.locationBadge} testID="w06-location-badge">
          <C32LocationPinIcon size={16} color={colors.brand} />
          <Text style={styles.locationText}>{t("w06Enroute.serviceArea")}</Text>
        </View>

        {/* Map Viewport Component */}
        <View style={styles.mapCardWrap} testID="w06-map-wrap">
          <HaulixDispatchMap
            mode="w06_enroute"
            locale={currentLocale}
            height={235}
            pickupLabel={t("w06Enroute.serviceArea")}
            mapBadgeLabel={t("w06Enroute.mapOverlayBadge")}
            testID="w06-enroute-map"
          />
        </View>

        {/* Job Context & Live Status Card */}
        <View style={styles.cardContainer} testID="w06-summary-card">
          <View style={styles.cardHeaderRow}>
            <View style={styles.statusPill}>
              <C32TruckIcon size={14} color={colors.brand} />
              <Text style={styles.statusPillText}>{t("w06Enroute.statusBadge")}</Text>
            </View>
            <View style={styles.bookingRefWrap}>
              <Text style={styles.bookingRefPrefix}>{t("w06Enroute.bookingRefPrefix")}</Text>
              <Text style={styles.bookingRefValue}>{t("w06Enroute.bookingRefValue")}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Service Row */}
          <View style={styles.detailRow}>
            <C32BoxIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w06Enroute.serviceLabel")}</Text>
              <Text style={styles.detailValue}>{t("w06Enroute.serviceValue")}</Text>
            </View>
          </View>

          {/* Assigned Driver Row */}
          <View style={styles.detailRow}>
            <C32UsersIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w06Enroute.driverLabel")}</Text>
              <Text style={styles.detailValue}>{t("w06Enroute.driverValue")}</Text>
            </View>
          </View>

          {/* Service Window Row */}
          <View style={styles.detailRow}>
            <C32CalendarIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w06Enroute.dateLabel")}</Text>
              <Text style={styles.detailValue}>{t("w06Enroute.dateValue")}</Text>
            </View>
          </View>
        </View>

        {/* Route & Service Insights Card */}
        <View style={styles.insightsCard} testID="w06-insights-card">
          <Text style={styles.insightsCategory}>{t("w06Enroute.cardCategoryLabel")}</Text>
          <Text style={styles.insightsHeading}>{t("w06Enroute.cardHeading")}</Text>

          <View style={styles.insightItem}>
            <View style={styles.insightIconWrap}>
              <C32CheckCircleIcon size={16} color={colors.brand} />
            </View>
            <View style={styles.insightTextCol}>
              <Text style={styles.insightTitle}>{t("w06Enroute.insight1Title")}</Text>
              <Text style={styles.insightDesc}>{t("w06Enroute.insight1Desc")}</Text>
            </View>
          </View>

          <View style={styles.insightItem}>
            <View style={styles.insightIconWrap}>
              <C32ClockIcon size={16} color={colors.brand} />
            </View>
            <View style={styles.insightTextCol}>
              <Text style={styles.insightTitle}>{t("w06Enroute.insight2Title")}</Text>
              <Text style={styles.insightDesc}>{t("w06Enroute.insight2Desc")}</Text>
            </View>
          </View>

          <View style={styles.insightItem}>
            <View style={styles.insightIconWrap}>
              <C32ShieldCheckIcon size={16} color={colors.brand} />
            </View>
            <View style={styles.insightTextCol}>
              <Text style={styles.insightTitle}>{t("w06Enroute.insight3Title")}</Text>
              <Text style={styles.insightDesc}>{t("w06Enroute.insight3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Order Checklist Summary */}
        <View style={styles.orderSummaryCard}>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>
              {currentLocale === "es" ? "ARTÍCULOS" : "CONFIRMED ITEMS"}
            </Text>
            <Text style={styles.orderSummaryValue}>
              {currentLocale === "es"
                ? "1 sofá + 2 sillas + 1 mesa"
                : "1 sofa + 2 chairs + 1 table"}
            </Text>
          </View>
          <View style={styles.orderSummaryRow}>
            <Text style={styles.orderSummaryLabel}>
              {currentLocale === "es" ? "COTIZACIÓN" : "ESTIMATED TOTAL"}
            </Text>
            <Text style={styles.orderPriceValue}>$356.00 USD</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleViewEtaPending}
            accessibilityRole="button"
            accessibilityLabel={t("w06Enroute.primaryCta")}
            testID="w06-enroute-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w06Enroute.primaryCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handlePreviewArrived}
            accessibilityRole="button"
            accessibilityLabel={t("w06Enroute.secondaryCta")}
            testID="w06-enroute-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w06Enroute.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.tertiaryLink}
            onPress={handleMoreOptionsChat}
            accessibilityRole="button"
            accessibilityLabel={t("w06Enroute.alternativeLink")}
            testID="w06-enroute-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w06Enroute.alternativeLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{t("w06Enroute.prototypeDisclaimer")}</Text>
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
    paddingBottom: 40,
  },
  progressTrackContainer: {
    marginTop: 8,
    marginBottom: 16,
    position: "relative",
  },
  progressLinkingTrack: {
    position: "absolute",
    top: 5,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: colors.elevated,
  },
  progressCompletedTrack: {
    position: "absolute",
    top: 5,
    left: 16,
    height: 2,
    backgroundColor: colors.brand,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  progressDotActive: {
    backgroundColor: colors.brand,
  },
  progressDotInactive: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  progressNodeLabel: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
  },
  progressNodeLabelActive: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
  },
  progressNodeLabelInactive: {
    color: colors.secondaryText,
  },
  heroSection: {
    marginTop: 8,
    marginBottom: 14,
  },
  heroHeading: {
    fontSize: 25,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    lineHeight: 32,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  mapCardWrap: {
    borderRadius: 19,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.elevated,
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.3)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 6,
  },
  statusPillText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  bookingRefWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bookingRefPrefix: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  bookingRefValue: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  detailTextCol: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  insightsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 20,
  },
  insightsCategory: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  insightsHeading: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  insightIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(186, 255, 66, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  insightTextCol: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 2,
  },
  insightDesc: {
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
  orderSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
    gap: 12,
  },
  orderSummaryLabel: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.6,
  },
  orderSummaryValue: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    textAlign: "right",
    flexShrink: 1,
  },
  orderPriceValue: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    textAlign: "right",
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: "#080B0B",
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  tertiaryLink: {
    paddingVertical: 8,
    alignItems: "center",
  },
  tertiaryLinkText: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
    textDecorationLine: "underline",
  },
  disclaimerContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  disclaimerText: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
