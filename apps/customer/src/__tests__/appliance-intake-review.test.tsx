import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C21_A_DEFAULT_DATA } from "../fixtures/c26IntakeReviews";

describe("C21-A Appliance Removal Intake Review — English (Node 394:290) & Spanish (Node 980:11066)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/appliance-intake-review.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c21a-es"');
    expect(navContent).toContain('id: "c21a-en"');
    expect(navContent).toContain('route: "/appliance-intake-review"');
  });

  it("verifies exact C21-A English and Spanish translation strings", () => {
    expect(en.c21a.title).toBe("Appliance Removal intake review");
    expect(es.c21a.title).toBe("Revisión de solicitud de retiro de electrodomésticos");
    expect(en.c21a.subtitle).toBe("Review this independent illustrative service draft before W03.");
    expect(es.c21a.subtitle).toBe("Revisa este borrador independiente antes de W03.");
    expect(en.c21a.sectionConfirmTitle).toBe("Service-specific intake review");
    expect(es.c21a.sectionConfirmTitle).toBe("Revisión de solicitud por servicio");
    expect(en.c21a.sectionPolicyTitle).toBe("Service safety assessment");
    expect(es.c21a.sectionPolicyTitle).toBe("Evaluación de seguridad del servicio");
    expect(en.c21a.reviewBadge).toBe("Review required");
    expect(es.c21a.reviewBadge).toBe("Revisión necesaria");
    expect(en.c21a.primaryCta).toBe("Confirm draft for AI review");
    expect(es.c21a.primaryCta).toBe("Confirmar borrador para revisión de IA");
    expect(en.c21a.secondaryCta).toBe("Edit appliance details   ›");
    expect(es.c21a.secondaryCta).toBe("Editar datos del electrodoméstico   ›");
  });

  it("verifies honest upcoming W03 notice string without fabricated pricing or dispatch", () => {
    expect(en.c21a.noticeUpcomingW03).toContain(
      "Appliance evaluation & quote generation (W03) is scheduled"
    );
    expect(es.c21a.noticeUpcomingW03).toContain(
      "La evaluación y cotización de electrodomésticos (W03) están programadas"
    );
  });

  it("verifies default C21-A fixture data", () => {
    expect(C21_A_DEFAULT_DATA.bookingId).toBe("HX-DEMO-APPL-1036");
    expect(C21_A_DEFAULT_DATA.badgeLabel).toBe("SARAH MITCHELL · HX-DEMO-APPL-1036");
    expect(C21_A_DEFAULT_DATA.confirmLine2En).toBe(
      "Washing machine ×1 · 27 × 29 × 39 in · ~170 lb"
    );
    expect(C21_A_DEFAULT_DATA.confirmLine2Es).toBe("Lavadora ×1 · 27 × 29 × 39 pulg. · ~170 lb");
  });
});
