/**
 * C19-A Add Item Manually
 *
 * Authoritative Figma: Node 382:1365 (EN) & Node 980:9463 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-A
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C19A_DEFAULT_ITEM } from "../../src/fixtures/c19aAddItem";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AddInventoryItemScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = "HX-DEMO-1027";

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/item-inventory" });
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleReviewValidation = useCallback(() => {
    router.push({ pathname: "/inventory-validation" });
  }, [router]);

  const handleReturnWithoutAdding = useCallback(() => {
    handleBack();
  }, [handleBack]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c19a-header-back" onBack={handleBack} backA11y={t("c19a.backA11y")} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.stepChipContainer}>
          <Text style={styles.stepChipLeft}>{t("c19a.stepIndicator")}</Text>
          <Text style={styles.stepChipRight}>{t("c19a.stepSub")}</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c19a.title")}</Text>
          <Text style={styles.subtitleText}>{t("c19a.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c19a-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* New Item Details Card */}
        <View style={styles.sectionCard} testID="c19a-item-card">
          <Text style={styles.sectionTitle}>
            {t(`c19a.${C19A_DEFAULT_ITEM.newItemSectionTitleKey}`)}
          </Text>
          <View style={styles.detailList}>
            {C19A_DEFAULT_ITEM.details.map((row) => (
              <View key={row.key} style={styles.detailRow} testID={`c19a-detail-${row.key}`}>
                <Text style={styles.detailLabel}>{t(`c19a.${row.labelKey}`)}</Text>
                <Text style={styles.detailValue}>{t(`c19a.${row.valueKey}`)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Separate Test Variation Card */}
        <View style={styles.sectionCard} testID="c19a-variation-card">
          <Text style={styles.sectionTitle}>{t("c19a.variationSectionTitle")}</Text>

          <View style={styles.badgeRow}>
            <C18CheckIcon size={16} color={colors.secondaryText} />
            <Text style={styles.badgeText}>{t("c19a.serviceInfoBadge")}</Text>
          </View>

          <Text style={styles.bodyText}>{t("c19a.variationDisclaimer1", { bookingId })}</Text>
          <Text style={styles.bodyText}>{t("c19a.variationDisclaimer2")}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleReviewValidation}
            accessibilityRole="button"
            accessibilityLabel={t("c19a.reviewValidationCta")}
            testID="c19a-review-button"
          >
            <Text style={styles.primaryButtonText}>{t("c19a.reviewValidationCta")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleReturnWithoutAdding}
            accessibilityRole="button"
            accessibilityLabel={t("c19a.returnWithoutAddingCta")}
            testID="c19a-return-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c19a.returnWithoutAddingCta")}</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>{t("c19a.footerDemo")}</Text>
          <Text style={styles.footerText}>{t("c19a.footerSrs")}</Text>
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
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 17,
  },
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 33,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: colors.surface,
  },
  stepChipLeft: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
  },
  stepChipRight: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.secondaryText,
  },
  headingSection: {
    gap: 9,
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
    color: colors.secondaryText,
  },
  customerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 39,
    paddingLeft: 12,
    borderRadius: 9,
    backgroundColor: "#1A2510",
  },
  customerChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 16,
    gap: 13,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.primaryText,
  },
  detailList: {
    gap: 10,
  },
  detailRow: {
    backgroundColor: colors.elevated,
    borderRadius: 10,
    height: 64,
    paddingHorizontal: 12,
    justifyContent: "center",
    gap: 4,
  },
  detailLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
  },
  detailValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.primaryText,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.elevated,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
  },
  bodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondaryText,
  },
  actionsSection: {
    gap: 11,
    marginTop: 4,
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.background,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonPressed: {
    opacity: 0.85,
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerSection: {
    gap: 10,
    marginTop: 8,
    paddingBottom: 8,
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
    lineHeight: 14,
  },
});
