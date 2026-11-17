import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ContextCheckIcon } from "../../src/components/discovery/C15Icons";
import {
  C16BuildingsIcon,
  C16CrosshairIcon,
  C16DemoCheckIcon,
  C16HomeIcon,
  C16InfoCircleIcon,
  C16LocationPinIcon,
  C16MapFoldIcon,
  C16PostalEnvelopeIcon,
  C16ShieldCheckIcon,
  C16SwapArrowsIcon,
} from "../../src/components/discovery/C16Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C15_DEMO_CONSTANTS } from "../../src/fixtures/c15Services";
import { C16_DEMO_ADDRESS, type C16PickupAddress } from "../../src/fixtures/c16ServiceArea";

/**
 * Notice banner for truthful in-app disclosures
 */
function C16NoticeBanner({
  message,
  onDismiss,
  dismissLabel = "Dismiss",
}: {
  message: string;
  onDismiss: () => void;
  dismissLabel?: string;
}) {
  return (
    <View style={styles.noticeBox} testID="c16-notice-banner">
      <Text style={styles.noticeText}>{message}</Text>
      <Pressable
        onPress={onDismiss}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={dismissLabel}
        style={styles.noticeDismissButton}
        testID="c16-notice-dismiss"
      >
        <Text style={styles.noticeDismissText}>{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Step Indicator Chip (W02 · SERVICE DISCOVERY & INTAKE / C16)
 */
function C16StepChip({ stepIndicator, stepSub }: { stepIndicator: string; stepSub: string }) {
  return (
    <View style={styles.stepChipContainer}>
      <Text style={styles.stepChipLeft}>{stepIndicator}</Text>
      <Text style={styles.stepChipRight}>{stepSub}</Text>
    </View>
  );
}

/**
 * Screen Heading & Subtitle
 */
function C16Heading({
  title,
  subtitle,
  customerChipText,
}: {
  title: string;
  subtitle: string;
  customerChipText: string;
}) {
  return (
    <View style={styles.headingSection}>
      <View style={styles.headingContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <View style={styles.customerChip} testID="c16-customer-chip">
        <ContextCheckIcon size={17} color="#BAFF42" />
        <Text style={styles.customerChipText}>{customerChipText}</Text>
      </View>
    </View>
  );
}

/**
 * Single Address Detail Row with leading icon and vertical divider
 */
function AddressItemRow({
  icon,
  label,
  value,
  testID,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  testID?: string;
}) {
  return (
    <View style={styles.addressItemRow} testID={testID}>
      <View style={styles.addressIconWrap}>{icon}</View>
      <View style={styles.addressDivider} />
      <View style={styles.addressTextCol}>
        <Text style={styles.addressLabel}>{label}</Text>
        <Text style={styles.addressValue}>{value}</Text>
      </View>
    </View>
  );
}

/**
 * Requested pickup region Card with 4 address items
 */
function C16PickupRegionCard({
  address,
  labels,
}: {
  address: C16PickupAddress;
  labels: {
    title: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}) {
  return (
    <View style={styles.regionCard} testID="c16-pickup-region-card">
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardHeaderBadge}>
          <C16LocationPinIcon size={18} color="#BAFF42" />
        </View>
        <Text style={styles.cardHeaderTitle}>{labels.title}</Text>
      </View>

      <AddressItemRow
        icon={<C16HomeIcon size={20} color="#BAFF42" />}
        label={labels.street}
        value={address.street}
        testID="c16-address-street"
      />
      <AddressItemRow
        icon={<C16BuildingsIcon size={20} color="#BAFF42" />}
        label={labels.city}
        value={address.city}
        testID="c16-address-city"
      />
      <AddressItemRow
        icon={<C16MapFoldIcon size={20} color="#BAFF42" />}
        label={labels.state}
        value={address.state}
        testID="c16-address-state"
      />
      <AddressItemRow
        icon={<C16PostalEnvelopeIcon size={20} color="#BAFF42" />}
        label={labels.zip}
        value={address.zipCode}
        testID="c16-address-zip"
      />
    </View>
  );
}

/**
 * Arizona request – Demo eligible Card
 */
function C16EligibilityCard({
  labels,
}: {
  labels: {
    title: string;
    demoStatus: string;
    candidateArea: string;
    notice: string;
  };
}) {
  return (
    <View style={styles.eligibilityCard} testID="c16-eligibility-card">
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardHeaderBadge}>
          <C16ShieldCheckIcon size={18} color="#BAFF42" />
        </View>
        <Text style={styles.cardHeaderTitle}>{labels.title}</Text>
      </View>

      <View style={styles.statusRibbon} testID="c16-status-ribbon">
        <C16DemoCheckIcon size={16} color="#BAFF42" />
        <Text style={styles.statusRibbonText}>{labels.demoStatus}</Text>
      </View>

      <Text style={styles.candidateAreaText}>{labels.candidateArea}</Text>
      <Text style={styles.eligibilityNoticeText}>{labels.notice}</Text>
    </View>
  );
}

/**
 * 4 Icon-led CTAs
 */
function C16ActionButtons({
  onUseLocation,
  onChangeLocation,
  onOutsideZone,
  onPermissionHelp,
  labels,
}: {
  onUseLocation: () => void;
  onChangeLocation: () => void;
  onOutsideZone: () => void;
  onPermissionHelp: () => void;
  labels: {
    useLocation: string;
    changeLocation: string;
    outsideZone: string;
    permissionHelp: string;
  };
}) {
  return (
    <View style={styles.actionsContainer}>
      <Pressable
        testID="c16-use-location-btn"
        style={styles.primaryLimeButton}
        onPress={onUseLocation}
        accessibilityRole="button"
        accessibilityLabel={labels.useLocation}
      >
        <C16LocationPinIcon size={20} color="#080D0C" />
        <Text style={styles.primaryLimeButtonText}>{labels.useLocation}</Text>
      </Pressable>

      <Pressable
        testID="c16-change-location-btn"
        style={styles.secondaryDarkButton}
        onPress={onChangeLocation}
        accessibilityRole="button"
        accessibilityLabel={labels.changeLocation}
      >
        <C16SwapArrowsIcon size={20} color="#BAFF42" />
        <Text style={styles.secondaryDarkButtonText}>{labels.changeLocation}</Text>
      </Pressable>

      <Pressable
        testID="c16-outside-zone-btn"
        style={styles.secondaryDarkButton}
        onPress={onOutsideZone}
        accessibilityRole="button"
        accessibilityLabel={labels.outsideZone}
      >
        <C16CrosshairIcon size={20} color="#BAFF42" />
        <Text style={styles.secondaryDarkButtonText}>{labels.outsideZone}</Text>
      </Pressable>

      <Pressable
        testID="c16-permission-help-btn"
        style={styles.secondaryDarkButton}
        onPress={onPermissionHelp}
        accessibilityRole="button"
        accessibilityLabel={labels.permissionHelp}
      >
        <C16InfoCircleIcon size={20} color="#BAFF42" />
        <Text style={styles.secondaryDarkButtonText}>{labels.permissionHelp}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Footer Disclaimers
 */
function C16Footer({ footer1, footer2 }: { footer1: string; footer2: string }) {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{footer1}</Text>
      <Text style={styles.footerTextSecondary}>{footer2}</Text>
    </View>
  );
}

/**
 * Custom hook to manage customer profile data
 */
function useCustomerProfile(locale: "en" | "es") {
  const [customerName, setCustomerName] = useState(() => getC10DemoProfile(locale).name);
  const [prevLocale, setPrevLocale] = useState(locale);

  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setCustomerName(getC10DemoProfile(locale).name);
  }

  useEffect(() => {
    let isMounted = true;
    loadProfileEdits(locale).then(() => {
      if (isMounted) {
        setCustomerName(getC10DemoProfile(locale).name);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  useEffect(() => {
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

/**
 * C16 Service Area Eligibility Screen — English & Spanish
 * Authoritative Figma:
 *   - English: Node 382:323 (430 × 1314 px)
 *   - Spanish: Node 974:9079 (430 × 1314 px)
 * Premium Visual Target: references/OWNER_C16_PREMIUM_TARGET.png
 */
export default function ServiceAreaScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";
  const params = useLocalSearchParams<{ service?: string }>();

  // Profile binding: Sarah Mitchell for English, Bryan Lopez for Spanish (or saved local edits)
  const customerName = useCustomerProfile(currentLocale);
  const bookingId = C15_DEMO_CONSTANTS.defaultBookingId;

  const customerChipText = useMemo(() => {
    const template =
      t("c16.customerContext") ||
      (currentLocale === "es" ? "{{name}} · {{bookingId}}" : "{{name}} – {{bookingId}}");
    return template
      .replace("{{name}}", customerName.toUpperCase())
      .replace("{{bookingId}}", bookingId);
  }, [t, currentLocale, customerName]);

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/service-selected",
        params: params.service ? { service: params.service } : undefined,
      });
    }
  }, [router, params.service]);

  useHardwareBack(handleBack);

  const handleDismissNotice = useCallback(() => {
    setNoticeMessage(null);
  }, []);

  const handleUseLocation = useCallback(() => {
    router.push({
      pathname: "/pickup-address",
      params: params.service ? { service: params.service } : undefined,
    });
  }, [router, params.service]);

  const handleChangeLocation = useCallback(() => {
    setNoticeMessage(
      t("c16.noticeC16V") || "Location checking (C16-V) is scheduled for an upcoming phase."
    );
  }, [t]);

  const handleOutsideZone = useCallback(() => {
    setNoticeMessage(
      t("c16.noticeC16F") ||
        "Outside launch area response (C16-F) is scheduled for an upcoming phase."
    );
  }, [t]);

  const handlePermissionHelp = useCallback(() => {
    setNoticeMessage(
      t("c16.noticeC16P") || "Location permissions help (C16-P) is scheduled for an upcoming phase."
    );
  }, [t]);

  const addressLabels = useMemo(
    () => ({
      title: t("c16.regionCardTitle") || "Requested pickup region",
      street: t("c16.labelStreet") || "Street address",
      city: t("c16.labelCity") || "City",
      state: t("c16.labelState") || "State",
      zip: t("c16.labelZip") || "ZIP code",
    }),
    [t]
  );

  const eligibilityLabels = useMemo(
    () => ({
      title: t("c16.eligibilityTitle") || "Arizona request – Demo eligible",
      demoStatus: t("c16.demoStatus") || "Completed in this demo",
      candidateArea: t("c16.candidateArea") || "Phoenix, AZ 85014 – Candidate service area",
      notice:
        t("c16.eligibilityNotice") ||
        "Final location eligibility and capacity are validated before dispatch.",
    }),
    [t]
  );

  const actionLabels = useMemo(
    () => ({
      useLocation: t("c16.useLocationCta") || "Use this location",
      changeLocation: t("c16.changeLocationCta") || "Choose another location   ›",
      outsideZone: t("c16.outsideZoneCta") || "See outside-zone response   ›",
      permissionHelp: t("c16.permissionHelpCta") || "Location permission help   ›",
    }),
    [t]
  );

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack
        testID="c16-header-back"
        onBack={handleBack}
        backA11y={t("c16.backA11y") || "Back"}
      />

      {noticeMessage && (
        <View style={styles.noticeContainer}>
          <C16NoticeBanner
            message={noticeMessage}
            onDismiss={handleDismissNotice}
            dismissLabel={t("c16.noticeDismiss") || t("common.dismiss") || "Dismiss"}
          />
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <C16StepChip
          stepIndicator={t("c16.stepIndicator") || "W02 · SERVICE DISCOVERY & INTAKE"}
          stepSub={t("c16.stepSub") || "/ C16"}
        />

        <C16Heading
          title={t("c16.title") || "Check your service area"}
          subtitle={
            t("c16.subtitle") ||
            "Arizona is the only launch state. Availability depends on the exact address and service."
          }
          customerChipText={customerChipText}
        />

        <C16PickupRegionCard address={C16_DEMO_ADDRESS} labels={addressLabels} />

        <C16EligibilityCard labels={eligibilityLabels} />

        <C16ActionButtons
          onUseLocation={handleUseLocation}
          onChangeLocation={handleChangeLocation}
          onOutsideZone={handleOutsideZone}
          onPermissionHelp={handlePermissionHelp}
          labels={actionLabels}
        />

        <C16Footer
          footer1={
            t("c16.footerNoticeDemo") || "DEMO ONLY – No confirmed booking, rates or payment"
          }
          footer2={
            t("c16.footerNoticeSrs") || "SRS BK-01, BK-02, SV-08, SV-12 · 430 px / vertical scroll"
          }
        />
      </ScrollView>
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
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
  },

  // Step Chip
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101913",
    borderWidth: 1,
    borderColor: "#1F3322",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  stepChipLeft: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  stepChipRight: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    opacity: 0.8,
    marginLeft: 4,
  },

  // Heading Section
  headingSection: {
    marginBottom: 18,
    gap: 12,
  },
  headingContainer: {
    gap: 6,
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.primaryText,
    letterSpacing: -0.4,
  },
  subtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#8FA397",
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

  // Requested Pickup Region Card
  regionCard: {
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  cardHeaderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeaderTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primaryText,
  },
  addressItemRow: {
    backgroundColor: "#101614",
    borderWidth: 1,
    borderColor: "#1E2723",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addressIconWrap: {
    width: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  addressDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#222B27",
    marginHorizontal: 12,
  },
  addressTextCol: {
    flex: 1,
    gap: 2,
  },
  addressLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#8FA397",
  },
  addressValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.primaryText,
  },

  // Eligibility Card
  eligibilityCard: {
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  statusRibbon: {
    backgroundColor: "#101913",
    borderWidth: 1,
    borderColor: "#1F3322",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  statusRibbonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  candidateAreaText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: "#C8D2CD",
    marginBottom: 6,
  },
  eligibilityNoticeText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#8FA397",
    lineHeight: 17,
  },

  // Action CTAs
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryLimeButton: {
    minHeight: 54,
    backgroundColor: colors.brand, // #BAFF42
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  primaryLimeButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: "#080D0C",
  },
  secondaryDarkButton: {
    minHeight: 54,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  secondaryDarkButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.brand,
  },

  // Footer
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
