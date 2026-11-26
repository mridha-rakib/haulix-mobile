import { radius, spacing } from "@haulix/design-tokens";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../../src/i18n";

export default function MessagesScreen() {
  const { t } = useDriverTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("driver.tabs.messages")}</Text>
        <Text style={styles.headerSub}>Dispatch, Helpers & Customer Channels</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Chat 1: Dispatch */}
        <Pressable style={styles.chatCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>HX</Text>
          </View>
          <View style={styles.chatInfo}>
            <View style={styles.chatTop}>
              <Text style={styles.chatSender}>HAULIX Dispatch · Phoenix East</Text>
              <Text style={styles.chatTime}>10:14 AM</Text>
            </View>
            <Text style={styles.chatPreview} numberOfLines={1}>
              Job #4829 gate code is #4920. Customer requested call upon arrival.
            </Text>
          </View>
        </Pressable>

        {/* Chat 2: Crew Helper */}
        <Pressable style={styles.chatCard}>
          <View style={[styles.avatarCircle, { backgroundColor: "#2A3631" }]}>
            <Text style={[styles.avatarText, { color: "#BAFF42" }]}>MC</Text>
          </View>
          <View style={styles.chatInfo}>
            <View style={styles.chatTop}>
              <Text style={styles.chatSender}>Marcus C. (Crew Helper)</Text>
              <Text style={styles.chatTime}>9:45 AM</Text>
            </View>
            <Text style={styles.chatPreview} numberOfLines={1}>
              I'm at the Camelback pickup site near the main leasing office.
            </Text>
          </View>
        </Pressable>

        {/* Chat 3: Customer */}
        <Pressable style={styles.chatCard}>
          <View style={[styles.avatarCircle, { backgroundColor: "#1F2825" }]}>
            <Text style={styles.avatarText}>SM</Text>
          </View>
          <View style={styles.chatInfo}>
            <View style={styles.chatTop}>
              <Text style={styles.chatSender}>Sarah M. (Customer)</Text>
              <Text style={styles.chatTime}>Yesterday</Text>
            </View>
            <Text style={styles.chatPreview} numberOfLines={1}>
              Thank you so much for the careful handling of our piano!
            </Text>
          </View>
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
  chatCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#2B3532",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2.5],
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1E2523",
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[3],
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#F6F8F6",
  },
  chatInfo: {
    flex: 1,
  },
  chatTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  chatSender: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
  },
  chatTime: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#8E9E99",
  },
  chatPreview: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
  },
});
