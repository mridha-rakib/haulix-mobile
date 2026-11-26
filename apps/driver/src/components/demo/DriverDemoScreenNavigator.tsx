import { radius, spacing } from "@haulix/design-tokens";
import type { SupportedLocale } from "@haulix/i18n";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentLocale, toggleLanguage, setLanguage } = useDriverTranslation();
  const { role, setRole, loginMock, logout } = useDriverAuthStore();

  const handleSelectScreen = async (item: DemoScreenItem) => {
    if (item.locale !== currentLocale) {
      await setLanguage(item.locale);
    }
    if (item.role) {
      setRole(item.role);
    }
    if (item.route.startsWith("/(app)")) {
      loginMock(item.role || role);
    }
    setIsOpen(false);
    router.push(item.route as Href);
  };

  const handleResetDemoState = () => {
    logout();
    setRole("PRIMARY_DRIVER");
    setIsOpen(false);
    router.replace("/(auth)/welcome");
  };

  const filteredScreens = DRIVER_DEMO_SCREENS.filter((screen) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      screen.id.toLowerCase().includes(query) ||
      screen.name.toLowerCase().includes(query) ||
      screen.figmaNode.toLowerCase().includes(query) ||
      screen.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      {/* Non-obstructive edge-docked trigger with pointerEvents="box-none" */}
      <View style={styles.floatingWrapper} pointerEvents="box-none">
        <Pressable
          onPress={() => (isMinimized ? setIsMinimized(false) : setIsOpen(true))}
          onLongPress={() => setIsMinimized(!isMinimized)}
          style={[styles.floatingDock, isMinimized && styles.floatingDockMinimized]}
          accessibilityRole="button"
          accessibilityLabel="Open QA Navigator"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.qaDot} />
          {!isMinimized && <Text style={styles.qaDockText}>QA</Text>}
        </Pressable>
      </View>

      <Modal
        visible={isOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Driver/Worker QA Navigator</Text>
                <Text style={styles.modalSubtitle}>Guard-Free Preview · 68-State Framework</Text>
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

            {/* Quick Context Controls */}
            <View style={styles.controlsRow}>
              <Pressable
                onPress={() => setRole(role === "PRIMARY_DRIVER" ? "HELPER" : "PRIMARY_DRIVER")}
                style={[styles.controlChip, role === "PRIMARY_DRIVER" ? styles.chipActive : null]}
              >
                <Text style={styles.controlChipText}>
                  Role: {role === "PRIMARY_DRIVER" ? "Driver (Vehicle)" : "Helper (Crew)"}
                </Text>
              </Pressable>

              <Pressable onPress={handleResetDemoState} style={styles.resetChip}>
                <Text style={styles.resetChipText}>↺ Reset</Text>
              </Pressable>
            </View>

            {/* Search Input */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search screen by ID (e.g. DW01, DW04) or title..."
                placeholderTextColor="#687771"
                style={styles.searchInput}
                autoCapitalize="none"
              />
              {Boolean(searchQuery) && (
                <Pressable onPress={() => setSearchQuery("")}>
                  <Text style={styles.clearSearch}>✕</Text>
                </Pressable>
              )}
            </View>

            {/* Screen List */}
            <ScrollView style={styles.screensList} showsVerticalScrollIndicator={false}>
              {filteredScreens.map((item) => (
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
              {filteredScreens.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No matching screens found</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  floatingDock: {
    position: "absolute",
    top: "42%",
    right: 0,
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: "rgba(19, 25, 23, 0.92)",
    borderWidth: 1,
    borderColor: "#35403B",
    borderRightWidth: 0,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    zIndex: 9999,
  },
  floatingDockMinimized: {
    width: 10,
    paddingHorizontal: 0,
    borderColor: "#232C28",
  },
  qaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#BAFF42",
  },
  qaDockText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: "#BAFF42",
    letterSpacing: 0.5,
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
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 10,
  },
  controlChip: {
    flex: 1,
    backgroundColor: "#1E2523",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
  },
  chipActive: {
    borderColor: "#BAFF42",
  },
  controlChipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#F6F8F6",
  },
  resetChip: {
    backgroundColor: "#2A1818",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#5A2828",
  },
  resetChipText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: "#FF8080",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0D1110",
    borderWidth: 1,
    borderColor: "#232C28",
    borderRadius: radius.lg,
    paddingHorizontal: 10,
    marginBottom: 8,
    height: 40,
  },
  searchIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FFFFFF",
    paddingVertical: 0,
  },
  clearSearch: {
    fontSize: 12,
    color: "#ADB8B0",
    padding: 4,
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
    paddingVertical: spacing[2],
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
  emptyState: {
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#687771",
  },
});
