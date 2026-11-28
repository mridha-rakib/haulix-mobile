import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CalendarIcon,
  ShieldIcon,
  SofaIcon,
  TruckIcon,
  WalletIcon,
} from "../../src/components/icons/DriverIcons";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export default function ReviewInvitationScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { getSelectedJob, activeInvitationId, helperAcceptInvitation, helperDeclineInvitation } =
    useDispatchCrewStore();

  const isEs = currentLocale === "es";
  const job = getSelectedJob();
  const jobTitle = isEs ? job.titleEs : job.titleEn;
  const schedule = isEs ? job.scheduleEs : job.scheduleEn;

  const handleAccept = () => {
    const invId = activeInvitationId || "INV-DEMO-0042";
    helperAcceptInvitation(invId);
    router.push("/(app)/helper-active-job" as Href);
  };

  const handleDecline = () => {
    const invId = activeInvitationId || "INV-DEMO-0042";
    helperDeclineInvitation(invId);
    router.push("/(app)/helper-invitations" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.reviewInvitation.title")}
        subtitle={t("driver.reviewInvitation.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header row with Decision Badge and item thumbnail */}
        <View style={styles.badgeRow}>
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>{t("driver.reviewInvitation.badgeDecision")}</Text>
          </View>
          <View style={styles.itemThumbnail}>
            <SofaIcon size={22} color="#BAFF42" />
          </View>
        </View>

        {/* Card 1: Driver's Request (Figma 1086:328) */}
        <View style={styles.detailCard}>
          <View style={styles.iconBox}>
            <TruckIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>{t("driver.reviewInvitation.driverRequestLabel")}</Text>
            <Text style={styles.cardValue}>{`${jobTitle} / ${job.id}`}</Text>
          </View>
        </View>

        {/* Card 2: Location & Schedule (Figma 1086:328) */}
        <View style={styles.detailCard}>
          <View style={styles.iconBox}>
            <CalendarIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>
              {t("driver.reviewInvitation.locationScheduleLabel")}
            </Text>
            <Text style={styles.cardValue}>{`Phoenix · ${schedule}`}</Text>
          </View>
        </View>

        {/* Card 3: Your individual earnings (Figma 1086:328) */}
        <View style={styles.detailCard}>
          <View style={styles.iconBox}>
            <WalletIcon size={20} color="#BAFF42" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>{t("driver.reviewInvitation.earningsLabel")}</Text>
            <Text style={styles.cardValueLime}>
              {`$${job.helperPayout.toFixed(0)} · ${isEs ? "estimación" : "estimate"}`}
            </Text>
          </View>
        </View>

        {/* Card 4: Accept as an individual Helper notice (Figma 1086:328) */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeTopRow}>
            <ShieldIcon size={22} color="#BAFF42" />
            <Text style={styles.noticeTitle}>{t("driver.reviewInvitation.acceptTitle")}</Text>
          </View>
          <Text style={styles.noticeDesc}>{t("driver.reviewInvitation.acceptDesc")}</Text>
        </View>

        <View style={{ height: spacing[6] }} />

        {/* Action Buttons */}
        <Pressable
          onPress={handleAccept}
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
          accessibilityRole="button"
          accessibilityLabel={t("driver.reviewInvitation.acceptCta")}
        >
          <Text style={styles.primaryBtnText}>{t("driver.reviewInvitation.acceptCta")}</Text>
        </Pressable>

        <Pressable
          onPress={handleDecline}
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}
          accessibilityRole="button"
          accessibilityLabel={t("driver.reviewInvitation.declineCta")}
        >
          <Text style={styles.secondaryBtnText}>{t("driver.reviewInvitation.declineCta")}</Text>
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
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[4],
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
  itemThumbnail: {
    width: 64,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#232C28",
    alignItems: "center",
    justifyContent: "center",
  },
  detailCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#232C28",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginBottom: spacing[2.5],
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: radius.lg,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    marginBottom: 2,
  },
  cardValue: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
  },
  cardValueLime: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#BAFF42",
  },
  noticeCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    marginTop: spacing[1],
  },
  noticeTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2.5],
    marginBottom: spacing[2],
  },
  noticeTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#F6F8F6",
  },
  noticeDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
    lineHeight: 17,
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
