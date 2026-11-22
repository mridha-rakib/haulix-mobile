/**
 * HAULIX Customer Mobile App — Phase 03.49
 * Screen: Dispatch Support (W05 Canonical State: SUPPORT)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 844:6445 (EN: "W05-EN / SUPPORT · Get dispatch support")
 * - Frame ID: 844:8595 (ES: "W05-ES / SUPPORT · Obtener ayuda con el despacho")
 * - Parent Section: 836:4571 (EN) / 836:4572 (ES)
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
  C32AlertTriangleIcon,
  C32BoxIcon,
  C32CalendarIcon,
  C32ClockAlertIcon,
  C32LocationPinIcon,
  C32ShieldCheckIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import { getW05DispatchState, subscribeToW05DispatchState } from "../../src/fixtures/c32Dispatch";

export default function DispatchSupportScreen() {
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
        pathname: "/driver-no-show",
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

  const handleNoDriverOptions = useCallback(() => {
    router.push({
      pathname: "/no-driver-available",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleDriverDelayOptions = useCallback(() => {
    router.push({
      pathname: "/driver-arrival-update",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleBackToAssignment = useCallback(() => {
    router.push({
      pathname: "/driver-matched",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w05Support.backA11y")}
        testID="w05-support-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w05-support-scroll"
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
                    idx <= 1
                      ? styles.progressDotActive
                      : idx === 2
                        ? styles.progressDotAlert
                        : styles.progressDotInactive,
                  ]}
                />
                <Text
                  style={[
                    styles.progressNodeLabel,
                    idx <= 1
                      ? styles.progressNodeLabelActive
                      : idx === 2
                        ? styles.progressNodeLabelAlert
                        : styles.progressNodeLabelInactive,
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
            {t("w05Support.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle}>{t("w05Support.screenSubtitle")}</Text>
        </View>

        {/* Location Badge */}
        <View style={styles.locationBadge} testID="w05-location-badge">
          <C32LocationPinIcon size={16} color={colors.brand} />
          <Text style={styles.locationText}>{t("w05Support.serviceArea")}</Text>
        </View>

        {/* Map Viewport */}
        <View style={styles.mapCardWrap} testID="w05-map-wrap">
          <HaulixDispatchMap
            mode="support"
            locale={currentLocale}
            height={235}
            pickupLabel={t("w05Support.serviceArea")}
            mapBadgeLabel={t("w05Support.mapLabel")}
            testID="w05-support-map"
          />
        </View>

        {/* Summary Card */}
        <View style={styles.cardContainer} testID="w05-summary-card">
          <View style={styles.cardHeaderRow}>
            <View style={styles.statusPillAlert}>
              <C32ClockAlertIcon size={14} color="#F59E0B" />
              <Text style={styles.statusPillTextAlert}>{t("w05Support.statusBadge")}</Text>
            </View>
            <View style={styles.bookingRefWrap}>
              <Text style={styles.bookingRefPrefix}>{t("w05Support.bookingRefPrefix")}</Text>
              <Text style={styles.bookingRefValue}>{t("w05Support.bookingRefValue")}</Text>
            </View>
          </View>

          {/* Explanation Notice */}
          <View style={styles.noticeBanner}>
            <C32AlertTriangleIcon size={18} color="#F59E0B" />
            <Text style={styles.noticeBannerText}>{t("w05Support.statusExplanation")}</Text>
          </View>

          <View style={styles.cardDivider} />

          {/* Service Details */}
          <View style={styles.detailRow}>
            <C32BoxIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05Support.serviceLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05Support.serviceValue")}</Text>
            </View>
          </View>

          {/* Date Details */}
          <View style={styles.detailRow}>
            <C32CalendarIcon size={18} color={colors.brand} />
            <View style={styles.detailTextCol}>
              <Text style={styles.detailLabel}>{t("w05Support.dateLabel")}</Text>
              <Text style={styles.detailValue}>{t("w05Support.dateValue")}</Text>
            </View>
          </View>
        </View>

        {/* Available Options Card */}
        <View style={styles.optionsCard} testID="w05-options-card">
          <Text style={styles.optionsHeading}>{t("w05Support.activityHeader")}</Text>

          <View style={styles.optionItem}>
            <View style={styles.optionDot} />
            <View style={styles.optionTextCol}>
              <Text style={styles.optionTitle}>{t("w05Support.activity1Title")}</Text>
              <Text style={styles.optionDesc}>{t("w05Support.activity1Desc")}</Text>
            </View>
          </View>

          <View style={styles.optionItem}>
            <View style={styles.optionDot} />
            <View style={styles.optionTextCol}>
              <Text style={styles.optionTitle}>{t("w05Support.activity2Title")}</Text>
              <Text style={styles.optionDesc}>{t("w05Support.activity2Desc")}</Text>
            </View>
          </View>

          <View style={styles.optionItem}>
            <View style={styles.optionDot} />
            <View style={styles.optionTextCol}>
              <Text style={styles.optionTitle}>{t("w05Support.activity3Title")}</Text>
              <Text style={styles.optionDesc}>{t("w05Support.activity3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleNoDriverOptions}
            accessibilityRole="button"
            accessibilityLabel={t("w05Support.primaryCta")}
            testID="w05-support-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w05Support.primaryCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleDriverDelayOptions}
            accessibilityRole="button"
            accessibilityLabel={t("w05Support.secondaryCta")}
            testID="w05-support-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w05Support.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.tertiaryLink}
            onPress={handleBackToAssignment}
            accessibilityRole="button"
            accessibilityLabel={t("w05Support.alternativeLink")}
            testID="w05-support-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w05Support.alternativeLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{t("w05Support.prototypeDisclaimer")}</Text>
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
    width: "35%",
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
  progressDotAlert: {
    backgroundColor: "#F59E0B",
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
    color: colors.primaryText,
  },
  progressNodeLabelAlert: {
    color: "#F59E0B",
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
    fontSize: 26,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    lineHeight: 32,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 20,
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
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  mapCardWrap: {
    borderRadius: 16,
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
  statusPillAlert: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 6,
  },
  statusPillTextAlert: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
    color: "#F59E0B",
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
  noticeBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(245, 158, 11, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.25)",
    borderRadius: 10,
    padding: 12,
    gap: 10,
    marginBottom: 14,
  },
  noticeBannerText: {
    flex: 1,
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: "#F59E0B",
    lineHeight: 16,
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
  optionsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 20,
  },
  optionsHeading: {
    fontSize: 13,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  optionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
    marginTop: 6,
  },
  optionTextCol: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 2,
  },
  optionDesc: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 16,
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
