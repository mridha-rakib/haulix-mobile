import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C18CheckIcon,
  C18GarageIcon,
  C18HazardShieldIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C18G_DEFAULT_DATA, C18G_DEMO_CONSTANTS } from "../../src/fixtures/c18gGarageIntake";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function GarageIntakeScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";
  const isEs = currentLocale === "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = C18G_DEMO_CONSTANTS.defaultBookingId;

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/pickup-address",
        params: { service: "garage-cleanout" },
      });
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleListItemsCta = useCallback(() => {
    router.push("/garage-intake-review");
  }, [router]);

  const handleBackToServices = useCallback(() => {
    router.push("/service-discovery");
  }, [router]);

  const data = C18G_DEFAULT_DATA;

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c18g-header-back" onBack={handleBack} backA11y={t("c18g.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c18g-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c18g.noticeDismiss")}
            testID="c18g-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c18g.noticeDismiss")}</Text>
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
            {isEs ? C18G_DEMO_CONSTANTS.stepIndicatorEs : C18G_DEMO_CONSTANTS.stepIndicator}
          </Text>
          <Text style={styles.stepChipRight}>
            {isEs ? C18G_DEMO_CONSTANTS.stepSubEs : C18G_DEMO_CONSTANTS.stepSub}
          </Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c18g.title")}</Text>
          <Text style={styles.subtitleText}>{t("c18g.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c18g-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Cleanout Scope & Access Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <C18GarageIcon size={18} color={colors.brand} />
            <Text style={styles.cardTitle}>{t("c18g.scopeCardTitle")}</Text>
          </View>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18g.labelSpaceScope")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.spaceScopeEs : data.spaceScope}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18g.labelAccess")}</Text>
            <Text style={styles.rowValue}>
              {isEs ? data.collectionAccessEs : data.collectionAccess}
            </Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18g.labelIdentified")}</Text>
            <Text style={styles.rowValue}>
              {isEs ? data.identifiedItemsEs : data.identifiedItems}
            </Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18g.labelUnidentified")}</Text>
            <Text style={styles.rowValue}>
              {isEs ? data.unidentifiedItemsEs : data.unidentifiedItems}
            </Text>
          </View>
        </View>

        {/* Hazardous Materials Screening Card */}
        <View style={styles.card}>
          <View style={styles.hazardHeaderRow}>
            <View style={styles.hazardTitleRow}>
              <C18HazardShieldIcon size={18} color="#FFC85A" />
              <Text style={styles.hazardTitle}>{t("c18g.hazardCardTitle")}</Text>
            </View>
            <View style={styles.reviewBadge}>
              <Text style={styles.reviewBadgeText}>{t("c18g.reviewBadge")}</Text>
            </View>
          </View>

          <Text style={styles.hazardNoticeText}>
            {isEs ? data.hazardNoticeEs : data.hazardNotice}
          </Text>
        </View>

        {/* Primary CTA */}
        <Pressable
          style={styles.primaryButton}
          onPress={handleListItemsCta}
          accessibilityRole="button"
          accessibilityLabel={t("c18g.continueCta")}
          testID="c18g-continue-cta"
        >
          <Text style={styles.primaryButtonText}>{t("c18g.continueCta")}</Text>
        </Pressable>

        {/* Secondary CTA */}
        <Pressable
          style={styles.secondaryButton}
          onPress={handleBackToServices}
          accessibilityRole="button"
          accessibilityLabel={t("c18g.backServicesCta")}
          testID="c18g-back-services-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("c18g.backServicesCta")}</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t("c18g.footerDemo")}</Text>
          <Text style={styles.footerSubText}>{t("c18g.footerSrs")}</Text>
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
  hazardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  hazardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hazardTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  reviewBadge: {
    backgroundColor: "#3A2A14",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  reviewBadgeText: {
    color: "#FFC85A",
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  hazardNoticeText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
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
