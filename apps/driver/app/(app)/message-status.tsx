import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import { useJobMessagesStore } from "../../src/stores/jobMessagesStore";

export default function MessageStatusScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { lastSubmittedMessageId, retryMessage } = useJobMessagesStore();

  const handleReturn = () => {
    if (lastSubmittedMessageId) {
      retryMessage(lastSubmittedMessageId);
    }
    router.push("/(app)/job-messages" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push("/(app)/job-messages" as Href)}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back to messages"
          >
            <ChevronLeftIcon size={24} color="#F6F8F6" />
          </Pressable>
          <Text style={styles.title}>{t("driver.messageStatus.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.messageStatus.subtitle")}</Text>
        </View>

        {/* Submitted Card */}
        <View style={styles.card}>
          <Text style={styles.submittedTitle}>{t("driver.messageStatus.submittedTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.messageStatus.submittedSubtitle")}</Text>
        </View>

        {/* Privacy Card */}
        <View style={styles.card}>
          <Text style={styles.privacyTitle}>{t("driver.messageStatus.privacyTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.messageStatus.privacySubtitle")}</Text>
        </View>

        {/* Primary Action Button (Immediately below cards) */}
        <Pressable
          onPress={handleReturn}
          style={{
            backgroundColor: "#BAFF42",
            borderRadius: 16,
            paddingVertical: 14,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
          }}
          accessibilityRole="button"
          accessibilityLabel={t("driver.messageStatus.returnCta")}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 14,
              color: "#080B0B",
            }}
          >
            {t("driver.messageStatus.returnCta")}
          </Text>
        </Pressable>

        <View style={{ flex: 1 }} />
      </View>

      {/* 5-Tab Bar (Figma RES-D05-01: Active Messages) */}
      <DriverBottomNav activeTab="messages" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
  },
  header: {
    marginBottom: spacing[4],
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
    color: "#ADB8B0",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  submittedTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#BAFF42",
    marginBottom: 6,
  },
  privacyTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#F6F8F6",
    marginBottom: 6,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#8E9E99",
    lineHeight: 18,
  },
  primaryBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing[2],
  },
  primaryBtnPressed: {
    opacity: 0.85,
  },
  primaryBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#080B0B",
    letterSpacing: 0.3,
  },
});
