/**
 * HAULIX Customer Mobile App — Phase 03.41
 * Screen C31-A: Your ASAP Request Is Recorded (Immediate Service Request Outcome Demonstration)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:1155 (430 × 1001 px)
 * - Spanish Variant: Node 766:1541 (430 × 1034 px)
 *
 * Upstream Entry:
 * - From C31-P (/checking-booking-status) via ASAP outcome transition or QA simulation.
 *
 * CRITICAL SEMANTIC INVARIANTS:
 * - "ASAP request recorded" does NOT mean a driver has accepted, arrival is guaranteed,
 *   or pickup is confirmed.
 * - Symmetrical non-binding estimate strictly $356.00 USD.
 * - Customer confirmed inventory preserved: 4 pieces across 3 categories.
 * - Non-guaranteed arrival disclosures and fee-free cancellation safeguards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getEffectiveConfirmedItems,
  getW04Draft,
  recordAsapRequestRecorded,
  subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function LightningPulseHeroIcon() {
  return (
    <Svg width={44} height={44} viewBox="0 0 48 48" fill="none">
      <Circle
        cx={24}
        cy={24}
        r={22}
        fill="rgba(56, 189, 248, 0.12)"
        stroke="#38BDF8"
        strokeWidth={2}
      />
      <Path
        d="M26 12L16 26h8l-2 10 12-14h-8l2-10z"
        fill="#38BDF8"
        stroke="#38BDF8"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ClockSmallIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke="#38BDF8" strokeWidth={2} />
      <Path d="M12 7v5l3 3" stroke="#38BDF8" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function AlertTriangleSmallIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke={colors.warning}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 9v4M12 17h.01" stroke={colors.warning} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export default function AsapRequestRecordedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);
  const [queueNoticeVisible, setQueueNoticeVisible] = useState(false);
  const [cancelFeedbackVisible, setCancelFeedbackVisible] = useState(false);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    recordAsapRequestRecorded();
    return subscribeToW04Draft((updated) => setDraft({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/checking-booking-status",
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

  const handleCheckQueue = useCallback(() => {
    setQueueNoticeVisible(true);
    router.push({
      pathname: "/searching-for-driver",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleCancelAsap = useCallback(() => {
    setCancelFeedbackVisible(true);
    setTimeout(() => {
      router.push("/");
    }, 1500);
  }, [router]);

  const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c31a-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c31aAsapRequestRecorded.backA11y")}
          testID="c31a-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c31a-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>HAULIX</Text>
            <Text style={styles.progressText}>{t("c31aAsapRequestRecorded.progressLabel")}</Text>
          </View>

          {/* Hero Icon */}
          <View style={styles.heroIconContainer} testID="c31a-hero-icon">
            <LightningPulseHeroIcon />
          </View>

          {/* Screen Title & Subtitle */}
          <Text style={styles.screenTitle}>{t("c31aAsapRequestRecorded.screenTitle")}</Text>
          <Text style={styles.screenSubtitle}>{t("c31aAsapRequestRecorded.screenSubtitle")}</Text>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c31a-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c31aAsapRequestRecorded.serviceArea")}</Text>
          </View>

          {/* Status Badge Capsule */}
          <View style={styles.statusBadgeCapsule} testID="c31a-status-badge">
            <ClockSmallIcon />
            <Text style={styles.statusBadgeText}>{t("c31aAsapRequestRecorded.statusBadge")}</Text>
          </View>

          {/* Recorded Request Summary Card */}
          <View style={styles.cardContainer} testID="c31a-summary-card">
            <Text style={styles.cardHeaderTitle}>{t("c31aAsapRequestRecorded.cardHeading")}</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c31aAsapRequestRecorded.requestRefLabel")}</Text>
              <Text style={styles.detailCodeValue} testID="c31a-request-ref">
                {t("c31aAsapRequestRecorded.requestRefValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c31aAsapRequestRecorded.statusLabel")}</Text>
              <View style={styles.statusRow}>
                <ActivityIndicator size="small" color="#38BDF8" style={{ width: 14, height: 14 }} />
                <Text style={styles.detailSearchingValue} testID="c31a-request-status">
                  {t("c31aAsapRequestRecorded.statusValue")}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c31aAsapRequestRecorded.timingModeLabel")}</Text>
              <Text style={styles.detailTextValue} testID="c31a-timing-mode">
                {t("c31aAsapRequestRecorded.timingModeValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {currentLocale === "es" ? "ARTÍCULOS CONFIRMADOS" : "CONFIRMED ITEMS"}
              </Text>
              <Text
                style={[styles.detailTextValue, { maxWidth: "60%", textAlign: "right" }]}
                testID="c31a-confirmed-items"
              >
                {confirmedItems}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c31aAsapRequestRecorded.holdAmountLabel")}</Text>
              <Text style={styles.detailAmountValue} testID="c31a-hold-amount">
                {t("c31aAsapRequestRecorded.holdAmountValue")}
              </Text>
            </View>
          </View>

          {/* Availability Notice Card */}
          <View style={styles.noticeCard} testID="c31a-notice-card">
            <View style={styles.noticeHeaderRow}>
              <AlertTriangleSmallIcon />
              <Text style={styles.noticeHeaderTitle}>
                {t("c31aAsapRequestRecorded.availabilityNoticeHeading")}
              </Text>
            </View>
            <Text style={styles.noticeBodyText}>
              {t("c31aAsapRequestRecorded.availabilityNoticeBody")}
            </Text>
          </View>

          {/* Cancellation Feedback Notice */}
          {cancelFeedbackVisible && (
            <View style={styles.cancelFeedbackBox} testID="c31a-cancel-feedback">
              <Text style={styles.cancelFeedbackText}>
                {t("c31aAsapRequestRecorded.cancelNotice")}
              </Text>
            </View>
          )}

          {/* Future Notice for Queue */}
          {queueNoticeVisible && (
            <View style={styles.queueNoticeBox} testID="c31a-queue-notice">
              <Text style={styles.queueNoticeText}>
                {t("c31aAsapRequestRecorded.futureNoticeQueue")}
              </Text>
            </View>
          )}

          {/* Primary Action Button */}
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleCheckQueue}
            accessibilityRole="button"
            accessibilityLabel={t("c31aAsapRequestRecorded.primaryCta")}
            testID="c31a-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("c31aAsapRequestRecorded.primaryCta")}</Text>
          </Pressable>

          {/* Secondary Action Button (Cancel ASAP Request) */}
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleCancelAsap}
            accessibilityRole="button"
            accessibilityLabel={t("c31aAsapRequestRecorded.secondaryCta")}
            testID="c31a-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>
              {t("c31aAsapRequestRecorded.secondaryCta")}
            </Text>
          </Pressable>

          {/* Prototype Disclaimer */}
          <View style={styles.footerNoteContainer}>
            <Text style={styles.footerNoteText}>{t("c31aAsapRequestRecorded.uiNote")}</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 16,
  },
  brandText: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 2,
  },
  progressText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  heroIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 14,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  screenSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  locationChip: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161D1A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#222D28",
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 10,
    gap: 6,
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#38BDF8",
  },
  locationText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  statusBadgeCapsule: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(56, 189, 248, 0.12)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.35)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
    gap: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: "#38BDF8",
    letterSpacing: 0.8,
  },
  cardContainer: {
    backgroundColor: "#131817",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E2724",
    padding: 18,
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.4,
  },
  detailCodeValue: {
    fontSize: 13,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailSearchingValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: "#38BDF8",
  },
  detailTextValue: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.primaryText,
  },
  detailAmountValue: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.brand,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E2724",
    marginVertical: 8,
  },
  noticeCard: {
    backgroundColor: "#181712",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.25)",
    padding: 16,
    marginBottom: 18,
  },
  noticeHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  noticeHeaderTitle: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.warning,
    letterSpacing: 0.8,
  },
  noticeBodyText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  cancelFeedbackBox: {
    backgroundColor: "#1A1713",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.warning,
    padding: 14,
    marginBottom: 16,
  },
  cancelFeedbackText: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.warning,
    textAlign: "center",
    lineHeight: 18,
  },
  queueNoticeBox: {
    backgroundColor: "#131B1E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
    padding: 14,
    marginBottom: 16,
  },
  queueNoticeText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: "#38BDF8",
    textAlign: "center",
    lineHeight: 18,
  },
  primaryButton: {
    height: 52,
    backgroundColor: "#38BDF8",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.background,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#26332E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  secondaryButtonPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  footerNoteContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  footerNoteText: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    opacity: 0.7,
    textAlign: "center",
  },
});
