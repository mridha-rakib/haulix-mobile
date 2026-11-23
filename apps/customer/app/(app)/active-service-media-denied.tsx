/**
 * HAULIX Customer Mobile App — Phase 03.52
 * Screen: Active Service — Media Denied (W06 Canonical State: MEDIA_DENIED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:6443 (EN: "W06-EN / MEDIA_DENIED · Media permission required")
 * - Frame ID: 883:6807 (ES: "W06-ES / MEDIA_DENIED · Se requiere permiso multimedia")
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
  C32LocationPinIcon,
  C32LockIcon,
  C32MicrophoneIcon,
  C32PhotoIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function ActiveServiceMediaDeniedScreen() {
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
        pathname: "/active-service-media",
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

  const handleReviewChoices = useCallback(() => {
    router.push({
      pathname: "/active-service-media",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReturnToChat = useCallback(() => {
    router.push({
      pathname: "/active-service-chat",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleSupportLink = useCallback(() => {
    router.push({
      pathname: "/dispatch-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06MediaDenied.stepAssigned"),
    t("w06MediaDenied.stepEnroute"),
    t("w06MediaDenied.stepArrived"),
    t("w06MediaDenied.stepService"),
    t("w06MediaDenied.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06MediaDenied.backA11y")}
        testID="w06-media-denied-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-media-denied-scroll"
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
        <View style={styles.locationChip} testID="w06-media-denied-location-chip">
          <C32LocationPinIcon size={14} color={colors.brand} />
          <Text style={styles.locationChipText} numberOfLines={1}>
            {t("w06MediaDenied.serviceArea")}
          </Text>
        </View>

        {/* Screen Headline & Subtitle */}
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle} testID="w06-media-denied-title">
            {t("w06MediaDenied.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w06-media-denied-subtitle">
            {t("w06MediaDenied.screenSubtitle")}
          </Text>
        </View>

        {/* Status Card with Context */}
        <View style={styles.jobCard} testID="w06-media-denied-job-card">
          <View style={styles.jobCardHeader}>
            <View style={styles.warningBadge}>
              <Text style={styles.warningBadgeText}>{t("w06MediaDenied.statusBadge")}</Text>
            </View>
            <Text style={styles.bookingRefText}>
              {t("w06MediaDenied.bookingRefPrefix")} {t("w06MediaDenied.bookingRefValue")}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32BoxIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06MediaDenied.serviceLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06MediaDenied.serviceValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32TruckIcon size={18} color="#38BDF8" />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06MediaDenied.driverLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06MediaDenied.driverValue")}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCol}>
              <C32LockIcon size={18} color={colors.secondaryText} />
            </View>
            <View style={styles.textCol}>
              <Text style={styles.infoLabel}>{t("w06MediaDenied.threadLabel")}</Text>
              <Text style={styles.infoValue}>{t("w06MediaDenied.threadValue")}</Text>
            </View>
          </View>
        </View>

        {/* Authorized Evidence Guidelines Card */}
        <View style={styles.detailsCard} testID="w06-media-denied-details-card">
          <Text style={styles.detailsCategory}>{t("w06MediaDenied.cardCategoryLabel")}</Text>
          <Text style={styles.detailsHeading}>{t("w06MediaDenied.cardHeading")}</Text>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32PhotoIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06MediaDenied.insight1Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06MediaDenied.insight1Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32MicrophoneIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06MediaDenied.insight2Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06MediaDenied.insight2Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32ShieldCheckIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06MediaDenied.insight3Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06MediaDenied.insight3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Attachments Card */}
        <View style={styles.attachmentsCard} testID="w06-media-denied-attachments-card">
          <Text style={styles.attachmentsCategory}>{t("w06MediaDenied.attachmentsTitle")}</Text>

          <View style={styles.tilesRow}>
            <View style={styles.attachmentTile}>
              <C32PhotoIcon size={20} color={colors.secondaryText} />
              <Text style={styles.tileTitle}>{t("w06MediaDenied.tile1Title")}</Text>
              <Text style={styles.tileSub}>{t("w06MediaDenied.tile1Subtitle")}</Text>
            </View>
            <View style={styles.attachmentTile}>
              <C32MicrophoneIcon size={20} color={colors.secondaryText} />
              <Text style={styles.tileTitle}>{t("w06MediaDenied.tile2Title")}</Text>
              <Text style={styles.tileSub}>{t("w06MediaDenied.tile2Subtitle")}</Text>
            </View>
          </View>

          <View style={styles.noticeBox}>
            <C32AlertTriangleIcon size={16} color="#F59E0B" />
            <Text style={styles.noticeText}>{t("w06MediaDenied.attachmentNotice")}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={handleReviewChoices}
          accessibilityRole="button"
          accessibilityLabel={t("w06MediaDenied.primaryCta")}
          testID="w06-media-denied-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w06MediaDenied.primaryCta")}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={handleReturnToChat}
          accessibilityRole="button"
          accessibilityLabel={t("w06MediaDenied.secondaryCta")}
          testID="w06-media-denied-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w06MediaDenied.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.altLinkButton}
          onPress={handleSupportLink}
          accessibilityRole="button"
          accessibilityLabel={t("w06MediaDenied.alternativeLink")}
          testID="w06-media-denied-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w06MediaDenied.alternativeLink")}</Text>
        </Pressable>

        {/* Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w06MediaDenied.prototypeDisclaimer")}</Text>
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
    marginBottom: 16,
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
  attachmentsCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 20,
  },
  attachmentsCategory: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  tilesRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  attachmentTile: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 12,
    alignItems: "center",
  },
  tileTitle: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginTop: 6,
    marginBottom: 2,
  },
  tileSub: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  noticeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(245, 158, 11, 0.08)",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.2)",
  },
  noticeText: {
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
