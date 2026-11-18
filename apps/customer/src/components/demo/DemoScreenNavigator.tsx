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
  params?: Record<string, string>;
  locale: SupportedLocale;
  description: string;
}

const IMPLEMENTED_SCREENS: ScreenItem[] = [
  {
    id: "c19e-es",
    name: "C19-E · Corrección de Medidas (Español)",
    figmaNode: "Node 980:9388",
    route: "/edit-inventory-item",
    locale: "es",
    description: "W02 Edición manual de sofá de 3 plazas con guardado a borrador",
  },
  {
    id: "c19e-en",
    name: "C19-E · Manual Item Correction (English)",
    figmaNode: "Node 382:1306",
    route: "/edit-inventory-item",
    locale: "en",
    description: "W02 Manual item correction for 3-seat sofa with save to draft inventory",
  },
  {
    id: "c19a-es",
    name: "C19-A · Añadir Objeto Manualmente (Español)",
    figmaNode: "Node 980:9463",
    route: "/add-inventory-item",
    locale: "es",
    description: "W02 Añadir nuevo objeto manual (estantería) con variante de prueba",
  },
  {
    id: "c19a-en",
    name: "C19-A · Add Item Manually (English)",
    figmaNode: "Node 382:1365",
    route: "/add-inventory-item",
    locale: "en",
    description: "W02 Add manual item (wooden bookshelf) with separate test variation",
  },
  {
    id: "c19v-es",
    name: "C19-V · Validación de Medidas (Español)",
    figmaNode: "Node 980:9538",
    route: "/inventory-validation",
    locale: "es",
    description: "W02 Validación de medidas incompletas con aviso de acción necesaria",
  },
  {
    id: "c19v-en",
    name: "C19-V · Missing Dimensions Validation (English)",
    figmaNode: "Node 382:1424",
    route: "/inventory-validation",
    locale: "en",
    description: "W02 Incomplete measurements validation with action required warning",
  },
  {
    id: "c19p-es",
    name: "C19-P · Fotos de Objetos (Español)",
    figmaNode: "Node 980:9613",
    route: "/item-photos",
    locale: "es",
    description: "W02 Cuatro fotos de ejemplo adjuntas con opciones de reemplazo y fallo",
  },
  {
    id: "c19p-en",
    name: "C19-P · Item Photo Uploads (English)",
    figmaNode: "Node 382:1483",
    route: "/item-photos",
    locale: "en",
    description: "W02 Four genuine demo photo uploads with replacement and error notices",
  },
  {
    id: "c18re-es",
    name: "C18-R-E · Pedido Minorista Faltante (Español)",
    figmaNode: "Node 980:9247",
    route: "/retail-order-missing",
    locale: "es",
    description: "W02 Estado de error por falta de información de pedido en recogida comercial",
  },
  {
    id: "c18re-en",
    name: "C18-R-E · Retail Missing Order (English)",
    figmaNode: "Node 382:1197",
    route: "/retail-order-missing",
    locale: "en",
    description: "W02 Retail missing order error state with action required badge and guidance",
  },
  {
    id: "c19-es",
    name: "C19 · Lista de Objetos (Español)",
    figmaNode: "Node 980:9314",
    route: "/item-inventory",
    locale: "es",
    description: "W02 Revisión de inventario de 3 objetos con fotos y resumen antes de W03",
  },
  {
    id: "c19-en",
    name: "C19 · Item Inventory Review (English)",
    figmaNode: "Node 382:1248",
    route: "/item-inventory",
    locale: "en",
    description: "W02 Item inventory review with 3 declared items, genuine photos & summary",
  },
  {
    id: "c18a-es",
    name: "C18-A · Retiro de Electrodomésticos (Español)",
    figmaNode: "Node 977:9572",
    route: "/appliance-intake",
    locale: "es",
    description: "W02 Retiro de electrodomésticos en español con dimensiones, desconexión y CTAs",
  },
  {
    id: "c18a-en",
    name: "C18-A · Appliance Removal Intake (English)",
    figmaNode: "Node 387:177",
    route: "/appliance-intake",
    locale: "en",
    description: "W02 Appliance removal intake with washing machine specs, disconnect check & CTAs",
  },
  {
    id: "c18t-es",
    name: "C18-T · Retiro de Colchones (Español)",
    figmaNode: "Node 977:9685",
    route: "/mattress-intake",
    locale: "es",
    description: "W02 Retiro de colchones en español con dimensiones, cantidad, idoneidad y CTAs",
  },
  {
    id: "c18t-en",
    name: "C18-T · Mattress Removal Intake (English)",
    figmaNode: "Node 387:274",
    route: "/mattress-intake",
    locale: "en",
    description: "W02 Mattress removal intake with queen mattress specs, disposal check & CTAs",
  },
  {
    id: "c18j-es",
    name: "C18-J · Retiro de Chatarra (Español)",
    figmaNode: "Node 977:9100",
    route: "/junk-intake",
    locale: "es",
    description: "W02 Solicitud de retiro de chatarra en español con fotos de objetos y CTAs",
  },
  {
    id: "c18j-en",
    name: "C18-J · Junk Removal Intake (English)",
    figmaNode: "Node 382:805",
    route: "/junk-intake",
    locale: "en",
    description: "W02 Junk removal intake with genuine item photos, staging area & CTAs",
  },
  {
    id: "c18f-es",
    name: "C18-F · Muebles y Objetos Pesados (Español)",
    figmaNode: "Node 977:9286",
    route: "/bulky-item-intake",
    locale: "es",
    description: "W02 Retiro de muebles en español con selector de 4 niveles y especificaciones",
  },
  {
    id: "c18f-en",
    name: "C18-F · Furniture & Bulky Items (English)",
    figmaNode: "Node 382:959",
    route: "/bulky-item-intake",
    locale: "en",
    description: "W02 Furniture handling with 4 tier rows, inventory specs & CTAs",
  },
  {
    id: "c18g-es",
    name: "C18-G · Limpieza de Garaje (Español)",
    figmaNode: "Node 977:9399",
    route: "/garage-intake",
    locale: "es",
    description:
      "W02 Limpieza de garaje en español con alcance, acceso y exclusión de residuos peligrosos",
  },
  {
    id: "c18g-en",
    name: "C18-G · Garage Cleanout Intake (English)",
    figmaNode: "Node 382:1056",
    route: "/garage-intake",
    locale: "en",
    description: "W02 Garage intake with scope, access, hazardous material screening & CTAs",
  },
  {
    id: "c18r-es",
    name: "C18-R · Recogida en Tienda (Español)",
    figmaNode: "Node 977:9474",
    route: "/retail-intake",
    locale: "es",
    description:
      "W02 Recogida en tienda comercial en español con datos de pedido, entrega y aviso de API",
  },
  {
    id: "c18r-en",
    name: "C18-R · Retail Store Pickup (English)",
    figmaNode: "Node 382:1115",
    route: "/retail-intake",
    locale: "en",
    description: "W02 Store pickup with order authorization, delivery specs & API notice",
  },
  {
    id: "c18m-es",
    name: "C18-M · Solicitud de Mudanza (Español)",
    figmaNode: "Node 977:9192",
    route: "/moving-intake",
    locale: "es",
    description:
      "W02 Solicitud de mudanza en español con ruta, inventario, evaluación de carga/personal y CTAs",
  },
  {
    id: "c18m-en",
    name: "C18-M · Moving Service Intake (English)",
    figmaNode: "Node 382:881",
    route: "/moving-intake",
    locale: "en",
    description: "W02 Moving details with route, inventory, access, load/crew review & CTAs",
  },
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
    id: "c15-en",
    name: "C15 · Service Discovery (English)",
    figmaNode: "Node 382:126",
    route: "/service-discovery",
    locale: "en",
    description: "W02 Service discovery & intake with 7 categories and Arizona service area",
  },
  {
    id: "c15-es",
    name: "C15 · Seleccionar Servicio (Español)",
    figmaNode: "Node 974:8843",
    route: "/service-discovery",
    locale: "es",
    description: "C15 selección de servicio y zona de Phoenix en español con perfil Bryan Lopez",
  },
  {
    id: "c15s-en",
    name: "C15-S · Service Selected (English)",
    figmaNode: "Node 382:241",
    route: "/service-selected",
    locale: "en",
    description: "W02 Selected service card, booking steps, C16 notice & change service",
  },
  {
    id: "c15s-es",
    name: "C15-S · Servicio Elegido (Español)",
    figmaNode: "Node 974:8965",
    route: "/service-selected",
    locale: "es",
    description: "C15-S servicio elegido en español con perfil Bryan Lopez, pasos y aviso C16",
  },
  {
    id: "c16-en",
    name: "C16 · Service Area Eligibility (English)",
    figmaNode: "Node 382:323",
    route: "/service-area",
    locale: "en",
    description:
      "W02 Service area eligibility with pickup region, demo eligibility & 4 action CTAs",
  },
  {
    id: "c16-es",
    name: "C16 · Zona de Servicio (Español)",
    figmaNode: "Node 974:9079",
    route: "/service-area",
    locale: "es",
    description:
      "W02 Consulta tu zona de servicio con tarjeta de dirección, elegibilidad demo y 4 acciones",
  },
  {
    id: "c17-en",
    name: "C17 · Choose Pickup Address (English)",
    figmaNode: "Node 382:576",
    route: "/pickup-address",
    locale: "en",
    description: "W02 Choose pickup address with saved addresses, instructions, rule card & CTAs",
  },
  {
    id: "c17-es",
    name: "C17 · Dirección de Recogida (Español)",
    figmaNode: "Node 974:9412",
    route: "/pickup-address",
    locale: "es",
    description:
      "W02 Dirección de recogida en español con perfil Bryan Lopez, direcciones guardadas y 3 acciones",
  },
  {
    id: "c17-es-invalid",
    name: "C17 · Servicio No Válido (Español)",
    figmaNode: "Node 974:9412",
    route: "/pickup-address",
    params: { service: "commercial-freight" },
    locale: "es",
    description: "C17 con servicio no válido demostrando la reversión segura y el aviso honesto",
  },
  {
    id: "c17a-en",
    name: "C17-A · Add Pickup Location (English)",
    figmaNode: "Node 382:645",
    route: "/add-pickup-address",
    locale: "en",
    description: "W02 Add a pickup location with 6 editable form fields, validation & disclosures",
  },
  {
    id: "c17a-es",
    name: "C17-A · Añadir Punto de Recogida (Español)",
    figmaNode: "Node 974:9497",
    route: "/add-pickup-address",
    locale: "es",
    description:
      "W02 Añadir punto de recogida en español con 6 campos editables, perfil Bryan Lopez y validaciones",
  },
  {
    id: "c17v-en",
    name: "C17-V · Address Validation Error (English)",
    figmaNode: "Node 382:708",
    route: "/pickup-address-validation",
    locale: "en",
    description:
      "W02 Address validation incomplete state with action required alert, guidance & recovery CTAs",
  },
  {
    id: "c17v-es",
    name: "C17-V · Validación de Dirección (Español)",
    figmaNode: "Node 974:9576",
    route: "/pickup-address-validation",
    locale: "es",
    description:
      "W02 Validación de dirección en español con alerta, aviso de acción necesaria y recuperación",
  },
  {
    id: "c17d-en",
    name: "C17-D · Moving Destination (English)",
    figmaNode: "Node 382:744",
    route: "/moving-destination",
    locale: "en",
    description:
      "W02 Moving drop-off destination with pickup/dropoff cards, safe handling checks & CTAs",
  },
  {
    id: "c17d-es",
    name: "C17-D · Destino de Mudanza (Español)",
    figmaNode: "Node 974:9628",
    route: "/moving-destination",
    locale: "es",
    description:
      "W02 Destino de entrega de mudanza con tarjetas de recogida/entrega, revisión segura y CTAs",
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
    if (screen.params) {
      router.replace({
        pathname: screen.route as Href,
        params: screen.params,
      } as unknown as Href);
    } else {
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
