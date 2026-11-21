/**
 * HAULIX Customer Mobile App — Phase 03.45
 * Screen: No Driver Available (W05 Batch 2 Recovery Interface)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 844:6070 (EN: "W05-EN / NO_DRIVER · No driver available")
 * - Frame ID: 844:8220 (ES: "W05-ES / NO_DRIVER · No hay conductor disponible")
 * - Parent Section: 836:4571 (EN) / 836:4572 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Confirmed customer inventory: 4 pieces (1 sofa + 2 chairs) preserved.
 * - Non-binding demo state; zero actual card charges or fee penalties.
 * - Differentiates no-driver recovery: fee-free cancel or reschedule.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32AlertTriangleIcon,
  C32BellIcon,
  C32BoxIcon,
  C32CalendarIcon,
  C32CheckCircleIcon,
  C32ClockAlertIcon,
  C32LocationPinIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import { getW05DispatchState, subscribeToW05DispatchState } from "../../src/fixtures/c32Dispatch";

export default function NoDriverAvailableScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [_dispatchState, setDispatchState] = useState(getW05DispatchState);
  const [supportToastVisible, setSupportToastVisible] = useState(false);

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
        pathname: "/searching-for-driver",
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

  const handleReschedule = useCallback(() => {
    router.push({
      pathname: "/select-available-window",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleCancelNoFee = useCallback(() => {
    router.push({
      pathname: "/request-canceled",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleSupportContact = useCallback(() => {
    setSupportToastVisible(true);
    setTimeout(() => setSupportToastVisible(false), 2500);
  }, []);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w05NoDriver.backA11y")}
        testID="w05-no-driver-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w05-no-driver-scroll"
      >
        {/* Dispatch Progress Track */}
        <View style={styles.progressTrackContainer} testID="w05-progress-track">
          <View style={styles.progressLinkingTrack} />
          <View style={styles.progressCompletedTrack} />
          <View style={styles.progressNodesRow}>
            {["Booked", "Dispatch", "Driver", "Arrival", "Service"].map((stepName, idx) => (
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
                    idx <= 1 ? styles.progressNodeLabelActive : styles.progressNodeLabelInactive,
                  ]}
                >
                  {currentLocale === "es"
                    ? ["Reservado", "Despacho", "Conductor", "Llegada", "Servicio"][idx]
                    : stepName}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroHeading} testID="w05-hero-heading">
            {t("w05NoDriver.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle}>{t("w05NoDriver.screenSubtitle")}</Text>
        </View>

        {/* Location Badge */}
        <View style={styles.locationBadge} testID="w05-location-badge">
          <C32LocationPinIcon size={16} color={colors.brand} />
          <Text style={styles.locationText}>
            {currentLocale === "es"
              ? "Phoenix, Arizona · Zona principal de servicio"
              : "Phoenix, Arizona · Primary service area"}
          </Text>
        </View>

        {/* Map Viewport Component */}
        <View style={styles.mapCardWrap} testID="w05-map-wrap">
          <HaulixDispatchMap
            mode="no_driver"
            height={235}
            pickupLabel="Phoenix, AZ · 50 mi search"
            testID="w05-no-driver-map"
          />
        </View>

        {/* Dispatch Summary Card */}
        <View style={styles.cardContainer} testID="w05-summary-card">
          <View style={styles.cardHeaderRow}>
            <View style={styles.statusPill}>
              <C32AlertTriangleIcon size={14} color="#F59E0B" />
              <Text style={styles.statusPillText}>{t("w05NoDriver.statusBadge")}</Text>
            </View>
            <View style={styles.bookingRefWrap}>
              <Text style={styles.bookingRefPrefix}>{t("w05NoDriver.bookingRefPrefix")}</Text>
              <Text style={styles.bookingRefValue}>{t("w05NoDriver.bookingRefValue")}</Text>
            </View>
          </View>

          <Text style={styles.statusExplanation}>{t("w05NoDriver.statusExplanation")}</Text>
          <View style={styles.cardDivider} />

          {/* Service Details */}
          <View style={styles.detailRow}>
            <C32BoxIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05NoDriver.serviceLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05NoDriver.serviceValue")}</Text>
            </View>
          </View>

          {/* Date Details */}
          <View style={styles.detailRow}>
            <C32CalendarIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05NoDriver.dateLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05NoDriver.dateValue")}</Text>
            </View>
          </View>

          {/* Fee Policy Indicator */}
          <View style={styles.policyRow} testID="w05-policy-indicator">
            <View style={styles.policyDot} />
            <Text style={styles.policyText}>{t("w05NoDriver.policyIndicator")}</Text>
          </View>
        </View>

        {/* Available Options / Activity Card */}
        <View style={styles.activityCard} testID="w05-activity-card">
          <Text style={styles.activityHeading}>{t("w05NoDriver.activityHeader")}</Text>

          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <C32CheckCircleIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.activityTextWrap}>
              <Text style={styles.activityRowTitle}>{t("w05NoDriver.activity1Title")}</Text>
              <Text style={styles.activityRowDesc}>{t("w05NoDriver.activity1Desc")}</Text>
            </View>
          </View>

          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <C32ClockAlertIcon size={18} color="#F59E0B" />
            </View>
            <View style={styles.activityTextWrap}>
              <Text style={styles.activityRowTitle}>{t("w05NoDriver.activity2Title")}</Text>
              <Text style={styles.activityRowDesc}>{t("w05NoDriver.activity2Desc")}</Text>
            </View>
          </View>

          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <C32BellIcon size={18} color="#38BDF8" />
            </View>
            <View style={styles.activityTextWrap}>
              <Text style={styles.activityRowTitle}>{t("w05NoDriver.activity3Title")}</Text>
              <Text style={styles.activityRowDesc}>{t("w05NoDriver.activity3Desc")}</Text>
            </View>
          </View>
        </View>

        {supportToastVisible && (
          <View style={styles.supportToast} testID="w05-support-toast">
            <Text style={styles.supportToastText}>{t("w05NoDriver.supportToast")}</Text>
          </View>
        )}

        {/* Actions Container */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleReschedule}
            style={styles.primaryButton}
            accessibilityRole="button"
            accessibilityLabel={t("w05NoDriver.primaryCta")}
            testID="w05-reschedule-btn"
          >
            <Text style={styles.primaryButtonText}>{t("w05NoDriver.primaryCta")}</Text>
          </Pressable>

          <Pressable
            onPress={handleCancelNoFee}
            style={styles.secondaryButton}
            accessibilityRole="button"
            accessibilityLabel={t("w05NoDriver.secondaryCta")}
            testID="w05-cancel-nofee-btn"
          >
            <Text style={styles.secondaryButtonText}>{t("w05NoDriver.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            onPress={handleSupportContact}
            style={styles.alternativeLinkWrap}
            accessibilityRole="button"
            accessibilityLabel={t("w05NoDriver.alternativeLink")}
            testID="w05-support-link"
          >
            <Text style={styles.alternativeLinkText}>{t("w05NoDriver.alternativeLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <Text style={styles.disclaimerText}>{t("w05NoDriver.prototypeDisclaimer")}</Text>
      </ScrollView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  brandRow: {
    alignItems: "center",
    marginBottom: 14,
  },
  brandWordmark: {
    fontFamily: fontFamily.medium,
    fontSize: 26,
    fontWeight: "800",
    color: "#F7FAF8",
    letterSpacing: 2,
  },
  brandLime: {
    color: colors.brand,
  },
  brandTagline: {
    fontFamily: fontFamily.medium,
    fontSize: 9,
    fontWeight: "500",
    color: "#AFBAB4",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  progressTrackContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  progressLinkingTrack: {
    position: "absolute",
    top: 7,
    left: 28,
    right: 28,
    height: 2,
    backgroundColor: "rgba(148, 166, 156, 0.3)",
  },
  progressCompletedTrack: {
    position: "absolute",
    top: 7,
    left: 28,
    width: "25%",
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
    width: 14,
    height: 14,
    borderRadius: 7,
    marginBottom: 4,
  },
  progressDotActive: {
    backgroundColor: colors.brand,
  },
  progressDotInactive: {
    backgroundColor: "rgba(148, 166, 156, 0.4)",
  },
  progressNodeLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 9,
    fontWeight: "500",
  },
  progressNodeLabelActive: {
    color: colors.brand,
  },
  progressNodeLabelInactive: {
    color: "#AFBAB4",
  },
  heroSection: {
    marginBottom: 12,
  },
  heroHeading: {
    fontFamily: fontFamily.medium,
    fontSize: 24,
    fontWeight: "700",
    color: "#F7FAF8",
    marginBottom: 4,
  },
  heroSubtitle: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: "#AFBAB4",
    lineHeight: 18,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#121716",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 14,
  },
  locationText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "#AFBAB4",
  },
  mapCardWrap: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(53, 64, 59, 0.8)",
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: "#151A19",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(53, 64, 59, 0.8)",
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusPillText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    fontWeight: "700",
    color: "#F59E0B",
    letterSpacing: 0.5,
  },
  bookingRefWrap: {
    alignItems: "flex-end",
  },
  bookingRefPrefix: {
    fontFamily: fontFamily.medium,
    fontSize: 9,
    color: "#AFBAB4",
  },
  bookingRefValue: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    fontWeight: "700",
    color: "#F7FAF8",
  },
  statusExplanation: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "#AFBAB4",
    lineHeight: 16,
    marginBottom: 12,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(53, 64, 59, 0.6)",
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 6,
  },
  detailTextCol: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    fontWeight: "600",
    color: "#AFBAB4",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    fontWeight: "600",
    color: "#F7FAF8",
    marginTop: 2,
  },
  policyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(53, 64, 59, 0.4)",
  },
  policyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  policyText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.brand,
    fontWeight: "500",
  },
  activityCard: {
    backgroundColor: "#151A19",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(53, 64, 59, 0.8)",
    padding: 16,
    marginBottom: 20,
  },
  activityHeading: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    fontWeight: "700",
    color: "#F7FAF8",
    marginBottom: 12,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginVertical: 8,
  },
  activityIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#1E2624",
    alignItems: "center",
    justifyContent: "center",
  },
  activityTextWrap: {
    flex: 1,
  },
  activityRowTitle: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    fontWeight: "600",
    color: "#F7FAF8",
  },
  activityRowDesc: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#AFBAB4",
    lineHeight: 15,
    marginTop: 2,
  },
  supportToast: {
    backgroundColor: "#1E2624",
    borderWidth: 1,
    borderColor: colors.brand,
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  supportToastText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
    textAlign: "center",
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    fontWeight: "700",
    color: "#080B0B",
  },
  secondaryButton: {
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "rgba(53, 64, 59, 0.9)",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    fontWeight: "600",
    color: colors.brand,
  },
  alternativeLinkWrap: {
    alignItems: "center",
    paddingVertical: 6,
  },
  alternativeLinkText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    fontWeight: "500",
    color: "#AFBAB4",
    textDecorationLine: "underline",
  },
  disclaimerText: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: "#6B7A72",
    textAlign: "center",
    lineHeight: 14,
  },
});
