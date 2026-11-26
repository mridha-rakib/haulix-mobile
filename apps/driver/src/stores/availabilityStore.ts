import { create } from "zustand";

export type DriverAvailabilityStatus = "ONLINE" | "OFFLINE" | "IN_SERVICE";
export type HelperAvailabilityStatus = "ONLINE" | "OFFLINE" | "BUSY";

export interface AvailabilityPreferences {
  workingDays: string[];
  startHour: string;
  endHour: string;
  serviceRadiusMiles: number;
  preferredShift: string;
  vacationMode: boolean;
}

export const DEFAULT_AVAILABILITY_PREFERENCES: AvailabilityPreferences = {
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  startHour: "8:00 AM",
  endHour: "6:00 PM",
  serviceRadiusMiles: 50,
  preferredShift: "Day shift",
  vacationMode: false,
};

interface AvailabilityState {
  driverStatus: DriverAvailabilityStatus;
  helperStatus: HelperAvailabilityStatus;
  preferences: AvailabilityPreferences;

  // Actions
  toggleDriverStatus: () => void;
  toggleHelperStatus: () => void;
  setDriverStatus: (status: DriverAvailabilityStatus) => void;
  setHelperStatus: (status: HelperAvailabilityStatus) => void;
  toggleWorkingDay: (day: string) => void;
  setWorkingHours: (start: string, end: string) => void;
  setServiceRadius: (miles: number) => void;
  setPreferredShift: (shift: string) => void;
  setVacationMode: (enabled: boolean) => void;
  savePreferences: (newPreferences: Partial<AvailabilityPreferences>) => void;
  resetAvailability: () => void;
}

export const useAvailabilityStore = create<AvailabilityState>((set) => ({
  driverStatus: "ONLINE",
  helperStatus: "ONLINE",
  preferences: { ...DEFAULT_AVAILABILITY_PREFERENCES },

  toggleDriverStatus: () =>
    set((state) => ({
      driverStatus: state.driverStatus === "ONLINE" ? "OFFLINE" : "ONLINE",
    })),

  toggleHelperStatus: () =>
    set((state) => ({
      helperStatus: state.helperStatus === "ONLINE" ? "OFFLINE" : "ONLINE",
    })),

  setDriverStatus: (status) => set({ driverStatus: status }),

  setHelperStatus: (status) => set({ helperStatus: status }),

  toggleWorkingDay: (day) =>
    set((state) => {
      const exists = state.preferences.workingDays.includes(day);
      const updatedDays = exists
        ? state.preferences.workingDays.filter((d) => d !== day)
        : [...state.preferences.workingDays, day];
      return {
        preferences: {
          ...state.preferences,
          workingDays: updatedDays,
        },
      };
    }),

  setWorkingHours: (start, end) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        startHour: start,
        endHour: end,
      },
    })),

  setServiceRadius: (miles) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        serviceRadiusMiles: miles,
      },
    })),

  setPreferredShift: (shift) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        preferredShift: shift,
      },
    })),

  setVacationMode: (enabled) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        vacationMode: enabled,
      },
    })),

  savePreferences: (newPreferences) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...newPreferences,
      },
    })),

  resetAvailability: () =>
    set({
      driverStatus: "ONLINE",
      helperStatus: "ONLINE",
      preferences: { ...DEFAULT_AVAILABILITY_PREFERENCES },
    }),
}));
