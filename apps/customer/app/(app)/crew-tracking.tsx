/**
 * HAULIX Customer Mobile App — Phase 03.43
 * Screen C32-C: Crew Assigned & Tracking (Live Crew Tracking & En-Route Dispatch Interface)
 *
 * Authoritative Master Section Reference:
 * - Page 1:2: 01 — Customer App (5 Screens)
 * - Section 836:4571 (EN) / Section 836:4572 (ES)
 * - Foundational Concept: Node 111:13 (C05 · Job Tracking)
 * - Upstream: From C32-B (/driver-matched)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - HIGHEST MAP VISUAL FIDELITY PRIORITY.
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories preserved.
 * - Symmetrical non-binding quote: $356.00 USD.
 * - Zero fabricated live GPS streaming or fake arrival events.
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
  C32ShareIcon,
  C32StarRatingIcon,
  C32VanIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getW05DispatchState,
  setDispatchPhase,
  subscribeToW05DispatchState,
} from "../../src/fixtures/c32Dispatch";

function StepCheckIcon() {
  return (
    <View style={styles.stepCheckCircle}>
      <Text style={styles.stepCheckText}>✓</Text>
    </View>
  );
}

function StepActiveIcon() {
  return (
    <View style={styles.stepActiveCircle}>
      <View style={styles.stepActiveInnerDot} />
    </View>
  );
}

function StepPendingIcon() {
  return <View style={styles.stepPendingCircle} />;
}

export default function CrewTrackingScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [dispatchState, setDispatchState] = useState(getW05DispatchState);
  const [summaryToastVisible, setSummaryToastVisible] = useState(false);
  const [actionToastVisible, setActionToastVisible] = useState<string | null>(null);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    setDispatchPhase("en_route");
    return subscribeToW05DispatchState((updated) => setDispatchState({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/driver-matched",
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

  const handleCancellationOptions = useCallback(() => {
    router.push({
      pathname: "/cancellation-windows",
      params: {
        fromPhase: "en_route",
        ...(params.previewLocale ? { previewLocale: params.previewLocale } : {}),
      },
    });
  }, [router, params.previewLocale]);

  const handleViewSummary = useCallback(() => {
    setSummaryToastVisible(true);
    setTimeout(() => setSummaryToastVisible(false), 2000);
  }, []);

  const handleQuickAction = useCallback((label: string) => {
    setActionToastVisible(label);
    setTimeout(() => setActionToastVisible(null), 1800);
  }, []);

  const crew = dispatchState.crew;

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c32c-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c32cCrewTracking.backA11y")}
          testID="c32c-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c32c-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>HAULIX</Text>
            <Text style={styles.progressText}>{t("c32cCrewTracking.progressLabel")}</Text>
          </View>

          {/* Screen Headline & Subtitle */}
          <Text style={styles.screenTitle}>{t("c32cCrewTracking.screenTitle")}</Text>
          <Text style={styles.screenSubtitle}>{t("c32cCrewTracking.screenSubtitle")}</Text>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c32c-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c32cCrewTracking.serviceArea")}</Text>
          </View>

          {/* Status Badge Capsule */}
          <View style={styles.statusBadgeCapsule} testID="c32c-status-badge">
            <C32VanIcon size={16} color={colors.brand} />
            <Text style={styles.statusBadgeText}>{t("c32cCrewTracking.statusBadge")}</Text>
          </View>

          {/* HIGH-FIDELITY MAP VIEWPORT (P0 VISUAL PRIORITY) */}
          <View style={styles.mapCardWrap} testID="c32c-map-container">
            <HaulixDispatchMap
              mode="en_route"
              height={340}
              etaMinutes={crew.estimatedArrivalMin}
              pickupLabel="Phoenix, AZ"
              testID="c32c-dispatch-map"
            />
          </View>

          {/* Drag Handle Decoration */}
          <View style={styles.dragHandleWrap}>
            <View style={styles.dragHandle} />
          </View>

          {/* Service Dispatch Timeline Card */}
          <View style={styles.cardContainer} testID="c32c-timeline-card">
            <Text style={styles.cardHeaderTitle}>{t("c32cCrewTracking.timelineHeading")}</Text>

            {/* Step 1: Matched (Completed) */}
            <View style={styles.timelineRow}>
              <StepCheckIcon />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitleCompleted}>
                  {t("c32cCrewTracking.step1Title")}
                </Text>
                <Text style={styles.timelineDescCompleted}>{t("c32cCrewTracking.step1Desc")}</Text>
              </View>
            </View>

            <View style={styles.timelineLine} />

            {/* Step 2: En Route (Active) */}
            <View style={styles.timelineRow}>
              <StepActiveIcon />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitleActive}>{t("c32cCrewTracking.step2Title")}</Text>
                <Text style={styles.timelineDescActive}>{t("c32cCrewTracking.step2Desc")}</Text>
              </View>
            </View>

            <View style={styles.timelineLine} />

            {/* Step 3: Arrival (Pending) */}
            <View style={styles.timelineRow}>
              <StepPendingIcon />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitlePending}>{t("c32cCrewTracking.step3Title")}</Text>
                <Text style={styles.timelineDescPending}>{t("c32cCrewTracking.step3Desc")}</Text>
              </View>
            </View>

            <View style={styles.timelineLine} />

            {/* Step 4: Transit & Completion (Pending) */}
            <View style={styles.timelineRow}>
              <StepPendingIcon />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitlePending}>{t("c32cCrewTracking.step4Title")}</Text>
                <Text style={styles.timelineDescPending}>{t("c32cCrewTracking.step4Desc")}</Text>
              </View>
            </View>
          </View>

          {/* Driver & Vehicle Quick Contact Card */}
          <View style={styles.driverQuickCard} testID="c32c-driver-card">
            <View style={styles.driverHeaderRow}>
              <View style={styles.avatarWrap} testID="c32c-driver-avatar">
                <Text style={styles.avatarText}>MV</Text>
              </View>

              <View style={styles.driverInfoCol}>
                <View style={styles.nameRow}>
                  <Text style={styles.driverNameText}>{crew.driver.name}</Text>
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>

                <View style={styles.ratingRow}>
                  <C32StarRatingIcon size={14} color={colors.brand} />
                  <Text style={styles.ratingText}>
                    {crew.driver.rating} · {crew.vehicle.makeModel}
                  </Text>
                </View>
              </View>

              <View style={styles.quickActionsRow}>
                <Pressable
                  onPress={() =>
                    handleQuickAction(
                      currentLocale === "es"
                        ? "Llamada simulada iniciada"
                        : "Simulated call connected"
                    )
                  }
                  style={styles.quickActionBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Call driver"
                  testID="c32c-call-btn"
                >
                  <C32CallIcon size={16} color={colors.brand} />
                </Pressable>
                <Pressable
                  onPress={() =>
                    handleQuickAction(
                      currentLocale === "es"
                        ? "Chat con la tripulación abierto"
                        : "Crew chat opened"
                    )
                  }
                  style={styles.quickActionBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Chat with driver"
                  testID="c32c-chat-btn"
                >
                  <C32ChatIcon size={16} color={colors.brand} />
                </Pressable>
                <Pressable
                  onPress={() =>
                    handleQuickAction(
                      currentLocale === "es"
                        ? "Enlace de seguimiento copiado"
                        : "Tracking link copied"
                    )
                  }
                  style={styles.quickActionBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Share tracking"
                  testID="c32c-share-btn"
                >
                  <C32ShareIcon size={16} color="#ADB7B1" />
                </Pressable>
              </View>
            </View>

            {actionToastVisible && (
              <View style={styles.actionToast} testID="c32c-action-toast">
                <Text style={styles.actionToastText}>{actionToastVisible}</Text>
              </View>
            )}
          </View>

          {/* Job Details Overview Card */}
          <View style={styles.cardContainer} testID="c32c-job-details-card">
            <Text style={styles.cardHeaderTitle}>{t("c32cCrewTracking.jobDetailsHeading")}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32cCrewTracking.bookingRefLabel")}</Text>
              <Text style={styles.detailCodeValue} testID="c32c-booking-ref">
                {dispatchState.bookingRef}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32cCrewTracking.itemsLabel")}</Text>
              <Text style={styles.detailTextValue} testID="c32c-confirmed-items">
                {currentLocale === "es"
                  ? dispatchState.confirmedItemsEs
                  : dispatchState.confirmedItemsEn}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32cCrewTracking.holdLabel")}</Text>
              <Text style={styles.detailAmountValue} testID="c32c-hold-amount">
                {t("c32cCrewTracking.holdValue")}
              </Text>
            </View>
          </View>

          {summaryToastVisible && (
            <View style={styles.summaryToast} testID="c32c-summary-toast">
              <Text style={styles.summaryToastText}>
                {currentLocale === "es"
                  ? "Servicio activo: Despacho #HLX-7829-BK · 4 artículos · Retención $356.00"
                  : "Active Service: Dispatch #HLX-7829-BK · 4 items · Hold $356.00"}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable
              onPress={handleViewSummary}
              style={styles.primaryLimeButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32cCrewTracking.primaryCta")}
              testID="c32c-view-summary-btn"
            >
              <Text style={styles.primaryLimeButtonText}>{t("c32cCrewTracking.primaryCta")}</Text>
            </Pressable>

            <Pressable
              onPress={handleCancellationOptions}
              style={styles.secondaryDarkButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32cCrewTracking.secondaryCta")}
              testID="c32c-cancellation-options-btn"
            >
              <Text style={styles.secondaryDarkButtonText}>
                {t("c32cCrewTracking.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* UI Note Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerNoteText}>
              {currentLocale === "es"
                ? "PROTOTIPO UI · Seguimiento en vivo de equipo · Coordenadas simuladas"
                : "UI PROTOTYPE · Live Crew Tracking · Simulated telemetry coordinates"}
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
    backgroundColor: colors.brand,
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
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderColor: "rgba(186, 255, 66, 0.35)",
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
    color: colors.brand,
    letterSpacing: 0.5,
  },
  mapCardWrap: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E2724",
    marginBottom: 12,
  },
  dragHandleWrap: {
    alignItems: "center",
    marginVertical: 6,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#26332E",
  },
  cardContainer: {
    backgroundColor: "#131817",
    borderColor: "#1E2724",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timelineContent: {
    flex: 1,
    marginLeft: 12,
  },
  timelineTitleCompleted: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.primaryText,
  },
  timelineDescCompleted: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  timelineTitleActive: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.brand,
  },
  timelineDescActive: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primaryText,
    marginTop: 2,
  },
  timelineTitlePending: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: "#687771",
  },
  timelineDescPending: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#4B5752",
    marginTop: 2,
  },
  timelineLine: {
    width: 2,
    height: 18,
    backgroundColor: "#1E2724",
    marginLeft: 11,
    marginVertical: 4,
  },
  stepCheckCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    borderColor: colors.brand,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCheckText: {
    fontSize: 12,
    color: colors.brand,
    fontWeight: "bold",
  },
  stepActiveCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(186, 255, 66, 0.25)",
    borderColor: colors.brand,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  stepActiveInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  stepPendingCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#131817",
    borderColor: "#26332E",
    borderWidth: 1.5,
  },
  driverQuickCard: {
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#222D29",
    borderColor: colors.brand,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.brand,
  },
  driverInfoCol: {
    flex: 1,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 2,
  },
  driverNameText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.primaryText,
  },
  verifiedBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderColor: "rgba(186, 255, 66, 0.4)",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  verifiedText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 9,
    color: colors.brand,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.secondaryText,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 6,
  },
  quickActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(22, 29, 26, 0.92)",
    borderColor: "#26332E",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionToast: {
    backgroundColor: "#18201D",
    borderColor: "#26332E",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  actionToastText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#ADB7B1",
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  detailTextValue: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
    flex: 1,
    textAlign: "right",
  },
  detailCodeValue: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.brand,
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "right",
  },
  detailAmountValue: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.brand,
    flex: 1,
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#1E2724",
    marginVertical: 8,
  },
  summaryToast: {
    backgroundColor: "#18201D",
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  summaryToastText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
    textAlign: "center",
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
