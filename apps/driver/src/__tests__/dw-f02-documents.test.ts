import { driverTranslationsEn } from "../i18n/driverEn";
import { driverTranslationsEs } from "../i18n/driverEs";
import { useDocumentStore } from "../stores/documentStore";

describe("HAULIX Driver & Worker — DW-F02 Milestone Verification", () => {
  beforeEach(() => {
    useDocumentStore.getState().resetDocuments();
  });

  describe("DW-F02: Document Store & Verification Scenarios", () => {
    it("initializes with default document items and checklist state", () => {
      const state = useDocumentStore.getState();
      expect(state.overallStatus).toBe("CHECKLIST");
      expect(Object.keys(state.documents).length).toBe(6);

      const dls = state.documents.DRIVER_LICENSE;
      expect(dls).toBeDefined();
      expect(dls.requiredForRoles).toContain("PRIMARY_DRIVER");

      const helperDoc = state.documents.GOVERNMENT_ID;
      expect(helperDoc).toBeDefined();
      expect(helperDoc.requiredForRoles).toContain("HELPER");
    });

    it("applies PENDING scenario correctly", () => {
      const store = useDocumentStore.getState();
      store.setScenario("PENDING");

      const updated = useDocumentStore.getState();
      expect(updated.overallStatus).toBe("PENDING");
      expect(updated.documents.INSURANCE_CERTIFICATE.status).toBe("PENDING_REVIEW");
    });

    it("applies ACTION_REQUIRED scenario with rejection feedback", () => {
      const store = useDocumentStore.getState();
      store.setScenario("ACTION_REQUIRED");

      const updated = useDocumentStore.getState();
      expect(updated.overallStatus).toBe("ACTION_REQUIRED");

      const rejectedDoc = updated.documents.GOVERNMENT_ID;
      expect(rejectedDoc.status).toBe("REJECTED");
      expect(rejectedDoc.rejectionReason).toBe("Image unclear or expired");
    });

    it("applies APPROVED scenario with all key documents verified", () => {
      const store = useDocumentStore.getState();
      store.setScenario("APPROVED");

      const updated = useDocumentStore.getState();
      expect(updated.overallStatus).toBe("APPROVED");
      expect(updated.documents.INSURANCE_CERTIFICATE.status).toBe("VERIFIED");
      expect(updated.documents.VEHICLE_REGISTRATION.status).toBe("VERIFIED");
    });

    it("allows uploading a document and tracks fileName and uploaded date", () => {
      const store = useDocumentStore.getState();
      store.uploadDocumentMock("DRIVER_LICENSE", "test_license.jpg");

      const updated = useDocumentStore.getState();
      const dl = updated.documents.DRIVER_LICENSE;
      expect(dl.fileName).toBe("test_license.jpg");
      expect(dl.status).toBe("UPLOADED");
      expect(dl.uploadedAt).toBeDefined();
    });

    it("submits uploaded documents for review", () => {
      const store = useDocumentStore.getState();
      store.uploadDocumentMock("VEHICLE_REGISTRATION", "new_reg.jpg");
      store.submitForReview();

      const updated = useDocumentStore.getState();
      expect(updated.overallStatus).toBe("PENDING");
      expect(updated.documents.VEHICLE_REGISTRATION.status).toBe("PENDING_REVIEW");
    });
  });

  describe("DW-F02: Bilingual Localization Symmetry", () => {
    it("has full English translation dictionary for all 7 DW-F02 screens", () => {
      // DW05
      expect(driverTranslationsEn.driver.driverVerification.title).toBe("Driver verification");
      expect(driverTranslationsEn.driver.driverVerification.uploadCta).toBe(
        "Upload driver documents"
      );
      expect(driverTranslationsEn.driver.driverVerification.helperInsteadCta).toBe(
        "Continue as Helper instead"
      );

      // DW06
      expect(driverTranslationsEn.driver.helperVerification.title).toBe("Helper verification");
      expect(driverTranslationsEn.driver.helperVerification.submitCta).toBe("Submit verification");

      // DW07
      expect(driverTranslationsEn.driver.driverDocuments.title).toBe("Driver documents");
      expect(driverTranslationsEn.driver.driverDocuments.submitCta).toBe("Submit for review");

      // DW08
      expect(driverTranslationsEn.driver.verificationStatus.title).toBe("Verification status");
      expect(driverTranslationsEn.driver.verificationStatus.statusPill).toBe("PENDING REVIEW");

      // DW33
      expect(driverTranslationsEn.driver.verificationAction.title).toBe(
        "Verification needs action"
      );
      expect(driverTranslationsEn.driver.verificationAction.resubmitCta).toBe("Resubmit documents");

      // DW38
      expect(driverTranslationsEn.driver.documentsVehicle.title).toBe("Documents & vehicle");
      expect(driverTranslationsEn.driver.documentsVehicle.uploadUpdateCta).toBe(
        "Upload or update a document"
      );

      // DW56
      expect(driverTranslationsEn.driver.helperDocuments.title).toBe(
        "Helper eligibility & documents"
      );
      expect(driverTranslationsEn.driver.helperDocuments.policyTitle).toBe("Helper verification");
    });

    it("has full Spanish translation symmetry for all 7 DW-F02 screens", () => {
      // DW05
      expect(driverTranslationsEs.driver.driverVerification.title).toBe(
        "Verificación del conductor"
      );
      expect(driverTranslationsEs.driver.driverVerification.uploadCta).toBe("Subir documentos");
      expect(driverTranslationsEs.driver.driverVerification.helperInsteadCta).toBe(
        "Continuar como Ayudante"
      );

      // DW06
      expect(driverTranslationsEs.driver.helperVerification.title).toBe(
        "Verificación del ayudante"
      );
      expect(driverTranslationsEs.driver.helperVerification.submitCta).toBe("Enviar verificación");

      // DW07
      expect(driverTranslationsEs.driver.driverDocuments.title).toBe("Documentos del conductor");
      expect(driverTranslationsEs.driver.driverDocuments.submitCta).toBe("Enviar a revisión");

      // DW08
      expect(driverTranslationsEs.driver.verificationStatus.title).toBe("Estado de verificación");
      expect(driverTranslationsEs.driver.verificationStatus.statusPill).toBe("EN REVISIÓN");

      // DW33
      expect(driverTranslationsEs.driver.verificationAction.title).toBe(
        "Verificación requiere acción"
      );
      expect(driverTranslationsEs.driver.verificationAction.resubmitCta).toBe(
        "Reenviar documentos"
      );

      // DW38
      expect(driverTranslationsEs.driver.documentsVehicle.title).toBe("Documentos y vehículo");
      expect(driverTranslationsEs.driver.documentsVehicle.uploadUpdateCta).toBe(
        "Subir o actualizar documento"
      );

      // DW56
      expect(driverTranslationsEs.driver.helperDocuments.title).toBe("Verificación del ayudante");
      expect(driverTranslationsEs.driver.helperDocuments.policyTitle).toBe(
        "Verificación de ayudante"
      );
    });
  });
});
