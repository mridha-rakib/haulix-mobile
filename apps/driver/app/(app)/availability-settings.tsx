import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockTimerIcon,
  MapPinIcon,
  PowerIcon,
} from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";
import {
  type AvailabilityPreferences,
  useAvailabilityStore,
} from "../../src/stores/availabilityStore";

const DAY_KEYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_KEYS_ES = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

export default function AvailabilitySettingsScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { role } = useDriverAuthStore();
  const {
    driverStatus,
    helperStatus,
    setDriverStatus,
    setHelperStatus,
    getRolePreferences,
    saveRolePreferences,
  } = useAvailabilityStore();

  const isDriver = role === "PRIMARY_DRIVER";
  const initialOnline = isDriver ? driverStatus === "ONLINE" : helperStatus === "ONLINE";
  const initialPreferences = getRolePreferences(role);

  // Local draft state — allows cancellation / back navigation without unwanted mutation
  const [draftOnline, setDraftOnline] = useState<boolean>(initialOnline);
  const [draftPreferences, setDraftPreferences] = useState<AvailabilityPreferences>({
    ...initialPreferences,
  });
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleToggleOnline = (value: boolean) => {
    setDraftOnline(value);
    if (value && draftPreferences.vacationMode) {
      setDraftPreferences((prev) => ({ ...prev, vacationMode: false }));
    }
  };

  const handleToggleDay = (day: string) => {
    setDraftPreferences((prev) => {
      const exists = prev.workingDays.includes(day);
      const updatedDays = exists
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day];
      return { ...prev, workingDays: updatedDays };
    });
  };

  const handleToggleVacation = (value: boolean) => {
    setDraftPreferences((prev) => ({ ...prev, vacationMode: value }));
    if (value) {
      setDraftOnline(false);
    }
  };

  const handleSave = () => {
    // Commit draft to isolated role preferences in store
    saveRolePreferences(role, draftPreferences);

    const nextStatus = draftOnline ? "ONLINE" : "OFFLINE";
    if (isDriver) {
      setDriverStatus(nextStatus);
    } else {
      setHelperStatus(nextStatus);
    }

    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      router.back();
    }, 600);
  };

  const displayDays = currentLocale === "es" ? DAY_KEYS_ES : DAY_KEYS_EN;

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.availabilitySettings.title")}
        subtitle={t("driver.availabilitySettings.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section 1: Work Status Toggle (Figma 1270:793) */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconSquare}>
              <PowerIcon size={20} color="#BAFF42" />
            </View>
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>
                {t("driver.availabilitySettings.workStatusTitle")}
              </Text>
              <Text style={styles.cardSubtitle}>
                {t("driver.availabilitySettings.workStatusSub")}
              </Text>
            </View>
          </View>
          <Switch
            value={draftOnline}
            onValueChange={handleToggleOnline}
            trackColor={{ false: "#232C28", true: "#BAFF42" }}
            thumbColor={draftOnline ? "#080B0B" : "#8E9E99"}
          />
        </View>

        {/* Section 2: Working Days (Figma 1270:793) */}
        <View style={styles.cardColumn}>
          <Text style={styles.cardTitle}>{t("driver.availabilitySettings.workingDaysTitle")}</Text>
          <Text style={styles.cardSubtitle}>{t("driver.availabilitySettings.workingDaysSub")}</Text>

          <View style={styles.daysRow}>
            {DAY_KEYS_EN.map((dayEn, index) => {
              const label = displayDays[index];
              const isSelected = draftPreferences.workingDays.includes(dayEn);
              return (
                <Pressable
                  key={dayEn}
                  onPress={() => handleToggleDay(dayEn)}
                  style={[styles.dayPill, isSelected && styles.dayPillActive]}
                  accessibilityRole="button"
                  accessibilityLabel={`Toggle ${dayEn}`}
                >
                  <Text style={[styles.dayPillText, isSelected && styles.dayPillTextActive]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Section 3: Working Hours (Figma 1270:793) */}
        <View style={styles.cardColumn}>
          <Text style={styles.cardTitle}>{t("driver.availabilitySettings.workingHoursTitle")}</Text>

          <View style={styles.hoursRow}>
            <View style={styles.hourCard}>
              <Text style={styles.hourLabel}>
                {t("driver.availabilitySettings.startTimeLabel")}
              </Text>
              <View style={styles.hourPicker}>
                <Text style={styles.hourValue}>{draftPreferences.startHour}</Text>
                <ChevronDownIcon size={14} color="#ADB8B0" />
              </View>
            </View>

            <View style={styles.hourCard}>
              <Text style={styles.hourLabel}>{t("driver.availabilitySettings.endTimeLabel")}</Text>
              <View style={styles.hourPicker}>
                <Text style={styles.hourValue}>{draftPreferences.endHour}</Text>
                <ChevronDownIcon size={14} color="#ADB8B0" />
              </View>
            </View>
          </View>
        </View>

        {/* Section 4: Service Radius (Figma 1270:793) */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconSquare}>
              <MapPinIcon size={20} color="#BAFF42" />
            </View>
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>
                {t("driver.availabilitySettings.serviceRadiusTitle")}
              </Text>
              <Text style={styles.cardSubtitle}>
                {t("driver.availabilitySettings.serviceRadiusSub")}
              </Text>
            </View>
          </View>
          <Text style={styles.settingValueText}>
            {currentLocale === "es"
              ? `${draftPreferences.serviceRadiusMiles} mi`
              : `${draftPreferences.serviceRadiusMiles} mi`}
          </Text>
        </View>

        {/* Section 5: Preferred Shift (Figma 1270:793) */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconSquare}>
              <ClockTimerIcon size={20} color="#BAFF42" />
            </View>
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>
                {t("driver.availabilitySettings.preferredShiftTitle")}
              </Text>
              <Text style={styles.cardSubtitle}>
                {t("driver.availabilitySettings.preferredShiftSub")}
              </Text>
            </View>
          </View>
          <Text style={styles.settingValueText}>
            {currentLocale === "es" ? "Turno diurno" : draftPreferences.preferredShift}
          </Text>
        </View>

        {/* Section 6: Vacation Mode (Figma 1270:793) */}
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconSquare}>
              <CalendarIcon size={20} color="#BAFF42" />
            </View>
            <View style={styles.cardTextGroup}>
              <Text style={styles.cardTitle}>
                {t("driver.availabilitySettings.vacationModeTitle")}
              </Text>
              <Text style={styles.cardSubtitle}>
                {t("driver.availabilitySettings.vacationModeSub")}
              </Text>
            </View>
          </View>
          <Switch
            value={draftPreferences.vacationMode}
            onValueChange={handleToggleVacation}
            trackColor={{ false: "#232C28", true: "#BAFF42" }}
            thumbColor={draftPreferences.vacationMode ? "#080B0B" : "#8E9E99"}
          />
        </View>

        <View style={{ height: spacing[6] }} />

        {/* Save CTA */}
        <ActionCtaButton
          label={
            savedFeedback
              ? t("driver.availabilitySettings.savedToast")
              : t("driver.availabilitySettings.saveCta")
          }
          onPress={handleSave}
          variant="primary"
          size="large"
        />
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
    paddingBottom: spacing[8],
    gap: spacing[3],
  },
  card: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardColumn: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    flex: 1,
    marginRight: spacing[2],
  },
  iconSquare: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTextGroup: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
  },
  settingValueText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
  },
  daysRow: {
    flexDirection: "row",
    gap: spacing[1.5],
    marginTop: spacing[3],
    justifyContent: "space-between",
  },
  dayPill: {
    flex: 1,
    backgroundColor: "#101614",
    borderWidth: 1,
    borderColor: "#232C28",
    paddingVertical: spacing[2],
    borderRadius: radius.md,
    alignItems: "center",
  },
  dayPillActive: {
    backgroundColor: "#BAFF42",
    borderColor: "#BAFF42",
  },
  dayPillText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#ADB8B0",
  },
  dayPillTextActive: {
    color: "#080B0B",
    fontFamily: "Inter_700Bold",
  },
  hoursRow: {
    flexDirection: "row",
    gap: spacing[3],
    marginTop: spacing[3],
  },
  hourCard: {
    flex: 1,
    backgroundColor: "#101614",
    borderWidth: 1,
    borderColor: "#232C28",
    borderRadius: radius.lg,
    padding: spacing[3],
  },
  hourLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#8E9E99",
    marginBottom: spacing[1],
  },
  hourPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hourValue: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
  },
});
