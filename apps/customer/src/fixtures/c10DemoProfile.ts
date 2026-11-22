/**
 * C10 Demo Profile Fixture
 *
 * Source:
 *   - Figma node: 333:26 ("C10 · Account Overview / Default [CU-04, CU-05, CU-07, CU-09]")
 *   - Frame: 430 × 1580 px
 *   - Spanish Figma node: 347:315 ("C10-ES · Mi Cuenta")
 *
 * Explicit Invariants:
 * 1. This data is strictly local, typed mock preview content for frontend UI testing.
 * 2. Never written to persistent server storage or real authentication.
 * 3. Never represents genuine server authentication or live customer claims.
 * 4. Locale-scoped demo profile overlays: EN (Sarah Mitchell / SM) and ES (Bryan Lopez / BL)
 *    remain strictly isolated and never overwrite each other.
 */

export interface C10CustomerProfile {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  isPhoneVerified: boolean;
  statusBadge: string;
  serviceArea: string;
  sessionChip: string;
  savedAddress: string;
  language: string;
  paymentMethod: string;
  activeBooking: string;
}

export const c10DemoProfile: C10CustomerProfile = {
  id: "HX-MOCK-CUST-001",
  name: "Sarah Mitchell",
  initials: "SM",
  email: "sarah.mitchell@example.test",
  phone: "+1 602-555-0142",
  isPhoneVerified: true,
  statusBadge: "Verified customer",
  serviceArea: "Account verified · Arizona service area",
  sessionChip: "SARAH MITCHELL · CUSTOMER ACCOUNT",
  savedAddress: "1234 E Example Lane, Phoenix",
  language: "English (United States)",
  paymentMethod: "TEST payment reference saved",
  activeBooking: "HX-DEMO-1027 · Junk Removal",
};

export const c10DemoProfileEs: C10CustomerProfile = {
  id: "HX-MOCK-CUST-002",
  name: "Bryan Lopez",
  initials: "BL",
  email: "bryan.lopez@example.test",
  phone: "+1 602-555-0142",
  isPhoneVerified: true,
  statusBadge: "Cliente verificado",
  serviceArea: "Cuenta verificada · Zona de Arizona",
  sessionChip: "BRYAN LOPEZ  ·  CUENTA DE CLIENTE",
  savedAddress: "1234 E Example Lane, Phoenix",
  language: "Español (Estados Unidos)",
  paymentMethod: "Referencia de prueba guardada",
  activeBooking: "HX-DEMO-1027 · Retirada de objetos",
};

export function computeInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SM";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface C10ProfileEdits {
  name?: string;
  email?: string;
  phone?: string;
  initials?: string;
  isPhoneVerified?: boolean;
}

export const STORAGE_KEY_EN_PROFILE_OVERLAY = "haulix_c10_en_profile_overlay";
export const STORAGE_KEY_ES_PROFILE_OVERLAY = "haulix_c10_es_profile_overlay";

let inMemoryEnEdits: C10ProfileEdits | null = null;
let inMemoryEsEdits: C10ProfileEdits | null = null;
const listeners = new Set<() => void>();

export function getEnProfileEdits(): C10ProfileEdits | null {
  return inMemoryEnEdits;
}

export function getEsProfileEdits(): C10ProfileEdits | null {
  return inMemoryEsEdits;
}

async function getSecureStore() {
  try {
    return await import("expo-secure-store");
  } catch {
    return null;
  }
}

export async function loadProfileEdits(
  locale: "en" | "es" = "en"
): Promise<C10ProfileEdits | null> {
  const key = locale === "es" ? STORAGE_KEY_ES_PROFILE_OVERLAY : STORAGE_KEY_EN_PROFILE_OVERLAY;
  try {
    const store = await getSecureStore();
    if (store) {
      const raw = await store.getItemAsync(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (locale === "es") {
          inMemoryEsEdits = parsed;
        } else {
          inMemoryEnEdits = parsed;
        }
      }
    }
  } catch (_err) {
    // Graceful fallback for web/test or if SecureStore is unavailable
  }
  return locale === "es" ? inMemoryEsEdits : inMemoryEnEdits;
}

export async function loadEnProfileEdits(): Promise<C10ProfileEdits | null> {
  return loadProfileEdits("en");
}

export async function loadEsProfileEdits(): Promise<C10ProfileEdits | null> {
  return loadProfileEdits("es");
}

export async function saveProfileEdits(locale: "en" | "es", edits: C10ProfileEdits): Promise<void> {
  const key = locale === "es" ? STORAGE_KEY_ES_PROFILE_OVERLAY : STORAGE_KEY_EN_PROFILE_OVERLAY;
  if (locale === "es") {
    inMemoryEsEdits = { ...inMemoryEsEdits, ...edits };
  } else {
    inMemoryEnEdits = { ...inMemoryEnEdits, ...edits };
  }
  const currentEdits = locale === "es" ? inMemoryEsEdits : inMemoryEnEdits;

  try {
    const store = await getSecureStore();
    if (store) {
      await store.setItemAsync(key, JSON.stringify(currentEdits));
    }
  } catch (_err) {
    // Graceful fallback
  }
  listeners.forEach((fn) => {
    fn();
  });
}

export async function saveEnProfileEdits(edits: C10ProfileEdits): Promise<void> {
  return saveProfileEdits("en", edits);
}

export async function saveEsProfileEdits(edits: C10ProfileEdits): Promise<void> {
  return saveProfileEdits("es", edits);
}

export async function resetProfileEdits(locale?: "en" | "es"): Promise<void> {
  try {
    const store = await getSecureStore();
    if (!locale || locale === "en") {
      inMemoryEnEdits = null;
      if (store) {
        await store.deleteItemAsync(STORAGE_KEY_EN_PROFILE_OVERLAY);
      }
    }
    if (!locale || locale === "es") {
      inMemoryEsEdits = null;
      if (store) {
        await store.deleteItemAsync(STORAGE_KEY_ES_PROFILE_OVERLAY);
      }
    }
  } catch (_err) {
    // Graceful fallback
  }
  listeners.forEach((fn) => {
    fn();
  });
}

export async function resetEnProfileEdits(): Promise<void> {
  return resetProfileEdits("en");
}

export async function resetEsProfileEdits(): Promise<void> {
  return resetProfileEdits("es");
}

export function subscribeToProfileEdits(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function subscribeToEnProfileEdits(listener: () => void): () => void {
  return subscribeToProfileEdits(listener);
}

function applyProfileOverlay(
  base: C10CustomerProfile,
  edits: C10ProfileEdits | null,
  suffix: string
): C10CustomerProfile {
  if (!edits) {
    return base;
  }
  const name = edits.name ?? base.name;
  const initials = edits.initials ?? computeInitials(name);
  const email = edits.email ?? base.email;
  const phone = edits.phone ?? base.phone;
  const isPhoneVerified =
    edits.isPhoneVerified !== undefined
      ? edits.isPhoneVerified
      : edits.phone
        ? edits.phone === base.phone
        : true;
  const sessionChip =
    suffix === "CUENTA DE CLIENTE"
      ? `${name.toUpperCase()}  ·  ${suffix}`
      : `${name.toUpperCase()} · ${suffix}`;
  return {
    ...base,
    name,
    initials,
    email,
    phone,
    isPhoneVerified,
    sessionChip,
  };
}

export function getC10DemoProfile(locale: "en" | "es" = "en"): C10CustomerProfile {
  if (locale === "es") {
    return applyProfileOverlay(c10DemoProfileEs, inMemoryEsEdits, "CUENTA DE CLIENTE");
  }
  return applyProfileOverlay(c10DemoProfile, inMemoryEnEdits, "CUSTOMER ACCOUNT");
}
