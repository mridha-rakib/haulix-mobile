import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import { C15_SERVICES } from "../fixtures/c15Services";
import { C17_DEFAULT_SAVED_ADDRESSES, C17_DEMO_CONSTANTS } from "../fixtures/c17PickupAddress";

describe("C17 Choose Pickup Address — English & Spanish (Nodes 382:576 & 974:9412)", () => {
  const pickupAddressRoutePath = path.resolve(__dirname, "../../app/(app)/pickup-address.tsx");
  const serviceAreaRoutePath = path.resolve(__dirname, "../../app/(app)/service-area.tsx");
  const flowHeaderPath = path.resolve(__dirname, "../components/navigation/FlowHeaderBack.tsx");
  const c17IconsPath = path.resolve(__dirname, "../components/discovery/C17Icons.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
  const fixturePath = path.resolve(__dirname, "../fixtures/c17PickupAddress.ts");

  it("verifies C17 Choose Pickup Address route exists and strictly omits CustomerBottomNav", () => {
    expect(fs.existsSync(pickupAddressRoutePath)).toBe(true);
    const source = fs.readFileSync(pickupAddressRoutePath, "utf8");
    expect(source).not.toContain("CustomerBottomNav");
    expect(source).not.toContain("bottom-nav");
  });

  it("verifies Flow Header · Back is pinned outside ScrollView with required touch target and no notification bell", () => {
    const routeSource = fs.readFileSync(pickupAddressRoutePath, "utf8");
    const flowHeaderSource = fs.readFileSync(flowHeaderPath, "utf8");

    // FlowHeaderBack component inspection
    expect(flowHeaderSource).toContain("FlowHeaderBack");
    expect(flowHeaderSource).toContain("hitSlop");
    expect(flowHeaderSource).toContain("HAUL");
    expect(flowHeaderSource).toContain("IX");
    expect(flowHeaderSource).toContain("We Haul It All.");
    expect(flowHeaderSource).not.toContain("bell");
    expect(flowHeaderSource).not.toContain("Notification");

    // Route uses FlowHeaderBack pinned outside ScrollView
    expect(routeSource).toContain("<FlowHeaderBack");
    const headerIndex = routeSource.indexOf("<FlowHeaderBack");
    const scrollViewIndex = routeSource.indexOf("<ScrollView");
    expect(headerIndex).toBeLessThan(scrollViewIndex);
  });

  it("verifies C17Icons exports all required SVG components", () => {
    expect(fs.existsSync(c17IconsPath)).toBe(true);
    const source = fs.readFileSync(c17IconsPath, "utf8");

    expect(source).toContain("export function C17CheckIcon");
    expect(source).toContain("export function C17LocationPinIcon");
    expect(source).toContain("export function C17ChevronRightIcon");
    expect(source).toContain("export function C17ContactIcon");
    expect(source).toContain("export function C17ServiceTypeIcon");
    expect(source).toContain("export function C17PickupAccessIcon");
    expect(source).toContain("export function C17RuleShieldIcon");
  });

  it("verifies C17 fixtures provide authoritative demo addresses and booking constants", () => {
    expect(fs.existsSync(fixturePath)).toBe(true);
    expect(C17_DEFAULT_SAVED_ADDRESSES).toHaveLength(2);
    expect(C17_DEFAULT_SAVED_ADDRESSES[0].id).toBe("home-default");
    expect(C17_DEFAULT_SAVED_ADDRESSES[0].isDefault).toBe(true);
    expect(C17_DEFAULT_SAVED_ADDRESSES[0].fullAddress).toBe(
      "1234 E Example Lane, Phoenix, AZ 85014"
    );

    expect(C17_DEFAULT_SAVED_ADDRESSES[1].id).toBe("relatives-residence");
    expect(C17_DEFAULT_SAVED_ADDRESSES[1].fullAddress).toBe(
      "5678 N Demo Avenue, Phoenix, AZ 85012"
    );

    expect(C17_DEMO_CONSTANTS.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(C17_DEMO_CONSTANTS.stepSub).toBe("/ C17");
  });

  it("verifies dynamic English and Spanish customer profile integration with strict isolation", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");
    expect(enProfile.phone).toBe("+1 602-555-0142");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
    expect(esProfile.phone).toBe("+1 602-555-0142");

    const source = fs.readFileSync(pickupAddressRoutePath, "utf8");
    expect(source).toContain("getC10DemoProfile(locale)");
    expect(source).toContain("profile.name");
    expect(source).toContain("profile.phone");
  });

  it("verifies exact C17 English strings match Figma node 382:576", () => {
    expect(en.c17.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c17.stepSub).toBe("/ C17");
    expect(en.c17.title).toBe("Where should we collect?");
    expect(en.c17.savedAddressesTitle).toBe("Saved addresses");
    expect(en.c17.homeTitle).toBe("Home · Default pickup");
    expect(en.c17.homeAddress).toBe("1234 E Example Lane, Phoenix, AZ 85014");
    expect(en.c17.relativeTitle).toBe("Relative's residence");
    expect(en.c17.relativeAddress).toBe("5678 N Demo Avenue, Phoenix, AZ 85012");
    expect(en.c17.pickupInstructionsTitle).toBe("Pickup instructions");
    expect(en.c17.labelContact).toBe("Contact");
    expect(en.c17.labelServiceType).toBe("Service type");
    expect(en.c17.labelPickupAccess).toBe("Pickup access");
    expect(en.c17.pickupAccessValue).toBe("Residential driveway · Details to confirm");
    expect(en.c17.addressRuleTitle).toBe("Address rule");
    expect(en.c17.addressRule1).toBe("Pickup must be validated for active Arizona service.");
    expect(en.c17.addressRule2).toBe(
      "A destination is added only when the selected service requires delivery."
    );
    expect(en.c17.confirmPickupCta).toBe("Confirm pickup address");
    expect(en.c17.addAddressCta).toBe("Add another address   ›");
    expect(en.c17.movingDropoffCta).toBe("Moving drop-off example   ›");
    expect(en.c17.footerNoticeDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c17.footerNoticeSrs).toBe("SRS  BK-02, CU-04, CU-09  ·  430 px / vertical scroll");
  });

  it("verifies exact C17 Spanish strings match Figma node 974:9412", () => {
    expect(es.c17.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
    expect(es.c17.stepSub).toBe("/ C17");
    expect(es.c17.title).toBe("¿Dónde hacemos la recogida?");
    expect(es.c17.subtitle).toBe("Usa la dirección guardada de {{name}} u otra de Arizona.");
    expect(es.c17.savedAddressesTitle).toBe("Direcciones guardadas");
    expect(es.c17.homeTitle).toBe("Casa · Recogida predeterminada");
    expect(es.c17.relativeTitle).toBe("Casa de un familiar");
    expect(es.c17.pickupInstructionsTitle).toBe("Instrucciones de recogida");
    expect(es.c17.labelContact).toBe("Contacto");
    expect(es.c17.labelServiceType).toBe("Tipo de servicio");
    expect(es.c17.labelPickupAccess).toBe("Acceso de recogida");
    expect(es.c17.pickupAccessValue).toBe("Entrada residencial · Detalles pendientes");
    expect(es.c17.addressRuleTitle).toBe("Regla de dirección");
    expect(es.c17.addressRule1).toBe(
      "La dirección debe estar dentro del servicio activo en Arizona."
    );
    expect(es.c17.addressRule2).toBe("Solo se añade destino si el servicio requiere entrega.");
    expect(es.c17.confirmPickupCta).toBe("Confirmar dirección de recogida");
    expect(es.c17.addAddressCta).toBe("Añadir otra dirección   ›");
    expect(es.c17.movingDropoffCta).toBe("Ejemplo de destino de mudanza   ›");
    expect(es.c17.footerNoticeDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c17.footerNoticeSrs).toBe(
      "SRS  BK-02, CU-04, CU-09  ·  430 px / desplazamiento vertical"
    );
  });

  it("verifies service catalog integrity for all 7 approved C15 services", () => {
    expect(C15_SERVICES).toHaveLength(7);
    const validIds = C15_SERVICES.map((s) => s.id);
    expect(validIds).toEqual([
      "junk-removal",
      "moving",
      "furniture-pickup",
      "appliance-removal",
      "mattress-removal",
      "garage-cleanout",
      "store-pickup",
    ]);

    const source = fs.readFileSync(pickupAddressRoutePath, "utf8");
    expect(source).toContain("resolveSelectedService");
    expect(source).toContain("isUnsupported");
  });

  it("verifies back button and Android hardware back return to C16 preserving service param", () => {
    const source = fs.readFileSync(pickupAddressRoutePath, "utf8");
    expect(source).toContain("hardwareBackPress");
    expect(source).toContain("BackHandler.addEventListener");
    expect(source).toContain('pathname: "/service-area"');
    expect(source).toContain("params: params.service ? { service: params.service } : undefined");
  });

  it("verifies C16 Use This Location CTA navigates to C17 for both English and Spanish preserving service param", () => {
    const c16Source = fs.readFileSync(serviceAreaRoutePath, "utf8");
    expect(c16Source).toContain('pathname: "/pickup-address"');
    expect(c16Source).toContain("params: params.service ? { service: params.service } : undefined");
  });

  it("verifies action buttons trigger navigation or truthful dismissible upcoming notices", () => {
    const source = fs.readFileSync(pickupAddressRoutePath, "utf8");
    expect(source).toContain("handleConfirm");
    expect(source).toContain("handleAddAddress");
    expect(source).toContain("handleMovingDropoff");
    expect(source).toContain('pathname: "/add-pickup-address"');
    expect(source).toContain("c17.noticeC18");
    expect(source).toContain("c17.noticeC17D");
    expect(source).toContain("handleDismissNotice");
  });

  it("verifies demo navigator registers both c17-en and c17-es pointing to /pickup-address", () => {
    const demoSource = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(demoSource).toContain('id: "c17-en"');
    expect(demoSource).toContain('id: "c17-es"');
    expect(demoSource).toContain('route: "/pickup-address"');
    expect(demoSource).toContain('locale: "es"');
  });

  it("verifies no fake backend booking creation, fake JWT or mock API success", () => {
    const source = fs.readFileSync(pickupAddressRoutePath, "utf8");
    expect(source).not.toContain("fetch(");
    expect(source).not.toContain("axios");
    expect(source).not.toContain("createBooking");
    expect(source).not.toContain("fakeToken");
    expect(source).not.toContain("jwt");
  });
});
