/**
 * HAULIX Customer Mobile App — Phase 03.42
 * Cross-Workflow Integration, Demo Isolation & Truthfulness Verification Test Suite
 */

import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
  getEffectiveConfirmedItems,
  getW04Draft,
  W03_CUSTOMER_CONFIRMED_INVENTORY,
  W04_FIGMA_DEMO_INVENTORY,
} from "../fixtures/c36Scheduling";

describe("Phase 03.42 Cross-Workflow Integration & Governance Audit", () => {
  const customerRoot = path.resolve(__dirname, "../../");

  it("1. verifies DemoScreenNavigator is protected by environment and dev gating", () => {
    const navPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navPath, "utf-8");
    expect(navSource).toContain("__DEV__ || process.env.EXPO_PUBLIC_ENABLE_QA_NAVIGATOR");
    expect(navSource).toContain("if (!isEnabled)");
    expect(navSource).toContain("return null;");
  });

  it("2. verifies truthful payment hold disclosures on C31-F, C31-S, and C31-A", () => {
    // C31-F: simulated hold, no real charge
    expect(en.c31fBookingNotConfirmed.holdStatusValue).toContain("Simulated Hold");
    expect(en.c31fBookingNotConfirmed.holdStatusValue).toContain("$0.00 Charged");
    expect(es.c31fBookingNotConfirmed.holdStatusValue).toContain("Retención simulada");
    expect(es.c31fBookingNotConfirmed.holdStatusValue).toContain("$0.00 cobrado");

    // C31-S: demonstration hold clarification
    expect(en.c31sBookingRecorded.holdClarification).toContain("Demonstration card hold");
    expect(en.c31sBookingRecorded.holdClarification).toContain("No real funds captured");
    expect(es.c31sBookingRecorded.holdClarification).toContain("Retención de demostración");
    expect(es.c31sBookingRecorded.holdClarification).toContain("No se capturan fondos reales");

    // C31-A: fee-free release of demo hold
    expect(en.c31aAsapRequestRecorded.cancelNotice).toContain(
      "Demo pre-authorization hold released"
    );
    expect(en.c31aAsapRequestRecorded.cancelNotice).toContain("zero charges");
    expect(es.c31aAsapRequestRecorded.cancelNotice).toContain(
      "Retención de prueba liberada sin cobros"
    );
  });

  it("3. verifies CustomerBottomNav presence is strictly restricted to approved screens", () => {
    const appDir = path.resolve(customerRoot, "app");

    // Must be present on: Home (app/index or app/(app)/index), account, edit-profile, profile-updated
    const homeContent = fs.readFileSync(path.resolve(appDir, "(app)/index.tsx"), "utf-8");
    expect(homeContent).toContain("CustomerBottomNav");

    const accountContent = fs.readFileSync(path.resolve(appDir, "(app)/account.tsx"), "utf-8");
    expect(accountContent).toContain("CustomerBottomNav");

    const editProfileContent = fs.readFileSync(
      path.resolve(appDir, "(app)/edit-profile.tsx"),
      "utf-8"
    );
    expect(editProfileContent).toContain("CustomerBottomNav");

    const profileUpdatedContent = fs.readFileSync(
      path.resolve(appDir, "(app)/profile-updated.tsx"),
      "utf-8"
    );
    expect(profileUpdatedContent).toContain("CustomerBottomNav");

    // Must NOT be present on Auth screens
    const authDir = path.resolve(appDir, "(auth)");
    const authFiles = fs
      .readdirSync(authDir)
      .filter((f) => f.endsWith(".tsx") && !f.startsWith("_layout"));
    for (const file of authFiles) {
      const content = fs.readFileSync(path.resolve(authDir, file), "utf-8");
      expect(content).not.toContain("CustomerBottomNav");
    }

    // Must NOT be present on Scheduling & Payment outcome screens (C31-S, C31-A, C31-F)
    const bookingRecorded = fs.readFileSync(
      path.resolve(appDir, "(app)/booking-recorded.tsx"),
      "utf-8"
    );
    expect(bookingRecorded).not.toContain("CustomerBottomNav");

    const asapRecorded = fs.readFileSync(
      path.resolve(appDir, "(app)/asap-request-recorded.tsx"),
      "utf-8"
    );
    expect(asapRecorded).not.toContain("CustomerBottomNav");

    const notConfirmed = fs.readFileSync(
      path.resolve(appDir, "(app)/booking-not-confirmed.tsx"),
      "utf-8"
    );
    expect(notConfirmed).not.toContain("CustomerBottomNav");
  });

  it("4. verifies strict isolation between active W03 customer inventory and W04 Figma demo preview fixture", () => {
    // W03 active customer inventory
    expect(W03_CUSTOMER_CONFIRMED_INVENTORY.piecesCount).toBe(4);
    expect(W03_CUSTOMER_CONFIRMED_INVENTORY.categoriesCount).toBe(3);
    expect(W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn).toBe(
      "1 sofa, 2 queen mattresses, 1 dining table (4 pieces)"
    );

    // W04 isolated demo preview fixture
    expect(W04_FIGMA_DEMO_INVENTORY.piecesCount).toBe(3);
    expect(W04_FIGMA_DEMO_INVENTORY.categoriesCount).toBe(2);
    expect(W04_FIGMA_DEMO_INVENTORY.confirmedItemsEn).toBe("1 sofa + 2 chairs");

    // Active journey draft test
    const draft = getW04Draft();
    const journeyDraft = { ...draft, inventorySource: "active_w03_journey" as const };
    expect(getEffectiveConfirmedItems(journeyDraft, "en")).toBe(
      "1 sofa, 2 queen mattresses, 1 dining table (4 pieces)"
    );
    expect(getEffectiveConfirmedItems(journeyDraft, "es")).toBe(
      "1 sofá, 2 colchones queen, 1 mesa de comedor (4 piezas)"
    );

    // Isolated demo draft test
    const demoDraft = { ...draft, inventorySource: "w04_figma_demo" as const };
    expect(getEffectiveConfirmedItems(demoDraft, "en")).toBe("1 sofa + 2 chairs");
    expect(getEffectiveConfirmedItems(demoDraft, "es")).toBe("1 sofá + 2 sillas");
  });

  it("5. verifies symmetrical non-binding estimate of $356.00 USD across all payment state contracts", () => {
    const draft = getW04Draft();
    expect(draft.illustrativeSubtotal).toBe("$356.00");
    expect(draft.conditionalCancellationFee).toBe("$100.00");
  });
});
