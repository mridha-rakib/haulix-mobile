import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
  C25_ILLUSTRATIVE_FORMULA,
  C25_ILLUSTRATIVE_TOTAL,
  C25_ITEMIZED_CHARGES,
} from "../fixtures/c33QuoteTerms";

describe("C25 Itemized Quote & Terms — English (Node 412:1260) & Spanish (Node 987:11193)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/itemized-quote.tsx");
  const illustrativeRoutePath = path.resolve(__dirname, "../../app/(app)/illustrative-quote.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c25-es"');
    expect(navContent).toContain('id: "c25-en"');
    expect(navContent).toContain('route: "/itemized-quote"');
  });

  it("verifies upstream C24-Q routes to C25, and C25 connects to C25-A, C25-E, and C24-REV", () => {
    const illustrativeContent = fs.readFileSync(illustrativeRoutePath, "utf8");
    expect(illustrativeContent).toContain('pathname: "/itemized-quote"');

    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/quote-acceptance-review"');
    expect(routeContent).toContain('pathname: "/unapproved-rate-rules"');
    expect(routeContent).toContain('pathname: "/quote-revision"');
    expect(routeContent).toContain('pathname: "/illustrative-quote"');
  });

  it("verifies exact 6 itemized charges and $356 arithmetic consistency", () => {
    expect(C25_ITEMIZED_CHARGES).toHaveLength(6);
    expect(C25_ILLUSTRATIVE_TOTAL).toBe("$356");
    expect(C25_ILLUSTRATIVE_FORMULA).toBe("160 + 75 + 36 + 60 + 25 = 356");

    const sum = C25_ITEMIZED_CHARGES.reduce((acc, row) => {
      const val = Number.parseInt(row.amount.replace("$", ""), 10);
      return acc + val;
    }, 0);
    expect(sum).toBe(356);
  });

  it("verifies exact C25 English and Spanish translation strings", () => {
    expect(en.c25ItemizedQuote.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c25ItemizedQuote.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c25ItemizedQuote.flowSub).toBe("  /  C25");
    expect(es.c25ItemizedQuote.flowSub).toBe("  /  C25");
    expect(en.c25ItemizedQuote.title).toBe("Review your price breakdown");
    expect(es.c25ItemizedQuote.title).toBe("Revisar desglose del precio");
    expect(en.c25ItemizedQuote.subtitle).toBe(
      "See the illustrative cost inputs and what is excluded."
    );
    expect(es.c25ItemizedQuote.subtitle).toBe("Consulta los costos ilustrativos y exclusiones.");
    expect(en.c25ItemizedQuote.sectionChargesTitle).toBe("Example itemized charges");
    expect(es.c25ItemizedQuote.sectionChargesTitle).toBe("Cargos desglosados de ejemplo");
    expect(en.c25ItemizedQuote.chargeLabor).toBe("Labor · 2 workers × ~2h");
    expect(es.c25ItemizedQuote.chargeLabor).toBe("Mano de obra · 2 trabajadores × ~2 h");
    expect(en.c25ItemizedQuote.chargeVehicle).toBe("Vehicle · pickup + trailer");
    expect(es.c25ItemizedQuote.chargeVehicle).toBe("Vehículo · Camioneta y remolque");
    expect(en.c25ItemizedQuote.chargeDistance).toBe("Route distance · 12 mi example");
    expect(es.c25ItemizedQuote.chargeDistance).toBe("Distancia de ruta · Ejemplo 12 mi");
    expect(en.c25ItemizedQuote.chargeDisposal).toBe("Disposal allowance");
    expect(es.c25ItemizedQuote.chargeDisposal).toBe("Tarifa por eliminación");
    expect(en.c25ItemizedQuote.chargeAccess).toBe("Stairs/access");
    expect(es.c25ItemizedQuote.chargeAccess).toBe("Escaleras/acceso");
    expect(en.c25ItemizedQuote.chargeOptional).toBe("Optional extras · none selected");
    expect(es.c25ItemizedQuote.chargeOptional).toBe("Extras opcionales · Ninguno seleccionado");
    expect(en.c25ItemizedQuote.subtotalAmount).toBe("$356");
    expect(es.c25ItemizedQuote.subtotalAmount).toBe("$356");
    expect(en.c25ItemizedQuote.subtotalTariffNote).toBe("Not a final Arizona customer tariff");
    expect(es.c25ItemizedQuote.subtotalTariffNote).toBe("No es una tarifa final para Arizona");
    expect(en.c25ItemizedQuote.primaryCta).toBe("Review quote acceptance");
    expect(es.c25ItemizedQuote.primaryCta).toBe("Revisar aceptación de cotización");
    expect(en.c25ItemizedQuote.secondaryCta).toBe("Change inventory / refresh  ›");
    expect(es.c25ItemizedQuote.secondaryCta).toBe("Cambiar inventario / actualizar  ›");
    expect(en.c25ItemizedQuote.tertiaryCta).toBe("See unavailable-price state  ›");
    expect(es.c25ItemizedQuote.tertiaryCta).toBe("Ver estado de precio no disponible  ›");
  });

  it("verifies price disclosure guidance and honest disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("subtotalTariffNote");
    expect(routeContent).toContain("footerDemo");
    expect(routeContent).toContain("footerSrs");
  });
});
