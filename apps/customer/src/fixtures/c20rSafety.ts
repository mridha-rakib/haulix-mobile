/**
 * HAULIX Customer Mobile App — Phase 03.23
 * C20-R Safety & Restrictions Fixtures
 *
 * Authoritative Figma:
 *   - English: Node 382:1873 (430 × 1269 px)
 *   - Spanish: Node 980:10115 (430 × 1269 px)
 *
 * Scope: Safety questions and controlled customer acknowledgements.
 * Two actual checkboxes must be explicitly confirmed to advance.
 */

export interface C20RSafetyRow {
	id: string;
	label: string;
	labelEs: string;
	getValue: (customerName?: string, locale?: "en" | "es") => string;
}

export interface C20RAcknowledgements {
	itemsRepresentRequest: boolean;
	disclosedSafetyRisks: boolean;
}

export const C20R_SAFETY_ROWS: C20RSafetyRow[] = [
	{
		id: "chemicals",
		label: "Hazardous chemicals / fuels",
		labelEs: "Químicos peligrosos / combustibles",
		getValue: (name = "Sarah", locale = "en") => {
			const firstName = name.split(" ")[0];
			if (locale === "es") {
				return `${firstName} indica que no hay`;
			}
			return `${firstName} reports none`;
		},
	},
	{
		id: "paints",
		label: "Paints, solvents / unknown liquids",
		labelEs: "Pinturas, disolventes / líquidos desconocidos",
		getValue: (_name, locale = "en") =>
			locale === "es" ? "Sin objetos conocidos" : "No known items",
	},
	{
		id: "sharps",
		label: "Unsecured sharp materials",
		labelEs: "Objetos cortantes sin asegurar",
		getValue: (_name, locale = "en") =>
			locale === "es" ? "Sin objetos conocidos" : "No known items",
	},
	{
		id: "containers",
		label: "Heavy or unknown-content containers",
		labelEs: "Recipientes pesados o de contenido desconocido",
		getValue: (_name, locale = "en") =>
			locale === "es"
				? "No se declararon contenidos sin verificar"
				: "No unverified contents declared",
	},
];

let acknowledgementsState: C20RAcknowledgements = {
	itemsRepresentRequest: false,
	disclosedSafetyRisks: false,
};

type AckListener = (state: C20RAcknowledgements) => void;
const listeners = new Set<AckListener>();

export function getAcknowledgementsState(): C20RAcknowledgements {
	return acknowledgementsState;
}

export function setAcknowledgement(
	key: keyof C20RAcknowledgements,
	value: boolean,
): void {
	acknowledgementsState = {
		...acknowledgementsState,
		[key]: value,
	};
	for (const listener of listeners) {
		listener(acknowledgementsState);
	}
}

export function resetAcknowledgements(): void {
	acknowledgementsState = {
		itemsRepresentRequest: false,
		disclosedSafetyRisks: false,
	};
	for (const listener of listeners) {
		listener(acknowledgementsState);
	}
}

export function subscribeToAcknowledgements(listener: AckListener): () => void {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
