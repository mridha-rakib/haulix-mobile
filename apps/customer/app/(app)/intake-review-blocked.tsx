import { colors } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { C18AlertTriangleIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function IntakeReviewBlockedScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleResolve = useCallback(() => {
    router.push("/inventory-validation");
  }, [router]);

  const handleBackToReview = useCallback(() => {
    router.push("/intake-review");
  }, [router]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBackToReview}
          backA11y={t("c21v.backA11y")}
          testID="c21v-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c21v-scroll-container"
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>{t("c21v.title")}</Text>
            <Text style={styles.subtitle}>{t("c21v.subtitle")}</Text>
          </View>

          {/* Warning / Action Required Card */}
          <View style={styles.warningCard} testID="c21v-warning-card">
            <View style={styles.cardHeaderRow}>
              <View style={styles.titleWithIcon}>
                <C18AlertTriangleIcon size={18} color="#F36D6D" />
                <Text style={styles.warningTitle}>{t("c21v.warningTitle")}</Text>
              </View>
              <View style={styles.actionBadge}>
                <Text style={styles.actionBadgeText}>{t("c21v.warningBadge")}</Text>
              </View>
            </View>

            <Text style={styles.guidanceText}>{t("c21v.guidance")}</Text>
            <Text style={styles.noticeText}>{t("c21v.notice")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsSection}>
            <Pressable
              style={styles.primaryButton}
              onPress={handleResolve}
              accessibilityRole="button"
              accessibilityLabel={t("c21v.primaryCta")}
              testID="c21v-resolve-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c21v.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleBackToReview}
              accessibilityRole="button"
              accessibilityLabel={t("c21v.secondaryCta")}
              testID="c21v-back-cta"
            >
              <Text style={styles.secondaryButtonText}>{t("c21v.secondaryCta")}</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <Text style={styles.footerDemo}>{t("c21v.footerDemo")}</Text>
            <Text style={styles.footerSrs}>{t("c21v.footerSrs")}</Text>
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
  headerSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F5F7F6",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#C2C9C6",
    lineHeight: 20,
  },
  warningCard: {
    backgroundColor: "#1D1616",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#4A2424",
    padding: 18,
    marginBottom: 24,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  titleWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F36D6D",
  },
  actionBadge: {
    backgroundColor: "rgba(243, 109, 109, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#F36D6D",
  },
  guidanceText: {
    fontSize: 14,
    color: "#F5F7F6",
    lineHeight: 20,
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 12,
    color: "#C2C9C6",
    lineHeight: 18,
  },
  actionsSection: {
    marginTop: 10,
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
    marginTop: 20,
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
