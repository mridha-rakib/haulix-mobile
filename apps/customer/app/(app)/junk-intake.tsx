import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C18CheckIcon,
  C18HazardShieldIcon,
  C18JunkIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C18J_DEFAULT_DATA, C18J_DEMO_CONSTANTS } from "../../src/fixtures/c18jJunkIntake";

// Static local images extracted from Figma node 382:805
const ITEM_IMAGES: Record<string, ImageSourcePropType> = {
  sofa: require("../../assets/images/intake/c18j-sofa.png"),
  mattresses: require("../../assets/images/intake/c18j-mattresses.png"),
  table: require("../../assets/images/intake/c18j-table.png"),
};

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function JunkIntakeScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";
  const isEs = currentLocale === "es";
  const _params = useLocalSearchParams<{ service?: string }>();

  const profile = useCustomerProfile(currentLocale);
  const bookingId = C18J_DEMO_CONSTANTS.defaultBookingId;

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/pickup-address", params: { service: "junk-removal" } });
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleReviewCta = useCallback(() => {
    setNoticeMessage(t("c18j.noticeC19"));
  }, [t]);

  const handleDifferentService = useCallback(() => {
    router.push("/service-discovery");
  }, [router]);

  const data = C18J_DEFAULT_DATA;

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c18j-header-back" onBack={handleBack} backA11y={t("c18j.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c18j-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c18j.noticeDismiss")}
            testID="c18j-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c18j.noticeDismiss")}</Text>
          </Pressable>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.stepChipContainer}>
          <Text style={styles.stepChipLeft}>
            {isEs ? C18J_DEMO_CONSTANTS.stepIndicatorEs : C18J_DEMO_CONSTANTS.stepIndicator}
          </Text>
          <Text style={styles.stepChipRight}>
            {isEs ? C18J_DEMO_CONSTANTS.stepSubEs : C18J_DEMO_CONSTANTS.stepSub}
          </Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c18j.title")}</Text>
          <Text style={styles.subtitleText}>{t("c18j.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c18j-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Service & Pickup Point Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <C18JunkIcon size={18} color={colors.brand} />
            <Text style={styles.cardTitle}>{t("c18j.serviceCardTitle")}</Text>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18j.labelService")}</Text>
            <Text style={styles.rowValue}>
              {isEs ? data.serviceNameEs : data.serviceName} ·{" "}
              {isEs ? data.serviceSubtitleEs : data.serviceSubtitle}
            </Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18j.labelPickupPoint")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.stagingAreaEs : data.stagingArea}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18j.labelSpecialNotes")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.specialNotesEs : data.specialNotes}</Text>
          </View>
        </View>

        {/* Declared Items List Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>{t("c18j.itemsCardTitle")}</Text>
          </View>

          {data.items.map((item, index) => {
            const isLast = index === data.items.length - 1;
            return (
              <View key={item.id}>
                <View style={styles.itemRow}>
                  <Image
                    source={ITEM_IMAGES[item.imageKey]}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                  <View style={styles.itemContent}>
                    <Text style={styles.itemName}>{isEs ? item.nameEs : item.name}</Text>
                    <Text style={styles.itemSpecs}>
                      {isEs ? item.countTextEs : item.countText} · {item.dimensions} · {item.weight}
                    </Text>
                  </View>
                </View>
                {!isLast && <View style={styles.rowDivider} />}
              </View>
            );
          })}
        </View>

        {/* Summary Metric Strip */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryTop}>
            <Text style={styles.summaryPieces}>{t("c18j.summaryPieces")}</Text>
            <Text style={styles.summaryWeight}>{t("c18j.summaryWeight")}</Text>
          </View>
          <View style={styles.badgeRow}>
            <C18HazardShieldIcon size={15} color="#FFC85A" />
            <Text style={styles.badgeText}>{t("c18j.reviewBadge")}</Text>
          </View>
        </View>

        {/* Primary CTA */}
        <Pressable
          style={styles.primaryButton}
          onPress={handleReviewCta}
          accessibilityRole="button"
          accessibilityLabel={t("c18j.continueCta")}
          testID="c18j-continue-cta"
        >
          <Text style={styles.primaryButtonText}>{t("c18j.continueCta")}</Text>
        </Pressable>

        {/* Secondary CTA */}
        <Pressable
          style={styles.secondaryButton}
          onPress={handleDifferentService}
          accessibilityRole="button"
          accessibilityLabel={t("c18j.differentServiceCta")}
          testID="c18j-different-service-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("c18j.differentServiceCta")}</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t("c18j.footerDemo")}</Text>
          <Text style={styles.footerSubText}>{t("c18j.footerSrs")}</Text>
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  noticeBox: {
    backgroundColor: "#27272A",
    borderLeftWidth: 4,
    borderLeftColor: "#FFC85A",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
    marginRight: 10,
  },
  noticeDismiss: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#3F3F46",
    borderRadius: 4,
  },
  noticeDismissText: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#1C2422",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 14,
  },
  stepChipLeft: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  stepChipRight: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  headingSection: {
    marginBottom: 20,
  },
  titleText: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
    marginBottom: 6,
  },
  subtitleText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  customerChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17231E",
    borderWidth: 1,
    borderColor: "#234236",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: "flex-start",
    gap: 8,
  },
  customerChipText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: "#161D1B",
    borderWidth: 1,
    borderColor: "#22312D",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  cardTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
  },
  rowItem: {
    paddingVertical: 4,
  },
  rowLabel: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginBottom: 2,
  },
  rowValue: {
    color: colors.primaryText,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#22312D",
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },
  itemImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: "#27272A",
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  itemSpecs: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  summaryBox: {
    backgroundColor: "#1F2321",
    borderWidth: 1,
    borderColor: "#333A36",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryPieces: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  summaryWeight: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badgeText: {
    color: "#FFC85A",
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#0F1614",
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  footerText: {
    color: "#71717A",
    fontFamily: fontFamily.regular,
    fontSize: 11,
    textAlign: "center",
    marginBottom: 2,
  },
  footerSubText: {
    color: "#52525B",
    fontFamily: fontFamily.regular,
    fontSize: 10,
    textAlign: "center",
  },
});
