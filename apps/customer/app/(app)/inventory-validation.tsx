/**
 * C19-V Missing Measurements Validation
 *
 * Authoritative Figma: Node 382:1424 (EN) & Node 980:9538 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-V
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C18AlertCircleIcon, C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C19V_DEFAULT_ITEM } from "../../src/fixtures/c19vValidation";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function InventoryValidationScreen() {
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

  const handleCompleteItemInfo = useCallback(() => {
    router.push({ pathname: "/edit-inventory-item" });
  }, [router]);

  const handleReturnToInventory = useCallback(() => {
    handleBack();
  }, [handleBack]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c19v-header-back" onBack={handleBack} backA11y={t("c19v.backA11y")} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.stepChipContainer}>
          <Text style={styles.stepChipLeft}>{t("c19v.stepIndicator")}</Text>
          <Text style={styles.stepChipRight}>{t("c19v.stepSub")}</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c19v.title")}</Text>
          <Text style={styles.subtitleText}>{t("c19v.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c19v-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Clarification Item Details Card */}
        <View style={styles.sectionCard} testID="c19v-item-card">
          <Text style={styles.sectionTitle}>
            {t(`c19v.${C19V_DEFAULT_ITEM.clarificationSectionTitleKey}`)}
          </Text>
          <View style={styles.detailList}>
            {C19V_DEFAULT_ITEM.details.map((row) => (
              <View key={row.key} style={styles.detailRow} testID={`c19v-detail-${row.key}`}>
                <Text style={styles.detailLabel}>{t(`c19v.${row.labelKey}`)}</Text>
                <Text style={styles.detailValue}>{t(`c19v.${row.valueKey}`)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Measurements Unavailable Warning Card */}
        <View style={styles.sectionCard} testID="c19v-warning-card">
          <Text style={styles.sectionTitle}>{t("c19v.warningSectionTitle")}</Text>

          <View style={styles.badgeRow}>
            <C18AlertCircleIcon size={16} color={colors.error} />
            <Text style={styles.alertBadgeText}>{t("c19v.actionRequiredBadge")}</Text>
          </View>

          <Text style={styles.warningBodyText}>{t("c19v.warningGuidance")}</Text>
          <Text style={styles.warningBodyText}>{t("c19v.warningDisclaimer")}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleCompleteItemInfo}
            accessibilityRole="button"
            accessibilityLabel={t("c19v.completeInfoCta")}
            testID="c19v-complete-button"
          >
            <Text style={styles.primaryButtonText}>{t("c19v.completeInfoCta")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleReturnToInventory}
            accessibilityRole="button"
            accessibilityLabel={t("c19v.returnToInventoryCta")}
            testID="c19v-return-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c19v.returnToInventoryCta")}</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>{t("c19v.footerDemo")}</Text>
          <Text style={styles.footerText}>{t("c19v.footerSrs")}</Text>
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
  alertBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
  },
  warningBodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.primaryText,
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
