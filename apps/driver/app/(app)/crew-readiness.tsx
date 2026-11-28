import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BriefcaseIcon,
  ChevronRightIcon,
  HelperUsersIcon,
  InfoIcon,
  TruckIcon,
} from "../../src/components/icons/DriverIcons";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export default function CrewReadinessScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { role } = useDriverAuthStore();
  const { crewReadiness, getSelectedJob } = useDispatchCrewStore();

  const job = getSelectedJob();

  const isHelperAccepted = crewReadiness.helperStatus === "ACCEPTED";
  const helperBadgeText = isHelperAccepted
    ? t("driver.crewReadiness.badgeAccepted")
    : t("driver.crewReadiness.badgePending");

  const handleActiveJobPreview = () => {
    if (role === "HELPER") {
      router.push("/(app)/helper-active-job" as Href);
    } else {
      router.push("/(app)/active-job" as Href);
    }
  };

  const handleBackToJobDetails = () => {
    router.push("/(app)/job-details" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.crewReadiness.title")}
        subtitle={t("driver.crewReadiness.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top thumbnail */}
        <View style={styles.topSection}>
          <View style={styles.heroThumbnail}>
            <TruckIcon size={24} color="#BAFF42" />
          </View>
        </View>

        {/* Card 1: Assigned Job (Figma 1086:365) */}
        <View style={styles.jobCard}>
          <View style={styles.iconBox}>
            <BriefcaseIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.jobCardContent}>
            <Text style={styles.jobCardLabel}>{t("driver.crewReadiness.assignedJobLabel")}</Text>
            <Text style={styles.jobCardValue}>{job.id}</Text>
          </View>
        </View>

        {/* Card 2: Driver Alex (Figma 1086:365) */}
        <View style={styles.crewMemberCard}>
          <View style={styles.memberLeft}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>A</Text>
            </View>
            <Text style={styles.memberName}>{t("driver.crewReadiness.driverTitle")}</Text>
          </View>

          <View style={styles.memberRight}>
            <View style={styles.acceptedBadge}>
              <Text style={styles.acceptedBadgeText}>
                {t("driver.crewReadiness.badgeAccepted")}
              </Text>
            </View>
            <ChevronRightIcon size={18} color="#8E9E99" />
          </View>
        </View>

        {/* Card 3: Helper Independent Response (Figma 1086:365) */}
        <View style={styles.crewMemberCard}>
          <View style={styles.memberLeft}>
            <View style={styles.avatarCircleHelper}>
              <HelperUsersIcon size={18} color="#BAFF42" />
            </View>
            <Text style={styles.memberName}>{t("driver.crewReadiness.helperTitle")}</Text>
          </View>

          <View style={styles.memberRight}>
            <View style={isHelperAccepted ? styles.acceptedBadge : styles.pendingBadge}>
              <Text style={isHelperAccepted ? styles.acceptedBadgeText : styles.pendingBadgeText}>
                {helperBadgeText}
              </Text>
            </View>
            <ChevronRightIcon size={18} color="#8E9E99" />
          </View>
        </View>

        {/* Notice Card 4: Verification Warning (Figma 1086:365) */}
        <View style={styles.warningCard}>
          <InfoIcon size={20} color="#8E9E99" />
          <Text style={styles.warningText}>{t("driver.crewReadiness.notice")}</Text>
        </View>

        <View style={{ height: spacing[6] }} />

        {/* Primary Action Button */}
        <Pressable
          onPress={handleActiveJobPreview}
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
          accessibilityRole="button"
          accessibilityLabel={t("driver.crewReadiness.viewActiveJobCta")}
        >
          <Text style={styles.primaryBtnText}>{t("driver.crewReadiness.viewActiveJobCta")}</Text>
        </Pressable>

        {/* Secondary Action Button */}
        <Pressable
          onPress={handleBackToJobDetails}
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}
          accessibilityRole="button"
          accessibilityLabel={t("driver.crewReadiness.backToJobCta")}
        >
          <Text style={styles.secondaryBtnText}>{t("driver.crewReadiness.backToJobCta")}</Text>
        </Pressable>
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
    paddingBottom: spacing[8],
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: spacing[2],
  },
  heroThumbnail: {
    width: 68,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#232C28",
    alignItems: "center",
    justifyContent: "center",
  },
  jobCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#232C28",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.lg,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  jobCardContent: {
    flex: 1,
  },
  jobCardLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    marginBottom: 2,
  },
  jobCardValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
  },
  crewMemberCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  memberLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    flex: 1,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2E3B35",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#BAFF42",
  },
  avatarCircleHelper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  memberName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#F6F8F6",
    flex: 1,
  },
  memberRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  acceptedBadge: {
    backgroundColor: "#BAFF42",
    paddingHorizontal: spacing[2.5],
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  acceptedBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#080B0B",
    letterSpacing: 0.5,
  },
  pendingBadge: {
    backgroundColor: "#232C28",
    paddingHorizontal: spacing[2.5],
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  pendingBadgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#F6F8F6",
    letterSpacing: 0.5,
  },
  warningCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[3],
  },
  warningText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
    lineHeight: 17,
    flex: 1,
  },
  primaryBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: spacing[3],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[3],
  },
  primaryBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#080B0B",
  },
  secondaryBtn: {
    backgroundColor: "#151A19",
    borderRadius: radius.full,
    paddingVertical: spacing[3],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#232C28",
  },
  secondaryBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
