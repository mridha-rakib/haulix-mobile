import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BellIcon,
  MapPinIcon,
  ShieldIcon,
  TruckIcon,
} from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export function HelperInvitationsContent() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { getSelectedJob, setSelectedJobId } = useDispatchCrewStore();

  const isEs = currentLocale === "es";
  const job = getSelectedJob();
  const title = isEs ? job.titleEs : job.titleEn;
  const location = isEs ? job.locationEs : job.locationEn;

  const handleSelectInvitation = () => {
    setSelectedJobId(job.id);
    router.push("/(app)/review-invitation" as Href);
  };

  return (
    <View style={styles.flexContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Hero Image thumbnail (Figma 1086:268) */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{t("driver.helperInvitations.title")}</Text>
            <Text style={styles.subtitle}>{t("driver.helperInvitations.subtitle")}</Text>
          </View>
          <View style={styles.heroThumbnail}>
            <View style={styles.heroPlaceholder}>
              <TruckIcon size={24} color="#BAFF42" />
            </View>
          </View>
        </View>

        {/* Role Badge */}
        <View style={styles.badgeWrapper}>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{t("driver.helperInvitations.roleBadge")}</Text>
          </View>
        </View>

        {/* Invitation Card (Figma 1086:268) */}
        <Pressable
          onPress={handleSelectInvitation}
          style={({ pressed }) => [styles.invitationCard, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Review invitation for ${title}`}
        >
          <View style={styles.cardTopRow}>
            <View style={styles.cardHeaderLeft}>
              <View style={styles.iconBox}>
                <TruckIcon size={20} color="#BAFF42" />
              </View>
              <View style={styles.titleGroup}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>{job.id}</Text>
              </View>
            </View>

            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{t("driver.jobOffers.badgeNew")}</Text>
            </View>
          </View>

          {/* Location row */}
          <View style={styles.locationRow}>
            <MapPinIcon size={16} color="#BAFF42" />
            <Text style={styles.locationText}>{location}</Text>
          </View>

          {/* Footer payout eligibility */}
          <Text style={styles.footerNote}>{t("driver.helperInvitations.individualPayout")}</Text>
        </Pressable>

        {/* Notice Card 2: You decide for yourself (Figma 1086:268) */}
        <View style={styles.infoCard}>
          <View style={styles.infoTopRow}>
            <ShieldIcon size={22} color="#BAFF42" />
            <Text style={styles.infoTitle}>{t("driver.helperInvitations.decideTitle")}</Text>
          </View>
          <Text style={styles.infoDesc}>{t("driver.helperInvitations.decideDesc")}</Text>
        </View>

        {/* Notice Card 3: Other invitations placeholder (Figma 1086:268) */}
        <View style={styles.placeholderCard}>
          <BellIcon size={20} color="#BAFF42" />
          <Text style={styles.placeholderText}>{t("driver.helperInvitations.otherInvites")}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default function HelperInvitationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <HelperInvitationsContent />
      <DriverBottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
  },
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[6],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  headerLeft: {
    flex: 1,
    marginRight: spacing[3],
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: "#F6F8F6",
    marginBottom: spacing[1],
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
    lineHeight: 18,
  },
  heroThumbnail: {
    width: 68,
    height: 52,
    borderRadius: radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#232C28",
  },
  heroPlaceholder: {
    flex: 1,
    backgroundColor: "#151A19",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrapper: {
    marginBottom: spacing[4],
    flexDirection: "row",
  },
  roleBadge: {
    backgroundColor: "#BAFF42",
    paddingHorizontal: spacing[3],
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  roleBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#080B0B",
    letterSpacing: 0.5,
  },
  invitationCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    marginBottom: spacing[3],
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  titleGroup: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    color: "#F6F8F6",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#8E9E99",
  },
  badgePill: {
    backgroundColor: "#BAFF42",
    paddingHorizontal: spacing[3],
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  badgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#080B0B",
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  locationText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#F6F8F6",
  },
  footerNote: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#BAFF42",
  },
  infoCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    marginBottom: spacing[3],
  },
  infoTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2.5],
    marginBottom: spacing[2],
  },
  infoTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
  },
  infoDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
    lineHeight: 18,
  },
  placeholderCard: {
    backgroundColor: "#101614",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  placeholderText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
  },
});
