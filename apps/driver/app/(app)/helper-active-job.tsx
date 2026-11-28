import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import { useActiveJobStore } from "../../src/stores/activeJobStore";

export default function HelperActiveJobScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { isHelperArrived, confirmHelperArrival } = useActiveJobStore();

  const handleArrival = () => {
    confirmHelperArrival();
    router.push("/(app)/helper-on-site-progress" as Href);
  };

  const isEs = currentLocale === "es";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.push("/(app)/(tabs)" as Href)}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ChevronLeftIcon size={24} color="#F6F8F6" />
          </Pressable>
          <Text style={styles.title}>{t("driver.helperActiveJob.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.helperActiveJob.subtitle")}</Text>
        </View>

        {/* Card 1: Helper assigned · Demo */}
        <View style={styles.card}>
          <Text style={styles.limeTitle}>{t("driver.helperActiveJob.assignedTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.helperActiveJob.assignedSubtitle")}</Text>
        </View>

        {/* Card 2: Job HX-AZ-DEMO-0042 */}
        <View style={styles.card}>
          <Text style={styles.whiteTitle}>{t("driver.helperActiveJob.jobCardTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.helperActiveJob.jobCardSubtitle")}</Text>
        </View>

        {/* Card 3: My crew */}
        <View style={styles.card}>
          <Text style={styles.whiteTitle}>{t("driver.helperActiveJob.crewCardTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.helperActiveJob.crewCardSubtitle")}</Text>
        </View>

        {/* Card 4: Work location */}
        <View style={styles.card}>
          <Text style={styles.whiteTitle}>{t("driver.helperActiveJob.locationCardTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.helperActiveJob.locationCardSubtitle")}</Text>
        </View>

        {/* Card 5: Your own status */}
        <View style={styles.card}>
          <Text style={styles.whiteTitle}>{t("driver.helperActiveJob.statusCardTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.helperActiveJob.statusCardSubtitle")}</Text>
        </View>

        {/* Primary Action Button (Immediately below card 5) */}
        <Pressable
          onPress={handleArrival}
          disabled={isHelperArrived}
          style={{
            backgroundColor: isHelperArrived ? "#95D92A" : "#BAFF42",
            borderRadius: 16,
            paddingVertical: 14,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
          }}
          accessibilityRole="button"
          accessibilityLabel={t("driver.helperActiveJob.confirmArrivalCta")}
        >
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 14,
              color: "#080B0B",
              letterSpacing: 0.3,
            }}
          >
            {isHelperArrived
              ? isEs
                ? "Llegada confirmada · En el sitio"
                : "Arrival confirmed · On site"
              : t("driver.helperActiveJob.confirmArrivalCta")}
          </Text>
        </Pressable>
      </ScrollView>

      {/* 5-Tab Bar (Figma DW62: Active Jobs) */}
      <DriverBottomNav activeTab="jobs" />
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
    paddingBottom: spacing[4],
  },
  header: {
    marginBottom: spacing[3],
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
    padding: spacing[3],
    marginBottom: spacing[2],
  },
  limeTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#BAFF42",
    marginBottom: 4,
  },
  whiteTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#F6F8F6",
    marginBottom: 4,
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
  primaryBtnArrived: {
    backgroundColor: "#95D92A",
  },
  primaryBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#080B0B",
    letterSpacing: 0.3,
  },
});
