import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { W03_T_DEFAULT_DATA } from "../fixtures/c27ServiceHandoffs";

describe("W03-T-HANDOFF Mattress Removal AI Review Entry — English (Node 394:443) & Spanish (Node 980:11366)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/mattress-ai-handoff.tsx");
  const reviewRoutePath = path.resolve(__dirname, "../../app/(app)/mattress-intake-review.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "w03t-es"');
    expect(navContent).toContain('id: "w03t-en"');
    expect(navContent).toContain('route: "/mattress-ai-handoff"');
  });

  it("verifies upstream review route connects to mattress-ai-handoff", () => {
    const reviewContent = fs.readFileSync(reviewRoutePath, "utf8");
    expect(reviewContent).toContain('router.push("/mattress-ai-handoff")');
  });

  it("verifies exact W03-T-HANDOFF English and Spanish translation strings", () => {
    expect(en.w03tHandoff.title).toBe("Mattress Removal review available");
    expect(es.w03tHandoff.title).toBe("Revisión de retiro de colchones disponible");
    expect(en.w03tHandoff.subtitle).toBe(
      "Confirm mattress count, disposal eligibility and safe handling before quoting."
    );
    expect(es.w03tHandoff.subtitle).toBe(
      "Confirma cantidad, elegibilidad de desecho y manipulación segura."
    );
    expect(en.w03tHandoff.sectionPayloadTitle).toBe("W03 service review connected");
    expect(es.w03tHandoff.sectionPayloadTitle).toBe("Revisión de servicio W03 conectada");
    expect(en.w03tHandoff.sectionAnchorTitle).toBe("Unresolved quote conditions");
    expect(es.w03tHandoff.sectionAnchorTitle).toBe("Revisión de alcance de colchones");
    expect(en.w03tHandoff.reviewBadge).toBe("Mattress scope review");
    expect(es.w03tHandoff.reviewBadge).toBe("Revisión necesaria");
    expect(en.w03tHandoff.primaryCta).toBe("Start mattress review");
    expect(es.w03tHandoff.primaryCta).toBe("Iniciar revisión de colchones");
    expect(en.w03tHandoff.secondaryCta).toBe("Edit items   ›");
    expect(es.w03tHandoff.secondaryCta).toBe("Editar objetos   ›");
  });

  it("verifies mattress count, dimensions, condition uncertainty, and disposal review", () => {
    expect(en.w03tHandoff.payloadLine2).toBe("Queen mattresses ×2 · 80 × 60 × 11 in each");
    expect(es.w03tHandoff.payloadLine2).toBe("Colchones queen ×2 · 80 × 60 × 11 pulg. c/u");
    expect(en.w03tHandoff.payloadLine3).toBe(
      "Mattress concept photo available · item condition unconfirmed"
    );
    expect(es.w03tHandoff.payloadLine3).toBe("Foto de colchón disponible · Estado no confirmado");
    expect(en.w03tHandoff.payloadLine4).toBe("Ground-floor driveway pickup · ~70 lb each");
    expect(es.w03tHandoff.payloadLine4).toBe("Recogida desde entrada en planta baja · ~70 lb c/u");

    expect(en.w03tHandoff.anchorLine1).toBe(
      "Confirm disposal eligibility and safe handling before a final price."
    );
    expect(es.w03tHandoff.anchorLine1).toBe(
      "Revisar eliminación local de colchones y manejo seguro."
    );
  });

  it("verifies honest upcoming C22 notice string without fake classification", () => {
    expect(en.w03tHandoff.noticeUpcomingC22).toContain(
      "Mattress AI recognition (C22) is scheduled for an upcoming sprint"
    );
    expect(es.w03tHandoff.noticeUpcomingC22).toContain(
      "El reconocimiento de colchones con IA (C22) está programado para una fase próxima"
    );
  });

  it("verifies default W03-T-HANDOFF fixture data", () => {
    expect(W03_T_DEFAULT_DATA.serviceId).toBe("mattress-removal");
    expect(W03_T_DEFAULT_DATA.bookingId).toBe("HX-DEMO-MATT-1037");
    expect(W03_T_DEFAULT_DATA.defaultCustomerEn).toBe("Sarah Mitchell");
  });
});
