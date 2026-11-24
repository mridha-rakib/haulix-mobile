/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Screen: Report a Completion Issue (W08 Canonical State: ISSUE)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 907:7215 (EN: "W08-EN / ISSUE · Report a completion issue")
 * - Frame ID: 907:10115 (ES: "W08-ES / ISSUE · Reportar problema de finalización")
 * - Parent Section: 902:6811 (EN) / 902:6812 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Admin reviews evidence and payment deadlines before any capture or refund.
 * - Customer submits dispute issue locally; does not trigger live backend mutations.
 * - Zero route guards; unrestricted direct access.
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
  W08BookingCard,
  W08DecisionCard,
  W08Header,
  W08PrototypeDisclaimer,
  W08StatusBadge,
} from "../../src/components/completion/W08CompletionCard";

type IssueTopic = "missing_proof" | "damage" | "incomplete" | "other";

export default function CompletionIssueScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const [selectedTopic, setSelectedTopic] = useState<IssueTopic>("missing_proof");
  const [description, setDescription] = useState("");
  const [hasAttachment, setHasAttachment] = useState(false);
  const [showError, setShowError] = useState(false);

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
        pathname: "/completion-confirm",
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

  const handleSubmitIssue = useCallback(() => {
    if (!description.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    router.push({
      pathname: "/completion-dispute-hold",
      params: {
        ...(params.previewLocale ? { previewLocale: params.previewLocale } : {}),
        issueTopic: selectedTopic,
        issueDesc: description.trim(),
      },
    });
  }, [description, selectedTopic, router, params.previewLocale]);

  const handleBackToEvidence = useCallback(() => {
    router.push({
      pathname: "/completion-proof",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleMyJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const topics: { key: IssueTopic; label: string }[] = [
    { key: "missing_proof", label: t("w08Issue.topicMissingProof") },
    { key: "damage", label: t("w08Issue.topicDamage") },
    { key: "incomplete", label: t("w08Issue.topicIncomplete") },
    { key: "other", label: t("w08Issue.topicOther") },
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <W08Header backA11y={t("w08Issue.backA11y")} onBack={handleBack} testID="w08-issue-header" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w08-issue-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle} testID="w08-issue-title">
            {t("w08Issue.screenTitle")}
          </Text>
          <Text style={styles.heroSubtitle} testID="w08-issue-subtitle">
            {t("w08Issue.screenSubtitle")}
          </Text>
        </View>

        {/* Status Badge */}
        <W08StatusBadge label={t("w08Issue.badgeConfirmation")} testID="w08-issue-status-badge" />

        {/* Booking Reference Card */}
        <W08BookingCard
          bookingRef={t("w08Issue.bookingRef")}
          itemSummary={t("w08Issue.itemSummary")}
          serviceCategory={t("w08Issue.serviceCategory")}
          serviceSchedule={t("w08Issue.serviceSchedule")}
          testID="w08-issue-booking-card"
        />

        {/* 3-Step Decision Card */}
        <W08DecisionCard
          heading={t("w08Issue.decisionHeading")}
          info1Label={t("w08Issue.info1Label")}
          info1Text={t("w08Issue.info1Text")}
          info2Label={t("w08Issue.info2Label")}
          info2Text={t("w08Issue.info2Text")}
          info3Label={t("w08Issue.info3Label")}
          info3Text={t("w08Issue.info3Text")}
          testID="w08-issue-decision-card"
        />

        {/* Issue Report Form */}
        <View style={styles.formContainer} testID="w08-issue-form">
          <Text style={styles.formHeading} testID="w08-issue-form-heading">
            {t("w08Issue.inputHeading")}
          </Text>

          {/* Topic Selection Chips */}
          <View style={styles.chipsRow} testID="w08-issue-topic-chips">
            {topics.map((topic) => {
              const isSelected = selectedTopic === topic.key;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  key={topic.key}
                  onPress={() => setSelectedTopic(topic.key)}
                  style={[styles.chipButton, isSelected && styles.chipButtonSelected]}
                  testID={`w08-issue-chip-${topic.key}`}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {topic.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Description Text Input */}
          <TextInput
            accessibilityLabel={t("w08Issue.inputHeading")}
            multiline
            numberOfLines={4}
            onChangeText={(text) => {
              setDescription(text);
              if (text.trim() && showError) {
                setShowError(false);
              }
            }}
            placeholder={t("w08Issue.inputPlaceholder")}
            placeholderTextColor={colors.secondaryText}
            style={[styles.textInput, showError && styles.textInputError]}
            testID="w08-issue-text-input"
            value={description}
          />

          {showError ? (
            <Text style={styles.errorText} testID="w08-issue-error-text">
              {t("w08Issue.validationError")}
            </Text>
          ) : null}

          {/* Attachment Toggle */}
          <Pressable
            accessibilityRole="button"
            onPress={() => setHasAttachment((prev) => !prev)}
            style={[styles.attachmentButton, hasAttachment && styles.attachmentButtonActive]}
            testID="w08-issue-attachment-btn"
          >
            <Text
              style={[
                styles.attachmentButtonText,
                hasAttachment && styles.attachmentButtonTextActive,
              ]}
            >
              {hasAttachment ? t("w08Issue.attachmentActive") : t("w08Issue.attachmentButton")}
            </Text>
          </Pressable>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Pressable
            accessibilityLabel={t("w08Issue.primaryCta")}
            accessibilityRole="button"
            onPress={handleSubmitIssue}
            style={styles.primaryButton}
            testID="w08-issue-primary-cta"
          >
            <Text style={styles.primaryButtonText}>{t("w08Issue.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08Issue.secondaryCta")}
            accessibilityRole="button"
            onPress={handleBackToEvidence}
            style={styles.secondaryButton}
            testID="w08-issue-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>{t("w08Issue.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("w08Issue.tertiaryLink")}
            accessibilityRole="button"
            onPress={handleMyJobs}
            style={styles.tertiaryLink}
            testID="w08-issue-tertiary-link"
          >
            <Text style={styles.tertiaryLinkText}>{t("w08Issue.tertiaryLink")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <W08PrototypeDisclaimer
          text={t("w08Issue.prototypeDisclaimer")}
          testID="w08-issue-disclaimer"
        />
      </ScrollView>
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
  formContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  formHeading: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chipButton: {
    backgroundColor: colors.elevated,
    borderColor: colors.elevated,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipButtonSelected: {
    backgroundColor: "rgba(0, 196, 140, 0.15)",
    borderColor: colors.brand,
  },
  chipText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
  chipTextSelected: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
  },
  textInput: {
    backgroundColor: colors.background,
    borderColor: colors.elevated,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    minHeight: 88,
    padding: 12,
    textAlignVertical: "top",
  },
  textInputError: {
    borderColor: "#FF4D4D",
  },
  errorText: {
    color: "#FF4D4D",
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  attachmentButton: {
    alignItems: "center",
    backgroundColor: colors.elevated,
    borderColor: colors.elevated,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  attachmentButtonActive: {
    backgroundColor: "rgba(0, 196, 140, 0.12)",
    borderColor: colors.brand,
  },
  attachmentButtonText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
  attachmentButtonTextActive: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
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
});
