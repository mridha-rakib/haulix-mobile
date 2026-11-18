/**
 * C19-E Manual Item Correction
 *
 * Authoritative Figma: Node 382:1306 (EN) & Node 980:9388 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-E
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
import { C19E_DEFAULT_ITEM } from "../../src/fixtures/c19eEditItem";
import { updateDraftInventoryItem } from "../../src/fixtures/c19ItemInventory";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function EditInventoryItemScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = "HX-DEMO-1027";

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

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

  const handleSave = useCallback(() => {
    updateDraftInventoryItem("sofa", {
      countDimensions: "Qty 1 · 82 × 35 × 34 in (Verified)",
      countDimensionsEs: "Cant. 1 · 82 × 35 × 34 pulg. (Verificado)",
      weight: "125 lb · customer estimate",
      weightEs: "125 lb · estimación del cliente",
    });
    setNoticeMessage(t("c19e.noticeSaved"));
  }, [t]);

  const handleCancel = useCallback(() => {
    handleBack();
  }, [handleBack]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c19e-header-back" onBack={handleBack} backA11y={t("c19e.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c19e-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c19e.noticeDismiss")}
            testID="c19e-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c19e.noticeDismiss")}</Text>
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
          <Text style={styles.stepChipLeft}>{t("c19e.stepIndicator")}</Text>
          <Text style={styles.stepChipRight}>{t("c19e.stepSub")}</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c19e.title")}</Text>
          <Text style={styles.subtitleText}>{t("c19e.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c19e-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Item Details Card */}
        <View style={styles.sectionCard} testID="c19e-item-card">
          <Text style={styles.sectionTitle}>
            {t(`c19e.${C19E_DEFAULT_ITEM.itemSectionTitleKey}`)}
          </Text>
          <View style={styles.detailList}>
            {C19E_DEFAULT_ITEM.details.map((row) => (
              <View key={row.key} style={styles.detailRow} testID={`c19e-detail-${row.key}`}>
                <Text style={styles.detailLabel}>{t(`c19e.${row.labelKey}`)}</Text>
                <Text style={styles.detailValue}>{t(`c19e.${row.valueKey}`)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Save Status Card */}
        <View style={styles.sectionCard} testID="c19e-save-card">
          <Text style={styles.sectionTitle}>{t("c19e.saveSectionTitle")}</Text>

          <View style={styles.badgeRow}>
            <C18CheckIcon size={16} color={colors.secondaryText} />
            <Text style={styles.badgeText}>{t("c19e.completedBadge")}</Text>
          </View>

          <Text style={styles.bodyText}>{t("c19e.saveDisclaimer1")}</Text>
          <Text style={styles.bodyText}>{t("c19e.saveDisclaimer2")}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleSave}
            accessibilityRole="button"
            accessibilityLabel={t("c19e.saveCta")}
            testID="c19e-save-button"
          >
            <Text style={styles.primaryButtonText}>{t("c19e.saveCta")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleCancel}
            accessibilityRole="button"
            accessibilityLabel={t("c19e.cancelCta")}
            testID="c19e-cancel-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c19e.cancelCta")}</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>{t("c19e.footerDemo")}</Text>
          <Text style={styles.footerText}>{t("c19e.footerSrs")}</Text>
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
  noticeBox: {
    marginHorizontal: 22,
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderWidth: 1,
    borderColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.primaryText,
    flex: 1,
    marginRight: 8,
  },
  noticeDismiss: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.brand,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.background,
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
