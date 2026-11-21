import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
  getW05DispatchState,
  INITIAL_W05_DISPATCH_STATE,
  isCancellationFeeFree,
  resetDispatchDemo,
  simulateCrewEnRoute,
  simulateDriverMatched,
  simulateFeeFreeExit,
  W05_CANCELLATION_WINDOWS,
  W05_DEMO_CREW,
} from "../fixtures/c32Dispatch";
import { W03_CUSTOMER_CONFIRMED_INVENTORY } from "../fixtures/c36Scheduling";

describe("HAULIX Phase 03.43 — W05 Dispatch & Assignment Frontend Implementation", () => {
  const routesDir = path.resolve(__dirname, "../../app/(app)");
  const demoNavPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
  const mapComponentPath = path.resolve(__dirname, "../components/map/HaulixDispatchMap.tsx");
  const iconsPath = path.resolve(__dirname, "../components/dispatch/C32Icons.tsx");
  const fixturesPath = path.resolve(__dirname, "../fixtures/c32Dispatch.ts");

  beforeEach(() => {
    resetDispatchDemo();
  });

  describe("1. Route Architecture & Demo Navigator Registration", () => {
    const screens = [
      { id: "c32a", file: "searching-for-driver.tsx", route: "/searching-for-driver" },
      { id: "c32b", file: "driver-matched.tsx", route: "/driver-matched" },
      { id: "c32c", file: "crew-tracking.tsx", route: "/crew-tracking" },
      { id: "c32d", file: "cancellation-windows.tsx", route: "/cancellation-windows" },
    ];

    it.each(screens)("confirms screen file exists for $file and routes to $route", ({ file }) => {
      const filePath = path.join(routesDir, file);
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf8");
      expect(content).toContain("export default function");
    });

    it("verifies DemoScreenNavigator registers all 8 bilingual screen variants", () => {
      const navContent = fs.readFileSync(demoNavPath, "utf8");
      expect(navContent).toContain('id: "c32a-en"');
      expect(navContent).toContain('id: "c32a-es"');
      expect(navContent).toContain('id: "c32b-en"');
      expect(navContent).toContain('id: "c32b-es"');
      expect(navContent).toContain('id: "c32c-en"');
      expect(navContent).toContain('id: "c32c-es"');
      expect(navContent).toContain('id: "c32d-en"');
      expect(navContent).toContain('id: "c32d-es"');
      expect(navContent).toContain('route: "/searching-for-driver"');
      expect(navContent).toContain('route: "/driver-matched"');
      expect(navContent).toContain('route: "/crew-tracking"');
      expect(navContent).toContain('route: "/cancellation-windows"');
    });

    it("verifies upstream handoff wiring from W04 to W05", () => {
      const asapContent = fs.readFileSync(
        path.join(routesDir, "asap-request-recorded.tsx"),
        "utf8"
      );
      expect(asapContent).toContain('pathname: "/searching-for-driver"');

      const bookingContent = fs.readFileSync(path.join(routesDir, "booking-recorded.tsx"), "utf8");
      expect(bookingContent).toContain('pathname: "/searching-for-driver"');
    });
  });

  describe("2. Map High Fidelity Component (HaulixDispatchMap.tsx)", () => {
    it("confirms HaulixDispatchMap renders vector geometry without external API billing dependencies", () => {
      expect(fs.existsSync(mapComponentPath)).toBe(true);
      const mapContent = fs.readFileSync(mapComponentPath, "utf8");
      // SVG primitive usage
      expect(mapContent).toContain("<Svg");
      expect(mapContent).toContain("<Path");
      expect(mapContent).toContain("<Circle");
      expect(mapContent).toContain("<Rect");
      // Map mode variants
      expect(mapContent).toContain('"searching"');
      expect(mapContent).toContain('"matched"');
      expect(mapContent).toContain('"en_route"');
      // No live Google Maps SDK billing calls
      expect(mapContent).not.toContain("maps.googleapis.com");
      expect(mapContent).not.toContain("GOOGLE_MAPS_API_KEY");
    });

    it("confirms vector fixture existence and contracts", () => {
      expect(fs.existsSync(fixturesPath)).toBe(true);
      const fixturesContent = fs.readFileSync(fixturesPath, "utf8");
      expect(fixturesContent).toContain("W05_DEMO_CREW");
      expect(fixturesContent).toContain("W05_CANCELLATION_WINDOWS");
    });
  });

  describe("3. Dedicated C32 Vector Icons (C32Icons.tsx)", () => {
    it("confirms 12 dedicated dispatch and tracking SVG icons are present", () => {
      expect(fs.existsSync(iconsPath)).toBe(true);
      const iconsContent = fs.readFileSync(iconsPath, "utf8");
      const iconNames = [
        "C32RadarIcon",
        "C32VanIcon",
        "C32CrosshairTargetIcon",
        "C32ZoomInIcon",
        "C32ZoomOutIcon",
        "C32CallIcon",
        "C32ChatIcon",
        "C32ShareIcon",
        "C32ShieldCheckIcon",
        "C32ClockAlertIcon",
        "C32LocationPinIcon",
        "C32StarRatingIcon",
      ];
      for (const icon of iconNames) {
        expect(iconsContent).toContain(`export function ${icon}`);
      }
    });
  });

  describe("4. Business Invariants & Cancellation Policy Preservations", () => {
    it("preserves exact customer confirmed inventory: 4 pieces across 3 categories", () => {
      expect(W03_CUSTOMER_CONFIRMED_INVENTORY.piecesCount).toBe(4);
      expect(W03_CUSTOMER_CONFIRMED_INVENTORY.categoriesCount).toBe(3);
      expect(INITIAL_W05_DISPATCH_STATE.confirmedItemsEn).toBe(
        W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn
      );
      expect(INITIAL_W05_DISPATCH_STATE.confirmedItemsEs).toBe(
        W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEs
      );
    });

    it("preserves non-binding estimate invariant of $356.00 USD", () => {
      expect(INITIAL_W05_DISPATCH_STATE.quoteAmount).toBe("$356.00");
      expect(en.c32aSearchingDriver.holdStatusValue).toContain("$356.00");
      expect(es.c32aSearchingDriver.holdStatusValue).toContain("$356.00");
      expect(en.c32cCrewTracking.holdValue).toContain("$356.00 USD");
      expect(es.c32cCrewTracking.holdValue).toContain("$356.00 USD");
    });

    it("verifies 3-tier cancellation policy with fee-free initial window", () => {
      expect(W05_CANCELLATION_WINDOWS).toHaveLength(3);
      // Window 1: Before driver match
      expect(W05_CANCELLATION_WINDOWS[0].isFeeFree).toBe(true);
      expect(W05_CANCELLATION_WINDOWS[0].feeAmount).toBe("$0.00");
      // Window 2: First 5 minutes
      expect(W05_CANCELLATION_WINDOWS[1].isFeeFree).toBe(true);
      expect(W05_CANCELLATION_WINDOWS[1].feeAmount).toBe("$0.00");
      // Window 3: Post-grace en route
      expect(W05_CANCELLATION_WINDOWS[2].isFeeFree).toBe(false);
      expect(W05_CANCELLATION_WINDOWS[2].feeAmount).toBe("$100.00");
    });

    it("verifies demo crew contract complies with Driver/Helper role boundaries", () => {
      expect(W05_DEMO_CREW.driver.name).toBe("Marcus Vance");
      expect(W05_DEMO_CREW.driver.isVerified).toBe(true);
      expect(W05_DEMO_CREW.helperCount).toBe(1);
      expect(W05_DEMO_CREW.vehicle.makeModel).toBe("Ford Transit High Roof");
      expect(W05_DEMO_CREW.vehicle.licensePlate).toBe("#AZ-HLX29");
    });

    it("verifies state transitions between searching, matched, en_route, and conditional cancellation safety", () => {
      expect(getW05DispatchState().phase).toBe("searching");
      expect(isCancellationFeeFree("searching")).toBe(true);
      expect(isCancellationFeeFree("matched")).toBe(true);
      expect(isCancellationFeeFree("en_route")).toBe(false);

      // Fee-free during search
      simulateFeeFreeExit();
      expect(getW05DispatchState().phase).toBe("cancelled_fee_free");
      expect(getW05DispatchState().isCancelled).toBe(true);

      // Reset and transition to driver matched
      resetDispatchDemo();
      simulateDriverMatched();
      expect(getW05DispatchState().phase).toBe("matched");
      expect(getW05DispatchState().previousPhase).toBe("searching");

      // Fee-free during match grace period
      simulateFeeFreeExit();
      expect(getW05DispatchState().phase).toBe("cancelled_fee_free");

      // Reset and transition to en route
      resetDispatchDemo();
      simulateCrewEnRoute();
      expect(getW05DispatchState().phase).toBe("en_route");
      expect(getW05DispatchState().previousPhase).toBe("matched");

      // Post-grace period while en-route is NOT fee-free without delay waiver!
      simulateFeeFreeExit();
      expect(getW05DispatchState().phase).toBe("en_route");
      expect(getW05DispatchState().isCancelled).toBe(false);
      expect(getW05DispatchState().cancelReason).toBe("requires_delay_waiver_review");
    });
  });

  describe("5. Complete Bilingual String Parity & Exact Localization", () => {
    it("verifies C32-A Searching for Driver English and Spanish strings", () => {
      expect(en.c32aSearchingDriver.progressLabel).toBe("W05 · DISPATCH SEARCH");
      expect(es.c32aSearchingDriver.progressLabel).toBe("W05 · BÚSQUEDA DE DESPACHO");
      expect(en.c32aSearchingDriver.screenTitle).toBe("Searching for Driver");
      expect(es.c32aSearchingDriver.screenTitle).toBe("Buscando conductor");
      expect(en.c32aSearchingDriver.statusBadge).toBe("DISPATCH RADAR ACTIVE");
      expect(es.c32aSearchingDriver.statusBadge).toBe("RADAR DE DESPACHO ACTIVO");
      expect(en.c32aSearchingDriver.cancelSearchCta).toBe("Cancel search (Fee-Free)");
      expect(es.c32aSearchingDriver.cancelSearchCta).toBe("Cancelar búsqueda (sin cargo)");
      expect(en.c32aSearchingDriver.holdStatusValue).toBe("Simulated $356.00 · $0.00 Charged");
      expect(es.c32aSearchingDriver.holdStatusValue).toBe("Simulado $356.00 · $0.00 cobrado");
    });

    it("verifies C32-B Driver Matched English and Spanish strings", () => {
      expect(en.c32bDriverMatched.progressLabel).toBe("W05 · DRIVER MATCHED");
      expect(es.c32bDriverMatched.progressLabel).toBe("W05 · CONDUCTOR ASIGNADO");
      expect(en.c32bDriverMatched.screenTitle).toBe("Driver matched!");
      expect(es.c32bDriverMatched.screenTitle).toBe("¡Conductor encontrado!");
      expect(en.c32bDriverMatched.driverName).toBe("Marcus Vance");
      expect(en.c32bDriverMatched.driverRating).toBe("4.9 (312 jobs)");
      expect(en.c32bDriverMatched.primaryCta).toBe("Confirm & track live arrival ›");
      expect(es.c32bDriverMatched.primaryCta).toBe("Confirmar y seguir llegada en vivo ›");
      expect(en.c32bDriverMatched.secondaryCta).toBe("View cancellation terms");
      expect(es.c32bDriverMatched.secondaryCta).toBe("Ver términos de cancelación");
    });

    it("verifies C32-C Crew Assigned & Tracking English and Spanish strings", () => {
      expect(en.c32cCrewTracking.progressLabel).toBe("W05 · LIVE TRACKING");
      expect(es.c32cCrewTracking.progressLabel).toBe("W05 · SEGUIMIENTO EN VIVO");
      expect(en.c32cCrewTracking.screenTitle).toBe("Crew assigned & en route");
      expect(es.c32cCrewTracking.screenTitle).toBe("Equipo asignado y en camino");
      expect(en.c32cCrewTracking.holdValue).toBe("$356.00 USD (Uncaptured)");
      expect(es.c32cCrewTracking.holdValue).toBe("$356.00 USD (Sin capturar)");
      expect(en.c32cCrewTracking.primaryCta).toBe("View detailed service summary");
      expect(es.c32cCrewTracking.primaryCta).toBe("Ver resumen detallado del servicio");
      expect(en.c32cCrewTracking.secondaryCta).toBe("Cancellation & exception options");
      expect(es.c32cCrewTracking.secondaryCta).toBe("Opciones de cancelación y excepciones");
    });

    it("verifies C32-D Cancellation Windows English and Spanish strings", () => {
      expect(en.c32dCancellationWindows.progressLabel).toBe("W05 · CANCELLATION POLICY");
      expect(es.c32dCancellationWindows.progressLabel).toBe("W05 · POLÍTICA DE CANCELACIÓN");
      expect(en.c32dCancellationWindows.screenTitle).toBe("Cancellation windows & policy");
      expect(es.c32dCancellationWindows.screenTitle).toBe("Ventanas y política de cancelación");
      expect(en.c32dCancellationWindows.keepBookingCta).toBe("Keep booking & return to tracking");
      expect(es.c32dCancellationWindows.keepBookingCta).toBe(
        "Mantener reserva y volver al seguimiento"
      );
      expect(en.c32dCancellationWindows.feeFreeExitCta).toBe("Request fee-free cancellation");
      expect(es.c32dCancellationWindows.feeFreeExitCta).toBe("Solicitar cancelación sin cargo");
      expect(en.c32dCancellationWindows.cancelSearchCta).toBe("Cancel search (Fee-Free · $0)");
      expect(es.c32dCancellationWindows.cancelSearchCta).toBe("Cancelar búsqueda (Sin cargo · $0)");
      expect(en.c32dCancellationWindows.cancelGracePeriodCta).toBe(
        "Cancel match (5-Min Grace · $0)"
      );
      expect(es.c32dCancellationWindows.cancelGracePeriodCta).toBe(
        "Cancelar coincidencia (Gracia 5 min · $0)"
      );
    });

    it("verifies C32 Map Dedicated English and Spanish localization keys", () => {
      expect(en.c32Map.searchingBadge).toBe("RADAR ACTIVE · DISPATCH SEARCHING");
      expect(es.c32Map.searchingBadge).toBe("RADAR ACTIVO · BÚSQUEDA DE DESPACHO");
      expect(en.c32Map.matchedBadge).toBe("DRIVER MATCHED · EN ROUTE SOON");
      expect(es.c32Map.matchedBadge).toBe("CONDUCTOR ASIGNADO · EN CAMINO PRONTO");
      expect(en.c32Map.crewEnRouteBadge).toContain("{{minutes}}");
      expect(es.c32Map.crewEnRouteBadge).toContain("{{minutes}}");
      expect(en.c32Map.recenterNotice).toBe("Camera centered on route");
      expect(es.c32Map.recenterNotice).toBe("Cámara centrada en la ruta");
      expect(en.c32Map.zoomInA11y).toBe("Zoom In");
      expect(es.c32Map.zoomInA11y).toBe("Acercar mapa");
      expect(en.c32Map.zoomOutA11y).toBe("Zoom Out");
      expect(es.c32Map.zoomOutA11y).toBe("Alejar mapa");
      expect(en.c32Map.recenterA11y).toBe("Recenter Map Viewport");
      expect(es.c32Map.recenterA11y).toBe("Recentrar mapa");
    });
  });

  describe("6. QA Navigator Production Security Isolation", () => {
    it("verifies DemoScreenNavigator contains strict production environment guardrail", () => {
      const navContent = fs.readFileSync(demoNavPath, "utf8");
      expect(navContent).toContain("isProductionBuild");
      expect(navContent).toContain('process.env.NODE_ENV === "production"');
      expect(navContent).toContain('process.env.EXPO_PUBLIC_APP_ENV === "production"');
      expect(navContent).toContain("return null");
    });
  });
});
