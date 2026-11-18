import { colors } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C20M_DEFAULT_DATA } from "../../src/fixtures/c21IntakeReview";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return { profile };
}

export default function MovingAccessScreen() {
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale() as "en" | "es";
  const router = useRouter();
  const params = useLocalSearchParams<{
    pickupAddress?: string;
    dropoffAddress?: string;
    selectedServiceId?: string;
  }>();

  const isEs = currentLocale === "es";
  const { profile } = useCustomerProfile(currentLocale);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const customerName = profile?.name || (isEs ? "Bryan Lopez" : "Sarah Mitchell");
  const pickupAddress =
    params.pickupAddress || (isEs ? C20M_DEFAULT_DATA.pickup : C20M_DEFAULT_DATA.pickup);
  const dropoffAddress =
    params.dropoffAddress || (isEs ? C20M_DEFAULT_DATA.dropoff : C20M_DEFAULT_DATA.dropoff);

  const handleReviewMovingIntake = useCallback(() => {
    router.push("/moving-intake-review");
  }, [router]);

  const handleReturnToServices = useCallback(() => {
    router.replace("/service-discovery");
  }, [router]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/moving-intake");
    }
  }, [router]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c20m.backA11y")}
          testID="c20m-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c20m-scroll-container"
        >
          {/* Upcoming Phase Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c20m-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                accessibilityRole="button"
                accessibilityLabel={t("c20m.noticeDismiss")}
                testID="c20m-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>{t("c20m.noticeDismiss")}</Text>
              </Pressable>
            </View>
          )}

          {/* Header Title Section */}
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>{t("c20m.title")}</Text>
            <Text style={styles.subtitle}>{t("c20m.subtitle")}</Text>
          </View>

          {/* A. Validated Draft Route Card */}
          <View style={styles.card} testID="c20m-route-card">
            <Text style={styles.cardTitle}>{t("c20m.sectionRouteTitle")}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelCustomer")}</Text>
              <Text style={styles.infoValue}>{customerName}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelPickup")}</Text>
              <Text style={styles.infoValue}>{pickupAddress}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelDropoff")}</Text>
              <Text style={styles.infoValue}>{dropoffAddress}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelScope")}</Text>
              <Text style={styles.infoValue}>
                {isEs ? C20M_DEFAULT_DATA.scopeEs : C20M_DEFAULT_DATA.scope}
              </Text>
            </View>
          </View>

          {/* B. Inventory & Access Card */}
          <View style={styles.card} testID="c20m-inventory-card">
            <Text style={styles.cardTitle}>{t("c20m.sectionInventoryTitle")}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelLargeItems")}</Text>
              <Text style={styles.infoValue}>
                {isEs ? C20M_DEFAULT_DATA.largeItemsEs : C20M_DEFAULT_DATA.largeItems}
              </Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelWeight")}</Text>
              <Text style={styles.infoValue}>
                {isEs ? C20M_DEFAULT_DATA.weightEs : C20M_DEFAULT_DATA.weight}
              </Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelPickupStairs")}</Text>
              <Text style={styles.infoValue}>
                {isEs ? C20M_DEFAULT_DATA.pickupStairsEs : C20M_DEFAULT_DATA.pickupStairs}
              </Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelDropoffStairs")}</Text>
              <Text style={styles.infoValue}>
                {isEs ? C20M_DEFAULT_DATA.dropoffStairsEs : C20M_DEFAULT_DATA.dropoffStairs}
              </Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c20m.labelParkingNotes")}</Text>
              <Text style={styles.infoValue}>
                {isEs ? C20M_DEFAULT_DATA.parkingNotesEs : C20M_DEFAULT_DATA.parkingNotes}
              </Text>
            </View>
          </View>

          {/* C. Access Review Remains Conditional Card */}
          <View style={styles.card} testID="c20m-review-conditional-card">
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>{t("c20m.sectionReviewTitle")}</Text>
              <View style={styles.reviewBadge}>
                <Text style={styles.reviewBadgeText}>{t("c20m.reviewBadge")}</Text>
              </View>
            </View>
            <Text style={styles.guidanceText}>{t("c20m.guidance")}</Text>
            <Text style={styles.demoContextNotice}>{t("c20m.demoContextNotice")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsSection}>
            <Pressable
              style={styles.primaryButton}
              onPress={handleReviewMovingIntake}
              accessibilityRole="button"
              accessibilityLabel={t("c20m.primaryCta")}
              testID="c20m-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c20m.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleReturnToServices}
              accessibilityRole="button"
              accessibilityLabel={t("c20m.secondaryCta")}
              testID="c20m-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>{t("c20m.secondaryCta")}</Text>
            </Pressable>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerDemo}>{t("c20m.footerDemo")}</Text>
            <Text style={styles.footerSrs}>{t("c20m.footerSrs")}</Text>
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
  card: {
    backgroundColor: "#151A19",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#242C2A",
    padding: 18,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F5F7F6",
    marginBottom: 12,
  },
  infoRow: {
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: "#818C87",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: "#F5F7F6",
    fontWeight: "500",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#242C2A",
    marginVertical: 10,
  },
  reviewBadge: {
    backgroundColor: "rgba(255, 200, 90, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reviewBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFC85A",
  },
  guidanceText: {
    fontSize: 13,
    color: "#F5F7F6",
    lineHeight: 18,
    marginBottom: 8,
  },
  demoContextNotice: {
    fontSize: 12,
    color: "#818C87",
    lineHeight: 16,
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
