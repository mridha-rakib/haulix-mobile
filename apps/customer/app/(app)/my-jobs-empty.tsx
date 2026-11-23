/**
 * HAULIX Customer Mobile App — Phase 03.55
 * Screen: My Jobs — Empty State (W07 Canonical State: HOME_EMPTY)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:5946 (EN: "W07-EN / HOME_EMPTY · No bookings yet")
 * - Frame ID: 893:6352 (ES: "W07-ES / HOME_EMPTY · Aún no hay reservas")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Displays empty booking state without requiring real database query.
 * - Direct navigation to booking entry points; zero route guards.
 * - CustomerBottomNav with activeTab="jobs".
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C32BriefcaseIcon, C32InfoIcon } from "../../src/components/dispatch/C32Icons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";

export default function MyJobsEmptyScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/my-jobs",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    }
  }, [router, params.previewLocale]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleBackToMyJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePreviewDetails = useCallback(() => {
    router.push({
      pathname: "/job-details",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleContactSupport = useCallback(() => {
    router.push({
      pathname: "/active-service-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-empty-header">
        <Pressable
          accessibilityLabel={t("w07HomeEmpty.backA11y")}
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBack}
          style={styles.backButton}
          testID="w07-empty-back-btn"
        >
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <View style={styles.brandTitleContainer}>
          <Text style={styles.brandHaul}>{t("w07HomeEmpty.brandHaul")}</Text>
          <Text style={styles.brandIx}>{t("w07HomeEmpty.brandIx")}</Text>
        </View>
        <View style={styles.menuDotsContainer}>
          <Text style={styles.menuDotsText}>{t("w07HomeEmpty.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-empty-scroll"
      >
        {/* Title and Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle} testID="w07-empty-title">
            {t("w07HomeEmpty.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w07-empty-subtitle">
            {t("w07HomeEmpty.screenSubtitle")}
          </Text>
        </View>

        {/* Section Badge */}
        <View style={styles.sectionBadge} testID="w07-empty-badge">
          <View style={styles.sectionBadgeIconWrap}>
            <C32InfoIcon size={14} color={colors.secondaryText} />
          </View>
          <Text style={styles.sectionBadgeText}>{t("w07HomeEmpty.badgeEmpty")}</Text>
        </View>

        {/* Filter Tabs / Pills */}
        <View style={styles.filterPillsRow} testID="w07-empty-filter-pills">
          <Pressable
            onPress={handleBackToMyJobs}
            style={[styles.filterPill, styles.filterPillActive]}
            accessibilityRole="tab"
          >
            <Text style={styles.filterPillActiveText}>{t("w07HomeEmpty.tabActive")}</Text>
          </Pressable>
          <View style={styles.filterPill}>
            <Text style={styles.filterPillText}>{t("w07HomeEmpty.tabScheduled")}</Text>
          </View>
          <Pressable
            onPress={() => router.push("/my-jobs-history")}
            style={styles.filterPill}
            accessibilityRole="tab"
          >
            <Text style={styles.filterPillText}>{t("w07HomeEmpty.tabHistory")}</Text>
          </Pressable>
        </View>

        {/* Empty State Card */}
        <View style={styles.emptyCard} testID="w07-empty-card">
          <View style={styles.emptyIconCircle}>
            <C32BriefcaseIcon size={32} color={colors.secondaryText} />
          </View>
          <Text style={styles.emptyCardHeading}>{t("w07HomeEmpty.cardHeading")}</Text>
          <Text style={styles.emptyCardDescription}>{t("w07HomeEmpty.cardDescription")}</Text>
          <View style={styles.cardDivider} />
          <Text style={styles.disclaimerOwnerText}>{t("w07HomeEmpty.disclaimerOwner")}</Text>
        </View>

        {/* Action Buttons */}
        <Pressable
          accessibilityLabel={t("w07HomeEmpty.primaryCta")}
          accessibilityRole="button"
          onPress={handleBackToMyJobs}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          testID="w07-empty-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w07HomeEmpty.primaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07HomeEmpty.secondaryCta")}
          accessibilityRole="button"
          onPress={handlePreviewDetails}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          testID="w07-empty-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w07HomeEmpty.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07HomeEmpty.altLink")}
          accessibilityRole="button"
          onPress={handleContactSupport}
          style={styles.altLinkButton}
          testID="w07-empty-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w07HomeEmpty.altLink")}</Text>
        </Pressable>

        {/* Prototype Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w07HomeEmpty.prototypeDisclaimer")}</Text>
        </View>
      </ScrollView>

      {/* Customer Bottom Navigation */}
      <CustomerBottomNav activeTab="jobs" />
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.elevated,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  backChevron: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginTop: -2,
  },
  brandTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandHaul: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  brandIx: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  menuDotsContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  menuDotsText: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  titleContainer: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignSelf: "flex-start",
    marginBottom: 14,
    gap: 6,
  },
  sectionBadgeIconWrap: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.6,
  },
  filterPillsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  filterPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterPillText: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.secondaryText,
  },
  filterPillActiveText: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.background,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyCardHeading: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyCardDescription: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  cardDivider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.elevated,
    marginVertical: 14,
  },
  disclaimerOwnerText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    opacity: 0.8,
    textAlign: "center",
  },
  primaryButton: {
    height: 50,
    backgroundColor: colors.brand,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.background,
  },
  secondaryButton: {
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  altLinkButton: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 16,
  },
  altLinkText: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    textDecorationLine: "underline",
  },
  footerWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  footerDisclaimer: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    opacity: 0.7,
  },
});
