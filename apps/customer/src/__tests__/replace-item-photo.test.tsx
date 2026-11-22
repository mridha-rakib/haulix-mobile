import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C19PR_SELECTED_ITEM } from "../fixtures/c19prMedia";

describe("C19-P-R Replace Item Photo — English (Node 382:1546) & Spanish (Node 980:9692)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/replace-item-photo.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);
	const sofaImagePath = path.resolve(
		__dirname,
		"../../assets/images/intake/c18j-sofa.png",
	);

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
	});

	it("1. verifies exact English copy from Figma Node 382:1546", () => {
		expect(en.c19pr.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c19pr.stepSub).toBe("  /  C19-P-R");
		expect(en.c19pr.title).toBe("Replace an item photo");
		expect(en.c19pr.subtitle).toBe(
			"A replacement updates the selected attachment, not the entire booking.",
		);
		expect(en.c19pr.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c19pr.selectedMediaSectionTitle).toBe("Selected media");
		expect(en.c19pr.photoTitle).toBe("Sofa · existing attachment");
		expect(en.c19pr.photoSub).toBe("Attached · replaceable demo media");
		expect(en.c19pr.awaitingSectionTitle).toBe(
			"Replacement awaiting selection",
		);
		expect(en.c19pr.reviewRequiredBadge).toBe("Review required");
		expect(en.c19pr.guidance1).toBe(
			"Choose a new photo. The original remains until upload succeeds.",
		);
		expect(en.c19pr.guidance2).toBe(
			"The item's quantity and type do not change unless {{customerFirstName}} confirms a correction.",
		);
		expect(en.c19pr.confirmCta).toBe("Confirm replacement example");
		expect(en.c19pr.keepExistingCta).toBe("Keep existing photo   ›");
		expect(en.c19pr.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c19pr.footerSrs).toBe("SRS  BK-04  ·  430 px / vertical scroll");
	});

	it("2. verifies exact Spanish copy from Figma Node 980:9692", () => {
		expect(es.c19pr.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c19pr.stepSub).toBe("  /  C19-P-R");
		expect(es.c19pr.title).toBe("Reemplazar foto de un objeto");
		expect(es.c19pr.subtitle).toBe(
			"El reemplazo modifica solo el archivo elegido, no toda la reserva.",
		);
		expect(es.c19pr.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c19pr.selectedMediaSectionTitle).toBe("Archivos seleccionados");
		expect(es.c19pr.photoTitle).toBe("Sofá · Adjunto existente");
		expect(es.c19pr.photoSub).toBe("Adjunto · archivo de ejemplo reemplazable");
		expect(es.c19pr.awaitingSectionTitle).toBe(
			"Esperando selección de reemplazo",
		);
		expect(es.c19pr.reviewRequiredBadge).toBe("Revisión necesaria");
		expect(es.c19pr.guidance1).toBe(
			"Elige otra foto. La anterior permanece hasta completar la carga.",
		);
		expect(es.c19pr.guidance2).toBe(
			"Cantidad y tipo no cambian sin confirmación de {{customerFirstName}}.",
		);
		expect(es.c19pr.confirmCta).toBe("Confirmar reemplazo de ejemplo");
		expect(es.c19pr.keepExistingCta).toBe("Conservar foto actual   ›");
		expect(es.c19pr.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c19pr.footerSrs).toBe(
			"SRS  BK-04  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. validates customer profile dynamic values", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});

	it("4. verifies photo fixture and image asset exist", () => {
		expect(fs.existsSync(sofaImagePath)).toBe(true);
		expect(C19PR_SELECTED_ITEM.imageKey).toBe("sofa");
		expect(C19PR_SELECTED_ITEM.testID).toBe("c19pr-photo-sofa-existing");
	});

	it("5. verifies route file and DemoScreenNavigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const content = fs.readFileSync(routePath, "utf-8");
		expect(content).toContain("c19pr-confirm-button");
		expect(content).toContain("c19pr-keep-existing-button");
		expect(content).toContain("c19pr-selected-media-card");

		const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
		expect(navContent).toContain("c19pr-en");
		expect(navContent).toContain("c19pr-es");
	});
});
