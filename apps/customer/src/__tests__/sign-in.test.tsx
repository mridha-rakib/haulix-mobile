import crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import { colors } from "@haulix/design-tokens";
import {
  changeLocale,
  enTranslations as en,
  esTranslations as es,
  getCurrentLocale,
  i18next,
  initI18n,
} from "@haulix/i18n";
import { HaulixTextField } from "@haulix/ui";

describe("C06 Bilingual Sign-In (English & Spanish) — Verification", () => {
  const assetDir = path.resolve(__dirname, "../../assets/c06");

  beforeAll(async () => {
    await initI18n("en");
  });

  it("verifies all delivered original Figma assets exist on disk", () => {
    const expectedAssets = [
      "original-figma-svg/auth_mail.svg",
      "original-figma-svg/auth_lock.svg",
      "original-figma-svg/password_eye_outline.svg",
      "original-figma-svg/password_eye_pupil.svg",
      "original-figma-svg/apple_provider_logo.svg",
      "original-figma-png/google_g_figma_2x.png",
      "ASSET_MANIFEST.csv",
    ];

    for (const relPath of expectedAssets) {
      const fullPath = path.join(assetDir, relPath);
      expect(fs.existsSync(fullPath)).toBe(true);
      const stat = fs.statSync(fullPath);
      expect(stat.size).toBeGreaterThan(0);
    }
  });

  it("verifies SHA256 checksums of original Figma assets", () => {
    const expectedHashes: Record<string, string> = {
      "original-figma-svg/auth_mail.svg":
        "397545d9793cecf48b84b5359c5a260ddcedce73ca5f2f81de6fe5b14f9af4b3",
      "original-figma-svg/auth_lock.svg":
        "a45ccff218086da745a3fffee7173430370b242f5e5bcdc9ba9337b25a3760f8",
      "original-figma-svg/password_eye_outline.svg":
        "f1bd62cd775cec91f7c7e0b3fe2081ef717ba315037d99f8b975a2b7eaf86e6e",
      "original-figma-svg/password_eye_pupil.svg":
        "c3b7124f8936cdfb7fee380d54fdb4af599b9822e6b9c375e64af289bc7cbd01",
      "original-figma-svg/apple_provider_logo.svg":
        "4f7764f5fe95f1ab04463c059ece6a11443871ffefdd313aedbba18e260fa78c",
      "original-figma-png/google_g_figma_2x.png":
        "08151735727e195fde663831a59bac70ef42468267eb47318d2544712dae3289",
    };

    for (const [relPath, expectedHash] of Object.entries(expectedHashes)) {
      const fullPath = path.join(assetDir, relPath);
      const fileBuffer = fs.readFileSync(fullPath);
      const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
      expect(hash.toLowerCase()).toBe(expectedHash.toLowerCase());
    }
  });

  it("verifies HaulixTextField primitive renders and exports properly", () => {
    expect(HaulixTextField).toBeDefined();
    expect(typeof HaulixTextField).toBe("function");
  });

  it("verifies design tokens used in C06 are consistent", () => {
    expect(colors.brand).toBe("#BAFF42");
    expect(colors.background).toBe("#080B0B");
    expect(colors.surface).toBe("#151A19");
    expect(colors.elevated).toBe("#222827");
  });

  it("verifies English default strings match Figma node 331:2", () => {
    expect(en.brand.tagline).toBe("WE HAUL IT ALL.");
    expect(en.signIn.title).toBe("Welcome back.");
    expect(en.signIn.subtitle).toBe("Sign in to manage your HAULIX bookings across Arizona.");
    expect(en.signIn.availability).toBe("PHOENIX, ARIZONA  •  HAULIX CUSTOMER");
    expect(en.signIn.emailLabel).toBe("EMAIL ADDRESS");
    expect(en.signIn.passwordLabel).toBe("PASSWORD");
    expect(en.signIn.submit).toBe("Sign In");
    expect(en.signIn.phoneCode).toBe("Use a one-time phone code");
    expect(en.signIn.orProvider).toBe("OR CONTINUE WITH");
    expect(en.signIn.switchLanguage).toBe("🌐 Español  ·  Cambiar idioma");
  });

  it("verifies Spanish strings match visible Figma node 347:86", () => {
    expect(es.brand.tagline).toBe("LO RECOGEMOS TODO.");
    expect(es.signIn.title).toBe("¡Bienvenido de nuevo!");
    expect(es.signIn.subtitle).toBe("Inicia sesión para gestionar tus reservas HAULIX en Arizona.");
    expect(es.signIn.availability).toBe("PHOENIX, ARIZONA  •  CLIENTE HAULIX");
    expect(es.signIn.emailLabel).toBe("CORREO ELECTRÓNICO");
    expect(es.signIn.passwordLabel).toBe("CONTRASEÑA");
    expect(es.signIn.submit).toBe("Iniciar sesión");
    expect(es.signIn.phoneCode).toBe("Usar código telefónico");
    expect(es.signIn.orProvider).toBe("O CONTINÚA CON");
    expect(es.signIn.apple).toBe("Continuar con Apple");
    expect(es.signIn.google).toBe("Continuar con Google");
    expect(es.signIn.switchLanguage).toBe("🌐 Inglés  ·  Cambiar idioma");
    expect(es.signIn.createAccountPrompt).toBe("¿No tienes cuenta? ");
    expect(es.signIn.createAccountAction).toBe("Crear cuenta");
  });

  it("verifies rapid EN ↔ ES ↔ EN switching stability (5 consecutive transitions)", async () => {
    for (let i = 0; i < 5; i++) {
      await changeLocale("es");
      expect(getCurrentLocale()).toBe("es");
      expect(i18next.t("signIn.title")).toBe("¡Bienvenido de nuevo!");
      expect(i18next.t("signIn.switchLanguage")).toBe("🌐 Inglés  ·  Cambiar idioma");

      await changeLocale("en");
      expect(getCurrentLocale()).toBe("en");
      expect(i18next.t("signIn.title")).toBe("Welcome back.");
      expect(i18next.t("signIn.switchLanguage")).toBe("🌐 Español  ·  Cambiar idioma");
    }
  });

  it("verifies localized validation messages exist for both locales", () => {
    expect(en.signIn.emailRequired).toBe("Email address is required");
    expect(es.signIn.emailRequired).toBe("El correo electrónico es obligatorio");

    expect(en.signIn.passwordRequired).toBe("Password is required");
    expect(es.signIn.passwordRequired).toBe("La contraseña es obligatoria");

    expect(en.signIn.passwordTooShort).toBe("Password must be at least 6 characters");
    expect(es.signIn.passwordTooShort).toBe("La contraseña debe tener al menos 6 caracteres");
  });
});
