/**
 * HAULIX Customer Mobile App — Phase 03.50
 * Screen: Active Service — ETA Pending (W06 Canonical State: ETA_PENDING)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:5356 (EN: "W06-EN / ETA_PENDING · Updating the route estimate")
 * - Frame ID: 883:5720 (ES: "W06-ES / ETA_PENDING · Actualizando la estimación de ruta")
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
  C32ClockIcon,
  C32LocationPinIcon,
  C32LockIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
  C32UsersIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import { getW05DispatchState, subscribeToW05DispatchState } from "../../src/fixtures/c32Dispatch";

export default function ActiveServiceEtaPendingScreen() {
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
        pathname: "/active-service-en-route",
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

  const handleReturnToMap = useCallback(() => {
    router.push({
      pathname: "/active-service-en-route",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleViewGpsOffline = useCallback(() => {
    router.push({
      pathname: "/active-service-gps-offline",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleSupportOptions = useCallback(() => {
    router.push({
      pathname: "/active-service-gps-denied",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06EtaPending.stepAssigned"),
    t("w06EtaPending.stepEnroute"),
    t("w06EtaPending.stepArrived"),
    t("w06EtaPending.stepService"),
    t("w06EtaPending.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06EtaPending.backA11y")}
        testID="w06-eta-pending-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-eta-pending-scroll"
      >
        {/* 5-Step Service Stages: Assigned complete, En route active */}
        <View style={styles.progressTrackContainer} testID="w06-progress-track">
          <View style={styles.progressLinkingTrack} />
          <View style={[styles.progressCompletedTrack, { width: "30%" }]} />
          <View style={styles.progressNodesRow}>
            {stages.map((stepName, idx) => {
              const isCompleted = idx < 1;
              const isActive = idx === 1;
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

        {/* Location / Demo Pill */}
        <View style={styles.locationPill} testID="w06-location-pill">
          <C32LocationPinIcon />
          <Text style={styles.locationPillText}>{t("w06EtaPending.serviceArea")}</Text>
        </View>

        {/* Screen Headline */}
        <View style={styles.headlineBlock}>
          <Text style={styles.screenTitle} testID="w06-eta-pending-title">
            {t("w06EtaPending.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle}>{t("w06EtaPending.screenSubtitle")}</Text>
        </View>

        {/* Privacy Banner Card */}
        <View style={styles.privacyBannerCard} testID="w06-eta-pending-privacy-banner">
          <View style={styles.privacyIconWrap}>
            <C32LockIcon />
          </View>
          <View style={styles.privacyTextContainer}>
            <Text style={styles.privacyTitle}>{t("w06EtaPending.privacyBannerTitle")}</Text>
            <Text style={styles.privacyDescription}>{t("w06EtaPending.privacyBannerDesc")}</Text>
          </View>
        </View>

        {/* Job Summary Card */}
        <View style={styles.jobCard} testID="w06-eta-pending-job-card">
          <View style={styles.jobCardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{t("w06EtaPending.statusBadge")}</Text>
            </View>
            <Text style={styles.bookingRefText}>
              {t("w06EtaPending.bookingRefPrefix")} {t("w06EtaPending.bookingRefValue")}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32TruckIcon />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06EtaPending.serviceLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06EtaPending.serviceValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32UsersIcon />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06EtaPending.driverLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06EtaPending.driverValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32CalendarIcon />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06EtaPending.dateLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06EtaPending.dateValue")}</Text>
            </View>
          </View>
        </View>

        {/* 3-Point Information Card */}
        <View style={styles.detailsCard} testID="w06-eta-pending-details-card">
          <Text style={styles.detailsCategory}>{t("w06EtaPending.cardCategoryLabel")}</Text>
          <Text style={styles.detailsHeading}>{t("w06EtaPending.cardHeading")}</Text>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ShieldCheckIcon />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06EtaPending.insight1Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06EtaPending.insight1Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ClockIcon />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06EtaPending.insight2Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06EtaPending.insight2Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32BoxIcon />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06EtaPending.insight3Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06EtaPending.insight3Desc")}</Text>
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
            style={styles.primaryCta}
            onPress={handleReturnToMap}
            testID="w06-eta-pending-primary-cta"
          >
            <Text style={styles.primaryCtaText}>{t("w06EtaPending.primaryCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryCta}
            onPress={handleViewGpsOffline}
            testID="w06-eta-pending-secondary-cta"
          >
            <Text style={styles.secondaryCtaText}>{t("w06EtaPending.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.alternativeLinkWrap}
            onPress={handleSupportOptions}
            testID="w06-eta-pending-alt-link"
          >
            <Text style={styles.alternativeLinkText}>{t("w06EtaPending.alternativeLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <Text style={styles.prototypeDisclaimer}>{t("w06EtaPending.prototypeDisclaimer")}</Text>
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
    marginBottom: 20,
    position: "relative",
  },
  progressLinkingTrack: {
    position: "absolute",
    top: 6,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: colors.elevated,
  },
  progressCompletedTrack: {
    position: "absolute",
    top: 6,
    left: 16,
    height: 2,
    backgroundColor: colors.brand,
  },
  progressNodesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressNodeItem: {
    alignItems: "center",
    width: 58,
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.elevated,
    marginBottom: 6,
  },
  progressDotCompleted: {
    backgroundColor: colors.brand,
  },
  progressDotActive: {
    backgroundColor: colors.brand,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  progressNodeLabel: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    textAlign: "center",
  },
  progressNodeLabelCompleted: {
    color: colors.brand,
  },
  progressNodeLabelActive: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    marginBottom: 12,
  },
  locationPillText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  headlineBlock: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 8,
    lineHeight: 28,
  },
  screenSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  privacyBannerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 14,
    gap: 12,
    marginBottom: 16,
  },
  privacyIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "rgba(242, 201, 76, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  privacyTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  privacyTitle: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 2,
  },
  privacyDescription: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 16,
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
    backgroundColor: "rgba(242, 201, 76, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(242, 201, 76, 0.35)",
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: "#F2C94C",
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
  primaryCta: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryCtaText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: "#000000",
    letterSpacing: 0.4,
  },
  secondaryCta: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryCtaText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  alternativeLinkWrap: {
    alignItems: "center",
    paddingVertical: 8,
  },
  alternativeLinkText: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    textDecorationLine: "underline",
  },
  prototypeDisclaimer: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 16,
  },
});
