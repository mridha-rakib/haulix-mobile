import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C31-A Your ASAP Request Is Recorded — English (Node 763:1155) & Spanish (Node 766:1541)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/asap-request-recorded.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c31a-es"');
    expect(navContent).toContain('id: "c31a-en"');
    expect(navContent).toContain('route: "/asap-request-recorded"');
  });

  it("verifies state recording and non-guaranteed ASAP notice", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("recordAsapRequestRecorded");
    expect(routeContent).toContain("getEffectiveConfirmedItems");
    expect(routeContent).toContain("c31aAsapRequestRecorded.availabilityNoticeBody");
  });

  it("verifies exact C31-A English and Spanish translation strings and semantic meaning", () => {
    expect(en.c31aAsapRequestRecorded.progressLabel).toBe("04 / 04  ·  ASAP REQUEST");
    expect(es.c31aAsapRequestRecorded.progressLabel).toBe("04 / 04  ·  SOLICITUD INMEDIATA");
    expect(en.c31aAsapRequestRecorded.screenTitle).toBe("Your ASAP request is recorded");
    expect(es.c31aAsapRequestRecorded.screenTitle).toBe("Tu solicitud inmediata está registrada");
    expect(en.c31aAsapRequestRecorded.statusBadge).toBe("ASAP REQUEST RECORDED");
    expect(es.c31aAsapRequestRecorded.statusBadge).toBe("SOLICITUD INMEDIATA REGISTRADA");
    expect(en.c31aAsapRequestRecorded.holdAmountValue).toBe("$356.00 USD");
    expect(es.c31aAsapRequestRecorded.holdAmountValue).toBe("$356.00 USD");
    expect(en.c31aAsapRequestRecorded.primaryCta).toBe("Check live dispatch queue");
    expect(en.c31aAsapRequestRecorded.secondaryCta).toBe("Cancel ASAP request");
    expect(es.c31aAsapRequestRecorded.primaryCta).toBe("Verificar cola de despacho en vivo");
    expect(es.c31aAsapRequestRecorded.secondaryCta).toBe("Cancelar solicitud inmediata");
  });

  it("verifies zero fabricated driver guarantee and zero fake ETA generation", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c31aAsapRequestRecorded.uiNote");
    expect(routeContent).not.toContain("guaranteedArrival");
    expect(routeContent).not.toContain("generateFakeEta");
  });
});
