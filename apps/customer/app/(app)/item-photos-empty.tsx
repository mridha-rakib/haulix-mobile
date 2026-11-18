/**
 * C19-P-E Empty Media State
 *
 * Authoritative Figma: Node 382:1644 (EN) & Node 980:9822 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P-E
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

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function ItemPhotosEmptyScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = "HX-DEMO-1027";

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/item-photos" });
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleSelectPhotos = useCallback(() => {
    router.replace({ pathname: "/item-photos" });
  }, [router]);

  const handleReviewDetails = useCallback(() => {
    router.push("/item-inventory");
  }, [router]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack
        testID="c19pe-header-back"
        onBack={handleBack}
        backA11y={t("c19pe.backA11y")}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.stepChipContainer}>
          <Text style={styles.stepChipLeft}>{t("c19pe.stepIndicator")}</Text>
          <Text style={styles.stepChipRight}>{t("c19pe.stepSub")}</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c19pe.title")}</Text>
          <Text style={styles.subtitleText}>{t("c19pe.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c19pe-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* AI Recognition Needs Visual Evidence Card */}
        <View style={styles.sectionCard} testID="c19pe-ai-card">
          <Text style={styles.sectionTitle}>{t("c19pe.aiSectionTitle")}</Text>

          <View style={styles.badgeRow}>
            <C18CheckIcon size={16} color={colors.secondaryText} />
            <Text style={styles.badgeText}>{t("c19pe.reviewRequiredBadge")}</Text>
          </View>

          <Text style={styles.bodyText}>{t("c19pe.aiNotice1")}</Text>
          <Text style={styles.bodyText}>{t("c19pe.aiNotice2")}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleSelectPhotos}
            accessibilityRole="button"
            accessibilityLabel={t("c19pe.selectPhotosCta")}
            testID="c19pe-select-photos-button"
          >
            <Text style={styles.primaryButtonText}>{t("c19pe.selectPhotosCta")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleReviewDetails}
            accessibilityRole="button"
            accessibilityLabel={t("c19pe.reviewDetailsCta")}
            testID="c19pe-review-details-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c19pe.reviewDetailsCta")}</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>{t("c19pe.footerDemo")}</Text>
          <Text style={styles.footerText}>{t("c19pe.footerSrs")}</Text>
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
    paddingBottom: 36,
    gap: 17,
  },
  stepChipContainer: {
    height: 33,
    backgroundColor: colors.surface,
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
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
    color: colors.primaryText,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  customerChip: {
    height: 39,
    backgroundColor: "#1A2510",
    borderRadius: 9,
    paddingLeft: 12,
    paddingRight: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  customerChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.2,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    paddingHorizontal: 16,
    paddingVertical: 17,
    gap: 13,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.primaryText,
  },
  badgeRow: {
    height: 32,
    backgroundColor: colors.elevated,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    color: colors.secondaryText,
    lineHeight: 18,
  },
  actionsSection: {
    gap: 11,
    marginTop: 6,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerSection: {
    marginTop: 8,
    gap: 8,
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
    lineHeight: 14,
  },
});
