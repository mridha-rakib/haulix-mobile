import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { resetIntakeDraft } from "../fixtures/c21IntakeReview";

describe("C21-S Intake Draft Saved — English (Node 382:2124) & Spanish (Node 980:10461)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/intake-draft-saved.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  beforeEach(() => {
    resetIntakeDraft();
  });

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c21s-es"');
    expect(navContent).toContain('id: "c21s-en"');
    expect(navContent).toContain('route: "/intake-draft-saved"');
  });

  it("verifies exact C21-S English and Spanish translation strings and Spanish defect correction", () => {
    expect(en.c21s.title).toBe("Your intake draft is saved");
    expect(es.c21s.title).toBe("Tu borrador de solicitud se guardó");
    expect(en.c21s.subtitle).toBe("HX-DEMO-1027 is ready for the next AI review step.");
    // Symmetrical corrected Spanish translation for Figma defect
    expect(es.c21s.subtitle).toBe(
      "HX-DEMO-1027 está listo para el siguiente paso de revisión con IA."
    );
    expect(en.c21s.completedBadge).toBe("Completed in this demo");
    expect(es.c21s.completedBadge).toBe("Completado en esta demo");
    expect(en.c21s.primaryCta).toBe("Continue to AI item recognition");
    expect(es.c21s.primaryCta).toBe("Continuar al reconocimiento de objetos con IA");
    expect(en.c21s.secondaryCta).toBe("Review details again");
    expect(es.c21s.secondaryCta).toBe("Revisar detalles de nuevo");
  });

  it("verifies honest upcoming C22 notice string without fake classification", () => {
    expect(en.c21s.noticeUpcomingC22).toContain("AI item recognition (C22) is scheduled");
    expect(es.c21s.noticeUpcomingC22).toContain(
      "El reconocimiento de objetos con IA (C22) está programado"
    );
  });
});
