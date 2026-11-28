import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  ShieldIcon,
  WalletIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useNotificationStore } from "../../src/stores/notificationStore";
import { useWalletStore } from "../../src/stores/walletStore";

export default function NotificationsScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { activeRole } = useWalletStore();
  const { getNotificationsForRole, markAsRead, markAllAsRead } = useNotificationStore();

  const [activeFilter, setActiveFilter] = useState<"all" | "jobs" | "payments">("all");
  const isEs = currentLocale === "es";

  const allNotifications = getNotificationsForRole(activeRole);

  const filteredNotifications = allNotifications.filter((item) => {
    if (activeFilter === "jobs") {
      return item.type === "offer" || item.type === "invite";
    }
    if (activeFilter === "payments") {
      return item.type === "payout";
    }
    return true;
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)" as Href);
    }
  };

  const handleItemPress = (id: string, deepLinkHref: string) => {
    markAsRead(id);
    router.push(deepLinkHref as Href);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "payout":
        return <WalletIcon color="#BAFF42" size={18} />;
      case "offer":
      case "invite":
        return <BriefcaseIcon color="#BAFF42" size={18} />;
      case "verification":
        return <ShieldIcon color="#BAFF42" size={18} />;
      default:
        return <BellIcon color="#BAFF42" size={18} />;
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
          <Text style={styles.headerTitle}>{t("driver.notifications.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.notifications.subtitle")}</Text>
        </View>

        <Pressable
          onPress={() => markAllAsRead(activeRole)}
          style={styles.markReadBtn}
          accessibilityRole="button"
          accessibilityLabel={t("driver.notifications.markAllRead")}
        >
          <Text style={styles.markReadBtnText}>{t("driver.notifications.markAllRead")}</Text>
        </Pressable>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <Pressable
          style={[styles.filterChip, activeFilter === "all" && styles.filterChipActive]}
          onPress={() => setActiveFilter("all")}
          accessibilityRole="button"
          accessibilityLabel={t("driver.notifications.filterAll")}
        >
          <Text
            style={[styles.filterChipText, activeFilter === "all" && styles.filterChipTextActive]}
          >
            {t("driver.notifications.filterAll")}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterChip, activeFilter === "jobs" && styles.filterChipActive]}
          onPress={() => setActiveFilter("jobs")}
          accessibilityRole="button"
          accessibilityLabel={t("driver.notifications.filterJobs")}
        >
          <Text
            style={[styles.filterChipText, activeFilter === "jobs" && styles.filterChipTextActive]}
          >
            {t("driver.notifications.filterJobs")}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterChip, activeFilter === "payments" && styles.filterChipActive]}
          onPress={() => setActiveFilter("payments")}
          accessibilityRole="button"
          accessibilityLabel={t("driver.notifications.filterPayments")}
        >
          <Text
            style={[
              styles.filterChipText,
              activeFilter === "payments" && styles.filterChipTextActive,
            ]}
          >
            {t("driver.notifications.filterPayments")}
          </Text>
        </Pressable>
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <BellIcon color="#5C6E66" size={40} />
            <Text style={styles.emptyTitle}>{t("driver.notifications.emptyTitle")}</Text>
            <Text style={styles.emptyDesc}>{t("driver.notifications.emptyDesc")}</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {filteredNotifications.map((item) => {
              const displayTitle = (isEs ? item.titleEs : item.titleEn) || item.title;
              const displayBody = (isEs ? item.bodyEs : item.bodyEn) || item.body;
              const displayTime = (isEs ? item.timestampEs : item.timestampEn) || item.timestamp;

              return (
                <Pressable
                  key={item.id}
                  style={[styles.notifCard, !item.isRead && styles.notifCardUnread]}
                  onPress={() => handleItemPress(item.id, item.deepLinkHref)}
                  accessibilityRole="button"
                  accessibilityLabel={`${displayTitle}, ${displayBody}`}
                >
                  <View style={styles.iconWrap}>{getIconForType(item.type)}</View>

                  <View style={styles.contentCol}>
                    <View style={styles.itemTitleRow}>
                      <Text style={styles.itemTitle}>{displayTitle}</Text>
                      {!item.isRead ? <View style={styles.unreadDot} /> : null}
                    </View>
                    <Text style={styles.itemBody}>{displayBody}</Text>
                    <Text style={styles.itemTime}>{displayTime}</Text>
                  </View>

                  <ChevronRightIcon color="#8E9E99" size={16} />
                </Pressable>
              );
            })}
          </View>
        )}
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
  markReadBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  markReadBtnText: {
    fontSize: 12,
    color: "#BAFF42",
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: spacing[4],
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
    backgroundColor: "#111815",
    borderWidth: 1,
    borderColor: "#22332B",
  },
  filterChipActive: {
    backgroundColor: "#BAFF42",
    borderColor: "#BAFF42",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
  },
  filterChipTextActive: {
    color: "#0B0F0E",
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing[12],
    gap: spacing[2],
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: spacing[2],
  },
  emptyDesc: {
    fontSize: 13,
    color: "#8E9E99",
    textAlign: "center",
    maxWidth: 240,
  },
  listContainer: {
    gap: spacing[2],
  },
  notifCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111815",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22332B",
    gap: spacing[3],
  },
  notifCardUnread: {
    backgroundColor: "#142019",
    borderColor: "#243B2E",
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: "#16201B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  contentCol: {
    flex: 1,
  },
  itemTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#BAFF42",
  },
  itemBody: {
    fontSize: 12,
    color: "#D0D9D5",
    marginTop: 2,
    lineHeight: 16,
  },
  itemTime: {
    fontSize: 11,
    color: "#8E9E99",
    marginTop: 4,
  },
});
