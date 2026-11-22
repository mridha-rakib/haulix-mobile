import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C21_F_DEFAULT_DATA } from "../fixtures/c25ServiceReviews";

describe("C21-F Furniture Pickup Intake Review — English (Node 394:188) & Spanish (Node 980:11006)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/furniture-intake-review.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c21f-es"');
    expect(navContent).toContain('id: "c21f-en"');
    expect(navContent).toContain('route: "/furniture-intake-review"');
  });

  it("verifies exact C21-F English and Spanish translation strings", () => {
    expect(en.c21f.title).toBe("Furniture Pickup intake review");
    expect(es.c21f.title).toBe("Revisión de solicitud de retiro de muebles");
    expect(en.c21f.subtitle).toBe("Review this independent illustrative service draft before W03.");
    expect(es.c21f.subtitle).toBe("Revisa este borrador independiente antes de W03.");
    expect(en.c21f.sectionConfirmTitle).toBe("Service-specific intake review");
    expect(es.c21f.sectionConfirmTitle).toBe("Revisión de solicitud por servicio");
    expect(en.c21f.sectionPolicyTitle).toBe("Service safety assessment");
    expect(es.c21f.sectionPolicyTitle).toBe("Evaluación de seguridad del servicio");
    expect(en.c21f.reviewBadge).toBe("Review required");
    expect(es.c21f.reviewBadge).toBe("Revisión necesaria");
    expect(en.c21f.primaryCta).toBe("Confirm draft for AI review");
    expect(es.c21f.primaryCta).toBe("Confirmar borrador para revisión de IA");
    expect(en.c21f.secondaryCta).toBe("Edit furniture scope   ›");
    expect(es.c21f.secondaryCta).toBe("Editar alcance de muebles   ›");
  });

  it("verifies honest upcoming W03 notice string without fabricated pricing or dispatch", () => {
    expect(en.c21f.noticeUpcomingW03).toContain(
      "Furniture evaluation & quote generation (W03) is scheduled"
    );
    expect(es.c21f.noticeUpcomingW03).toContain(
      "La evaluación y cotización de muebles (W03) están programadas"
    );
  });

  it("verifies default C21-F fixture data", () => {
    expect(C21_F_DEFAULT_DATA.bookingId).toBe("HX-DEMO-FURN-1039");
    expect(C21_F_DEFAULT_DATA.badgeLabel).toBe("SARAH MITCHELL · HX-DEMO-FURN-1039");
  });
});
