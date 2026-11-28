import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperclipIcon, PlayIcon, SofaIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";
import { useJobMessagesStore } from "../../src/stores/jobMessagesStore";

const WAVEFORM_BARS = [
  12, 18, 26, 14, 22, 32, 28, 16, 24, 30, 20, 10, 24, 28, 18, 22, 14, 26, 30, 16, 12, 20, 24, 18,
  10, 14,
].map((h, i) => ({
  id: `wf-bar-${i}-${h}`,
  height: h,
  active: i < 14,
}));

export default function JobMessagesScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const { role } = useDriverAuthStore();
  const { currentJobId, getJobMessages, sendMessage } = useJobMessagesStore();
  const [inputText, setInputText] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isEs = currentLocale === "es";
  const jobMessages = getJobMessages(currentJobId);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(
      inputText.trim(),
      role === "HELPER" ? "HELPER" : "PRIMARY_DRIVER",
      "You",
      currentJobId
    );
    setInputText("");
    router.push("/(app)/message-status" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t("driver.jobMessages.title")}</Text>
            <Text style={styles.subtitle}>{t("driver.jobMessages.subtitle")}</Text>
          </View>

          {/* Messages Thread */}
          <View style={styles.threadContainer}>
            {jobMessages.map((msg) => {
              const isYou = msg.senderRole === "PRIMARY_DRIVER" || msg.senderRole === "HELPER";
              const content = isEs && msg.contentEs ? msg.contentEs : msg.content;
              const senderLabel = isYou
                ? t("driver.jobMessages.youSender")
                : t("driver.jobMessages.customerSender");

              return (
                <View
                  key={msg.id}
                  style={[styles.messageRow, isYou ? styles.rowRight : styles.rowLeft]}
                >
                  {!isYou && (
                    <View style={styles.avatarCircleLeft}>
                      <Text style={styles.avatarText}>C</Text>
                    </View>
                  )}

                  <View
                    style={[styles.bubbleCard, isYou ? styles.bubbleYou : styles.bubbleCustomer]}
                  >
                    <Text style={styles.senderHeader}>{`${senderLabel} · ${msg.time}`}</Text>
                    <Text style={styles.bubbleText}>{content}</Text>
                  </View>

                  {isYou && (
                    <View style={styles.avatarCircleRight}>
                      <Text style={styles.avatarText}>Y</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {/* Asynchronous Voice Note Attachment Card (Figma 1086:493) */}
            <View style={styles.attachmentCard}>
              <View style={styles.voiceNoteTop}>
                <Pressable
                  onPress={() => setIsPlayingAudio(!isPlayingAudio)}
                  style={styles.playBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Play recorded voice note"
                >
                  <PlayIcon size={16} color="#BAFF42" />
                </Pressable>
                <View style={styles.voiceNoteMeta}>
                  <Text style={styles.voiceNoteTitle}>
                    {t("driver.jobMessages.voiceNoteTitle")}
                  </Text>
                  <Text style={styles.voiceNoteSub}>
                    {t("driver.jobMessages.voiceNoteSubtitle")}
                  </Text>
                </View>
              </View>

              {/* Waveform graphic visualization */}
              <View style={styles.waveformContainer}>
                {WAVEFORM_BARS.map((bar) => (
                  <View
                    key={bar.id}
                    style={[
                      styles.waveformBar,
                      { height: bar.height },
                      bar.active ? styles.waveformBarActive : styles.waveformBarInactive,
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Photo Attachment Card (Figma 1086:459) */}
            <View style={styles.attachmentCard}>
              <View style={styles.photoRow}>
                <View style={styles.photoThumb}>
                  <SofaIcon size={28} color="#BAFF42" />
                </View>
                <View style={styles.photoMeta}>
                  <Text style={styles.photoTitle}>
                    {t("driver.jobMessages.photoAttachedTitle")}
                  </Text>
                  <Text style={styles.photoSub}>
                    {t("driver.jobMessages.photoAttachedSubtitle")}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: spacing[3] }} />

          {/* Composer Box (Figma 1086:503) */}
          <View style={styles.composerCard}>
            <Pressable style={styles.attachBtn} accessibilityLabel="Add attachment">
              <PaperclipIcon size={20} color="#BAFF42" />
            </Pressable>

            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder={t("driver.jobMessages.inputPlaceholder")}
              placeholderTextColor="#606D66"
              style={styles.inputField}
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />

            <Pressable
              onPress={handleSend}
              style={({ pressed }) => [styles.sendBtn, pressed && styles.sendBtnPressed]}
              accessibilityRole="button"
              accessibilityLabel={t("driver.jobMessages.sendBtn")}
            >
              <Text style={styles.sendBtnText}>{t("driver.jobMessages.sendBtn")}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 5-Tab Bar (Figma 1086:475 Active Messages) */}
      <DriverBottomNav activeTab="messages" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[4],
  },
  header: {
    marginBottom: spacing[4],
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: "#F6F8F6",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
    marginTop: 4,
  },
  threadContainer: {
    gap: spacing[3],
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  rowLeft: {
    justifyContent: "flex-start",
  },
  rowRight: {
    justifyContent: "flex-end",
  },
  avatarCircleLeft: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#202A26",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2D3B35",
  },
  avatarCircleRight: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1D2824",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#BAFF42",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: "#BAFF42",
  },
  bubbleCard: {
    maxWidth: "76%",
    borderRadius: radius.xl,
    padding: spacing[3],
    borderWidth: 1,
  },
  bubbleCustomer: {
    backgroundColor: "#151A19",
    borderColor: "#232C28",
  },
  bubbleYou: {
    backgroundColor: "#18221E",
    borderColor: "#2D3D35",
  },
  senderHeader: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#BAFF42",
    marginBottom: 4,
  },
  bubbleText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#F6F8F6",
  },
  attachmentCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
  },
  voiceNoteTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1D2723",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#32433C",
  },
  voiceNoteMeta: {
    flex: 1,
  },
  voiceNoteTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#F6F8F6",
  },
  voiceNoteSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 36,
    paddingHorizontal: 4,
  },
  waveformBar: {
    width: 3,
    borderRadius: 1.5,
  },
  waveformBarActive: {
    backgroundColor: "#BAFF42",
  },
  waveformBarInactive: {
    backgroundColor: "#2E3B35",
  },
  photoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  photoThumb: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: "#1D2522",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A3631",
  },
  photoMeta: {
    flex: 1,
  },
  photoTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#F6F8F6",
  },
  photoSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#8E9E99",
    marginTop: 3,
  },
  composerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#232C28",
    gap: 8,
  },
  attachBtn: {
    padding: 6,
  },
  inputField: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#F6F8F6",
    paddingVertical: 8,
  },
  sendBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.lg,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  sendBtnPressed: {
    opacity: 0.85,
  },
  sendBtnText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#080B0B",
    letterSpacing: 0.5,
  },
});
