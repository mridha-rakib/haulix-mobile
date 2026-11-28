import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClockTimerIcon,
  MapPinIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useWalletStore } from "../../src/stores/walletStore";

interface CompletedJobItem {
  id: string;
  title: string;
  pickup: string;
  dropoff: string;
  payoutStr: string;
  dateStr: string;
  statusBadge: "completed" | "review";
}

interface PastJobItem {
  id: string;
  title: string;
  reason: string;
  dateStr: string;
  type: "expired" | "cancelled";
  targetRoute: string;
}

export default function MyJobsScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { activeRole, getWalletForRole } = useWalletStore();
  const [activeTab, setActiveTab] = useState<"completed" | "past">("completed");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/profile" as Href);
    }
  };

  const wallet = getWalletForRole(activeRole);
  const completedJobs: CompletedJobItem[] = wallet.recentJobs.map((j) => ({
    id: j.jobId,
    title: j.jobTitle,
    pickup: "North Scottsdale",
    dropoff: "Downtown Tempe",
    payoutStr: `$${(j.netPayableCents / 100).toFixed(2)}`,
    dateStr: j.date,
    statusBadge: j.status === "available" ? "completed" : "review",
  }));

  const pastJobs: PastJobItem[] = [
    {
      id: "HX-AZ-OFFER-0012",
      title: "Warehouse Pallet Transport",
      reason: "Offer countdown timer expired before acceptance",
      dateStr: "Yesterday · 4:30 PM",
      type: "expired",
      targetRoute: "/(app)/offer-expired",
    },
    {
      id: "HX-AZ-OFFER-0009",
      title: "Office Equipment Shuttle",
      reason: "Booking cancelled by customer due to reschedule",
      dateStr: "Nov 22, 2026",
      type: "cancelled",
      targetRoute: "/(app)/job-offers",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t("driver.myJobs.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.myJobs.subtitle")}</Text>
        </View>
      </View>

      {/* Segmented Control */}
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tabBtn, activeTab === "completed" && styles.tabBtnActive]}
          onPress={() => setActiveTab("completed")}
          accessibilityRole="button"
          accessibilityLabel={t("driver.myJobs.tabCompleted")}
        >
          <Text style={[styles.tabBtnText, activeTab === "completed" && styles.tabBtnTextActive]}>
            {t("driver.myJobs.tabCompleted")} ({completedJobs.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabBtn, activeTab === "past" && styles.tabBtnActive]}
          onPress={() => setActiveTab("past")}
          accessibilityRole="button"
          accessibilityLabel={t("driver.myJobs.tabPast")}
        >
          <Text style={[styles.tabBtnText, activeTab === "past" && styles.tabBtnTextActive]}>
            {t("driver.myJobs.tabPast")} ({pastJobs.length})
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === "completed" ? (
          <View style={styles.jobList}>
            {completedJobs.map((job) => (
              <Pressable
                key={job.id}
                style={styles.jobCard}
                onPress={() => router.push(`/(app)/job-completed?jobId=${job.id}` as Href)}
                accessibilityRole="button"
                accessibilityLabel={`${job.title}, ${job.payoutStr}`}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.badgeRow}>
                    <View
                      style={[
                        styles.badgePill,
                        job.statusBadge === "completed"
                          ? styles.badgeCompleted
                          : styles.badgeReview,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgePillText,
                          job.statusBadge === "completed"
                            ? styles.badgeCompletedText
                            : styles.badgeReviewText,
                        ]}
                      >
                        {job.statusBadge === "completed"
                          ? t("driver.myJobs.completedBadge")
                          : t("driver.myJobs.underReviewBadge")}
                      </Text>
                    </View>
                    <Text style={styles.jobIdText}>{job.id}</Text>
                  </View>
                  <Text style={styles.payoutText}>{job.payoutStr}</Text>
                </View>

                <Text style={styles.jobTitle}>{job.title}</Text>

                <View style={styles.routeContainer}>
                  <View style={styles.routeRow}>
                    <MapPinIcon color="#BAFF42" size={14} />
                    <Text style={styles.routeText}>{job.pickup}</Text>
                  </View>
                  <View style={styles.routeRow}>
                    <MapPinIcon color="#8E9E99" size={14} />
                    <Text style={styles.routeText}>{job.dropoff}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.dateRow}>
                    <CalendarIcon color="#8E9E99" size={13} />
                    <Text style={styles.dateText}>{job.dateStr}</Text>
                  </View>
                  <View style={styles.viewLink}>
                    <Text style={styles.viewLinkText}>{t("driver.myJobs.viewSummary")}</Text>
                    <ChevronRightIcon color="#BAFF42" size={14} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.jobList}>
            {pastJobs.map((job) => (
              <Pressable
                key={job.id}
                style={styles.jobCard}
                onPress={() => router.push(job.targetRoute as Href)}
                accessibilityRole="button"
                accessibilityLabel={`${job.title}, ${job.type}`}
              >
                <View style={styles.cardHeaderRow}>
                  <View
                    style={[
                      styles.badgePill,
                      job.type === "expired" ? styles.badgeExpired : styles.badgeCancelled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgePillText,
                        job.type === "expired"
                          ? styles.badgeExpiredText
                          : styles.badgeCancelledText,
                      ]}
                    >
                      {job.type === "expired"
                        ? t("driver.myJobs.expiredBadge")
                        : t("driver.myJobs.cancelledBadge")}
                    </Text>
                  </View>
                  <Text style={styles.jobIdText}>{job.id}</Text>
                </View>

                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.pastReason}>{job.reason}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.dateRow}>
                    <ClockTimerIcon color="#8E9E99" size={13} />
                    <Text style={styles.dateText}>{job.dateStr}</Text>
                  </View>
                  <ChevronRightIcon color="#8E9E99" size={16} />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0F0E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
    gap: spacing[3],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "#16201B",
    borderWidth: 1,
    borderColor: "#24342C",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing[4],
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: radius.full,
    backgroundColor: "#111815",
    borderWidth: 1,
    borderColor: "#22332B",
  },
  tabBtnActive: {
    backgroundColor: "#BAFF42",
    borderColor: "#BAFF42",
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#8E9E99",
  },
  tabBtnTextActive: {
    color: "#0B0F0E",
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  jobList: {
    gap: spacing[3],
  },
  jobCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  badgeCompleted: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
  },
  badgeCompletedText: {
    color: "#BAFF42",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  badgeReview: {
    backgroundColor: "rgba(255, 176, 32, 0.15)",
  },
  badgeReviewText: {
    color: "#FFB020",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  badgeExpired: {
    backgroundColor: "rgba(142, 158, 153, 0.15)",
  },
  badgeExpiredText: {
    color: "#8E9E99",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  badgeCancelled: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  badgeCancelledText: {
    color: "#EF4444",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  badgePillText: {
    fontSize: 10,
    fontWeight: "800",
  },
  jobIdText: {
    fontSize: 11,
    color: "#8E9E99",
    fontWeight: "600",
  },
  payoutText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#BAFF42",
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: spacing[2],
  },
  pastReason: {
    fontSize: 12,
    color: "#8E9E99",
    marginBottom: spacing[3],
    lineHeight: 16,
  },
  routeContainer: {
    gap: 4,
    marginBottom: spacing[3],
    paddingLeft: 4,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  routeText: {
    fontSize: 12,
    color: "#D0D9D5",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#1C2A23",
    paddingTop: spacing[2],
    marginTop: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 11,
    color: "#8E9E99",
  },
  viewLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  viewLinkText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BAFF42",
  },
});
