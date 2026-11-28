import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShieldIcon } from "../../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../../src/i18n";
import { useDriverAuthStore } from "../../../src/stores/authStore";

export default function ProfileScreen() {
  const router = useRouter();
  const { t, currentLocale, toggleLanguage } = useDriverTranslation();
  const { role, setRole, currentUser, logout } = useDriverAuthStore();

  const isDriver = role === "PRIMARY_DRIVER";

  const handleToggleRole = () => {
    setRole(isDriver ? "HELPER" : "PRIMARY_DRIVER");
  };

  const handleSignOut = () => {
    logout();
    router.replace("/(auth)/welcome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("driver.tabs.profile")}</Text>
        <Text style={styles.headerSub}>Worker Account & Compliance</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>
              {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : "DR"}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{currentUser?.name || "Marcus Vance"}</Text>
            <Text style={styles.userContact}>
              {currentUser?.email || "marcus.vance@example.com"}
            </Text>
            <View style={styles.roleTag}>
              <Text style={styles.roleTagText}>{isDriver ? "PRIMARY DRIVER" : "CREW HELPER"}</Text>
            </View>
          </View>
        </View>

        {/* Verification & Compliance Status */}
        <Text style={styles.sectionHeader}>Verification & Compliance</Text>
        <View style={styles.complianceCard}>
          <View style={styles.complianceRow}>
            <ShieldIcon size={16} color="#BAFF42" />
            <Text style={styles.complianceText}>Identity & Background Check: Approved</Text>
          </View>
          <View style={styles.complianceRow}>
            <ShieldIcon size={16} color="#BAFF42" />
            <Text style={styles.complianceText}>
              {isDriver
                ? "CDL / Class D Driver License: Verified"
                : "Independent Helper Agreement: Active"}
            </Text>
          </View>
          <View style={styles.complianceRow}>
            <ShieldIcon size={16} color="#BAFF42" />
            <Text style={styles.complianceText}>
              Commercial Insurance Policy: Active ($1,000,000)
            </Text>
          </View>

          <View style={styles.complianceActions}>
            <Pressable
              onPress={() => router.push(isDriver ? "/(app)/vehicle-docs" : "/(app)/helper-docs")}
              style={({ pressed }) => [styles.actionLink, pressed && styles.actionLinkPressed]}
            >
              <Text style={styles.actionLinkText}>
                {isDriver
                  ? "Manage Documents & Vehicle (DW38) →"
                  : "Manage Helper Documents (DW56) →"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(app)/availability-settings")}
              style={({ pressed }) => [styles.actionLink, pressed && styles.actionLinkPressed]}
            >
              <Text style={styles.actionLinkTextSecondary}>
                Availability & Shift Settings (DW39) →
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(auth)/verification-status")}
              style={({ pressed }) => [styles.actionLink, pressed && styles.actionLinkPressed]}
            >
              <Text style={styles.actionLinkTextSecondary}>View Verification Status (DW08) →</Text>
            </Pressable>
          </View>
        </View>

        {/* Demo Controls Section */}
        <Text style={styles.sectionHeader}>Demo Testing Controls</Text>
        <View style={styles.demoBox}>
          <Pressable
            onPress={handleToggleRole}
            style={({ pressed }) => [styles.demoBtn, pressed && styles.demoBtnPressed]}
          >
            <Text style={styles.demoBtnText}>
              Toggle Role Mode: Currently {isDriver ? "Driver" : "Helper"}
            </Text>
          </Pressable>

          <Pressable
            onPress={toggleLanguage}
            style={({ pressed }) => [styles.demoBtn, pressed && styles.demoBtnPressed]}
          >
            <Text style={styles.demoBtnText}>
              Change Language: {currentLocale === "en" ? "English → Español" : "Español → English"}
            </Text>
          </Pressable>
        </View>

        {/* Sign Out CTA */}
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [styles.signOutBtn, pressed && styles.signOutBtnPressed]}
        >
          <Text style={styles.signOutText}>Sign Out of HAULIX</Text>
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
  header: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#F6F8F6",
  },
  headerSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  userCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#2B3532",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[4],
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#1E2523",
    borderWidth: 1,
    borderColor: "#BAFF42",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[3],
  },
  userAvatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#BAFF42",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
  },
  userContact: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
    marginBottom: 4,
  },
  roleTag: {
    backgroundColor: "#1E2523",
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.sm,
    alignSelf: "flex-start",
  },
  roleTagText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  sectionHeader: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#ADB8B0",
    marginBottom: spacing[2.5],
    marginTop: spacing[2],
  },
  complianceCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#2B3532",
    gap: spacing[2.5],
    marginBottom: spacing[4],
  },
  complianceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  complianceActions: {
    marginTop: spacing[3],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderTopColor: "#202826",
    gap: spacing[2],
  },
  actionLink: {
    backgroundColor: "#202826",
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
    alignItems: "center",
  },
  actionLinkPressed: {
    opacity: 0.8,
  },
  actionLinkText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#BAFF42",
  },
  actionLinkTextSecondary: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#ADB8B0",
    textAlign: "center",
  },
  complianceText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#F6F8F6",
    flex: 1,
  },
  demoBox: {
    backgroundColor: "#151A19",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#2B3532",
    gap: spacing[2],
    marginBottom: spacing[6],
  },
  demoBtn: {
    backgroundColor: "#1E2523",
    borderRadius: radius.md,
    paddingVertical: spacing[2.5],
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  demoBtnPressed: {
    borderColor: "#BAFF42",
  },
  demoBtnText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#BAFF42",
  },
  signOutBtn: {
    backgroundColor: "#201616",
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4A2B2B",
  },
  signOutBtnPressed: {
    backgroundColor: "#2E1C1C",
  },
  signOutText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#FF6B6B",
  },
});
