import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronRightIcon,
  HelperUsersIcon,
  InfoIcon,
  ShieldIcon,
} from "../../src/components/icons/DriverIcons";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export default function InviteHelperScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { getSelectedJob, selectedHelperId, sendHelperInvitation } = useDispatchCrewStore();

  const isEs = currentLocale === "es";
  const job = getSelectedJob();
  const jobTitle = isEs ? job.titleEs : job.titleEn;
  const location = isEs ? job.locationEs : job.locationEn;

  const handleChooseHelper = () => {
    router.push("/(app)/choose-helper" as Href);
  };

  const handleSendInvitation = () => {
    const helperId = selectedHelperId || "helper-a";
    sendHelperInvitation(job.id, helperId);
    router.push("/(app)/invitation-pending" as Href);
  };

  const handleContinueSolo = () => {
    router.push("/(app)/crew-readiness" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.inviteHelper.title")}
        subtitle={t("driver.inviteHelper.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Card 1: Job Summary (Figma 1086:231) */}
        <View style={styles.jobCard}>
          <Text style={styles.jobLabel}>{t("driver.inviteHelper.jobLabel")}</Text>
          <Text style={styles.jobIdText}>{isEs ? `${job.id} · ${jobTitle}` : job.id}</Text>
          <Text style={styles.jobSubText}>{`${jobTitle} · ${location}`}</Text>
        </View>

        {/* Card 2: Select a verified Helper (Figma 1086:231) */}
        <View style={styles.selectHelperCard}>
          <View style={styles.selectHeaderRow}>
            <View style={styles.iconBox}>
              <HelperUsersIcon size={24} color="#BAFF42" />
            </View>
            <View style={styles.selectTextGroup}>
              <Text style={styles.selectTitle}>{t("driver.inviteHelper.selectHelperTitle")}</Text>
              <Text style={styles.selectSub}>{t("driver.inviteHelper.selectHelperSub")}</Text>
            </View>
          </View>

          {/* Interactive button to DW48 */}
          <Pressable
            onPress={handleChooseHelper}
            style={({ pressed }) => [styles.chooseBtn, pressed && styles.btnPressed]}
            accessibilityRole="button"
            accessibilityLabel={t("driver.inviteHelper.chooseHelperBtn")}
          >
            <Text style={styles.chooseBtnText}>{t("driver.inviteHelper.chooseHelperBtn")}</Text>
            <ChevronRightIcon size={16} color="#080B0B" />
          </Pressable>
        </View>

        {/* Card 3: Independent acceptance required (Figma 1086:231) */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeTopRow}>
            <ShieldIcon size={22} color="#BAFF42" />
            <Text style={styles.noticeTitle}>
              {t("driver.inviteHelper.independentNoticeTitle")}
            </Text>
          </View>
          <Text style={styles.noticeDesc}>{t("driver.inviteHelper.independentNoticeDesc")}</Text>
        </View>

        {/* Footnote */}
        <View style={styles.footnoteRow}>
          <InfoIcon size={18} color="#8E9E99" />
          <Text style={styles.footnoteText}>{t("driver.inviteHelper.footnote")}</Text>
        </View>

        <View style={{ height: spacing[6] }} />

        {/* Action Buttons */}
        <Pressable
          onPress={handleSendInvitation}
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
          accessibilityRole="button"
          accessibilityLabel={t("driver.inviteHelper.sendInviteCta")}
        >
          <Text style={styles.primaryBtnText}>{t("driver.inviteHelper.sendInviteCta")}</Text>
        </Pressable>

        <Pressable
          onPress={handleContinueSolo}
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}
          accessibilityRole="button"
          accessibilityLabel={t("driver.inviteHelper.soloCta")}
        >
          <Text style={styles.secondaryBtnText}>{t("driver.inviteHelper.soloCta")}</Text>
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
  jobCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    marginBottom: spacing[3],
  },
  jobLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    marginBottom: 4,
  },
  jobIdText: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  jobSubText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
  },
  selectHelperCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    marginBottom: spacing[3],
  },
  selectHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  selectTextGroup: {
    flex: 1,
  },
  selectTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  selectSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
    lineHeight: 18,
  },
  chooseBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: spacing[2.5],
    paddingHorizontal: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[1],
    alignSelf: "flex-start",
  },
  chooseBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#080B0B",
  },
  noticeCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    marginBottom: spacing[3],
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
    fontSize: 13,
    color: "#ADB8B0",
    lineHeight: 18,
  },
  footnoteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    paddingHorizontal: spacing[1],
    marginBottom: spacing[2],
  },
  footnoteText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
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
