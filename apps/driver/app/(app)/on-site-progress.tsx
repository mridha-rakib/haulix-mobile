import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CheckmarkIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useServiceProgressStore } from "../../src/stores/serviceProgressStore";

export default function OnSiteProgressScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { activeJobId, getServiceProgress, setDriverMilestone } = useServiceProgressStore();
  const progress = getServiceProgress(activeJobId);
  const [infoMessage] = useState<string | null>(null);

  const handleCaptureProof = () => {
    router.push("/(app)/completion-evidence" as Href);
  };

  const handleRequestAdditionalWork = () => {
    router.push("/(app)/additional-work-approval" as Href);
  };

  const toggleWorkStarted = () => {
    setDriverMilestone(activeJobId, "driverWorkStarted", !progress.driverWorkStarted);
  };

  const toggleServiceInProgress = () => {
    setDriverMilestone(activeJobId, "driverServiceInProgress", !progress.driverServiceInProgress);
  };

  const toggleReadyForCompletion = () => {
    setDriverMilestone(activeJobId, "driverReadyForCompletion", !progress.driverReadyForCompletion);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>{t("driver.onSiteProgress.title")}</Text>
            <Text style={styles.subtitle}>{t("driver.onSiteProgress.subtitle")}</Text>
          </View>
          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>{t("driver.onSiteProgress.assignedPill")}</Text>
          </View>
        </View>

        {/* Card 1: Pickup Location */}
        <View style={styles.locationCard}>
          <View style={styles.cardIconWrap}>
            <MapPinIcon size={22} color="#BAFF42" />
          </View>
          <View style={styles.cardMetaWrap}>
            <Text style={styles.metaLabel}>{t("driver.onSiteProgress.pickupLabel")}</Text>
            <Text style={styles.metaValue}>{t("driver.onSiteProgress.pickupLocation")}</Text>
          </View>
        </View>

        {/* Card 2: Arrived at pickup (Always completed on site) */}
        <View style={styles.stepCard}>
          <View style={styles.cardIconWrap}>
            <CheckmarkIcon size={20} color="#BAFF42" />
          </View>
          <Text style={styles.stepTitle}>{t("driver.onSiteProgress.arrivedAtPickup")}</Text>
        </View>

        {/* Card 3: Work started */}
        <Pressable
          onPress={toggleWorkStarted}
          style={styles.stepCard}
          accessibilityRole="button"
          accessibilityLabel={t("driver.onSiteProgress.workStarted")}
        >
          <View style={styles.cardIconWrap}>
            {progress.driverWorkStarted ? (
              <CheckmarkIcon size={20} color="#BAFF42" />
            ) : (
              <ClockIcon size={20} color="#BAFF42" />
            )}
          </View>
          <Text style={styles.stepTitle}>{t("driver.onSiteProgress.workStarted")}</Text>
        </Pressable>

        {/* Card 4: Service in progress */}
        <Pressable
          onPress={toggleServiceInProgress}
          style={styles.stepCard}
          accessibilityRole="button"
          accessibilityLabel={t("driver.onSiteProgress.serviceInProgress")}
        >
          <View style={styles.cardIconWrap}>
            {progress.driverServiceInProgress ? (
              <CheckmarkIcon size={20} color="#BAFF42" />
            ) : (
              <ClockIcon size={20} color="#BAFF42" />
            )}
          </View>
          <Text style={styles.stepTitle}>{t("driver.onSiteProgress.serviceInProgress")}</Text>
        </Pressable>

        {/* Card 5: Ready for completion */}
        <Pressable
          onPress={toggleReadyForCompletion}
          style={styles.stepCard}
          accessibilityRole="button"
          accessibilityLabel={t("driver.onSiteProgress.readyForCompletion")}
        >
          <View style={styles.cardIconWrap}>
            {progress.driverReadyForCompletion ? (
              <CheckmarkIcon size={20} color="#BAFF42" />
            ) : (
              <ClockIcon size={20} color="#BAFF42" />
            )}
          </View>
          <Text style={styles.stepTitle}>{t("driver.onSiteProgress.readyForCompletion")}</Text>
        </Pressable>

        {/* Card 6: Server-confirmed transitions */}
        <View style={styles.disclosureCard}>
          <View style={styles.cardIconWrap}>
            <ShieldCheckIcon size={22} color="#BAFF42" />
          </View>
          <View style={styles.cardMetaWrap}>
            <Text style={styles.disclosureTitle}>
              {t("driver.onSiteProgress.transitionsTitle")}
            </Text>
            <Text style={styles.disclosureDesc}>{t("driver.onSiteProgress.transitionsDesc")}</Text>
          </View>
        </View>

        {infoMessage && (
          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>{infoMessage}</Text>
          </View>
        )}

        <View style={{ height: spacing[3] }} />

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleCaptureProof}
            style={{
              backgroundColor: "#BAFF42",
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.onSiteProgress.captureProofCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#080B0B",
                letterSpacing: 0.3,
              }}
            >
              {t("driver.onSiteProgress.captureProofCta")}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleRequestAdditionalWork}
            style={{
              backgroundColor: "#131917",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#232C28",
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.onSiteProgress.requestExtraCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#F6F8F6",
              }}
            >
              {t("driver.onSiteProgress.requestExtraCta")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[4],
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#F6F8F6",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
    marginTop: 2,
  },
  badgeWrap: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginLeft: spacing[2],
  },
  badgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#080B0B",
    letterSpacing: 0.5,
  },
  locationCard: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    padding: spacing[3],
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  stepCard: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    padding: spacing[3],
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  cardIconWrap: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[2],
  },
  cardMetaWrap: {
    flex: 1,
  },
  metaLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#8E9E99",
  },
  metaValue: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
    marginTop: 2,
  },
  stepTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#F6F8F6",
  },
  disclosureCard: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    padding: spacing[3],
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: spacing[1],
    marginBottom: spacing[2],
  },
  disclosureTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  disclosureDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    lineHeight: 16,
  },
  noticeBox: {
    backgroundColor: "#1C2420",
    borderRadius: radius.md,
    padding: spacing[2],
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: "#BAFF42",
  },
  noticeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#BAFF42",
    textAlign: "center",
  },
  actionsContainer: {
    gap: spacing[2],
  },
});
