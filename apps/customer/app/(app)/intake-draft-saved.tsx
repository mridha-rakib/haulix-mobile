import { colors } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C21SCircleCheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { getIntakeDraftState } from "../../src/fixtures/c21IntakeReview";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return { profile };
}

export default function IntakeDraftSavedScreen() {
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale() as "en" | "es";
  const router = useRouter();
  const isEs = currentLocale === "es";
  const { profile } = useCustomerProfile(currentLocale);
  const draftState = getIntakeDraftState();

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const customerName = profile?.name || (isEs ? "Bryan Lopez" : "Sarah Mitchell");
  const photoCount = draftState.photoCount || 4;

  const handleContinueToAi = useCallback(() => {
    router.push("/ai-review-handoff");
  }, [router]);

  const handleReviewAgain = useCallback(() => {
    router.push("/intake-review");
  }, [router]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleReviewAgain}
          backA11y={t("c21s.backA11y")}
          testID="c21s-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c21s-scroll-container"
        >
          {/* Upcoming Phase Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c21s-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                accessibilityRole="button"
                accessibilityLabel={t("c21s.noticeDismiss")}
                testID="c21s-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>{t("c21s.noticeDismiss")}</Text>
              </Pressable>
            </View>
          )}

          {/* Header Title Section with Circle Check Icon */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <C21SCircleCheckIcon size={44} color={colors.brand} />
            </View>
            <Text style={styles.mainTitle}>{t("c21s.title")}</Text>
            <Text style={styles.subtitle}>{t("c21s.subtitle")}</Text>
          </View>

          {/* Draft Saved Card */}
          <View style={styles.savedCard} testID="c21s-saved-card">
            <View style={styles.cardHeaderRow}>
              <Text style={styles.savedForLabel}>
                {t("c21s.savedForPrefix")}
                {customerName}
              </Text>
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>{t("c21s.completedBadge")}</Text>
              </View>
            </View>

            <Text style={styles.summaryTitle}>{t("c21s.summaryTitle")}</Text>
            <Text style={styles.photoDetails}>{t("c21s.photoDetails", { count: photoCount })}</Text>
            <View style={styles.divider} />
            <Text style={styles.disclaimerText}>{t("c21s.disclaimer")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsSection}>
            <Pressable
              style={styles.primaryButton}
              onPress={handleContinueToAi}
              accessibilityRole="button"
              accessibilityLabel={t("c21s.primaryCta")}
              testID="c21s-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c21s.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleReviewAgain}
              accessibilityRole="button"
              accessibilityLabel={t("c21s.secondaryCta")}
              testID="c21s-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>{t("c21s.secondaryCta")}</Text>
            </Pressable>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerDemo}>{t("c21s.footerDemo")}</Text>
            <Text style={styles.footerSrs}>{t("c21s.footerSrs")}</Text>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E0D",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  noticeBanner: {
    backgroundColor: "#1A2220",
    borderWidth: 1,
    borderColor: colors.brand,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: "#F5F7F6",
    marginRight: 10,
  },
  noticeDismissText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.brand,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  iconContainer: {
    marginBottom: 14,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F5F7F6",
    letterSpacing: -0.4,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#C2C9C6",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  savedCard: {
    backgroundColor: "#151A19",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#242C2A",
    padding: 18,
    marginBottom: 24,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  savedForLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F5F7F6",
  },
  completedBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.brand,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F5F7F6",
    marginBottom: 6,
  },
  photoDetails: {
    fontSize: 13,
    color: "#C2C9C6",
    lineHeight: 18,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#242C2A",
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 12,
    color: "#818C87",
    lineHeight: 16,
  },
  actionsSection: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0B0E0D",
    letterSpacing: -0.2,
  },
  secondaryButton: {
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#242C2A",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F5F7F6",
  },
  footerSection: {
    alignItems: "center",
    marginTop: 10,
  },
  footerDemo: {
    fontSize: 11,
    color: "#818C87",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
  },
  footerSrs: {
    fontSize: 10,
    color: "#5A6661",
    textAlign: "center",
  },
});
