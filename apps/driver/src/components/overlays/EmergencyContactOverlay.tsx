import { radius, spacing } from "@haulix/design-tokens";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDriverTranslation } from "../../i18n";
import { useWalletStore } from "../../stores/walletStore";
import { useWorkerProfileStore } from "../../stores/workerProfileStore";
import {
  AlertTriangleIcon,
  CheckmarkIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
} from "../icons/DriverIcons";

interface EmergencyContactOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export function EmergencyContactOverlay({ visible, onClose }: EmergencyContactOverlayProps) {
  const { t } = useDriverTranslation();
  const { activeRole } = useWalletStore();
  const { getProfileForRole } = useWorkerProfileStore();
  const profile = getProfileForRole(activeRole);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  const handleCall911 = () => {
    // Frontend-only preview: Local simulation only, never initiate real device emergency calls
    setSimulationNotice(
      "SIMULATED: 911 Emergency dispatch call initiated (Frontend Mock Preview Mode)"
    );
  };

  const handleCallSafety = () => {
    // Frontend-only preview: Local simulation only
    setSimulationNotice("SIMULATED: HAULIX 24/7 Safety Dispatch connected (1-800-555-4285)");
  };

  const handleShareLocation = () => {
    // Frontend-only preview: Local simulation only, no real SMS transmission
    setSimulationNotice("SIMULATED: Live GPS location shared with emergency contacts");
  };

  const handleCallContact = () => {
    // Frontend-only preview: Local simulation only, no real telephone dialer
    setSimulationNotice(
      `SIMULATED: Calling emergency contact ${profile.emergencyContact.name} (${profile.emergencyContact.phone})`
    );
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <ShieldIcon color="#EF4444" size={26} />
            </View>
            <View style={styles.headerTextCol}>
              <Text style={styles.title}>{t("driver.emergencyOverlay.title")}</Text>
              <Text style={styles.subtitle}>{t("driver.emergencyOverlay.subtitle")}</Text>
            </View>
          </View>

          {simulationNotice && (
            <View style={styles.simulationBanner}>
              <CheckmarkIcon color="#BAFF42" size={16} />
              <Text style={styles.simulationBannerText}>{simulationNotice}</Text>
            </View>
          )}

          {/* Emergency Actions List */}
          <View style={styles.actionList}>
            {/* Call 911 */}
            <Pressable
              style={[styles.actionCard, styles.card911]}
              onPress={handleCall911}
              accessibilityRole="button"
              accessibilityLabel={t("driver.emergencyOverlay.call911Title")}
            >
              <View style={[styles.cardIconWrap, styles.icon911]}>
                <AlertTriangleIcon color="#FFFFFF" size={22} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle911}>{t("driver.emergencyOverlay.call911Title")}</Text>
                <Text style={styles.cardDesc}>{t("driver.emergencyOverlay.call911Desc")}</Text>
              </View>
            </Pressable>

            {/* Call HAULIX Safety line */}
            <Pressable
              style={styles.actionCard}
              onPress={handleCallSafety}
              accessibilityRole="button"
              accessibilityLabel={t("driver.emergencyOverlay.callSafetyTitle")}
            >
              <View style={styles.cardIconWrap}>
                <PhoneIcon color="#BAFF42" size={20} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{t("driver.emergencyOverlay.callSafetyTitle")}</Text>
                <Text style={styles.cardDesc}>{t("driver.emergencyOverlay.callSafetyDesc")}</Text>
              </View>
            </Pressable>

            {/* Share Live Location */}
            <Pressable
              style={styles.actionCard}
              onPress={handleShareLocation}
              accessibilityRole="button"
              accessibilityLabel={t("driver.emergencyOverlay.shareLocationTitle")}
            >
              <View style={styles.cardIconWrap}>
                <MapPinIcon color="#BAFF42" size={20} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  {t("driver.emergencyOverlay.shareLocationTitle")}
                </Text>
                <Text style={styles.cardDesc}>
                  {t("driver.emergencyOverlay.shareLocationDesc")}
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Designated Emergency Contact */}
          <Pressable
            style={styles.contactCard}
            onPress={handleCallContact}
            accessibilityRole="button"
            accessibilityLabel={`Call emergency contact ${profile.emergencyContact.name}`}
          >
            <View style={styles.contactRow}>
              <View style={styles.contactCol}>
                <Text style={styles.contactLabel}>Designated Contact</Text>
                <Text style={styles.contactName}>
                  {profile.emergencyContact.name} ({profile.emergencyContact.relationship})
                </Text>
                <Text style={styles.contactPhone}>{profile.emergencyContact.phone}</Text>
              </View>
              <View style={styles.callCircle}>
                <PhoneIcon color="#0B0F0E" size={16} />
              </View>
            </View>
          </Pressable>

          <Pressable
            style={styles.dismissBtn}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t("driver.emergencyOverlay.dismissCta")}
          >
            <Text style={styles.dismissBtnText}>{t("driver.emergencyOverlay.dismissCta")}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#111815",
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing[5],
    borderTopWidth: 1,
    borderColor: "#22332B",
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#2E4036",
    borderRadius: radius.full,
    alignSelf: "center",
    marginBottom: spacing[4],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  actionList: {
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16201B",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22332B",
    gap: spacing[3],
  },
  card911: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderColor: "#EF4444",
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "#1C2A23",
    justifyContent: "center",
    alignItems: "center",
  },
  icon911: {
    backgroundColor: "#EF4444",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle911: {
    fontSize: 15,
    fontWeight: "800",
    color: "#EF4444",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardDesc: {
    fontSize: 11,
    color: "#8E9E99",
    marginTop: 2,
  },
  contactCard: {
    backgroundColor: "#142019",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22382B",
    marginBottom: spacing[4],
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contactCol: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 11,
    color: "#8E9E99",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  contactName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },
  contactPhone: {
    fontSize: 12,
    color: "#BAFF42",
    marginTop: 2,
  },
  callCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: "#BAFF42",
    justifyContent: "center",
    alignItems: "center",
  },
  dismissBtn: {
    backgroundColor: "#16201B",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  dismissBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  simulationBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#BAFF42",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: spacing[3],
    gap: 8,
  },
  simulationBannerText: {
    flex: 1,
    color: "#BAFF42",
    fontSize: 12,
    fontWeight: "600",
  },
});
