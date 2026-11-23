/**
 * HAULIX Customer Mobile App — Phase 03.52
 * Screen: Active Service — Extra Admin Pending (W06 Canonical State: EXTRA_ADMIN_PENDING)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:6876 (EN: "W06-EN / EXTRA_ADMIN_PENDING · Awaiting HAULIX Admin review")
 * - Frame ID: 883:7240 (ES: "W06-ES / EXTRA_ADMIN_PENDING · Esperando revisión de HAULIX")
 * - Parent Section: 881:5131 (EN) / 881:5132 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32AlertTriangleIcon,
  C32BoxIcon,
  C32CheckCircleIcon,
  C32ClockIcon,
  C32LocationPinIcon,
  C32LockIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function ActiveServiceExtraAdminPendingScreen() {
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
        pathname: "/active-service-extra-request",
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

  const handlePreviewApproved = useCallback(() => {
    router.push({
      pathname: "/active-service-extra-request",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePreviewDeclined = useCallback(() => {
    router.push({
      pathname: "/active-service-extra-admin-rejected",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleServiceReturn = useCallback(() => {
    router.push({
      pathname: "/active-service-working",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06ExtraAdminPending.stepAssigned"),
    t("w06ExtraAdminPending.stepEnroute"),
    t("w06ExtraAdminPending.stepArrived"),
    t("w06ExtraAdminPending.stepService"),
    t("w06ExtraAdminPending.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06ExtraAdminPending.backA11y")}
        testID="w06-extra-admin-pending-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-extra-admin-pending-scroll"
      >
        {/* 5-Step Service Stages: Step 3 (Service) is active */}
        <View style={styles.progressTrackContainer} testID="w06-progress-track">
          <View style={styles.progressLinkingTrack} />
          <View style={[styles.progressCompletedTrack, { width: "75%" }]} />
          <View style={styles.progressNodesRow}>
            {stages.map((stepName, idx) => {
              const isCompleted = idx < 3;
              const isActive = idx === 3;
              return (
                <View key={stepName} style={styles.progressNodeItem}>
                  <View
                    style={[
                      styles.progressDot,
                      isCompleted && styles.progressDotCompleted,
                      isActive && styles.progressDotActive,
                    ]}
                  />
                  <Text
                    style={[
                      styles.progressNodeLabel,
                      isActive && styles.progressNodeLabelActive,
                      isCompleted && styles.progressNodeLabelCompleted,
                    ]}
                    numberOfLines={1}
                  >
                    {stepName}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Location Chip */}
        <View style={styles.locationChip} testID="w06-extra-admin-pending-location-chip">
          <C32LocationPinIcon size={14} color={colors.brand} />
          <Text style={styles.locationChipText} numberOfLines={1}>
            {t("w06ExtraAdminPending.serviceArea")}
          </Text>
        </View>

        {/* Screen Headline & Subtitle */}
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle} testID="w06-extra-admin-pending-title">
            {t("w06ExtraAdminPending.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w06-extra-admin-pending-subtitle">
            {t("w06ExtraAdminPending.screenSubtitle")}
          </Text>
        </View>

        {/* Job Card with Admin Pending Badge */}
        <View style={styles.jobCard} testID="w06-extra-admin-pending-job-card">
          <View style={styles.jobCardHeader}>
            <View style={styles.warningBadge}>
              <Text style={styles.warningBadgeText}>{t("w06ExtraAdminPending.statusBadge")}</Text>
            </View>
            <Text style={styles.bookingRefText}>
              {t("w06ExtraAdminPending.bookingRefPrefix")}{" "}
              {t("w06ExtraAdminPending.bookingRefValue")}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32BoxIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06ExtraAdminPending.serviceLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06ExtraAdminPending.serviceValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32TruckIcon size={18} color="#38BDF8" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06ExtraAdminPending.driverLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06ExtraAdminPending.driverValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32ClockIcon size={18} color="#F59E0B" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06ExtraAdminPending.demoRequestLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06ExtraAdminPending.demoRequestValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32LockIcon size={18} color={colors.secondaryText} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06ExtraAdminPending.chargeControlLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06ExtraAdminPending.chargeControlValue")}</Text>
            </View>
          </View>
        </View>

        {/* Customer Blocked Notice Banner */}
        <View style={styles.blockedBanner} testID="w06-extra-admin-pending-blocked-banner">
          <C32LockIcon size={18} color="#F59E0B" />
          <Text style={styles.blockedBannerText}>
            {t("w06ExtraAdminPending.blockedNoticeText")}
          </Text>
        </View>

        {/* Scope Review Card */}
        <View style={styles.detailsCard} testID="w06-extra-admin-pending-details-card">
          <Text style={styles.detailsCategory}>{t("w06ExtraAdminPending.cardCategoryLabel")}</Text>
          <Text style={styles.detailsHeading}>{t("w06ExtraAdminPending.cardHeading")}</Text>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32BoxIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06ExtraAdminPending.insight1Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06ExtraAdminPending.insight1Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ShieldCheckIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06ExtraAdminPending.insight2Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06ExtraAdminPending.insight2Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32CheckCircleIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06ExtraAdminPending.insight3Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06ExtraAdminPending.insight3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Revision R2 Box */}
        <View style={styles.revisionCard} testID="w06-extra-admin-pending-revision-card">
          <Text style={styles.revisionTitle}>{t("w06ExtraAdminPending.revisionCardTitle")}</Text>

          <View style={styles.revisionItemRow}>
            <Text style={styles.revisionItemLabel}>
              {t("w06ExtraAdminPending.originalScopeLabel")}
            </Text>
            <Text style={styles.revisionItemValue}>
              {t("w06ExtraAdminPending.originalScopeValue")}
            </Text>
          </View>

          <View style={styles.revisionItemRow}>
            <Text style={styles.revisionItemLabel}>
              {t("w06ExtraAdminPending.proposedItemLabel")}
            </Text>
            <Text style={styles.revisionItemValue}>
              {t("w06ExtraAdminPending.proposedItemValue")}
            </Text>
          </View>

          <View style={styles.revisionItemRow}>
            <Text style={styles.revisionItemLabel}>
              {t("w06ExtraAdminPending.amountChangeLabel")}
            </Text>
            <Text style={styles.revisionItemPrice}>
              {t("w06ExtraAdminPending.amountChangeValue")}
            </Text>
          </View>

          <View style={styles.revisionNoticeBox}>
            <C32AlertTriangleIcon size={16} color="#F59E0B" />
            <Text style={styles.revisionNoticeText}>
              {t("w06ExtraAdminPending.approvalRequirementNotice")}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={handlePreviewApproved}
          accessibilityRole="button"
          accessibilityLabel={t("w06ExtraAdminPending.primaryCta")}
          testID="w06-extra-admin-pending-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w06ExtraAdminPending.primaryCta")}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={handlePreviewDeclined}
          accessibilityRole="button"
          accessibilityLabel={t("w06ExtraAdminPending.secondaryCta")}
          testID="w06-extra-admin-pending-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w06ExtraAdminPending.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.altLinkButton}
          onPress={handleServiceReturn}
          accessibilityRole="button"
          accessibilityLabel={t("w06ExtraAdminPending.alternativeLink")}
          testID="w06-extra-admin-pending-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w06ExtraAdminPending.alternativeLink")}</Text>
        </Pressable>

        {/* Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>
            {t("w06ExtraAdminPending.prototypeDisclaimer")}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 36,
  },
  progressTrackContainer: {
    marginBottom: 20,
    paddingTop: 8,
    position: "relative",
  },
  progressLinkingTrack: {
    position: "absolute",
    top: 15,
    left: 20,
    right: 20,
    height: 3,
    backgroundColor: colors.elevated,
    borderRadius: 2,
  },
  progressCompletedTrack: {
    position: "absolute",
    top: 15,
    left: 20,
    height: 3,
    backgroundColor: colors.brand,
    borderRadius: 2,
  },
  progressNodesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressNodeItem: {
    alignItems: "center",
    width: 60,
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.elevated,
    marginBottom: 6,
  },
  progressDotCompleted: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  progressDotActive: {
    backgroundColor: colors.background,
    borderColor: colors.brand,
    borderWidth: 3,
  },
  progressNodeLabel: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    textAlign: "center",
  },
  progressNodeLabelActive: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
  },
  progressNodeLabelCompleted: {
    color: colors.primaryText,
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(189, 255, 0, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(189, 255, 0, 0.2)",
  },
  locationChipText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  headerBlock: {
    marginBottom: 18,
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  jobCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 14,
  },
  jobCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  warningBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.35)",
  },
  warningBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: "#F59E0B",
    letterSpacing: 0.5,
  },
  bookingRefText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
  },
  divider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    gap: 12,
  },
  iconCol: {
    width: 28,
    alignItems: "center",
  },
  textCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  blockedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  blockedBannerText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: "#F59E0B",
    flex: 1,
    lineHeight: 16,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 16,
  },
  detailsCategory: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  detailsHeading: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    marginBottom: 14,
  },
  pointRow: {
    flexDirection: "row",
    marginVertical: 8,
    gap: 12,
  },
  pointIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(189, 255, 0, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  pointTextWrap: {
    flex: 1,
    minWidth: 0,
  },
  pointTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 2,
  },
  pointDescription: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 16,
  },
  revisionCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    padding: 16,
    marginBottom: 20,
  },
  revisionTitle: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: "#F59E0B",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  revisionItemRow: {
    marginVertical: 4,
  },
  revisionItemLabel: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    marginBottom: 2,
  },
  revisionItemValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  revisionItemPrice: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.brand,
  },
  revisionNoticeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(245, 158, 11, 0.08)",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  revisionNoticeText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    flex: 1,
    lineHeight: 15,
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
    marginTop: 8,
  },
  footerDisclaimer: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    opacity: 0.7,
  },
});
