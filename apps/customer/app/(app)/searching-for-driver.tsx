/**
 * HAULIX Customer Mobile App — Phase 03.43
 * Screen C32-A: Searching for Driver (Dispatch Search Interface)
 *
 * Authoritative Master Section Reference:
 * - Page 1:2: 01 — Customer App (5 Screens)
 * - Section 836:4571 (EN) / Section 836:4572 (ES)
 * - Upstream: From C31-A (/asap-request-recorded) or C31-S (/booking-recorded) via dispatch initialization
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories preserved.
 * - Symmetrical non-binding quote: $356.00 USD.
 * - No real dispatch backend calls, proximity queries, or live driver mutations.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C32RadarIcon } from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getW05DispatchState,
  setDispatchPhase,
  simulateDriverMatched,
  simulateFeeFreeExit,
  subscribeToW05DispatchState,
} from "../../src/fixtures/c32Dispatch";

export default function SearchingForDriverScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [dispatchState, setDispatchState] = useState(getW05DispatchState);
  const [cancelToastVisible, setCancelToastVisible] = useState(false);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    setDispatchPhase("searching");
    return subscribeToW05DispatchState((updated) => setDispatchState({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/asap-request-recorded",
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

  const handleSimulateMatch = useCallback(() => {
    simulateDriverMatched();
    router.push({
      pathname: "/driver-matched",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleCancelSearch = useCallback(() => {
    simulateFeeFreeExit("customer_cancelled_during_search");
    setCancelToastVisible(true);
    setTimeout(() => {
      router.push("/");
    }, 1200);
  }, [router]);

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c32a-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c32aSearchingDriver.backA11y")}
          testID="c32a-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c32a-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>HAULIX</Text>
            <Text style={styles.progressText}>{t("c32aSearchingDriver.progressLabel")}</Text>
          </View>

          {/* Screen Headline & Subtitle */}
          <Text style={styles.screenTitle}>{t("c32aSearchingDriver.screenTitle")}</Text>
          <Text style={styles.screenSubtitle}>{t("c32aSearchingDriver.screenSubtitle")}</Text>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c32a-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c32aSearchingDriver.serviceArea")}</Text>
          </View>

          {/* Status Badge Capsule */}
          <View style={styles.statusBadgeCapsule} testID="c32a-status-badge">
            <C32RadarIcon size={16} color={colors.brand} />
            <Text style={styles.statusBadgeText}>{t("c32aSearchingDriver.statusBadge")}</Text>
          </View>

          {/* MAP VIEWPORT COMPONENT */}
          <View style={styles.mapCardWrap} testID="c32a-map-container">
            <HaulixDispatchMap
              mode="searching"
              height={300}
              pickupLabel="Phoenix, AZ"
              testID="c32a-dispatch-map"
            />
          </View>

          {/* Dispatch Search Summary Card */}
          <View style={styles.cardContainer} testID="c32a-summary-card">
            <Text style={styles.cardHeaderTitle}>{t("c32aSearchingDriver.cardHeading")}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32aSearchingDriver.pickupAddressLabel")}</Text>
              <Text
                style={[styles.detailTextValue, { maxWidth: "60%", textAlign: "right" }]}
                testID="c32a-pickup-address"
              >
                {currentLocale === "es"
                  ? dispatchState.pickupAddressEs
                  : dispatchState.pickupAddressEn}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32aSearchingDriver.serviceTierLabel")}</Text>
              <Text style={styles.detailActiveValue} testID="c32a-service-tier">
                {t("c32aSearchingDriver.serviceTierValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32aSearchingDriver.matchingWindowLabel")}</Text>
              <Text style={styles.detailTextValue} testID="c32a-match-window">
                {t("c32aSearchingDriver.matchingWindowValue")}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c32aSearchingDriver.holdStatusLabel")}</Text>
              <Text style={styles.detailAmountValue} testID="c32a-hold-amount">
                {t("c32aSearchingDriver.holdStatusValue")}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {currentLocale === "es" ? "ARTÍCULOS CONFIRMADOS" : "CONFIRMED ITEMS"}
              </Text>
              <Text
                style={[styles.detailTextValue, { maxWidth: "60%", textAlign: "right" }]}
                testID="c32a-confirmed-items"
              >
                {currentLocale === "es"
                  ? dispatchState.confirmedItemsEs
                  : dispatchState.confirmedItemsEn}
              </Text>
            </View>
          </View>

          {/* Truthful Disclosure Banner */}
          <View style={styles.disclosureBanner} testID="c32a-disclosure-banner">
            <Text style={styles.disclosureText}>{t("c32aSearchingDriver.disclosureNotice")}</Text>
          </View>

          {/* Cancel Feedback Toast */}
          {cancelToastVisible && (
            <View style={styles.cancelToast} testID="c32a-cancel-toast">
              <Text style={styles.cancelToastText}>{t("c32aSearchingDriver.cancelFeedback")}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <Pressable
              onPress={handleSimulateMatch}
              style={styles.primaryLimeButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32aSearchingDriver.simulateMatchCta")}
              testID="c32a-simulate-match-btn"
            >
              <Text style={styles.primaryLimeButtonText}>
                {t("c32aSearchingDriver.simulateMatchCta")}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleCancelSearch}
              style={styles.secondaryDarkButton}
              accessibilityRole="button"
              accessibilityLabel={t("c32aSearchingDriver.cancelSearchCta")}
              testID="c32a-cancel-search-btn"
            >
              <Text style={styles.secondaryDarkButtonText}>
                {t("c32aSearchingDriver.cancelSearchCta")}
              </Text>
            </Pressable>
          </View>

          {/* UI Note Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerNoteText}>
              {currentLocale === "es"
                ? "PROTOTIPO UI · Búsqueda de despacho · Sin conductor real asignado"
                : "UI PROTOTYPE · Dispatch Search · No real driver assigned"}
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
    marginBottom: 16,
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
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.secondaryText,
  },
  detailTextValue: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
  },
  detailActiveValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: "#38BDF8",
  },
  detailAmountValue: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.brand,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E2724",
    marginVertical: 8,
  },
  disclosureBanner: {
    backgroundColor: "rgba(22, 29, 26, 0.85)",
    borderColor: "#26332E",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  disclosureText: {
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
