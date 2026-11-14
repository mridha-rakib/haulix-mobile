import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en } from "@haulix/i18n";
import {
  c10DemoProfile,
  computeInitials,
  getC10DemoProfile,
  resetProfileEdits,
  saveEnProfileEdits,
} from "../fixtures/c10DemoProfile";

describe("C10-S Profile Updated / Success (English ONLY) — Figma Node 333:171", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/profile-updated.tsx");
  const editProfileRoutePath = path.resolve(__dirname, "../../app/(app)/edit-profile.tsx");

  beforeEach(async () => {
    await resetProfileEdits();
  });

  afterAll(async () => {
    await resetProfileEdits();
  });

  it("verifies C10-S route file exists at apps/customer/app/(app)/profile-updated.tsx", () => {
    expect(fs.existsSync(routePath)).toBe(true);

    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("export default function ProfileUpdatedScreen");
    expect(source).toContain("useTranslation");
    expect(source).toContain("getC10DemoProfile");
    expect(source).toContain("loadProfileEdits");
  });

  it("verifies exact C10-S English strings match authoritative Figma node 333:171", () => {
    expect(en.profileUpdated.title).toBe("Profile updated.");
    expect(en.profileUpdated.subtitle).toBe("Your customer details are ready for future bookings.");
    expect(en.profileUpdated.accountChipSuffix).toBe("CUSTOMER ACCOUNT");
    expect(en.profileUpdated.cardTitle).toBe("Saved profile");
    expect(en.profileUpdated.changesSavedPrefix).toBe("Changes saved ·");
    expect(en.profileUpdated.emailLabel).toBe("Email");
    expect(en.profileUpdated.verifiedPhoneLabel).toBe("Verified phone");
    expect(en.profileUpdated.pendingPhoneLabel).toBe("Phone · verification pending");
    expect(en.profileUpdated.note).toBe(
      "Profile changes will not modify existing completed booking records."
    );
    expect(en.profileUpdated.backToAccount).toBe("Back to My Account");
    expect(en.profileUpdated.savedAddresses).toBe("Saved Addresses");
  });

  it("verifies default profile returns Sarah Mitchell fixture when no edits exist", () => {
    const profile = getC10DemoProfile("en");
    expect(profile.name).toBe(c10DemoProfile.name);
    expect(profile.email).toBe(c10DemoProfile.email);
    expect(profile.phone).toBe(c10DemoProfile.phone);
    expect(profile.isPhoneVerified).toBe(true);
    expect(profile.sessionChip).toBe("SARAH MITCHELL · CUSTOMER ACCOUNT");
  });

  it("verifies dynamic name and email updates in English demo profile", async () => {
    await saveEnProfileEdits({
      name: "Sarah Jane Mitchell",
      email: "sarah.j.mitchell@example.test",
      initials: computeInitials("Sarah Jane Mitchell"),
    });

    const updated = getC10DemoProfile("en");
    expect(updated.name).toBe("Sarah Jane Mitchell");
    expect(updated.email).toBe("sarah.j.mitchell@example.test");
    expect(updated.phone).toBe(c10DemoProfile.phone);
    expect(updated.isPhoneVerified).toBe(true);
    expect(updated.sessionChip).toBe("SARAH JANE MITCHELL · CUSTOMER ACCOUNT");
  });

  it("verifies changed phone number establishes honest pending-verification state", async () => {
    await saveEnProfileEdits({
      name: "Sarah Mitchell",
      email: "sarah.mitchell@example.test",
      phone: "+1 602-555-9876",
      isPhoneVerified: false,
    });

    const updated = getC10DemoProfile("en");
    expect(updated.phone).toBe("+1 602-555-9876");
    expect(updated.isPhoneVerified).toBe(false);
  });

  it("verifies restoring phone number to fixture restores verified status", async () => {
    await saveEnProfileEdits({
      phone: "+1 602-555-9876",
      isPhoneVerified: false,
    });
    expect(getC10DemoProfile("en").isPhoneVerified).toBe(false);

    await saveEnProfileEdits({
      phone: c10DemoProfile.phone,
      isPhoneVerified: true,
    });
    expect(getC10DemoProfile("en").isPhoneVerified).toBe(true);
    expect(getC10DemoProfile("en").phone).toBe(c10DemoProfile.phone);
  });

  it("verifies English save does NOT modify Spanish Bryan Lopez profile (Locale Isolation)", async () => {
    await saveEnProfileEdits({
      name: "Updated Sarah",
      email: "updated.sarah@example.test",
      phone: "+1 602-555-1111",
      isPhoneVerified: false,
    });

    const enProfile = getC10DemoProfile("en");
    const esProfile = getC10DemoProfile("es");

    expect(enProfile.name).toBe("Updated Sarah");
    expect(enProfile.email).toBe("updated.sarah@example.test");
    expect(enProfile.isPhoneVerified).toBe(false);

    // Spanish profile must remain completely untouched
    expect(esProfile.name).toBe("Bryan Lopez");
    expect(esProfile.email).toBe("bryan.lopez@example.test");
    expect(esProfile.phone).toBe("+1 602-555-0142");
    expect(esProfile.isPhoneVerified).toBe(true);
    expect(esProfile.sessionChip).toBe("BRYAN LOPEZ  ·  CUENTA DE CLIENTE");
  });

  it("verifies C10-E connects Save Changes to C10-S (/profile-updated) in English", () => {
    const editSource = fs.readFileSync(editProfileRoutePath, "utf8");
    expect(editSource).toContain('router.replace("/(app)/profile-updated")');
    expect(editSource).toContain("saveProfileEdits");
  });

  it("verifies C10-S primary button navigates Back to My Account", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain('router.replace("/(app)/account")');
    expect(source).toContain('testID="c10s-back-to-account-btn"');
    expect(source).toContain('testID="c10s-saved-addresses-btn"');
  });

  it("verifies C10-S reuses shared CustomerBottomNav with activeTab='account'", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain("<CustomerBottomNav");
    expect(source).toContain('activeTab="account"');
  });

  it("verifies C10-S palette matches authoritative Figma tokens", () => {
    expect(colors.brand).toBe("#BAFF42");
    expect(colors.background).toBe("#080B0B");
    expect(colors.surface).toBe("#151A19");
    expect(colors.elevated).toBe("#222827");
    expect(colors.primaryText).toBe("#F6F8F6");
    expect(colors.secondaryText).toBe("#ADB7B1");
  });

  it("verifies unguarded frontend preview: no __DEV__ or auth gate blocks C10-S", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).not.toContain("if (!__DEV__)");
    expect(source).not.toContain("isAuthenticated");
  });

  it("verifies all QA automation testIDs are present in C10-S", () => {
    const source = fs.readFileSync(routePath, "utf8");
    expect(source).toContain('testID="c10s-profile-updated-screen"');
    expect(source).toContain('testID="c10s-header-back"');
    expect(source).toContain('testID="c10s-header-bell"');
    expect(source).toContain('testID="c10s-status-chip"');
    expect(source).toContain('testID="c10s-saved-profile-card"');
    expect(source).toContain('testID="c10s-saved-status-strip"');
    expect(source).toContain('testID="c10s-status-strip-text"');
    expect(source).toContain('testID="c10s-email-row"');
    expect(source).toContain('testID="c10s-saved-email"');
    expect(source).toContain('testID="c10s-phone-row"');
    expect(source).toContain('testID="c10s-phone-label"');
    expect(source).toContain('testID="c10s-saved-phone"');
    expect(source).toContain('testID="c10s-back-to-account-btn"');
    expect(source).toContain('testID="c10s-saved-addresses-btn"');
  });
});
