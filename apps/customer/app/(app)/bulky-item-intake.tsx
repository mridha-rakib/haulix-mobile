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
import { C18F_DEFAULT_DATA, C18F_DEMO_CONSTANTS } from "../../src/fixtures/c18fBulkyIntake";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function BulkyItemIntakeScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";
  const isEs = currentLocale === "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = C18F_DEMO_CONSTANTS.defaultBookingId;

  const [selectedTierId, setSelectedTierId] = useState<string>("furniture-pickup");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/pickup-address", params: { service: "furniture-pickup" } });
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
      if (tierId === "appliance-removal") {
        router.push("/appliance-intake");
      } else if (tierId === "mattress-removal") {
        router.push("/mattress-intake");
      } else if (tierId === "assembly-help") {
        setNoticeMessage(t("c18f.noticeTierAddon"));
      }
    },
    [router, t]
  );

  const handleReviewCta = useCallback(() => {
    router.push("/furniture-intake-review");
  }, [router]);

  const handleSeeCategories = useCallback(() => {
    router.push("/service-discovery");
  }, [router]);

  const data = C18F_DEFAULT_DATA;

  const renderTierIcon = (tierId: string, isSelected: boolean) => {
    const iconColor = isSelected ? colors.brand : colors.secondaryText;
    switch (tierId) {
      case "furniture-pickup":
        return <C18FurnitureIcon size={20} color={iconColor} />;
      case "appliance-removal":
        return <C18ApplianceIcon size={20} color={iconColor} />;
      case "mattress-removal":
        return <C18MattressIcon size={20} color={iconColor} />;
      case "assembly-help":
        return <C18ToolsIcon size={20} color={iconColor} />;
      default:
        return <C18FurnitureIcon size={20} color={iconColor} />;
    }
  };

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c18f-header-back" onBack={handleBack} backA11y={t("c18f.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c18f-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c18f.noticeDismiss")}
            testID="c18f-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c18f.noticeDismiss")}</Text>
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
            {isEs ? C18F_DEMO_CONSTANTS.stepIndicatorEs : C18F_DEMO_CONSTANTS.stepIndicator}
          </Text>
          <Text style={styles.stepChipRight}>
            {isEs ? C18F_DEMO_CONSTANTS.stepSubEs : C18F_DEMO_CONSTANTS.stepSub}
          </Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c18f.title")}</Text>
          <Text style={styles.subtitleText}>{t("c18f.subtitle")}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c18f-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Handling Tier Selector */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("c18f.tiersCardTitle")}</Text>

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
                  testID={`c18f-tier-${tier.id}`}
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

        {/* Example Inventory Specification Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("c18f.inventoryCardTitle")}</Text>

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18f.labelItem")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemTitleEs : data.itemTitle}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18f.labelDimensions")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemSpecsEs : data.itemSpecs}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{t("c18f.labelAccess")}</Text>
            <Text style={styles.rowValue}>{isEs ? data.itemAccessEs : data.itemAccess}</Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.badgeRow}>
            <C18HazardShieldIcon size={15} color="#FFC85A" />
            <Text style={styles.badgeText}>{isEs ? data.handlingNoteEs : data.handlingNote}</Text>
          </View>
        </View>

        {/* Primary CTA */}
        <Pressable
          style={styles.primaryButton}
          onPress={handleReviewCta}
          accessibilityRole="button"
          accessibilityLabel={t("c18f.continueCta")}
          testID="c18f-continue-cta"
        >
          <Text style={styles.primaryButtonText}>{t("c18f.continueCta")}</Text>
        </Pressable>

        {/* Secondary CTA */}
        <Pressable
          style={styles.secondaryButton}
          onPress={handleSeeCategories}
          accessibilityRole="button"
          accessibilityLabel={t("c18f.categoriesCta")}
          testID="c18f-categories-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("c18f.categoriesCta")}</Text>
        </Pressable>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t("c18f.footerDemo")}</Text>
          <Text style={styles.footerSubText}>{t("c18f.footerSrs")}</Text>
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
    marginBottom: 14,
  },
  tierRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  tierRowSelected: {
    backgroundColor: "#1C2622",
  },
  tierIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#202A27",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  tierContent: {
    flex: 1,
    marginRight: 8,
  },
  tierTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
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
    backgroundColor: "#2E3B29",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tierBadgeText: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 10,
  },
  tierSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  rowItem: {
    paddingVertical: 4,
  },
  rowLabel: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    marginBottom: 2,
  },
  rowValue: {
    color: colors.primaryText,
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#22312D",
    marginVertical: 10,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#1F2321",
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  badgeText: {
    color: "#FFC85A",
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#0F1614",
    fontFamily: fontFamily.bold,
    fontSize: 15,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: colors.brand,
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
  footerContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  footerText: {
    color: "#71717A",
    fontFamily: fontFamily.regular,
    fontSize: 11,
    textAlign: "center",
    marginBottom: 2,
  },
  footerSubText: {
    color: "#52525B",
    fontFamily: fontFamily.regular,
    fontSize: 10,
    textAlign: "center",
  },
});
