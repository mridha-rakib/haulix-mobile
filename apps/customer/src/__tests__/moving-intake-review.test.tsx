import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C21_M_DEFAULT_DATA } from "../fixtures/c25ServiceReviews";

describe("C21-M Moving Intake Review — English (Node 392:354) & Spanish (Node 980:10766)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/moving-intake-review.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c21m-es"');
    expect(navContent).toContain('id: "c21m-en"');
    expect(navContent).toContain('route: "/moving-intake-review"');
  });

  it("verifies exact C21-M English and Spanish translation strings", () => {
    expect(en.c21m.title).toBe("Moving intake review");
    expect(es.c21m.title).toBe("Revisión de solicitud de mudanza");
    expect(en.c21m.subtitle).toBe("Daniel Ruiz · Separate fictional booking; no quote generated.");
    expect(es.c21m.subtitle).toBe("Daniel Ruiz · Reserva ficticia separada; sin cotización.");
    expect(en.c21m.sectionConfirmTitle).toBe("Intake data to confirm");
    expect(es.c21m.sectionConfirmTitle).toBe("Datos de solicitud por confirmar");
    expect(en.c21m.sectionPolicyTitle).toBe("Scope and policy checks");
    expect(es.c21m.sectionPolicyTitle).toBe("Controles de alcance y políticas");
    expect(en.c21m.reviewBadge).toBe("Review required");
    expect(es.c21m.reviewBadge).toBe("Revisión necesaria");
    expect(en.c21m.primaryCta).toBe("Confirm intake · Continue to W03");
    expect(es.c21m.primaryCta).toBe("Confirmar solicitud · Continuar a W03");
    expect(en.c21m.secondaryCta).toBe("Edit moving details   ›");
    expect(es.c21m.secondaryCta).toBe("Editar datos de mudanza   ›");
  });

  it("verifies honest upcoming W03 notice string without fabricated pricing or dispatch", () => {
    expect(en.c21m.noticeUpcomingW03).toContain("Moving dispatch & quoting (W03) is scheduled");
    expect(es.c21m.noticeUpcomingW03).toContain(
      "El despacho y cotización de mudanza (W03) están programados"
    );
  });

  it("verifies default C21-M fixture data", () => {
    expect(C21_M_DEFAULT_DATA.bookingId).toBe("HX-DEMO-MOVE-1034");
    expect(C21_M_DEFAULT_DATA.badgeLabel).toBe("DANIEL RUIZ · HX-DEMO-MOVE-1034");
  });
});
