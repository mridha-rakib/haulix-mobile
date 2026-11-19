import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C24P_CALCULATION_STEPS } from "../fixtures/c32Quote";

describe("C24-P Quote Calculation Processing — English (Node 412:910) & Spanish (Node 987:10772)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/quote-processing.tsx");
  const confirmedRoutePath = path.resolve(
    __dirname,
    "../../app/(app)/customer-confirmed-items.tsx"
  );
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c24p-es"');
    expect(navContent).toContain('id: "c24p-en"');
    expect(navContent).toContain('route: "/quote-processing"');
  });

  it("verifies upstream C23-S connects to C24-P and C24-P routes to C24-Q", () => {
    const confirmedContent = fs.readFileSync(confirmedRoutePath, "utf8");
    expect(confirmedContent).toContain('pathname: "/quote-processing"');

    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/illustrative-quote"');
    expect(routeContent).toContain('pathname: "/customer-confirmed-items"');
  });

  it("verifies exact C24-P English and Spanish translation strings", () => {
    expect(en.c24pQuoteProcessing.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c24pQuoteProcessing.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c24pQuoteProcessing.title).toBe("Preparing your estimate");
    expect(es.c24pQuoteProcessing.title).toBe("Preparando tu estimación");
    expect(en.c24pQuoteProcessing.subtitle).toBe(
      "The approved pricing engine would evaluate confirmed inputs and Arizona rules."
    );
    expect(es.c24pQuoteProcessing.subtitle).toBe(
      "El motor de precios aprobado evaluaría los datos y reglas de Arizona."
    );
    expect(en.c24pQuoteProcessing.sectionCalculationTitle).toBe("Estimate calculation");
    expect(es.c24pQuoteProcessing.sectionCalculationTitle).toBe("Cálculo de estimación");
    expect(en.c24pQuoteProcessing.eventInventoryLabel).toBe("Customer-confirmed inventory");
    expect(es.c24pQuoteProcessing.eventInventoryLabel).toBe("Inventario confirmado por el cliente");
    expect(en.c24pQuoteProcessing.eventInventoryValue).toBe("Complete · 4 pieces");
    expect(es.c24pQuoteProcessing.eventInventoryValue).toBe("Completo · 4 piezas");
    expect(en.c24pQuoteProcessing.eventEligibilityLabel).toBe("Crew & vehicle eligibility");
    expect(es.c24pQuoteProcessing.eventEligibilityLabel).toBe("Elegibilidad del equipo y vehículo");
    expect(en.c24pQuoteProcessing.eventEligibilityValue).toBe(
      "2 workers · pickup + trailer (illustrative)"
    );
    expect(es.c24pQuoteProcessing.eventEligibilityValue).toBe(
      "2 trabajadores · camioneta y remolque (ejemplo)"
    );
    expect(en.c24pQuoteProcessing.eventRouteLabel).toBe("Route & disposal validation");
    expect(es.c24pQuoteProcessing.eventRouteLabel).toBe("Validación de ruta y eliminación");
    expect(en.c24pQuoteProcessing.eventRouteValue).toBe("Processing · example 12 mi");
    expect(es.c24pQuoteProcessing.eventRouteValue).toBe("Procesando · Ejemplo 12 mi");
    expect(en.c24pQuoteProcessing.eventRulesLabel).toBe("Applicable pricing rule version");
    expect(es.c24pQuoteProcessing.eventRulesLabel).toBe("Versión aplicable de reglas de precios");
    expect(en.c24pQuoteProcessing.eventRulesValue).toBe("Checking active Arizona configuration");
    expect(es.c24pQuoteProcessing.eventRulesValue).toBe(
      "Comprobando configuración activa de Arizona"
    );
    expect(en.c24pQuoteProcessing.sectionNoticeTitle).toBe("Demonstration, not a live tariff");
    expect(es.c24pQuoteProcessing.sectionNoticeTitle).toBe("Demostración, no tarifa real");
    expect(en.c24pQuoteProcessing.primaryCta).toBe("View illustrative estimate");
    expect(es.c24pQuoteProcessing.primaryCta).toBe("Ver estimación ilustrativa");
    expect(en.c24pQuoteProcessing.secondaryCta).toBe("Pricing engine error example  ›");
    expect(es.c24pQuoteProcessing.secondaryCta).toBe("Ejemplo de error de cálculo de precio  ›");
  });

  it("verifies typed calculation steps contract", () => {
    expect(C24P_CALCULATION_STEPS).toHaveLength(4);
    expect(C24P_CALCULATION_STEPS[0].stepKey).toBe("inventory");
    expect(C24P_CALCULATION_STEPS[1].stepKey).toBe("crew");
    expect(C24P_CALCULATION_STEPS[2].stepKey).toBe("route");
    expect(C24P_CALCULATION_STEPS[3].stepKey).toBe("rules");
  });
});
