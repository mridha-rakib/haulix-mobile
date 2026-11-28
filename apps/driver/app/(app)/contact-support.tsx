import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useSupportStore } from "../../src/stores/supportStore";
import { useWalletStore } from "../../src/stores/walletStore";

type SupportCategory = "job" | "payment" | "account" | "app";

export default function ContactSupportScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const params = useLocalSearchParams<{ category?: string; jobId?: string }>();
  const { activeRole } = useWalletStore();
  const { submitTicket } = useSupportStore();

  const [category, setCategory] = useState<SupportCategory>(
    (params.category as SupportCategory) || "job"
  );
  const [jobId, setJobId] = useState(params.jobId || "");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/help-support" as Href);
    }
  };

  const handleSubmit = () => {
    setErrorMessage(null);
    if (!message.trim()) {
      setErrorMessage("Please enter a description of the issue.");
      return;
    }

    const ticket = submitTicket(activeRole, category, message, jobId);
    router.push(`/(app)/request-received?ticketId=${ticket.ticketId}` as Href);
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
          <Text style={styles.headerTitle}>{t("driver.contactSupport.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.contactSupport.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Category Selection */}
        <Text style={styles.sectionHeading}>{t("driver.contactSupport.categoryLabel")}</Text>
        <View style={styles.categoryGrid}>
          <Pressable
            style={[styles.categoryChip, category === "job" && styles.categoryChipActive]}
            onPress={() => setCategory("job")}
            accessibilityRole="button"
            accessibilityLabel={t("driver.contactSupport.catActiveJob")}
          >
            <Text
              style={[styles.categoryChipText, category === "job" && styles.categoryChipTextActive]}
            >
              {t("driver.contactSupport.catActiveJob")}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.categoryChip, category === "payment" && styles.categoryChipActive]}
            onPress={() => setCategory("payment")}
            accessibilityRole="button"
            accessibilityLabel={t("driver.contactSupport.catPayment")}
          >
            <Text
              style={[
                styles.categoryChipText,
                category === "payment" && styles.categoryChipTextActive,
              ]}
            >
              {t("driver.contactSupport.catPayment")}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.categoryChip, category === "account" && styles.categoryChipActive]}
            onPress={() => setCategory("account")}
            accessibilityRole="button"
            accessibilityLabel={t("driver.contactSupport.catAccount")}
          >
            <Text
              style={[
                styles.categoryChipText,
                category === "account" && styles.categoryChipTextActive,
              ]}
            >
              {t("driver.contactSupport.catAccount")}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.categoryChip, category === "app" && styles.categoryChipActive]}
            onPress={() => setCategory("app")}
            accessibilityRole="button"
            accessibilityLabel={t("driver.contactSupport.catAppIssue")}
          >
            <Text
              style={[styles.categoryChipText, category === "app" && styles.categoryChipTextActive]}
            >
              {t("driver.contactSupport.catAppIssue")}
            </Text>
          </Pressable>
        </View>

        {/* Inputs Card */}
        <View style={styles.card}>
          {/* Job ID Optional */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.contactSupport.jobIdLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={jobId}
              onChangeText={setJobId}
              placeholder="e.g. HX-AZ-DEMO-0042"
              placeholderTextColor="#5C6E66"
              autoCapitalize="characters"
            />
          </View>

          {/* Message Area */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.contactSupport.messageLabel")}</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={message}
              onChangeText={setMessage}
              placeholder={t("driver.contactSupport.messagePlaceholder")}
              placeholderTextColor="#5C6E66"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel={t("driver.contactSupport.submitCta")}
          >
            <Text style={styles.primaryButtonText}>{t("driver.contactSupport.submitCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel={t("driver.contactSupport.cancelCta")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.contactSupport.cancelCta")}</Text>
          </Pressable>
        </View>
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
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  errorBanner: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: radius.md,
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  errorBannerText: {
    color: "#FCA5A5",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: spacing[2],
    marginBottom: spacing[2],
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.full,
    backgroundColor: "#111815",
    borderWidth: 1,
    borderColor: "#22332B",
  },
  categoryChipActive: {
    backgroundColor: "#BAFF42",
    borderColor: "#BAFF42",
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
  },
  categoryChipTextActive: {
    color: "#0B0F0E",
  },
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
    gap: spacing[3],
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E9E99",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: "#16201B",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#24342C",
    color: "#FFFFFF",
    fontSize: 15,
    paddingHorizontal: spacing[3],
    paddingVertical: 12,
  },
  textArea: {
    minHeight: 120,
    lineHeight: 20,
  },
  actionContainer: {
    gap: spacing[2],
  },
  primaryButton: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#0B0F0E",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "#16201B",
    borderRadius: radius.full,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
