import { colors, fontFamily, radius } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C17VAlertIcon, C17VCheckIcon } from "../../src/components/discovery/C17Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C17_DEFAULT_SAVED_ADDRESSES } from "../../src/fixtures/c17PickupAddress";

const DEFAULT_BOOKING_ID = "HX-DEMO-1027";

export interface C17VParams {
  service?: string;
  selectedAddressId?: string;
  label?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  pickupNotes?: string;
}

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  const [prevLocale, setPrevLocale] = useState(locale);

  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setProfile(getC10DemoProfile(locale));
  }

  useEffect(() => {
    let isMounted = true;
    loadProfileEdits(locale).then(() => {
      if (isMounted) {
        setProfile(getC10DemoProfile(locale));
      }
    });

    const unsubscribe = subscribeToProfileEdits(() => {
      if (isMounted) {
        setProfile(getC10DemoProfile(locale));
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [locale]);

  return profile;
}

function useHardwareBack(onBack: () => void) {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);
}

/**
 * 1. Step Indicator Chip
 * W02 · SERVICE DISCOVERY & INTAKE / C17-V
 */
function C17VStepChip({ indicator, sub }: { indicator: string; sub: string }) {
  return (
    <View style={styles.stepChip} accessibilityRole="text">
      <Text style={styles.stepChipIndicator}>{indicator}</Text>
      <Text style={styles.stepChipSub}> {sub}</Text>
    </View>
  );
}

/**
 * 2. Heading Section
 */
function C17VHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.headingContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
  );
}

/**
 * 3. Customer Booking Context Chip
 */
function C17VCustomerChip({ contextText }: { contextText: string }) {
  return (
    <View
      style={styles.customerChip}
      accessibilityRole="text"
      accessibilityLabel={`Customer: ${contextText}`}
      testID="c17v-customer-chip"
    >
      <C17VCheckIcon size={17} color={colors.brand} />
      <Text style={styles.customerChipText}>{contextText}</Text>
    </View>
  );
}

/**
 * 4. Section Card: Location verification incomplete
 */
function C17VVerificationCard({
  heading,
  badgeText,
  guidance,
  warning,
}: {
  heading: string;
  badgeText: string;
  guidance: string;
  warning: string;
}) {
  return (
    <View style={styles.card} testID="c17v-card">
      <Text style={styles.cardHeading}>{heading}</Text>
      <View style={styles.statusBadge} testID="c17v-status-badge">
        <C17VAlertIcon size={18} color="#F36D6D" />
        <Text style={styles.statusBadgeText}>{badgeText}</Text>
      </View>
      <Text style={styles.guidanceText}>{guidance}</Text>
      <Text style={styles.warningText}>{warning}</Text>
    </View>
  );
}

/**
 * 5. Action Buttons (Edit address details / Use verified home address)
 */
function C17VActions({
  onEditAddress,
  onUseHome,
  editLabel,
  useHomeLabel,
}: {
  onEditAddress: () => void;
  onUseHome: () => void;
  editLabel: string;
  useHomeLabel: string;
}) {
  return (
    <View style={styles.actionsContainer}>
      <Pressable
        style={styles.primaryCta}
        onPress={onEditAddress}
        accessibilityRole="button"
        accessibilityLabel={editLabel}
        testID="c17v-primary-edit-cta"
      >
        <Text style={styles.primaryCtaText}>{editLabel}</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryCta}
        onPress={onUseHome}
        accessibilityRole="button"
        accessibilityLabel={useHomeLabel}
        testID="c17v-secondary-use-home-cta"
      >
        <Text style={styles.secondaryCtaText}>{useHomeLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * 6. Footer Disclaimers
 */
function C17VFooter({ demoText, srsText }: { demoText: string; srsText: string }) {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{demoText}</Text>
      <Text style={styles.footerText}>{srsText}</Text>
    </View>
  );
}

/**
 * C17-V Address Validation Error Screen (English ONLY)
 *
 * Authoritative Figma: Node 382:708 (430 × 794 px)
 * Flow Context: W02 Service Discovery & Intake / C17-V [BK-02, SV-12]
 */
export default function PickupAddressValidationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLocale = getCurrentLocale();
  const params = useLocalSearchParams<{
    service?: string;
    selectedAddressId?: string;
    label?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    pickupNotes?: string;
  }>();

  // Dynamic customer profile with locale isolation (Sarah Mitchell for EN / Bryan Lopez for ES)
  const profile = useCustomerProfile(currentLocale);

  const customerChipText = useMemo(() => {
    const template = t("c17v.customerContext") || "{{name}} · {{bookingId}}";
    const name =
      currentLocale === "es" && profile.name === "Bryan Lopez"
        ? "BRYAN LOPEZ MENDOZA"
        : profile.name.toUpperCase();
    return template.replace("{{name}}", name).replace("{{bookingId}}", DEFAULT_BOOKING_ID);
  }, [t, currentLocale, profile.name]);

  // Primary Action: Edit address details -> return to C17-A with draft values intact
  const handleEditAddress = useCallback(() => {
    router.push({
      pathname: "/add-pickup-address",
      params: {
        service: params.service,
        selectedAddressId: params.selectedAddressId,
        label: params.label,
        street: params.street,
        city: params.city,
        state: params.state,
        zipCode: params.zipCode,
        pickupNotes: params.pickupNotes,
      },
    });
  }, [router, params]);

  // Secondary Action: Use verified home address -> return to C17 with Home selected
  const handleUseHome = useCallback(() => {
    router.replace({
      pathname: "/pickup-address",
      params: {
        service: params.service,
        selectedAddressId: C17_DEFAULT_SAVED_ADDRESSES[0].id,
      },
    });
  }, [router, params.service]);

  // Header Back: Navigate back to C17-A if possible, else fallback safely
  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      handleEditAddress();
    }
  }, [router, handleEditAddress]);

  useHardwareBack(handleBack);

  return (
    <HaulixSafeArea>
      <View style={styles.screenRoot}>
        {/* Pinned Flow Header outside scroll area */}
        <FlowHeaderBack onBack={handleBack} testID="c17v-back-button" />

        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c17v-screen"
        >
          {/* 1. Step Indicator Chip */}
          <C17VStepChip
            indicator={t("c17v.stepIndicator") || "W02 · SERVICE DISCOVERY & INTAKE"}
            sub={t("c17v.stepSub") || "/ C17-V"}
          />

          {/* 2. Screen Heading */}
          <C17VHeading
            title={t("c17v.title") || "Review pickup details"}
            subtitle={
              t("c17v.subtitle") ||
              "The address cannot be used until the required location fields are confirmed."
            }
          />

          {/* 3. Customer Booking Context Chip */}
          <C17VCustomerChip contextText={customerChipText} />

          {/* 4. Section Card */}
          <C17VVerificationCard
            heading={t("c17v.cardHeading") || "Location verification incomplete"}
            badgeText={t("c17v.statusBadge") || "Action required"}
            guidance={
              t("c17v.guidance") ||
              "Confirm street, city, state, ZIP and eligible service coverage."
            }
            warning={
              t("c17v.warning") || "Do not continue to quoting with an unresolved pickup location."
            }
          />

          {/* 5. Action Buttons */}
          <C17VActions
            onEditAddress={handleEditAddress}
            onUseHome={handleUseHome}
            editLabel={t("c17v.editAddressCta") || "Edit address details"}
            useHomeLabel={t("c17v.useHomeCta") || "Use verified home address   ›"}
          />

          {/* 6. Footer Disclaimers */}
          <C17VFooter
            demoText={
              t("c17v.footerDemo") || "DEMO ONLY  ·  No confirmed booking, rates or payment"
            }
            srsText={t("c17v.footerSrs") || "SRS  BK-02, SV-12  ·  430 px / vertical scroll"}
          />
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 36,
    gap: 17,
  },
  stepChip: {
    backgroundColor: colors.surface,
    height: 33,
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  stepChipIndicator: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
    textTransform: "uppercase",
  },
  stepChipSub: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: "#ADB7B1",
  },
  headingContainer: {
    gap: 9,
    alignSelf: "stretch",
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 30,
    color: colors.primaryText,
  },
  subtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: "#ADB7B1",
  },
  customerChip: {
    backgroundColor: "#1A2510",
    height: 39,
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    alignSelf: "stretch",
  },
  customerChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: 17,
    padding: 16,
    gap: 13,
    alignSelf: "stretch",
  },
  cardHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.primaryText,
  },
  statusBadge: {
    backgroundColor: colors.elevated,
    borderRadius: 8,
    height: 32,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
  },
  statusBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: "#ADB7B1",
  },
  guidanceText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.primaryText,
  },
  warningText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.primaryText,
  },
  actionsContainer: {
    gap: 11,
    marginTop: 4,
    alignSelf: "stretch",
  },
  primaryCta: {
    backgroundColor: colors.brand,
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignSelf: "stretch",
  },
  primaryCtaText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.background,
  },
  secondaryCta: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    height: 56,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignSelf: "stretch",
  },
  secondaryCtaText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerContainer: {
    marginTop: 8,
    gap: 10,
    alignItems: "center",
    alignSelf: "stretch",
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
    textAlign: "center",
  },
});
