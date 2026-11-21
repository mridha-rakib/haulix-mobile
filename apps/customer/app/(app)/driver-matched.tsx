/**
 * HAULIX Customer Mobile App — Phase 03.43
 * Screen C32-B: Driver Matched (Matched Driver & Vehicle Profile Presentation)
 *
 * Authoritative Master Section Reference:
 * - Page 1:2: 01 — Customer App (5 Screens)
 * - Section 836:4571 (EN) / Section 836:4572 (ES)
 * - Upstream: From C32-A (/searching-for-driver)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories preserved.
 * - Symmetrical non-binding quote: $356.00 USD.
 * - Driver data is approved fictional fixture (Marcus Vance, Ford Transit).
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32CallIcon,
  C32ChatIcon,
  C32StarRatingIcon,
  C32VanIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getW05DispatchState,
  setDispatchPhase,
  simulateCrewEnRoute,
  subscribeToW05DispatchState,
} from "../../src/fixtures/c32Dispatch";

export default function DriverMatchedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [dispatchState, setDispatchState] = useState(getW05DispatchState);
  const [contactToastVisible, setContactToastVisible] = useState(false);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    setDispatchPhase("matched");
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

  const handleConfirmAndTrack = useCallback(() => {
    simulateCrewEnRoute();
    router.push({
      pathname: "/crew-tracking",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleViewCancellationTerms = useCallback(() => {
    router.push({
      pathname: "/cancellation-windows",
      params: {
        fromPhase: "matched",
        ...(params.previewLocale ? { previewLocale: params.previewLocale } : {}),
      },
    });
  }, [router, params.previewLocale]);

  const handleContactAction = useCallback(() => {
    setContactToastVisible(true);
    setTimeout(() => setContactToastVisible(false), 2000);
  }, []);

  const crew = dispatchState.crew;

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c32b-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c32bDriverMatched.backA11y")}
          testID="c32b-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c32b-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>HAULIX</Text>
            <Text style={styles.progressText}>{t("c32bDriverMatched.progressLabel")}</Text>
          </View>

          {/* Screen Headline & Subtitle */}
          <Text style={styles.screenTitle}>{t("c32bDriverMatched.screenTitle")}</Text>
          <Text style={styles.screenSubtitle}>{t("c32bDriverMatched.screenSubtitle")}</Text>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c32b-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c32bDriverMatched.serviceArea")}</Text>
          </View>

          {/* Status Badge Capsule */}
          <View style={styles.statusBadgeCapsule} testID="c32b-status-badge">
            <C32VanIcon size={16} color="#38BDF8" />
            <Text style={styles.statusBadgeText}>{t("c32bDriverMatched.statusBadge")}</Text>
          </View>

          {/* MAP VIEWPORT COMPONENT */}
          <View style={styles.mapCardWrap} testID="c32b-map-container">
            <HaulixDispatchMap
              mode="matched"
              height={290}
              etaMinutes={crew.estimatedArrivalMin}
              pickupLabel="Phoenix, AZ"
              testID="c32b-dispatch-map"
            />
          </View>

          {/* Driver & Crew Profile Card */}
          <View style={styles.driverCard} testID="c32b-driver-card">
            <View style={styles.driverHeaderRow}>
              <View style={styles.avatarWrap} testID="c32b-driver-avatar">
                <Text style={styles.avatarText}>MV</Text>
              </View>

              <View style={styles.driverInfoCol}>
                <View style={styles.nameRow}>
                  <Text style={styles.driverNameText}>{crew.driver.name}</Text>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>{t("c32bDriverMatched.verifiedBadge")}</Text>
                  </View>
                </View>

                <View style={styles.ratingRow}>
                  <C32StarRatingIcon size={14} color={colors.brand} />
                  <Text style={styles.ratingText}>
                    {crew.driver.rating} ({crew.driver.completedJobs}{" "}
                    {currentLocale === "es" ? "servicios" : "jobs"})
                  </Text>
                </View>
              </View>

              {/* Action Buttons for Call & Chat */}
              <View style={styles.contactRow}>
                <Pressable
                  onPress={handleContactAction}
                  style={styles.contactIconBtn}
                  accessibilityRole="button"
                  accessibilityLabel={t("c32bDriverMatched.callAction")}
                  testID="c32b-call-btn"
                >
                  <C32CallIcon size={16} color={colors.brand} />
                </Pressable>
                <Pressable
                  onPress={handleContactAction}
                  style={styles.contactIconBtn}
                  accessibilityRole="button"
                  accessibilityLabel={t("c32bDriverMatched.chatAction")}
                  testID="c32b-chat-btn"
                >
                  <C32ChatIcon size={16} color={colors.brand} />
                </Pressable>
              </View>
            </View>

            {contactToastVisible && (
              <View style={styles.contactToast} testID="c32b-contact-toast">
                <Text style={styles.contactToastText}>{t("c32bDriverMatched.contactToast")}</Text>
              </View>
            )}

            <View style={styles.divider} />

            {/* Vehicle & Arrival Specifications */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32bDriverMatched.vehicleLabel")}</Text>
              <View style={styles.detailValueContainer}>
                <Text style={styles.detailTextValue} testID="c32b-vehicle-details">
                  {crew.vehicle.makeModel} ·{" "}
                  {currentLocale === "es" ? crew.vehicle.colorEs : crew.vehicle.colorEn} (
                  {crew.vehicle.licensePlate})
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32bDriverMatched.crewConfigLabel")}</Text>
              <View style={styles.detailValueContainer}>
                <Text style={styles.detailTextValue} testID="c32b-crew-config">
                  {t("c32bDriverMatched.crewConfigValue")}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32bDriverMatched.etaLabel")}</Text>
              <View style={styles.detailValueContainer}>
                <Text style={styles.detailActiveValue} testID="c32b-arrival-eta">
                  {crew.estimatedArrivalMin} {currentLocale === "es" ? "Minutos" : "Minutes"} (
                  {crew.distanceMiles} {currentLocale === "es" ? "millas" : "miles away"})
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable
              onPress={handleConfirmAndTrack}
              style={styles.primaryLimeButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32bDriverMatched.primaryCta")}
              testID="c32b-confirm-track-btn"
            >
              <Text style={styles.primaryLimeButtonText}>{t("c32bDriverMatched.primaryCta")}</Text>
            </Pressable>

            <Pressable
              onPress={handleViewCancellationTerms}
              style={styles.secondaryDarkButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32bDriverMatched.secondaryCta")}
              testID="c32b-view-cancellation-btn"
            >
              <Text style={styles.secondaryDarkButtonText}>
                {t("c32bDriverMatched.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* UI Note Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerNoteText}>
              {currentLocale === "es"
                ? "PROTOTIPO UI · Conductor asignado · Simulación de emparejamiento"
                : "UI PROTOTYPE · Driver Matched · Prototype matching demonstration"}
            </Text>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  brandText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primaryText,
    letterSpacing: 2,
  },
  progressText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.primaryText,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
    marginBottom: 14,
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#131817",
    borderColor: "#1E2724",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 14,
    gap: 6,
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38BDF8",
  },
  locationText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#ADB7B1",
    letterSpacing: 0.5,
  },
  statusBadgeCapsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.08)",
    borderColor: "rgba(56, 189, 248, 0.35)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 16,
    gap: 8,
  },
  statusBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: "#38BDF8",
    letterSpacing: 0.5,
  },
  mapCardWrap: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E2724",
    marginBottom: 16,
  },
  driverCard: {
    backgroundColor: "#131817",
    borderColor: "#1E2724",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  driverHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#222D29",
    borderColor: colors.brand,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.brand,
  },
  driverInfoCol: {
    flex: 1,
    flexShrink: 1,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 3,
  },
  driverNameText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primaryText,
  },
  verifiedBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderColor: "rgba(186, 255, 66, 0.4)",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  verifiedText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.secondaryText,
  },
  contactRow: {
    flexDirection: "row",
    gap: 8,
  },
  contactIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(22, 29, 26, 0.92)",
    borderColor: "#26332E",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contactToast: {
    backgroundColor: "#18201D",
    borderColor: "#26332E",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  contactToastText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#ADB7B1",
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    gap: 12,
    paddingVertical: 5,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.secondaryText,
    flexShrink: 0,
    maxWidth: "48%",
  },
  detailValueContainer: {
    flex: 1,
    flexShrink: 1,
    alignItems: "flex-end",
  },
  detailTextValue: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
    textAlign: "right",
  },
  detailActiveValue: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.brand,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#1E2724",
    marginVertical: 10,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  primaryLimeButton: {
    backgroundColor: colors.brand,
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryLimeButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: "#0B0F0E",
  },
  secondaryDarkButton: {
    backgroundColor: "transparent",
    borderColor: "#26332E",
    borderWidth: 1,
    borderRadius: 14,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryDarkButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#ADB7B1",
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  footerNoteText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#687771",
    textAlign: "center",
  },
});
