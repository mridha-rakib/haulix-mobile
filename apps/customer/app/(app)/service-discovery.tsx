import { colors, fontFamily } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams } from "expo-router";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  type C15IconProps,
  ContextCheckIcon,
  ServiceApplianceIcon,
  ServiceChevronIcon,
  ServiceFurnitureIcon,
  ServiceGarageIcon,
  ServiceInfoCheckIcon,
  ServiceJunkRemovalIcon,
  ServiceMattressIcon,
  ServiceMovingIcon,
  ServiceStoreIcon,
} from "../../src/components/discovery/C15Icons";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  C15_DEMO_CONSTANTS,
  C15_SERVICES,
  type C15ServiceIconName,
  type C15ServiceId,
  type C15ServiceItem,
} from "../../src/fixtures/c15Services";

const SERVICE_ICONS: Record<C15ServiceIconName, React.FC<C15IconProps>> = {
  junk: ServiceJunkRemovalIcon,
  moving: ServiceMovingIcon,
  furniture: ServiceFurnitureIcon,
  appliance: ServiceApplianceIcon,
  mattress: ServiceMattressIcon,
  garage: ServiceGarageIcon,
  store: ServiceStoreIcon,
};

/**
 * 1. Flow Header · Start (Figma 436:1957)
 * Both EN and ES Figma sources preserve literal "We Haul It All."
 */
function FlowHeaderStart() {
  return (
    <View style={styles.flowHeaderContainer}>
      <View style={styles.wordmarkRow}>
        <Text style={styles.wordmarkHaul}>HAUL</Text>
        <Text style={styles.wordmarkIx}>IX</Text>
        <Text style={styles.registeredMark}>®</Text>
      </View>
      <Text style={styles.taglineText}>We Haul It All.</Text>
    </View>
  );
}

/**
 * Notice banner for truthful in-app disclosures
 */
function NoticeBanner({
  message,
  onDismiss,
  dismissLabel = "Dismiss",
}: {
  message: string;
  onDismiss: () => void;
  dismissLabel?: string;
}) {
  return (
    <View style={styles.noticeBox} testID="c15-notice-banner">
      <Text style={styles.noticeText}>{message}</Text>
      <Pressable
        onPress={onDismiss}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={dismissLabel}
      >
        <Text style={styles.noticeDismiss}>{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * 5. Service Area Card (Figma 382:144 / 974:8858)
 */
function ServiceAreaSection({ t }: { t: (k: string) => string }) {
  return (
    <View style={styles.serviceAreaCard}>
      <Text style={styles.serviceAreaTitle}>
        {t("c15.serviceAreaTitle") || C15_DEMO_CONSTANTS.serviceAreaTitle}
      </Text>
      <Text style={styles.serviceAreaRegion}>
        {t("c15.serviceAreaRegion") || C15_DEMO_CONSTANTS.serviceAreaRegion}
      </Text>
      <Text style={styles.serviceAreaNote}>
        {t("c15.serviceAreaNote") || C15_DEMO_CONSTANTS.serviceAreaNote}
      </Text>
    </View>
  );
}

/**
 * Available Services List (Figma 382:149 / 974:8863)
 */
function AvailableServicesList({
  selectedServiceId,
  onSelectService,
  t,
}: {
  selectedServiceId: C15ServiceId;
  onSelectService: (service: C15ServiceItem) => void;
  t: (k: string) => string;
}) {
  return (
    <View style={styles.servicesSection}>
      <Text style={styles.servicesSectionTitle}>
        {t("c15.availableServicesTitle") || C15_DEMO_CONSTANTS.availableServicesTitle}
      </Text>

      <View style={styles.servicesList}>
        {C15_SERVICES.map((item) => {
          const isSelected = item.id === selectedServiceId;
          const IconComponent = SERVICE_ICONS[item.iconName];
          const title = t(item.i18nTitleKey) || item.name;
          const subtitle = t(item.i18nSubtitleKey) || item.subtitle;

          return (
            <Pressable
              key={item.id}
              testID={`c15-service-row-${item.id}`}
              style={[styles.serviceRow, isSelected && styles.serviceRowSelected]}
              onPress={() => onSelectService(item)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${title}, ${subtitle}`}
            >
              <View style={styles.serviceIconWrapper}>
                <IconComponent size={25} color="#BAFF42" />
              </View>
              <View style={styles.serviceInfoColumn}>
                <Text style={styles.serviceTitleText}>{title}</Text>
                <Text style={styles.serviceSubtitleText}>{subtitle}</Text>
              </View>
              <View style={styles.chevronWrapper}>
                <ServiceChevronIcon size={17} color="#ADB7B1" />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * 7. For Customer / Demo Draft Summary (Figma 382:221 / 974:8927)
 */
function CustomerDraftSummarySection({
  customerName,
  localizedServiceName,
  t,
}: {
  customerName: string;
  localizedServiceName: string;
  t: (k: string) => string;
}) {
  const forCustomerLabel = (t("c15.customerInfoTitle") || "For {{name}}").replace(
    "{{name}}",
    customerName
  );

  const draftBookingLabel = (t("c15.draftBooking") || "Draft booking {{bookingId}} · {{service}}")
    .replace("{{bookingId}}", C15_DEMO_CONSTANTS.defaultBookingId)
    .replace("{{service}}", localizedServiceName);

  return (
    <View style={styles.customerInfoContainer}>
      <Text style={styles.customerInfoTitle}>{forCustomerLabel}</Text>
      <View style={styles.customerInfoCard}>
        <View style={styles.serviceInfoPill}>
          <ServiceInfoCheckIcon size={18} color="#BAFF42" />
          <Text style={styles.serviceInfoPillText}>
            {t("c15.serviceInfo") || C15_DEMO_CONSTANTS.serviceInfoTitle}
          </Text>
        </View>
        <Text style={styles.draftBookingText}>{draftBookingLabel}</Text>
        <Text style={styles.noQuoteText}>
          {t("c15.noQuoteNote") || C15_DEMO_CONSTANTS.noQuoteNote}
        </Text>
      </View>
    </View>
  );
}

/**
 * Four Vertical Action CTAs (Figma 382:230 / 974:8936)
 */
function FourActionButtons({
  localizedServiceName,
  onAction,
  t,
  isSpanish,
}: {
  localizedServiceName: string;
  onAction: (key: string, fallback: string) => void;
  t: (k: string) => string;
  isSpanish?: boolean;
}) {
  const ctaServiceText = isSpanish ? localizedServiceName.toLowerCase() : localizedServiceName;
  const selectCtaText = (t("c15.selectServiceCta") || "Select {{service}}").replace(
    "{{service}}",
    ctaServiceText
  );

  return (
    <View style={styles.actionsContainer}>
      {/* Action 1: Select <Service> (Primary Lime) */}
      <Pressable
        testID="c15-select-service-btn"
        style={styles.primaryLimeButton}
        onPress={() =>
          onAction(
            "c15.noticeC15S",
            isSpanish
              ? "La siguiente etapa de selección del servicio estará disponible próximamente."
              : "Service intake and selection (C15-S) is scheduled for an upcoming phase."
          )
        }
        accessibilityRole="button"
        accessibilityLabel={selectCtaText}
      >
        <Text style={styles.primaryLimeButtonText}>{selectCtaText}</Text>
      </Pressable>

      {/* Action 2: Check Service Area › (Dark) */}
      <Pressable
        testID="c15-check-service-area-btn"
        style={styles.secondaryDarkButton}
        onPress={() =>
          onAction(
            "c15.noticeC16",
            isSpanish
              ? "La verificación de la zona de servicio estará disponible próximamente."
              : "Service Area Eligibility (C16) is scheduled for an upcoming phase."
          )
        }
        accessibilityRole="button"
        accessibilityLabel={t("c15.checkServiceArea") || "Check Service Area ›"}
      >
        <Text style={styles.secondaryDarkButtonText}>
          {t("c15.checkServiceArea") || "Check Service Area ›"}
        </Text>
      </Pressable>

      {/* Action 3: View location restrictions › (Dark) */}
      <Pressable
        testID="c15-view-restrictions-btn"
        style={styles.secondaryDarkButton}
        onPress={() =>
          onAction(
            "c15.noticeC16F",
            isSpanish
              ? "Las restricciones de ubicación se mostrarán en una próxima fase."
              : "Location Restrictions (C16-F) is scheduled for an upcoming phase."
          )
        }
        accessibilityRole="button"
        accessibilityLabel={t("c15.viewLocationRestrictions") || "View location restrictions ›"}
      >
        <Text style={styles.secondaryDarkButtonText}>
          {t("c15.viewLocationRestrictions") || "View location restrictions ›"}
        </Text>
      </Pressable>

      {/* Action 4: Service not listed? Check options › (Lime) */}
      <Pressable
        testID="c15-service-not-listed-btn"
        style={styles.primaryLimeButton}
        onPress={() =>
          onAction(
            "c15.noticeC15E",
            isSpanish
              ? "Las opciones de servicios adicionales estarán disponibles en una próxima fase."
              : "Custom Services & Unlisted Options (C15-E) is scheduled for an upcoming phase."
          )
        }
        accessibilityRole="button"
        accessibilityLabel={t("c15.serviceNotListed") || "Service not listed? Check options ›"}
      >
        <Text style={styles.primaryLimeButtonText}>
          {t("c15.serviceNotListed") || "Service not listed? Check options ›"}
        </Text>
      </Pressable>
    </View>
  );
}

export default function ServiceDiscoveryScreen() {
  const { t } = useTranslation();
  const currentLocale = (getCurrentLocale() as "en" | "es") || "en";
  const isSpanish = currentLocale === "es";
  const params = useLocalSearchParams<{ service?: string }>();

  // Profile binding: Sarah Mitchell for English, Bryan Lopez for Spanish (or saved local edits)
  const [customerName, setCustomerName] = useState(() => getC10DemoProfile(currentLocale).name);

  useEffect(() => {
    loadProfileEdits(currentLocale).then(() => {
      setCustomerName(getC10DemoProfile(currentLocale).name);
    });
    return subscribeToProfileEdits(() => {
      setCustomerName(getC10DemoProfile(currentLocale).name);
    });
  }, [currentLocale]);

  // Selected service preview state (defaults to 'junk-removal' or route param if valid)
  const [selectedServiceId, setSelectedServiceId] = useState<C15ServiceId>(() => {
    const paramService = params.service as C15ServiceId | undefined;
    if (paramService && C15_SERVICES.some((s) => s.id === paramService)) {
      return paramService;
    }
    return "junk-removal";
  });

  useEffect(() => {
    if (params.service && C15_SERVICES.some((s) => s.id === params.service)) {
      setSelectedServiceId(params.service as C15ServiceId);
    }
  }, [params.service]);

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const selectedService = useMemo<C15ServiceItem>(() => {
    return C15_SERVICES.find((s) => s.id === selectedServiceId) ?? C15_SERVICES[0];
  }, [selectedServiceId]);

  const localizedServiceName = t(selectedService.i18nTitleKey) || selectedService.name;

  const notify = (key: string, fallback: string) => {
    setNoticeMessage(t(key) || fallback);
  };

  const handleSelectServiceRow = (service: C15ServiceItem) => {
    setSelectedServiceId(service.id);
    const serviceTitle = t(service.i18nTitleKey) || service.name;
    const template =
      t("c15.noticeC18") || "{{service}} intake (C18) is scheduled for an upcoming phase.";
    setNoticeMessage(template.replace("{{service}}", serviceTitle));
  };

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Flow Header · Start (Figma 436:1957) */}
        <FlowHeaderStart />

        {/* Notice Banner */}
        {noticeMessage && (
          <NoticeBanner
            message={noticeMessage}
            onDismiss={() => setNoticeMessage(null)}
            dismissLabel={t("common.dismiss") || "Dismiss"}
          />
        )}

        {/* 2. W02 Step Chip (Figma 382:134 / 974:8847) */}
        <View style={styles.stepChipContainer}>
          <Text style={styles.stepChipLeft}>
            {t("c15.stepIndicator") || C15_DEMO_CONSTANTS.stepIndicator}
          </Text>
          <Text style={styles.stepChipRight}>{t("c15.stepSub") || C15_DEMO_CONSTANTS.stepSub}</Text>
        </View>

        {/* 3. Screen Heading (Figma 382:137 / 974:8850) */}
        <View style={styles.headingContainer}>
          <Text style={styles.titleText}>{t("c15.title") || C15_DEMO_CONSTANTS.title}</Text>
          <Text style={styles.subtitleText}>
            {t("c15.subtitle") || C15_DEMO_CONSTANTS.subtitle}
          </Text>
        </View>

        {/* 4. Customer Demo Chip (Figma 382:140 / 974:8855) */}
        <View style={styles.customerChip}>
          <ContextCheckIcon size={17} color="#BAFF42" />
          <Text style={styles.customerChipText}>
            {`${customerName.toUpperCase()} · ${C15_DEMO_CONSTANTS.defaultBookingId}`}
          </Text>
        </View>

        {/* 5. Service Area Card (Figma 382:144 / 974:8858) */}
        <ServiceAreaSection t={t} />

        {/* 6. Available Services Section (Figma 382:149 / 974:8863) */}
        <AvailableServicesList
          selectedServiceId={selectedServiceId}
          onSelectService={handleSelectServiceRow}
          t={t}
        />

        {/* 7. For Customer / Demo Draft Summary (Figma 382:221 / 974:8927) */}
        <CustomerDraftSummarySection
          customerName={customerName}
          localizedServiceName={localizedServiceName}
          t={t}
        />

        {/* 8. Four Vertical Action CTAs (Figma 382:230 / 974:8936) */}
        <FourActionButtons
          localizedServiceName={localizedServiceName}
          onAction={notify}
          t={t}
          isSpanish={isSpanish}
        />

        {/* 9. Demo Footer Disclaimers (Figma 382:238 / 974:8944) */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {t("c15.footerNoticeDemo") || C15_DEMO_CONSTANTS.footerNotice1}
          </Text>
          <Text style={styles.footerTextSecondary}>
            {t("c15.footerNoticeSrs") || C15_DEMO_CONSTANTS.footerNotice2}
          </Text>
        </View>
      </ScrollView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // 1. Flow Header Start (436:1957)
  flowHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginBottom: 16,
  },
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  wordmarkHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: "#F6F8F6",
    letterSpacing: -0.5,
  },
  wordmarkIx: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: "#BAFF42",
    letterSpacing: -0.5,
  },
  registeredMark: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: "#F6F8F6",
    marginLeft: 2,
    transform: [{ translateY: -10 }],
  },
  taglineText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "#ADB7B1",
    marginTop: 2,
    letterSpacing: 0.2,
  },

  // Notice Banner
  noticeBox: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#161B19",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#26302B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: "#BAFF42",
    fontFamily: fontFamily.medium,
    lineHeight: 18,
    marginRight: 12,
  },
  noticeDismiss: {
    fontSize: 13,
    color: "#ADB7B1",
    fontFamily: fontFamily.semiBold,
  },

  // 2. W02 Step Chip (382:134 / 974:8847)
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#131716",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1E2522",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 18,
  },
  stepChipLeft: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  stepChipRight: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "#6D7570",
  },

  // 3. Screen Heading (382:137 / 974:8850)
  headingContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: "#F6F8F6",
    lineHeight: 34,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: "#ADB7B1",
    lineHeight: 22,
  },

  // 4. Customer Demo Chip (382:140 / 974:8855)
  customerChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121C14",
    borderWidth: 1,
    borderColor: "#1F3320",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  customerChipText: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: "#BAFF42",
    letterSpacing: 0.5,
    marginLeft: 8,
  },

  // 5. Service Area Card (382:144 / 974:8858)
  serviceAreaCard: {
    backgroundColor: "#121615",
    borderWidth: 1,
    borderColor: "#1E2522",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  serviceAreaTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#F6F8F6",
    marginBottom: 6,
  },
  serviceAreaRegion: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#ADB7B1",
    marginBottom: 6,
  },
  serviceAreaNote: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#6D7570",
    lineHeight: 16,
  },

  // 6. Available Services Section (382:149 / 974:8863)
  servicesSection: {
    marginBottom: 24,
  },
  servicesSectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: "#F6F8F6",
    marginBottom: 14,
  },
  servicesList: {
    gap: 12,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B19",
    borderWidth: 1,
    borderColor: "#222A26",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 74,
  },
  serviceRowSelected: {
    borderColor: "#BAFF42",
    backgroundColor: "#162019",
  },
  serviceIconWrapper: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  serviceInfoColumn: {
    flex: 1,
    marginRight: 8,
  },
  serviceTitleText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: "#F6F8F6",
    marginBottom: 3,
  },
  serviceSubtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: "#ADB7B1",
    lineHeight: 17,
  },
  chevronWrapper: {
    width: 20,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  // 7. For Customer / Demo Draft Summary (382:221 / 974:8927)
  customerInfoContainer: {
    marginBottom: 24,
  },
  customerInfoTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: "#F6F8F6",
    marginBottom: 12,
  },
  customerInfoCard: {
    backgroundColor: "#121615",
    borderWidth: 1,
    borderColor: "#1E2522",
    borderRadius: 16,
    padding: 18,
  },
  serviceInfoPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161B19",
    borderWidth: 1,
    borderColor: "#222A26",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  serviceInfoPillText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: "#ADB7B1",
    marginLeft: 8,
  },
  draftBookingText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: "#ADB7B1",
    marginTop: 14,
  },
  noQuoteText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#6D7570",
    marginTop: 4,
  },

  // 8. Four Vertical Actions (382:230 / 974:8936)
  actionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryLimeButton: {
    backgroundColor: "#BAFF42",
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryLimeButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#080B0B",
    textAlign: "center",
  },
  secondaryDarkButton: {
    backgroundColor: "#161B19",
    borderWidth: 1,
    borderColor: "#2A3530",
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryDarkButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: "#BAFF42",
    textAlign: "center",
  },

  // 9. Demo Footer Disclaimers (382:238 / 974:8944)
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#505A54",
    textAlign: "center",
    lineHeight: 16,
  },
  footerTextSecondary: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#505A54",
    textAlign: "center",
    lineHeight: 16,
    marginTop: 4,
  },
});
