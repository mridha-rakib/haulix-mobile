import { colors, fontFamily, radius, spacing } from "@haulix/design-tokens";
import { changeLocale, getCurrentLocale, type SupportedLocale } from "@haulix/i18n";
import { type Href, usePathname, useRouter } from "expo-router";
import type React from "react";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenItem {
  id: string;
  name: string;
  figmaNode: string;
  route: string;
  locale: SupportedLocale;
  description: string;
}

const IMPLEMENTED_SCREENS: ScreenItem[] = [
  {
    id: "c01-en",
    name: "C01 · Home & Services (English)",
    figmaNode: "Node 439:3498",
    route: "/(app)",
    locale: "en",
    description: "HAULIX Home with hero truck, search, services grid & recent jobs",
  },
  {
    id: "c01-es",
    name: "C01 · Inicio y Servicios (Español)",
    figmaNode: "Node 439:3498 / 974:8843",
    route: "/(app)",
    locale: "es",
    description:
      "HAULIX Inicio en español: camión hero, búsqueda, 8 servicios y trabajos recientes",
  },
  {
    id: "c06-en",
    name: "C06 · Email Sign-in (English)",
    figmaNode: "Node 331:2",
    route: "/sign-in",
    locale: "en",
    description: "English default sign-in with email & password",
  },
  {
    id: "c06-es",
    name: "C06 · Iniciar Sesión (Español)",
    figmaNode: "Node 347:86",
    route: "/sign-in",
    locale: "es",
    description: "Localización oficial en español con textos Figma",
  },
  {
    id: "c07-en",
    name: "C07 · Create Account (English)",
    figmaNode: "Node 331:35",
    route: "/create-account",
    locale: "en",
    description: "Account creation with terms consent checkbox",
  },
  {
    id: "c07-es",
    name: "C07 · Crear Cuenta (Español)",
    figmaNode: "Node 347:130",
    route: "/create-account",
    locale: "es",
    description: "Creación de cuenta con consentimiento legal",
  },
  {
    id: "c08-en",
    name: "C08 · Phone Verification (English)",
    figmaNode: "Node 331:75",
    route: "/verify-phone",
    locale: "en",
    description: "6-digit OTP verification with Phoenix chip",
  },
  {
    id: "c08-es",
    name: "C08 · Verificación OTP (Español)",
    figmaNode: "Node 347:179",
    route: "/verify-phone",
    locale: "es",
    description: "Verificación de 6 dígitos con teclado numérico",
  },
  {
    id: "c09-en",
    name: "C09 · Social Return (English)",
    figmaNode: "Node 331:118",
    route: "/social-return",
    locale: "en",
    description: "Sarah Mitchell profile preview card",
  },
  {
    id: "c09-es",
    name: "C09 · Retorno Social (Español)",
    figmaNode: "Node 347:283",
    route: "/social-return",
    locale: "es",
    description: "Ficha de cliente de demostración Bryan Lopez",
  },
  {
    id: "c10-en",
    name: "C10 · Account Overview (English)",
    figmaNode: "Node 333:26",
    route: "/account",
    locale: "en",
    description: "Sarah Mitchell account, bottom nav & photo manager",
  },
  {
    id: "c10-es",
    name: "C10 · Mi Cuenta (Español)",
    figmaNode: "Node 347:315",
    route: "/account",
    locale: "es",
    description: "Perfil de Bryan Lopez, barra de navegación y foto",
  },
  {
    id: "c10e-en",
    name: "C10-E · Edit Profile (English)",
    figmaNode: "Node 333:116",
    route: "/edit-profile",
    locale: "en",
    description: "Sarah Mitchell edit profile, input validation & local save",
  },
  {
    id: "c10e-es",
    name: "C10-E · Editar Perfil (Español)",
    figmaNode: "Node 333:116 / 347:315",
    route: "/edit-profile",
    locale: "es",
    description: "Edición de perfil Bryan Lopez, validación y guardado local",
  },
  {
    id: "c10s-en",
    name: "C10-S · Profile Updated (English)",
    figmaNode: "Node 333:171",
    route: "/profile-updated",
    locale: "en",
    description: "Profile updated success card, dynamic details & account navigation",
  },
  {
    id: "c10s-es",
    name: "C10-S · Cambios guardados (Español)",
    figmaNode: "Node 333:171 / 930:10246",
    route: "/profile-updated",
    locale: "es",
    description: "Ficha de cambios guardados en español, datos dinámicos de Bryan Lopez",
  },
];

/**
 * DemoScreenNavigator
 *
 * Dedicated client demo navigation helper.
 * Provides a discrete floating pill button allowing instant 1-tap switching
 * to any implemented screen in English or Spanish for QA reviewers.
 */
export const DemoScreenNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const insets = useSafeAreaInsets();

  const handleSelectScreen = async (screen: ScreenItem) => {
    if (getCurrentLocale() !== screen.locale) {
      await changeLocale(screen.locale);
    }
    setIsOpen(false);
    if (currentPath !== screen.route) {
      router.replace(screen.route as Href);
    }
  };

  return (
    <>
      {/* Floating Pill Trigger */}
      <View
        style={[styles.floatingTriggerContainer, { top: Math.max(insets.top, 10) + 4 }]}
        pointerEvents="box-none"
      >
        <Pressable
          style={({ pressed }) => [styles.floatingPill, pressed && styles.floatingPillPressed]}
          onPress={() => setIsOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Open demo screen navigator"
          hitSlop={8}
          testID="demo-screen-navigator-trigger"
        >
          <View style={styles.pillDot} />
          <Text style={styles.pillText}>QA Screens</Text>
        </Pressable>
      </View>

      {/* Screen Selector Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.backdropPressable}
            onPress={() => setIsOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close screen navigator"
          />

          <View
            style={[styles.sheetContainer, { paddingBottom: Math.max(insets.bottom, 16) + 12 }]}
          >
            {/* Grab handle */}
            <View style={styles.grabHandleContainer}>
              <View style={styles.grabHandle} />
            </View>

            {/* Title */}
            <View style={styles.header}>
              <View style={styles.badgeRow}>
                <View style={styles.statusDot} />
                <Text style={styles.badgeText}>CLIENT DEMO · FRONTEND ONLY</Text>
              </View>
              <Text style={styles.title}>Screen Navigator</Text>
              <Text style={styles.subtitle}>
                Tap any implemented screen to inspect its UI, layout, and language state.
              </Text>
            </View>

            {/* List */}
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {IMPLEMENTED_SCREENS.map((screen) => {
                const isActive =
                  currentPath === screen.route && getCurrentLocale() === screen.locale;

                return (
                  <Pressable
                    key={screen.id}
                    style={({ pressed }) => [
                      styles.screenItem,
                      isActive && styles.screenItemActive,
                      pressed && styles.screenItemPressed,
                    ]}
                    onPress={() => handleSelectScreen(screen)}
                    accessibilityRole="button"
                    accessibilityLabel={screen.name}
                    testID={`demo-nav-${screen.id}`}
                  >
                    <View style={styles.screenItemTop}>
                      <Text style={[styles.screenName, isActive && styles.screenNameActive]}>
                        {screen.name}
                      </Text>
                      <View style={styles.nodeBadge}>
                        <Text style={styles.nodeBadgeText}>{screen.figmaNode}</Text>
                      </View>
                    </View>
                    <Text style={styles.screenDescription}>{screen.description}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Close Button */}
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsOpen(false)}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.closeButtonText}>Close Navigator</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingTriggerContainer: {
    position: "absolute",
    right: 14,
    zIndex: 9999,
  },
  floatingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101614",
    borderWidth: 1,
    borderColor: colors.brand, // #BAFF42
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  floatingPillPressed: {
    opacity: 0.8,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  pillText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.brand,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.78)",
    justifyContent: "flex-end",
  },
  backdropPressable: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: colors.surface, // #151A19
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: "#35403B",
    paddingHorizontal: 20,
    paddingTop: 12,
    maxHeight: "82%",
  },
  grabHandleContainer: {
    alignItems: "center",
    paddingVertical: 4,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#35403B",
  },
  header: {
    marginTop: 8,
    marginBottom: spacing[3],
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  badgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
    letterSpacing: 0.6,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primaryText,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  scroll: {
    marginVertical: spacing[2],
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 10,
  },
  screenItem: {
    backgroundColor: colors.elevated, // #222827
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: radius.xl,
    padding: 14,
  },
  screenItemActive: {
    borderColor: colors.brand,
    backgroundColor: "#1A2520",
  },
  screenItemPressed: {
    opacity: 0.8,
  },
  screenItemTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  screenName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.primaryText,
    flex: 1,
  },
  screenNameActive: {
    color: colors.brand,
  },
  nodeBadge: {
    backgroundColor: "#101614",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#28342E",
  },
  nodeBadgeText: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: "#8FA397",
  },
  screenDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  closeButton: {
    backgroundColor: "#222827",
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: radius.xl,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing[2],
  },
  closeButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.secondaryText,
  },
});
