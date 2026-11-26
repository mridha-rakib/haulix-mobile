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

export interface MockDocument {
  id: DocumentType;
  titleKey: string;
  descriptionKey: string;
  status: DocumentReviewStatus;
  fileName?: string;
  uploadedAt?: string;
  rejectionReason?: string;
  requiredForRoles: ("PRIMARY_DRIVER" | "HELPER")[];
}

export type VerificationFlowState =
  | "CHECKLIST"
  | "SUBMITTED"
  | "PENDING"
  | "ACTION_REQUIRED"
  | "APPROVED";

interface DocumentState {
  documents: Record<DocumentType, MockDocument>;
  overallStatus: VerificationFlowState;
  selectedDocForUpload: DocumentType | null;

  // Actions
  uploadDocumentMock: (docType: DocumentType, fileName?: string) => void;
  removeDocumentMock: (docType: DocumentType) => void;
  submitForReview: () => void;
  setScenario: (scenario: "INITIAL" | "PENDING" | "ACTION_REQUIRED" | "APPROVED") => void;
  setSelectedDoc: (docType: DocumentType | null) => void;
  resetDocuments: () => void;
}

const INITIAL_DOCS: Record<DocumentType, MockDocument> = {
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
    requiredForRoles: ["PRIMARY_DRIVER", "HELPER"],
  },
};

export const useDocumentStore = create<DocumentState>((set) => ({
  documents: INITIAL_DOCS,
  overallStatus: "CHECKLIST",
  selectedDocForUpload: "DRIVER_LICENSE",

  uploadDocumentMock: (docType, fileName = "document_upload_demo.jpg") =>
    set((state) => ({
      documents: {
        ...state.documents,
        [docType]: {
          ...state.documents[docType],
          status: "UPLOADED",
          fileName,
          uploadedAt: new Date().toISOString().slice(0, 10),
          rejectionReason: undefined,
        },
      },
    })),

  removeDocumentMock: (docType) =>
    set((state) => ({
      documents: {
        ...state.documents,
        [docType]: {
          ...state.documents[docType],
          status: "NOT_UPLOADED",
          fileName: undefined,
        },
      },
    })),

  submitForReview: () =>
    set((state) => {
      const updatedDocs = { ...state.documents };
      for (const key of Object.keys(updatedDocs) as DocumentType[]) {
        if (updatedDocs[key].status === "UPLOADED") {
          updatedDocs[key].status = "PENDING_REVIEW";
        }
      }
      return {
        documents: updatedDocs,
        overallStatus: "PENDING",
      };
    }),

  setScenario: (scenario) =>
    set(() => {
      switch (scenario) {
        case "ACTION_REQUIRED":
          return {
            overallStatus: "ACTION_REQUIRED",
            documents: {
              ...INITIAL_DOCS,
              GOVERNMENT_ID: {
                ...INITIAL_DOCS.GOVERNMENT_ID,
                status: "REJECTED",
                rejectionReason: "Image unclear or expired",
              },
            },
          };
        case "APPROVED":
          return {
            overallStatus: "APPROVED",
            documents: {
              ...INITIAL_DOCS,
              INSURANCE_CERTIFICATE: { ...INITIAL_DOCS.INSURANCE_CERTIFICATE, status: "VERIFIED" },
              VEHICLE_REGISTRATION: { ...INITIAL_DOCS.VEHICLE_REGISTRATION, status: "VERIFIED" },
            },
          };
        case "PENDING":
          return {
            overallStatus: "PENDING",
            documents: {
              ...INITIAL_DOCS,
              INSURANCE_CERTIFICATE: {
                ...INITIAL_DOCS.INSURANCE_CERTIFICATE,
                status: "PENDING_REVIEW",
              },
            },
          };
        default:
          return {
            overallStatus: "CHECKLIST",
            documents: INITIAL_DOCS,
          };
      }
    }),

  setSelectedDoc: (docType) => set({ selectedDocForUpload: docType }),

  resetDocuments: () =>
    set({
      documents: INITIAL_DOCS,
      overallStatus: "CHECKLIST",
    }),
}));
