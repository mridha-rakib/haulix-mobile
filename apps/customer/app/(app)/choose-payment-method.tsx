/**
 * HAULIX Customer Mobile App — Phase 03.47B Remediation
 * Screen C29: Choose Payment Method
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 763:605 (430 × 1093 px)
 * - Spanish Variant: Node 766:991 (430 × 1108 px)
 *
 * Upstream Entry:
 * - From C28-C (/booking-terms-accepted) via "Continue to secure payment" CTA.
 *
 * Strict Security & Provider Boundary Rules:
 * - NON-BINDING AUTHORIZATION HOLD ESTIMATE: Strictly $356.00 USD.
 * - ZERO SENSITIVE DATA STORAGE: Under no circumstances does HAULIX collect, store,
 *   log, or transmit primary account numbers (PAN), CVVs, expiration dates, or bank credentials.
 * - UNRESTRICTED DEMO ROUTING: No auth or payment gate blocks. Full interactive APK testability.
 * - OUTGOING ROUTING:
 *   - Primary CTA ("Continue with card" / "Continuar con tarjeta") -> /secure-card-setup (C29-M)
 *   - Secondary CTA ("Review terms again" / "Revisar condiciones") -> /booking-terms-accepted (C28-C)
 *   - Decline Recovery Link ("Preview decline recovery" / "Ver recuperación por rechazo") -> /payment-authorization-declined
 *   - Expired Hold Link ("Preview expired hold" / "Ver retención vencida") -> /card-hold-expired
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

function TruckIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x={1} y={3} width={15} height={13} rx={2} stroke={colors.brand} strokeWidth={2} />
      <Path
        d="M16 8h4l3 4v4h-7V8z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={5.5} cy={18.5} r={2.5} stroke={colors.brand} strokeWidth={2} />
      <Circle cx={18.5} cy={18.5} r={2.5} stroke={colors.brand} strokeWidth={2} />
    </Svg>
  );
}

function CreditCardIcon({ selected }: { selected: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
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
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
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

function DocumentPendingIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="#FFC85A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke="#FFC85A"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ArrowRightIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14M12 5l7 7-7 7"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
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

  const handlePreviewDecline = useCallback(() => {
    router.push({
      pathname: "/payment-authorization-declined",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePreviewExpired = useCallback(() => {
    router.push({
      pathname: "/card-hold-expired",
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
          {/* 4-Step Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel} testID="c29-progress-label">
              {t("c29ChoosePaymentMethod.progressLabel")}
            </Text>
            <View style={styles.timelineRow}>
              <View style={[styles.timelineSegment, styles.timelineSegmentActive]} />
              <View style={[styles.timelineSegment, styles.timelineSegmentActive]} />
              <View style={[styles.timelineSegment, styles.timelineSegmentActive]} />
              <View style={styles.timelineSegment} />
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
            <TruckIcon />
            <Text style={styles.chipText}>{t("c29ChoosePaymentMethod.serviceArea")}</Text>
          </View>

          {/* Authorization Hold Total Card */}
          <View style={styles.totalCard} testID="c29-total-card">
            <View style={styles.cardHeaderRow}>
              <CreditCardIcon selected={true} />
              <Text style={styles.cardHeaderTitle}>
                {t("c29ChoosePaymentMethod.cardAuthorization")}
              </Text>
            </View>

            <Text style={styles.serviceTitle}>
              {t("c29ChoosePaymentMethod.furnitureRemovalTitle")}
            </Text>
            <Text style={styles.serviceSubtitle}>
              {t("c29ChoosePaymentMethod.furnitureRemovalSubtitle")}
            </Text>

            {/* Pending Booking Summary Capsule */}
            <View style={styles.pendingCapsule}>
              <View style={styles.pendingBadgeRow}>
                <DocumentPendingIcon />
                <Text style={styles.pendingBadgeText}>
                  {t("c29ChoosePaymentMethod.pendingStatus")}
                </Text>
              </View>
              <Text style={styles.pendingTitle}>{t("c29ChoosePaymentMethod.pendingTitle")}</Text>
              <Text style={styles.pendingSupporting}>
                {t("c29ChoosePaymentMethod.pendingSupporting")}
              </Text>
            </View>

            {/* Reference Quote Row */}
            <View style={styles.quoteRow}>
              <Text style={styles.quoteLabel}>{t("c29ChoosePaymentMethod.quoteReference")}</Text>
              <Text style={styles.totalAmount} testID="c29-total-amount">
                {t("c29ChoosePaymentMethod.totalAmount")}
              </Text>
            </View>

            <View style={styles.metaDivider} />

            {/* Translated Metadata Rows */}
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t("c29ChoosePaymentMethod.metaLocation")}</Text>
              <Text style={styles.metaValue}>{pickupArea}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t("c29ChoosePaymentMethod.metaTiming")}</Text>
              <Text style={styles.metaValue}>{timeSummary}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{t("c29ChoosePaymentMethod.metaItems")}</Text>
              <Text style={styles.metaValue}>{confirmedItems}</Text>
            </View>

            {/* Payment Method Selection Sub-Card */}
            <View style={styles.selectionSubCard} testID="c29-methods-container">
              <Text style={styles.selectionHeading}>
                {t("c29ChoosePaymentMethod.selectedMethodHeading")}
              </Text>

              {/* Card Option (Primary test Visa) */}
              <Pressable
                onPress={() => handleSelectMethod("card")}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedMethod === "card" }}
                testID="c29-method-card"
              >
                <View
                  style={[
                    styles.methodOptionCard,
                    selectedMethod === "card" && styles.methodOptionCardSelected,
                  ]}
                >
                  <View style={styles.methodIconContainer}>
                    <CreditCardIcon selected={selectedMethod === "card"} />
                  </View>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodTitle}>
                      {t("c29ChoosePaymentMethod.testCardTitle")}
                    </Text>
                    <Text style={styles.methodSubtitle}>
                      {t("c29ChoosePaymentMethod.testCardSubtitle")}
                    </Text>
                  </View>
                  <RadioIcon selected={selectedMethod === "card"} />
                </View>
              </Pressable>

              {/* Digital Wallet Option */}
              <Pressable
                onPress={() => handleSelectMethod("wallet")}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedMethod === "wallet" }}
                testID="c29-method-wallet"
              >
                <View
                  style={[
                    styles.methodOptionCard,
                    selectedMethod === "wallet" && styles.methodOptionCardSelected,
                  ]}
                >
                  <View style={styles.methodIconContainer}>
                    <SmartphoneWalletIcon selected={selectedMethod === "wallet"} />
                  </View>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodTitle}>
                      {t("c29ChoosePaymentMethod.walletTitle")}
                    </Text>
                    <Text style={styles.methodSubtitle}>
                      {t("c29ChoosePaymentMethod.walletSubtitle")}
                    </Text>
                  </View>
                  <RadioIcon selected={selectedMethod === "wallet"} />
                </View>
              </Pressable>

              {/* Add / Change Card Row */}
              <View style={styles.subCardDivider} />
              <Pressable
                onPress={handleContinueWithCard}
                accessibilityRole="button"
                accessibilityLabel={t("c29ChoosePaymentMethod.addOrChangeCard")}
                testID="c29-change-card-button"
              >
                <View style={styles.changeCardRow}>
                  <CreditCardIcon selected={false} />
                  <Text style={styles.changeCardText}>
                    {t("c29ChoosePaymentMethod.addOrChangeCard")}
                  </Text>
                  <ArrowRightIcon />
                </View>
              </Pressable>
            </View>

            <Text style={styles.providerNote}>{t("c29ChoosePaymentMethod.providerCardNote")}</Text>
          </View>

          {/* Security Guarantee Notice */}
          <View style={styles.noticeCard} testID="c29-notice-card">
            <View style={styles.noticeHeader}>
              <ShieldCheckIcon />
              <Text style={styles.noticeTitle}>
                {t("c29ChoosePaymentMethod.secureNoticeHeading")}
              </Text>
            </View>
            <Text style={styles.noticeBody}>{t("c29ChoosePaymentMethod.secureNoticeBody")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionContainer}>
            <Pressable
              onPress={handleContinueWithCard}
              accessibilityRole="button"
              accessibilityLabel={t("c29ChoosePaymentMethod.primaryCta")}
              testID="c29-primary-cta"
            >
              <View style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>
                  {t("c29ChoosePaymentMethod.primaryCta")}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleReviewTermsAgain}
              accessibilityRole="button"
              accessibilityLabel={t("c29ChoosePaymentMethod.secondaryCta")}
              testID="c29-secondary-cta"
            >
              <View style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>
                  {t("c29ChoosePaymentMethod.secondaryCta")}
                </Text>
              </View>
            </Pressable>

            {/* Alternative Links (Decline & Expired Hold Simulation) */}
            <View style={styles.alternativeLinksRow}>
              <Pressable
                onPress={handlePreviewDecline}
                accessibilityRole="button"
                accessibilityLabel={t("c29ChoosePaymentMethod.previewDeclineCta")}
                testID="c29-preview-decline-link"
              >
                <Text style={styles.alternativeLinkText}>
                  {t("c29ChoosePaymentMethod.previewDeclineCta")}
                </Text>
              </Pressable>
              <Text style={styles.linkSeparator}>·</Text>
              <Pressable
                onPress={handlePreviewExpired}
                accessibilityRole="button"
                accessibilityLabel={t("c29ChoosePaymentMethod.previewExpiredLink")}
                testID="c29-preview-expired-link"
              >
                <Text style={styles.alternativeLinkText}>
                  {t("c29ChoosePaymentMethod.previewExpiredLink")}
                </Text>
              </Pressable>
            </View>
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
    marginBottom: 14,
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
    marginBottom: 16,
  },
  progressLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  timelineRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  timelineSegment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.elevated,
  },
  timelineSegmentActive: {
    backgroundColor: colors.brand,
  },
  headerBlock: {
    marginBottom: 16,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 32,
    color: colors.primaryText,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.secondaryText,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 16,
  },
  chipText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  totalCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  cardHeaderTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.primaryText,
    letterSpacing: 0.8,
  },
  serviceTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primaryText,
    marginBottom: 2,
  },
  serviceSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
    marginBottom: 12,
  },
  pendingCapsule: {
    backgroundColor: colors.background,
    borderColor: colors.elevated,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  pendingBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  pendingBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: "#FFC85A",
    letterSpacing: 0.8,
  },
  pendingTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.primaryText,
    marginBottom: 2,
  },
  pendingSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  quoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
    minHeight: 28,
  },
  quoteLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    lineHeight: 16,
  },
  totalAmount: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.brand,
    flexShrink: 0,
    textAlign: "right",
  },
  metaDivider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
    gap: 12,
  },
  metaLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  metaValue: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primaryText,
    flexShrink: 0,
    textAlign: "right",
  },
  selectionSubCard: {
    backgroundColor: colors.elevated,
    borderColor: "#35403B",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    marginBottom: 10,
  },
  selectionHeading: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  methodOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  methodOptionCardSelected: {
    borderColor: colors.brand,
    backgroundColor: "#161D1A",
  },
  methodIconContainer: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.primaryText,
    marginBottom: 2,
  },
  methodSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
  },
  subCardDivider: {
    height: 1,
    backgroundColor: "#35403B",
    marginVertical: 8,
  },
  changeCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  changeCardText: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primaryText,
    marginLeft: 8,
  },
  providerNote: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 4,
    lineHeight: 15,
  },
  noticeCard: {
    backgroundColor: colors.elevated,
    borderColor: "#35403B",
    borderWidth: 1,
    borderRadius: 14,
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
    fontSize: 11,
    lineHeight: 16,
    color: colors.secondaryText,
  },
  actionContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.background,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: "#35403B",
    borderWidth: 1,
    borderRadius: 12,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    color: colors.primaryText,
  },
  alternativeLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 4,
  },
  alternativeLinkText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
  },
  linkSeparator: {
    color: colors.secondaryText,
    fontSize: 12,
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
    lineHeight: 15,
  },
});
