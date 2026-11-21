/**
 * HAULIX Customer Mobile App — Phase 03.45
 * Screen: Driver Reassigned (W05 Batch 2 Replacement Driver Interface)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 844:5740 (EN: "W05-EN / REASSIGNED · Driver reassigned")
 * - Frame ID: 844:7890 (ES: "W05-ES / REASSIGNED · Conductor reasignado")
 * - Parent Section: 836:4571 (EN) / 836:4572 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Automatic re-dispatch & replacement driver flow under SRS dispatch invariants.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32BellIcon,
  C32BoxIcon,
  C32CalendarIcon,
  C32CheckCircleIcon,
  C32ClockAlertIcon,
  C32LocationPinIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
  C32UsersIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getW05DispatchState,
  subscribeToW05DispatchState,
  W05_REASSIGNED_CREW,
} from "../../src/fixtures/c32Dispatch";

export default function DriverReassignedScreen() {
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
        pathname: "/crew-tracking",
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

  const handleContinueArrival = useCallback(() => {
    router.push({
      pathname: "/crew-tracking",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReviewDriverDetails = useCallback(() => {
    router.push({
      pathname: "/driver-matched",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleDelayOptions = useCallback(() => {
    router.push({
      pathname: "/driver-arrival-update",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w05Reassigned.backA11y")}
        testID="w05-reassigned-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w05-reassigned-scroll"
      >
        {/* Progress Track */}
        <View style={styles.progressTrackContainer} testID="w05-progress-track">
          <View style={styles.progressLinkingTrack} />
          <View style={styles.progressCompletedTrack} />
          <View style={styles.progressNodesRow}>
            {["Booked", "Dispatch", "Driver", "Arrival", "Service"].map((stepName, idx) => (
              <View key={stepName} style={styles.progressNodeItem}>
                <View
                  style={[
                    styles.progressDot,
                    idx <= 2 ? styles.progressDotActive : styles.progressDotInactive,
                  ]}
                />
                <Text
                  style={[
                    styles.progressNodeLabel,
                    idx <= 2 ? styles.progressNodeLabelActive : styles.progressNodeLabelInactive,
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
            {t("w05Reassigned.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle}>{t("w05Reassigned.screenSubtitle")}</Text>
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
            mode="driver_reassigned"
            height={235}
            etaMinutes={W05_REASSIGNED_CREW.estimatedArrivalMin}
            pickupLabel="Phoenix, AZ · Replacement assigned"
            testID="w05-reassigned-map"
          />
        </View>

        {/* Dispatch Summary Card */}
        <View style={styles.cardContainer} testID="w05-summary-card">
          <View style={styles.cardHeaderRow}>
            <View style={styles.statusPill}>
              <C32CheckCircleIcon size={14} color={colors.brand} />
              <Text style={styles.statusPillText}>{t("w05Reassigned.statusBadge")}</Text>
            </View>
            <View style={styles.bookingRefWrap}>
              <Text style={styles.bookingRefPrefix}>{t("w05Reassigned.bookingRefPrefix")}</Text>
              <Text style={styles.bookingRefValue}>{t("w05Reassigned.bookingRefValue")}</Text>
            </View>
          </View>

          {/* Driver Profile Row */}
          <View style={styles.driverProfileRow}>
            <View style={styles.avatarWrap}>
              <Image
                source={require("../../assets/images/driver-sarah.png")}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.driverInfoCol}>
              <Text style={styles.driverName}>{t("w05Reassigned.driverName")}</Text>
              <Text style={styles.driverVerification}>{t("w05Reassigned.driverVerification")}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/* Vehicle Details */}
          <View style={styles.detailRow}>
            <C32TruckIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05Reassigned.vehicleLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05Reassigned.vehicleValue")}</Text>
            </View>
          </View>

          {/* Crew Details */}
          <View style={styles.detailRow}>
            <C32UsersIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05Reassigned.crewLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05Reassigned.crewValue")}</Text>
            </View>
          </View>

          {/* Service Details */}
          <View style={styles.detailRow}>
            <C32BoxIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05Reassigned.serviceLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05Reassigned.serviceValue")}</Text>
            </View>
          </View>

          {/* Date Details */}
          <View style={styles.detailRow}>
            <C32CalendarIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05Reassigned.dateLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05Reassigned.dateValue")}</Text>
            </View>
          </View>

          {/* Illustrative Quote */}
          <View style={styles.detailRow}>
            <C32ShieldCheckIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05Reassigned.quoteLabel")}</Text>
              <Text style={styles.detailValueQuote}>{t("w05Reassigned.quoteValue")}</Text>
            </View>
          </View>
        </View>

        {/* Activity Card */}
        <View style={styles.activityCard} testID="w05-activity-card">
          <Text style={styles.activityHeading}>{t("w05Reassigned.activityHeader")}</Text>

          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <C32CheckCircleIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.activityTextWrap}>
              <Text style={styles.activityRowTitle}>{t("w05Reassigned.activity1Title")}</Text>
              <Text style={styles.activityRowDesc}>{t("w05Reassigned.activity1Desc")}</Text>
            </View>
          </View>

          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <C32ClockAlertIcon size={18} color="#F59E0B" />
            </View>
            <View style={styles.activityTextWrap}>
              <Text style={styles.activityRowTitle}>{t("w05Reassigned.activity2Title")}</Text>
              <Text style={styles.activityRowDesc}>{t("w05Reassigned.activity2Desc")}</Text>
            </View>
          </View>

          <View style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <C32BellIcon size={18} color="#38BDF8" />
            </View>
            <View style={styles.activityTextWrap}>
              <Text style={styles.activityRowTitle}>{t("w05Reassigned.activity3Title")}</Text>
              <Text style={styles.activityRowDesc}>{t("w05Reassigned.activity3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Actions Container */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleContinueArrival}
            style={styles.primaryButton}
            accessibilityRole="button"
            accessibilityLabel={t("w05Reassigned.primaryCta")}
            testID="w05-continue-arrival-btn"
          >
            <Text style={styles.primaryButtonText}>{t("w05Reassigned.primaryCta")}</Text>
          </Pressable>

          <Pressable
            onPress={handleReviewDriverDetails}
            style={styles.secondaryButton}
            accessibilityRole="button"
            accessibilityLabel={t("w05Reassigned.secondaryCta")}
            testID="w05-review-driver-btn"
          >
            <Text style={styles.secondaryButtonText}>{t("w05Reassigned.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            onPress={handleDelayOptions}
            style={styles.alternativeLinkWrap}
            accessibilityRole="button"
            accessibilityLabel={t("w05Reassigned.alternativeLink")}
            testID="w05-delay-options-link"
          >
            <Text style={styles.alternativeLinkText}>{t("w05Reassigned.alternativeLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <Text style={styles.disclaimerText}>{t("w05Reassigned.prototypeDisclaimer")}</Text>
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
    width: "50%",
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
    marginBottom: 12,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusPillText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    fontWeight: "700",
    color: colors.brand,
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
  driverProfileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 10,
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1E2624",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.brand,
    overflow: "hidden",
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarText: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    fontWeight: "700",
    color: colors.brand,
  },
  driverInfoCol: {
    flex: 1,
  },
  driverName: {
    fontFamily: fontFamily.medium,
    fontSize: 17,
    fontWeight: "700",
    color: "#F7FAF8",
  },
  driverVerification: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
    marginTop: 2,
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
  detailValueQuote: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    fontWeight: "700",
    color: colors.brand,
    marginTop: 2,
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
