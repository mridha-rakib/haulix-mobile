import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C23M_MANUAL_RECORDS } from "../fixtures/c30Verification";

describe("C23-M Manual Item Verification — English (Node 412:748) & Spanish (Node 987:10581)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/manual-item-verification.tsx",
	);
	const failedRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/ai-recognition-failed.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c23m-es"');
		expect(navContent).toContain('id: "c23m-en"');
		expect(navContent).toContain('route: "/manual-item-verification"');
	});

	it("verifies recovery route connects to C23-M", () => {
		const failedContent = fs.readFileSync(failedRoutePath, "utf8");
		expect(failedContent).toContain('pathname: "/manual-item-verification"');
	});

	it("verifies exact C23-M English and Spanish translation strings", () => {
		expect(en.c23mManualItemVerification.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c23mManualItemVerification.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c23mManualItemVerification.title).toBe(
			"Confirm items without AI",
		);
		expect(es.c23mManualItemVerification.title).toBe(
			"Confirmar objetos sin IA",
		);
		expect(en.c23mManualItemVerification.subtitle).toBe(
			"Your existing manual inventory is available if AI is unavailable.",
		);
		expect(es.c23mManualItemVerification.subtitle).toBe(
			"Tu inventario manual sigue disponible si falla la IA.",
		);
		expect(en.c23mManualItemVerification.sectionRecordTitle).toBe(
			"Saved manual record",
		);
		expect(es.c23mManualItemVerification.sectionRecordTitle).toBe(
			"Registro manual guardado",
		);
		expect(en.c23mManualItemVerification.sectionConfidenceTitle).toBe(
			"Confidence/eligibility still required",
		);
		expect(es.c23mManualItemVerification.sectionConfidenceTitle).toBe(
			"Aún se requiere confianza y elegibilidad",
		);
		expect(en.c23mManualItemVerification.primaryCta).toBe(
			"Confirm manual details",
		);
		expect(es.c23mManualItemVerification.primaryCta).toBe(
			"Confirmar detalles manuales",
		);
		expect(en.c23mManualItemVerification.secondaryCta).toBe(
			"Uncertain details / Admin review  ›",
		);
		expect(es.c23mManualItemVerification.secondaryCta).toBe(
			"Datos inciertos / Revisión de Admin  ›",
		);
	});

	it("verifies manual record fixture contains all 4 fields including 2 queen mattresses", () => {
		expect(C23M_MANUAL_RECORDS).toHaveLength(4);
		const mattresses = C23M_MANUAL_RECORDS.find(
			(r) => r.fieldKey === "mattresses",
		);
		expect(mattresses?.customerValue).toBe("2 × queen · ~70 lb each");
	});
});
