/**
 * HAULIX Customer Mobile App — Phase 03.43
 * Screen C32-D: Cancellation Windows (Dispatch Policy & Recovery Interface)
 *
 * Authoritative Master Section Reference:
 * - Page 1:2: 01 — Customer App (5 Screens)
 * - Section 836:4571 (EN) / Section 836:4572 (ES)
 * - Upstream: From C32-C (/crew-tracking) or C32-B (/driver-matched)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories preserved.
 * - Symmetrical non-binding quote: $356.00 USD.
 * - No real cancellation fees, refunds, or financial mutations.
 * - Differentiates pre-assignment fee-free exit, 5-min grace window, and conditional post-grace fee.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C32ClockAlertIcon, C32ShieldCheckIcon } from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getW05DispatchState,
  isCancellationFeeFree,
  setDispatchPhase,
  simulateFeeFreeExit,
  subscribeToW05DispatchState,
} from "../../src/fixtures/c32Dispatch";

export default function CancellationWindowsScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string; fromPhase?: string }>();
  const [dispatchState, setDispatchState] = useState(getW05DispatchState);
  const [cancelFeedbackVisible, setCancelFeedbackVisible] = useState(false);
  const [waiverFeedbackVisible, setWaiverFeedbackVisible] = useState(false);
  const [enRouteWarningVisible, setEnRouteWarningVisible] = useState(false);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  const effectiveOriginPhase = (params.fromPhase ??
    dispatchState.previousPhase ??
    (dispatchState.phase !== "cancellation_windows" ? dispatchState.phase : "en_route")) as
    | "searching"
    | "matched"
    | "en_route";

  const isFeeFree = isCancellationFeeFree(effectiveOriginPhase);

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    setDispatchPhase("cancellation_windows", true);
    return subscribeToW05DispatchState((updated) => setDispatchState({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else if (effectiveOriginPhase === "searching") {
      router.push({
        pathname: "/searching-for-driver",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    } else if (effectiveOriginPhase === "matched") {
      router.push({
        pathname: "/driver-matched",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    } else {
      router.push({
        pathname: "/crew-tracking",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    }
  }, [router, params.previewLocale, effectiveOriginPhase]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleKeepBooking = useCallback(() => {
    if (effectiveOriginPhase === "searching") {
      router.push({
        pathname: "/searching-for-driver",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    } else if (effectiveOriginPhase === "matched") {
      router.push({
        pathname: "/driver-matched",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    } else {
      router.push({
        pathname: "/crew-tracking",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    }
  }, [router, params.previewLocale, effectiveOriginPhase]);

  const handleCancellationAction = useCallback(() => {
    if (isFeeFree) {
      simulateFeeFreeExit("customer_requested_fee_free");
      setCancelFeedbackVisible(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setEnRouteWarningVisible(true);
    }
  }, [isFeeFree, router]);

  const handleWaiverRequest = useCallback(() => {
    setWaiverFeedbackVisible(true);
    setTimeout(() => setWaiverFeedbackVisible(false), 2500);
  }, []);

  const statusBadgeText =
    effectiveOriginPhase === "searching"
      ? t("c32dCancellationWindows.statusBadgeSearching")
      : effectiveOriginPhase === "matched"
        ? t("c32dCancellationWindows.statusBadgeMatched")
        : t("c32dCancellationWindows.statusBadgeEnRoute");

  const backA11yText =
    effectiveOriginPhase === "searching"
      ? t("c32dCancellationWindows.returnToSearchA11y")
      : effectiveOriginPhase === "matched"
        ? t("c32dCancellationWindows.returnToMatchedA11y")
        : t("c32dCancellationWindows.returnToTrackingA11y");

  const cancellationButtonText =
    effectiveOriginPhase === "searching"
      ? t("c32dCancellationWindows.cancelSearchCta")
      : effectiveOriginPhase === "matched"
        ? t("c32dCancellationWindows.cancelGracePeriodCta")
        : t("c32dCancellationWindows.cancelPostGraceCta");

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c32d-screen">
        <FlowHeaderBack onBack={handleBack} backA11y={backA11yText} testID="c32d-header-back" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c32d-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>HAULIX</Text>
            <Text style={styles.progressText}>{t("c32dCancellationWindows.progressLabel")}</Text>
          </View>

          {/* Screen Headline & Subtitle */}
          <Text style={styles.screenTitle}>{t("c32dCancellationWindows.screenTitle")}</Text>
          <Text style={styles.screenSubtitle}>{t("c32dCancellationWindows.screenSubtitle")}</Text>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c32d-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c32dCancellationWindows.serviceArea")}</Text>
          </View>

          {/* Status Badge Capsule */}
          <View style={styles.statusBadgeCapsule} testID="c32d-status-badge">
            <C32ShieldCheckIcon size={16} color={colors.brand} />
            <Text style={styles.statusBadgeText}>{statusBadgeText}</Text>
          </View>

          {/* 3-TIER CANCELLATION MATRIX CARDS */}
          <View style={styles.matrixContainer} testID="c32d-matrix-container">
            <Text style={styles.matrixHeadingTitle}>
              {t("c32dCancellationWindows.policyHeading")}
            </Text>

            {/* Tier 1 Card: Before Driver Match */}
            <View style={styles.tierCard} testID="c32d-tier1-card">
              <View style={styles.tierHeaderRow}>
                <View style={styles.tierIconWrap}>
                  <C32ShieldCheckIcon size={20} color={colors.brand} />
                </View>
                <View style={styles.tierTitleCol}>
                  <Text style={styles.tierTitleText}>
                    {t("c32dCancellationWindows.tier1Title")}
                  </Text>
                  <View style={styles.greenBadge}>
                    <Text style={styles.greenBadgeText}>
                      {t("c32dCancellationWindows.tier1Badge")}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.tierDescText}>{t("c32dCancellationWindows.tier1Desc")}</Text>
            </View>

            {/* Tier 2 Card: 5-Minute Grace Period */}
            <View style={styles.tierCard} testID="c32d-tier2-card">
              <View style={styles.tierHeaderRow}>
                <View style={styles.tierIconWrap}>
                  <C32ShieldCheckIcon size={20} color="#38BDF8" />
                </View>
                <View style={styles.tierTitleCol}>
                  <Text style={styles.tierTitleText}>
                    {t("c32dCancellationWindows.tier2Title")}
                  </Text>
                  <View style={styles.blueBadge}>
                    <Text style={styles.blueBadgeText}>
                      {t("c32dCancellationWindows.tier2Badge")}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.tierDescText}>{t("c32dCancellationWindows.tier2Desc")}</Text>
            </View>

            {/* Tier 3 Card: Post-Grace En Route */}
            <View style={styles.tierCardAmber} testID="c32d-tier3-card">
              <View style={styles.tierHeaderRow}>
                <View style={styles.tierIconWrap}>
                  <C32ClockAlertIcon size={20} color={colors.warning} />
                </View>
                <View style={styles.tierTitleCol}>
                  <Text style={styles.tierTitleText}>
                    {t("c32dCancellationWindows.tier3Title")}
                  </Text>
                  <View style={styles.amberBadge}>
                    <Text style={styles.amberBadgeText}>
                      {t("c32dCancellationWindows.tier3Badge")}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.tierDescText}>{t("c32dCancellationWindows.tier3Desc")}</Text>
            </View>
          </View>

          {/* Booking At A Glance Summary */}
          <View style={styles.cardContainer} testID="c32d-summary-card">
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>BOOKING REF</Text>
              <Text style={styles.detailCodeValue}>{dispatchState.bookingRef}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>SIMULATED HOLD</Text>
              <Text style={styles.detailAmountValue}>$356.00 USD (Uncaptured)</Text>
            </View>
          </View>

          {/* Demonstration Policy Disclaimer */}
          <View style={styles.disclaimerBanner} testID="c32d-disclaimer-banner">
            <Text style={styles.disclaimerText}>{t("c32dCancellationWindows.disclaimer")}</Text>
          </View>

          {/* Conditional En-Route Cancellation Notice */}
          {enRouteWarningVisible && (
            <View style={styles.enRouteWarningBox} testID="c32d-en-route-warning">
              <Text style={styles.enRouteWarningText}>
                {currentLocale === "es"
                  ? "Atención: La cancelación mientras el equipo está en camino está sujeta a un cargo ilustrativo de $100.00 salvo que exista un retraso mayor a 15 min."
                  : "Notice: Post-grace cancellation while en route is subject to an illustrative $100.00 fee unless driver arrival is delayed >15 min."}
              </Text>
            </View>
          )}

          {/* Cancellation Feedback Toast */}
          {cancelFeedbackVisible && (
            <View style={styles.cancelToast} testID="c32d-cancel-toast">
              <Text style={styles.cancelToastText}>
                {t("c32dCancellationWindows.cancellationConfirmed")}
              </Text>
            </View>
          )}

          {/* Waiver Feedback Toast */}
          {waiverFeedbackVisible && (
            <View style={styles.waiverToast} testID="c32d-waiver-toast">
              <Text style={styles.waiverToastText}>{t("c32dCancellationWindows.waiverToast")}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable
              onPress={handleKeepBooking}
              style={styles.primaryLimeButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32dCancellationWindows.keepBookingCta")}
              testID="c32d-keep-booking-btn"
            >
              <Text style={styles.primaryLimeButtonText}>
                {t("c32dCancellationWindows.keepBookingCta")}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleCancellationAction}
              style={styles.secondaryDangerButton}
              accessibilityRole="button"
              accessibilityLabel={cancellationButtonText}
              testID="c32d-fee-free-exit-btn"
            >
              <Text style={styles.secondaryDangerButtonText}>{cancellationButtonText}</Text>
            </Pressable>

            <Pressable
              onPress={handleWaiverRequest}
              style={styles.tertiaryLinkButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32dCancellationWindows.waiverCta")}
              testID="c32d-waiver-btn"
            >
              <Text style={styles.tertiaryLinkText}>
                {t("c32dCancellationWindows.waiverCta")} ›
              </Text>
            </Pressable>
          </View>

          {/* UI Note Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerNoteText}>
              {currentLocale === "es"
                ? "PROTOTIPO UI · Política de cancelación de despacho · Sin cobros reales"
                : "UI PROTOTYPE · Dispatch Cancellation Policy · No real charges"}
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
  matrixContainer: {
    marginBottom: 16,
    gap: 12,
  },
  matrixHeadingTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  tierCard: {
    backgroundColor: "#131817",
    borderColor: "#1E2724",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  tierCardAmber: {
    backgroundColor: "#171410",
    borderColor: "rgba(245, 158, 11, 0.4)",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  tierHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tierIconWrap: {
    marginRight: 10,
  },
  tierTitleCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tierTitleText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primaryText,
  },
  greenBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderColor: "rgba(186, 255, 66, 0.4)",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  greenBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.brand,
  },
  blueBadge: {
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "rgba(56, 189, 248, 0.4)",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  blueBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: "#38BDF8",
  },
  amberBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    borderColor: "rgba(245, 158, 11, 0.5)",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  amberBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.warning,
  },
  tierDescText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  cardContainer: {
    backgroundColor: "#131817",
    borderColor: "#1E2724",
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.secondaryText,
  },
  detailCodeValue: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.brand,
  },
  detailAmountValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E2724",
    marginVertical: 6,
  },
  disclaimerBanner: {
    backgroundColor: "rgba(22, 29, 26, 0.85)",
    borderColor: "#26332E",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  disclaimerText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#ADB7B1",
    lineHeight: 17,
    textAlign: "center",
  },
  cancelToast: {
    backgroundColor: "#18201D",
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  cancelToastText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.brand,
    textAlign: "center",
  },
  enRouteWarningBox: {
    backgroundColor: "#201A14",
    borderColor: "rgba(245, 158, 11, 0.5)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  enRouteWarningText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.warning,
    textAlign: "center",
    lineHeight: 17,
  },
  waiverToast: {
    backgroundColor: "#1C1E17",
    borderColor: colors.warning,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  waiverToastText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.warning,
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
  secondaryDangerButton: {
    backgroundColor: "transparent",
    borderColor: "rgba(239, 68, 68, 0.4)",
    borderWidth: 1,
    borderRadius: 14,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryDangerButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#F87171",
  },
  tertiaryLinkButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tertiaryLinkText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.brand,
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
