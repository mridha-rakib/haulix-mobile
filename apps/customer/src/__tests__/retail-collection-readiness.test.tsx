import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C20_RETAIL_DEFAULT_DATA } from "../fixtures/c25ServiceReviews";

describe("C20-RETAIL Review Store Collection Access — English (Node 392:265) & Spanish (Node 980:10668)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/retail-collection-readiness.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c20retail-es"');
    expect(navContent).toContain('id: "c20retail-en"');
    expect(navContent).toContain('route: "/retail-collection-readiness"');
  });

  it("verifies exact C20-RETAIL English and Spanish translation strings", () => {
    expect(en.c20retail.title).toBe("Review store collection access");
    expect(es.c20retail.title).toBe("Revisar acceso de recogida en tienda");
    expect(en.c20retail.subtitle).toBe(
      "Check the retailer order, pickup requirements and delivery access."
    );
    expect(es.c20retail.subtitle).toBe(
      "Comprueba pedido, requisitos de recogida y acceso de entrega."
    );
    expect(en.c20retail.sectionPickupTitle).toBe("Store pickup confirmation");
    expect(es.c20retail.sectionPickupTitle).toBe("Confirmación de recogida en tienda");
    expect(en.c20retail.sectionDeliveryTitle).toBe("Delivery");
    expect(es.c20retail.sectionDeliveryTitle).toBe("Entrega");
    expect(en.c20retail.sectionExceptionTitle).toBe("Manual collection exception review");
    expect(es.c20retail.sectionExceptionTitle).toBe("Excepción en recogida manual");
    expect(en.c20retail.reviewBadge).toBe("Review required");
    expect(es.c20retail.reviewBadge).toBe("Revisión necesaria");
    expect(en.c20retail.primaryCta).toBe("Review retail booking intake");
    expect(es.c20retail.primaryCta).toBe("Revisar solicitud de recogida comercial");
    expect(en.c20retail.secondaryCta).toBe("Try missing-order validation   ›");
    expect(es.c20retail.secondaryCta).toBe("Probar validación de pedido faltante   ›");
  });

  it("verifies C20-RETAIL default fixtures values", () => {
    expect(C20_RETAIL_DEFAULT_DATA.retailerName).toBe("Home Depot · Phoenix");
    expect(C20_RETAIL_DEFAULT_DATA.storeLocation).toBe("1800 E Demo Way, Phoenix, AZ 85016");
    expect(C20_RETAIL_DEFAULT_DATA.orderNumber).toBe("HD-DEMO-58321 · fictional");
    expect(C20_RETAIL_DEFAULT_DATA.dropoffAddress).toBe("5678 N Demo Avenue, Phoenix, AZ 85012");
  });
});
