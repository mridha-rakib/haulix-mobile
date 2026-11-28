import { spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlertTriangleIcon,
  ChevronLeftIcon,
  PackageCubeIcon,
} from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";

export default function ExtraWorkDeclinedScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();

  const handleBack = () => {
    router.push("/(app)/extra-work-pending" as Href);
  };

  const handleBackToOriginal = () => {
    router.push("/(app)/on-site-progress" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ChevronLeftIcon size={24} color="#F6F8F6" />
          </Pressable>
          <Text style={styles.title}>{t("driver.extraWorkDeclined.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.extraWorkDeclined.subtitle")}</Text>
        </View>

        {/* Card 1: Declined · Example State */}
        <View style={styles.cardLarge}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconWrap}>
              <AlertTriangleIcon size={22} color="#FF5C5C" />
            </View>
            <Text style={styles.cardTitle}>{t("driver.extraWorkDeclined.declinedTitle")}</Text>
          </View>
          <Text style={styles.cardDesc}>{t("driver.extraWorkDeclined.declinedDesc")}</Text>
        </View>

        {/* Card 2: Original Job Scope */}
        <View style={styles.cardLarge}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardIconWrap}>
              <PackageCubeIcon size={22} color="#BAFF42" />
            </View>
            <Text style={styles.cardTitle}>{t("driver.extraWorkDeclined.originalScopeTitle")}</Text>
          </View>
          <Text style={styles.cardDesc}>{t("driver.extraWorkDeclined.originalScopeDesc")}</Text>
        </View>

        <View style={{ height: spacing[4] }} />

        {/* Action Button */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleBackToOriginal}
            style={{
              backgroundColor: "#BAFF42",
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.extraWorkDeclined.backToOriginalCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#080B0B",
                letterSpacing: 0.3,
              }}
            >
              {t("driver.extraWorkDeclined.backToOriginalCta")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* 5-Tab Bar (Figma DW53: Jobs Tab Active) */}
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
    color: "#9EA8A3",
    marginTop: 4,
  },
  cardLarge: {
    backgroundColor: "#131917",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#232D29",
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(186, 255, 66, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  cardTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
    flex: 1,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#A2AEA8",
    lineHeight: 18,
  },
  actionsContainer: {
    marginBottom: spacing[3],
  },
});
