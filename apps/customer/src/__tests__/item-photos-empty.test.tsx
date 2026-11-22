import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import { C19PE_EMPTY_CONFIG } from "../fixtures/c19peEmpty";

describe("C19-P-E Empty Media State — English (Node 382:1644) & Spanish (Node 980:9822)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/item-photos-empty.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
	});

	it("1. verifies exact English copy from Figma Node 382:1644", () => {
		expect(en.c19pe.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c19pe.stepSub).toBe("  /  C19-P-E");
		expect(en.c19pe.title).toBe("Add supporting photos");
		expect(en.c19pe.subtitle).toBe(
			"No images have been attached in this alternate demonstration state.",
		);
		expect(en.c19pe.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(en.c19pe.aiSectionTitle).toBe(
			"AI recognition needs visual evidence",
		);
		expect(en.c19pe.reviewRequiredBadge).toBe("Review required");
		expect(en.c19pe.aiNotice1).toBe(
			"Manual inventory is still saved; an image-dependent AI suggestion may be unavailable.",
		);
		expect(en.c19pe.aiNotice2).toBe(
			"Customers must not be given fabricated image-based measurements.",
		);
		expect(en.c19pe.selectPhotosCta).toBe("Select photos to attach");
		expect(en.c19pe.reviewDetailsCta).toBe("Review item details   ›");
		expect(en.c19pe.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c19pe.footerSrs).toBe(
			"SRS  BK-04, AI-01  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 980:9822", () => {
		expect(es.c19pe.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c19pe.stepSub).toBe("  /  C19-P-E");
		expect(es.c19pe.title).toBe("Añadir fotos de apoyo");
		expect(es.c19pe.subtitle).toBe(
			"No hay imágenes adjuntas en este estado alternativo de demo.",
		);
		expect(es.c19pe.customerContext).toBe("{{name}} · {{bookingId}}");
		expect(es.c19pe.aiSectionTitle).toBe("La IA necesita fotos");
		expect(es.c19pe.reviewRequiredBadge).toBe("Revisión necesaria");
		expect(es.c19pe.aiNotice1).toBe(
			"Se guarda el inventario manual; algunas sugerencias con IA necesitan imágenes.",
		);
		expect(es.c19pe.aiNotice2).toBe(
			"No se deben presentar medidas inventadas a partir de imágenes.",
		);
		expect(es.c19pe.selectPhotosCta).toBe("Elegir fotos para adjuntar");
		expect(es.c19pe.reviewDetailsCta).toBe("Revisar detalles del objeto   ›");
		expect(es.c19pe.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c19pe.footerSrs).toBe(
			"SRS  BK-04, AI-01  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. validates customer profiles for English and Spanish", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});

	it("4. validates empty state fixture has zero photos", () => {
		expect(C19PE_EMPTY_CONFIG.hasPhotos).toBe(false);
		expect(C19PE_EMPTY_CONFIG.totalPhotosAttached).toBe(0);
	});

	it("4. verifies route file and DemoScreenNavigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const content = fs.readFileSync(routePath, "utf-8");
		expect(content).toContain("c19pe-select-photos-button");
		expect(content).toContain("c19pe-review-details-button");
		expect(content).toContain("c19pe-ai-card");

		const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
		expect(navContent).toContain("c19pe-en");
		expect(navContent).toContain("c19pe-es");
	});
});
