import { colors } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import { getC10DemoProfile } from "../../src/fixtures/c10DemoProfile";
import { W03_G_DEFAULT_DATA } from "../../src/fixtures/c27ServiceHandoffs";

/**
 * Screen 4 — W03-G-HANDOFF: Garage Cleanout AI Review Entry
 *
 * Authoritative Figma:
 * - English Node: 394:545 (430 × 1043 px)
 * - Spanish Node: 980:11426 (430 × 1043 px)
 */
export default function GarageAIHandoffScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n.language?.startsWith("es") ? "es" : "en") as "en" | "es";

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Dynamic customer profile binding
  const [profile, setProfile] = useState(() => getC10DemoProfile(currentLocale));
  useEffect(() => {
    setProfile(getC10DemoProfile(currentLocale));
  }, [currentLocale]);

  const customerName = useMemo(() => {
    if (currentLocale === "es") {
      return profile.name === "Sarah Mitchell" ? "Bryan Lopez Mendoza" : profile.name;
    }
    return profile.name || W03_G_DEFAULT_DATA.defaultCustomerEn;
  }, [currentLocale, profile.name]);

  const contextBadgeText = useMemo(() => {
    return `${customerName.toUpperCase()} · ${W03_G_DEFAULT_DATA.bookingId}`;
  }, [customerName]);

  const payloadLine1Text = useMemo(() => {
    return `${W03_G_DEFAULT_DATA.bookingId} · ${customerName} · Garage Cleanout`;
  }, [customerName]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/garage-intake-review");
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleStartReview = useCallback(() => {
    setNoticeMessage(t("w03gHandoff.noticeUpcomingC22"));
  }, [t]);

  const handleEditItems = useCallback(() => {
    router.push("/garage-intake");
  }, [router]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("w03gHandoff.backA11y")}
          testID="w03g-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="w03g-scroll-container"
        >
          {/* Upcoming Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="w03g-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                accessibilityRole="button"
                accessibilityLabel={t("w03gHandoff.noticeDismiss")}
                testID="w03g-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>{t("w03gHandoff.noticeDismiss")}</Text>
              </Pressable>
            </View>
          )}

          {/* Step Indicator */}
          <View style={styles.stepChipContainer} testID="w03g-step-chip">
            <Text style={styles.stepChipLeft}>{t("w03gHandoff.stepIndicator")}</Text>
            <Text style={styles.stepChipRight}>{t("w03gHandoff.stepSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>{t("w03gHandoff.title")}</Text>
            <Text style={styles.subtitle}>{t("w03gHandoff.subtitle")}</Text>
          </View>

          {/* Context Badge */}
          <View style={styles.contextBadge} testID="w03g-context-badge">
            <View style={styles.contextIconWrap}>
              <C18CheckIcon size={17} color={colors.brand} />
            </View>
            <Text style={styles.contextBadgeText}>{contextBadgeText}</Text>
          </View>

          {/* Section 1: W03 service review connected */}
          <View style={styles.card} testID="w03g-payload-card">
            <Text style={styles.cardTitle}>{t("w03gHandoff.sectionPayloadTitle")}</Text>
            <Text style={styles.cardBodyText}>{payloadLine1Text}</Text>
            <Text style={styles.cardBodyText}>{t("w03gHandoff.payloadLine2")}</Text>
            <Text style={styles.cardBodyText}>{t("w03gHandoff.payloadLine3")}</Text>
            <Text style={styles.cardBodyText}>{t("w03gHandoff.payloadLine4")}</Text>
          </View>

          {/* Section 2: Unresolved quote conditions */}
          <View style={styles.card} testID="w03g-anchor-card">
            <Text style={styles.cardTitle}>{t("w03gHandoff.sectionAnchorTitle")}</Text>

            <View style={styles.reviewBadgeRow}>
              <C18CheckIcon size={16} color={colors.secondaryText} />
              <Text style={styles.reviewBadgeText}>{t("w03gHandoff.reviewBadge")}</Text>
            </View>

            <Text style={styles.cardBodyText}>{t("w03gHandoff.anchorLine1")}</Text>
            <Text style={styles.cardBodyText}>{t("w03gHandoff.anchorLine2")}</Text>
            <Text style={styles.cardBodyText}>{t("w03gHandoff.anchorLine3")}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actionContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
              onPress={handleStartReview}
              accessibilityRole="button"
              accessibilityLabel={t("w03gHandoff.primaryCta")}
              testID="w03g-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("w03gHandoff.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
              onPress={handleEditItems}
              accessibilityRole="button"
              accessibilityLabel={t("w03gHandoff.secondaryCta")}
              testID="w03g-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>{t("w03gHandoff.secondaryCta")}</Text>
            </Pressable>
          </View>

          {/* Footer Notes */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{t("w03gHandoff.footerDemo")}</Text>
            <Text style={styles.footerText}>{t("w03gHandoff.footerSrs")}</Text>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 40,
    gap: 17,
  },
  noticeBanner: {
    backgroundColor: "#1A2510",
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  noticeText: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: colors.brand,
    lineHeight: 18,
  },
  noticeDismissText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: colors.brand,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
  },
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    height: 33,
    borderRadius: 9,
    gap: 7,
  },
  stepChipLeft: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: colors.brand,
  },
  stepChipRight: {
    fontFamily: "Inter-Medium",
    fontSize: 10,
    color: colors.secondaryText,
  },
  headerSection: {
    gap: 9,
  },
  mainTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 25,
    color: colors.primaryText,
    lineHeight: 30,
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  contextBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A2510",
    borderRadius: 9,
    height: 39,
    paddingHorizontal: 12,
    gap: 8,
  },
  contextIconWrap: {
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  contextBadgeText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: colors.brand,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    paddingHorizontal: 16,
    paddingVertical: 17,
    gap: 13,
  },
  cardTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: colors.primaryText,
  },
  cardBodyText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  reviewBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.elevated,
    borderRadius: 8,
    height: 32,
    paddingHorizontal: 10,
    gap: 8,
    alignSelf: "flex-start",
  },
  reviewBadgeText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 11,
    color: colors.secondaryText,
  },
  actionContainer: {
    gap: 11,
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: colors.background,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: "#35403B",
    borderWidth: 1,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonPressed: {
    opacity: 0.88,
  },
  secondaryButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: colors.brand,
  },
  footerContainer: {
    gap: 10,
    marginTop: 8,
    alignItems: "flex-start",
  },
  footerText: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: "#788580",
    lineHeight: 14,
  },
});
