import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C23U_CLARIFICATION_DETAILS } from "../fixtures/c30Verification";

describe("C23-U Measurement Clarification — English (Node 412:803) & Spanish (Node 987:10646)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/measurement-clarification.tsx",
	);
	const verifyRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/verify-suggested-inventory.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c23u-es"');
		expect(navContent).toContain('id: "c23u-en"');
		expect(navContent).toContain('route: "/measurement-clarification"');
	});

	it("verifies C23 connects to C23-U", () => {
		const verifyContent = fs.readFileSync(verifyRoutePath, "utf8");
		expect(verifyContent).toContain('pathname: "/measurement-clarification"');
	});

	it("verifies exact C23-U English and Spanish translation strings", () => {
		expect(en.c23uMeasurementClarification.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c23uMeasurementClarification.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c23uMeasurementClarification.title).toBe(
			"We need better measurements",
		);
		expect(es.c23uMeasurementClarification.title).toBe(
			"Necesitamos medidas más precisas",
		);
		expect(en.c23uMeasurementClarification.subtitle).toBe(
			"A photograph cannot guarantee exact dimensions or weight.",
		);
		expect(es.c23uMeasurementClarification.subtitle).toBe(
			"Una foto no garantiza dimensiones ni peso exactos.",
		);
		expect(en.c23uMeasurementClarification.sectionAttentionTitle).toBe(
			"Details needing attention",
		);
		expect(es.c23uMeasurementClarification.sectionAttentionTitle).toBe(
			"Detalles que requieren atención",
		);
		expect(en.c23uMeasurementClarification.sectionQuoteTitle).toBe(
			"No definitive quote yet",
		);
		expect(es.c23uMeasurementClarification.sectionQuoteTitle).toBe(
			"Aún no hay cotización definitiva",
		);
		expect(en.c23uMeasurementClarification.primaryCta).toBe(
			"Correct measurements",
		);
		expect(es.c23uMeasurementClarification.primaryCta).toBe("Corregir medidas");
		expect(en.c23uMeasurementClarification.secondaryCta).toBe(
			"Submit for Admin quote review  ›",
		);
		expect(es.c23uMeasurementClarification.secondaryCta).toBe(
			"Enviar cotización a revisión de Admin  ›",
		);
	});

	it("verifies clarification detail fixture contains 5 rows with customer quantity 2", () => {
		expect(C23U_CLARIFICATION_DETAILS).toHaveLength(5);
		const qtyField = C23U_CLARIFICATION_DETAILS.find(
			(d) => d.fieldKey === "quantity",
		);
		expect(qtyField?.fieldValue).toBe("2");
	});
});
