import { colors, fontFamily, radius } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C18MCheckIcon,
  C18MCrewShieldIcon,
  C18MDropoffPinIcon,
  C18MInventoryIcon,
  C18MLargeItemsIcon,
  C18MPackageIcon,
  C18MPickupPinIcon,
  C18MReviewCheckIcon,
  C18MRouteIcon,
  C18MScopeIcon,
  C18MStairsIcon,
  C18MUserIcon,
  C18MWeightIcon,
} from "../../src/components/discovery/C18MIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C15_SERVICES, type C15ServiceId } from "../../src/fixtures/c15Services";
import { C17_DEFAULT_SAVED_ADDRESSES } from "../../src/fixtures/c17PickupAddress";
import {
  C18M_DEFAULT_INVENTORY,
  C18M_DEFAULT_ROUTE,
  C18M_DEMO_CONSTANTS,
  type C18MInventoryData,
  type C18MRouteData,
} from "../../src/fixtures/c18mMovingIntake";

export interface C18MParams {
  service?: string;
  selectedAddressId?: string;
  pickupAddress?: string;
  destinationAddress?: string;
  destinationCityStateZip?: string;
  destinationType?: string;
  elevator?: string;
  customer?: string;
  largeItems?: string;
  estimatedWeight?: string;
  originStairs?: string;
  destinationStairs?: string;
  packingRequest?: string;
  isFictionalDemo?: string;
}

interface ServiceState {
  isMoving: boolean;
  isUnsupported: boolean;
  serviceName: string;
}

const C18M_FALLBACKS = {
  stepIndicator: C18M_DEMO_CONSTANTS.stepIndicator,
  stepSub: C18M_DEMO_CONSTANTS.stepSub,
  title: C18M_DEMO_CONSTANTS.title,
  subtitle: C18M_DEMO_CONSTANTS.subtitle,
  fictionalCustomerBadge: C18M_DEMO_CONSTANTS.fictionalCustomer,
  fictionalCustomerName: C18M_DEFAULT_ROUTE.customer,
  sectionARouteTitle: C18M_DEMO_CONSTANTS.sectionARouteTitle,
  labelCustomer: C18M_DEMO_CONSTANTS.labelCustomer,
  labelPickup: C18M_DEMO_CONSTANTS.labelPickup,
  labelDropoff: C18M_DEMO_CONSTANTS.labelDropoff,
  labelRequestedScope: C18M_DEMO_CONSTANTS.labelRequestedScope,
  sectionBInventoryTitle: C18M_DEMO_CONSTANTS.sectionBInventoryTitle,
  labelLargeItems: C18M_DEMO_CONSTANTS.labelLargeItems,
  labelEstimatedWeight: C18M_DEMO_CONSTANTS.labelEstimatedWeight,
  labelOriginStairs: C18M_DEMO_CONSTANTS.labelOriginStairs,
  labelDestinationStairs: C18M_DEMO_CONSTANTS.labelDestinationStairs,
  labelPackingRequest: C18M_DEMO_CONSTANTS.labelPackingRequest,
  sectionCAssessmentTitle: C18M_DEMO_CONSTANTS.sectionCAssessmentTitle,
  badgeReviewRequired: C18M_DEMO_CONSTANTS.badgeReviewRequired,
  assessmentDescription: C18M_DEMO_CONSTANTS.assessmentDescription,
  runtimeClarification: C18M_DEMO_CONSTANTS.runtimeClarification,
  continueCta: C18M_DEMO_CONSTANTS.continueCta,
  returnServiceListCta: C18M_DEMO_CONSTANTS.returnServiceListCta,
  footerDemo: C18M_DEMO_CONSTANTS.footerNoticeDemo,
  srsFooter: C18M_DEMO_CONSTANTS.footerNoticeSrs,
  dismiss: "Dismiss",
};

const STRINGS_MAP: [keyof typeof C18M_FALLBACKS, string][] = [
  ["stepIndicator", "c18m.stepIndicator"],
  ["stepSub", "c18m.stepSub"],
  ["title", "c18m.title"],
  ["subtitle", "c18m.subtitle"],
  ["fictionalCustomerBadge", "c18m.fictionalCustomerBadge"],
  ["fictionalCustomerName", "c18m.fictionalCustomerName"],
  ["sectionARouteTitle", "c18m.sectionARouteTitle"],
  ["labelCustomer", "c18m.labelCustomer"],
  ["labelPickup", "c18m.labelPickup"],
  ["labelDropoff", "c18m.labelDropoff"],
  ["labelRequestedScope", "c18m.labelRequestedScope"],
  ["sectionBInventoryTitle", "c18m.sectionBInventoryTitle"],
  ["labelLargeItems", "c18m.labelLargeItems"],
  ["labelEstimatedWeight", "c18m.labelEstimatedWeight"],
  ["labelOriginStairs", "c18m.labelOriginStairs"],
  ["labelDestinationStairs", "c18m.labelDestinationStairs"],
  ["labelPackingRequest", "c18m.labelPackingRequest"],
  ["sectionCAssessmentTitle", "c18m.sectionCAssessmentTitle"],
  ["badgeReviewRequired", "c18m.badgeReviewRequired"],
  ["assessmentDescription", "c18m.assessmentDescription"],
  ["runtimeClarification", "c18m.runtimeClarification"],
  ["continueCta", "c18m.continueCta"],
  ["returnServiceListCta", "c18m.returnServiceListCta"],
  ["footerDemo", "c18m.footerDemo"],
  ["srsFooter", "c18m.footerSrs"],
  ["dismiss", "c18m.noticeDismiss"],
];

function useC18MStrings(t: (key: string) => string) {
  return useMemo(() => {
    const result: Record<string, string> = { ...C18M_FALLBACKS };
    for (const [key, path] of STRINGS_MAP) {
      const val = t(path);
      if (val) result[key] = val;
    }
    return result as typeof C18M_FALLBACKS;
  }, [t]);
}

function resolveServiceState(serviceParam?: string): ServiceState {
  if (!serviceParam) {
    return { isMoving: true, isUnsupported: false, serviceName: "Moving" };
  }
  const normalized = serviceParam.toLowerCase().trim() as C15ServiceId;
  const match = C15_SERVICES.find((s) => s.id === normalized);
  if (!match) {
    return { isMoving: false, isUnsupported: true, serviceName: serviceParam };
  }
  return {
    isMoving: match.id === "moving",
    isUnsupported: false,
    serviceName: match.name,
  };
}

function resolveInitialNotice(
  serviceState: ServiceState,
  t: (key: string) => string
): string | null {
  if (serviceState.isUnsupported) {
    const template =
      t("c18m.noticeUnsupportedService") ||
      'The requested service "{{service}}" is not recognized. Moving intake requires an approved service.';
    return template.replace("{{service}}", serviceState.serviceName);
  }
  if (!serviceState.isMoving) {
    const template =
      t("c18m.noticeNonMoving") ||
      "Moving details apply specifically to Moving services. You currently have {{service}} selected. This screen displays an illustrative demo intake without altering your active booking.";
    return template.replace("{{service}}", serviceState.serviceName);
  }
  return null;
}

function resolveRoutePickup(
  pickupAddress?: string,
  selectedAddressId?: string,
  defaultPickup?: string
): string {
  if (pickupAddress) return pickupAddress;
  if (selectedAddressId) {
    const saved = C17_DEFAULT_SAVED_ADDRESSES.find((a) => a.id === selectedAddressId);
    if (saved) return saved.fullAddress;
  }
  return defaultPickup || C18M_DEFAULT_ROUTE.pickup;
}

function resolveRouteDropoff(
  dropoffAddress?: string,
  cityStateZip?: string,
  defaultDropoff?: string
): string {
  if (dropoffAddress) {
    return cityStateZip ? `${dropoffAddress}, ${cityStateZip}` : dropoffAddress;
  }
  return defaultDropoff || C18M_DEFAULT_ROUTE.dropoff;
}

function resolveRouteCustomer(
  isFictional: boolean,
  fictionalName?: string,
  profileName?: string,
  locale?: string
): string {
  if (isFictional) {
    return (
      fictionalName || (locale === "es" ? "Daniel Ruiz · ficticio" : C18M_DEFAULT_ROUTE.customer)
    );
  }
  if (locale === "es" && profileName === "Bryan Lopez") {
    return "Bryan Lopez Mendoza";
  }
  return profileName || (locale === "es" ? "Bryan Lopez Mendoza" : "Sarah Mitchell");
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
 * Notice Banner Component
 */
function C18MNoticeBanner({
  message,
  onDismiss,
  dismissLabel,
}: {
  message: string;
  onDismiss: () => void;
  dismissLabel: string;
}) {
  return (
    <View style={styles.noticeBanner} testID="c18m-notice-banner">
      <Text style={styles.noticeText} testID="c18m-notice-text">
        {message}
      </Text>
      <Pressable
        onPress={onDismiss}
        style={styles.noticeDismissButton}
        accessibilityRole="button"
        accessibilityLabel={dismissLabel}
        testID="c18m-notice-dismiss"
      >
        <Text style={styles.noticeDismissText}>{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Step Indicator Component
 */
function C18MStepChip({ indicator, sub }: { indicator: string; sub: string }) {
  return (
    <View style={styles.stepChipContainer} testID="c18m-step-chip">
      <Text style={styles.stepChipIndicator}>{indicator}</Text>
      <Text style={styles.stepChipSub}>{sub}</Text>
    </View>
  );
}

/**
 * Header Titles Component
 */
function C18MHeaderTitles({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.headerTitlesContainer} testID="c18m-header-titles">
      <Text style={styles.screenHeadingTitle}>{title}</Text>
      <Text style={styles.screenHeadingSubtitle}>{subtitle}</Text>
    </View>
  );
}

/**
 * Customer Booking Context Chip Component
 */
function C18MCustomerContextChip({ chipText }: { chipText: string }) {
  return (
    <View style={styles.customerChip} testID="c18m-customer-chip">
      <View style={styles.customerChipIconWrap}>
        <C18MCheckIcon size={17} color={colors.brand} />
      </View>
      <Text style={styles.customerChipText} testID="c18m-customer-chip-text">
        {chipText}
      </Text>
    </View>
  );
}

/**
 * Detail Row Component with Semantic Icon
 */
function C18MDetailRow({
  label,
  value,
  icon,
  testID,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  testID?: string;
}) {
  return (
    <View style={styles.detailRow} testID={testID}>
      <View style={styles.detailIconContainer}>{icon}</View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

/**
 * Section A: Moving Route Component
 */
function C18MMovingRouteSection({
  title,
  labels,
  values,
}: {
  title: string;
  labels: {
    customer: string;
    pickup: string;
    dropoff: string;
    requestedScope: string;
  };
  values: C18MRouteData;
}) {
  return (
    <View style={styles.card} testID="c18m-route-section">
      <View style={styles.cardHeaderRow}>
        <C18MRouteIcon size={18} color={colors.brand} />
        <Text style={styles.cardHeading}>{title}</Text>
      </View>

      <C18MDetailRow
        label={labels.customer}
        value={values.customer}
        icon={<C18MUserIcon size={16} color={colors.brand} />}
        testID="c18m-row-customer"
      />
      <C18MDetailRow
        label={labels.pickup}
        value={values.pickup}
        icon={<C18MPickupPinIcon size={16} color={colors.brand} />}
        testID="c18m-row-pickup"
      />
      <C18MDetailRow
        label={labels.dropoff}
        value={values.dropoff}
        icon={<C18MDropoffPinIcon size={16} color={colors.brand} />}
        testID="c18m-row-dropoff"
      />
      <C18MDetailRow
        label={labels.requestedScope}
        value={values.requestedScope}
        icon={<C18MScopeIcon size={16} color={colors.brand} />}
        testID="c18m-row-scope"
      />
    </View>
  );
}

/**
 * Section B: Inventory & Access Component
 */
function C18MInventorySection({
  title,
  labels,
  values,
}: {
  title: string;
  labels: {
    largeItems: string;
    estimatedWeight: string;
    originStairs: string;
    destinationStairs: string;
    packingRequest: string;
  };
  values: C18MInventoryData;
}) {
  return (
    <View style={styles.card} testID="c18m-inventory-section">
      <View style={styles.cardHeaderRow}>
        <C18MInventoryIcon size={18} color={colors.brand} />
        <Text style={styles.cardHeading}>{title}</Text>
      </View>

      <C18MDetailRow
        label={labels.largeItems}
        value={values.largeItems}
        icon={<C18MLargeItemsIcon size={16} color={colors.brand} />}
        testID="c18m-row-large-items"
      />
      <C18MDetailRow
        label={labels.estimatedWeight}
        value={values.estimatedWeight}
        icon={<C18MWeightIcon size={16} color={colors.brand} />}
        testID="c18m-row-weight"
      />
      <C18MDetailRow
        label={labels.originStairs}
        value={values.originStairs}
        icon={<C18MStairsIcon size={16} color={colors.brand} />}
        testID="c18m-row-origin-stairs"
      />
      <C18MDetailRow
        label={labels.destinationStairs}
        value={values.destinationStairs}
        icon={<C18MStairsIcon size={16} color={colors.brand} />}
        testID="c18m-row-destination-stairs"
      />
      <C18MDetailRow
        label={labels.packingRequest}
        value={values.packingRequest}
        icon={<C18MPackageIcon size={16} color={colors.brand} />}
        testID="c18m-row-packing"
      />
    </View>
  );
}

/**
 * Section C: Load and Crew Assessment Component
 */
function C18MCrewAssessmentSection({
  title,
  badgeText,
  description,
  clarification,
}: {
  title: string;
  badgeText: string;
  description: string;
  clarification: string;
}) {
  return (
    <View style={styles.card} testID="c18m-crew-section">
      <View style={styles.cardHeaderRow}>
        <C18MCrewShieldIcon size={18} color="#FFC85A" />
        <Text style={styles.cardHeading}>{title}</Text>
      </View>

      <View style={styles.reviewBadge} testID="c18m-review-badge">
        <C18MReviewCheckIcon size={18} color="#FFC85A" />
        <Text style={styles.reviewBadgeText}>{badgeText}</Text>
      </View>

      <Text style={styles.assessmentDescriptionText} testID="c18m-crew-desc">
        {description}
      </Text>

      <Text style={styles.clarificationText} testID="c18m-crew-clarification">
        {clarification}
      </Text>
    </View>
  );
}

/**
 * Action CTAs Component
 */
function C18MActions({
  continueLabel,
  returnLabel,
  onContinue,
  onReturn,
}: {
  continueLabel: string;
  returnLabel: string;
  onContinue: () => void;
  onReturn: () => void;
}) {
  return (
    <View style={styles.actionGroupContainer} testID="c18m-action-group">
      <Pressable
        onPress={onContinue}
        style={({ pressed }) => [
          styles.primaryLimeButton,
          pressed && styles.primaryLimeButtonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={continueLabel}
        testID="c18m-primary-cta"
      >
        <Text style={styles.primaryLimeButtonText}>{continueLabel}</Text>
      </Pressable>

      <Pressable
        onPress={onReturn}
        style={({ pressed }) => [
          styles.secondaryDarkButton,
          pressed && styles.secondaryDarkButtonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel={returnLabel}
        testID="c18m-secondary-cta"
      >
        <Text style={styles.secondaryDarkButtonText}>{returnLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Footer Disclosures Component
 */
function C18MFooter({ demoText, srsText }: { demoText: string; srsText: string }) {
  return (
    <View style={styles.footerContainer} testID="c18m-footer">
      <Text style={styles.footerText}>{demoText}</Text>
      <Text style={styles.footerText}>{srsText}</Text>
    </View>
  );
}

/**
 * C18-M Moving Service Intake Screen (English ONLY with bilingual i18n support)
 *
 * Authoritative Figma: Node 382:881 (430 × 1643 px)
 * Flow Context: W02 Service Discovery & Intake / C18-M [BK-02, BK-03, SV-14]
 */
export default function MovingIntakeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLocale = getCurrentLocale() as "en" | "es";
  const scrollViewRef = useRef<any>(null);
  const params = useLocalSearchParams<{
    service?: string;
    selectedAddressId?: string;
    pickupAddress?: string;
    destinationAddress?: string;
    destinationCityStateZip?: string;
    destinationType?: string;
    elevator?: string;
    customer?: string;
    largeItems?: string;
    estimatedWeight?: string;
    originStairs?: string;
    destinationStairs?: string;
    packingRequest?: string;
    isFictionalDemo?: string;
  }>();
  const strings = useC18MStrings(t);

  // Customer profile dynamically resolved by locale
  const profile = useCustomerProfile(currentLocale);

  // Distinguish between fictional QA demo vs active customer
  const isFictional = params.isFictionalDemo === "true";

  const customerChipText = useMemo(() => {
    if (isFictional) {
      return strings.fictionalCustomerBadge || "DANIEL RUIZ · HX-DEMO-MOVE-1034";
    }
    const template = t("c18m.customerContext") || "{{name}} · {{bookingId}}";
    const displayName =
      currentLocale === "es" && profile.name === "Bryan Lopez"
        ? "BRYAN LOPEZ MENDOZA"
        : (
            profile.name || (currentLocale === "es" ? "Bryan Lopez Mendoza" : "Sarah Mitchell")
          ).toUpperCase();
    return template
      .replace("{{name}}", displayName)
      .replace("{{bookingId}}", C18M_DEMO_CONSTANTS.defaultBookingId);
  }, [isFictional, strings.fictionalCustomerBadge, t, profile.name, currentLocale]);

  const serviceState = useMemo(() => {
    return resolveServiceState(params.service);
  }, [params.service]);

  const [noticeMessage, setNoticeMessage] = useState<string | null>(() => {
    return resolveInitialNotice(serviceState, t);
  });

  useEffect(() => {
    const notice = resolveInitialNotice(serviceState, t);
    if (notice) {
      setNoticeMessage(notice);
    }
  }, [serviceState, t]);

  // Route details
  const routeData = useMemo<C18MRouteData>(() => {
    return {
      customer: resolveRouteCustomer(
        isFictional,
        strings.fictionalCustomerName,
        profile.name,
        currentLocale
      ),
      pickup: resolveRoutePickup(
        params.pickupAddress,
        params.selectedAddressId,
        t("c18m.defaultPickupAddress")
      ),
      dropoff: resolveRouteDropoff(
        params.destinationAddress,
        params.destinationCityStateZip,
        t("c18m.defaultDropoffAddress")
      ),
      requestedScope: t("c18m.defaultRequestedScope") || C18M_DEFAULT_ROUTE.requestedScope,
    };
  }, [
    params.pickupAddress,
    params.selectedAddressId,
    params.destinationAddress,
    params.destinationCityStateZip,
    isFictional,
    strings.fictionalCustomerName,
    profile.name,
    currentLocale,
    t,
  ]);

  // Inventory details
  const inventoryData = useMemo<C18MInventoryData>(() => {
    return {
      largeItems:
        params.largeItems || t("c18m.defaultLargeItems") || C18M_DEFAULT_INVENTORY.largeItems,
      estimatedWeight:
        params.estimatedWeight ||
        t("c18m.defaultEstimatedWeight") ||
        C18M_DEFAULT_INVENTORY.estimatedWeight,
      originStairs:
        params.originStairs || t("c18m.defaultOriginStairs") || C18M_DEFAULT_INVENTORY.originStairs,
      destinationStairs:
        params.destinationStairs ||
        t("c18m.defaultDestinationStairs") ||
        C18M_DEFAULT_INVENTORY.destinationStairs,
      packingRequest:
        params.packingRequest ||
        t("c18m.defaultPackingRequest") ||
        C18M_DEFAULT_INVENTORY.packingRequest,
    };
  }, [
    params.largeItems,
    params.estimatedWeight,
    params.originStairs,
    params.destinationStairs,
    params.packingRequest,
    t,
  ]);

  // CTA Handlers
  const handleContinue = useCallback(() => {
    setNoticeMessage(
      t("c18m.noticeC20M") ||
        (currentLocale === "es"
          ? "La estimación de cotización de mudanza (C20-M) está programada para una próxima fase."
          : "Moving quote estimation (C20-M) is scheduled for an upcoming phase.")
    );
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [t, currentLocale]);

  const handleReturnToServiceList = useCallback(() => {
    router.replace({
      pathname: "/service-discovery",
      params: {
        service: "moving",
      },
    });
  }, [router]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/moving-destination",
        params: {
          service: params.service || "moving",
          selectedAddressId: params.selectedAddressId,
          destinationAddress: params.destinationAddress,
          destinationCityStateZip: params.destinationCityStateZip,
          destinationType: params.destinationType,
          elevator: params.elevator,
        },
      });
    }
  }, [router, params]);

  useHardwareBack(handleBack);

  return (
    <HaulixSafeArea>
      <View style={styles.screenRoot}>
        {/* Pinned Flow Header outside scroll area */}
        <FlowHeaderBack onBack={handleBack} testID="c18m-back-button" />

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c18m-screen"
        >
          {noticeMessage && (
            <C18MNoticeBanner
              message={noticeMessage}
              onDismiss={() => setNoticeMessage(null)}
              dismissLabel={strings.dismiss}
            />
          )}

          <C18MStepChip indicator={strings.stepIndicator} sub={strings.stepSub} />

          <C18MHeaderTitles title={strings.title} subtitle={strings.subtitle} />

          <C18MCustomerContextChip chipText={customerChipText} />

          <C18MMovingRouteSection
            title={strings.sectionARouteTitle}
            labels={{
              customer: strings.labelCustomer,
              pickup: strings.labelPickup,
              dropoff: strings.labelDropoff,
              requestedScope: strings.labelRequestedScope,
            }}
            values={routeData}
          />

          <C18MInventorySection
            title={strings.sectionBInventoryTitle}
            labels={{
              largeItems: strings.labelLargeItems,
              estimatedWeight: strings.labelEstimatedWeight,
              originStairs: strings.labelOriginStairs,
              destinationStairs: strings.labelDestinationStairs,
              packingRequest: strings.labelPackingRequest,
            }}
            values={inventoryData}
          />

          <C18MCrewAssessmentSection
            title={strings.sectionCAssessmentTitle}
            badgeText={strings.badgeReviewRequired}
            description={strings.assessmentDescription}
            clarification={strings.runtimeClarification}
          />

          <C18MActions
            continueLabel={strings.continueCta}
            returnLabel={strings.returnServiceListCta}
            onContinue={handleContinue}
            onReturn={handleReturnToServiceList}
          />

          <C18MFooter demoText={strings.footerDemo} srsText={strings.srsFooter} />
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: colors.background, // #080B0B
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: "center",
  },
  noticeBanner: {
    width: "100%",
    maxWidth: 386,
    backgroundColor: "#1F2923",
    borderWidth: 1,
    borderColor: "#2E4738",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  noticeText: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    lineHeight: 17,
    color: "#D0DCD5",
  },
  noticeDismissButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  stepChipContainer: {
    width: "100%",
    maxWidth: 386,
    height: 33,
    backgroundColor: colors.surface, // #151A19
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
    borderWidth: 1,
    borderColor: "#222827",
  },
  stepChipIndicator: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.brand, // #BAFF42
  },
  stepChipSub: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.secondaryText, // #ADB7B1
  },
  headerTitlesContainer: {
    width: "100%",
    maxWidth: 386,
    marginBottom: 17,
    gap: 9,
  },
  screenHeadingTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 30,
    color: colors.primaryText, // #F6F8F6
  },
  screenHeadingSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.secondaryText, // #ADB7B1
  },
  customerChip: {
    width: "100%",
    maxWidth: 386,
    height: 39,
    backgroundColor: "#1A2510",
    borderWidth: 1,
    borderColor: "#1F3826",
    borderRadius: 9,
    paddingLeft: 12,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 17,
  },
  customerChipIconWrap: {
    width: 17,
    height: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  customerChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: colors.brand, // #BAFF42
  },
  card: {
    width: "100%",
    maxWidth: 386,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: colors.elevated, // #222827
    borderRadius: radius["2xl"], // 18px
    padding: 16,
    marginBottom: 17,
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  cardHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.primaryText,
  },
  detailRow: {
    backgroundColor: colors.elevated, // #222827
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  detailTextContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText, // #ADB7B1
  },
  detailValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.primaryText, // #F6F8F6
  },
  reviewBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.elevated, // #222827
    borderWidth: 1,
    borderColor: "rgba(255, 200, 90, 0.25)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: "#FFC85A",
  },
  assessmentDescriptionText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.secondaryText,
  },
  clarificationText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    color: "#8FA39A",
  },
  actionGroupContainer: {
    width: "100%",
    maxWidth: 386,
    marginTop: 6,
    marginBottom: 17,
    gap: 11,
  },
  primaryLimeButton: {
    width: "100%",
    height: 52,
    backgroundColor: colors.brand, // #BAFF42
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryLimeButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  primaryLimeButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#080B0B",
  },
  secondaryDarkButton: {
    width: "100%",
    height: 56,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryDarkButtonPressed: {
    backgroundColor: colors.elevated,
    borderColor: colors.brand,
  },
  secondaryDarkButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerContainer: {
    width: "100%",
    maxWidth: 386,
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    lineHeight: 14,
    color: "#788580",
    textAlign: "center",
  },
});
