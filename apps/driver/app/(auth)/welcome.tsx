import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClockIcon, ShieldIcon, TruckIcon } from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { useDriverTranslation } from "../../src/i18n";

const HERO_IMG = require("../../assets/welcome/hero-worker-truck.png");

export default function WelcomeScreen() {
  const router = useRouter();
  const { t, currentLocale, toggleLanguage } = useDriverTranslation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header Bar with Logo and Language Toggle */}
        <View style={styles.topHeader}>
          <View style={styles.logoRow}>
            <Text style={styles.brandLogo}>HAULIX</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO</Text>
            </View>
          </View>
          <Pressable
            onPress={toggleLanguage}
            style={({ pressed }) => [styles.langToggle, pressed && styles.langTogglePressed]}
          >
            <Text style={styles.langToggleText}>
              {currentLocale === "en" ? "ESPAÑOL" : "ENGLISH"}
            </Text>
          </Pressable>
        </View>

        {/* Hero Visual Banner matching Figma 1085:3 / 1088:3 */}
        <View style={styles.heroContainer}>
          <Image source={HERO_IMG} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>
              {currentLocale === "en"
                ? "ARIZONA DRIVER & HELPER CREW"
                : "EQUIPO DE CONDUCTORES Y AYUDANTES"}
            </Text>
          </View>
        </View>

        {/* Headline & Mission Subtitle */}
        <View style={styles.headlineBlock}>
          <Text style={styles.mainHeadline}>{t("driver.welcome.headline")}</Text>
          <Text style={styles.subHeadline}>{t("driver.welcome.subtitle")}</Text>
        </View>

        {/* 3 Figma Benefit Cards */}
        <View style={styles.cardsRow}>
          <View style={styles.card}>
            <View style={styles.cardIconWrap}>
              <TruckIcon size={20} color="#BAFF42" />
            </View>
            <Text style={styles.cardTitle}>{t("driver.welcome.card1Title")}</Text>
            <Text style={styles.cardSubtitle}>{t("driver.welcome.card1Subtitle")}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardIconWrap}>
              <ShieldIcon size={20} color="#BAFF42" />
            </View>
            <Text style={styles.cardTitle}>{t("driver.welcome.card2Title")}</Text>
            <Text style={styles.cardSubtitle}>{t("driver.welcome.card2Subtitle")}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardIconWrap}>
              <ClockIcon size={20} color="#BAFF42" />
            </View>
            <Text style={styles.cardTitle}>{t("driver.welcome.card3Title")}</Text>
            <Text style={styles.cardSubtitle}>{t("driver.welcome.card3Subtitle")}</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionContainer}>
          <ActionCtaButton
            label={t("driver.welcome.getStarted")}
            onPress={() => router.push("/(auth)/register")}
            variant="primary"
            size="large"
          />
          <View style={{ height: spacing[3] }} />
          <ActionCtaButton
            label={t("driver.welcome.signIn")}
            onPress={() => router.push("/(auth)/sign-in")}
            variant="outline"
            size="large"
          />
        </View>

        {/* Platform footer indicator */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>{t("driver.welcome.languageToggle")}</Text>
        </View>
      </ScrollView>
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
    paddingBottom: spacing[8],
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  brandLogo: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    letterSpacing: 2,
    color: "#BAFF42",
  },
  proBadge: {
    backgroundColor: "#1E2523",
    borderWidth: 1,
    borderColor: "#35403B",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  proBadgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#F6F8F6",
    letterSpacing: 1,
  },
  langToggle: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.full,
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  langTogglePressed: {
    borderColor: "#BAFF42",
    backgroundColor: "#1E2523",
  },
  langToggleText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  heroContainer: {
    width: "100%",
    height: 190,
    borderRadius: radius.xl,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#2B3532",
    marginBottom: spacing[4],
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(8, 11, 11, 0.35)",
  },
  heroTag: {
    position: "absolute",
    bottom: spacing[3],
    left: spacing[3],
    backgroundColor: "rgba(10, 15, 13, 0.85)",
    paddingHorizontal: spacing[2.5],
    paddingVertical: spacing[1],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.3)",
  },
  heroTagText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  headlineBlock: {
    marginBottom: spacing[4],
  },
  mainHeadline: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    lineHeight: 34,
    color: "#F6F8F6",
    marginBottom: spacing[2],
  },
  subHeadline: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    lineHeight: 20,
    color: "#ADB8B0",
  },
  cardsRow: {
    flexDirection: "row",
    gap: spacing[2],
    marginBottom: spacing[6],
  },
  card: {
    flex: 1,
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#2B3532",
    borderRadius: radius.lg,
    padding: spacing[3],
    alignItems: "center",
  },
  cardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "#1F2825",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[2],
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#F6F8F6",
    textAlign: "center",
  },
  cardSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#8E9E99",
    textAlign: "center",
    marginTop: 2,
  },
  actionContainer: {
    marginBottom: spacing[4],
  },
  footerInfo: {
    alignItems: "center",
    paddingVertical: spacing[2],
  },
  footerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#687771",
  },
});
