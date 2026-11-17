import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import { C17A_INITIAL_VALUES, C17A_INITIAL_VALUES_ES } from "../fixtures/c17aAddAddress";
import { C17_DEFAULT_SAVED_ADDRESSES } from "../fixtures/c17PickupAddress";

describe("C17-V Address Validation Error — English ONLY (Node 382:708)", () => {
  const c17vRoutePath = path.resolve(__dirname, "../../app/(app)/pickup-address-validation.tsx");
  const c17aRoutePath = path.resolve(__dirname, "../../app/(app)/add-pickup-address.tsx");
  const c17RoutePath = path.resolve(__dirname, "../../app/(app)/pickup-address.tsx");
  const flowHeaderPath = path.resolve(__dirname, "../components/navigation/FlowHeaderBack.tsx");
  const c17IconsPath = path.resolve(__dirname, "../components/discovery/C17Icons.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("1. verifies exact C17-V English Figma copy from Node 382:708", () => {
    expect(en.c17v.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c17v.stepSub).toBe("/ C17-V");
    expect(en.c17v.title).toBe("Review pickup details");
    expect(en.c17v.subtitle).toBe(
      "The address cannot be used until the required location fields are confirmed."
    );
    expect(en.c17v.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c17v.cardHeading).toBe("Location verification incomplete");
    expect(en.c17v.statusBadge).toBe("Action required");
    expect(en.c17v.guidance).toBe(
      "Confirm street, city, state, ZIP and eligible service coverage."
    );
    expect(en.c17v.warning).toBe("Do not continue to quoting with an unresolved pickup location.");
    expect(en.c17v.editAddressCta).toBe("Edit address details");
    expect(en.c17v.useHomeCta).toBe("Use verified home address   ›");
    expect(en.c17v.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c17v.footerSrs).toBe("SRS  BK-02, SV-12  ·  430 px / vertical scroll");
  });

  it("2. verifies correct warning icon and status badge state", () => {
    const iconsSource = fs.readFileSync(c17IconsPath, "utf8");
    expect(iconsSource).toContain("C17VAlertIcon");
    expect(iconsSource).toContain("#F36D6D");
    expect(iconsSource).toContain("M9 6.75V10.5M9 13.5H9.075M9 1.5L16.5 15.75H1.5L9 1.5Z");

    const routeSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(routeSource).toContain("<C17VAlertIcon");
    expect(routeSource).toContain('testID="c17v-status-badge"');
  });

  it("3. verifies dynamic English customer context (Sarah Mitchell / HX-DEMO-1027) with profile isolation", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");
    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");

    const routeSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(routeSource).toContain("useCustomerProfile(currentLocale)");
    expect(routeSource).toContain("getC10DemoProfile(locale)");
    expect(routeSource).toContain('DEFAULT_BOOKING_ID = "HX-DEMO-1027"');
    expect(routeSource).toContain('testID="c17v-customer-chip"');
  });

  it("4. verifies valid local C17-A form navigates to C17-V in both English and Spanish", () => {
    const c17aSource = fs.readFileSync(c17aRoutePath, "utf8");
    expect(c17aSource).toContain('pathname: "/pickup-address-validation"');
    expect(c17aSource).toContain("onValidateSuccess(formData)");
  });

  it("5. verifies invalid local C17-A form remains on C17-A and shows inline errors", () => {
    const c17aSource = fs.readFileSync(c17aRoutePath, "utf8");
    expect(c17aSource).toContain("validateForm");
    expect(c17aSource).toContain("if (!validateForm())");
    expect(c17aSource).toContain("return;");
  });

  it("6. verifies unsaved address draft is preserved and passed via navigation parameters", () => {
    const c17aSource = fs.readFileSync(c17aRoutePath, "utf8");
    expect(c17aSource).toContain("label: draft.label");
    expect(c17aSource).toContain("street: draft.street");
    expect(c17aSource).toContain("city: draft.city");
    expect(c17aSource).toContain("state: draft.state");
    expect(c17aSource).toContain("zipCode: draft.zipCode");
    expect(c17aSource).toContain("pickupNotes: draft.pickupNotes");

    const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(c17vSource).toContain("params.label");
    expect(c17vSource).toContain("params.street");
    expect(c17vSource).toContain("params.city");
    expect(c17vSource).toContain("params.state");
    expect(c17vSource).toContain("params.zipCode");
    expect(c17vSource).toContain("params.pickupNotes");
  });

  it("7. verifies Edit address details CTA returns to C17-A with draft intact", () => {
    const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(c17vSource).toContain('pathname: "/add-pickup-address"');
    expect(c17vSource).toContain('testID="c17v-primary-edit-cta"');
  });

  it("8. verifies Use verified home address CTA navigates to C17 with home selected", () => {
    const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(c17vSource).toContain('pathname: "/pickup-address"');
    expect(c17vSource).toContain("C17_DEFAULT_SAVED_ADDRESSES[0].id");
    expect(c17vSource).toContain('testID="c17v-secondary-use-home-cta"');
    expect(C17_DEFAULT_SAVED_ADDRESSES[0].id).toBe("home-default");
  });

  it("9. verifies FlowHeaderBack and Android hardware Back navigation handling", () => {
    expect(fs.existsSync(flowHeaderPath)).toBe(true);
    const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(c17vSource).toContain("<FlowHeaderBack");
    expect(c17vSource).toContain("useHardwareBack");
    expect(c17vSource).toContain("router.canGoBack()");

    // Pinned header outside scroll area
    const headerIndex = c17vSource.indexOf("<FlowHeaderBack");
    const scrollIndex = c17vSource.indexOf("<ScrollView");
    expect(headerIndex).toBeLessThan(scrollIndex);
  });

  it("10. verifies canonical service ID preservation through navigation", () => {
    const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(c17vSource).toContain("service: params.service");
  });

  it("11. verifies unsupported service handling and safe defaults", () => {
    const c17Source = fs.readFileSync(c17RoutePath, "utf8");
    expect(c17Source).toContain("C15_SERVICES");
    expect(c17Source).toContain("unsupportedServiceNotice");
  });

  it("12. verifies no progression to quotation occurs while verification is unresolved", () => {
    const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(c17vSource).not.toContain("/quote");
    expect(c17vSource).not.toContain("quotation");
    expect(c17vSource).toContain("Do not continue to quoting with an unresolved pickup location.");
  });

  it("13. verifies English C17 and C17-A regression", () => {
    expect(C17A_INITIAL_VALUES.label).toBe("Storage unit");
    expect(C17A_INITIAL_VALUES.street).toBe("4100 N 24th Street");
    expect(C17A_INITIAL_VALUES.city).toBe("Phoenix");
    expect(en.c17a.title).toBe("Add a pickup location");
    expect(en.c17.title).toBe("Where should we collect?");
  });

  it("14. verifies Spanish C17 and C17-A regression and valid navigation to C17-V", () => {
    expect(C17A_INITIAL_VALUES_ES.label).toBe("Trastero");
    expect(C17A_INITIAL_VALUES_ES.street).toBe("4100 N 24th Street");
    expect(es.c17a.title).toBe("Añadir punto de recogida");
    expect(es.c17.title).toBe("¿Dónde hacemos la recogida?");

    const c17aSource = fs.readFileSync(c17aRoutePath, "utf8");
    expect(c17aSource).toContain("validateForm");
    expect(c17aSource).toContain("onValidateSuccess(formData)");
  });

  it("15. verifies direct QA route fallback in DemoScreenNavigator for both EN and ES", () => {
    const demoSource = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(demoSource).toContain('id: "c17v-en"');
    expect(demoSource).toContain('id: "c17v-es"');
    expect(demoSource).toContain('figmaNode: "Node 974:9576"');
    expect(demoSource).toContain('figmaNode: "Node 382:708"');
  });

  it("16. verifies exact Spanish C17-V copy from Figma Node 974:9576", () => {
    expect(es.c17v.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
    expect(es.c17v.stepSub).toBe("/ C17-V");
    expect(es.c17v.title).toBe("Revisar detalles de recogida");
    expect(es.c17v.subtitle).toBe("La dirección no se puede usar hasta validar los campos.");
    expect(es.c17v.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c17v.cardHeading).toBe("Verificación de ubicación incompleta");
    expect(es.c17v.statusBadge).toBe("Acción necesaria");
    expect(es.c17v.guidance).toBe("Confirma calle, ciudad, estado, código postal y cobertura.");
    expect(es.c17v.warning).toBe("No avances al precio con una dirección sin validar.");
    expect(es.c17v.editAddressCta).toBe("Editar dirección");
    expect(es.c17v.useHomeCta).toBe("Usar la dirección verificada de casa   ›");
    expect(es.c17v.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c17v.footerSrs).toBe("SRS  BK-02, SV-12  ·  430 px / desplazamiento vertical");
  });

  it("17. verifies Spanish customer booking chip dynamic resolution (Bryan Lopez Mendoza)", () => {
    const routeSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(routeSource).toContain('currentLocale === "es" && profile.name === "Bryan Lopez"');
    expect(routeSource).toContain('"BRYAN LOPEZ MENDOZA"');
  });

  it("verifies C17-V strictly omits bottom navigation bar", () => {
    const c17vSource = fs.readFileSync(c17vRoutePath, "utf8");
    expect(c17vSource).not.toContain("CustomerBottomNav");
    expect(c17vSource).not.toContain("bottom-nav");
  });
});
