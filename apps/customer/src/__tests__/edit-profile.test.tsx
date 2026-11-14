import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
  c10DemoProfile,
  c10DemoProfileEs,
  computeInitials,
  getC10DemoProfile,
  getEnProfileEdits,
  getEsProfileEdits,
  resetEnProfileEdits,
  resetEsProfileEdits,
  resetProfileEdits,
  saveEnProfileEdits,
  saveEsProfileEdits,
  saveProfileEdits,
} from "../fixtures/c10DemoProfile";

describe("C10-E Edit Profile (Spanish Localization & English Regression) — Figma Nodes 333:116 & 347:315", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/edit-profile.tsx");
  const accountRoutePath = path.resolve(__dirname, "../../app/(app)/account.tsx");

  beforeEach(async () => {
    await resetProfileEdits();
  });

  afterAll(async () => {
    await resetProfileEdits();
  });

  it("verifies single shared C10-E edit-profile.tsx route is reused (no separate Spanish route)", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    // Confirm no separate edit-profile-es.tsx or edit-profile.es.tsx was created
    expect(fs.existsSync(path.resolve(__dirname, "../../app/(app)/edit-profile-es.tsx"))).toBe(
      false
    );
    expect(fs.existsSync(path.resolve(__dirname, "../../app/(app)/edit-profile.es.tsx"))).toBe(
      false
    );

    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("export default function EditProfileScreen");
    expect(source).toContain("useTranslation");
    expect(source).toContain("getCurrentLocale");
  });

  it("verifies exact C10-E English strings match authoritative Figma node 333:116", () => {
    expect(en.editProfile.screenTitle).toBe("Edit profile");
    expect(en.editProfile.screenDescription).toBe(
      "Only customer-owned contact details can be edited here."
    );
    expect(en.editProfile.customerAccountBadge).toBe("SARAH MITCHELL  ·  CUSTOMER ACCOUNT");
    expect(en.editProfile.cardTitle).toBe("Profile information");
    expect(en.editProfile.labelFullName).toBe("FULL NAME");
    expect(en.editProfile.defaultFullName).toBe("Sarah Mitchell");
    expect(en.editProfile.labelEmail).toBe("EMAIL");
    expect(en.editProfile.defaultEmail).toBe("sarah.mitchell@example.test");
    expect(en.editProfile.labelPhone).toBe("PHONE");
    expect(en.editProfile.defaultPhone).toBe("+1 602-555-0142");
    expect(en.editProfile.phoneGuidance).toBe(
      "Phone changes require successful verification before use."
    );
    expect(en.editProfile.saveChanges).toBe("Save Changes");
    expect(en.editProfile.cancelEditing).toBe("Cancel Editing");
  });

  it("verifies exact C10-E Spanish strings match translation mapping (C10E_ES_TRANSLATIONS.csv)", () => {
    expect(es.editProfile.screenTitle).toBe("Editar perfil");
    expect(es.editProfile.title).toBe("Editar perfil");
    expect(es.editProfile.screenDescription).toBe("Aquí solo puedes editar tus datos de contacto.");
    expect(es.editProfile.subtitle).toBe("Aquí solo puedes editar tus datos de contacto.");
    expect(es.editProfile.customerAccountBadge).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(es.editProfile.accountChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
    expect(es.editProfile.cardTitle).toBe("Información del perfil");
    expect(es.editProfile.labelFullName).toBe("NOMBRE COMPLETO");
    expect(es.editProfile.fullNameLabel).toBe("NOMBRE COMPLETO");
    expect(es.editProfile.defaultFullName).toBe("Bryan Lopez");
    expect(es.editProfile.defaultName).toBe("Bryan Lopez");
    expect(es.editProfile.labelEmail).toBe("CORREO ELECTRÓNICO");
    expect(es.editProfile.emailLabel).toBe("CORREO ELECTRÓNICO");
    expect(es.editProfile.defaultEmail).toBe("bryan.lopez@example.test");
    expect(es.editProfile.labelPhone).toBe("TELÉFONO");
    expect(es.editProfile.phoneLabel).toBe("TELÉFONO");
    expect(es.editProfile.defaultPhone).toBe("+1 602-555-0142");
    expect(es.editProfile.phoneGuidance).toBe(
      "Los cambios de número de teléfono requieren verificación antes de usarse."
    );
    expect(es.editProfile.phoneHelp).toBe(
      "Los cambios de número de teléfono requieren verificación antes de usarse."
    );
    expect(es.editProfile.saveChanges).toBe("Guardar cambios");
    expect(es.editProfile.save).toBe("Guardar cambios");
    expect(es.editProfile.cancelEditing).toBe("Cancelar edición");
    expect(es.editProfile.cancel).toBe("Cancelar edición");
  });

  it("verifies Spanish validation and error messages in i18n", () => {
    expect(es.editProfile.errorNameRequired).toBe("El nombre completo es obligatorio.");
    expect(es.editProfile.requiredName).toBe("El nombre completo es obligatorio.");
    expect(es.editProfile.errorEmailInvalid).toBe(
      "Introduce una dirección de correo electrónico válida."
    );
    expect(es.editProfile.invalidEmail).toBe(
      "Introduce una dirección de correo electrónico válida."
    );
    expect(es.editProfile.errorPhoneInvalid).toBe("Introduce un número de teléfono válido.");
    expect(es.editProfile.invalidPhone).toBe("Introduce un número de teléfono válido.");
    expect(es.editProfile.phonePendingVerificationNotice).toBe(
      "Los cambios de teléfono requieren verificación. La verificación por SMS no está conectada en esta demostración de frontend."
    );
    expect(es.editProfile.savedLocallyNotice).toBe(
      "Guardado localmente para la vista previa del frontend."
    );
    expect(es.editProfile.noChangesNotice).toBe("No hay cambios para guardar.");
    expect(es.editProfile.restoreOriginalPhone).toBe("Restaurar el teléfono original");
    expect(es.editProfile.cancelDiscardChanges).toBe("¿Descartar los cambios sin guardar?");
    expect(es.editProfile.discardChanges).toBe("Descartar cambios");
    expect(es.editProfile.keepEditing).toBe("Seguir editando");
  });

  it("verifies computeInitials and dual-locale saveProfileEdits / resetProfileEdits", async () => {
    expect(computeInitials("Bryan Lopez")).toBe("BL");
    expect(computeInitials("Sarah Mitchell")).toBe("SM");

    await saveProfileEdits("en", { name: "Sarah Test", initials: "ST" });
    expect(getEnProfileEdits()?.name).toBe("Sarah Test");
    await resetEnProfileEdits();
    expect(getEnProfileEdits()).toBeNull();
  });

  it("verifies initial baseline profile for Spanish Bryan Lopez fixture", () => {
    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
    expect(esProfile.email).toBe("bryan.lopez@example.test");
    expect(esProfile.phone).toBe("+1 602-555-0142");
    expect(esProfile.initials).toBe("BL");
    expect(esProfile.isPhoneVerified).toBe(true);
    expect(esProfile.sessionChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
  });

  it("verifies initial baseline profile for English Sarah Mitchell fixture", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe(c10DemoProfile.name);
    expect(enProfile.email).toBe(c10DemoProfile.email);
    expect(enProfile.phone).toBe(c10DemoProfile.phone);
    expect(enProfile.initials).toBe(c10DemoProfile.initials);
    expect(enProfile.isPhoneVerified).toBe(true);
    expect(enProfile.sessionChip).toBe("SARAH MITCHELL · CUSTOMER ACCOUNT");
  });

  it("verifies saving Spanish edits updates ONLY the Spanish preview without affecting English Sarah Mitchell", async () => {
    await saveEsProfileEdits({
      name: "Bryan Lopez Ramirez",
      email: "bryan.ramirez@example.test",
      initials: "BR",
    });

    // Check Spanish updated
    const updatedEs = getC10DemoProfile("es");
    expect(updatedEs.name).toBe("Bryan Lopez Ramirez");
    expect(updatedEs.email).toBe("bryan.ramirez@example.test");
    expect(updatedEs.initials).toBe("BR");
    expect(updatedEs.sessionChip).toBe("BRYAN LOPEZ RAMIREZ  ·  CUENTA DE CLIENTE");

    // Check English remains untouched
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");
    expect(enProfile.email).toBe("sarah.mitchell@example.test");
    expect(enProfile.initials).toBe("SM");
    expect(enProfile.sessionChip).toBe("SARAH MITCHELL · CUSTOMER ACCOUNT");
  });

  it("verifies saving English edits updates ONLY English preview without affecting Spanish Bryan Lopez", async () => {
    await saveEnProfileEdits({
      name: "Sarah Jenkins",
      email: "sarah.jenkins@example.test",
      initials: "SJ",
    });

    // Check English updated
    const updatedEn = getC10DemoProfile("en");
    expect(updatedEn.name).toBe("Sarah Jenkins");
    expect(updatedEn.email).toBe("sarah.jenkins@example.test");
    expect(updatedEn.initials).toBe("SJ");
    expect(updatedEn.sessionChip).toBe("SARAH JENKINS · CUSTOMER ACCOUNT");

    // Check Spanish remains untouched
    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
    expect(esProfile.email).toBe("bryan.lopez@example.test");
    expect(esProfile.initials).toBe("BL");
    expect(esProfile.sessionChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
  });

  it("verifies resetting Spanish edits restores Bryan Lopez fixture", async () => {
    await saveEsProfileEdits({
      name: "Temporary Edit",
      email: "temp@example.test",
    });
    expect(getEsProfileEdits()?.name).toBe("Temporary Edit");

    await resetEsProfileEdits();
    expect(getEsProfileEdits()).toBeNull();

    const restoredEs = getC10DemoProfile("es");
    expect(restoredEs.name).toBe(c10DemoProfileEs.name);
    expect(restoredEs.email).toBe(c10DemoProfileEs.email);
    expect(restoredEs.initials).toBe("BL");
  });

  it("verifies changing phone in edits marks isPhoneVerified as false honestly", async () => {
    await saveEsProfileEdits({
      name: "Bryan Lopez",
      phone: "+1 602-555-9999",
      isPhoneVerified: false,
    });

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.phone).toBe("+1 602-555-9999");
    expect(esProfile.isPhoneVerified).toBe(false);
  });

  it("verifies C10 Account Overview connects to shared C10-E via Edit Profile button in Spanish", () => {
    const accountSource = fs.readFileSync(accountRoutePath, "utf8");
    expect(accountSource).toContain('router.push("/(app)/edit-profile")');
    expect(accountSource).toContain('label={t("account.editProfile")}');
    expect(es.account.editProfile).toBe("Editar perfil");
  });

  it("verifies C10-E reuses shared CustomerBottomNav with activeTab='account'", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("<CustomerBottomNav");
    expect(source).toContain('activeTab="account"');
  });

  it("verifies C10-E design tokens match authoritative Figma palette", () => {
    expect(colors.brand).toBe("#BAFF42");
    expect(colors.background).toBe("#080B0B");
    expect(colors.surface).toBe("#151A19");
    expect(colors.elevated).toBe("#222827");
    expect(colors.primaryText).toBe("#F6F8F6");
    expect(colors.secondaryText).toBe("#ADB7B1");
  });

  it("verifies unguarded frontend preview: no __DEV__ or login gate blocks C10-E", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).not.toContain("if (!__DEV__)");
    expect(source).not.toContain("isAuthenticated");
  });

  it("verifies input testIDs for QA automation are defined", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain('testID="c10e-input-name"');
    expect(source).toContain('testID="c10e-input-email"');
    expect(source).toContain('testID="c10e-input-phone"');
    expect(source).toContain('testID="c10e-save-btn"');
    expect(source).toContain('testID="c10e-cancel-btn"');
    expect(source).toContain('testID="c10e-header-back"');
    expect(source).toContain('testID="c10e-phone-restore-btn"');
  });
});
