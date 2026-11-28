import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useNotificationStore } from "../../src/stores/notificationStore";

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { preferences, updatePreferences } = useNotificationStore();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/profile" as Href);
    }
  };

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
          <Text style={styles.headerTitle}>{t("driver.notificationSettings.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.notificationSettings.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Push Notifications Section */}
        <Text style={styles.sectionHeading}>{t("driver.notificationSettings.pushSection")}</Text>

        <View style={styles.card}>
          {/* Job Offers */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>{t("driver.notificationSettings.jobOffers")}</Text>
              <Text style={styles.toggleDesc}>
                {t("driver.notificationSettings.jobOffersDesc")}
              </Text>
            </View>
            <Switch
              value={preferences.pushOffers}
              onValueChange={(val) => updatePreferences({ pushOffers: val })}
              trackColor={{ false: "#1C2A23", true: "#BAFF42" }}
              thumbColor={preferences.pushOffers ? "#0B0F0E" : "#8E9E99"}
            />
          </View>

          <View style={styles.divider} />

          {/* Messages */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>{t("driver.notificationSettings.messages")}</Text>
              <Text style={styles.toggleDesc}>{t("driver.notificationSettings.messagesDesc")}</Text>
            </View>
            <Switch
              value={preferences.pushMessages}
              onValueChange={(val) => updatePreferences({ pushMessages: val })}
              trackColor={{ false: "#1C2A23", true: "#BAFF42" }}
              thumbColor={preferences.pushMessages ? "#0B0F0E" : "#8E9E99"}
            />
          </View>

          <View style={styles.divider} />

          {/* Payouts */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>{t("driver.notificationSettings.payouts")}</Text>
              <Text style={styles.toggleDesc}>{t("driver.notificationSettings.payoutsDesc")}</Text>
            </View>
            <Switch
              value={preferences.pushPayouts}
              onValueChange={(val) => updatePreferences({ pushPayouts: val })}
              trackColor={{ false: "#1C2A23", true: "#BAFF42" }}
              thumbColor={preferences.pushPayouts ? "#0B0F0E" : "#8E9E99"}
            />
          </View>
        </View>

        {/* Alternative Channels Section */}
        <Text style={styles.sectionHeading}>{t("driver.notificationSettings.alertSection")}</Text>

        <View style={styles.card}>
          {/* SMS Alerts */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>{t("driver.notificationSettings.smsAlerts")}</Text>
              <Text style={styles.toggleDesc}>
                {t("driver.notificationSettings.smsAlertsDesc")}
              </Text>
            </View>
            <Switch
              value={preferences.smsAlerts}
              onValueChange={(val) => updatePreferences({ smsAlerts: val })}
              trackColor={{ false: "#1C2A23", true: "#BAFF42" }}
              thumbColor={preferences.smsAlerts ? "#0B0F0E" : "#8E9E99"}
            />
          </View>

          <View style={styles.divider} />

          {/* Email Summaries */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>
                {t("driver.notificationSettings.emailSummaries")}
              </Text>
              <Text style={styles.toggleDesc}>
                {t("driver.notificationSettings.emailSummariesDesc")}
              </Text>
            </View>
            <Switch
              value={preferences.emailSummaries}
              onValueChange={(val) => updatePreferences({ emailSummaries: val })}
              trackColor={{ false: "#1C2A23", true: "#BAFF42" }}
              thumbColor={preferences.emailSummaries ? "#0B0F0E" : "#8E9E99"}
            />
          </View>

          <View style={styles.divider} />

          {/* Sound & Haptics */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextCol}>
              <Text style={styles.toggleTitle}>
                {t("driver.notificationSettings.soundHaptics")}
              </Text>
              <Text style={styles.toggleDesc}>
                {t("driver.notificationSettings.soundHapticsDesc")}
              </Text>
            </View>
            <Switch
              value={preferences.soundHaptics}
              onValueChange={(val) => updatePreferences({ soundHaptics: val })}
              trackColor={{ false: "#1C2A23", true: "#BAFF42" }}
              thumbColor={preferences.soundHaptics ? "#0B0F0E" : "#8E9E99"}
            />
          </View>
        </View>
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
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: spacing[2],
    marginBottom: spacing[2],
  },
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
    overflow: "hidden",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing[4],
    gap: spacing[3],
  },
  toggleTextCol: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  toggleDesc: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#1C2A23",
    marginLeft: spacing[4],
  },
});
