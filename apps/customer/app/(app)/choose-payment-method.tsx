/**
 * HAULIX Customer Mobile App — Phase 03.38
 * Screen C29: Choose Payment Method
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:605 (430 × 1093 px)
 * - Spanish Variant: Node 766:991 (430 × 1108 px)
 *
 * Upstream Entry:
 * - From C28-C (/booking-terms-accepted) via "Continue to secure payment" CTA.
 *
 * Security & Consent Invariant:
 * - Pre-condition gate: Requires valid terms consent (draft.termsConsentAccepted === true).
 *   If accessed unconsented, redirects user back to /review-booking.
 * - Non-binding authorization estimate strictly $356.00 USD.
 * - Outgoing route:
 *   - "Continue with card" -> /secure-card-setup (C29-M)
 *   - "Review terms again" -> /booking-terms-accepted (C28-C)
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getEffectiveConfirmedItems,
  getW04Draft,
  type PaymentMethodType,
  SAMPLE_DATES,
  SAMPLE_WINDOWS,
  selectPaymentMethod,
  subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function CreditCardIcon({ selected }: { selected: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect
        x={2}
        y={5}
        width={20}
        height={14}
        rx={2}
        stroke={selected ? colors.brand : colors.secondaryText}
        strokeWidth={2}
      />
      <Path d="M2 10h20" stroke={selected ? colors.brand : colors.secondaryText} strokeWidth={2} />
      <Path
        d="M6 15h4"
        stroke={selected ? colors.brand : colors.secondaryText}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function SmartphoneWalletIcon({ selected }: { selected: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect
        x={5}
        y={2}
        width={14}
        height={20}
        rx={3}
        stroke={selected ? colors.brand : colors.secondaryText}
        strokeWidth={2}
      />
      <Path
        d="M12 18h.01"
        stroke={selected ? colors.brand : colors.secondaryText}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ShieldCheckIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function RadioIcon({ selected }: { selected: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={9}
        stroke={selected ? colors.brand : colors.elevated}
        strokeWidth={2}
      />
      {selected && <Circle cx={12} cy={12} r={5} fill={colors.brand} />}
    </Svg>
  );
}

export default function ChoosePaymentMethodScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(
    draft.selectedPaymentMethod ?? "card"
  );

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    return subscribeToW04Draft((updated) => setDraft({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/booking-terms-accepted",
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

  const handleSelectMethod = useCallback((method: PaymentMethodType) => {
    setSelectedMethod(method);
    selectPaymentMethod(method);
  }, []);

  const handleContinueWithCard = useCallback(() => {
    router.push({
      pathname: "/secure-card-setup",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReviewTermsAgain = useCallback(() => {
    router.push({
      pathname: "/booking-terms-accepted",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const selectedDate = SAMPLE_DATES.find((d) => d.id === draft.selectedDateId) ?? SAMPLE_DATES[0];
  const selectedWindow =
    SAMPLE_WINDOWS.find((w) => w.id === draft.selectedWindowId) ?? SAMPLE_WINDOWS[0];

  const timeSummary =
    draft.timingMode === "asap"
      ? currentLocale === "es"
        ? "Lo antes posible · Sujeto a conductor"
        : "ASAP · Subject to driver"
      : currentLocale === "es"
        ? `${selectedDate.fullDateEs} · ${selectedWindow.shortEs} MST`
        : `${selectedDate.fullDateEn} · ${selectedWindow.shortEn} MST`;

  const pickupArea = currentLocale === "es" ? draft.pickupAreaEs : draft.pickupAreaEn;
  const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c29-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c29ChoosePaymentMethod.backA11y")}
          testID="c29-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c29-scroll-view"
        >
          {/* Brand Row */}
          <View style={styles.brandRow}>
            <Text style={styles.brandHaul}>
              HAUL<Text style={styles.brandIx}>IX</Text>
            </Text>
            <Text style={styles.tagline}>
              {currentLocale === "es" ? "LO RECOGEMOS TODO." : "WE HAUL IT ALL."}
            </Text>
          </View>

          {/* 4-Step Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel} testID="c29-progress-label">
              {t("c29ChoosePaymentMethod.progressLabel")}
            </Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "75%" }]} />
            </View>
          </View>

          {/* Screen Title & Subtitle */}
          <View style={styles.headerBlock}>
            <Text style={styles.screenTitle} testID="c29-title">
              {t("c29ChoosePaymentMethod.screenTitle")}
            </Text>
            <Text style={styles.screenSubtitle} testID="c29-subtitle">
              {t("c29ChoosePaymentMethod.screenSubtitle")}
            </Text>
          </View>

          {/* Location Chip */}
          <View style={styles.chipContainer}>
            <Text style={styles.chipText}>{t("c29ChoosePaymentMethod.serviceArea")}</Text>
          </View>

          {/* Authorization Hold Total Card */}
          <View style={styles.totalCard} testID="c29-total-card">
            <View style={styles.totalHeader}>
              <Text style={styles.totalLabel}>{t("c29ChoosePaymentMethod.totalLabel")}</Text>
              <View style={styles.holdBadge} testID="c29-hold-badge">
                <Text style={styles.holdBadgeText}>{t("c29ChoosePaymentMethod.amountBadge")}</Text>
              </View>
            </View>
            <Text style={styles.totalAmount} testID="c29-total-amount">
              {t("c29ChoosePaymentMethod.totalAmount")}
            </Text>
            <Text style={styles.totalNote}>{t("c29ChoosePaymentMethod.totalNote")}</Text>

            <View style={styles.totalDivider} />

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>LOCATION</Text>
              <Text style={styles.metaValue}>{pickupArea}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>TIMING</Text>
              <Text style={styles.metaValue}>{timeSummary}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>ITEMS</Text>
              <Text style={styles.metaValue}>{confirmedItems}</Text>
            </View>
          </View>

          {/* Payment Methods Section */}
          <View style={styles.methodsContainer} testID="c29-methods-container">
            <Text style={styles.sectionHeading}>{t("c29ChoosePaymentMethod.methodsHeading")}</Text>

            {/* Card Option */}
            <Pressable
              style={({ pressed }) => [
                styles.methodCard,
                selectedMethod === "card" && styles.methodCardSelected,
                pressed && styles.methodCardPressed,
              ]}
              onPress={() => handleSelectMethod("card")}
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedMethod === "card" }}
              testID="c29-method-card"
            >
              <View style={styles.methodIconContainer}>
                <CreditCardIcon selected={selectedMethod === "card"} />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{t("c29ChoosePaymentMethod.cardTitle")}</Text>
                <Text style={styles.methodSubtitle}>
                  {t("c29ChoosePaymentMethod.cardSubtitle")}
                </Text>
              </View>
              <RadioIcon selected={selectedMethod === "card"} />
            </Pressable>

            {/* Digital Wallet Option */}
            <Pressable
              style={({ pressed }) => [
                styles.methodCard,
                selectedMethod === "wallet" && styles.methodCardSelected,
                pressed && styles.methodCardPressed,
              ]}
              onPress={() => handleSelectMethod("wallet")}
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedMethod === "wallet" }}
              testID="c29-method-wallet"
            >
              <View style={styles.methodIconContainer}>
                <SmartphoneWalletIcon selected={selectedMethod === "wallet"} />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{t("c29ChoosePaymentMethod.walletTitle")}</Text>
                <Text style={styles.methodSubtitle}>
                  {t("c29ChoosePaymentMethod.walletSubtitle")}
                </Text>
              </View>
              <RadioIcon selected={selectedMethod === "wallet"} />
            </Pressable>
          </View>

          {/* Security Guarantee Notice */}
          <View style={styles.noticeCard} testID="c29-notice-card">
            <View style={styles.noticeHeader}>
              <ShieldCheckIcon />
              <Text style={styles.noticeTitle}>{t("c29ChoosePaymentMethod.termsNoticeTitle")}</Text>
            </View>
            <Text style={styles.noticeBody}>{t("c29ChoosePaymentMethod.termsNoticeBody")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
              onPress={handleContinueWithCard}
              accessibilityRole="button"
              accessibilityLabel={t("c29ChoosePaymentMethod.primaryCta")}
              testID="c29-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c29ChoosePaymentMethod.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
              onPress={handleReviewTermsAgain}
              accessibilityRole="button"
              accessibilityLabel={t("c29ChoosePaymentMethod.secondaryCta")}
              testID="c29-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c29ChoosePaymentMethod.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Prototype Disclosure Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerNote}>{t("c29ChoosePaymentMethod.uiNote")}</Text>
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
    paddingTop: 12,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  brandHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  brandIx: {
    color: colors.brand,
  },
  tagline: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 1.2,
  },
  progressContainer: {
    marginBottom: 18,
  },
  progressLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.brand,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: colors.elevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.brand,
    borderRadius: 2,
  },
  headerBlock: {
    marginBottom: 16,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.primaryText,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondaryText,
  },
  chipContainer: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 18,
  },
  chipText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  totalCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
  },
  totalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  totalLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  holdBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  holdBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  totalAmount: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    color: colors.primaryText,
    marginBottom: 4,
  },
  totalNote: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
  },
  totalDivider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 12,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
  },
  metaLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.secondaryText,
    letterSpacing: 0.8,
  },
  metaValue: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primaryText,
  },
  methodsContainer: {
    marginBottom: 18,
  },
  sectionHeading: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1.5,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  methodCardSelected: {
    borderColor: colors.brand,
    backgroundColor: "#161D1A",
  },
  methodCardPressed: {
    opacity: 0.9,
  },
  methodIconContainer: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primaryText,
    marginBottom: 3,
  },
  methodSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  noticeCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  noticeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 1,
    marginLeft: 8,
  },
  noticeBody: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.secondaryText,
  },
  actionContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.background,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primaryText,
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  footerNote: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
    textAlign: "center",
  },
});
