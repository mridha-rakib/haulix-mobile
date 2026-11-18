import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C20M_DEFAULT_DATA } from "../fixtures/c21IntakeReview";

describe("C20-M Confirm Moving Access — English (Node 392:180) & Spanish (Node 980:10574)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/moving-access.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c20m-es"');
    expect(navContent).toContain('id: "c20m-en"');
    expect(navContent).toContain('route: "/moving-access"');
  });

  it("verifies exact C20-M English and Spanish translation strings", () => {
    expect(en.c20m.title).toBe("Confirm moving access");
    expect(es.c20m.title).toBe("Confirmar acceso de mudanza");
    expect(en.c20m.sectionRouteTitle).toBe("Validated draft route");
    expect(es.c20m.sectionRouteTitle).toBe("Ruta del borrador validada");
    expect(en.c20m.sectionInventoryTitle).toBe("Inventory & access");
    expect(es.c20m.sectionInventoryTitle).toBe("Inventario y acceso");
    expect(en.c20m.sectionReviewTitle).toBe("Access review remains conditional");
    expect(es.c20m.sectionReviewTitle).toBe("Revisión de acceso pendiente");
    expect(en.c20m.reviewBadge).toBe("Review required");
    expect(es.c20m.reviewBadge).toBe("Revisión necesaria");
    expect(en.c20m.primaryCta).toBe("Review moving intake");
    expect(es.c20m.primaryCta).toBe("Revisar solicitud de mudanza");
    expect(en.c20m.secondaryCta).toBe("Return to service list");
    expect(es.c20m.secondaryCta).toBe("Volver a lista de servicios");
  });

  it("verifies honest upcoming C21-M notice string without fake quote generation", () => {
    expect(en.c20m.noticeUpcomingC21M).toContain("Moving intake review (C21-M) is scheduled");
    expect(es.c20m.noticeUpcomingC21M).toContain(
      "La revisión de solicitud de mudanza (C21-M) está programada"
    );
  });

  it("verifies default moving access data values", () => {
    expect(C20M_DEFAULT_DATA.customer).toBe("Daniel Ruiz · fictional");
    expect(C20M_DEFAULT_DATA.customerEs).toBe("Daniel Ruiz · ficticio");
    expect(C20M_DEFAULT_DATA.weight).toBe("Customer estimate ~550 lb total");
    expect(C20M_DEFAULT_DATA.weightEs).toBe("Estimación del cliente ~550 lb en total");
  });
});
