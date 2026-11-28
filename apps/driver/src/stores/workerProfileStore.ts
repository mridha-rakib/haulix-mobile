import { create } from "zustand";
import { LOCAL_AVATARS } from "../assets/localAvatars";
import type { WorkerRole } from "./walletStore";

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface DriverProfileData {
  id: string;
  role: "driver";
  name: string;
  avatarUrl: string;
  rating: number;
  completedJobs: number;
  memberSince: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  taxIdMasked: string;
  vehicle: string;
  licensePlate: string;
  emergencyContact: EmergencyContact;
}

export interface HelperProfileData {
  id: string;
  role: "helper";
  name: string;
  avatarUrl: string;
  rating: number;
  completedJobs: number;
  memberSince: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  taxIdMasked: string;
  emergencyContact: EmergencyContact;
}

interface WorkerProfileState {
  driverProfile: DriverProfileData;
  helperProfile: HelperProfileData;
  getProfileForRole: (role: WorkerRole) => DriverProfileData | HelperProfileData;
  updateDriverProfile: (partial: Partial<DriverProfileData>) => void;
  updateHelperProfile: (partial: Partial<HelperProfileData>) => void;
  updateAvatar: (role: WorkerRole, uri: string) => void;
  resetProfileStore: () => void;
}

const initialDriverProfile: DriverProfileData = {
  id: "DRV-8821",
  role: "driver",
  name: "Alex Miller",
  avatarUrl: LOCAL_AVATARS.driver_alex,
  rating: 4.95,
  completedJobs: 142,
  memberSince: "May 2024",
  email: "alex.miller@example.com",
  phone: "+1 (602) 555-0142",
  address: "1420 E Camelback Rd, Apt 402",
  cityStateZip: "Phoenix, AZ 85014",
  taxIdMasked: "•••-••-3821",
  vehicle: "2022 Ford F-250 Super Duty",
  licensePlate: "AZ 7K4-992",
  emergencyContact: {
    name: "Sarah Miller",
    relationship: "Spouse",
    phone: "+1 (602) 555-0188",
  },
};

const initialHelperProfile: HelperProfileData = {
  id: "HLP-4402",
  role: "helper",
  name: "Marcus Reed",
  avatarUrl: LOCAL_AVATARS.helper_marcus,
  rating: 4.92,
  completedJobs: 78,
  memberSince: "August 2024",
  email: "marcus.r@example.com",
  phone: "+1 (602) 555-0199",
  address: "2810 N 16th St",
  cityStateZip: "Phoenix, AZ 85006",
  taxIdMasked: "•••-••-4109",
  emergencyContact: {
    name: "David Reed",
    relationship: "Brother",
    phone: "+1 (602) 555-0133",
  },
};

export const useWorkerProfileStore = create<WorkerProfileState>((set, get) => ({
  driverProfile: { ...initialDriverProfile },
  helperProfile: { ...initialHelperProfile },

  getProfileForRole: (role: WorkerRole) => {
    const { driverProfile, helperProfile } = get();
    return role === "driver" ? driverProfile : helperProfile;
  },

  updateDriverProfile: (partial: Partial<DriverProfileData>) => {
    set((state) => ({
      driverProfile: { ...state.driverProfile, ...partial },
    }));
  },

  updateHelperProfile: (partial: Partial<HelperProfileData>) => {
    set((state) => ({
      helperProfile: { ...state.helperProfile, ...partial },
    }));
  },

  updateAvatar: (role: WorkerRole, uri: string) => {
    if (role === "driver") {
      set((state) => ({
        driverProfile: { ...state.driverProfile, avatarUrl: uri },
      }));
    } else {
      set((state) => ({
        helperProfile: { ...state.helperProfile, avatarUrl: uri },
      }));
    }
  },

  resetProfileStore: () => {
    set({
      driverProfile: { ...initialDriverProfile },
      helperProfile: { ...initialHelperProfile },
    });
  },
}));
