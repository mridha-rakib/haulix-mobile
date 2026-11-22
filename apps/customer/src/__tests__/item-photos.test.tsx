import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C19P_PHOTO_ITEMS } from "../fixtures/c19pItemPhotos";

describe("C19-P Item Photo Uploads — English (Node 382:1483) & Spanish (Node 980:9613)", () => {
	const c19pRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/item-photos.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);
	const boxesImagePath = path.resolve(
		__dirname,
		"../../assets/images/intake/c19p-boxes.png",
	);

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
	});

	it("1. verifies exact English copy from Figma Node 382:1483", () => {
		expect(en.c19p.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c19p.stepSub).toBe("  /  C19-P");
		expect(en.c19p.title).toBe("Photos help clarify the load");
		expect(en.c19p.subtitle).toBe(
			"Four example images from the approved concept are attached to {{customerFirstName}}'s draft booking.",
		);
		expect(en.c19p.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c19p.examplesSectionTitle).toBe("Uploaded examples");
		expect(en.c19p.photoSofaTitle).toBe("Sofa · living room");
		expect(en.c19p.photoSofaSub).toBe("Attached · replaceable demo media");
		expect(en.c19p.photoMattressesTitle).toBe("Queen mattresses · stacked");
		expect(en.c19p.photoMattressesSub).toBe(
			"Attached · replaceable demo media",
		);
		expect(en.c19p.photoTableTitle).toBe("Dining table · chairs");
		expect(en.c19p.photoTableSub).toBe("Attached · replaceable demo media");
		expect(en.c19p.photoBoxesTitle).toBe("Additional junk / boxes");
		expect(en.c19p.photoBoxesSub).toBe("Attached · replaceable demo media");
		expect(en.c19p.attachedSectionTitle).toBe("4 demo photos attached");
		expect(en.c19p.completedBadge).toBe("Completed in this demo");
		expect(en.c19p.attachedDisclaimer1).toBe(
			"Photos are examples linked to {{bookingId}} and may be reviewed or replaced.",
		);
		expect(en.c19p.attachedDisclaimer2).toBe(
			"No AI analysis or price has been generated in W02.",
		);
		expect(en.c19p.continueCta).toBe("Continue to access details");
		expect(en.c19p.replaceSofaCta).toBe("Replace sofa photo   ›");
		expect(en.c19p.uploadFailureCta).toBe("Upload failure example   ›");
		expect(en.c19p.noPhotosYetCta).toBe("No photos yet   ›");
		expect(en.c19p.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c19p.footerSrs).toBe(
			"SRS  BK-04, AI-01, AI-03  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 980:9613", () => {
		expect(es.c19p.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
		expect(es.c19p.stepSub).toBe("  /  C19-P");
		expect(es.c19p.title).toBe("Las fotos ayudan a precisar la carga");
		expect(es.c19p.subtitle).toBe(
			"Hay cuatro imágenes de ejemplo vinculadas al borrador de {{customerFirstName}}.",
		);
		expect(es.c19p.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c19p.examplesSectionTitle).toBe("Ejemplos subidos");
		expect(es.c19p.photoSofaTitle).toBe("Sofá · Sala de estar");
		expect(es.c19p.photoSofaSub).toBe(
			"Adjunto · archivo de ejemplo reemplazable",
		);
		expect(es.c19p.photoMattressesTitle).toBe("Colchones queen · apilados");
		expect(es.c19p.photoMattressesSub).toBe(
			"Adjunto · archivo de ejemplo reemplazable",
		);
		expect(es.c19p.photoTableTitle).toBe("Mesa de comedor · sillas");
		expect(es.c19p.photoTableSub).toBe(
			"Adjunto · archivo de ejemplo reemplazable",
		);
		expect(es.c19p.photoBoxesTitle).toBe("Cajas y objetos varios");
		expect(es.c19p.photoBoxesSub).toBe(
			"Adjunto · archivo de ejemplo reemplazable",
		);
		expect(es.c19p.attachedSectionTitle).toBe("4 fotos de ejemplo adjuntas");
		expect(es.c19p.completedBadge).toBe("Completado en esta demo");
		expect(es.c19p.attachedDisclaimer1).toBe(
			"Las fotos son ejemplos de {{bookingId}} y se pueden revisar o reemplazar.",
		);
		expect(es.c19p.attachedDisclaimer2).toBe(
			"W02 aún no ha generado análisis IA ni precio.",
		);
		expect(es.c19p.continueCta).toBe("Continuar a detalles de acceso");
		expect(es.c19p.replaceSofaCta).toBe("Reemplazar foto del sofá   ›");
		expect(es.c19p.uploadFailureCta).toBe("Ejemplo de fallo de carga   ›");
		expect(es.c19p.noPhotosYetCta).toBe("Aún sin fotos   ›");
		expect(es.c19p.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c19p.footerSrs).toBe(
			"SRS  BK-04, AI-01, AI-03  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. validates customer profiles for English (Sarah) and Spanish (Bryan)", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});

	it("4. verifies genuine photo assets exist including new c19p-boxes.png", () => {
		expect(fs.existsSync(boxesImagePath)).toBe(true);
		expect(fs.statSync(boxesImagePath).size).toBeGreaterThan(1000);
		expect(C19P_PHOTO_ITEMS).toHaveLength(4);
	});

	it("5. verifies route implementation and demo registration exist", () => {
		expect(fs.existsSync(c19pRoutePath)).toBe(true);
		const routeContent = fs.readFileSync(c19pRoutePath, "utf-8");
		expect(routeContent).toContain("c19p-continue-button");
		expect(routeContent).toContain("c19p-replace-sofa-button");
		expect(routeContent).toContain("c19p-failure-example-button");
		expect(routeContent).toContain("c19p-no-photos-button");

		expect(fs.existsSync(demoNavigatorPath)).toBe(true);
		const demoContent = fs.readFileSync(demoNavigatorPath, "utf-8");
		expect(demoContent).toContain("c19p-en");
		expect(demoContent).toContain("c19p-es");
	});
});
