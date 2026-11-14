import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { c10DemoProfile, c10DemoProfileEs, getC10DemoProfile } from "../fixtures/c10DemoProfile";

describe("C10 Account Overview (English Default)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/account.tsx");
  const bottomNavPath = path.resolve(__dirname, "../components/navigation/CustomerBottomNav.tsx");

  it("verifies C10 account.tsx route exists in customer app", () => {
    expect(fs.existsSync(routePath)).toBe(true);

    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("export default function AccountOverviewScreen");
  });

  it("verifies C10 English strings match authoritative Figma node 333:26", () => {
    expect(en.account.title).toBe("My Account");
    expect(en.account.subtitle).toBe(
      "Manage your HAULIX customer profile and booking preferences."
    );
    expect(en.account.statusChip).toBe("SARAH MITCHELL · CUSTOMER ACCOUNT");
    expect(en.account.verifiedCustomerHeader).toBe("Verified customer");
    expect(en.account.customerLabel).toBe("Customer");
    expect(en.account.customerName).toBe("Sarah Mitchell");
    expect(en.account.emailLabel).toBe("Email");
    expect(en.account.emailValue).toBe("sarah.mitchell@example.test");
    expect(en.account.phoneLabel).toBe("Phone · verified");
    expect(en.account.phoneValue).toBe("+1 602-555-0142");
    expect(en.account.accountVerifiedStatus).toBe("Account verified · Arizona service area");
    expect(en.account.preferencesHeader).toBe("Account & preferences");
    expect(en.account.savedAddressLabel).toBe("Saved pickup address");
    expect(en.account.savedAddressValue).toBe("1234 E Example Lane, Phoenix");
    expect(en.account.languageLabel).toBe("Language");
    expect(en.account.languageValue).toBe("English (United States)");
    expect(en.account.paymentMethodsLabel).toBe("Payment methods");
    expect(en.account.paymentMethodsValue).toBe("TEST payment reference saved");
    expect(en.account.activeBookingLabel).toBe("Active booking");
    expect(en.account.activeBookingValue).toBe("HX-DEMO-1027 · Junk Removal");
    expect(en.account.signOut).toBe("↗ Sign out");
    expect(en.account.languageSwitch).toBe("🌐 Español · Cambiar idioma");
    expect(en.account.securityShortcutsHeader).toBe("SECURITY & PROFILE PHOTO");
    expect(en.account.changePassword).toBe("Change password");
    expect(en.account.profilePhoto).toBe("Profile photo · Add / change / remove");
    expect(en.account.editProfile).toBe("Edit Profile");
    expect(en.account.savedAddresses).toBe("Saved Addresses");
  });

  it("verifies C10 design tokens match authoritative Figma palette", () => {
    expect(colors.brand).toBe("#BAFF42");
    expect(colors.background).toBe("#080B0B");
    expect(colors.surface).toBe("#151A19");
    expect(colors.elevated).toBe("#222827");
    expect(colors.primaryText).toBe("#F6F8F6");
    expect(colors.secondaryText).toBe("#ADB7B1");
  });

  it("verifies unguarded frontend UI preview: no __DEV__ or auth gate blocks screen access", () => {
    const source = fs.readFileSync(routePath, "utf8");
    // Under revised owner policy, release APK testers can open the designed screen directly
    expect(source).not.toContain("if (!__DEV__)");
    expect(source).not.toContain("useAuthGuard");
    expect(source).not.toContain("requireAuth");
  });

  it("verifies Sarah Mitchell demo profile fixture is local mock data without auth tokens", () => {
    expect(c10DemoProfile.name).toBe("Sarah Mitchell");
    expect(c10DemoProfile.initials).toBe("SM");
    expect(c10DemoProfile.email).toBe("sarah.mitchell@example.test");
    expect(c10DemoProfile.phone).toBe("+1 602-555-0142");

    const source = fs.readFileSync(routePath, "utf8");
    // Verifies no fake auth sessions or credential storage
    expect(source).not.toContain("setToken");
    expect(source).not.toContain("login(");
    expect(source).not.toContain("fakeToken");
    expect(source).not.toContain("jwt");
  });

  it("verifies C10 navbar geometry policy: single safe-area inset and no double padding", () => {
    const source = fs.readFileSync(routePath, "utf8");
    // Outer HaulixSafeArea restricts edges to avoid duplicate bottom padding on Android
    expect(source).toContain('edges={["top", "left", "right"]}');

    const navSource = fs.readFileSync(bottomNavPath, "utf8");
    // CustomerBottomNav handles insets.bottom directly once
    expect(navSource).toContain("useSafeAreaInsets");
    expect(navSource).toContain("BASE_NAV_HEIGHT");
    expect(navSource).toContain("safeBottom = Math.max(insets.bottom, 0)");
    expect(navSource).toContain("height: totalNavHeight");
    expect(navSource).toContain("paddingBottom: safeBottom");
  });

  it("verifies C10 ProfilePhotoActionSheet integration with both open triggers", () => {
    const source = fs.readFileSync(routePath, "utf8");
    const sheetPath = path.resolve(__dirname, "../components/account/ProfilePhotoActionSheet.tsx");

    expect(fs.existsSync(sheetPath)).toBe(true);
    expect(source).toContain("ProfilePhotoActionSheet");
    expect(source).toContain("isPhotoSheetOpen");
    expect(source).toContain("setIsPhotoSheetOpen(true)");

    // Trigger 1: Tapping circular avatar
    expect(source).toContain('testID="c10-sm-avatar"');

    // Trigger 2: Tapping shortcut in Security & Profile Photo card
    expect(source).toContain('testID="c10-profile-photo-shortcut"');

    const sheetSource = fs.readFileSync(sheetPath, "utf8");
    expect(sheetSource).toContain('STORAGE_KEY_PROFILE_PHOTO = "haulix_c10_profile_photo"');
    expect(sheetSource).toContain("launchImageLibraryAsync");
    expect(sheetSource).toContain("launchCameraAsync");
    expect(sheetSource).toContain("requestCameraPermissionsAsync");
    expect(sheetSource).toContain('testID="c10-photo-gallery-btn"');
    expect(sheetSource).toContain('testID="c10-photo-camera-btn"');
    expect(sheetSource).toContain('testID="c10-photo-remove-btn"');
    expect(sheetSource).toContain('testID="c10-photo-save-btn"');
    expect(sheetSource).toContain('testID="c10-photo-confirm-remove-btn"');
  });

  it("verifies C10 authentic circular SM avatar and camera badge ARE present on C10", () => {
    const source = fs.readFileSync(routePath, "utf8");
    // Unlike C09, C10 has authentic SM avatar circle (72x72) and camera badge (21x21)
    expect(source).toContain('testID="c10-sm-avatar"');
    expect(source).toContain('testID="c10-camera-badge"');
    expect(source).toContain("c10DemoProfile.initials");
    expect(source).toContain("CameraBadgeIcon");
  });

  it("verifies original C01 sculpted bottom navbar is integrated with Account tab active", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("CustomerBottomNav");
    expect(source).toContain('activeTab="account"');

    const navSource = fs.readFileSync(bottomNavPath, "utf8");
    expect(navSource).toContain("NavSculptedCurve");
    expect(navSource).toContain("NavHomeIcon");
    expect(navSource).toContain("NavMyJobsIcon");
    expect(navSource).toContain("NavBookPlusIcon");
    expect(navSource).toContain("NavDealsIcon");
    expect(navSource).toContain("NavAccountActiveIcon");
  });

  it("verifies Deals tab is visual-only with notice per Figma documentation", () => {
    const navSource = fs.readFileSync(bottomNavPath, "utf8");
    expect(navSource).toContain("deals");
    expect(navSource).toContain("Deals: Concept preview in Figma library. Not an active route.");
  });

  it("verifies Sign-out navigates cleanly back to C06 Sign-in as a local frontend action", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("handleSignOut");
    expect(source).toContain('router.replace("/(auth)/sign-in")');
  });

  it("verifies auth route group (_layout.tsx) strictly excludes bottom navigation", () => {
    const authLayout = fs.readFileSync(
      path.resolve(__dirname, "../../app/(auth)/_layout.tsx"),
      "utf8"
    );
    expect(authLayout).not.toContain("CustomerBottomNav");
    expect(authLayout).not.toContain("BottomTabs");
    expect(authLayout).not.toContain("createBottomTabNavigator");
  });

  it("verifies C10 Spanish strings match authoritative Figma node 347:315", () => {
    expect(es.account.title).toBe("Mi cuenta");
    expect(es.account.subtitle).toBe("Administra tu perfil y tus preferencias de servicio.");
    expect(es.account.statusChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(es.account.verifiedCustomerHeader).toBe("Cliente verificado");
    expect(es.account.customerLabel).toBe("Cliente");
    expect(es.account.customerName).toBe("Bryan Lopez");
    expect(es.account.initials).toBe("BL");
    expect(es.account.emailLabel).toBe("Correo");
    expect(es.account.emailValue).toBe("bryan.lopez@example.test");
    expect(es.account.phoneLabel).toBe("Teléfono verificado");
    expect(es.account.phoneValue).toBe("+1 602-555-0142");
    expect(es.account.accountVerifiedStatus).toBe("Cuenta verificada · Zona de Arizona");
    expect(es.account.preferencesHeader).toBe("Cuenta y preferencias");
    expect(es.account.savedAddressLabel).toBe("Dirección de recogida");
    expect(es.account.savedAddressValue).toBe("1234 E Example Lane, Phoenix");
    expect(es.account.languageLabel).toBe("Idioma");
    expect(es.account.languageValue).toBe("Español (Estados Unidos)");
    expect(es.account.paymentMethodsLabel).toBe("Métodos de pago");
    expect(es.account.paymentMethodsValue).toBe("Referencia de prueba guardada");
    expect(es.account.activeBookingLabel).toBe("Reserva activa");
    expect(es.account.activeBookingValue).toBe("HX-DEMO-1027 · Retirada de objetos");
    expect(es.account.signOut).toBe("↗ Cerrar sesión");
    expect(es.account.languageSwitch).toBe("Español seleccionado · Cambiar a inglés");
    expect(es.account.securityShortcutsHeader).toBe("SEGURIDAD Y FOTO DE PERFIL");
    expect(es.account.changePassword).toBe("Cambiar contraseña");
    expect(es.account.profilePhoto).toBe("Foto · Añadir / cambiar / eliminar");
    expect(es.account.editProfile).toBe("Editar perfil");
    expect(es.account.savedAddresses).toBe("Direcciones guardadas");
  });

  it("verifies Bryan Lopez demo profile fixture for Spanish presentation", () => {
    expect(c10DemoProfileEs.name).toBe("Bryan Lopez");
    expect(c10DemoProfileEs.initials).toBe("BL");
    expect(c10DemoProfileEs.email).toBe("bryan.lopez@example.test");
    expect(c10DemoProfileEs.sessionChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(c10DemoProfileEs.statusBadge).toBe("Cliente verificado");

    // Locale-dependent fixture resolver
    expect(getC10DemoProfile("en").name).toBe("Sarah Mitchell");
    expect(getC10DemoProfile("en").initials).toBe("SM");
    expect(getC10DemoProfile("es").name).toBe("Bryan Lopez");
    expect(getC10DemoProfile("es").initials).toBe("BL");
  });

  it("verifies C10 Spanish navbar labels match Figma instance 965:10500", () => {
    expect(es.nav.home).toBe("Inicio");
    expect(es.nav.myJobs).toBe("Mis trabajos");
    expect(es.nav.book).toBe("Reservar");
    expect(es.nav.deals).toBe("Ofertas");
    expect(es.nav.account).toBe("Cuenta");

    const navSource = fs.readFileSync(bottomNavPath, "utf8");
    // Verifies localized tabs are hooked via useTranslation
    expect(navSource).toContain('t("nav.home")');
    expect(navSource).toContain('t("nav.myJobs")');
    expect(navSource).toContain('t("nav.book")');
    expect(navSource).toContain('t("nav.deals")');
    expect(navSource).toContain('t("nav.account")');
  });

  it("verifies ProfilePhotoActionSheet supports localized Spanish strings", () => {
    expect(es.photo.title).toBe("Foto de perfil");
    expect(es.photo.chooseGallery).toBe("Elegir de la galería");
    expect(es.photo.takePhoto).toBe("Tomar foto");
    expect(es.photo.changeGallery).toBe("Cambiar desde la galería");
    expect(es.photo.takeNewPhoto).toBe("Tomar otra foto");
    expect(es.photo.remove).toBe("Eliminar foto");
    expect(es.photo.save).toBe("Guardar foto");
    expect(es.photo.cancel).toBe("Cancelar");
    expect(es.photo.removeConfirmTitle).toBe("¿Eliminar la foto de perfil?");
    expect(es.photo.confirmRemove).toBe("Eliminar");
    expect(es.photo.keep).toBe("Conservar foto");

    const sheetPath = path.resolve(__dirname, "../components/account/ProfilePhotoActionSheet.tsx");
    const sheetSource = fs.readFileSync(sheetPath, "utf8");
    expect(sheetSource).toContain('t("photo.removeConfirmTitle")');
    expect(sheetSource).toContain('t("photo.title")');
    expect(sheetSource).toContain('t("photo.chooseGallery")');
    expect(sheetSource).toContain('t("photo.save")');
  });

  it("verifies in-app language switch toggles between English and Spanish without route navigation", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("handleLanguageSwitch");
    expect(source).toContain("changeLocale(nextLocale)");
    expect(source).toContain('testID="c10-language-switch"');
  });
});
