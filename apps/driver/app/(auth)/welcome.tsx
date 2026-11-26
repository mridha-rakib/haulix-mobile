import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import {
  WelcomeCalendarIcon,
  WelcomeCoinsIcon,
  WelcomeTruckIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";

const HERO_IMG = require("../../assets/welcome/hero-worker-truck.png");
const HAULIX_MARK = require("../../assets/branding/haulix-h-mark.png");

export default function WelcomeScreen() {
  const router = useRouter();
  const { t, toggleLanguage } = useDriverTranslation();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {/* Upper-left diagonal lime flare decoration matching Figma */}
      <Svg width={180} height={140} style={styles.topGlow} viewBox="0 0 180 140" fill="none">
        <Defs>
          <LinearGradient id="limeGlow" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#BAFF42" stopOpacity="0.75" />
            <Stop offset="0.3" stopColor="#4A8818" stopOpacity="0.4" />
            <Stop offset="0.7" stopColor="#152B10" stopOpacity="0.1" />
            <Stop offset="1" stopColor="#080B0B" stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="glowBorder" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#BAFF42" stopOpacity="0.65" />
            <Stop offset="0.5" stopColor="#55991A" stopOpacity="0.25" />
            <Stop offset="1" stopColor="#152B10" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path d="M0 0 L180 0 Q95 55 0 140 Z" fill="url(#limeGlow)" />
        <Path d="M180 0 Q95 55 0 140" stroke="url(#glowBorder)" strokeWidth="1.2" fill="none" />
      </Svg>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Centered HAULIX Brand Logo (Figma 1085:3 / 1088:3) */}
        <View style={styles.brandRow}>
          <Image source={HAULIX_MARK} style={styles.brandMark} resizeMode="contain" />
          <Text style={styles.brandText}>HAULIX</Text>
        </View>

        {/* Headline & Mission Description (Placed Above Benefit Cards) */}
        <View style={styles.headlineBlock}>
          <Text style={styles.mainHeadline}>{t("driver.welcome.headline")}</Text>
          <Text style={styles.subHeadline}>{t("driver.welcome.subtitle")}</Text>
        </View>

        {/* 3 Figma Benefit Cards */}
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <WelcomeTruckIcon size={22} color="#BAFF42" />
            <Text style={styles.cardTitle}>{t("driver.welcome.card1Title")}</Text>
            <Text style={styles.cardSubtitle}>{t("driver.welcome.card1Subtitle")}</Text>
          </View>

          <View style={styles.card}>
            <WelcomeCoinsIcon size={22} color="#BAFF42" />
            <Text style={styles.cardTitle}>{t("driver.welcome.card2Title")}</Text>
            <Text style={styles.cardSubtitle}>{t("driver.welcome.card2Subtitle")}</Text>
          </View>

          <View style={styles.card}>
            <WelcomeCalendarIcon size={22} color="#BAFF42" />
            <Text style={styles.cardTitle}>{t("driver.welcome.card3Title")}</Text>
            <Text style={styles.cardSubtitle}>{t("driver.welcome.card3Subtitle")}</Text>
          </View>
        </View>

        {/* Full-width Hero Visual placed directly below cards */}
        <View style={styles.heroContainer}>
          <Image source={HERO_IMG} style={styles.heroImage} resizeMode="cover" />
        </View>

        {/* 4 Carousel Dots (1 Active Lime Pill + 3 Inactive Grey Dots) */}
        <View style={styles.carouselRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Primary & Secondary Pill Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            onPress={() => router.push("/(auth)/register")}
            accessibilityRole="button"
            accessibilityLabel={t("driver.welcome.getStarted")}
            style={{ width: "100%" }}
          >
            <View style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>{t("driver.welcome.getStarted")}</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push("/(auth)/sign-in")}
            accessibilityRole="button"
            accessibilityLabel={t("driver.welcome.signIn")}
            style={{ width: "100%" }}
          >
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>{t("driver.welcome.signIn")}</Text>
            </View>
          </Pressable>
        </View>

        {/* Footer with language switch and platform indicator */}
        <Pressable
          onPress={toggleLanguage}
          style={styles.footerWrap}
          accessibilityRole="button"
          accessibilityLabel="Toggle Language"
        >
          <Text style={styles.footerText}>{t("driver.welcome.languageToggle")}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
    position: "relative",
  },
  topGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    alignItems: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12,
    zIndex: 1,
  },
  brandMark: {
    width: 24,
    height: 24.5,
    tintColor: "#BAFF42",
  },
  brandText: {
    fontFamily: "Inter_700Bold",
    fontSize: 21,
    letterSpacing: 2,
    color: "#FFFFFF",
    marginLeft: 7,
  },
  headlineBlock: {
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
    zIndex: 1,
  },
  mainHeadline: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    lineHeight: 31,
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subHeadline: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#9CA8A2",
    textAlign: "center",
    maxWidth: 310,
  },
  cardsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
    width: "100%",
    zIndex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#131917",
    borderWidth: 1,
    borderColor: "#232C28",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 5,
    textAlign: "center",
  },
  cardSubtitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 1,
    textAlign: "center",
  },
  heroContainer: {
    width: "100%",
    height: 190,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  carouselRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
    marginBottom: 12,
    zIndex: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#35403B",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#BAFF42",
  },
  actionContainer: {
    width: "100%",
    zIndex: 1,
  },
  primaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    backgroundColor: "#BAFF42",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  primaryPressed: {
    backgroundColor: "#A8EB35",
  },
  primaryButtonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#080B0B",
  },
  secondaryButton: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    backgroundColor: "#0D1110",
    borderWidth: 1.5,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  secondaryPressed: {
    borderColor: "#BAFF42",
    backgroundColor: "#161D1A",
  },
  secondaryButtonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  footerWrap: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: "#687771",
    textAlign: "center",
  },
});
