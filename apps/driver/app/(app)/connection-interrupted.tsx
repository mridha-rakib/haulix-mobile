import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../src/i18n";
import { useActiveJobStore } from "../../src/stores/activeJobStore";

export default function ConnectionInterruptedScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { originatingScreen, setNetworkStatus } = useActiveJobStore();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setNetworkStatus("CONNECTED");
      setIsRetrying(false);
      if (originatingScreen) {
        router.replace(originatingScreen as Href);
      } else {
        router.back();
      }
    }, 600);
  };

  const handleSupport = () => {
    router.push("/(app)/support" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t("driver.connectionInterrupted.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.connectionInterrupted.subtitle")}</Text>
        </View>

        {/* Warning Icon Hero Squircle */}
        <View style={styles.heroWrap}>
          <View style={styles.warningSquircle}>
            <Text style={styles.warningExclamation}>!</Text>
          </View>
        </View>

        {/* Outdated Status Text Section */}
        <View style={styles.outdatedSection}>
          <Text style={styles.outdatedTitle}>
            {t("driver.connectionInterrupted.outdatedTitle")}
          </Text>
          <Text style={styles.outdatedDesc}>{t("driver.connectionInterrupted.outdatedDesc")}</Text>
        </View>

        {/* Recovery & Retry Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("driver.connectionInterrupted.recoveryTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.connectionInterrupted.recoveryDesc")}</Text>
        </View>

        <View style={{ flex: 1 }} />

        {/* Pinned Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleRetry}
            disabled={isRetrying}
            style={{
              backgroundColor: "#BAFF42",
              borderRadius: 16,
              paddingVertical: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.connectionInterrupted.retryCta")}
          >
            {isRetrying ? (
              <ActivityIndicator color="#080B0B" size="small" />
            ) : (
              <Text
                style={{
                  fontFamily: "Inter_700Bold",
                  fontSize: 14,
                  color: "#080B0B",
                }}
              >
                {t("driver.connectionInterrupted.retryCta")}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={handleSupport}
            style={{
              backgroundColor: "#131917",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#232C28",
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.connectionInterrupted.supportCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#F6F8F6",
              }}
            >
              {t("driver.connectionInterrupted.supportCta")}
            </Text>
          </Pressable>
        </View>
      </View>
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
    paddingTop: spacing[3],
    paddingBottom: spacing[4],
  },
  header: {
    marginBottom: spacing[4],
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
  heroWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing[3],
  },
  warningSquircle: {
    width: 120,
    height: 120,
    borderRadius: 32,
    backgroundColor: "#202522",
    alignItems: "center",
    justifyContent: "center",
  },
  warningExclamation: {
    fontFamily: "Inter_700Bold",
    fontSize: 54,
    color: "#FFB020",
  },
  outdatedSection: {
    marginVertical: spacing[3],
  },
  outdatedTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: "#F6F8F6",
    marginBottom: 6,
  },
  outdatedDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
    lineHeight: 18,
  },
  card: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  cardTitle: {
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
  actionsContainer: {
    gap: spacing[2],
  },
  primaryBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.lg,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnPressed: {
    opacity: 0.85,
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#080B0B",
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    backgroundColor: "#131917",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#232C28",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnPressed: {
    backgroundColor: "#1C2420",
  },
  secondaryBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
  },
});
