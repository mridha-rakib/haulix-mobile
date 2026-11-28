import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DriverTruckIcon,
  MapPinIcon,
  ShieldIcon,
  StarIcon,
  UserIcon,
} from "../../../src/components/icons/DriverIcons";
import { AvailabilityOverlay } from "../../../src/components/overlays/AvailabilityOverlay";
import { useDriverTranslation } from "../../../src/i18n";
import { useDriverAuthStore } from "../../../src/stores/authStore";
import { useAvailabilityStore } from "../../../src/stores/availabilityStore";

function DriverDashboardContent({
  isOnline,
  toggleDriverStatus,
  onOpenPreferences,
}: {
  isOnline: boolean;
  toggleDriverStatus: () => void;
  onOpenPreferences: () => void;
}) {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("driver.dashboardDriver.title")}</Text>
        <Text style={styles.headerSub}>{t("driver.dashboardDriver.subtitle")}</Text>
      </View>

      {/* Worker Greeting Card (Figma 1086:3) */}
      <View style={styles.workerCard}>
        <View style={styles.workerHeader}>
          <View style={styles.avatarWrap}>
            <UserIcon size={24} color="#BAFF42" />
          </View>
          <View style={styles.workerDetails}>
            <Text style={styles.greetingTitle}>{t("driver.dashboardDriver.greeting")}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>4.8</Text>
              <StarIcon size={12} color="#BAFF42" style={{ marginHorizontal: 2 }} />
              <Text style={styles.ratingSub}>
                {currentLocale === "es" ? "· Conductor verificado" : "· verified Driver"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.availabilityRow}>
          <Pressable
            onPress={toggleDriverStatus}
            accessibilityRole="button"
            accessibilityLabel="Toggle online availability"
          >
            <View
              style={[styles.availabilityPill, isOnline ? styles.pillOnline : styles.pillOffline]}
            >
              <Text
                style={[
                  styles.availabilityPillText,
                  isOnline ? styles.textOnline : styles.textOffline,
                ]}
              >
                {isOnline
                  ? t("driver.dashboardDriver.onlinePill")
                  : t("driver.dashboardDriver.offlinePill")}
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={onOpenPreferences}
            style={({ pressed }) => [styles.subRowPressable, pressed && styles.pressed]}
          >
            <Text style={styles.availabilitySubText}>
              {isOnline
                ? t("driver.dashboardDriver.onlineSub")
                : t("driver.dashboardDriver.offlineSub")}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Section Header: Available Job Offers (Figma 1086:3) */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitleLime}>{t("driver.dashboardDriver.sectionHeader")}</Text>
        <Text style={styles.sectionSubMuted}>{t("driver.dashboardDriver.sectionSub")}</Text>
      </View>

      {/* Job Offer Card 1: Furniture Removal (Figma 1086:3) */}
      <Pressable
        onPress={() => router.push("/(app)/(tabs)/jobs" as Href)}
        style={({ pressed }) => [styles.jobCard, pressed && styles.pressed]}
      >
        <View style={styles.jobTopRow}>
          <View style={styles.truckIconSquare}>
            <DriverTruckIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.jobInfo}>
            <View style={styles.jobTitleRow}>
              <Text style={styles.jobTitle}>{t("driver.dashboardDriver.job1Title")}</Text>
              <View style={styles.badgeNew}>
                <Text style={styles.badgeNewText}>{t("driver.dashboardDriver.badgeNew")}</Text>
              </View>
            </View>
            <Text style={styles.jobIdText}>{t("driver.dashboardDriver.job1Id")}</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <MapPinIcon size={14} color="#BAFF42" />
          <Text style={styles.locationText}>{t("driver.dashboardDriver.job1Location")}</Text>
        </View>

        <Text style={styles.jobFooterLime}>{t("driver.dashboardDriver.job1Footer")}</Text>
      </Pressable>

      {/* Job Offer Card 2: Junk Removal (Figma 1086:3) */}
      <Pressable
        onPress={() => router.push("/(app)/(tabs)/jobs" as Href)}
        style={({ pressed }) => [styles.jobCard, pressed && styles.pressed]}
      >
        <View style={styles.jobTopRow}>
          <View style={styles.truckIconSquare}>
            <DriverTruckIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.jobInfo}>
            <View style={styles.jobTitleRow}>
              <Text style={styles.jobTitle}>{t("driver.dashboardDriver.job2Title")}</Text>
              <View style={styles.badgeNew}>
                <Text style={styles.badgeNewText}>{t("driver.dashboardDriver.badgeNew")}</Text>
              </View>
            </View>
            <Text style={styles.jobIdText}>{t("driver.dashboardDriver.job2Sub")}</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <MapPinIcon size={14} color="#BAFF42" />
          <Text style={styles.locationText}>{t("driver.dashboardDriver.job2Location")}</Text>
        </View>

        <Text style={styles.jobFooterLime}>{t("driver.dashboardDriver.job2Footer")}</Text>
      </Pressable>

      {/* Server-Gated Disclosure Notice (Figma 1086:3) */}
      <View style={styles.disclosureCard}>
        <ShieldIcon size={20} color="#BAFF42" />
        <Text style={styles.disclosureText}>{t("driver.dashboardDriver.disclosureNotice")}</Text>
      </View>
    </>
  );
}

function HelperDashboardContent({
  isOnline,
  toggleHelperStatus,
}: {
  isOnline: boolean;
  toggleHelperStatus: () => void;
}) {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("driver.dashboardHelper.title")}</Text>
        <Text style={styles.headerSub}>{t("driver.dashboardHelper.subtitle")}</Text>
      </View>

      {/* Helper Greeting Card (Figma 1086:1058) */}
      <View style={styles.workerCard}>
        <Text style={styles.helperHeadline}>{t("driver.dashboardHelper.greeting")}</Text>

        <Pressable
          onPress={toggleHelperStatus}
          style={({ pressed }) => [styles.helperAvailRow, pressed && styles.pressed]}
        >
          <Text style={styles.helperAvailText}>
            {t("driver.dashboardHelper.availabilityLine", {
              status: isOnline
                ? currentLocale === "es"
                  ? "EN LÍNEA"
                  : "ONLINE"
                : currentLocale === "es"
                  ? "DESCONECTADO"
                  : "OFFLINE",
            })}
          </Text>
        </Pressable>

        <Text style={styles.helperSubText}>{t("driver.dashboardHelper.availabilitySub")}</Text>
      </View>

      {/* Helper Card 1: Invitations waiting (Figma 1086:1058) */}
      <Pressable
        onPress={() => router.push("/(app)/(tabs)/jobs" as Href)}
        style={({ pressed }) => [styles.helperActionCard, pressed && styles.pressed]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.helperCardTitle}>{t("driver.dashboardHelper.card1Title")}</Text>
          <Text style={styles.badgeLimeText}>{t("driver.dashboardHelper.card1Badge")}</Text>
        </View>
        <Text style={styles.helperCardSub}>{t("driver.dashboardHelper.card1Sub")}</Text>
      </Pressable>

      {/* Helper Card 2: Current assignment (Figma 1086:1058) */}
      <Pressable
        onPress={() => router.push("/(app)/(tabs)/jobs" as Href)}
        style={({ pressed }) => [styles.helperActionCard, pressed && styles.pressed]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.helperCardTitle}>{t("driver.dashboardHelper.card2Title")}</Text>
          <Text style={styles.badgeLimeText}>{t("driver.dashboardHelper.card2Badge")}</Text>
        </View>
        <Text style={styles.helperCardSub}>{t("driver.dashboardHelper.card2Sub")}</Text>
      </Pressable>

      {/* Helper Card 3: Your earnings (Figma 1086:1058) */}
      <Pressable
        onPress={() => router.push("/(app)/(tabs)/earnings" as Href)}
        style={({ pressed }) => [styles.helperActionCard, pressed && styles.pressed]}
      >
        <Text style={styles.helperCardTitle}>{t("driver.dashboardHelper.card3Title")}</Text>
        <Text style={styles.helperCardSub}>{t("driver.dashboardHelper.card3Sub")}</Text>
      </Pressable>

      {/* Helper Card 4: Independent responsibility (Figma 1086:1058) */}
      <View style={styles.helperActionCard}>
        <Text style={styles.helperCardTitle}>{t("driver.dashboardHelper.card4Title")}</Text>
        <Text style={styles.helperCardSub}>{t("driver.dashboardHelper.card4Sub")}</Text>
      </View>
    </>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { role } = useDriverAuthStore();
  const { driverStatus, helperStatus, toggleDriverStatus, toggleHelperStatus } =
    useAvailabilityStore();

  const [overlayVisible, setOverlayVisible] = useState(false);

  const isDriver = role === "PRIMARY_DRIVER";
  const isOnline = isDriver ? driverStatus === "ONLINE" : helperStatus === "ONLINE";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {isDriver ? (
          <DriverDashboardContent
            isOnline={isOnline}
            toggleDriverStatus={toggleDriverStatus}
            onOpenPreferences={() => setOverlayVisible(true)}
          />
        ) : (
          <HelperDashboardContent isOnline={isOnline} toggleHelperStatus={toggleHelperStatus} />
        )}
      </ScrollView>

      {/* Supporting Overlay: OV05 Availability Preferences */}
      <AvailabilityOverlay
        visible={overlayVisible}
        onClose={() => setOverlayVisible(false)}
        onConfigureSettings={() => {
          setOverlayVisible(false);
          router.push("/(app)/availability-settings" as Href);
        }}
      />
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
    gap: spacing[3],
  },
  header: {
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#F6F8F6",
    letterSpacing: -0.3,
  },
  headerSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    color: "#ADB8B0",
    marginTop: 3,
  },
  workerCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
  },
  workerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  avatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  workerDetails: {
    flex: 1,
  },
  greetingTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#F6F8F6",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  ratingText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#BAFF42",
  },
  ratingSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
  },
  availabilityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  availabilityPill: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  pillOnline: {
    backgroundColor: "#BAFF42",
  },
  pillOffline: {
    backgroundColor: "#202826",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  availabilityPillText: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  textOnline: {
    fontFamily: "Inter_700Bold",
    color: "#080B0B",
  },
  textOffline: {
    fontFamily: "Inter_600SemiBold",
    color: "#ADB8B0",
  },
  subRowPressable: {
    flex: 1,
  },
  availabilitySubText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing[1],
  },
  sectionTitleLime: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  sectionSubMuted: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
  },
  jobCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    gap: spacing[2.5],
  },
  jobTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  truckIconSquare: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  jobInfo: {
    flex: 1,
  },
  jobTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  jobTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#F6F8F6",
  },
  badgeNew: {
    backgroundColor: "#BAFF42",
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeNewText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#080B0B",
  },
  jobIdText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1.5],
  },
  locationText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#ADB8B0",
  },
  jobFooterLime: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#BAFF42",
  },
  disclosureCard: {
    backgroundColor: "#121716",
    borderRadius: radius.xl,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#202826",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginTop: spacing[1],
  },
  disclosureText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: "#ADB8B0",
    flex: 1,
  },
  helperHeadline: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: "#F6F8F6",
    marginBottom: spacing[2],
  },
  helperAvailRow: {
    marginBottom: spacing[1.5],
  },
  helperAvailText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#BAFF42",
  },
  helperSubText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
  },
  helperActionCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    gap: spacing[1.5],
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helperCardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#F6F8F6",
  },
  badgeLimeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  helperCardSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12.5,
    lineHeight: 18,
    color: "#ADB8B0",
  },
  pressed: {
    opacity: 0.8,
  },
});
