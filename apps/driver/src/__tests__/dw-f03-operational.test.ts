import { driverTranslationsEn } from "../i18n/driverEn";
import { driverTranslationsEs } from "../i18n/driverEs";
import {
  DEFAULT_AVAILABILITY_PREFERENCES,
  useAvailabilityStore,
} from "../stores/availabilityStore";
import { useDriverDocumentStore } from "../stores/documentStore";

describe("HAULIX Driver & Worker — DW-F03 Milestone Operational Home & Availability", () => {
  beforeEach(() => {
    useAvailabilityStore.getState().resetAvailability();
    useDriverDocumentStore.getState().resetDocuments();
  });

  describe("Availability Store Operations", () => {
    it("initializes with default online status and standard preferences", () => {
      const state = useAvailabilityStore.getState();
      expect(state.driverStatus).toBe("ONLINE");
      expect(state.helperStatus).toBe("ONLINE");
      expect(state.preferences.workingDays).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri"]);
      expect(state.preferences.startHour).toBe("8:00 AM");
      expect(state.preferences.endHour).toBe("6:00 PM");
      expect(state.preferences.serviceRadiusMiles).toBe(50);
      expect(state.preferences.preferredShift).toBe("Day shift");
      expect(state.preferences.vacationMode).toBe(false);
    });

    it("toggles driver availability between ONLINE and OFFLINE", () => {
      const store = useAvailabilityStore.getState();
      expect(store.driverStatus).toBe("ONLINE");

      store.toggleDriverStatus();
      expect(useAvailabilityStore.getState().driverStatus).toBe("OFFLINE");

      store.toggleDriverStatus();
      expect(useAvailabilityStore.getState().driverStatus).toBe("ONLINE");
    });

    it("toggles helper availability between ONLINE and OFFLINE", () => {
      const store = useAvailabilityStore.getState();
      expect(store.helperStatus).toBe("ONLINE");

      store.toggleHelperStatus();
      expect(useAvailabilityStore.getState().helperStatus).toBe("OFFLINE");

      store.toggleHelperStatus();
      expect(useAvailabilityStore.getState().helperStatus).toBe("ONLINE");
    });

    it("allows explicitly setting status values", () => {
      const store = useAvailabilityStore.getState();
      store.setDriverStatus("IN_SERVICE");
      expect(useAvailabilityStore.getState().driverStatus).toBe("IN_SERVICE");

      store.setHelperStatus("BUSY");
      expect(useAvailabilityStore.getState().helperStatus).toBe("BUSY");
    });

    it("toggles working days correctly (add and remove)", () => {
      const store = useAvailabilityStore.getState();
      expect(store.preferences.workingDays).toContain("Mon");

      // Remove Mon
      store.toggleWorkingDay("Mon");
      expect(useAvailabilityStore.getState().preferences.workingDays).not.toContain("Mon");

      // Add Sat
      store.toggleWorkingDay("Sat");
      expect(useAvailabilityStore.getState().preferences.workingDays).toContain("Sat");
    });

    it("updates working hours and service radius", () => {
      const store = useAvailabilityStore.getState();
      store.setWorkingHours("7:00 AM", "5:00 PM");
      store.setServiceRadius(75);
      store.setPreferredShift("Evening shift");
      store.setVacationMode(true);

      const updated = useAvailabilityStore.getState().preferences;
      expect(updated.startHour).toBe("7:00 AM");
      expect(updated.endHour).toBe("5:00 PM");
      expect(updated.serviceRadiusMiles).toBe(75);
      expect(updated.preferredShift).toBe("Evening shift");
      expect(updated.vacationMode).toBe(true);
    });

    it("saves partial preferences and resets to defaults", () => {
      const store = useAvailabilityStore.getState();
      store.savePreferences({ serviceRadiusMiles: 100, vacationMode: true });

      expect(useAvailabilityStore.getState().preferences.serviceRadiusMiles).toBe(100);
      expect(useAvailabilityStore.getState().preferences.vacationMode).toBe(true);

      store.resetAvailability();
      expect(useAvailabilityStore.getState().preferences).toEqual(DEFAULT_AVAILABILITY_PREFERENCES);
      expect(useAvailabilityStore.getState().driverStatus).toBe("ONLINE");
      expect(useAvailabilityStore.getState().helperStatus).toBe("ONLINE");
    });
  });

  describe("Document Store Role Isolation (DW-F02 Fixes in DW-F03)", () => {
    it("maintains separate document collections for Driver and Helper", () => {
      const store = useDriverDocumentStore.getState();
      const driverDocs = store.getRoleDocuments("PRIMARY_DRIVER");
      const helperDocs = store.getRoleDocuments("HELPER");

      expect(driverDocs).toBeDefined();
      expect(helperDocs).toBeDefined();
      expect(store.getRoleStatus("PRIMARY_DRIVER")).toBe("CHECKLIST");
      expect(store.getRoleStatus("HELPER")).toBe("CHECKLIST");
    });

    it("updating Driver documents does not mutate Helper documents", () => {
      const store = useDriverDocumentStore.getState();

      store.uploadDocumentMock("DRIVER_LICENSE", "driver_license_test.jpg", "PRIMARY_DRIVER");

      const driverDocs = useDriverDocumentStore.getState().getRoleDocuments("PRIMARY_DRIVER");
      const helperDocs = useDriverDocumentStore.getState().getRoleDocuments("HELPER");

      expect(driverDocs.DRIVER_LICENSE.status).toBe("UPLOADED");
      expect(driverDocs.DRIVER_LICENSE.fileName).toBe("driver_license_test.jpg");

      // Helper's DRIVER_LICENSE should remain untouched (NOT_UPLOADED in default helper docs)
      expect(helperDocs.DRIVER_LICENSE.status).toBe("NOT_UPLOADED");
    });

    it("setting Driver scenario to ACTION_REQUIRED does not alter Helper status", () => {
      const store = useDriverDocumentStore.getState();

      store.setScenario("ACTION_REQUIRED", "PRIMARY_DRIVER");

      expect(useDriverDocumentStore.getState().getRoleStatus("PRIMARY_DRIVER")).toBe(
        "ACTION_REQUIRED"
      );
      expect(useDriverDocumentStore.getState().getRoleStatus("HELPER")).toBe("CHECKLIST");

      const driverDocs = useDriverDocumentStore.getState().getRoleDocuments("PRIMARY_DRIVER");
      const helperDocs = useDriverDocumentStore.getState().getRoleDocuments("HELPER");

      expect(driverDocs.GOVERNMENT_ID.status).toBe("REJECTED");
      expect(helperDocs.GOVERNMENT_ID.status).toBe("VERIFIED");
    });

    it("setting Helper scenario to APPROVED does not alter Driver status", () => {
      const store = useDriverDocumentStore.getState();

      store.setScenario("APPROVED", "HELPER");

      expect(useDriverDocumentStore.getState().getRoleStatus("HELPER")).toBe("APPROVED");
      expect(useDriverDocumentStore.getState().getRoleStatus("PRIMARY_DRIVER")).toBe("CHECKLIST");
    });

    it("submitForReview operates on the designated role independently", () => {
      const store = useDriverDocumentStore.getState();

      store.uploadDocumentMock("GOVERNMENT_ID", "helper_id.jpg", "HELPER");
      store.submitForReview("HELPER");

      expect(useDriverDocumentStore.getState().getRoleStatus("HELPER")).toBe("PENDING");
      expect(useDriverDocumentStore.getState().getRoleStatus("PRIMARY_DRIVER")).toBe("CHECKLIST");
    });
  });

  describe("Bilingual Symmetry for DW-F03 Screens & Overlays", () => {
    it("DW09 Driver Dashboard has symmetric keys between English and Spanish", () => {
      const en = driverTranslationsEn.driver.dashboardDriver;
      const es = driverTranslationsEs.driver.dashboardDriver;

      expect(en).toBeDefined();
      expect(es).toBeDefined();

      const enKeys = Object.keys(en).sort();
      const esKeys = Object.keys(es).sort();
      expect(esKeys).toEqual(enKeys);

      expect(en.title).toBe("Driver dashboard");
      expect(es.title).toBe("Inicio del conductor");
      expect(en.onlinePill).toBe("ONLINE");
      expect(es.onlinePill).toBe("EN LÍNEA");
      expect(en.offlinePill).toBe("OFFLINE");
      expect(es.offlinePill).toBe("DESCONECTADO");
      expect(en.rating).toContain("verified Driver");
      expect(es.rating).toContain("Conductor verificado");
    });

    it("DW31 Helper Dashboard has symmetric keys between English and Spanish", () => {
      const en = driverTranslationsEn.driver.dashboardHelper;
      const es = driverTranslationsEs.driver.dashboardHelper;

      expect(en).toBeDefined();
      expect(es).toBeDefined();

      const enKeys = Object.keys(en).sort();
      const esKeys = Object.keys(es).sort();
      expect(esKeys).toEqual(enKeys);

      expect(en.title).toBe("Helper dashboard");
      expect(es.title).toBe("Inicio del ayudante");
      expect(en.greeting).toBe("Welcome back, Helper");
      expect(es.greeting).toBe("Bienvenido, Ayudante");
      expect(en.card1Title).toBe("Invitations waiting");
      expect(es.card1Title).toBe("Invitaciones pendientes");
      expect(en.card4Title).toBe("Independent responsibility");
      expect(es.card4Title).toBe("Responsabilidad individual");
    });

    it("DW39 Availability Settings has symmetric keys between English and Spanish", () => {
      const en = driverTranslationsEn.driver.availabilitySettings;
      const es = driverTranslationsEs.driver.availabilitySettings;

      expect(en).toBeDefined();
      expect(es).toBeDefined();

      const enKeys = Object.keys(en).sort();
      const esKeys = Object.keys(es).sort();
      expect(esKeys).toEqual(enKeys);

      expect(en.title).toBe("Availability settings");
      expect(es.title).toBe("Disponibilidad");
      expect(en.saveCta).toBe("Save availability");
      expect(es.saveCta).toBe("Guardar disponibilidad");
      expect(en.workingDaysTitle).toBe("Working days");
      expect(es.workingDaysTitle).toBe("Días de trabajo");
    });

    it("OV05 Availability Preferences Overlay has symmetric keys between English and Spanish", () => {
      const en = driverTranslationsEn.driver.availabilityOverlay;
      const es = driverTranslationsEs.driver.availabilityOverlay;

      expect(en).toBeDefined();
      expect(es).toBeDefined();

      const enKeys = Object.keys(en).sort();
      const esKeys = Object.keys(es).sort();
      expect(esKeys).toEqual(enKeys);

      expect(en.title).toBe("Availability preferences");
      expect(es.title).toBe("Preferencias de disponibilidad");
      expect(en.closeCta).toBe("Close preview");
      expect(es.closeCta).toBe("Cerrar vista previa");
    });
  });
});
