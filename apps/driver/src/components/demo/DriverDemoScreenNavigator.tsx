import { radius, spacing } from "@haulix/design-tokens";
import type { SupportedLocale } from "@haulix/i18n";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../i18n";
import { useDriverAuthStore } from "../../stores/authStore";

export interface DemoScreenItem {
  id: string;
  name: string;
  figmaNode: string;
  route: string;
  locale: SupportedLocale;
  role?: "PRIMARY_DRIVER" | "HELPER";
  description: string;
}

export const DRIVER_DEMO_SCREENS: DemoScreenItem[] = [
  // DW01 Welcome
  {
    id: "DW01-EN",
    name: "DW01 · Welcome (English)",
    figmaNode: "1085:3",
    route: "/(auth)/welcome",
    locale: "en",
    description: "Welcome landing with Arizona hero, benefits cards, Get Started & Sign In",
  },
  {
    id: "DW01-ES",
    name: "DW01 · Bienvenida (Español)",
    figmaNode: "1088:3",
    route: "/(auth)/welcome",
    locale: "es",
    description:
      "Pantalla de bienvenida en español con tarjetas de beneficios y selector de idioma",
  },

  // DW02 Create Account
  {
    id: "DW02-EN",
    name: "DW02 · Create your account (English)",
    figmaNode: "1085:39",
    route: "/(auth)/register",
    locale: "en",
    description: "Role selection: Driver (Vehicle operator) vs Helper (Crew member)",
  },
  {
    id: "DW02-ES",
    name: "DW02 · Crea tu cuenta (Español)",
    figmaNode: "1088:39",
    route: "/(auth)/register",
    locale: "es",
    description: "Selección de rol independiente: Conductor vs Ayudante",
  },

  // DW03 Sign In
  {
    id: "DW03-EN",
    name: "DW03 · Sign in (English)",
    figmaNode: "1085:80",
    route: "/(auth)/sign-in",
    locale: "en",
    description: "Email/Phone & Password sign-in, forgot password & phone login links",
  },
  {
    id: "DW03-ES",
    name: "DW03 · Iniciar sesión (Español)",
    figmaNode: "1088:80",
    route: "/(auth)/sign-in",
    locale: "es",
    description: "Acceso a cuenta existente con correo o número de teléfono",
  },

  // DW04 Phone Verification
  {
    id: "DW04-EN",
    name: "DW04 · Phone verification (English)",
    figmaNode: "1085:114",
    route: "/(auth)/verify-phone",
    locale: "en",
    description: "6-digit OTP verification with countdown timer and code-help navigation",
  },
  {
    id: "DW04-ES",
    name: "DW04 · Verificación de teléfono (Español)",
    figmaNode: "1088:114",
    route: "/(auth)/verify-phone",
    locale: "es",
    description: "Verificación de código de seguridad de 6 dígitos con cuenta regresiva",
  },

  // DW43 Reset Password
  {
    id: "DW43-EN",
    name: "DW43 · Reset password (English)",
    figmaNode: "1301:556",
    route: "/(auth)/forgot-password",
    locale: "en",
    description: "Password recovery request with privacy protection notice",
  },
  {
    id: "DW43-ES",
    name: "DW43 · Restablecer contraseña (Español)",
    figmaNode: "1301:1798",
    route: "/(auth)/forgot-password",
    locale: "es",
    description: "Recuperación de cuenta protegida con privacidad",
  },

  // DW44 Check Your Inbox
  {
    id: "DW44-EN",
    name: "DW44 · Check your inbox (English)",
    figmaNode: "1301:611",
    route: "/(auth)/reset-confirmation",
    locale: "en",
    description: "Password reset confirmation notice with return to sign-in CTA",
  },
  {
    id: "DW44-ES",
    name: "DW44 · Revisa tu bandeja de entrada (Español)",
    figmaNode: "1301:1853",
    route: "/(auth)/reset-confirmation",
    locale: "es",
    description: "Confirmación de solicitud de recuperación enviada",
  },

  // DW58 Driver Account Details
  {
    id: "DW58-EN",
    name: "DW58 · Driver account details (English)",
    figmaNode: "1309:706",
    route: "/(auth)/driver-register",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Driver intake: Legal name, email, phone, password and terms consent",
  },
  {
    id: "DW58-ES",
    name: "DW58 · Detalles de cuenta de Conductor (Español)",
    figmaNode: "1309:1429",
    route: "/(auth)/driver-register",
    locale: "es",
    role: "PRIMARY_DRIVER",
    description: "Registro de Conductor con consentimiento de términos",
  },

  // DW59 Helper Account Details
  {
    id: "DW59-EN",
    name: "DW59 · Helper account details (English)",
    figmaNode: "1309:772",
    route: "/(auth)/helper-register",
    locale: "en",
    role: "HELPER",
    description: "Helper intake: Legal name, email, phone, password and crew consent",
  },
  {
    id: "DW59-ES",
    name: "DW59 · Detalles de cuenta de Ayudante (Español)",
    figmaNode: "1309:1495",
    route: "/(auth)/helper-register",
    locale: "es",
    role: "HELPER",
    description: "Registro independiente de Ayudante de cuadrilla",
  },

  // DW60 Helper Phone Verification
  {
    id: "DW60-EN",
    name: "DW60 · Helper phone verification (English)",
    figmaNode: "1309:838",
    route: "/(auth)/helper-verify-phone",
    locale: "en",
    role: "HELPER",
    description: "Helper-specific OTP verification with security disclosure",
  },
  {
    id: "DW60-ES",
    name: "DW60 · Verificación telefónica de Ayudante (Español)",
    figmaNode: "1309:1561",
    route: "/(auth)/helper-verify-phone",
    locale: "es",
    role: "HELPER",
    description: "Validación de teléfono para el rol de Ayudante",
  },

  // DW61 Phone Sign-In Verification
  {
    id: "DW61-EN",
    name: "DW61 · Phone sign-in verification (English)",
    figmaNode: "1309:896",
    route: "/(auth)/phone-sign-in",
    locale: "en",
    description: "Phone OTP sign-in with Driver vs Helper dashboard preview options",
  },
  {
    id: "DW61-ES",
    name: "DW61 · Verificación de inicio por teléfono (Español)",
    figmaNode: "1309:1619",
    route: "/(auth)/phone-sign-in",
    locale: "es",
    description: "Inicio de sesión directo con teléfono y opciones de vista previa",
  },

  // DW66 Verification Code Issue
  {
    id: "DW66-EN",
    name: "DW66 · Verification code issue (English)",
    figmaNode: "1309:1332",
    route: "/(auth)/code-help",
    locale: "en",
    description: "Expired/invalid OTP recovery with security rule disclosure",
  },
  {
    id: "DW66-ES",
    name: "DW66 · Problema con código (Español)",
    figmaNode: "1309:1991",
    route: "/(auth)/code-help",
    locale: "es",
    description: "Recuperación de código vencido o no recibido",
  },

  // 5-Tab Navigation Shell
  {
    id: "TAB-HOME-DRIVER",
    name: "Tab 1 · Driver Home Hub (DW09)",
    figmaNode: "1084:26 / 1085:388",
    route: "/(app)/(tabs)",
    locale: "en",
    role: "PRIMARY_DRIVER",
    description: "Authoritative 5-Tab bar — Driver Home hub",
  },
  {
    id: "TAB-HOME-HELPER",
    name: "Tab 1 · Helper Home Hub (DW31)",
    figmaNode: "1084:26 / 1086:1049",
    route: "/(app)/(tabs)",
    locale: "en",
    role: "HELPER",
    description: "Authoritative 5-Tab bar — Helper Home hub",
  },
  {
    id: "TAB-JOBS",
    name: "Tab 2 · Jobs Hub",
    figmaNode: "1084:26 / 1085:470",
    route: "/(app)/(tabs)/jobs",
    locale: "en",
    description: "Authoritative 5-Tab bar — Jobs & invitations tab",
  },
  {
    id: "TAB-EARNINGS",
    name: "Tab 3 · Earnings Hub",
    figmaNode: "1084:26 / 1086:714",
    route: "/(app)/(tabs)/earnings",
    locale: "en",
    description: "Authoritative 5-Tab bar — Earnings ledger & cash-out tab",
  },
  {
    id: "TAB-MESSAGES",
    name: "Tab 4 · Messages Hub",
    figmaNode: "1084:26 / 1085:810",
    route: "/(app)/(tabs)/messages",
    locale: "en",
    description: "Authoritative 5-Tab bar — Crew & dispatch messaging tab",
  },
  {
    id: "TAB-PROFILE",
    name: "Tab 5 · Profile & Settings",
    figmaNode: "1084:26 / 1086:840",
    route: "/(app)/(tabs)/profile",
    locale: "en",
    description: "Authoritative 5-Tab bar — Profile, credentials & safety tab",
  },
];

export function DriverDemoScreenNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentLocale, toggleLanguage, setLanguage } = useDriverTranslation();
  const { setRole, loginMock } = useDriverAuthStore();

  const handleSelectScreen = async (item: DemoScreenItem) => {
    if (item.locale !== currentLocale) {
      await setLanguage(item.locale);
    }
    if (item.role) {
      setRole(item.role);
    }
    if (item.route.startsWith("/(app)")) {
      loginMock(item.role);
    }
    setIsOpen(false);
    router.push(item.route as Href);
  };

  return (
    <>
      {/* Invisible QA touch-target to prevent obstructing Figma comparison screenshots */}
      <Pressable
        onPress={() => setIsOpen(true)}
        style={[styles.floatingPill, { top: insets.top }]}
        accessibilityRole="button"
        accessibilityLabel="Open QA Navigator"
      />

      <Modal visible={isOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Driver/Worker QA Navigator</Text>
                <Text style={styles.modalSubtitle}>DW-F00 & DW-F01 Canonical States</Text>
              </View>

              <View style={styles.headerActions}>
                <Pressable onPress={toggleLanguage} style={styles.langToggle}>
                  <Text style={styles.langToggleText}>
                    {currentLocale === "en" ? "EN ➜ ES" : "ES ➜ EN"}
                  </Text>
                </Pressable>

                <Pressable onPress={() => setIsOpen(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>
            </View>

            <ScrollView style={styles.screensList} showsVerticalScrollIndicator={false}>
              {DRIVER_DEMO_SCREENS.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleSelectScreen(item)}
                  style={({ pressed }) => [styles.screenRow, pressed && styles.screenRowPressed]}
                >
                  <View style={styles.rowTop}>
                    <Text style={styles.screenName}>{item.name}</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.figmaNode}</Text>
                    </View>
                  </View>
                  <Text style={styles.screenDesc}>{item.description}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingPill: {
    position: "absolute",
    right: 0,
    width: 64,
    height: 50,
    backgroundColor: "transparent",
    zIndex: 9999,
  },
  pillText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#080B0B",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#151A19",
    borderTopLeftRadius: radius["2xl"],
    borderTopRightRadius: radius["2xl"],
    maxHeight: "85%",
    paddingTop: spacing[4],
    paddingHorizontal: spacing[4],
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: "#222B27",
  },
  modalTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#F6F8F6",
  },
  modalSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#ADB8B0",
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  langToggle: {
    backgroundColor: "#222B27",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#BAFF42",
  },
  langToggleText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#BAFF42",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#222B27",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#F6F8F6",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  screensList: {
    paddingVertical: spacing[3],
  },
  screenRow: {
    backgroundColor: "#1E2523",
    borderRadius: radius.xl,
    padding: spacing[3],
    marginBottom: spacing[2.5],
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  screenRowPressed: {
    borderColor: "#BAFF42",
  },
  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
    flex: 1,
  },
  badge: {
    backgroundColor: "#2C3330",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginLeft: spacing[2],
  },
  badgeText: {
    fontFamily: "Inter_500Medium",
    fontSize: 9,
    color: "#BAFF42",
  },
  screenDesc: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#ADB8B0",
    marginTop: 4,
    lineHeight: 15,
  },
});
