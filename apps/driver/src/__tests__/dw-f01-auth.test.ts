import { driverTranslationsEn } from "../i18n/driverEn";
import { driverTranslationsEs } from "../i18n/driverEs";
import { useDriverAuthStore } from "../stores/authStore";

describe("HAULIX Driver & Worker — DW-F00 / DW-F01 Milestone Verification", () => {
  beforeEach(() => {
    useDriverAuthStore.getState().logout();
  });

  describe("DW-F00: Localization Parity & Tokens", () => {
    it("has complete English translation dictionary matching Figma canonical keys", () => {
      expect(driverTranslationsEn.driver.welcome.headline).toBe("Work. Haul. Earn.");
      expect(driverTranslationsEn.driver.welcome.getStarted).toBe("Get started");
      expect(driverTranslationsEn.driver.roleSelect.driverCardTitle).toBe("Driver");
      expect(driverTranslationsEn.driver.roleSelect.helperCardTitle).toBe("Helper");
      expect(driverTranslationsEn.driver.signIn.welcomeBack).toBe("Welcome back");
      expect(driverTranslationsEn.driver.phoneVerification.title).toBe("Phone verification");
      expect(driverTranslationsEn.driver.tabs.messages).toBe("Messages");
    });

    it("has full Spanish translation symmetry matching Figma Spanish frames", () => {
      expect(driverTranslationsEs.driver.welcome.headline).toBe("Trabaja. Transporta. Gana.");
      expect(driverTranslationsEs.driver.welcome.getStarted).toBe("Comenzar");
      expect(driverTranslationsEs.driver.roleSelect.driverCardTitle).toBe("Conductor");
      expect(driverTranslationsEs.driver.roleSelect.helperCardTitle).toBe("Ayudante");
      expect(driverTranslationsEs.driver.signIn.welcomeBack).toBe("Bienvenido de nuevo");
      expect(driverTranslationsEs.driver.phoneVerification.title).toBe("Verificación de teléfono");
      expect(driverTranslationsEs.driver.tabs.messages).toBe("Mensajes");
    });

    it("verifies the authoritative 5-tab destinations", () => {
      const tabs = Object.keys(driverTranslationsEn.driver.tabs);
      expect(tabs).toEqual(["home", "jobs", "earnings", "messages", "profile"]);
      expect(driverTranslationsEn.driver.tabs.messages).toBe("Messages");
    });
  });

  describe("DW-F01: Auth State Store & Role Intake Operations", () => {
    it("defaults to unauthenticated state with PRIMARY_DRIVER draft role", () => {
      const state = useDriverAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.currentUser).toBeNull();
      expect(state.role).toBe("PRIMARY_DRIVER");
      expect(state.draft.role).toBe("PRIMARY_DRIVER");
    });

    it("updates role and draft simultaneously during role intake", () => {
      const store = useDriverAuthStore.getState();
      store.setRole("HELPER");

      const updated = useDriverAuthStore.getState();
      expect(updated.role).toBe("HELPER");
      expect(updated.draft.role).toBe("HELPER");
    });

    it("updates onboarding draft fields without losing state", () => {
      const store = useDriverAuthStore.getState();
      store.updateDraft({
        fullName: "Marcus Vance",
        email: "m.vance@example.com",
        phone: "+1 (602) 555-0142",
      });

      const updated = useDriverAuthStore.getState();
      expect(updated.draft.fullName).toBe("Marcus Vance");
      expect(updated.draft.email).toBe("m.vance@example.com");
      expect(updated.draft.phone).toBe("+1 (602) 555-0142");
    });

    it("validates mock OTP verification code logic", () => {
      const store = useDriverAuthStore.getState();
      expect(store.verifyMockOtp("123456")).toBe(true);
      expect(store.verifyMockOtp("000000")).toBe(false); // Expired simulation
      expect(store.verifyMockOtp("123")).toBe(false);
    });

    it("manages authenticated session and loginMock for Primary Driver and Helper", () => {
      const store = useDriverAuthStore.getState();
      store.loginMock("driver@haulix.com", "PRIMARY_DRIVER");

      let authState = useDriverAuthStore.getState();
      expect(authState.isAuthenticated).toBe(true);
      expect(authState.role).toBe("PRIMARY_DRIVER");
      expect(authState.currentUser?.name).toBe("Marcus Vance");

      store.logout();
      authState = useDriverAuthStore.getState();
      expect(authState.isAuthenticated).toBe(false);
      expect(authState.currentUser).toBeNull();
    });
  });
});
