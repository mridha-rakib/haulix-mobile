import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { BackHandler, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  C19_DEMO_CONSTANTS,
  getDraftInventory,
  subscribeToDraftInventory,
} from "../../src/fixtures/c19ItemInventory";

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

export default function ItemInventoryScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";
  const isEs = currentLocale === "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = C19_DEMO_CONSTANTS.defaultBookingId;

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/junk-intake" });
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleContinueToPhotos = useCallback(() => {
    router.push({ pathname: "/item-photos" });
  }, [router]);

  const handleCorrectMeasurements = useCallback(() => {
    router.push({ pathname: "/edit-inventory-item" });
  }, [router]);

  const handleAddAnotherItem = useCallback(() => {
    router.push({ pathname: "/add-inventory-item" });
  }, [router]);

  const handleIncompleteExample = useCallback(() => {
    router.push({ pathname: "/inventory-validation" });
  }, [router]);

  const [data, setData] = useState(() => getDraftInventory());
  useEffect(() => {
    return subscribeToDraftInventory(setData);
  }, []);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c19-header-back" onBack={handleBack} backA11y={t("c19.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c19-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c19.noticeDismiss")}
            testID="c19-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c19.noticeDismiss")}</Text>
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
            {isEs ? C19_DEMO_CONSTANTS.stepIndicatorEs : C19_DEMO_CONSTANTS.stepIndicator}
          </Text>
          <Text style={styles.stepChipRight}>
            {isEs ? C19_DEMO_CONSTANTS.stepSubEs : C19_DEMO_CONSTANTS.stepSub}
          </Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c19.title")}</Text>
          <Text style={styles.subtitleText}>{t("c19.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c19-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Confirmed Draft Quantities Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("c19.sectionItemsTitle")}</Text>

          {data.items.map((item, index) => {
            const isLast = index === data.items.length - 1;
            const imageSource = ITEM_IMAGES[item.imageKey];

            return (
              <View key={item.id}>
                <View style={styles.itemRow} testID={`c19-item-${item.id}`}>
                  {imageSource && (
                    <Image
                      source={imageSource}
                      style={styles.itemThumbnail}
                      resizeMode="cover"
                      accessibilityLabel={isEs ? item.nameEs : item.name}
                    />
                  )}
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{isEs ? item.nameEs : item.name}</Text>
                    <Text style={styles.itemSpecs}>
                      {isEs ? item.countDimensionsEs : item.countDimensions}
                    </Text>
                    <Text style={styles.itemWeight}>{isEs ? item.weightEs : item.weight}</Text>
                  </View>
                </View>
                {!isLast && <View style={styles.rowDivider} />}
              </View>
            );
          })}
        </View>

        {/* Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("c19.summaryTitle")}</Text>
          <Text style={styles.summaryCountText}>{t("c19.summaryCount")}</Text>

          <View style={styles.rowDivider} />

          <View style={styles.noticeBulletRow}>
            <View style={styles.noticeBulletDot} />
            <Text style={styles.noticeBulletText}>{t("c19.summaryDisclaimer1")}</Text>
          </View>

          <View style={styles.noticeBulletRow}>
            <View style={styles.noticeBulletDot} />
            <Text style={styles.noticeBulletText}>{t("c19.summaryDisclaimer2")}</Text>
          </View>
        </View>

        {/* Primary CTA */}
        <Pressable
          style={styles.primaryButton}
          onPress={handleContinueToPhotos}
          accessibilityRole="button"
          accessibilityLabel={t("c19.continueCta")}
          testID="c19-continue-cta"
        >
          <Text style={styles.primaryButtonText}>{t("c19.continueCta")}</Text>
        </Pressable>

        {/* Secondary CTAs */}
        <Pressable
          style={styles.secondaryButton}
          onPress={handleCorrectMeasurements}
          accessibilityRole="button"
          accessibilityLabel={t("c19.correctMeasurementsCta")}
          testID="c19-correct-measurements-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("c19.correctMeasurementsCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={handleAddAnotherItem}
          accessibilityRole="button"
          accessibilityLabel={t("c19.addAnotherItemCta")}
          testID="c19-add-another-item-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("c19.addAnotherItemCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={handleIncompleteExample}
          accessibilityRole="button"
          accessibilityLabel={t("c19.incompleteExampleCta")}
          testID="c19-incomplete-example-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("c19.incompleteExampleCta")}</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t("c19.footerDemo")}</Text>
          <Text style={styles.footerSubText}>{t("c19.footerSrs")}</Text>
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
  cardTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 14,
  },
  itemThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: "#1E2725",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    marginBottom: 2,
  },
  itemSpecs: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    marginBottom: 2,
  },
  itemWeight: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
  summaryCountText: {
    color: colors.primaryText,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    marginBottom: 10,
  },
  noticeBulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    gap: 8,
  },
  noticeBulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.secondaryText,
    marginTop: 7,
  },
  noticeBulletText: {
    flex: 1,
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#1F2B27",
    marginVertical: 4,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  secondaryButton: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  secondaryButtonText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 13,
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 16,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#1A2220",
    gap: 4,
  },
  footerText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  footerSubText: {
    color: "#6B7280",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
});
