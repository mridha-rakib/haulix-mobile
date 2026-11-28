import { spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  ClockIcon,
  PackageCubeIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import { useServiceProgressStore } from "../../src/stores/serviceProgressStore";

export default function ExtraWorkPendingScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { activeJobId, getActiveRequest, setMockApprovalScenario, activeRequestId } =
    useServiceProgressStore();

  const isEs = currentLocale === "es";
  const activeRequest = getActiveRequest(activeJobId);

  const handleBack = () => {
    router.push("/(app)/on-site-progress" as Href);
  };

  const handlePreviewApproved = () => {
    if (activeRequestId) {
      setMockApprovalScenario(activeRequestId, "APPROVED");
    }
    router.push("/(app)/extra-work-approved" as Href);
  };

  const handlePreviewDeclined = () => {
    if (activeRequestId) {
      setMockApprovalScenario(activeRequestId, "DECLINED");
    }
    router.push("/(app)/extra-work-declined" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ChevronLeftIcon size={24} color="#F6F8F6" />
          </Pressable>
          <Text style={styles.title}>{t("driver.extraWorkPending.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.extraWorkPending.subtitle")}</Text>
        </View>

        {/* Card 1: Two Approvals Required */}
        <View style={styles.cardLarge}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconWrap}>
              <ShieldCheckIcon size={22} color="#BAFF42" />
            </View>
            <Text style={styles.cardTitle}>{t("driver.extraWorkPending.twoApprovalsTitle")}</Text>
          </View>
          <Text style={styles.cardDesc}>{t("driver.extraWorkPending.twoApprovalsDesc")}</Text>
        </View>

        {/* Card 2: Scope Change */}
        <View style={styles.card}>
          <View style={styles.cardIconWrap}>
            <PackageCubeIcon size={22} color="#BAFF42" />
          </View>
          <View style={styles.cardMetaWrap}>
            <Text style={styles.metaLabel}>{t("driver.extraWorkPending.scopeChangeTitle")}</Text>
            <Text style={styles.metaTitle}>
              {activeRequest
                ? isEs
                  ? activeRequest.requestedScopeEs || activeRequest.requestedScope
                  : activeRequest.requestedScope
                : t("driver.extraWorkPending.scopeChangeSubtitle")}
            </Text>
          </View>
        </View>

        {/* Card 3: Two-Stage Approval */}
        <View style={styles.cardLarge}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconWrap}>
              <UsersIcon size={22} color="#BAFF42" />
            </View>
            <Text style={styles.cardTitle}>{t("driver.extraWorkPending.twoStageTitle")}</Text>
          </View>
          <Text style={styles.cardDesc}>{t("driver.extraWorkPending.twoStageDesc")}</Text>

          <View style={styles.stageStatusRow}>
            <View style={styles.stageItem}>
              <ClockIcon size={16} color="#BAFF42" />
              <Text style={styles.stageLabel}>Admin: PENDING</Text>
            </View>
            <View style={styles.stageItem}>
              <ClockIcon size={16} color="#BAFF42" />
              <Text style={styles.stageLabel}>Customer: PENDING</Text>
            </View>
          </View>
        </View>

        <View style={{ height: spacing[3] }} />

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handlePreviewApproved}
            style={{
              backgroundColor: "#BAFF42",
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.extraWorkPending.previewApprovedCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#080B0B",
                letterSpacing: 0.3,
              }}
            >
              {t("driver.extraWorkPending.previewApprovedCta")}
            </Text>
          </Pressable>

          <Pressable
            onPress={handlePreviewDeclined}
            style={{
              backgroundColor: "#131917",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#BAFF42",
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.extraWorkPending.previewDeclinedCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#BAFF42",
              }}
            >
              {t("driver.extraWorkPending.previewDeclinedCta")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* 5-Tab Bar (Figma DW51: Jobs Tab Active) */}
      <DriverBottomNav activeTab="jobs" />
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
    marginBottom: spacing[3],
  },
  backButton: {
    marginBottom: spacing[2],
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#F6F8F6",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#9EA8A3",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#131917",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232D29",
    padding: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  cardLarge: {
    backgroundColor: "#131917",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232D29",
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(186, 255, 66, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  cardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
    flex: 1,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#A2AEA8",
    lineHeight: 18,
  },
  cardMetaWrap: {
    flex: 1,
  },
  metaLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#7E8E87",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
    marginTop: 2,
  },
  stageStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing[3],
    paddingTop: spacing[2],
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
  },
  stageItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stageLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#BAFF42",
  },
  actionsContainer: {
    gap: spacing[2],
    marginBottom: spacing[3],
  },
});
