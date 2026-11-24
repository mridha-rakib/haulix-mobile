/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Screen: Review Completion Proof (W08 Canonical State: PROOF)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 907:6811 (EN: "W08-EN / PROOF · Review completion proof")
 * - Frame ID: 907:9711 (ES: "W08-ES / PROOF · Revisar prueba de finalización")
 * - Parent Section: 902:6811 (EN) / 902:6812 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Entry point to Workflow 08 from W06 completion bridge.
 * - Zero route guards; unrestricted direct access.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  W08BookingCard,
  W08Header,
  W08PrototypeDisclaimer,
  W08StatusBadge,
} from "../../src/components/completion/W08CompletionCard";

const SOFA_IMAGE = require("../../../assets/images/intake/c18j-sofa.png");
const BOXES_IMAGE = require("../../../assets/images/intake/c19p-boxes.png");

export default function CompletionProofScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);

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
        pathname: "/active-service-completion-bridge",
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

  const handleReviewConfirmation = useCallback(() => {
    router.push({
      pathname: "/completion-confirm",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleMissingEvidence = useCallback(() => {
    router.push({
      pathname: "/completion-proof-missing",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePreviewDenied = useCallback(() => {
    router.push({
      pathname: "/completion-proof-denied",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleMyJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <W08Header backA11y={t("w08Proof.backA11y")} onBack={handleBack} testID="w08-proof-header" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w08-proof-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle} testID="w08-proof-title">
            {t("w08Proof.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle} testID="w08-proof-subtitle">
            {t("w08Proof.screenSubtitle")}
          </Text>
        </View>

        {/* Status Badge */}
        <W08StatusBadge label={t("w08Proof.badgeProof")} testID="w08-proof-status-badge" />

        {/* Booking Reference Card */}
        <W08BookingCard
          bookingRef={t("w08Proof.bookingRef")}
          itemSummary={t("w08Proof.itemSummary")}
          serviceCategory={t("w08Proof.serviceCategory")}
          serviceSchedule={t("w08Proof.serviceSchedule")}
          testID="w08-proof-booking-card"
        />

        {/* Proof Content Card with Interactive Photo Tiles */}
        <View style={styles.proofCard} testID="w08-proof-content-card">
          <Text style={styles.proofHeading}>{t("w08Proof.proofHeading")}</Text>

          {/* Side-by-Side Photo Tiles */}
          <View style={styles.photoTilesRow}>
            {/* Photo Tile 1 */}
            <Pressable
              accessibilityLabel={`${t("w08Proof.sample1Label")} · ${t("w08Proof.sampleSubtitle")}`}
              accessibilityRole="button"
              onPress={() => setActivePhotoModal("sample1")}
              style={styles.photoTile}
              testID="w08-proof-tile-1"
            >
              <View style={styles.photoTileImageWrapper}>
                <Image source={SOFA_IMAGE} style={styles.photoTileImage} resizeMode="cover" />
              </View>
              <Text style={styles.photoLabel}>{t("w08Proof.sample1Label")}</Text>
            </Pressable>

            {/* Photo Tile 2 */}
            <Pressable
              accessibilityLabel={`${t("w08Proof.sample2Label")} · ${t("w08Proof.sampleSubtitle")}`}
              accessibilityRole="button"
              onPress={() => setActivePhotoModal("sample2")}
              style={styles.photoTile}
              testID="w08-proof-tile-2"
            >
              <View style={styles.photoTileImageWrapper}>
                <Image source={BOXES_IMAGE} style={styles.photoTileImage} resizeMode="cover" />
              </View>
              <Text style={styles.photoLabel}>{t("w08Proof.sample2Label")}</Text>
            </Pressable>
          </View>

          {/* Source Notice */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoTag}>{t("w08Proof.sourceHeading")}</Text>
            <Text style={styles.infoDescription}>{t("w08Proof.sourceDescription")}</Text>
          </View>

          {/* Requirement Notice */}
          <View style={styles.infoBlock}>
            <Text style={styles.infoTag}>{t("w08Proof.requirementHeading")}</Text>
            <Text style={styles.infoDescription}>{t("w08Proof.requirementDescription")}</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionsSection}>
          <Pressable
            accessibilityLabel={t("w08Proof.primaryCta")}
            accessibilityRole="button"
            onPress={handleReviewConfirmation}
            style={styles.primaryButton}
            testID="w08-proof-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w08Proof.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08Proof.secondaryCta")}
            accessibilityRole="button"
            onPress={handleMissingEvidence}
            style={styles.secondaryButton}
            testID="w08-proof-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w08Proof.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08Proof.tertiaryLink")}
            accessibilityRole="button"
            onPress={handleMyJobs}
            style={styles.tertiaryLink}
            testID="w08-proof-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w08Proof.tertiaryLink")}</Text>
          </Pressable>

          {/* QA Preview Shortcut to Denied State */}
          <Pressable
            accessibilityRole="button"
            onPress={handlePreviewDenied}
            style={styles.tertiaryLink}
            testID="w08-proof-denied-preview-btn"
          >
            <Text style={styles.tertiaryLinkTextSubtle}>{t("w08Proof.previewDeniedBtn")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <W08PrototypeDisclaimer
          text={t("w08Proof.prototypeDisclaimer")}
          testID="w08-proof-disclaimer"
        />
      </ScrollView>

      {/* Photo Preview Lightbox Modal */}
      <Modal
        animationType="fade"
        onRequestClose={() => setActivePhotoModal(null)}
        transparent
        visible={activePhotoModal !== null}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent} testID="w08-proof-modal">
            <View style={styles.modalImageWrapper}>
              <Image
                source={activePhotoModal === "sample1" ? SOFA_IMAGE : BOXES_IMAGE}
                style={styles.modalImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.modalTitle}>
              {activePhotoModal === "sample1"
                ? t("w08Proof.sample1Label")
                : t("w08Proof.sample2Label")}
            </Text>
            <Text style={styles.modalSubtitle}>{t("w08Proof.sampleSubtitle")}</Text>
            <Text style={styles.modalDescription}>{t("w08Proof.sourceDescription")}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setActivePhotoModal(null)}
              style={styles.modalCloseButton}
              testID="w08-proof-modal-close"
            >
              <Text style={styles.modalCloseButtonText}>{t("w08Proof.modalClose")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  heroSection: {
    gap: 6,
  },
  heroTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
  },
  heroSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  proofCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 18,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  proofHeading: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 18,
  },
  photoTilesRow: {
    flexDirection: "row",
    gap: 12,
  },
  photoTile: {
    flex: 1,
    gap: 6,
  },
  photoTileImageWrapper: {
    backgroundColor: "#111614",
    borderColor: colors.elevated,
    borderRadius: 12,
    borderWidth: 1,
    height: 120,
    overflow: "hidden",
  },
  photoTileImage: {
    height: "100%",
    width: "100%",
  },
  photoLabel: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  infoBlock: {
    gap: 3,
  },
  infoTag: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  infoDescription: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
  },
  actionsSection: {
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 12,
    borderWidth: 1,
    height: 52,
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  tertiaryLink: {
    alignItems: "center",
    paddingVertical: 4,
  },
  tertiaryLinkText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
  tertiaryLinkTextSubtle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  modalBackdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
    padding: 24,
    width: "100%",
  },
  modalImageWrapper: {
    borderColor: colors.elevated,
    borderRadius: 14,
    borderWidth: 1,
    height: 180,
    overflow: "hidden",
    width: "100%",
  },
  modalImage: {
    height: "100%",
    width: "100%",
  },
  modalEmoji: {
    fontSize: 60,
  },
  modalTitle: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  modalSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 11,
    textAlign: "center",
  },
  modalDescription: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  modalCloseButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
    marginTop: 8,
    width: "100%",
  },
  modalCloseButtonText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
});
