/**
 * HAULIX Customer Mobile App — Phase 03.51
 * Screen: Active Service — Chat (W06 Canonical State: CHAT)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:5916 (EN: "W06-EN / CHAT · Job conversation")
 * - Frame ID: 883:6280 (ES: "W06-ES / CHAT · Conversación del servicio")
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
  C32LocationPinIcon,
  C32PaperclipIcon,
  C32SendIcon,
  C32UsersIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function ActiveServiceChatScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

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
        pathname: "/active-service-working",
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

  const handleSendSample = useCallback(() => {
    router.push({
      pathname: "/active-service-chat-sent",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleAttachMedia = useCallback(() => {
    router.push({
      pathname: "/active-service-media",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleServiceReturn = useCallback(() => {
    router.push({
      pathname: "/active-service-working",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleEmptyView = useCallback(() => {
    router.push({
      pathname: "/active-service-chat-empty",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleFailedView = useCallback(() => {
    router.push({
      pathname: "/active-service-chat-failed",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const stages = [
    t("w06Chat.stepAssigned"),
    t("w06Chat.stepEnroute"),
    t("w06Chat.stepArrived"),
    t("w06Chat.stepService"),
    t("w06Chat.stepReview"),
  ];

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      <FlowHeaderBack
        onBack={handleBack}
        backA11y={t("w06Chat.backA11y")}
        testID="w06-chat-header"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w06-chat-scroll"
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
        <View style={styles.locationChip} testID="w06-chat-location-chip">
          <C32LocationPinIcon size={14} color={colors.brand} />
          <Text style={styles.locationChipText} numberOfLines={1}>
            {t("w06Chat.serviceArea")}
          </Text>
        </View>

        {/* Screen Headline & Subtitle */}
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle} testID="w06-chat-title">
            {t("w06Chat.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w06-chat-subtitle">
            {t("w06Chat.screenSubtitle")}
          </Text>
        </View>

        {/* Chat Conversation Card */}
        <View style={styles.chatCard} testID="w06-chat-card">
          <View style={styles.chatCardHeader}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{t("w06Chat.statusBadge")}</Text>
            </View>
            <Text style={styles.bookingRefText}>
              {t("w06Chat.bookingRefPrefix")} {t("w06Chat.bookingRefValue")}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.chatSectionHeading}>{t("w06Chat.cardHeading")}</Text>

          {/* Incoming Driver Message */}
          <View style={styles.incomingBubbleWrap} testID="w06-chat-driver-bubble">
            <View style={styles.senderHeaderRow}>
              <C32UsersIcon size={14} color="#38BDF8" />
              <Text style={styles.driverSenderName}>{t("w06Chat.driverSender")}</Text>
            </View>
            <View style={styles.incomingBubble}>
              <Text style={styles.incomingText}>{t("w06Chat.driverMessage")}</Text>
            </View>
            <Text style={styles.bubbleTimestamp}>10:18 AM</Text>
          </View>

          {/* Outgoing Customer Message */}
          <View style={styles.outgoingBubbleWrap} testID="w06-chat-customer-bubble">
            <Text style={styles.customerSenderName}>{t("w06Chat.customerSender")}</Text>
            <View style={styles.outgoingBubble}>
              <Text style={styles.outgoingText}>{t("w06Chat.customerMessage")}</Text>
            </View>
            <Text style={styles.bubbleTimestamp}>10:21 AM</Text>
          </View>

          {/* Composer Row */}
          <View style={styles.composerBox} testID="w06-chat-composer">
            <Pressable
              style={styles.composerAttachBtn}
              onPress={handleAttachMedia}
              accessibilityLabel="Attach media"
              testID="w06-chat-composer-attach"
            >
              <C32PaperclipIcon size={20} color={colors.secondaryText} />
            </Pressable>
            <TextInput
              style={styles.composerInput}
              placeholder={t("w06Chat.composerPlaceholder")}
              placeholderTextColor={colors.secondaryText}
              editable={false}
              value=""
            />
            <Pressable
              style={styles.composerSendBtn}
              onPress={handleSendSample}
              accessibilityLabel="Send message"
              testID="w06-chat-composer-send"
            >
              <C32SendIcon size={18} color={colors.background} />
            </Pressable>
          </View>

          <Text style={styles.sampleNoticeText}>{t("w06Chat.sampleNotice")}</Text>
        </View>

        {/* State Switching Row for Quick Prototype Review */}
        <View style={styles.demoStatesRow}>
          <Pressable
            style={styles.stateTag}
            onPress={handleEmptyView}
            testID="w06-chat-to-empty-btn"
          >
            <Text style={styles.stateTagText}>
              {currentLocale === "es" ? "Ver chat vacío" : "View empty chat"}
            </Text>
          </Pressable>
          <Pressable
            style={styles.stateTag}
            onPress={handleFailedView}
            testID="w06-chat-to-failed-btn"
          >
            <Text style={styles.stateTagText}>
              {currentLocale === "es" ? "Ver error de envío" : "View send failed"}
            </Text>
          </Pressable>
        </View>

        {/* Action Buttons */}
        <Pressable
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          onPress={handleSendSample}
          accessibilityRole="button"
          accessibilityLabel={t("w06Chat.primaryCta")}
          testID="w06-chat-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w06Chat.primaryCta")}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={handleAttachMedia}
          accessibilityRole="button"
          accessibilityLabel={t("w06Chat.secondaryCta")}
          testID="w06-chat-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w06Chat.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          style={styles.altLinkButton}
          onPress={handleServiceReturn}
          accessibilityRole="button"
          accessibilityLabel={t("w06Chat.alternativeLink")}
          testID="w06-chat-alt-link"
        >
          <Text style={styles.altLinkText}>{t("w06Chat.alternativeLink")}</Text>
        </Pressable>

        {/* Disclaimer */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerDisclaimer}>{t("w06Chat.prototypeDisclaimer")}</Text>
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
  chatCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 16,
  },
  chatCardHeader: {
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
  chatSectionHeading: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  incomingBubbleWrap: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    marginBottom: 14,
  },
  senderHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  driverSenderName: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: "#38BDF8",
  },
  incomingBubble: {
    backgroundColor: colors.elevated,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderTopLeftRadius: 4,
  },
  incomingText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.primaryText,
    lineHeight: 18,
  },
  outgoingBubbleWrap: {
    alignSelf: "flex-end",
    maxWidth: "85%",
    marginBottom: 14,
    alignItems: "flex-end",
  },
  customerSenderName: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
    marginBottom: 4,
  },
  outgoingBubble: {
    backgroundColor: "rgba(189, 255, 0, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(189, 255, 0, 0.35)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderTopRightRadius: 4,
  },
  outgoingText: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.primaryText,
    lineHeight: 18,
  },
  bubbleTimestamp: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    marginTop: 3,
  },
  composerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 8,
    marginBottom: 8,
    gap: 8,
  },
  composerAttachBtn: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  composerInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.primaryText,
    paddingVertical: 4,
  },
  composerSendBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  sampleNoticeText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 15,
    marginTop: 4,
  },
  demoStatesRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  stateTag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  stateTagText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
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
