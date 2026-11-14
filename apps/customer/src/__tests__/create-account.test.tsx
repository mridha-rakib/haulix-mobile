import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { HaulixTextField } from "@haulix/ui";

describe("C07 Create Account Screen & Asset Integrity", () => {
  it("verifies original Figma C07 asset files exist and match official SHA256 checksums", () => {
    const assetDir = path.resolve(__dirname, "../../assets/c07");

    const expectedHashes: Record<string, string> = {
      "original-figma-svg/c07_user.svg":
        "82389bbf60801b738c1fbcc068973f541be59b9fde780a8cbc5f3c3939aa3498",
      "original-figma-svg/c07_phone.svg":
        "8d1aa94381b8a641cc6331eda37e0cf878cfa13031a75b1cb2d6b0541f4ec2ce",
    };

    for (const [relPath, expectedHash] of Object.entries(expectedHashes)) {
      const fullPath = path.join(assetDir, relPath);
      expect(fs.existsSync(fullPath)).toBe(true);
      const fileBuffer = fs.readFileSync(fullPath);
      const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
      expect(hash.toLowerCase()).toBe(expectedHash.toLowerCase());
    }
  });

  it("verifies C07 SVG asset contents are valid vector paths", () => {
    const assetDir = path.resolve(__dirname, "../../assets/c07");
    const userSvg = fs.readFileSync(path.join(assetDir, "original-figma-svg/c07_user.svg"), "utf8");
    const phoneSvg = fs.readFileSync(
      path.join(assetDir, "original-figma-svg/c07_phone.svg"),
      "utf8"
    );

    expect(userSvg).toContain('<svg width="24" height="24"');
    expect(userSvg).toContain("M12 4C7 4 7 12 12 12C17 12 17 4 12 4Z");
    expect(phoneSvg).toContain('<svg width="24" height="24"');
    expect(phoneSvg).toContain("M7 3H17V21H7V3Z");
  });

  it("verifies HaulixTextField primitive is available for form fields", () => {
    expect(HaulixTextField).toBeDefined();
    expect(typeof HaulixTextField).toBe("function");
  });

  it("verifies C07 English strings match authoritative Figma node 331:35", () => {
    expect(en.createAccount.step1).toBe("1  ACCOUNT DETAILS");
    expect(en.createAccount.step2).toBe("2  PHONE VERIFICATION");
    expect(en.createAccount.title).toBe("Your next haul starts here.");
    expect(en.createAccount.subtitle).toBe(
      "Create an account for booking updates, receipts, and verified service history."
    );
    expect(en.createAccount.availability).toBe("PHOENIX, ARIZONA  •  HAULIX CUSTOMER");
    expect(en.createAccount.nameLabel).toBe("FULL NAME");
    expect(en.createAccount.namePlaceholder).toBe("Bryan Lopez");
    expect(en.createAccount.emailLabel).toBe("EMAIL ADDRESS");
    expect(en.createAccount.emailPlaceholder).toBe("bryan.lopez@example.test");
    expect(en.createAccount.phoneLabel).toBe("PHONE NUMBER");
    expect(en.createAccount.phonePlaceholder).toBe("+1 602-555-0142");
    expect(en.createAccount.passwordLabel).toBe("PASSWORD");
    expect(en.createAccount.passwordPlaceholder).toBe("Enter a secure password");
    expect(en.createAccount.passwordGuidance).toBe(
      "Choose a secure password. Requirements are checked when you continue."
    );
    expect(en.createAccount.consentPrefix).toBe("I have read the following:");
    expect(en.createAccount.terms).toBe("Terms");
    expect(en.createAccount.privacyPolicy).toBe("Privacy Policy");
    expect(en.createAccount.nextStepHint).toBe(
      "Next: verify your phone number to complete registration."
    );
    expect(en.createAccount.submit).toBe("Create Account");
    expect(en.createAccount.alreadyHaveAccount).toBe("Already have an account? Sign in");
    expect(en.createAccount.orProvider).toBe("OR CONTINUE WITH");
    expect(en.createAccount.apple).toBe("Continue with Apple");
    expect(en.createAccount.google).toBe("Continue with Google");
    expect(en.createAccount.switchLanguage).toBe("🌐 Español  ·  Cambiar idioma");
  });

  it("verifies form validation rules and error message strings", () => {
    expect(en.createAccount.nameRequired).toBe("Full name is required");
    expect(en.createAccount.emailRequired).toBe("Email address is required");
    expect(en.createAccount.emailInvalid).toBe("Please enter a valid email address");
    expect(en.createAccount.phoneRequired).toBe("Phone number is required");
    expect(en.createAccount.phoneInvalid).toBe("Please enter a valid phone number");
    expect(en.createAccount.passwordRequired).toBe("Password is required");
    expect(en.createAccount.passwordTooShort).toBe("Password must be at least 6 characters");
    expect(en.createAccount.consentRequired).toBe(
      "You must accept the Terms and Privacy Policy to continue"
    );
  });

  it("verifies honest non-success notices for unintegrated backend services", () => {
    expect(en.createAccount.authNotice).toContain(
      "HAULIX Auth Service: Valid registration details entered"
    );
    expect(en.createAccount.authNotice).toContain(
      "Backend registration and SMS OTP service are not connected"
    );
    expect(en.createAccount.termsNotice).toBe("Terms of Service document is pending publication.");
    expect(en.createAccount.privacyNotice).toBe("Privacy Policy document is pending publication.");
    expect(en.createAccount.spanishPendingNotice).toBe(
      "Spanish localization for Create Account (C07) will be available in Phase 02.4."
    );
  });

  it("verifies design tokens used across C07", () => {
    expect(colors.brand).toBe("#BAFF42");
    expect(colors.background).toBe("#080B0B");
    expect(colors.surface).toBe("#151A19");
    expect(colors.elevated).toBe("#222827");
  });

  it("verifies C07 Spanish translations match authoritative Figma node 347:130", () => {
    expect(es.createAccount.step1).toBe("1  DATOS DE CUENTA");
    expect(es.createAccount.step2).toBe("2  VERIFICAR TELÉFONO");
    expect(es.createAccount.title).toBe("Tu servicio empieza aquí.");
    expect(es.createAccount.subtitle).toBe(
      "Crea tu cuenta para gestionar reservas, recibos y tu historial de servicios."
    );
    expect(es.createAccount.availability).toBe("PHOENIX, ARIZONA  •  CLIENTE HAULIX");
    expect(es.createAccount.nameLabel).toBe("NOMBRE COMPLETO");
    expect(es.createAccount.emailLabel).toBe("CORREO ELECTRÓNICO");
    expect(es.createAccount.phoneLabel).toBe("NÚMERO DE TELÉFONO");
    expect(es.createAccount.passwordLabel).toBe("CONTRASEÑA");
    expect(es.createAccount.passwordPlaceholder).toBe("Introduce una contraseña segura");
    expect(es.createAccount.submit).toBe("Crear cuenta");
    expect(es.createAccount.alreadyHaveAccount).toBe("¿Ya tienes cuenta? Iniciar sesión");
    expect(es.createAccount.switchLanguage).toBe("🌐 Inglés  ·  Cambiar idioma");
  });

  it("verifies no QA fixture or dev prefill buttons are present in production create-account.tsx", () => {
    const screenSource = fs.readFileSync(
      path.resolve(__dirname, "../../app/(auth)/create-account.tsx"),
      "utf8"
    );
    expect(screenSource).not.toContain("Prefill Figma Fixture");
    expect(screenSource).not.toContain("devContainer");
    expect(screenSource).not.toContain("FILL FIGMA FIXTURE");
  });
});
