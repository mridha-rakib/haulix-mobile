import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C21-V Intake Review Blocked — English (Node 382:2088) & Spanish (Node 980:10409)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/intake-review-blocked.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c21v-es"');
    expect(navContent).toContain('id: "c21v-en"');
    expect(navContent).toContain('route: "/intake-review-blocked"');
  });

  it("verifies exact C21-V English and Spanish translation strings", () => {
    expect(en.c21v.title).toBe("Intake is not ready yet");
    expect(es.c21v.title).toBe("La solicitud aún no está lista");
    expect(en.c21v.warningTitle).toBe("Cannot proceed to AI review");
    expect(es.c21v.warningTitle).toBe("No se puede continuar a la revisión de IA");
    expect(en.c21v.warningBadge).toBe("Action required");
    expect(es.c21v.warningBadge).toBe("Acción necesaria");
    expect(en.c21v.primaryCta).toBe("Resolve missing item information");
    expect(es.c21v.primaryCta).toBe("Completar información faltante de los objetos");
    expect(en.c21v.secondaryCta).toBe("Go back to intake review");
    expect(es.c21v.secondaryCta).toBe("Volver a revisar solicitud");
  });
});
