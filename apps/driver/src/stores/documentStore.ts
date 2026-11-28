import { create } from "zustand";

export type DocumentType =
  | "DRIVER_LICENSE"
  | "GOVERNMENT_ID"
  | "VEHICLE_REGISTRATION"
  | "INSURANCE_CERTIFICATE"
  | "IDENTITY_SELFIE"
  | "BACKGROUND_CHECK";

export type DocumentReviewStatus =
  | "NOT_UPLOADED"
  | "UPLOADED"
  | "PENDING_REVIEW"
  | "VERIFIED"
  | "NEEDS_UPDATE"
  | "REJECTED";

export type DemoWorkerRole = "PRIMARY_DRIVER" | "HELPER";

export interface MockDocument {
  id: DocumentType;
  titleKey: string;
  descriptionKey: string;
  status: DocumentReviewStatus;
  fileName?: string;
  uploadedAt?: string;
  rejectionReason?: string;
  requiredForRoles: DemoWorkerRole[];
}

export type VerificationFlowState =
  | "CHECKLIST"
  | "SUBMITTED"
  | "PENDING"
  | "ACTION_REQUIRED"
  | "APPROVED";

export type VerificationScenario = "INITIAL" | "PENDING" | "ACTION_REQUIRED" | "APPROVED";

export interface RoleDocumentCollection {
  documents: Record<DocumentType, MockDocument>;
  overallStatus: VerificationFlowState;
  scenario: VerificationScenario;
}

const createInitialDriverDocs = (): Record<DocumentType, MockDocument> => ({
  DRIVER_LICENSE: {
    id: "DRIVER_LICENSE",
    titleKey: "driver.documentsVehicle.licenseTitle",
    descriptionKey: "driver.documentsVehicle.licenseSub",
    status: "VERIFIED",
    fileName: "driver_license_front_back.jpg",
    uploadedAt: "2026-11-20",
    requiredForRoles: ["PRIMARY_DRIVER"],
  },
  GOVERNMENT_ID: {
    id: "GOVERNMENT_ID",
    titleKey: "driver.documentsVehicle.govIdTitle",
    descriptionKey: "driver.documentsVehicle.govIdSub",
    status: "VERIFIED",
    fileName: "state_id_scan.png",
    uploadedAt: "2026-11-20",
    requiredForRoles: ["PRIMARY_DRIVER", "HELPER"],
  },
  INSURANCE_CERTIFICATE: {
    id: "INSURANCE_CERTIFICATE",
    titleKey: "driver.documentsVehicle.insuranceTitle",
    descriptionKey: "driver.documentsVehicle.insuranceSub",
    status: "PENDING_REVIEW",
    fileName: "commercial_policy_cert.pdf",
    uploadedAt: "2026-11-25",
    requiredForRoles: ["PRIMARY_DRIVER"],
  },
  VEHICLE_REGISTRATION: {
    id: "VEHICLE_REGISTRATION",
    titleKey: "driver.documentsVehicle.registrationTitle",
    descriptionKey: "driver.documentsVehicle.registrationSub",
    status: "NEEDS_UPDATE",
    fileName: "expired_registration_2025.jpg",
    rejectionReason: "Renewal document required · Expired Oct 2026",
    requiredForRoles: ["PRIMARY_DRIVER"],
  },
  IDENTITY_SELFIE: {
    id: "IDENTITY_SELFIE",
    titleKey: "driver.helperDocuments.selfieTitle",
    descriptionKey: "driver.helperDocuments.selfieSub",
    status: "NOT_UPLOADED",
    requiredForRoles: ["PRIMARY_DRIVER"],
  },
  BACKGROUND_CHECK: {
    id: "BACKGROUND_CHECK",
    titleKey: "driver.helperDocuments.backgroundTitle",
    descriptionKey: "driver.helperDocuments.backgroundSub",
    status: "VERIFIED",
    uploadedAt: "2026-11-21",
    requiredForRoles: ["PRIMARY_DRIVER"],
  },
});

const createInitialHelperDocs = (): Record<DocumentType, MockDocument> => ({
  DRIVER_LICENSE: {
    id: "DRIVER_LICENSE",
    titleKey: "driver.documentsVehicle.licenseTitle",
    descriptionKey: "driver.documentsVehicle.licenseSub",
    status: "NOT_UPLOADED",
    requiredForRoles: ["HELPER"],
  },
  GOVERNMENT_ID: {
    id: "GOVERNMENT_ID",
    titleKey: "driver.documentsVehicle.govIdTitle",
    descriptionKey: "driver.documentsVehicle.govIdSub",
    status: "VERIFIED",
    fileName: "helper_gov_id_scan.png",
    uploadedAt: "2026-11-20",
    requiredForRoles: ["HELPER"],
  },
  INSURANCE_CERTIFICATE: {
    id: "INSURANCE_CERTIFICATE",
    titleKey: "driver.documentsVehicle.insuranceTitle",
    descriptionKey: "driver.documentsVehicle.insuranceSub",
    status: "NOT_UPLOADED",
    requiredForRoles: ["HELPER"],
  },
  VEHICLE_REGISTRATION: {
    id: "VEHICLE_REGISTRATION",
    titleKey: "driver.documentsVehicle.registrationTitle",
    descriptionKey: "driver.documentsVehicle.registrationSub",
    status: "NOT_UPLOADED",
    requiredForRoles: ["HELPER"],
  },
  IDENTITY_SELFIE: {
    id: "IDENTITY_SELFIE",
    titleKey: "driver.helperDocuments.selfieTitle",
    descriptionKey: "driver.helperDocuments.selfieSub",
    status: "VERIFIED",
    fileName: "live_selfie_match.jpg",
    uploadedAt: "2026-11-22",
    requiredForRoles: ["HELPER"],
  },
  BACKGROUND_CHECK: {
    id: "BACKGROUND_CHECK",
    titleKey: "driver.helperDocuments.backgroundTitle",
    descriptionKey: "driver.helperDocuments.backgroundSub",
    status: "VERIFIED",
    uploadedAt: "2026-11-21",
    requiredForRoles: ["HELPER"],
  },
});

interface DocumentStoreState {
  // Role-isolated states
  driver: RoleDocumentCollection;
  helper: RoleDocumentCollection;
  selectedDocForUpload: DocumentType | null;

  // Backward compatible properties for active role
  documents: Record<DocumentType, MockDocument>;
  overallStatus: VerificationFlowState;

  // Actions
  uploadDocumentMock: (
    docType: DocumentType,
    fileName?: string,
    targetRole?: DemoWorkerRole
  ) => void;
  removeDocumentMock: (docType: DocumentType, targetRole?: DemoWorkerRole) => void;
  submitForReview: (targetRole?: DemoWorkerRole) => void;
  setScenario: (scenario: VerificationScenario, targetRole?: DemoWorkerRole | "BOTH") => void;
  setSelectedDoc: (docType: DocumentType | null) => void;
  resetDocuments: () => void;
  clearRejection: (docType: DocumentType, targetRole?: DemoWorkerRole) => void;
  getRoleDocuments: (role: DemoWorkerRole) => Record<DocumentType, MockDocument>;
  getRoleStatus: (role: DemoWorkerRole) => VerificationFlowState;
}

export const useDocumentStore = create<DocumentStoreState>((set, get) => {
  const initialDriver: RoleDocumentCollection = {
    documents: createInitialDriverDocs(),
    overallStatus: "CHECKLIST",
    scenario: "INITIAL",
  };

  const initialHelper: RoleDocumentCollection = {
    documents: createInitialHelperDocs(),
    overallStatus: "CHECKLIST",
    scenario: "INITIAL",
  };

  return {
    driver: initialDriver,
    helper: initialHelper,
    selectedDocForUpload: "DRIVER_LICENSE",
    documents: initialDriver.documents,
    overallStatus: initialDriver.overallStatus,

    getRoleDocuments: (role) =>
      role === "PRIMARY_DRIVER" ? get().driver.documents : get().helper.documents,

    getRoleStatus: (role) =>
      role === "PRIMARY_DRIVER" ? get().driver.overallStatus : get().helper.overallStatus,

    uploadDocumentMock: (
      docType,
      fileName = "document_upload_demo.jpg",
      targetRole = "PRIMARY_DRIVER"
    ) =>
      set((state) => {
        const isDriver = targetRole === "PRIMARY_DRIVER";
        const targetCollection = isDriver ? { ...state.driver } : { ...state.helper };
        const updatedDocs = {
          ...targetCollection.documents,
          [docType]: {
            ...targetCollection.documents[docType],
            status: "UPLOADED" as DocumentReviewStatus,
            fileName,
            uploadedAt: new Date().toISOString().slice(0, 10),
            rejectionReason: undefined,
          },
        };

        const updatedCollection: RoleDocumentCollection = {
          ...targetCollection,
          documents: updatedDocs,
        };

        return isDriver
          ? {
              driver: updatedCollection,
              documents: updatedDocs,
            }
          : {
              helper: updatedCollection,
            };
      }),

    removeDocumentMock: (docType, targetRole = "PRIMARY_DRIVER") =>
      set((state) => {
        const isDriver = targetRole === "PRIMARY_DRIVER";
        const targetCollection = isDriver ? { ...state.driver } : { ...state.helper };
        const updatedDocs = {
          ...targetCollection.documents,
          [docType]: {
            ...targetCollection.documents[docType],
            status: "NOT_UPLOADED" as DocumentReviewStatus,
            fileName: undefined,
          },
        };

        const updatedCollection: RoleDocumentCollection = {
          ...targetCollection,
          documents: updatedDocs,
        };

        return isDriver
          ? {
              driver: updatedCollection,
              documents: updatedDocs,
            }
          : {
              helper: updatedCollection,
            };
      }),

    clearRejection: (docType, targetRole = "PRIMARY_DRIVER") =>
      set((state) => {
        const isDriver = targetRole === "PRIMARY_DRIVER";
        const targetCollection = isDriver ? { ...state.driver } : { ...state.helper };
        const currentDoc = targetCollection.documents[docType];
        if (!currentDoc) return {};

        const updatedDocs = {
          ...targetCollection.documents,
          [docType]: {
            ...currentDoc,
            rejectionReason: undefined,
            status: "UPLOADED" as DocumentReviewStatus,
          },
        };

        const updatedCollection: RoleDocumentCollection = {
          ...targetCollection,
          documents: updatedDocs,
        };

        return isDriver
          ? {
              driver: updatedCollection,
              documents: updatedDocs,
            }
          : {
              helper: updatedCollection,
            };
      }),

    submitForReview: (targetRole = "PRIMARY_DRIVER") =>
      set((state) => {
        const isDriver = targetRole === "PRIMARY_DRIVER";
        const targetCollection = isDriver ? { ...state.driver } : { ...state.helper };
        const updatedDocs = { ...targetCollection.documents };

        for (const key of Object.keys(updatedDocs) as DocumentType[]) {
          if (updatedDocs[key].status === "UPLOADED") {
            updatedDocs[key] = {
              ...updatedDocs[key],
              status: "PENDING_REVIEW",
            };
          }
        }

        const updatedCollection: RoleDocumentCollection = {
          ...targetCollection,
          documents: updatedDocs,
          overallStatus: "PENDING",
          scenario: "PENDING",
        };

        return isDriver
          ? {
              driver: updatedCollection,
              documents: updatedDocs,
              overallStatus: "PENDING",
            }
          : {
              helper: updatedCollection,
            };
      }),

    setScenario: (scenario, targetRole = "BOTH") =>
      set((state) => {
        const updateRoleScenario = (role: DemoWorkerRole): RoleDocumentCollection => {
          const freshDocs =
            role === "PRIMARY_DRIVER" ? createInitialDriverDocs() : createInitialHelperDocs();

          switch (scenario) {
            case "ACTION_REQUIRED":
              return {
                overallStatus: "ACTION_REQUIRED",
                scenario: "ACTION_REQUIRED",
                documents: {
                  ...freshDocs,
                  GOVERNMENT_ID: {
                    ...freshDocs.GOVERNMENT_ID,
                    status: "REJECTED",
                    rejectionReason: "Image unclear or expired",
                  },
                },
              };
            case "APPROVED":
              return {
                overallStatus: "APPROVED",
                scenario: "APPROVED",
                documents: {
                  ...freshDocs,
                  INSURANCE_CERTIFICATE: {
                    ...freshDocs.INSURANCE_CERTIFICATE,
                    status: "VERIFIED",
                  },
                  VEHICLE_REGISTRATION: {
                    ...freshDocs.VEHICLE_REGISTRATION,
                    status: "VERIFIED",
                  },
                  DRIVER_LICENSE: {
                    ...freshDocs.DRIVER_LICENSE,
                    status: "VERIFIED",
                  },
                  GOVERNMENT_ID: {
                    ...freshDocs.GOVERNMENT_ID,
                    status: "VERIFIED",
                  },
                  BACKGROUND_CHECK: {
                    ...freshDocs.BACKGROUND_CHECK,
                    status: "VERIFIED",
                  },
                },
              };
            case "PENDING":
              return {
                overallStatus: "PENDING",
                scenario: "PENDING",
                documents: {
                  ...freshDocs,
                  INSURANCE_CERTIFICATE: {
                    ...freshDocs.INSURANCE_CERTIFICATE,
                    status: "PENDING_REVIEW",
                  },
                  VEHICLE_REGISTRATION: {
                    ...freshDocs.VEHICLE_REGISTRATION,
                    status: "PENDING_REVIEW",
                  },
                },
              };
            default:
              return {
                overallStatus: "CHECKLIST",
                scenario: "INITIAL",
                documents: freshDocs,
              };
          }
        };

        const newDriver =
          targetRole === "HELPER" ? state.driver : updateRoleScenario("PRIMARY_DRIVER");
        const newHelper =
          targetRole === "PRIMARY_DRIVER" ? state.helper : updateRoleScenario("HELPER");

        return {
          driver: newDriver,
          helper: newHelper,
          documents: newDriver.documents,
          overallStatus: newDriver.overallStatus,
        };
      }),

    setSelectedDoc: (docType) => set({ selectedDocForUpload: docType }),

    resetDocuments: () => {
      const freshDriver: RoleDocumentCollection = {
        documents: createInitialDriverDocs(),
        overallStatus: "CHECKLIST",
        scenario: "INITIAL",
      };
      const freshHelper: RoleDocumentCollection = {
        documents: createInitialHelperDocs(),
        overallStatus: "CHECKLIST",
        scenario: "INITIAL",
      };
      set({
        driver: freshDriver,
        helper: freshHelper,
        documents: freshDriver.documents,
        overallStatus: freshDriver.overallStatus,
        selectedDocForUpload: "DRIVER_LICENSE",
      });
    },
  };
});

export const useDriverDocumentStore = useDocumentStore;
