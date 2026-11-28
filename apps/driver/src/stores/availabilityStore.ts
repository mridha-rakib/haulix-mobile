import { create } from "zustand";
import type { DriverRole } from "./authStore";

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

export const DEFAULT_DRIVER_PREFERENCES: AvailabilityPreferences = {
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  startHour: "8:00 AM",
  endHour: "6:00 PM",
  serviceRadiusMiles: 50,
  preferredShift: "Day shift",
  vacationMode: false,
};

export const DEFAULT_HELPER_PREFERENCES: AvailabilityPreferences = {
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  startHour: "7:00 AM",
  endHour: "5:00 PM",
  serviceRadiusMiles: 25,
  preferredShift: "Flexible",
  vacationMode: false,
};

// Backward compatibility alias
export const DEFAULT_AVAILABILITY_PREFERENCES = DEFAULT_DRIVER_PREFERENCES;

interface AvailabilityState {
  driverStatus: DriverAvailabilityStatus;
  helperStatus: HelperAvailabilityStatus;
  driverPreferences: AvailabilityPreferences;
  helperPreferences: AvailabilityPreferences;

  // Computed/Active preferences for current role (defaults to driver)
  preferences: AvailabilityPreferences;

  // Actions
  toggleDriverStatus: () => void;
  toggleHelperStatus: () => void;
  setDriverStatus: (status: DriverAvailabilityStatus) => void;
  setHelperStatus: (status: HelperAvailabilityStatus) => void;
  getRolePreferences: (role?: DriverRole) => AvailabilityPreferences;
  saveRolePreferences: (role: DriverRole, newPreferences: Partial<AvailabilityPreferences>) => void;

  // Legacy/Direct actions that operate on role or active preferences
  toggleWorkingDay: (day: string, role?: DriverRole) => void;
  setWorkingHours: (start: string, end: string, role?: DriverRole) => void;
  setServiceRadius: (miles: number, role?: DriverRole) => void;
  setPreferredShift: (shift: string, role?: DriverRole) => void;
  setVacationMode: (enabled: boolean, role?: DriverRole) => void;
  savePreferences: (newPreferences: Partial<AvailabilityPreferences>, role?: DriverRole) => void;
  resetAvailability: () => void;
}

export const useAvailabilityStore = create<AvailabilityState>((set, get) => ({
  driverStatus: "ONLINE",
  helperStatus: "ONLINE",
  driverPreferences: { ...DEFAULT_DRIVER_PREFERENCES },
  helperPreferences: { ...DEFAULT_HELPER_PREFERENCES },
  preferences: { ...DEFAULT_DRIVER_PREFERENCES },

  toggleDriverStatus: () =>
    set((state) => {
      const nextStatus = state.driverStatus === "ONLINE" ? "OFFLINE" : "ONLINE";
      return {
        driverStatus: nextStatus,
        driverPreferences: {
          ...state.driverPreferences,
          vacationMode: nextStatus === "ONLINE" ? false : state.driverPreferences.vacationMode,
        },
      };
    }),

  toggleHelperStatus: () =>
    set((state) => {
      const nextStatus = state.helperStatus === "ONLINE" ? "OFFLINE" : "ONLINE";
      return {
        helperStatus: nextStatus,
        helperPreferences: {
          ...state.helperPreferences,
          vacationMode: nextStatus === "ONLINE" ? false : state.helperPreferences.vacationMode,
        },
      };
    }),

  setDriverStatus: (status) =>
    set((state) => ({
      driverStatus: status,
      driverPreferences: {
        ...state.driverPreferences,
        vacationMode: status === "ONLINE" ? false : state.driverPreferences.vacationMode,
      },
    })),

  setHelperStatus: (status) =>
    set((state) => ({
      helperStatus: status,
      helperPreferences: {
        ...state.helperPreferences,
        vacationMode: status === "ONLINE" ? false : state.helperPreferences.vacationMode,
      },
    })),

  getRolePreferences: (role) => {
    const s = get();
    return role === "HELPER" ? s.helperPreferences : s.driverPreferences;
  },

  saveRolePreferences: (role, newPreferences) =>
    set((state) => {
      const isHelper = role === "HELPER";
      const target = isHelper ? state.helperPreferences : state.driverPreferences;
      const updated = { ...target, ...newPreferences };

      if (isHelper) {
        const nextHelperStatus = updated.vacationMode ? "OFFLINE" : state.helperStatus;
        return {
          helperPreferences: updated,
          helperStatus: nextHelperStatus,
          preferences: updated,
        };
      }

      const nextDriverStatus = updated.vacationMode ? "OFFLINE" : state.driverStatus;
      return {
        driverPreferences: updated,
        driverStatus: nextDriverStatus,
        preferences: updated,
      };
    }),

  toggleWorkingDay: (day, role = "PRIMARY_DRIVER") =>
    set((state) => {
      const isHelper = role === "HELPER";
      const target = isHelper ? state.helperPreferences : state.driverPreferences;
      const exists = target.workingDays.includes(day);
      const updatedDays = exists
        ? target.workingDays.filter((d) => d !== day)
        : [...target.workingDays, day];
      const updated = { ...target, workingDays: updatedDays };

      return isHelper
        ? { helperPreferences: updated, preferences: updated }
        : { driverPreferences: updated, preferences: updated };
    }),

  setWorkingHours: (start, end, role = "PRIMARY_DRIVER") =>
    set((state) => {
      const isHelper = role === "HELPER";
      const target = isHelper ? state.helperPreferences : state.driverPreferences;
      const updated = { ...target, startHour: start, endHour: end };
      return isHelper
        ? { helperPreferences: updated, preferences: updated }
        : { driverPreferences: updated, preferences: updated };
    }),

  setServiceRadius: (miles, role = "PRIMARY_DRIVER") =>
    set((state) => {
      const isHelper = role === "HELPER";
      const target = isHelper ? state.helperPreferences : state.driverPreferences;
      const updated = { ...target, serviceRadiusMiles: miles };
      return isHelper
        ? { helperPreferences: updated, preferences: updated }
        : { driverPreferences: updated, preferences: updated };
    }),

  setPreferredShift: (shift, role = "PRIMARY_DRIVER") =>
    set((state) => {
      const isHelper = role === "HELPER";
      const target = isHelper ? state.helperPreferences : state.driverPreferences;
      const updated = { ...target, preferredShift: shift };
      return isHelper
        ? { helperPreferences: updated, preferences: updated }
        : { driverPreferences: updated, preferences: updated };
    }),

  setVacationMode: (enabled, role = "PRIMARY_DRIVER") =>
    set((state) => {
      const isHelper = role === "HELPER";
      const target = isHelper ? state.helperPreferences : state.driverPreferences;
      const updated = { ...target, vacationMode: enabled };
      if (isHelper) {
        return {
          helperPreferences: updated,
          helperStatus: enabled ? "OFFLINE" : state.helperStatus,
          preferences: updated,
        };
      }
      return {
        driverPreferences: updated,
        driverStatus: enabled ? "OFFLINE" : state.driverStatus,
        preferences: updated,
      };
    }),

  savePreferences: (newPreferences, role = "PRIMARY_DRIVER") =>
    get().saveRolePreferences(role, newPreferences),

  resetAvailability: () =>
    set({
      driverStatus: "ONLINE",
      helperStatus: "ONLINE",
      driverPreferences: { ...DEFAULT_DRIVER_PREFERENCES },
      helperPreferences: { ...DEFAULT_HELPER_PREFERENCES },
      preferences: { ...DEFAULT_DRIVER_PREFERENCES },
    }),
}));
