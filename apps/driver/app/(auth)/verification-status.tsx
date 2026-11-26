import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShieldIcon } from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function VerificationStatusScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { setRole, loginMock } = useDriverAuthStore();

  const handleDriverHome = () => {
    setRole("PRIMARY_DRIVER");
    loginMock("driver.demo@haulix.com", "PRIMARY_DRIVER");
    router.replace("/(app)/(tabs)");
  };

  const handleHelperHome = () => {
    setRole("HELPER");
    loginMock("helper.demo@haulix.com", "HELPER");
    router.replace("/(app)/(tabs)");
  };

  const handleCheckDetails = () => {
    router.push("/(auth)/verification-action");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.verificationStatus.title")}
        subtitle={t("driver.verificationStatus.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Hero Container */}
        <View style={styles.heroBox}>
          <View style={styles.shieldWrap}>
            <ShieldIcon size={36} color="#BAFF42" />
          </View>
          <Text style={styles.heroHeadline}>{t("driver.verificationStatus.heroTitle")}</Text>
          <Text style={styles.heroSubtitle}>{t("driver.verificationStatus.heroSub")}</Text>
        </View>

        <View style={{ height: spacing[5] }} />

        {/* Status Details Card */}
        <View style={styles.statusBox}>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>{t("driver.verificationStatus.statusPill")}</Text>
          </View>
          <Text style={styles.statusNoticeText}>{t("driver.verificationStatus.statusNotice")}</Text>
        </View>

        <View style={{ height: spacing[4] }} />

        {/* Helper Home Text Link */}
        <Pressable
          onPress={handleHelperHome}
          style={({ pressed }) => [styles.linkWrap, pressed && styles.linkPressed]}
        >
          <Text style={styles.linkText}>{t("driver.verificationStatus.helperHomeLink")}</Text>
        </Pressable>

        <View style={{ height: spacing[6] }} />

        {/* Action CTAs */}
        <ActionCtaButton
          label={t("driver.verificationStatus.sampleDriverHomeCta")}
          onPress={handleDriverHome}
          variant="primary"
          size="large"
        />

        <View style={{ height: spacing[3] }} />

        <ActionCtaButton
          label={t("driver.verificationStatus.checkDetailsCta")}
          onPress={handleCheckDetails}
          variant="outline"
          size="large"
        />
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
  heroBox: {
    alignItems: "center",
    paddingTop: spacing[4],
  },
  shieldWrap: {
    width: 72,
    height: 72,
    borderRadius: radius["2xl"],
    backgroundColor: "#161E1A",
    borderWidth: 1.5,
    borderColor: "#2E3A34",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[5],
  },
  heroHeadline: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#F6F8F6",
    marginBottom: spacing[2],
    textAlign: "center",
  },
  heroSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#ADB8B0",
    textAlign: "center",
    paddingHorizontal: spacing[2],
  },
  statusBox: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
  },
  statusPill: {
    alignSelf: "flex-start",
    backgroundColor: "#202824",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#2E3A34",
    marginBottom: spacing[2],
  },
  statusPillText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.8,
    color: "#F6F8F6",
    textTransform: "uppercase",
  },
  statusNoticeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#ADB8B0",
  },
  linkWrap: {
    paddingVertical: spacing[1.5],
  },
  linkPressed: {
    opacity: 0.7,
  },
  linkText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#BAFF42",
  },
});
