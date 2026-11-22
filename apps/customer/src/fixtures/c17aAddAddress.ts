/**
 * C17-A Add New Pickup Address — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:645 (430 × 1334 px)
 * Context: W02 Service Discovery & Intake / C17-A
 */

export interface C17AFormData {
	label: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	pickupNotes: string;
}

export interface C17AFormErrors {
	label: string | null;
	street: string | null;
	city: string | null;
	state: string | null;
	zipCode: string | null;
	pickupNotes: string | null;
}

/**
 * Illustrative initial values from English Figma Node 382:645:
 * 1. Address label — Storage unit
 * 2. Street — 4100 N 24th Street
 * 3. City — Phoenix
 * 4. State — Arizona
 * 5. ZIP code — 85016
 * 6. Pickup notes — Gate code provided to assigned driver only
 */
export const C17A_INITIAL_VALUES_EN: C17AFormData = {
	label: "Storage unit",
	street: "4100 N 24th Street",
	city: "Phoenix",
	state: "Arizona",
	zipCode: "85016",
	pickupNotes: "Gate code provided to assigned driver only",
};

/**
 * Illustrative initial values from Spanish Figma Node 974:9497:
 * 1. Nombre de dirección — Trastero
 * 2. Calle — 4100 N 24th Street
 * 3. Ciudad — Phoenix
 * 4. Estado — Arizona
 * 5. Código postal — 85016
 * 6. Notas de recogida — Código de acceso solo para el conductor asignado
 */
export const C17A_INITIAL_VALUES_ES: C17AFormData = {
	label: "Trastero",
	street: "4100 N 24th Street",
	city: "Phoenix",
	state: "Arizona",
	zipCode: "85016",
	pickupNotes: "Código de acceso solo para el conductor asignado",
};

export const C17A_INITIAL_VALUES: C17AFormData = C17A_INITIAL_VALUES_EN;

export function getC17AInitialValues(locale: string): C17AFormData {
	return locale === "es"
		? { ...C17A_INITIAL_VALUES_ES }
		: { ...C17A_INITIAL_VALUES_EN };
}

export const C17A_EMPTY_VALUES: C17AFormData = {
	label: "",
	street: "",
	city: "",
	state: "Arizona",
	zipCode: "",
	pickupNotes: "",
};

export const C17A_DEMO_CONSTANTS = {
	stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
	stepSub: "/ C17-A",
	title: "Add a pickup location",
	subtitle: "New service addresses are validated before the booking continues.",
	defaultBookingId: "HX-DEMO-1027",
	demoDisclaimer: "DEMO ONLY  ·  No confirmed booking, rates or payment",
	srsFooter: "SRS  BK-02, CU-04  ·  430 px / vertical scroll",
};
