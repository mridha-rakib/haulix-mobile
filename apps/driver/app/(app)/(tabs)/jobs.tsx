import { radius, spacing } from "@haulix/design-tokens";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TruckIcon } from "../../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../../src/i18n";
import { useDriverAuthStore } from "../../../src/stores/authStore";

export default function JobsScreen() {
  const { t } = useDriverTranslation();
  const { role } = useDriverAuthStore();
  const [filter, setFilter] = useState<"available" | "active">("available");

  const isDriver = role === "PRIMARY_DRIVER";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("driver.tabs.jobs")}</Text>
        <Text style={styles.headerSub}>
          {isDriver ? "Driver Dispatches & Offers" : "Crew Helper Invitations"}
        </Text>
      </View>

      {/* Segmented Filter */}
      <View style={styles.filterRow}>
        <Pressable
          onPress={() => setFilter("available")}
          style={[styles.filterTab, filter === "available" && styles.filterTabActive]}
        >
          <Text style={[styles.filterText, filter === "available" && styles.filterTextActive]}>
            Available (4)
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFilter("active")}
          style={[styles.filterTab, filter === "active" && styles.filterTabActive]}
        >
          <Text style={[styles.filterText, filter === "active" && styles.filterTextActive]}>
            Active / Scheduled (1)
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filter === "available" ? (
          <>
            {/* Job Offer 1 */}
            <View style={styles.jobCard}>
              <View style={styles.cardHeader}>
                <View style={styles.typeWrap}>
                  <TruckIcon size={16} color="#BAFF42" />
                  <Text style={styles.typeText}>26ft Box Truck Full Move</Text>
                </View>
                <Text style={styles.payoutText}>$340.00</Text>
              </View>

              <Text style={styles.addressText}>
                📍 3200 E Lincoln Dr, Phoenix → 9245 E Shea Blvd, Scottsdale
              </Text>
              <Text style={styles.distText}>16.4 miles · Est. 3.5 hrs</Text>

              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>2 Helpers Required</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>Liftgate Recommended</Text>
                </View>
              </View>

              <Pressable style={styles.acceptBtn}>
                <Text style={styles.acceptBtnText}>Accept Job Offer</Text>
              </Pressable>
            </View>

            {/* Job Offer 2 */}
            <View style={styles.jobCard}>
              <View style={styles.cardHeader}>
                <View style={styles.typeWrap}>
                  <TruckIcon size={16} color="#BAFF42" />
                  <Text style={styles.typeText}>Cargo Van Delivery</Text>
                </View>
                <Text style={styles.payoutText}>$165.00</Text>
              </View>

              <Text style={styles.addressText}>
                📍 100 W Washington St, Phoenix → 420 S Mill Ave, Tempe
              </Text>
              <Text style={styles.distText}>8.8 miles · Est. 1.5 hrs</Text>

              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>Single Item (Sofa)</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>1 Helper Assigned</Text>
                </View>
              </View>

              <Pressable style={styles.acceptBtn}>
                <Text style={styles.acceptBtnText}>Accept Job Offer</Text>
              </Pressable>
            </View>
          </>
        ) : (
          <View style={styles.jobCard}>
            <View style={styles.cardHeader}>
              <View style={styles.typeWrap}>
                <TruckIcon size={16} color="#BAFF42" />
                <Text style={styles.typeText}>Active Dispatch #4829</Text>
              </View>
              <View style={styles.inProgressBadge}>
                <Text style={styles.inProgressText}>IN PROGRESS</Text>
              </View>
            </View>

            <Text style={styles.addressText}>
              📍 4820 E Camelback Rd, Phoenix → 7134 N Scottsdale Rd
            </Text>
            <Text style={styles.distText}>Pickup in 45 mins · Payout $280.00</Text>

            <Pressable style={styles.acceptBtn}>
              <Text style={styles.acceptBtnText}>Open Turn-by-Turn GPS</Text>
            </Pressable>
          </View>
        )}
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
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: spacing[4],
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#2B3532",
    alignItems: "center",
  },
  filterTabActive: {
    backgroundColor: "#1E2523",
    borderColor: "#BAFF42",
  },
  filterText: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#8E9E99",
  },
  filterTextActive: {
    color: "#BAFF42",
    fontFamily: "Inter_600SemiBold",
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
    borderColor: "#2B3532",
    marginBottom: spacing[3],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[2],
  },
  typeWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  typeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
  },
  payoutText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#BAFF42",
  },
  addressText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#F6F8F6",
    lineHeight: 16,
    marginBottom: 4,
  },
  distText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#8E9E99",
    marginBottom: spacing[3],
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  chip: {
    backgroundColor: "#1F2825",
    paddingHorizontal: spacing[2.5],
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  chipText: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: "#ADB8B0",
  },
  acceptBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    alignItems: "center",
  },
  acceptBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#080B0B",
  },
  inProgressBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#BAFF42",
  },
  inProgressText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: "#BAFF42",
  },
});
