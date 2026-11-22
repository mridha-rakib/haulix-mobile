import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C24ADM_REVIEW_CASE } from "../fixtures/c31Verification";

describe("C24-ADM Admin Review Pending — English (Node 412:1006) & Spanish (Node 987:10887)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/admin-review-pending.tsx");
  const clarificationRoutePath = path.resolve(
    __dirname,
    "../../app/(app)/measurement-clarification.tsx"
  );
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c24adm-es"');
    expect(navContent).toContain('id: "c24adm-en"');
    expect(navContent).toContain('route: "/admin-review-pending"');
  });

  it("verifies upstream screens connect to C24-ADM", () => {
    const clarifContent = fs.readFileSync(clarificationRoutePath, "utf8");
    expect(clarifContent).toContain('pathname: "/admin-review-pending"');

    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/measurement-clarification"');
  });

  it("verifies exact C24-ADM English and Spanish translation strings", () => {
    expect(en.c24admAdminReviewPending.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c24admAdminReviewPending.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c24admAdminReviewPending.title).toBe("Service pricing needs review");
    expect(es.c24admAdminReviewPending.title).toBe("Las tarifas del servicio requieren revisión");
    expect(en.c24admAdminReviewPending.subtitle).toBe(
      "Service-specific rates or eligibility need an authorized Admin decision before a final price can be shown."
    );
    expect(es.c24admAdminReviewPending.subtitle).toBe(
      "Las tarifas o la elegibilidad requieren una decisión autorizada antes de mostrar un precio final."
    );
    expect(en.c24admAdminReviewPending.sectionCaseTitle).toBe("Review case · fictional");
    expect(es.c24admAdminReviewPending.sectionCaseTitle).toBe("Caso en revisión · Ficticio");
    expect(en.c24admAdminReviewPending.caseLine1).toBe("Service request · Sarah Mitchell · Demo");
    expect(es.c24admAdminReviewPending.caseLine1).toBe(
      "Solicitud de servicio · Sarah Mitchell · Demo"
    );
    expect(en.c24admAdminReviewPending.caseConcern).toBe(
      "Concern: service-rate or eligibility rule needs approval"
    );
    expect(es.c24admAdminReviewPending.caseConcern).toBe(
      "Alerta: tarifas o elegibilidad requieren aprobación"
    );
    expect(en.c24admAdminReviewPending.caseStatus).toBe("Status: Pending authorized Admin review");
    expect(es.c24admAdminReviewPending.caseStatus).toBe(
      "Estado: Pendiente de revisión autorizada de Admin"
    );
    expect(en.c24admAdminReviewPending.sectionNoticeTitle).toBe("No definitive amount yet");
    expect(es.c24admAdminReviewPending.sectionNoticeTitle).toBe("Aún no hay importe definitivo");
    expect(en.c24admAdminReviewPending.guidanceOutcome).toBe(
      "Customer will see approved/rejected/clarification outcome."
    );
    expect(es.c24admAdminReviewPending.guidanceOutcome).toBe(
      "El cliente verá aprobación, rechazo o solicitud de aclaración."
    );
    expect(en.c24admAdminReviewPending.guidanceRequired).toBe(
      "Admin review is required, not automatically successful."
    );
    expect(es.c24admAdminReviewPending.guidanceRequired).toBe(
      "Se requiere revisión de Admin; no se aprueba automáticamente."
    );
    expect(en.c24admAdminReviewPending.primaryCta).toBe("View approved-review example");
    expect(es.c24admAdminReviewPending.primaryCta).toBe("Ver ejemplo de revisión aprobada");
    expect(en.c24admAdminReviewPending.secondaryCta).toBe("Provide more item detail  ›");
    expect(es.c24admAdminReviewPending.secondaryCta).toBe("Añadir detalles del objeto  ›");
    expect(en.c24admAdminReviewPending.tertiaryCta).toBe("Admin requests changes example  ›");
    expect(es.c24admAdminReviewPending.tertiaryCta).toBe(
      "Ejemplo de cambios solicitados por Admin  ›"
    );
  });

  it("verifies review case fixture has valid status", () => {
    expect(C24ADM_REVIEW_CASE.reviewStatus).toBe("pending_authorized_admin_review");
    expect(C24ADM_REVIEW_CASE.customerName).toBe("Sarah Mitchell");
  });
});
