import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, ChevronRightIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { LocationPermissionOverlay } from "../../src/components/overlays/LocationPermissionOverlay";
import { useDriverTranslation } from "../../src/i18n";
import { useActiveJobStore } from "../../src/stores/activeJobStore";

export default function LocationConnectionScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { setNetworkStatus, setLocationModalOpen, setOriginatingScreen } = useActiveJobStore();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleOpenLocationOverlay = () => {
    setLocationModalOpen(true);
  };

  const handleNetworkRowPress = () => {
    setOriginatingScreen("/(app)/location-connection");
    router.push("/(app)/connection-interrupted" as Href);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setNetworkStatus("CONNECTED");
      setIsRetrying(false);
    }, 600);
  };

  const handleSupport = () => {
    router.push("/(app)/support" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ChevronLeftIcon size={24} color="#F6F8F6" />
          </Pressable>
          <Text style={styles.title}>{t("driver.locationConnection.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.locationConnection.subtitle")}</Text>
        </View>

        {/* Card 1: Connection not verified */}
        <View style={styles.card}>
          <Text style={styles.limeTitle}>{t("driver.locationConnection.unverifiedTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.locationConnection.unverifiedSubtitle")}</Text>
        </View>

        {/* Card 2: Location permission */}
        <Pressable
          onPress={handleOpenLocationOverlay}
          style={styles.cardRow}
          accessibilityRole="button"
          accessibilityLabel="Location permission diagnostic"
        >
          <View style={styles.textWrap}>
            <Text style={styles.whiteTitle}>
              {t("driver.locationConnection.permissionRowTitle")}
            </Text>
            <Text style={styles.cardDesc}>
              {t("driver.locationConnection.permissionRowSubtitle")}
            </Text>
          </View>
          <ChevronRightIcon size={20} color="#BAFF42" />
        </Pressable>

        {/* Card 3: Network status */}
        <Pressable
          onPress={handleNetworkRowPress}
          style={styles.cardRow}
          accessibilityRole="button"
          accessibilityLabel="Network status diagnostic"
        >
          <View style={styles.textWrap}>
            <Text style={styles.whiteTitle}>{t("driver.locationConnection.networkRowTitle")}</Text>
            <Text style={styles.cardDesc}>{t("driver.locationConnection.networkRowSubtitle")}</Text>
          </View>
          <ChevronRightIcon size={20} color="#BAFF42" />
        </Pressable>

        {/* Card 4: Safety control */}
        <View style={styles.card}>
          <Text style={styles.whiteTitle}>{t("driver.locationConnection.safetyTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.locationConnection.safetySubtitle")}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={handleRetry}
            disabled={isRetrying}
            style={{
              backgroundColor: "#BAFF42",
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.locationConnection.retryCta")}
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
                {t("driver.locationConnection.retryCta")}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={handleSupport}
            style={{
              backgroundColor: "#131917",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#BAFF42",
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.locationConnection.supportCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#BAFF42",
              }}
            >
              {t("driver.locationConnection.supportCta")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* 5-Tab Bar (Figma DW50 Profile Domain: Active Profile) */}
      <DriverBottomNav activeTab="profile" />

      {/* Location Permission Supporting Overlay (OV-07) */}
      <LocationPermissionOverlay />
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
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  cardRow: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    padding: spacing[4],
    marginBottom: spacing[3],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardPressed: {
    backgroundColor: "#1A231F",
  },
  textWrap: {
    flex: 1,
    paddingRight: spacing[2],
  },
  limeTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#BAFF42",
    marginBottom: 6,
  },
  whiteTitle: {
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
    marginTop: spacing[1],
  },
  primaryBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.lg,
    paddingVertical: 14,
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
    borderColor: "#BAFF42",
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
    color: "#BAFF42",
  },
});
