import fs from "node:fs";
import path from "node:path";
import {
  getEffectiveConfirmedItems,
  getW04Draft,
  W03_CUSTOMER_CONFIRMED_INVENTORY,
} from "../fixtures/c36Scheduling";

describe("W04 Complete 23-Screen Integration & Boundary Audit", () => {
  const appDir = path.resolve(__dirname, "../../app/(app)");
  const demoNavPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
  const navContent = fs.readFileSync(demoNavPath, "utf8");

  const W04_SCREENS = [
    {
      id: "C27",
      route: "choose-service-time.tsx",
      navIdEn: "c27-en",
      navIdEs: "c27-es",
    },
    {
      id: "C27-A",
      route: "request-service-asap.tsx",
      navIdEn: "c27a-en",
      navIdEs: "c27a-es",
    },
    {
      id: "C27-S",
      route: "select-available-window.tsx",
      navIdEn: "c27s-en",
      navIdEs: "c27s-es",
    },
    {
      id: "C27-V",
      route: "invalid-service-time.tsx",
      navIdEn: "c27v-en",
      navIdEs: "c27v-es",
    },
    {
      id: "C27-R",
      route: "service-window-unavailable.tsx",
      navIdEn: "c27r-en",
      navIdEs: "c27r-es",
    },
    {
      id: "C27-N",
      route: "no-eligible-driver.tsx",
      navIdEn: "c27n-en",
      navIdEs: "c27n-es",
    },
    {
      id: "C27-X",
      route: "no-driver-fee-free-cancellation.tsx",
      navIdEn: "c27x-en",
      navIdEs: "c27x-es",
    },
    {
      id: "C28",
      route: "review-booking.tsx",
      navIdEn: "c28-en",
      navIdEs: "c28-es",
    },
    {
      id: "C28-C",
      route: "booking-terms-accepted.tsx",
      navIdEn: "c28c-en",
      navIdEs: "c28c-es",
    },
    {
      id: "C28-U",
      route: "booking-terms-changed.tsx",
      navIdEn: "c28u-en",
      navIdEs: "c28u-es",
    },
    {
      id: "C29",
      route: "choose-payment-method.tsx",
      navIdEn: "c29-en",
      navIdEs: "c29-es",
    },
    {
      id: "C29-M",
      route: "secure-card-setup.tsx",
      navIdEn: "c29m-en",
      navIdEs: "c29m-es",
    },
    {
      id: "C29-3D",
      route: "confirm-card-authentication.tsx",
      navIdEn: "c29_3d-en",
      navIdEs: "c29_3d-es",
    },
    {
      id: "C29-P",
      route: "payment-authorization-pending.tsx",
      navIdEn: "c29p-en",
      navIdEs: "c29p-es",
    },
    {
      id: "C30-D",
      route: "payment-authorization-declined.tsx",
      navIdEn: "c30d-en",
      navIdEs: "c30d-es",
    },
    {
      id: "C30-E",
      route: "card-hold-expired.tsx",
      navIdEn: "c30e-en",
      navIdEs: "c30e-es",
    },
    {
      id: "C30-R",
      route: "restore-secure-authorization.tsx",
      navIdEn: "c30r-en",
      navIdEs: "c30r-es",
    },
    {
      id: "C30-C",
      route: "review-fresh-card-hold.tsx",
      navIdEn: "c30c-en",
      navIdEs: "c30c-es",
    },
    {
      id: "C30-CA",
      route: "new-authorization-consent.tsx",
      navIdEn: "c30ca-en",
      navIdEs: "c30ca-es",
    },
    {
      id: "C31-P",
      route: "checking-booking-status.tsx",
      navIdEn: "c31p-en",
      navIdEs: "c31p-es",
    },
    {
      id: "C31-S",
      route: "booking-recorded.tsx",
      navIdEn: "c31s-en",
      navIdEs: "c31s-es",
    },
    {
      id: "C31-A",
      route: "asap-request-recorded.tsx",
      navIdEn: "c31a-en",
      navIdEs: "c31a-es",
    },
    {
      id: "C31-F",
      route: "booking-not-confirmed.tsx",
      navIdEn: "c31f-en",
      navIdEs: "c31f-es",
    },
  ];

  it("verifies all 23 canonical W04 route files exist on disk", () => {
    expect(W04_SCREENS.length).toBe(23);
    for (const screen of W04_SCREENS) {
      const fullPath = path.join(appDir, screen.route);
      expect(fs.existsSync(fullPath)).toBe(true);
    }
  });

  it("verifies all 23 W04 screens have both English and Spanish entries in DemoScreenNavigator", () => {
    for (const screen of W04_SCREENS) {
      expect(navContent).toContain(`id: "${screen.navIdEn}"`);
      expect(navContent).toContain(`id: "${screen.navIdEs}"`);
    }
  });

  it("verifies customer scope and inventory preservation (4 items across 3 categories)", () => {
    const draft = getW04Draft();
    expect(W03_CUSTOMER_CONFIRMED_INVENTORY.piecesCount).toBe(4);
    expect(W03_CUSTOMER_CONFIRMED_INVENTORY.categoriesCount).toBe(3);
    expect(draft.illustrativeSubtotal).toBe("$356.00");

    // Active customer journey inventory
    const activeDraft = {
      ...draft,
      inventorySource: "active_w03_journey" as const,
    };
    const enActiveItems = getEffectiveConfirmedItems(activeDraft, "en");
    const esActiveItems = getEffectiveConfirmedItems(activeDraft, "es");
    expect(enActiveItems).toContain("1 sofa");
    expect(enActiveItems).toContain("2 queen mattresses");
    expect(enActiveItems).toContain("1 dining table");
    expect(esActiveItems).toContain("1 sofá");

    // Isolated W04 Figma demo inventory
    const demoDraft = { ...draft, inventorySource: "w04_figma_demo" as const };
    const enDemoItems = getEffectiveConfirmedItems(demoDraft, "en");
    expect(enDemoItems).toBe("1 sofa + 2 chairs");
  });

  it("verifies zero sensitive credit card fields across entire W04 route layer", () => {
    for (const screen of W04_SCREENS) {
      const fullPath = path.join(appDir, screen.route);
      const content = fs.readFileSync(fullPath, "utf8");
      // Must not collect raw card pan, cvv, or passwords
      expect(content).not.toMatch(/name=["']cardNumber["']/i);
      expect(content).not.toMatch(/name=["']cvv["']/i);
      expect(content).not.toMatch(/placeholder=["']\d{16}["']/);
      expect(content).not.toMatch(/stripeSecretKey/i);
    }
  });

  it("verifies no fake booking confirmation or automatic success timers", () => {
    const c31pContent = fs.readFileSync(path.join(appDir, "checking-booking-status.tsx"), "utf8");
    expect(c31pContent).not.toMatch(/setTimeout\([^)]*router\.push\([^)]*booking-recorded/);
    expect(c31pContent).not.toMatch(/setInterval\(/);
  });

  it("verifies C30-E routes to canonical /choose-service-time instead of ambiguous /schedule-service-window", () => {
    const c30eContent = fs.readFileSync(path.join(appDir, "card-hold-expired.tsx"), "utf8");
    expect(c30eContent).toContain('pathname: "/choose-service-time"');
    expect(c30eContent).not.toContain('pathname: "/schedule-service-window"');
  });
});
