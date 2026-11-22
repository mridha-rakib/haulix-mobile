import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("Phase 03.47C — Removal of All Frontend Navigation Guards & Auth-to-Home Demo Flow", () => {
  const customerAppDir = path.resolve(__dirname, "../../app");

  // 1. Sign In primary CTA opens C01 Home in Preview
  it("verifies Sign In primary CTA navigates directly to C01 Customer Home (/(app))", () => {
    const signInSource = fs.readFileSync(path.join(customerAppDir, "(auth)/sign-in.tsx"), "utf8");
    expect(signInSource).toContain('router.replace("/(app)")');
    expect(signInSource).not.toContain('router.replace("/")');
  });

  // 2. Sign In does not create fake sessions
  it("verifies Sign In does not create fake sessions, tokens, or mock auth credentials", () => {
    const signInSource = fs.readFileSync(path.join(customerAppDir, "(auth)/sign-in.tsx"), "utf8");
    expect(signInSource).not.toContain("fakeToken");
    expect(signInSource).not.toContain("setToken");
    expect(signInSource).not.toContain("mockSession");
    expect(signInSource).not.toContain("SecureStore.setItemAsync('token'");
  });

  // 3. Create Account opens C08 Phone Verification in demo mode
  it("verifies Create Account primary CTA navigates to C08 Phone Verification without blocking guards", () => {
    const createAccountSource = fs.readFileSync(
      path.join(customerAppDir, "(auth)/create-account.tsx"),
      "utf8"
    );
    expect(createAccountSource).toContain('pathname: "/(auth)/verify-phone"');
    // Button is not disabled by consent checkbox
    expect(createAccountSource).not.toContain("disabled={!isConsentChecked}");
    expect(createAccountSource).not.toContain(
      "accessibilityState={{ disabled: !isConsentChecked }}"
    );
  });

  // 4. OTP screen allows demo continuation without real SMS
  it("verifies Phone Verification allows demo continuation without requiring a 6-digit OTP", () => {
    const verifyPhoneSource = fs.readFileSync(
      path.join(customerAppDir, "(auth)/verify-phone.tsx"),
      "utf8"
    );
    expect(verifyPhoneSource).toContain('router.push("/(app)/account")');
    // Does not guard handleVerify with empty code or code length check
    const handleVerifyMatch = verifyPhoneSource.match(/const handleVerify = \(\) => {([\s\S]*?)};/);
    expect(handleVerifyMatch).toBeTruthy();
    const handleVerifyBody = handleVerifyMatch ? handleVerifyMatch[1] : "";
    expect(handleVerifyBody).not.toContain("otp.length === 0");
    expect(handleVerifyBody).not.toContain("otp.length < 6");
  });

  // 5. OTP continuation opens C10 Account Overview
  it("verifies Phone Verification advances to C10 Account Overview", () => {
    const verifyPhoneSource = fs.readFileSync(
      path.join(customerAppDir, "(auth)/verify-phone.tsx"),
      "utf8"
    );
    expect(verifyPhoneSource).toContain('router.push("/(app)/account")');
  });

  // 6. Account Overview allows navigation to Home
  it("verifies Account Overview header back button and bottom nav navigate to Home (/(app))", () => {
    const accountSource = fs.readFileSync(path.join(customerAppDir, "(app)/account.tsx"), "utf8");
    expect(accountSource).toContain('router.replace("/(app)")');
    const bottomNavSource = fs.readFileSync(
      path.resolve(__dirname, "../components/navigation/CustomerBottomNav.tsx"),
      "utf8"
    );
    expect(bottomNavSource).toContain('home: "/(app)"');
  });

  // 7. Social Return opens Account Overview
  it("verifies Social Return screen navigates to Account Overview (primary) and Sign In (secondary)", () => {
    const socialReturnSource = fs.readFileSync(
      path.join(customerAppDir, "(auth)/social-return.tsx"),
      "utf8"
    );
    expect(socialReturnSource).toContain('router.push("/(app)/account")');
    expect(socialReturnSource).toContain('router.replace("/(auth)/sign-in")');
  });

  // 8. All auth screens remain directly accessible
  it("verifies all four auth screens exist and have no route guards", () => {
    const authScreens = [
      "sign-in.tsx",
      "create-account.tsx",
      "verify-phone.tsx",
      "social-return.tsx",
    ];
    for (const screen of authScreens) {
      const fullPath = path.join(customerAppDir, "(auth)", screen);
      expect(fs.existsSync(fullPath)).toBe(true);
      const content = fs.readFileSync(fullPath, "utf8");
      expect(content).not.toContain("isAuthenticated");
      expect(content).not.toContain("useAuthGuard");
    }
  });

  // 9. Home is accessible without authentication
  it("verifies Customer Home screen has no session or authentication prerequisites", () => {
    const homeSource = fs.readFileSync(path.join(customerAppDir, "(app)/index.tsx"), "utf8");
    expect(homeSource).not.toContain("isAuthenticated");
    expect(homeSource).not.toContain("requireAuth");
    expect(homeSource).not.toContain("checkSession");
  });

  // 10. QA Navigator opens Home directly
  it("verifies DemoScreenNavigator registers Customer Home directly", () => {
    const navSource = fs.readFileSync(
      path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx"),
      "utf8"
    );
    expect(navSource).toContain('route: "/(app)"');
    expect(navSource).toContain('name: "C01 · Home & Services (English)"');
  });

  // 11. All implemented W01–W05 routes are accessible
  it("verifies comprehensive W01-W05 coverage in DemoScreenNavigator", () => {
    const navSource = fs.readFileSync(
      path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx"),
      "utf8"
    );
    const keyRoutes = [
      "/(app)",
      "/account",
      "/service-discovery",
      "/itemized-quote",
      "/choose-service-time",
      "/choose-payment-method",
      "/searching-for-driver",
      "/search-expanded-20mi",
      "/search-expanding-30mi",
      "/search-expanded-40mi",
      "/search-expanded-50mi",
      "/driver-matched",
      "/crew-tracking",
      "/driver-arrival-update",
      "/driver-reassigned",
      "/no-driver-available",
      "/no-eligible-driver",
      "/no-driver-fee-free-cancellation",
      "/request-canceled",
    ];
    for (const route of keyRoutes) {
      expect(navSource).toContain(`route: "${route}"`);
    }
  });

  // 12. No redirect sends the user unexpectedly back to Sign In
  it("verifies booking completion and confirmation screens navigate to Home (/(app)) not root (/)", () => {
    const checkFiles = [
      "asap-request-recorded.tsx",
      "booking-not-confirmed.tsx",
      "booking-recorded.tsx",
      "cancellation-windows.tsx",
      "checking-booking-status.tsx",
    ];
    for (const file of checkFiles) {
      const fullPath = path.join(customerAppDir, "(app)", file);
      const content = fs.readFileSync(fullPath, "utf8");
      expect(content).toContain('router.push("/(app)")');
      expect(content).not.toContain('router.push("/")');
    }
  });

  // 13. English and Spanish navigation both work
  it("verifies bilingual translation coverage for auth and navigation strings", () => {
    expect(en.signIn.submit).toBe("Sign In");
    expect(es.signIn.submit).toBe("Iniciar sesión");
    expect(en.createAccount.submit).toBe("Create Account");
    expect(es.createAccount.submit).toBe("Crear cuenta");
    expect(en.verifyPhone.verifyButton).toBe("Verify & Continue");
    expect(es.verifyPhone.verifyButton).toBe("Verificar y continuar");
    expect(en.socialReturn.primaryAction).toBe("Go to My Account");
    expect(es.socialReturn.primaryAction).toBe("Ir a mi cuenta");
  });

  // 14. Registration inputs remain visually functional
  it("verifies registration input fields and icons remain present in create-account.tsx", () => {
    const createAccountSource = fs.readFileSync(
      path.join(customerAppDir, "(auth)/create-account.tsx"),
      "utf8"
    );
    expect(createAccountSource).toContain("AuthUserIcon");
    expect(createAccountSource).toContain("AuthMailIcon");
    expect(createAccountSource).toContain("AuthPhoneIcon");
    expect(createAccountSource).toContain("AuthLockIcon");
    expect(createAccountSource).toContain("CheckboxCheckIcon");
    expect(createAccountSource).toContain("PasswordEyeIcon");
  });

  // 15. User-entered demo values do not create fake backend accounts
  it("verifies Create Account does not invoke backend account mutation APIs", () => {
    const createAccountSource = fs.readFileSync(
      path.join(customerAppDir, "(auth)/create-account.tsx"),
      "utf8"
    );
    expect(createAccountSource).not.toContain("fetch('/api/register'");
    expect(createAccountSource).not.toContain("useCreateUserMutation");
    expect(createAccountSource).not.toContain("api.register");
  });

  // 16. No previous W04/W05 route regression occurs
  it("verifies W04 payment and W05 search screen integrity is preserved", () => {
    const paymentSource = fs.readFileSync(
      path.join(customerAppDir, "(app)/choose-payment-method.tsx"),
      "utf8"
    );
    expect(paymentSource).toContain("styles.methodOptionCard");
    expect(paymentSource).toContain("styles.primaryButton");

    const searchStageSource = fs.readFileSync(
      path.resolve(__dirname, "../components/dispatch/W05SearchStageScreen.tsx"),
      "utf8"
    );
    expect(searchStageSource).toContain("W05SearchStageScreen");
  });
});
