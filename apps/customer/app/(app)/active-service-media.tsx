/**
 * HAULIX Customer Mobile App — Phase 03.51
 * Screen: Active Service — Media (W06 Canonical State: MEDIA)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:6336 (EN: "W06-EN / MEDIA · Send photo or voice evidence")
 * - Frame ID: 883:6700 (ES: "W06-ES / MEDIA · Enviar foto o audio")
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
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32CheckCircleIcon,
  C32LocationPinIcon,
  C32LockIcon,
  C32MicrophoneIcon,
  C32PhotoIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function ActiveServiceMediaScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [photoSelected, setPhotoSelected] = useState(false);
  const [voiceRecorded, setVoiceRecorded] = useState(false);

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
        pathname: "/active-service-chat",
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

  const handlePreviewUpload = useCallback(() => {
    router.push({
      pathname: "/active-service-working",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePermissionsDenied = useCallback(() => {
    router.push({
      pathname: "/active-service-chat",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleConversationReturn = useCallback(() => {
    router.push({
      pathname: "/active-service-chat",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06Media.stepAssigned"),
    t("w06Media.stepEnroute"),
    t("w06Media.stepArrived"),
    t("w06Media.stepService"),
    t("w06Media.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06Media.backA11y")}
        testID="w06-media-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-media-scroll"
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
        <View style={styles.locationChip} testID="w06-media-location-chip">
          <C32LocationPinIcon size={14} color={colors.brand} />
          <Text style={styles.locationChipText} numberOfLines={1}>
            {t("w06Media.serviceArea")}
          </Text>
        </View>

        {/* Screen Headline & Subtitle */}
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle} testID="w06-media-title">
            {t("w06Media.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w06-media-subtitle">
            {t("w06Media.screenSubtitle")}
          </Text>
        </View>

        {/* Media Composer Card */}
        <View style={styles.composerCard} testID="w06-media-composer-card">
          <View style={styles.cardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{t("w06Media.statusBadge")}</Text>
            </View>
            <Text style={styles.bookingRefText}>
              {t("w06Media.bookingRefPrefix")} {t("w06Media.bookingRefValue")}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeading}>{t("w06Media.sectionTitle")}</Text>

          {/* Media Attach Tiles */}
          <View style={styles.tilesContainer}>
            {/* Tile 1: Photo */}
            <Pressable
              style={[styles.mediaTile, photoSelected && styles.mediaTileSelected]}
              onPress={() => setPhotoSelected(!photoSelected)}
              accessibilityRole="button"
              accessibilityLabel={t("w06Media.tile1Title")}
              testID="w06-media-tile-photo"
            >
              <View style={styles.tileIconRow}>
                <View style={styles.tileIconWrap}>
                  <C32PhotoIcon size={24} color={colors.brand} />
                </View>
                {photoSelected && <C32CheckCircleIcon size={20} color={colors.brand} />}
              </View>
              <Text style={styles.tileTitle}>{t("w06Media.tile1Title")}</Text>
              <Text style={styles.tileSubtitle}>{t("w06Media.tile1Subtitle")}</Text>
              <View style={styles.tileButtonWrap}>
                <Text style={styles.tileButtonText}>{t("w06Media.tile1Action")}</Text>
              </View>
            </Pressable>

            {/* Tile 2: Voice Note */}
            <Pressable
              style={[styles.mediaTile, voiceRecorded && styles.mediaTileSelected]}
              onPress={() => setVoiceRecorded(!voiceRecorded)}
              accessibilityRole="button"
              accessibilityLabel={t("w06Media.tile2Title")}
              testID="w06-media-tile-voice"
            >
              <View style={styles.tileIconRow}>
                <View style={styles.tileIconWrap}>
                  <C32MicrophoneIcon size={24} color={colors.brand} />
                </View>
                {voiceRecorded && <C32CheckCircleIcon size={20} color={colors.brand} />}
              </View>
              <Text style={styles.tileTitle}>{t("w06Media.tile2Title")}</Text>
              <Text style={styles.tileSubtitle}>{t("w06Media.tile2Subtitle")}</Text>
              <View style={styles.tileButtonWrap}>
                <Text style={styles.tileButtonText}>{t("w06Media.tile2Action")}</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Media Guidelines Card */}
        <View style={styles.detailsCard} testID="w06-media-details-card">
          <Text style={styles.detailsCategory}>{t("w06Media.cardCategoryLabel")}</Text>
          <Text style={styles.detailsHeading}>{t("w06Media.cardHeading")}</Text>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32MicrophoneIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06Media.insight1Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06Media.insight1Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32PhotoIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06Media.insight2Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06Media.insight2Desc")}</Text>
            </View>
          </View>

          <View style={styles.pointRow}>
            <View style={styles.pointIconWrap}>
              <C32LockIcon size={18} color={colors.brand} />
            </View>
            <View style={styles.pointTextWrap}>
              <Text style={styles.pointTitle}>{t("w06Media.insight3Title")}</Text>
              <Text style={styles.pointDescription}>{t("w06Media.insight3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={handlePreviewUpload}
          accessibilityRole="button"
          accessibilityLabel={t("w06Media.primaryCta")}
          testID="w06-media-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w06Media.primaryCta")}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={handlePermissionsDenied}
          accessibilityRole="button"
          accessibilityLabel={t("w06Media.secondaryCta")}
          testID="w06-media-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w06Media.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.altLinkButton}
          onPress={handleConversationReturn}
          accessibilityRole="button"
          accessibilityLabel={t("w06Media.alternativeLink")}
          testID="w06-media-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w06Media.alternativeLink")}</Text>
        </Pressable>

        {/* Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w06Media.prototypeDisclaimer")}</Text>
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
  composerCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: "rgba(189, 255, 0, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(189, 255, 0, 0.35)",
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
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
  sectionHeading: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  tilesContainer: {
    flexDirection: "row",
    gap: 12,
  },
  mediaTile: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 14,
    alignItems: "center",
  },
  mediaTileSelected: {
    borderColor: colors.brand,
    backgroundColor: "rgba(189, 255, 0, 0.05)",
  },
  tileIconRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    position: "relative",
  },
  tileIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  tileTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
    marginBottom: 2,
    textAlign: "center",
  },
  tileSubtitle: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    marginBottom: 12,
    textAlign: "center",
  },
  tileButtonWrap: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  tileButtonText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.brand,
    textAlign: "center",
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
