import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClockIcon, TruckIcon, UsersIcon } from "../../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../../src/i18n";
import { useDriverAuthStore } from "../../../src/stores/authStore";

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { role, currentUser } = useDriverAuthStore();
  const [isOnline, setIsOnline] = useState(true);

  const isDriver = role === "PRIMARY_DRIVER";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Bar */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcomeGreeting}>
              {currentUser?.name || (isDriver ? "Driver Marcus" : "Helper Marcus")}
            </Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {isDriver
                  ? t("driver.dashboard.roleBadgeDriver")
                  : t("driver.dashboard.roleBadgeHelper")}
              </Text>
            </View>
          </View>

          {/* Online / Offline Switch */}
          <Pressable
            onPress={() => setIsOnline(!isOnline)}
            style={[
              styles.statusPill,
              isOnline ? styles.statusPillOnline : styles.statusPillOffline,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isOnline ? styles.statusDotOnline : styles.statusDotOffline,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                isOnline ? styles.statusTextOnline : styles.statusTextOffline,
              ]}
            >
              {isOnline ? t("driver.dashboard.onlineStatus") : t("driver.dashboard.offlineStatus")}
            </Text>
          </Pressable>
        </View>

        {/* Hero Hub Title Banner */}
        <View style={styles.hubTitleBox}>
          <Text style={styles.hubTitle}>
            {isDriver ? t("driver.dashboard.driverTitle") : t("driver.dashboard.helperTitle")}
          </Text>
          <Text style={styles.hubSubtitle}>
            {isDriver
              ? "Fleet vehicle active · Ready for cargo & moving dispatches"
              : "Crew member verified · Ready for loading & helper invites"}
          </Text>
        </View>

        {/* Key Metrics Row */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>TODAY</Text>
            <Text style={styles.metricValue}>$185.50</Text>
            <Text style={styles.metricSub}>3 jobs done</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>ACTIVE RATING</Text>
            <Text style={styles.metricValue}>4.98 ★</Text>
            <Text style={styles.metricSub}>98% on-time</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>WEEK</Text>
            <Text style={styles.metricValue}>$940.00</Text>
            <Text style={styles.metricSub}>14 completed</Text>
          </View>
        </View>

        {/* Active Dispatch Card (DW09 / DW31 Hero) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("driver.dashboard.activeDispatches")}</Text>
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        </View>

        <View style={styles.jobCard}>
          <View style={styles.jobTopRow}>
            <View style={styles.jobTypeWrap}>
              {isDriver ? (
                <TruckIcon size={18} color="#BAFF42" />
              ) : (
                <UsersIcon size={18} color="#BAFF42" />
              )}
              <Text style={styles.jobTypeText}>
                {isDriver ? "26ft Box Truck Move" : "Heavy Lift & Loading Crew"}
              </Text>
            </View>
            <Text style={styles.jobPayout}>$280.00</Text>
          </View>

          <View style={styles.locationBlock}>
            <View style={styles.locDot} />
            <Text style={styles.locText}>Pickup: 4820 E Camelback Rd, Phoenix</Text>
          </View>
          <View style={styles.locationBlock}>
            <View style={[styles.locDot, { backgroundColor: "#BAFF42" }]} />
            <Text style={styles.locText}>Dropoff: 7134 N Scottsdale Rd, Scottsdale</Text>
          </View>

          <View style={styles.jobMetaRow}>
            <View style={styles.metaItem}>
              <ClockIcon size={14} color="#8E9E99" />
              <Text style={styles.metaText}>Pickup in 45 mins</Text>
            </View>
            <View style={styles.metaItem}>
              <UsersIcon size={14} color="#8E9E99" />
              <Text style={styles.metaText}>2 Helpers on crew</Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push("/(app)/(tabs)/jobs")}
            style={({ pressed }) => [styles.jobActionBtn, pressed && styles.jobActionBtnPressed]}
          >
            <Text style={styles.jobActionText}>View Job Details & Navigation</Text>
          </Pressable>
        </View>

        <View style={{ height: spacing[6] }} />

        {/* Nearby Available Work Banner */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("driver.dashboard.pendingOffers")}</Text>
          <Text style={styles.countText}>4 Available</Text>
        </View>

        <Pressable onPress={() => router.push("/(app)/(tabs)/jobs")} style={styles.availableBanner}>
          <View style={styles.bannerInfo}>
            <Text style={styles.bannerTitle}>3 New Moving Offers Nearby</Text>
            <Text style={styles.bannerDesc}>Estimated total: $640.00 · Phoenix Metro</Text>
          </View>
          <View style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Review</Text>
          </View>
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
    paddingTop: spacing[2],
    paddingBottom: spacing[8],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[4],
  },
  welcomeGreeting: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#F6F8F6",
  },
  roleBadge: {
    backgroundColor: "#1A221E",
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#2B3532",
    alignSelf: "flex-start",
    marginTop: 2,
  },
  roleBadgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.full,
    borderWidth: 1,
  },
  statusPillOnline: {
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderColor: "#BAFF42",
  },
  statusPillOffline: {
    backgroundColor: "#151A19",
    borderColor: "#35403B",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing[1.5],
  },
  statusDotOnline: {
    backgroundColor: "#BAFF42",
  },
  statusDotOffline: {
    backgroundColor: "#687771",
  },
  statusText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
  },
  statusTextOnline: {
    color: "#BAFF42",
  },
  statusTextOffline: {
    color: "#8E9E99",
  },
  hubTitleBox: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#2B3532",
    marginBottom: spacing[4],
  },
  hubTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  hubSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
    lineHeight: 16,
  },
  metricsRow: {
    flexDirection: "row",
    gap: spacing[2],
    marginBottom: spacing[5],
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#151A19",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  metricLabel: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: "#8E9E99",
    letterSpacing: 0.5,
  },
  metricValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
    marginTop: 2,
  },
  metricSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#BAFF42",
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
  },
  liveBadge: {
    backgroundColor: "#BAFF42",
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  liveBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 9,
    color: "#080B0B",
  },
  countText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#8E9E99",
  },
  jobCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  jobTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  jobTypeWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  jobTypeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
  },
  jobPayout: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#BAFF42",
  },
  locationBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  locDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ADB8B0",
  },
  locText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
  },
  jobMetaRow: {
    flexDirection: "row",
    gap: spacing[4],
    marginTop: spacing[2],
    marginBottom: spacing[4],
    paddingTop: spacing[2],
    borderTopWidth: 1,
    borderTopColor: "#222B27",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#8E9E99",
  },
  jobActionBtn: {
    backgroundColor: "#1E2523",
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  jobActionBtnPressed: {
    borderColor: "#BAFF42",
  },
  jobActionText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
  },
  availableBanner: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#2B3532",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerInfo: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
  },
  bannerDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#ADB8B0",
    marginTop: 2,
  },
  bannerBtn: {
    backgroundColor: "#BAFF42",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.md,
    marginLeft: spacing[2],
  },
  bannerBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#080B0B",
  },
});
