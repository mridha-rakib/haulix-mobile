import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { useRouter } from "expo-router";
import type { FC } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NavAccountActiveIcon,
  NavBookPlusIcon,
  NavDealsIcon,
  NavHomeIcon,
  NavMyJobsIcon,
  NavSculptedCurve,
} from "../account/C10Icons";

export type NavTabId = "home" | "jobs" | "book" | "deals" | "account";

const DEALS_NOTICE = "Deals: Concept preview in Figma library. Not an active route.";

interface CustomerBottomNavProps {
  activeTab?: NavTabId;
  onTabPress?: (tab: NavTabId) => void;
  onShowNotice?: (message: string) => void;
}

/**
 * CustomerBottomNav — Original C01 Sculpted Bottom Navbar
 *
 * Source:
 *   - Figma instance: 959:8556
 *   - Library Component: 957:8794
 *   - Reference geometry: 430 × 128 px
 *
 * Invariants:
 * 1. Active tab highlighted in lime (#BAFF42).
 * 2. Center elevated circular Book button with lime circle (#BAFF42) and plus icon.
 * 3. Deals tab is visual-only per Figma documentation.
 * 4. Strictly NOT added to auth screens (C06-C09).
 */
const ROUTE_MAP: Partial<Record<NavTabId, string>> = {
  home: "/(app)",
  account: "/(app)/account",
};

const getUpcomingNotice = (tab: NavTabId, t: (key: string) => string): string | undefined => {
  if (tab === "deals") return t("account.dealsNoticeMessage") || DEALS_NOTICE;
  if (tab === "jobs")
    return t("home.recentJobsNotice") || "My Jobs (W07) is scheduled for an upcoming phase.";
  if (tab === "book")
    return (
      t("home.bookServiceNotice") ||
      "Service Discovery & Booking (C15) is scheduled for an upcoming phase."
    );
  return undefined;
};

export const CustomerBottomNav: FC<CustomerBottomNavProps> = ({
  activeTab = "account",
  onTabPress,
  onShowNotice,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;

  // Base height of the tab bar containing dome, icons and labels
  const BASE_NAV_HEIGHT = 80;
  // Apply bottom inset exactly once for device safe area (e.g. Android 3-button or gesture bar)
  const safeBottom = Math.max(insets.bottom, 0);
  const totalNavHeight = BASE_NAV_HEIGHT + safeBottom;

  const handlePress = (tab: NavTabId) => {
    if (tab === activeTab) return;

    const route = ROUTE_MAP[tab];
    if (route) {
      if (onTabPress) {
        onTabPress(tab);
      } else {
        router.replace(route as never);
      }
      return;
    }

    const notice = getUpcomingNotice(tab, t);
    if (notice) {
      onShowNotice?.(notice);
    }
    onTabPress?.(tab);
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: totalNavHeight,
          paddingBottom: safeBottom,
        },
      ]}
      testID="customer-bottom-nav"
    >
      {/* Sculpted curve background vector spanning edge-to-edge */}
      <View style={styles.curveContainer} pointerEvents="none">
        <NavSculptedCurve width={screenWidth} height={128} />
      </View>

      {/* Interactive Tabs Row */}
      <View style={styles.tabsRow}>
        {/* 1. Home */}
        <Pressable
          style={styles.tabItem}
          onPress={() => handlePress("home")}
          accessibilityRole="tab"
          accessibilityLabel={t("nav.home")}
          accessibilityState={{ selected: activeTab === "home" }}
          hitSlop={8}
          testID="c10-nav-home"
        >
          <NavHomeIcon size={24} color={activeTab === "home" ? colors.brand : "#AAB5AF"} />
          <Text
            style={[styles.tabLabel, activeTab === "home" && styles.tabLabelActive]}
            numberOfLines={1}
          >
            {t("nav.home")}
          </Text>
        </Pressable>

        {/* 2. My Jobs */}
        <Pressable
          style={styles.tabItem}
          onPress={() => handlePress("jobs")}
          accessibilityRole="tab"
          accessibilityLabel={t("nav.myJobs")}
          accessibilityState={{ selected: activeTab === "jobs" }}
          hitSlop={8}
          testID="c10-nav-jobs"
        >
          <NavMyJobsIcon size={24} color={activeTab === "jobs" ? colors.brand : "#AAB5AF"} />
          <Text
            style={[styles.tabLabel, activeTab === "jobs" && styles.tabLabelActive]}
            numberOfLines={1}
          >
            {t("nav.myJobs")}
          </Text>
        </Pressable>

        {/* 3. Center Elevated Book Button */}
        <Pressable
          style={styles.centerTabContainer}
          onPress={() => handlePress("book")}
          accessibilityRole="button"
          accessibilityLabel={t("nav.book")}
          hitSlop={8}
          testID="c10-nav-book"
        >
          <View style={styles.centerButtonCircle}>
            <NavBookPlusIcon size={24} color="#080D0C" />
          </View>
          <Text
            style={[
              styles.tabLabel,
              styles.centerTabLabel,
              activeTab === "book" && styles.tabLabelActive,
            ]}
            numberOfLines={1}
          >
            {t("nav.book")}
          </Text>
        </Pressable>

        {/* 4. Deals (Visual-only per Figma) */}
        <Pressable
          style={styles.tabItem}
          onPress={() => handlePress("deals")}
          accessibilityRole="tab"
          accessibilityLabel={t("nav.deals")}
          accessibilityState={{ selected: activeTab === "deals" }}
          hitSlop={8}
          testID="c10-nav-deals"
        >
          <NavDealsIcon size={24} color={activeTab === "deals" ? colors.brand : "#AAB5AF"} />
          <Text
            style={[styles.tabLabel, activeTab === "deals" && styles.tabLabelActive]}
            numberOfLines={1}
          >
            {t("nav.deals")}
          </Text>
        </Pressable>

        {/* 5. Account (Active Lime) */}
        <Pressable
          style={styles.tabItem}
          onPress={() => handlePress("account")}
          accessibilityRole="tab"
          accessibilityLabel={t("nav.account")}
          accessibilityState={{ selected: activeTab === "account" }}
          hitSlop={8}
          testID="c10-nav-account"
        >
          <NavAccountActiveIcon
            size={24}
            color={activeTab === "account" ? colors.brand : "#AAB5AF"}
          />
          <Text
            style={[styles.tabLabel, activeTab === "account" && styles.tabLabelActive]}
            numberOfLines={1}
          >
            {t("nav.account")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#080D0C",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  curveContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#080D0C",
  },
  tabsRow: {
    height: 80,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 2,
  },
  tabLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#AAB5AF",
    marginTop: 4,
  },
  tabLabelActive: {
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
  },
  centerTabContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 2,
    zIndex: 10,
  },
  centerButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.brand, // #BAFF42
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#080D0C",
    marginBottom: 2,
  },
  centerTabLabel: {
    marginTop: 2,
  },
});
