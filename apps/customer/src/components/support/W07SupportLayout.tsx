/**
 * HAULIX Customer Mobile App — Phase 03.60
 * Shared Categorized Support Layout for W07 Customer Support Lifecycle
 *
 * Provides shared composition, responsive 360dp styling, hardware BackHandler,
 * topic navigation, and draft preservation across:
 * - /job-support (SUPPORT)
 * - /job-support-driver (SUPPORT_DRIVER)
 * - /job-support-service (SUPPORT_SERVICE)
 * - /job-support-payment (SUPPORT_PAYMENT)
 * - /job-support-other (SUPPORT_OTHER)
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  C32BriefcaseIcon,
  C32CalendarIcon,
  C32CreditCardIcon,
  C32MessageSquareIcon,
  C32PackageIcon,
  C32ShieldCheckIcon,
  C32TruckIcon,
} from "../dispatch/C32Icons";

export type SupportTopic = "changes" | "driver" | "service" | "payment" | "app" | "other";

export type SupportVariant = "default" | "driver" | "service" | "payment" | "other";

export function TopicChipButton({
  topic,
  label,
  selected,
  onSelect,
  icon,
  testID,
}: {
  topic: SupportTopic;
  label: string;
  selected: boolean;
  onSelect: (topic: SupportTopic) => void;
  icon: React.ReactNode;
  testID: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onSelect(topic)}
      style={[styles.topicChip, selected && styles.topicChipSelected]}
      testID={testID}
    >
      <View style={styles.topicChipIconWrap}>{icon}</View>
      <Text style={[styles.topicChipText, selected && styles.topicChipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

interface W07SupportLayoutProps {
  variant: SupportVariant;
  namespace:
    | "w07Support"
    | "w07SupportDriver"
    | "w07SupportService"
    | "w07SupportPayment"
    | "w07SupportOther";
  defaultTopic: SupportTopic;
  screenTestId: string;
}

export function W07SupportLayout({
  variant,
  namespace,
  defaultTopic,
  screenTestId,
}: W07SupportLayoutProps) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{
    previewLocale?: string;
    initialTopic?: string;
    draftText?: string;
    evidenceAttached?: string;
  }>();

  const [selectedTopic, setSelectedTopic] = useState<SupportTopic>(
    (params.initialTopic as SupportTopic) || defaultTopic
  );
  const [descriptionText, setDescriptionText] = useState(params.draftText || "");
  const [evidenceAttached, setEvidenceAttached] = useState(params.evidenceAttached === "true");

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
        pathname: "/job-details",
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

  const handleSelectTopic = useCallback(
    (newTopic: SupportTopic) => {
      if (newTopic === selectedTopic) {
        return;
      }

      const navParams = {
        ...(params.previewLocale ? { previewLocale: params.previewLocale } : {}),
        draftText: descriptionText,
        evidenceAttached: evidenceAttached ? "true" : "false",
      };

      if (newTopic === "driver" && variant !== "driver") {
        router.push({
          pathname: "/job-support-driver",
          params: navParams,
        });
      } else if (newTopic === "service" && variant !== "service") {
        router.push({
          pathname: "/job-support-service",
          params: navParams,
        });
      } else if (newTopic === "payment" && variant !== "payment") {
        router.push({
          pathname: "/job-support-payment",
          params: navParams,
        });
      } else if (newTopic === "other" && variant !== "other") {
        router.push({
          pathname: "/job-support-other",
          params: navParams,
        });
      } else if (newTopic === "changes" || newTopic === "app") {
        if (variant !== "default") {
          router.push({
            pathname: "/job-support",
            params: { ...navParams, initialTopic: newTopic },
          });
        } else {
          setSelectedTopic(newTopic);
        }
      } else {
        setSelectedTopic(newTopic);
      }
    },
    [selectedTopic, variant, router, params.previewLocale, descriptionText, evidenceAttached]
  );

  const handleSubmitSampleCase = useCallback(() => {
    router.push({
      pathname: "/job-support-submitted",
      params: {
        ...(params.previewLocale ? { previewLocale: params.previewLocale } : {}),
        originatingCategory: variant,
      },
    });
  }, [router, params.previewLocale, variant]);

  const handleSeePendingCase = useCallback(() => {
    router.push({
      pathname: "/job-support-pending",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReturnToBooking = useCallback(() => {
    router.push({
      pathname: "/job-details",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePreviewFailure = useCallback(() => {
    router.push({
      pathname: "/job-support-failed",
      params: {
        ...(params.previewLocale ? { previewLocale: params.previewLocale } : {}),
        originatingCategory: variant === "default" ? selectedTopic : variant,
      },
    });
  }, [router, params.previewLocale, variant, selectedTopic]);

  // Sourced localized strings
  const screenTitle = t(`${namespace}.screenTitle`);
  const screenSubtitle = t(`${namespace}.screenSubtitle`);
  const badgeText = t(`${namespace}.badgeSupport`);
  const brandHaul = t(`${namespace}.brandHaul`);
  const brandIx = t(`${namespace}.brandIx`);
  const menuDots = t(`${namespace}.menuDots`);
  const bookingRef = t(`${namespace}.bookingRef`);
  const serviceCategory = t(`${namespace}.serviceCategory`);
  const itemSummary = t(`${namespace}.itemSummary`);
  const serviceSchedule = t(`${namespace}.serviceSchedule`);
  const questionHeading = t(`${namespace}.questionHeading`);
  const inputLabel = t(`${namespace}.inputLabel`);
  const inputPlaceholder = t(`${namespace}.inputPlaceholder`);
  const attachmentLabel = t(`${namespace}.attachmentLabel`);
  const attachmentActive = t(`${namespace}.attachmentActive`);
  const caseStatusTitle = t(`${namespace}.caseStatusTitle`);
  const caseStatusDesc = t(`${namespace}.caseStatusDesc`);
  const primaryCta = t(`${namespace}.primaryCta`);
  const secondaryCta = t(`${namespace}.secondaryCta`);
  const tertiaryCta = t(`${namespace}.tertiaryCta`);
  const prototypeDisclaimer = t(`${namespace}.prototypeDisclaimer`);
  const backA11y = t(`${namespace}.backA11y`);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID={`${screenTestId}-header`}>
        <Pressable
          accessibilityLabel={backA11y}
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBack}
          style={styles.backCircle}
          testID={`${screenTestId}-back-button`}
        >
          <Text style={styles.backArrowText}>←</Text>
        </Pressable>

        <View style={styles.wordmarkContainer}>
          <Text style={styles.wordmarkHaul}>{brandHaul}</Text>
          <Text style={styles.wordmarkIx}>{brandIx}</Text>
        </View>

        <View style={styles.moreButton}>
          <Text style={styles.moreText}>{menuDots}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        testID={`${screenTestId}-scroll`}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle} testID={`${screenTestId}-title`}>
            {screenTitle}
          </Text>
          <Text style={styles.heroSubtitle} testID={`${screenTestId}-subtitle`}>
            {screenSubtitle}
          </Text>
        </View>

        {/* Status / Policy Badge */}
        <View style={styles.badgeBanner} testID={`${screenTestId}-badge`}>
          <View style={styles.badgeIconWrapper}>
            <C32MessageSquareIcon color={colors.brand} size={18} />
          </View>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>

        {/* Booking and Visual Reference Card */}
        <View style={styles.cardContainer} testID={`${screenTestId}-booking-card`}>
          <View style={styles.bookingCardInner}>
            <View style={styles.sofaThumbnail}>
              <C32BriefcaseIcon color={colors.secondaryText} size={28} />
            </View>
            <View style={styles.bookingMeta}>
              <Text style={styles.bookingRefText}>{bookingRef}</Text>
              <Text style={styles.bookingServiceText}>{serviceCategory}</Text>
              <Text style={styles.bookingItemsText}>
                {itemSummary} · {t("common.inventoryScope")}
              </Text>
              <View style={styles.scheduleRow}>
                <C32CalendarIcon color={colors.secondaryText} size={14} />
                <Text style={styles.scheduleText}>{serviceSchedule}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Support Case Composition Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.sectionHeading}>{questionHeading}</Text>

          {/* Topics Grid: Row 1 */}
          <View style={styles.topicRow}>
            <TopicChipButton
              icon={
                <C32CalendarIcon
                  color={selectedTopic === "changes" ? colors.brand : colors.secondaryText}
                  size={20}
                />
              }
              label={t("w07Support.topicChanges")}
              onSelect={handleSelectTopic}
              selected={selectedTopic === "changes"}
              testID={`${screenTestId}-topic-changes`}
              topic="changes"
            />
            <TopicChipButton
              icon={
                <C32TruckIcon
                  color={selectedTopic === "driver" ? colors.brand : colors.secondaryText}
                  size={20}
                />
              }
              label={t("w07Support.topicDriver")}
              onSelect={handleSelectTopic}
              selected={selectedTopic === "driver"}
              testID={`${screenTestId}-topic-driver`}
              topic="driver"
            />
            <TopicChipButton
              icon={
                <C32PackageIcon
                  color={selectedTopic === "service" ? colors.brand : colors.secondaryText}
                  size={20}
                />
              }
              label={t("w07Support.topicService")}
              onSelect={handleSelectTopic}
              selected={selectedTopic === "service"}
              testID={`${screenTestId}-topic-service`}
              topic="service"
            />
          </View>

          {/* Topics Grid: Row 2 */}
          <View style={styles.topicRow}>
            <TopicChipButton
              icon={
                <C32CreditCardIcon
                  color={selectedTopic === "payment" ? colors.brand : colors.secondaryText}
                  size={20}
                />
              }
              label={t("w07Support.topicPayment")}
              onSelect={handleSelectTopic}
              selected={selectedTopic === "payment"}
              testID={`${screenTestId}-topic-payment`}
              topic="payment"
            />
            <TopicChipButton
              icon={
                <C32ShieldCheckIcon
                  color={selectedTopic === "app" ? colors.brand : colors.secondaryText}
                  size={20}
                />
              }
              label={t("w07Support.topicApp")}
              onSelect={handleSelectTopic}
              selected={selectedTopic === "app"}
              testID={`${screenTestId}-topic-app`}
              topic="app"
            />
            <TopicChipButton
              icon={
                <C32MessageSquareIcon
                  color={selectedTopic === "other" ? colors.brand : colors.secondaryText}
                  size={20}
                />
              }
              label={t("w07Support.topicOther")}
              onSelect={handleSelectTopic}
              selected={selectedTopic === "other"}
              testID={`${screenTestId}-topic-other`}
              topic="other"
            />
          </View>

          {/* Issue Description Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelText}>{inputLabel}</Text>
            <TextInput
              accessibilityLabel={inputLabel}
              multiline
              numberOfLines={3}
              onChangeText={setDescriptionText}
              placeholder={inputPlaceholder}
              placeholderTextColor={colors.secondaryText}
              style={styles.textInputArea}
              testID={`${screenTestId}-description-input`}
              value={descriptionText}
            />
          </View>

          {/* Evidence Attachment Toggle */}
          <Pressable
            accessibilityRole="button"
            onPress={() => setEvidenceAttached(!evidenceAttached)}
            style={[styles.attachmentBox, evidenceAttached && styles.attachmentBoxActive]}
            testID={`${screenTestId}-attachment-button`}
          >
            <Text style={styles.attachmentIcon}>📷</Text>
            <Text
              style={[
                styles.attachmentLabelText,
                evidenceAttached && styles.attachmentLabelTextActive,
              ]}
            >
              {evidenceAttached ? attachmentActive : attachmentLabel}
            </Text>
          </Pressable>

          {/* Case Status Notice */}
          <View style={styles.caseStatusBox}>
            <Text style={styles.caseStatusHeading}>{caseStatusTitle}</Text>
            <Text style={styles.caseStatusDescription}>{caseStatusDesc}</Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <Pressable
          accessibilityRole="button"
          onPress={handleSubmitSampleCase}
          style={styles.primaryActionButton}
          testID={`${screenTestId}-primary-cta`}
        >
          <Text style={styles.primaryActionText}>{primaryCta}</Text>
        </Pressable>

        {/* Secondary Action Button */}
        <Pressable
          accessibilityRole="button"
          onPress={handleSeePendingCase}
          style={styles.secondaryActionButton}
          testID={`${screenTestId}-secondary-cta`}
        >
          <Text style={styles.secondaryActionText}>{secondaryCta}</Text>
        </Pressable>

        {/* Tertiary Return Link */}
        <Pressable
          accessibilityRole="button"
          onPress={handleReturnToBooking}
          style={styles.tertiaryLinkContainer}
          testID={`${screenTestId}-tertiary-link`}
        >
          <Text style={styles.tertiaryLinkText}>{tertiaryCta}</Text>
        </Pressable>

        {/* Failure Preview Button (QA & Simulation) */}
        <Pressable
          accessibilityRole="button"
          onPress={handlePreviewFailure}
          style={styles.tertiaryLinkContainer}
          testID={`${screenTestId}-preview-failed-btn`}
        >
          <Text style={styles.tertiaryLinkText}>
            {params.previewLocale === "es"
              ? "Simular error de envío (QA)"
              : "Simulate submission failure (QA)"}
          </Text>
        </Pressable>

        {/* Prototype Disclaimer */}
        <Text style={styles.disclaimerText}>{prototypeDisclaimer}</Text>
      </ScrollView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    height: 52,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backCircle: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  backArrowText: {
    color: colors.primaryText,
    fontSize: 20,
  },
  wordmarkContainer: {
    flexDirection: "row",
  },
  wordmarkHaul: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 24,
    letterSpacing: 1,
  },
  wordmarkIx: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
    fontSize: 24,
    letterSpacing: 1,
  },
  moreButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  moreText: {
    color: colors.secondaryText,
    fontSize: 20,
    letterSpacing: 2,
  },
  scrollContent: {
    gap: 15,
    paddingBottom: 40,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  heroSection: {
    gap: 6,
  },
  heroTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 24,
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  badgeBanner: {
    alignItems: "center",
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderColor: "rgba(186, 255, 66, 0.2)",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  badgeIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  cardContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  bookingCardInner: {
    flexDirection: "row",
    gap: 12,
  },
  sofaThumbnail: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.elevated,
    borderRadius: 10,
    borderWidth: 1,
    height: 72,
    justifyContent: "center",
    width: 90,
  },
  bookingMeta: {
    flex: 1,
    gap: 3,
  },
  bookingRefText: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
  bookingServiceText: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  bookingItemsText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  scheduleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  scheduleText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  sectionHeading: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  topicRow: {
    flexDirection: "row",
    gap: 8,
  },
  topicChip: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.elevated,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    gap: 6,
    paddingVertical: 10,
  },
  topicChipSelected: {
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderColor: colors.brand,
  },
  topicChipIconWrap: {
    height: 22,
    justifyContent: "center",
  },
  topicChipText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  topicChipTextSelected: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
  },
  inputContainer: {
    backgroundColor: colors.background,
    borderColor: colors.elevated,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
    padding: 12,
  },
  inputLabelText: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
  textInputArea: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    minHeight: 50,
    textAlignVertical: "top",
  },
  attachmentBox: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.elevated,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  attachmentBoxActive: {
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderColor: colors.brand,
  },
  attachmentIcon: {
    fontSize: 16,
  },
  attachmentLabelText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  attachmentLabelTextActive: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
  },
  caseStatusBox: {
    backgroundColor: colors.background,
    borderColor: colors.elevated,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
    padding: 12,
  },
  caseStatusHeading: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
  },
  caseStatusDescription: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
  primaryActionButton: {
    alignItems: "center",
    backgroundColor: colors.brand,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
  },
  primaryActionText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  secondaryActionButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
    justifyContent: "center",
  },
  secondaryActionText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  tertiaryLinkContainer: {
    alignItems: "center",
    paddingVertical: 6,
  },
  tertiaryLinkText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
  },
  disclaimerText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 9,
    textAlign: "center",
  },
});
