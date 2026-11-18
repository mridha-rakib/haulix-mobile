/**
 * C19-P Item Photo Uploads
 *
 * Authoritative Figma: Node 382:1483 (EN) & Node 980:9613 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C19P_PHOTO_ITEMS } from "../../src/fixtures/c19pItemPhotos";

const PHOTO_IMAGES: Record<string, ImageSourcePropType> = {
  sofa: require("../../assets/images/intake/c18j-sofa.png"),
  mattresses: require("../../assets/images/intake/c18j-mattresses.png"),
  table: require("../../assets/images/intake/c18j-table.png"),
  boxes: require("../../assets/images/intake/c19p-boxes.png"),
};

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function ItemPhotosScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es";

  const profile = useCustomerProfile(currentLocale);
  const bookingId = "HX-DEMO-1027";
  const customerFirstName = profile.name.split(" ")[0] ?? profile.name;

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({ pathname: "/item-inventory" });
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleContinueToAccess = useCallback(() => {
    setNoticeMessage(t("c19p.noticeC20"));
  }, [t]);

  const handleReplaceSofa = useCallback(() => {
    setNoticeMessage(t("c19p.noticeC19PR"));
  }, [t]);

  const handleUploadFailure = useCallback(() => {
    setNoticeMessage(t("c19p.noticeC19PF"));
  }, [t]);

  const handleNoPhotosYet = useCallback(() => {
    setNoticeMessage(t("c19p.noticeC19PE"));
  }, [t]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack testID="c19p-header-back" onBack={handleBack} backA11y={t("c19p.backA11y")} />

      {noticeMessage && (
        <View style={styles.noticeBox} testID="c19p-notice-banner">
          <Text style={styles.noticeText}>{noticeMessage}</Text>
          <Pressable
            onPress={() => setNoticeMessage(null)}
            style={styles.noticeDismiss}
            accessibilityRole="button"
            accessibilityLabel={t("c19p.noticeDismiss")}
            testID="c19p-notice-dismiss"
          >
            <Text style={styles.noticeDismissText}>{t("c19p.noticeDismiss")}</Text>
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
          <Text style={styles.stepChipLeft}>{t("c19p.stepIndicator")}</Text>
          <Text style={styles.stepChipRight}>{t("c19p.stepSub")}</Text>
        </View>

        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.titleText}>{t("c19p.title")}</Text>
          <Text style={styles.subtitleText}>{t("c19p.subtitle", { customerFirstName })}</Text>

          {/* Dynamic Customer Chip */}
          <View style={styles.customerChip} testID="c19p-customer-chip">
            <C18CheckIcon size={17} color={colors.brand} />
            <Text style={styles.customerChipText}>
              {profile.name.toUpperCase()} · {bookingId}
            </Text>
          </View>
        </View>

        {/* Uploaded Examples Card */}
        <View style={styles.sectionCard} testID="c19p-examples-card">
          <Text style={styles.sectionTitle}>{t("c19p.examplesSectionTitle")}</Text>
          <View style={styles.photoList}>
            {C19P_PHOTO_ITEMS.map((item) => (
              <View key={item.id} style={styles.photoRow} testID={item.testID}>
                <Image
                  source={PHOTO_IMAGES[item.imageKey]}
                  style={styles.photoThumbnail}
                  resizeMode="cover"
                  accessible={true}
                  accessibilityLabel={t(`c19p.${item.titleKey}`)}
                />
                <View style={styles.photoTextCol}>
                  <Text style={styles.photoTitle}>{t(`c19p.${item.titleKey}`)}</Text>
                  <Text style={styles.photoSub}>{t(`c19p.${item.subtitleKey}`)}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 4 Demo Photos Attached Status Card */}
        <View style={styles.sectionCard} testID="c19p-status-card">
          <Text style={styles.sectionTitle}>{t("c19p.attachedSectionTitle")}</Text>

          <View style={styles.badgeRow}>
            <C18CheckIcon size={16} color={colors.secondaryText} />
            <Text style={styles.badgeText}>{t("c19p.completedBadge")}</Text>
          </View>

          <Text style={styles.bodyText}>{t("c19p.attachedDisclaimer1", { bookingId })}</Text>
          <Text style={styles.bodyText}>{t("c19p.attachedDisclaimer2")}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleContinueToAccess}
            accessibilityRole="button"
            accessibilityLabel={t("c19p.continueCta")}
            testID="c19p-continue-button"
          >
            <Text style={styles.primaryButtonText}>{t("c19p.continueCta")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleReplaceSofa}
            accessibilityRole="button"
            accessibilityLabel={t("c19p.replaceSofaCta")}
            testID="c19p-replace-sofa-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c19p.replaceSofaCta")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleUploadFailure}
            accessibilityRole="button"
            accessibilityLabel={t("c19p.uploadFailureCta")}
            testID="c19p-failure-example-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c19p.uploadFailureCta")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleNoPhotosYet}
            accessibilityRole="button"
            accessibilityLabel={t("c19p.noPhotosYetCta")}
            testID="c19p-no-photos-button"
          >
            <Text style={styles.secondaryButtonText}>{t("c19p.noPhotosYetCta")}</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerText}>{t("c19p.footerDemo")}</Text>
          <Text style={styles.footerText}>{t("c19p.footerSrs")}</Text>
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
  noticeBox: {
    marginHorizontal: 22,
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderWidth: 1,
    borderColor: colors.brand,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.primaryText,
    flex: 1,
    marginRight: 8,
  },
  noticeDismiss: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.brand,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 17,
  },
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 33,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: colors.surface,
  },
  stepChipLeft: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
  },
  stepChipRight: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.secondaryText,
  },
  headingSection: {
    gap: 9,
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 30,
    color: colors.primaryText,
  },
  subtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondaryText,
  },
  customerChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 39,
    paddingLeft: 12,
    borderRadius: 9,
    backgroundColor: "#1A2510",
  },
  customerChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 16,
    gap: 13,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.primaryText,
  },
  photoList: {
    gap: 13,
  },
  photoRow: {
    backgroundColor: colors.elevated,
    borderRadius: 11,
    height: 103,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  photoThumbnail: {
    width: 110,
    height: 81,
    borderRadius: 9,
    backgroundColor: colors.surface,
  },
  photoTextCol: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
  },
  photoTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
  },
  photoSub: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 14,
    color: colors.secondaryText,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.elevated,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
  },
  bodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondaryText,
  },
  actionsSection: {
    gap: 11,
    marginTop: 4,
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.background,
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonPressed: {
    opacity: 0.85,
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerSection: {
    gap: 10,
    marginTop: 8,
    paddingBottom: 8,
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
    lineHeight: 14,
  },
});
