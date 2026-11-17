import { colors, fontFamily } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ContextCheckIcon,
  ServiceApplianceIcon,
  ServiceFurnitureIcon,
  ServiceGarageIcon,
  ServiceMattressIcon,
  ServiceMovingIcon,
  ServiceStoreIcon,
} from "../../src/components/discovery/C15Icons";
import { C15SBackArrowIcon, C15SSelectedTruckIcon } from "../../src/components/discovery/C15SIcons";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  C15_DEMO_CONSTANTS,
  C15_SERVICES,
  type C15ServiceId,
  type C15ServiceItem,
} from "../../src/fixtures/c15Services";

/**
 * 1. Flow Header · Back (Figma Node 436:1976 / 436:2024)
 * Pinned at top outside ScrollView to guarantee visibility
 */
export function C15SFlowHeaderBack({
  onBack,
  backA11y = "Back to service discovery",
}: {
  onBack: () => void;
  backA11y?: string;
}) {
  return (
    <View style={styles.flowHeaderContainer}>
      <Pressable
        testID="c15s-header-back"
        style={styles.backCircleButton}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel={backA11y}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <C15SBackArrowIcon size={23} color="#F6F8F6" />
      </Pressable>

      <View style={styles.headerCenter}>
        <View style={styles.wordmarkRow}>
          <Text style={styles.wordmarkHaul}>HAUL</Text>
          <Text style={styles.wordmarkIx}>IX</Text>
          <Text style={styles.registeredMark}>®</Text>
        </View>
        <Text style={styles.taglineText}>We Haul It All.</Text>
      </View>

      {/* Symmetric spacer balancing back button for true center alignment */}
      <View style={styles.headerSpacer} pointerEvents="none" />
    </View>
  );
}

/**
 * Notice banner for truthful in-app disclosures
 */
function C15SNoticeBanner({
  message,
  onDismiss,
  dismissLabel = "Dismiss",
}: {
  message: string;
  onDismiss: () => void;
  dismissLabel?: string;
}) {
  return (
    <View style={styles.noticeBox} testID="c15s-notice-banner">
      <Text style={styles.noticeText}>{message}</Text>
      <Pressable
        onPress={onDismiss}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={dismissLabel}
        style={styles.noticeDismissButton}
        testID="c15s-notice-dismiss"
      >
        <Text style={styles.noticeDismissText}>{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * 2. Step Indicator Chip (Figma Node 382:249)
 */
function C15SStepChip({ stepIndicator, stepSub }: { stepIndicator: string; stepSub: string }) {
  return (
    <View style={styles.stepChipContainer}>
      <Text style={styles.stepChipLeft}>{stepIndicator}</Text>
      <Text style={styles.stepChipRight}>{stepSub}</Text>
    </View>
  );
}

/**
 * 3. Screen Heading (Figma Node 382:252)
 */
function C15SHeading({
  title,
  subtitle,
  customerName,
  bookingId,
}: {
  title: string;
  subtitle: string;
  customerName: string;
  bookingId: string;
}) {
  return (
    <View style={styles.headingSection}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <View style={styles.customerChip} testID="c15s-customer-chip">
        <ContextCheckIcon size={17} color="#BAFF42" />
        <Text
          style={styles.customerChipText}
        >{`${customerName.toUpperCase()} · ${bookingId}`}</Text>
      </View>
    </View>
  );
}

/**
 * Renders the service icon for the selected tile.
 * For junk-removal (Figma exemplar), uses the exact 31×31 truck icon from Figma I382:262;317:79.
 * For other services, reuses corresponding semantic icons.
 */
function SelectedTileIcon({ serviceId }: { serviceId: C15ServiceId }) {
  if (serviceId === "junk-removal") {
    return <C15SSelectedTruckIcon size={31} color="#BAFF42" />;
  }
  if (serviceId === "moving") {
    return <ServiceMovingIcon size={28} color="#BAFF42" />;
  }
  if (serviceId === "furniture-pickup") {
    return <ServiceFurnitureIcon size={28} color="#BAFF42" />;
  }
  if (serviceId === "appliance-removal") {
    return <ServiceApplianceIcon size={28} color="#BAFF42" />;
  }
  if (serviceId === "mattress-removal") {
    return <ServiceMattressIcon size={28} color="#BAFF42" />;
  }
  if (serviceId === "garage-cleanout") {
    return <ServiceGarageIcon size={28} color="#BAFF42" />;
  }
  if (serviceId === "store-pickup") {
    return <ServiceStoreIcon size={28} color="#BAFF42" />;
  }
  return <C15SSelectedTruckIcon size={31} color="#BAFF42" />;
}

/**
 * 4. Selected Service Card (Figma Node 382:259 / I382:262)
 */
function C15SSelectedServiceCard({
  service,
  sectionTitle,
  selectedBadge,
  noPriceNote,
  tileTitle,
  tileSubtitle,
}: {
  service: C15ServiceItem;
  sectionTitle: string;
  selectedBadge: string;
  noPriceNote: string;
  tileTitle: string;
  tileSubtitle: string;
}) {
  return (
    <View style={styles.selectedServiceCard} testID="c15s-selected-card">
      <Text style={styles.selectedSectionTitle}>{sectionTitle}</Text>

      {/* Inner selected tile with 2px lime stroke */}
      <View style={styles.innerSelectedTile} testID="c15s-inner-selected-tile">
        <View style={styles.tileHeaderRow}>
          <SelectedTileIcon serviceId={service.id} />
          <View style={styles.selectedBadgeContainer}>
            <Text style={styles.selectedBadgeText}>{selectedBadge}</Text>
          </View>
        </View>

        <View style={styles.tileTextContainer}>
          <Text style={styles.tileTitleText}>{tileTitle}</Text>
          <Text style={styles.tileSubtitleText}>{tileSubtitle}</Text>
        </View>
      </View>

      <Text style={styles.noPriceNoteText}>{noPriceNote}</Text>
    </View>
  );
}

/**
 * 5. How this booking works card (Figma Node 382:272)
 */
function C15SHowBookingWorksCard({
  heading,
  step1,
  step2,
  step3,
}: {
  heading: string;
  step1: string;
  step2: string;
  step3: string;
}) {
  return (
    <View style={styles.howBookingWorksCard} testID="c15s-how-booking-works-card">
      <Text style={styles.howHeadingText}>{heading}</Text>
      <View style={styles.stepsList}>
        <Text style={styles.stepText}>{step1}</Text>
        <Text style={styles.stepText}>{step2}</Text>
        <Text style={styles.stepText}>{step3}</Text>
      </View>
    </View>
  );
}

/**
 * 6. Action CTAs (Figma Node 382:278)
 */
function C15SActions({
  onContinue,
  onChangeService,
  continueText,
  changeServiceText,
}: {
  onContinue: () => void;
  onChangeService: () => void;
  continueText: string;
  changeServiceText: string;
}) {
  return (
    <View style={styles.actionsContainer}>
      {/* Primary CTA (Lime): Continue to service area */}
      <Pressable
        testID="c15s-continue-btn"
        style={styles.primaryLimeButton}
        onPress={onContinue}
        accessibilityRole="button"
        accessibilityLabel={continueText}
      >
        <Text style={styles.primaryLimeButtonText}>{continueText}</Text>
      </Pressable>

      {/* Secondary CTA (Dark): Change service › */}
      <Pressable
        testID="c15s-change-service-btn"
        style={styles.secondaryDarkButton}
        onPress={onChangeService}
        accessibilityRole="button"
        accessibilityLabel={changeServiceText}
      >
        <Text style={styles.secondaryDarkButtonText}>{changeServiceText}</Text>
      </Pressable>
    </View>
  );
}

/**
 * 7. Demo Footer Disclaimers (Figma Node 382:284)
 */
function C15SFooter({ footer1, footer2 }: { footer1: string; footer2: string }) {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{footer1}</Text>
      <Text style={styles.footerTextSecondary}>{footer2}</Text>
    </View>
  );
}

/**
 * Header section subcomponent (Step Chip, Heading)
 */
function C15SHeaderSection({
  stepIndicator,
  stepSub,
  title,
  subtitle,
  customerName,
  bookingId,
}: {
  stepIndicator: string;
  stepSub: string;
  title: string;
  subtitle: string;
  customerName: string;
  bookingId: string;
}) {
  return (
    <>
      <C15SStepChip stepIndicator={stepIndicator} stepSub={stepSub} />
      <C15SHeading
        title={title}
        subtitle={subtitle}
        customerName={customerName}
        bookingId={bookingId}
      />
    </>
  );
}

/**
 * Helper to resolve selected service with fallback to labeled Junk Removal fixture
 */
function resolveSelectedService(serviceParam?: string): C15ServiceItem {
  if (serviceParam) {
    const match = C15_SERVICES.find((s) => s.id === serviceParam);
    if (match) return match;
  }
  return C15_SERVICES[0];
}

/**
 * Custom hook to manage customer profile data and subscription
 */
function useCustomerProfile(locale: "en" | "es") {
  const [customerName, setCustomerName] = useState(() => getC10DemoProfile(locale).name);

  useEffect(() => {
    loadProfileEdits(locale).then(() => {
      setCustomerName(getC10DemoProfile(locale).name);
    });
    return subscribeToProfileEdits(() => {
      setCustomerName(getC10DemoProfile(locale).name);
    });
  }, [locale]);

  return customerName;
}

/**
 * Custom hook for Android hardware back button
 */
function useHardwareBack(onBack: () => void) {
  useEffect(() => {
    const onBackPress = () => {
      onBack();
      return true;
    };
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [onBack]);
}

interface ServiceSelectedCopy {
  title: string;
  subtitle: string;
  tileSubtitle: string;
}

function resolveServiceCopy(
  selectedService: C15ServiceItem,
  t: (k: string) => string,
  bookingId: string
): ServiceSelectedCopy {
  const isJunk = selectedService.id === "junk-removal";
  const title = t(selectedService.i18nTitleKey) || selectedService.name;
  const tileSubtitle = isJunk
    ? t("c15s.defaultTileSubtitle") || "Non-hazardous junk and bulky-item pickup"
    : t(selectedService.i18nSubtitleKey) || selectedService.subtitle;

  const subtitleTemplate =
    t("c15s.subtitle") ||
    "Selected for booking {{bookingId}}. Confirm where the crew will collect your items.";

  return {
    title,
    subtitle: subtitleTemplate.replace("{{bookingId}}", bookingId),
    tileSubtitle,
  };
}

/**
 * Layout and sections wrapper for C15-S screen
 */
function C15SScreenContent({
  selectedService,
  customerName,
  onChangeService,
  onContinue,
  t,
}: {
  selectedService: C15ServiceItem;
  customerName: string;
  onChangeService: () => void;
  onContinue: () => void;
  t: (key: string) => string;
}) {
  const bookingId = C15_DEMO_CONSTANTS.defaultBookingId;
  const copy = resolveServiceCopy(selectedService, t, bookingId);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <C15SHeaderSection
        stepIndicator={t("c15s.stepIndicator") || "W02 · SERVICE DISCOVERY & INTAKE"}
        stepSub={t("c15s.stepSub") || "/ C15-S"}
        title={copy.title}
        subtitle={copy.subtitle}
        customerName={customerName}
        bookingId={bookingId}
      />

      <C15SSelectedServiceCard
        service={selectedService}
        sectionTitle={t("c15s.selectedServiceTitle") || "Selected service"}
        selectedBadge={t("c15s.selectedBadge") || "SELECTED"}
        noPriceNote={t("c15s.noPriceNote") || "Illustrative draft · No price calculated yet"}
        tileTitle={copy.title}
        tileSubtitle={copy.tileSubtitle}
      />

      <C15SHowBookingWorksCard
        heading={t("c15s.howBookingWorksTitle") || "How this booking works"}
        step1={t("c15s.step1") || "1. Confirm eligible Arizona pickup address"}
        step2={t("c15s.step2") || "2. Describe items, access and upload supporting photos"}
        step3={t("c15s.step3") || "3. Review corrected AI suggestions in W03 before a quote"}
      />

      <C15SActions
        onContinue={onContinue}
        onChangeService={onChangeService}
        continueText={t("c15s.continueCta") || "Continue to service area"}
        changeServiceText={t("c15s.changeServiceCta") || "Change service   ›"}
      />

      <C15SFooter
        footer1={
          t("c15s.footerNoticeDemo") || "DEMO ONLY  ·  No confirmed booking, rates or payment"
        }
        footer2={
          t("c15s.footerNoticeSrs") || "SRS  BK-01, BK-02, SV-01  ·  430 px / vertical scroll"
        }
      />
    </ScrollView>
  );
}

/**
 * C15-S Service Selected Screen — English ONLY
 * Authoritative Figma: Node 382:241 (430 × 1015 px)
 */
export default function ServiceSelectedScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLocale = (getCurrentLocale() as "en" | "es") || "en";
  const params = useLocalSearchParams<{ service?: string }>();

  // Profile binding: Sarah Mitchell for English (or saved local edits)
  const customerName = useCustomerProfile(currentLocale);

  // Selected service resolution with fallback to labeled Junk Removal fixture
  const selectedService = useMemo(() => resolveSelectedService(params.service), [params.service]);

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBackToC15 = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/service-discovery",
        params: { service: selectedService.id },
      });
    }
  }, [router, selectedService.id]);

  const handleChangeService = useCallback(() => {
    router.replace({
      pathname: "/service-discovery",
      params: { service: selectedService.id },
    });
  }, [router, selectedService.id]);

  const handleContinue = useCallback(() => {
    router.push({
      pathname: "/service-area",
      params: { service: selectedService.id },
    });
  }, [router, selectedService.id]);

  const handleDismissNotice = useCallback(() => {
    setNoticeMessage(null);
  }, []);

  // Hardware back button handler for Android
  useHardwareBack(handleBackToC15);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <C15SFlowHeaderBack
        onBack={handleBackToC15}
        backA11y={t("c15s.backA11y") || "Back to service discovery"}
      />
      {noticeMessage && (
        <View style={styles.noticeContainer}>
          <C15SNoticeBanner
            message={noticeMessage}
            onDismiss={handleDismissNotice}
            dismissLabel={t("common.dismiss") || "Dismiss"}
          />
        </View>
      )}
      <C15SScreenContent
        selectedService={selectedService}
        customerName={customerName}
        onChangeService={handleChangeService}
        onContinue={handleContinue}
        t={t}
      />
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  noticeContainer: {
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
  },

  // 1. Flow Header · Back (436:1976)
  flowHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 12,
    height: 56,
    backgroundColor: colors.background,
    zIndex: 20,
    elevation: 4,
  },
  backCircleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerSpacer: {
    width: 42,
    height: 42,
  },
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 1,
  },
  wordmarkHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primaryText, // #F6F8F6
    letterSpacing: -0.5,
  },
  wordmarkIx: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.brand, // #BAFF42
    letterSpacing: -0.5,
  },
  registeredMark: {
    fontFamily: fontFamily.semiBold,
    fontSize: 9,
    color: colors.brand,
    marginLeft: 2,
    transform: [{ translateY: -6 }],
  },
  taglineText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText, // #8E9B95
    marginTop: 1,
  },

  // Notice Banner
  noticeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#16231C",
    borderWidth: 1,
    borderColor: "#2B4734",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 10,
  },
  noticeText: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "#E2F0E7",
    lineHeight: 17,
  },
  noticeDismissButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#1E3326",
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },

  // 2. Step Chip (382:249)
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#101614",
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 17,
    paddingHorizontal: 14,
    height: 34,
    marginBottom: 16,
  },
  stepChipLeft: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.6,
  },
  stepChipRight: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#687771",
  },

  // 3. Heading & Context Chip (382:252 / 382:255)
  headingSection: {
    marginBottom: 18,
    gap: 14,
  },
  headingContainer: {
    gap: 6,
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.primaryText,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  customerChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101913",
    borderWidth: 1,
    borderColor: "#1F3322",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
    alignSelf: "flex-start",
  },
  customerChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.5,
  },

  // 4. Selected Service Card (382:259)
  selectedServiceCard: {
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  selectedSectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primaryText,
    marginBottom: 12,
  },
  innerSelectedTile: {
    minHeight: 121,
    backgroundColor: "#101614",
    borderWidth: 2,
    borderColor: colors.brand, // #BAFF42
    borderRadius: 14,
    padding: 14,
    justifyContent: "space-between",
  },
  tileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  selectedBadgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "rgba(186, 255, 66, 0.12)",
  },
  selectedBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.8,
  },
  tileTextContainer: {
    gap: 4,
  },
  tileTitleText: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: colors.primaryText,
  },
  tileSubtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  noPriceNoteText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 10,
    paddingHorizontal: 4,
  },

  // 5. How this booking works card (382:272)
  howBookingWorksCard: {
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  howHeadingText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primaryText,
    marginBottom: 12,
  },
  stepsList: {
    gap: 8,
  },
  stepText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "#C8D2CD",
    lineHeight: 19,
  },

  // 6. Action CTAs (382:278)
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryLimeButton: {
    height: 54,
    backgroundColor: colors.brand, // #BAFF42
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primaryLimeButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: "#080D0C",
  },
  secondaryDarkButton: {
    height: 54,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  secondaryDarkButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.brand,
  },

  // 7. Footer (382:284)
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 12,
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#687771",
    textAlign: "center",
  },
  footerTextSecondary: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#4B5752",
    textAlign: "center",
  },
});
