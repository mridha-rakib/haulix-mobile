import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ContextCheckIcon } from "../../src/components/discovery/C15Icons";
import {
  C17CheckIcon,
  C17ChevronRightIcon,
  C17ContactIcon,
  C17LocationPinIcon,
  C17PickupAccessIcon,
  C17RuleShieldIcon,
  C17ServiceTypeIcon,
} from "../../src/components/discovery/C17Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  C15_DEMO_CONSTANTS,
  C15_SERVICES,
  type C15ServiceItem,
} from "../../src/fixtures/c15Services";
import {
  C17_DEFAULT_SAVED_ADDRESSES,
  type C17SavedAddress,
} from "../../src/fixtures/c17PickupAddress";

/**
 * Notice banner for truthful in-app disclosures
 */
function C17NoticeBanner({
  message,
  onDismiss,
  dismissLabel = "Dismiss",
}: {
  message: string;
  onDismiss: () => void;
  dismissLabel?: string;
}) {
  return (
    <View style={styles.noticeBox} testID="c17-notice-banner">
      <Text style={styles.noticeText}>{message}</Text>
      <Pressable
        onPress={onDismiss}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={dismissLabel}
        style={styles.noticeDismissButton}
        testID="c17-notice-dismiss"
      >
        <Text style={styles.noticeDismissText}>{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Step Indicator Chip (W02 · SERVICE DISCOVERY & INTAKE / C17)
 */
function C17StepChip({ stepIndicator, stepSub }: { stepIndicator: string; stepSub: string }) {
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
function C17Heading({
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

      <View style={styles.customerChip} testID="c17-customer-chip">
        <ContextCheckIcon size={17} color="#BAFF42" />
        <Text style={styles.customerChipText}>{customerChipText}</Text>
      </View>
    </View>
  );
}

/**
 * Saved Addresses Card Section
 */
function C17SavedAddressesSection({
  title,
  addresses,
  selectedAddressId,
  onSelectAddress,
  t,
}: {
  title: string;
  addresses: C17SavedAddress[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  t: (key: string) => string;
}) {
  return (
    <View style={styles.sectionCard} testID="c17-saved-addresses-section">
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
      </View>

      <View style={styles.addressListContainer}>
        {addresses.map((item) => {
          const isSelected = item.id === selectedAddressId;
          const translatedTitle = t(item.i18nTitleKey) || item.title;
          return (
            <Pressable
              key={item.id}
              testID={`c17-address-card-${item.id}`}
              style={[styles.addressCard, isSelected && styles.addressCardSelected]}
              onPress={() => onSelectAddress(item.id)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${translatedTitle}, ${item.fullAddress}`}
            >
              <View style={styles.addressIconWrap}>
                {isSelected ? (
                  <C17CheckIcon size={21} color="#BAFF42" />
                ) : (
                  <C17LocationPinIcon size={21} color="#ADB7B1" />
                )}
              </View>

              <View style={styles.addressContentCol}>
                <Text
                  style={[styles.addressItemTitle, isSelected && styles.addressItemTitleSelected]}
                >
                  {translatedTitle}
                </Text>
                <Text style={styles.addressItemSub}>{item.fullAddress}</Text>
              </View>

              <View style={styles.addressChevronWrap}>
                <C17ChevronRightIcon size={17} color={isSelected ? "#BAFF42" : "#687771"} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * Pickup Instructions Section
 */
function C17PickupInstructionsSection({
  title,
  contactLabel,
  contactValue,
  serviceTypeLabel,
  serviceTypeValue,
  accessLabel,
  accessValue,
}: {
  title: string;
  contactLabel: string;
  contactValue: string;
  serviceTypeLabel: string;
  serviceTypeValue: string;
  accessLabel: string;
  accessValue: string;
}) {
  return (
    <View style={styles.sectionCard} testID="c17-pickup-instructions-section">
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
      </View>

      <View style={styles.instructionsList}>
        <View style={styles.instructionRow} testID="c17-instruction-row-contact">
          <View style={styles.instructionIconWrap}>
            <C17ContactIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.instructionDivider} />
          <View style={styles.instructionTextCol}>
            <Text style={styles.instructionLabel}>{contactLabel}</Text>
            <Text style={styles.instructionValue}>{contactValue}</Text>
          </View>
        </View>

        <View style={styles.instructionRow} testID="c17-instruction-row-service">
          <View style={styles.instructionIconWrap}>
            <C17ServiceTypeIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.instructionDivider} />
          <View style={styles.instructionTextCol}>
            <Text style={styles.instructionLabel}>{serviceTypeLabel}</Text>
            <Text style={styles.instructionValue}>{serviceTypeValue}</Text>
          </View>
        </View>

        <View style={styles.instructionRow} testID="c17-instruction-row-access">
          <View style={styles.instructionIconWrap}>
            <C17PickupAccessIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.instructionDivider} />
          <View style={styles.instructionTextCol}>
            <Text style={styles.instructionLabel}>{accessLabel}</Text>
            <Text style={styles.instructionValue}>{accessValue}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Address Rule Section
 */
function C17AddressRuleSection({
  title,
  rule1,
  rule2,
}: {
  title: string;
  rule1: string;
  rule2: string;
}) {
  return (
    <View style={styles.sectionCard} testID="c17-address-rule-section">
      <View style={styles.sectionHeaderRow}>
        <View style={styles.sectionHeaderBadge}>
          <C17RuleShieldIcon size={18} color="#BAFF42" />
        </View>
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
      </View>

      <Text style={styles.ruleText}>{rule1}</Text>
      <Text style={styles.ruleText}>{rule2}</Text>
    </View>
  );
}

/**
 * Action CTAs
 */
function C17Actions({
  onConfirm,
  onAddAddress,
  onMovingDropoff,
  confirmLabel,
  addAddressLabel,
  movingDropoffLabel,
}: {
  onConfirm: () => void;
  onAddAddress: () => void;
  onMovingDropoff: () => void;
  confirmLabel: string;
  addAddressLabel: string;
  movingDropoffLabel: string;
}) {
  return (
    <View style={styles.actionsContainer}>
      <Pressable
        testID="c17-confirm-btn"
        style={styles.primaryLimeButton}
        onPress={onConfirm}
        accessibilityRole="button"
        accessibilityLabel={confirmLabel}
      >
        <Text style={styles.primaryLimeButtonText}>{confirmLabel}</Text>
      </Pressable>

      <Pressable
        testID="c17-add-address-btn"
        style={styles.secondaryDarkButton}
        onPress={onAddAddress}
        accessibilityRole="button"
        accessibilityLabel={addAddressLabel}
      >
        <Text style={styles.secondaryDarkButtonText}>{addAddressLabel}</Text>
      </Pressable>

      <Pressable
        testID="c17-moving-dropoff-btn"
        style={styles.secondaryDarkButton}
        onPress={onMovingDropoff}
        accessibilityRole="button"
        accessibilityLabel={movingDropoffLabel}
      >
        <Text style={styles.secondaryDarkButtonText}>{movingDropoffLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Footer Disclaimers
 */
function C17Footer({ footer1, footer2 }: { footer1: string; footer2: string }) {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{footer1}</Text>
      <Text style={styles.footerTextSecondary}>{footer2}</Text>
    </View>
  );
}

/**
 * Helper to resolve selected service with strict canonical catalog integrity.
 * Only the seven approved C15 services are accepted.
 * Unsupported or invalid IDs safely fall back to the canonical default service (Junk Removal).
 */
function resolveSelectedService(serviceParam?: string): {
  service: C15ServiceItem;
  isUnsupported: boolean;
} {
  if (serviceParam) {
    const match = C15_SERVICES.find((s) => s.id === serviceParam);
    if (match) {
      return { service: match, isUnsupported: false };
    }
    return { service: C15_SERVICES[0], isUnsupported: true };
  }
  return { service: C15_SERVICES[0], isUnsupported: false };
}

/**
 * Custom hook to manage customer profile data
 */
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
    return () => {
      isMounted = false;
    };
  }, [locale]);

  useEffect(() => {
    return subscribeToProfileEdits(() => {
      setProfile(getC10DemoProfile(locale));
    });
  }, [locale]);

  return profile;
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
 * C17 Choose Pickup Address Screen — English ONLY
 * Authoritative Figma: Node 382:576 (430 × 1413 px)
 */
export default function PickupAddressScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";
  const params = useLocalSearchParams<{
    service?: string;
    selectedAddressId?: string;
  }>();

  // Profile binding: dynamic profile (Sarah Mitchell or edited name/phone)
  const profile = useCustomerProfile(currentLocale);
  const bookingId = C15_DEMO_CONSTANTS.defaultBookingId;

  // Selected service resolution
  const resolved = useMemo(() => resolveSelectedService(params.service), [params.service]);
  const selectedService = resolved.service;
  const serviceDisplayName = t(selectedService.i18nTitleKey) || selectedService.name;

  // Saved addresses state (default to home)
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    params.selectedAddressId || C17_DEFAULT_SAVED_ADDRESSES[0].id
  );

  useEffect(() => {
    if (params.selectedAddressId) {
      setSelectedAddressId(params.selectedAddressId);
    }
  }, [params.selectedAddressId]);

  const [noticeMessage, setNoticeMessage] = useState<string | null>(() => {
    if (resolved.isUnsupported && params.service) {
      const template =
        t("c17.unsupportedServiceNotice") ||
        'The requested service "{{service}}" is not recognized. Defaulted to Junk Removal.';
      return template.replace("{{service}}", params.service);
    }
    return null;
  });

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/service-area",
        params: params.service ? { service: params.service } : undefined,
      });
    }
  }, [router, params.service]);

  useHardwareBack(handleBack);

  const handleDismissNotice = useCallback(() => {
    setNoticeMessage(null);
  }, []);

  const handleConfirm = useCallback(() => {
    setNoticeMessage(
      t("c17.noticeC18") || "Service intake (C18) is scheduled for an upcoming phase."
    );
  }, [t]);

  const handleAddAddress = useCallback(() => {
    router.push({
      pathname: "/add-pickup-address",
      params: {
        service: params.service,
        selectedAddressId,
      },
    });
  }, [router, params.service, selectedAddressId]);

  const handleMovingDropoff = useCallback(() => {
    // Navigates to C17-D Moving Destination (c17.noticeC17D was the prior phase placeholder)
    router.push({
      pathname: "/moving-destination",
      params: {
        service: selectedService.id,
        selectedAddressId,
      },
    });
  }, [router, selectedService.id, selectedAddressId]);

  const firstName = profile.name.trim().split(" ")[0] || "Sarah";
  const subtitle = useMemo(() => {
    const template =
      t("c17.subtitle") ||
      "Use {{name}}'s saved service address or enter a different Arizona pickup location.";
    return template.replace("{{name}}", firstName);
  }, [t, firstName]);

  const customerChipText = useMemo(() => {
    const template = t("c17.customerContext") || "{{name}} · {{bookingId}}";
    return template
      .replace("{{name}}", profile.name.toUpperCase())
      .replace("{{bookingId}}", bookingId);
  }, [t, profile.name]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack
        testID="c17-header-back"
        onBack={handleBack}
        backA11y={t("c17.backA11y") || "Back to service area"}
      />

      {noticeMessage && (
        <View style={styles.noticeContainer}>
          <C17NoticeBanner
            message={noticeMessage}
            onDismiss={handleDismissNotice}
            dismissLabel={t("c17.noticeDismiss") || "Dismiss"}
          />
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <C17StepChip
          stepIndicator={t("c17.stepIndicator") || "W02 · SERVICE DISCOVERY & INTAKE"}
          stepSub={t("c17.stepSub") || "/ C17"}
        />

        <C17Heading
          title={t("c17.title") || "Where should we collect?"}
          subtitle={subtitle}
          customerChipText={customerChipText}
        />

        <C17SavedAddressesSection
          title={t("c17.savedAddressesTitle") || "Saved addresses"}
          addresses={C17_DEFAULT_SAVED_ADDRESSES}
          selectedAddressId={selectedAddressId}
          onSelectAddress={setSelectedAddressId}
          t={t}
        />

        <C17PickupInstructionsSection
          title={t("c17.pickupInstructionsTitle") || "Pickup instructions"}
          contactLabel={t("c17.labelContact") || "Contact"}
          contactValue={`${profile.name} · ${profile.phone}`}
          serviceTypeLabel={t("c17.labelServiceType") || "Service type"}
          serviceTypeValue={serviceDisplayName}
          accessLabel={t("c17.labelPickupAccess") || "Pickup access"}
          accessValue={t("c17.pickupAccessValue") || "Residential driveway · Details to confirm"}
        />

        <C17AddressRuleSection
          title={t("c17.addressRuleTitle") || "Address rule"}
          rule1={t("c17.addressRule1") || "Pickup must be validated for active Arizona service."}
          rule2={
            t("c17.addressRule2") ||
            "A destination is added only when the selected service requires delivery."
          }
        />

        <C17Actions
          onConfirm={handleConfirm}
          onAddAddress={handleAddAddress}
          onMovingDropoff={handleMovingDropoff}
          confirmLabel={t("c17.confirmPickupCta") || "Confirm pickup address"}
          addAddressLabel={t("c17.addAddressCta") || "Add another address   ›"}
          movingDropoffLabel={t("c17.movingDropoffCta") || "Moving drop-off example   ›"}
        />

        <C17Footer
          footer1={
            t("c17.footerNoticeDemo") || "DEMO ONLY  ·  No confirmed booking, rates or payment"
          }
          footer2={
            t("c17.footerNoticeSrs") || "SRS  BK-02, CU-04, CU-09  ·  430 px / vertical scroll"
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
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#6F8577",
    marginLeft: 4,
  },

  // Screen Heading
  headingSection: {
    marginBottom: 16,
    gap: 12,
  },
  headingContainer: {
    gap: 6,
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    color: "#F6F8F6",
    letterSpacing: -0.5,
    lineHeight: 31,
  },
  subtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "#ADB7B1",
    lineHeight: 18,
  },
  customerChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A2510",
    borderWidth: 1,
    borderColor: "#2D3F1B",
    borderRadius: 10,
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

  // Section Cards (Reusable container style matching Figma & C16)
  sectionCard: {
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#222B27",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  sectionHeaderBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#16231C",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeaderTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#F6F8F6",
  },

  // Saved Addresses List
  addressListContainer: {
    gap: 10,
  },
  addressCard: {
    backgroundColor: colors.elevated, // #222827
    borderWidth: 1.5,
    borderColor: "#2D3533",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  addressCardSelected: {
    borderColor: colors.brand, // #BAFF42
    backgroundColor: "#16221A",
  },
  addressIconWrap: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  addressContentCol: {
    flex: 1,
    gap: 4,
  },
  addressItemTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: "#F6F8F6",
  },
  addressItemTitleSelected: {
    color: "#F6F8F6",
  },
  addressItemSub: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#ADB7B1",
    lineHeight: 15,
  },
  addressChevronWrap: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  // Pickup Instructions List
  instructionsList: {
    gap: 10,
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.elevated, // #222827
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#2D3533",
  },
  instructionIconWrap: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  instructionDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#333C38",
    marginHorizontal: 10,
  },
  instructionTextCol: {
    flex: 1,
    gap: 2,
  },
  instructionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#ADB7B1",
  },
  instructionValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: "#F6F8F6",
  },

  // Address Rule
  ruleText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#ADB7B1",
    lineHeight: 17,
    marginBottom: 8,
  },

  // Action CTAs
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryLimeButton: {
    minHeight: 52,
    backgroundColor: colors.brand, // #BAFF42
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    borderColor: "#35403B",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  secondaryDarkButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
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
    color: "#788580",
    textAlign: "center",
  },
  footerTextSecondary: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#5A6763",
    textAlign: "center",
  },
});
