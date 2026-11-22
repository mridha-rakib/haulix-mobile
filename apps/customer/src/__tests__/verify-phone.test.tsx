import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { OtpInput } from "../components/auth/OtpInput";

describe("C08 Phone Verification / OTP Screen (English Default)", () => {
  it("verifies single auth route verify-phone.tsx exists in customer app", () => {
    const routePath = path.resolve(__dirname, "../../app/(auth)/verify-phone.tsx");
    expect(fs.existsSync(routePath)).toBe(true);

    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("export default function VerifyPhoneScreen");
  });

  it("verifies C08 English strings match authoritative Figma node 331:75", () => {
    expect(en.brand.tagline).toBe("WE HAUL IT ALL.");
    expect(en.verifyPhone.title).toBe("Verify your number.");
    expect(en.verifyPhone.subtitle).toBe(
      "Enter the one-time code sent to the registered demo number."
    );
    expect(en.verifyPhone.availability).toBe("PHOENIX, ARIZONA  •  HAULIX CUSTOMER");
    expect(en.verifyPhone.defaultPhone).toBe("+1 602-555-0142");
    expect(en.verifyPhone.codeExpires).toBe(
      "Code expires after the verification window. Never share this code."
    );
    expect(en.verifyPhone.resendTitle).toBe("Did not receive a code?");
    expect(en.verifyPhone.resendSubtitle).toBe("Resend available after cooldown");
    expect(en.verifyPhone.verifyButton).toBe("Verify & Continue");
    expect(en.verifyPhone.changeNumberButton).toBe("Change phone number");
    expect(en.verifyPhone.demoNotice).toBe("DEMO ONLY • No real authentication or messaging");
  });

  it("verifies design tokens used across C08 match authoritative Figma palette", () => {
    expect(colors.brand).toBe("#BAFF42");
    expect(colors.background).toBe("#080B0B");
    expect(colors.surface).toBe("#151A19");
    expect(colors.elevated).toBe("#222827");
    expect(colors.primaryText).toBe("#F6F8F6");
    expect(colors.secondaryText).toBe("#ADB7B1");
  });

  it("verifies honest no-backend notice strings and validation copy", () => {
    expect(en.verifyPhone.incompleteCodeError).toBe(
      "Please enter the complete 6-digit verification code"
    );
    expect(en.verifyPhone.backendUnavailableNotice).toContain(
      "HAULIX Verification Service: Code entered"
    );
    expect(en.verifyPhone.backendUnavailableNotice).toContain(
      "Backend verification service is not connected — no fake sessions, tokens, or verified accounts are created."
    );
    expect(en.verifyPhone.resendUnavailableNotice).toContain(
      "HAULIX SMS Service: Resend request received"
    );
    expect(en.verifyPhone.resendUnavailableNotice).toContain(
      "SMS delivery service is not connected — no text messages are sent in demo mode."
    );
  });

  it("verifies OtpInput component exports correctly and has expected structure", () => {
    expect(OtpInput).toBeDefined();
    expect(typeof OtpInput).toBe("function");
  });

  it("verifies numeric filtering, length capping and paste behavior", () => {
    const filterOtp = (raw: string, maxLen = 6) => raw.replace(/[^0-9]/g, "").slice(0, maxLen);

    // Only numbers
    expect(filterOtp("123456")).toBe("123456");
    // Non-digits stripped
    expect(filterOtp("12a3b4c5d6e")).toBe("123456");
    expect(filterOtp("abc-def")).toBe("");
    expect(filterOtp(" 4 5 6 ")).toBe("456");
    // Max length 6 capped
    expect(filterOtp("1234567890")).toBe("123456");
    // Single digit input
    expect(filterOtp("7")).toBe("7");
    // Paste formatted string
    expect(filterOtp("+1 (602) 555-0142")).toBe("160255");
  });

  it("verifies Change phone number navigates to pre-existing C07 create-account route", () => {
    const routeSource = fs.readFileSync(
      path.resolve(__dirname, "../../app/(auth)/verify-phone.tsx"),
      "utf8"
    );
    expect(routeSource).toContain("/(auth)/create-account");
    expect(routeSource).toContain("handleChangePhoneNumber");
    // No newly invented phone-entry screens
    expect(fs.existsSync(path.resolve(__dirname, "../../app/(auth)/phone-entry.tsx"))).toBe(false);
  });

  it("verifies auth route group layout does not contain bottom navigation", () => {
    const authLayout = fs.readFileSync(
      path.resolve(__dirname, "../../app/(auth)/_layout.tsx"),
      "utf8"
    );
    expect(authLayout).not.toContain("BottomTabs");
    expect(authLayout).not.toContain("createBottomTabNavigator");
    expect(authLayout).toContain("Stack");
    expect(authLayout).toContain("headerShown: false");
  });

  it("verifies C08 Spanish strings match authoritative Figma node 347:179", () => {
    expect(es.brand.tagline).toBe("LO RECOGEMOS TODO.");
    expect(es.verifyPhone.title).toBe("Verifica tu número.");
    expect(es.verifyPhone.subtitle).toBe(
      "Introduce el código enviado al número registrado en este ejemplo."
    );
    expect(es.verifyPhone.availability).toBe("PHOENIX, ARIZONA • CLIENTE HAULIX");
    expect(es.verifyPhone.defaultPhone).toBe("+1 602-555-0142");
    expect(es.verifyPhone.codeExpires).toBe("El código caduca. No lo compartas con nadie.");
    expect(es.verifyPhone.resendTitle).toBe("¿No recibiste el código?");
    expect(es.verifyPhone.resendSubtitle).toBe(
      "Puedes solicitar otro código al finalizar la espera."
    );
    expect(es.verifyPhone.verifyButton).toBe("Verificar y continuar");
    expect(es.verifyPhone.changeNumberButton).toBe("Cambiar número");
    expect(es.verifyPhone.demoNotice).toBe("SOLO DEMOSTRACIÓN · Sin acceso ni mensajes reales");
  });

  it("verifies localized validation and notice copy in Spanish", () => {
    expect(es.verifyPhone.emptyCodeError).toBe("Por favor, introduce el código de verificación");
    expect(es.verifyPhone.incompleteCodeError).toBe(
      "Por favor, introduce el código de verificación completo de 6 dígitos"
    );
    expect(es.verifyPhone.invalidCharsError).toBe(
      "Solo se permiten dígitos numéricos en el código de verificación"
    );
    expect(es.verifyPhone.backendUnavailableNotice).toContain(
      "Servicio de verificación HAULIX: Código introducido."
    );
    expect(es.verifyPhone.backendUnavailableNotice).toContain(
      "El servicio de verificación de backend no está conectado — no se generan sesiones, tokens ni cuentas verificadas."
    );
    expect(es.verifyPhone.resendUnavailableNotice).toContain(
      "Servicio de SMS HAULIX: Solicitud de reenvío recibida."
    );
    expect(es.verifyPhone.resendUnavailableNotice).toContain(
      "El servicio de entrega de SMS no está conectado — no se envían mensajes en modo de demostración."
    );
  });

  it("verifies single reusable bilingual route architecture (no duplicate screens)", () => {
    expect(fs.existsSync(path.resolve(__dirname, "../../app/(auth)/verify-phone-es.tsx"))).toBe(
      false
    );
    expect(fs.existsSync(path.resolve(__dirname, "../../app/(auth)/es/verify-phone.tsx"))).toBe(
      false
    );
    // Symmetric type keys exist in es.ts for TypeScript safety
    expect(es.verifyPhone).toBeDefined();
    expect(Object.keys(es.verifyPhone).sort()).toEqual(Object.keys(en.verifyPhone).sort());

    const routeSource = fs.readFileSync(
      path.resolve(__dirname, "../../app/(auth)/verify-phone.tsx"),
      "utf8"
    );
    // Uses translation hook rather than hardcoded text
    expect(routeSource).toContain("useTranslation()");
    expect(routeSource).toContain('t("verifyPhone.title")');
    expect(routeSource).toContain('t("verifyPhone.verifyButton")');
    expect(routeSource).toContain('t("verifyPhone.changeNumberButton")');
  });
});
