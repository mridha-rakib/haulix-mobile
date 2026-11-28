import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export default function InvitationPendingScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { getSelectedJob, invitations, activeInvitationId } = useDispatchCrewStore();

  const isEs = currentLocale === "es";
  const job = getSelectedJob();
  const jobTitle = isEs ? job.titleEs : job.titleEn;

  const currentInv = invitations.find((i) => i.id === activeInvitationId || i.jobId === job.id);
  const status = currentInv?.status || "PENDING";

  const getStatusContent = () => {
    switch (status) {
      case "ACCEPTED":
        return {
          title: isEs ? "Ayudante aceptó · Equipo listo" : "Helper accepted · Crew ready",
          desc: isEs
            ? "El miembro de tu equipo confirmó la asignación. Procede a la preparación del equipo."
            : "Your crew member confirmed the assignment. Proceed to crew readiness.",
          cta: isEs ? "Ver preparación del equipo" : "View Crew Readiness",
          action: () => router.push("/(app)/crew-readiness" as Href),
        };
      case "DECLINED":
        return {
          title: isEs ? "Ayudante rechazó la invitación" : "Helper declined invitation",
          desc: isEs
            ? "El ayudante no está disponible para este servicio. Puedes elegir otro ayudante calificado."
            : "The invited helper is unavailable for this job. You may select another qualified helper.",
          cta: isEs ? "Elegir otro ayudante" : "Choose Another Helper",
          action: () => router.push("/(app)/choose-helper" as Href),
        };
      case "CANCELLED":
        return {
          title: isEs ? "Invitación cancelada" : "Invitation cancelled",
          desc: isEs
            ? "Cancelaste esta invitación. Puedes invitar a otro ayudante del listado."
            : "You cancelled this invitation. You can invite another helper from the roster.",
          cta: isEs ? "Elegir otro ayudante" : "Choose Another Helper",
          action: () => router.push("/(app)/choose-helper" as Href),
        };
      default:
        return {
          title: t("driver.invitationPending.awaitingTitle"),
          desc: t("driver.invitationPending.awaitingDesc"),
          cta: t("driver.invitationPending.viewReadinessCta"),
          action: () => router.push("/(app)/crew-readiness" as Href),
        };
    }
  };

  const statusContent = getStatusContent();

  const handleJobCardPress = () => {
    router.push("/(app)/job-details" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <FlowHeader
        title={t("driver.invitationPending.title")}
        subtitle={t("driver.invitationPending.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Card 1: Dynamic Status Card (Figma 1301:1010 canonical pending default) */}
        <View style={styles.card}>
          <Text style={styles.limeTitle}>{statusContent.title}</Text>
          <Text style={styles.cardDesc}>{statusContent.desc}</Text>
        </View>

        {/* Card 2: Job Card with Chevron */}
        <Pressable
          onPress={handleJobCardPress}
          style={({ pressed }) => [styles.jobCardRow, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Job ${job.id}`}
        >
          <View style={styles.jobTextGroup}>
            <Text style={styles.jobRowTitle}>{`Job ${job.id}`}</Text>
            <Text style={styles.jobRowSub}>
              {`${jobTitle} · ${t("driver.invitationPending.exampleSubtitle")}`}
            </Text>
          </View>
          <ChevronRightIcon size={20} color="#BAFF42" />
        </Pressable>

        {/* Card 3: Crew Readiness notice */}
        <View style={styles.card}>
          <Text style={styles.whiteTitle}>{t("driver.invitationPending.crewReadinessTitle")}</Text>
          <Text style={styles.cardDesc}>{t("driver.invitationPending.crewReadinessDesc")}</Text>
        </View>

        <View style={{ height: spacing[6] }} />

        {/* Action Button */}
        <Pressable
          onPress={statusContent.action}
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
          accessibilityRole="button"
          accessibilityLabel={statusContent.cta}
        >
          <Text style={styles.primaryBtnText}>{statusContent.cta}</Text>
        </Pressable>
      </ScrollView>

      {/* Master 5-Tab Navigation Bar */}
      <DriverBottomNav />
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
    paddingBottom: spacing[6],
  },
  card: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    marginBottom: spacing[3],
  },
  limeTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#BAFF42",
    marginBottom: 4,
  },
  whiteTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  cardDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
    lineHeight: 18,
  },
  jobCardRow: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  jobTextGroup: {
    flex: 1,
    marginRight: spacing[2],
  },
  jobRowTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  jobRowSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
  },
  primaryBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: spacing[3],
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#080B0B",
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
