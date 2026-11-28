import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";
import {
  FileTextIcon,
  MessageSquareIcon,
  PhoneIcon,
  ShieldIcon,
} from "../../src/components/icons/DriverIcons";
import { CallPreviewOverlay } from "../../src/components/overlays/CallPreviewOverlay";
import { EmergencyContactOverlay } from "../../src/components/overlays/EmergencyContactOverlay";
import { useDriverTranslation } from "../../src/i18n";
import { useActiveJobStore } from "../../src/stores/activeJobStore";

export default function ActiveJobScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { isDriverArrived, confirmDriverArrival, setCallModalOpen } = useActiveJobStore();
  const [emergencyVisible, setEmergencyVisible] = useState(false);

  const handleArrival = () => {
    confirmDriverArrival();
    router.push("/(app)/on-site-progress" as Href);
  };

  const handleOpenMessages = () => {
    router.push("/(app)/job-messages" as Href);
  };

  const handleOpenCallModal = () => {
    setCallModalOpen(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header with Title and En Route Badge */}
        <View style={styles.header}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>{t("driver.activeJob.title")}</Text>
            <Text style={styles.subtitle}>{t("driver.activeJob.subtitle")}</Text>
          </View>
          <View style={styles.headerRightRow}>
            <Pressable
              onPress={() => setEmergencyVisible(true)}
              style={styles.emergencyShieldBtn}
              accessibilityRole="button"
              accessibilityLabel="Emergency assistance"
            >
              <ShieldIcon color="#EF4444" size={20} />
            </Pressable>
            <View style={styles.badgeWrap}>
              <Text style={styles.badgeText}>{t("driver.activeJob.badgeEnRoute")}</Text>
            </View>
          </View>
        </View>

        {/* Map Placeholder Graphic */}
        <View style={styles.mapContainer}>
          <Svg width="100%" height="100%" viewBox="0 0 360 170" fill="none">
            {/* Grid overlay lines */}
            <Line x1="0" y1="40" x2="360" y2="40" stroke="#1D2522" strokeWidth="1" />
            <Line x1="0" y1="85" x2="360" y2="85" stroke="#1D2522" strokeWidth="1" />
            <Line x1="0" y1="130" x2="360" y2="130" stroke="#1D2522" strokeWidth="1" />
            <Line x1="90" y1="0" x2="90" y2="170" stroke="#1D2522" strokeWidth="1" />
            <Line x1="180" y1="0" x2="180" y2="170" stroke="#1D2522" strokeWidth="1" />
            <Line x1="270" y1="0" x2="270" y2="170" stroke="#1D2522" strokeWidth="1" />

            {/* Simulated S-Curve Transit Route Line */}
            <Path
              d="M 50 140 C 90 140, 90 60, 170 60 C 230 60, 240 40, 290 40"
              stroke="#BAFF42"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Origin Pin (Outer ring + dot) */}
            <Circle cx="50" cy="140" r="10" stroke="#BAFF42" strokeWidth="2.5" fill="#0D1111" />
            <Circle cx="50" cy="140" r="4" fill="#BAFF42" />

            {/* Waypoint Destination Pin */}
            <Circle cx="290" cy="40" r="6" fill="#BAFF42" />
          </Svg>

          <View style={styles.mapGridOverlay}>
            <View style={styles.mapTopChip}>
              <Text style={styles.mapTopChipText}>{t("driver.activeJob.mapRouteHeader")}</Text>
            </View>
            <View style={styles.mapBottomChip}>
              <Text style={styles.mapBottomChipText}>{t("driver.activeJob.mapRouteFooter")}</Text>
            </View>
          </View>
        </View>

        {/* Transit Stepper Progress Card */}
        <View style={styles.transitCard}>
          <Text style={styles.transitTitle}>{t("driver.activeJob.transitCardTitle")}</Text>
          <Text style={styles.transitSteps}>{t("driver.activeJob.stepperSteps")}</Text>

          {/* Stepper Progress Bar */}
          <View style={styles.stepperBarContainer}>
            <View style={[styles.stepperSegment, styles.stepperSegmentActive]} />
            <View
              style={[
                styles.stepperSegment,
                isDriverArrived ? styles.stepperSegmentActive : styles.stepperSegmentInactive,
              ]}
            />
            <View style={[styles.stepperSegment, styles.stepperSegmentInactive]} />
            <View style={[styles.stepperSegment, styles.stepperSegmentInactive]} />
          </View>

          <View style={styles.addressRow}>
            <Text style={styles.addressPinIcon}>📍</Text>
            <Text style={styles.addressText}>{t("driver.activeJob.addressDemo")}</Text>
          </View>
        </View>

        {/* Quick Actions Card (Call, Message, Proof side-by-side) */}
        <View style={styles.actionsCard}>
          <Pressable
            onPress={handleOpenCallModal}
            style={({ pressed }) => [styles.actionItem, pressed && styles.actionItemPressed]}
            accessibilityRole="button"
            accessibilityLabel="Call"
          >
            <PhoneIcon size={18} color="#BAFF42" />
            <Text style={styles.actionText}>{t("driver.activeJob.actionCall")}</Text>
          </Pressable>

          <Pressable
            onPress={handleOpenMessages}
            style={({ pressed }) => [styles.actionItem, pressed && styles.actionItemPressed]}
            accessibilityRole="button"
            accessibilityLabel="Message"
          >
            <MessageSquareIcon size={18} color="#BAFF42" />
            <Text style={styles.actionText}>{t("driver.activeJob.actionMessage")}</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.actionItem, pressed && styles.actionItemPressed]}
            accessibilityRole="button"
            accessibilityLabel="Proof"
          >
            <FileTextIcon size={18} color="#BAFF42" />
            <Text style={styles.actionText}>{t("driver.activeJob.actionProof")}</Text>
          </Pressable>
        </View>

        {/* Arrival CTA & Message Customer Button */}
        <View style={styles.ctaContainer}>
          <Pressable
            onPress={handleArrival}
            disabled={isDriverArrived}
            style={{
              backgroundColor: isDriverArrived ? "#95D92A" : "#BAFF42",
              borderRadius: 16,
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.activeJob.arrivedCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                fontSize: 14,
                color: "#080B0B",
                letterSpacing: 0.3,
              }}
            >
              {isDriverArrived ? "Arrival confirmed · On site" : t("driver.activeJob.arrivedCta")}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleOpenMessages}
            style={{
              backgroundColor: "#131917",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#232C28",
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
            accessibilityRole="button"
            accessibilityLabel={t("driver.activeJob.messageCustomerCta")}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
                color: "#F6F8F6",
              }}
            >
              {t("driver.activeJob.messageCustomerCta")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Call Preview Overlay (OV-06) */}
      <CallPreviewOverlay />

      {/* Emergency Assistance Overlay (OV-04) */}
      <EmergencyContactOverlay
        visible={emergencyVisible}
        onClose={() => setEmergencyVisible(false)}
      />
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
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#F6F8F6",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
    marginTop: 2,
  },
  headerRightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  emergencyShieldBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeWrap: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginLeft: spacing[2],
  },
  badgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#080B0B",
    letterSpacing: 0.5,
  },
  mapContainer: {
    height: 170,
    backgroundColor: "#131917",
    borderRadius: radius["2xl"],
    borderWidth: 1,
    borderColor: "#232C28",
    overflow: "hidden",
    position: "relative",
    marginBottom: spacing[3],
  },
  mapGridOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: spacing[2],
  },
  mapTopChip: {
    alignSelf: "flex-start",
  },
  mapTopChipText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#F6F8F6",
    letterSpacing: 0.5,
  },
  mapBottomChip: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(8, 11, 11, 0.75)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  mapBottomChipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: "#ADB8B0",
    letterSpacing: 0.5,
  },
  transitCard: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "#232C28",
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  transitTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#F6F8F6",
  },
  transitSteps: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 4,
    marginBottom: spacing[2],
  },
  stepperBarContainer: {
    flexDirection: "row",
    gap: 6,
    marginVertical: spacing[1],
  },
  stepperSegment: {
    flex: 1,
    height: 3,
    borderRadius: radius.full,
  },
  stepperSegmentActive: {
    backgroundColor: "#BAFF42",
  },
  stepperSegmentInactive: {
    backgroundColor: "#222B27",
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing[2],
  },
  addressPinIcon: {
    fontSize: 14,
  },
  addressText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
  },
  actionsCard: {
    backgroundColor: "#131917",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "#232C28",
    paddingVertical: 12,
    paddingHorizontal: spacing[3],
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionItemPressed: {
    opacity: 0.7,
  },
  actionText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
  },
  ctaContainer: {
    gap: spacing[2],
  },
  arrivalBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  arrivalBtnPressed: {
    opacity: 0.85,
  },
  arrivalBtnArrived: {
    backgroundColor: "#95D92A",
  },
  arrivalBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#080B0B",
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    backgroundColor: "#131917",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#232C28",
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
    color: "#F6F8F6",
  },
});
