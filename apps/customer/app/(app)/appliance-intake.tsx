import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C18ApplianceIcon,
  C18CheckIcon,
  C18ChevronRightIcon,
  C18FurnitureIcon,
  C18HazardShieldIcon,
  C18MattressIcon,
  C18ToolsIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C18A_DEFAULT_DATA, C18A_DEMO_CONSTANTS } from "../../src/fixtures/c18aApplianceIntake";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function ApplianceIntakeScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";
  const isEs = currentLocale === "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = C18A_DEMO_CONSTANTS.defaultBookingId;

  const [selectedTierId, setSelectedTierId] = useState<string>("appliance-removal");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/bulky-item-intake" });
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleSelectTier = useCallback(
    (tierId: string) => {
      setSelectedTierId(tierId);
      if (tierId === "furniture-pickup") {
        router.push("/bulky-item-intake");
      } else if (tierId === "mattress-removal") {
        router.push("/mattress-intake");
      } else if (tierId === "assembly-help") {
        setNoticeMessage(
          t("c18a.noticeTierAddon") ||
            (isEs
              ? "El servicio de montaje es un extra opcional."
              : "Assembly is an optional add-on for existing bookings.")
        );
      }
    },
    [router, t, isEs]
  );

  const handleReviewCta = useCallback(() => {
    router.push("/appliance-intake-review");
  }, [router]);

  const handleSeeCategories = useCallback(() => {
    router.push("/service-discovery");
  }, [router]);

  const data = C18A_DEFAULT_DATA;

  const renderTierIcon = (tierId: string, isSelected: boolean) => {
    const iconColor = isSelected ? colors.brand : colors.secondaryText;
    switch (tierId) {
      case "appliance-removal":
        return <C18ApplianceIcon size={20} color={iconColor} />;
      case "furniture-pickup":
        return <C18FurnitureIcon size={20} color={iconColor} />;
      case "mattress-removal":
        return <C18MattressIcon size={20} color={iconColor} />;
      case "assembly-help":
        return <C18ToolsIcon size={20} color={iconColor} />;
      default:
        return <C18ApplianceIcon size={20} color={iconColor} />;
    }
  };

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c18a-header-back" onBack={handleBack} backA11y={t("c18a.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c18a-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c18a.noticeDismiss")}
            testID="c18a-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c18a.noticeDismiss")}</Text>
          </Pressable>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <View style={styles.stepChipContainer}>
          <Text style={styles.stepChipLeft}>
            {isEs ? C18A_DEMO_CONSTANTS.stepIndicatorEs : C18A_DEMO_CONSTANTS.stepIndicator}
          </Text>
          <Text style={styles.stepChipRight}>
            {isEs ? C18A_DEMO_CONSTANTS.stepSubEs : C18A_DEMO_CONSTANTS.stepSub}
          </Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c18a.title")}</Text>
          <Text style={styles.subtitleText}>{t("c18a.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c18a-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Handling Tier Selector */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("c18a.tiersCardTitle")}</Text>

          {data.tiers.map((tier, index) => {
            const isSelected = selectedTierId === tier.id;
            const isLast = index === data.tiers.length - 1;
            return (
              <View key={tier.id}>
                <Pressable
                  style={[styles.tierRow, isSelected && styles.tierRowSelected]}
                  onPress={() => handleSelectTier(tier.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${tier.title}. ${tier.subtitle}`}
                  testID={`c18a-tier-${tier.id}`}
                >
                  <View style={styles.tierIconContainer}>
                    {renderTierIcon(tier.id, isSelected)}
                  </View>
                  <View style={styles.tierContent}>
                    <View style={styles.tierTitleRow}>
                      <Text style={[styles.tierTitle, isSelected && styles.tierTitleSelected]}>
                        {isEs ? tier.titleEs : tier.title}
                      </Text>
                      {tier.badge && (
                        <View style={styles.tierBadge}>
                          <Text style={styles.tierBadgeText}>
                            {isEs ? tier.badgeEs : tier.badge}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.tierSubtitle}>
                      {isEs ? tier.subtitleEs : tier.subtitle}
                    </Text>
                  </View>
                  <C18ChevronRightIcon
                    size={14}
                    color={isSelected ? colors.brand : colors.secondaryText}
                  />
                </Pressable>
                {!isLast && <View style={styles.rowDivider} />}
              </View>
            );
          })}
        </View>

        {/* Item Specification Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("c18a.detailsCardTitle")}</Text>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18a.labelItem")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemTitleEs : data.itemTitle}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18a.labelQuantity")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemQuantityEs : data.itemQuantity}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18a.labelSize")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemSizeEs : data.itemSize}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18a.labelWeight")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemWeightEs : data.itemWeight}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18a.labelAccess")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemAccessEs : data.itemAccess}</Text>
          </View>
        </View>

        {/* Additional Handling Check Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderWithBadge}>
            <Text style={styles.cardTitle}>{t("c18a.handlingCardTitle")}</Text>
            <View style={styles.warningBadge}>
              <C18HazardShieldIcon size={13} color="#FFC85A" />
              <Text style={styles.warningBadgeText}>{t("c18a.reviewBadge")}</Text>
            </View>
          </View>

          <View style={styles.noticeBulletRow}>
            <View style={styles.noticeBulletDot} />
            <Text style={styles.noticeBulletText}>{t("c18a.handlingNotice1")}</Text>
          </View>

          <View style={styles.noticeBulletRow}>
            <View style={styles.noticeBulletDot} />
            <Text style={styles.noticeBulletText}>{t("c18a.handlingNotice2")}</Text>
          </View>
        </View>

        {/* Primary CTA */}
        <Pressable
          style={styles.primaryButton}
          onPress={handleReviewCta}
          accessibilityRole="button"
          accessibilityLabel={t("c18a.continueCta")}
          testID="c18a-continue-cta"
        >
          <Text style={styles.primaryButtonText}>{t("c18a.continueCta")}</Text>
        </Pressable>

        {/* Secondary CTA */}
        <Pressable
          style={styles.secondaryButton}
          onPress={handleSeeCategories}
          accessibilityRole="button"
          accessibilityLabel={t("c18a.categoriesCta")}
          testID="c18a-categories-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("c18a.categoriesCta")}</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t("c18a.footerDemo")}</Text>
          <Text style={styles.footerSubText}>{t("c18a.footerSrs")}</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  noticeBox: {
    backgroundColor: "#27272A",
    borderLeftWidth: 4,
    borderLeftColor: "#FFC85A",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
    marginRight: 10,
  },
  noticeDismiss: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#3F3F46",
    borderRadius: 4,
  },
  noticeDismissText: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 12,
  },
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#1C2422",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 14,
  },
  stepChipLeft: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  stepChipRight: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  headingSection: {
    marginBottom: 20,
  },
  titleText: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
    marginBottom: 6,
  },
  subtitleText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  customerChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#17231E",
    borderWidth: 1,
    borderColor: "#234236",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignSelf: "flex-start",
    gap: 8,
  },
  customerChipText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: "#161D1B",
    borderWidth: 1,
    borderColor: "#22312D",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    marginBottom: 12,
  },
  cardHeaderWithBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  warningBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#292415",
    borderWidth: 1,
    borderColor: "#574820",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  warningBadgeText: {
    color: "#FFC85A",
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  noticeBulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
    gap: 8,
  },
  noticeBulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.secondaryText,
    marginTop: 7,
  },
  noticeBulletText: {
    flex: 1,
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  tierRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tierRowSelected: {
    backgroundColor: "#1D2824",
    borderWidth: 1,
    borderColor: "#2E473D",
  },
  tierIconContainer: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  tierContent: {
    flex: 1,
  },
  tierTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tierTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  tierTitleSelected: {
    color: colors.brand,
  },
  tierBadge: {
    backgroundColor: "#22312D",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tierBadgeText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
  tierSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginTop: 2,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowLabel: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    flex: 1,
  },
  rowValue: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    textAlign: "right",
    flex: 1.2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#1F2B27",
    marginVertical: 2,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 13,
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1A2220",
    gap: 4,
  },
  footerText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  footerSubText: {
    color: "#6B7280",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
});
