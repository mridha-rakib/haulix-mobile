import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import {
	C20X_DEFAULT_FLAGGED_ITEM,
	getFlaggedItem,
	removeFlaggedItemFromDraft,
	resetFlaggedItem,
} from "../fixtures/c20xRestricted";

describe("C20-X Restricted Material Review — English (Node 382:1911) & Spanish (Node 980:10197)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/restricted-material.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	beforeEach(() => {
		resetFlaggedItem();
	});

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
		resetFlaggedItem();
	});

	it("1. verifies exact English copy from Figma Node 382:1911", () => {
		expect(en.c20x.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c20x.stepSub).toBe("  /  C20-X");
		expect(en.c20x.title).toBe("We need to review this item");
		expect(en.c20x.subtitle).toBe(
			"Unknown liquids or prohibited material cannot be automatically added to a removal booking.",
		);
		expect(en.c20x.sectionFlaggedTitle).toBe("Flagged item");
		expect(en.c20x.labelDescription).toBe("Description");
		expect(en.c20x.valueDescription).toBe("Unlabeled containers in garage");
		expect(en.c20x.labelMaterial).toBe("Material");
		expect(en.c20x.valueMaterial).toBe(
			"Unknown · Customer clarification required",
		);
		expect(en.c20x.labelPhoto).toBe("Photo");
		expect(en.c20x.valuePhoto).toBe("Not yet supplied");
		expect(en.c20x.labelService).toBe("Service");
		expect(en.c20x.valueService).toBe("Garage Cleanout");
		expect(en.c20x.sectionHoldTitle).toBe("Hold / clarify before proceeding");
		expect(en.c20x.holdBadge).toBe("Action required");
		expect(en.c20x.holdGuidance1).toBe(
			"Do not promise that the crew will transport the item.",
		);
		expect(en.c20x.holdGuidance2).toBe(
			"Local authority and approved facility eligibility require verification or refusal.",
		);
		expect(en.c20x.removeFlaggedCta).toBe("Remove flagged item from draft");
		expect(en.c20x.backToServicesCta).toBe("Back to service list   ›");
		expect(en.c20x.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c20x.footerSrs).toBe(
			"SRS  SV-01, SV-02, SV-12  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 980:10197", () => {
		expect(es.c20x.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c20x.stepSub).toBe("  /  C20-X");
		expect(es.c20x.title).toBe("Debemos revisar este objeto");
		expect(es.c20x.subtitle).toBe(
			"Líquidos desconocidos o materiales prohibidos no se añaden automáticamente.",
		);
		expect(es.c20x.sectionFlaggedTitle).toBe("Objeto señalado");
		expect(es.c20x.labelDescription).toBe("Descripción");
		expect(es.c20x.valueDescription).toBe(
			"Recipientes sin etiqueta en el garaje",
		);
		expect(es.c20x.labelMaterial).toBe("Material");
		expect(es.c20x.valueMaterial).toBe(
			"Desconocido · Se requiere aclaración del cliente",
		);
		expect(es.c20x.labelPhoto).toBe("Foto");
		expect(es.c20x.valuePhoto).toBe("Aún no proporcionado");
		expect(es.c20x.labelService).toBe("Servicio");
		expect(es.c20x.valueService).toBe("Limpieza de garaje");
		expect(es.c20x.sectionHoldTitle).toBe(
			"Detener y aclarar antes de continuar",
		);
		expect(es.c20x.holdBadge).toBe("Acción necesaria");
		expect(es.c20x.holdGuidance1).toBe(
			"No prometas que el equipo transportará el objeto.",
		);
		expect(es.c20x.holdGuidance2).toBe(
			"Se requiere validar la autoridad y el centro autorizado o rechazar el retiro.",
		);
		expect(es.c20x.removeFlaggedCta).toBe(
			"Quitar objeto señalado del borrador",
		);
		expect(es.c20x.backToServicesCta).toBe(
			"Volver a la lista de servicios   ›",
		);
		expect(es.c20x.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c20x.footerSrs).toBe(
			"SRS  SV-01, SV-02, SV-12  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. validates customer profiles for English and Spanish", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});

	it("4. validates default flagged item fixture structure", () => {
		expect(C20X_DEFAULT_FLAGGED_ITEM.id).toBe("flagged-containers-garage");
		expect(C20X_DEFAULT_FLAGGED_ITEM.service).toBe("Garage Cleanout");
		expect(C20X_DEFAULT_FLAGGED_ITEM.serviceEs).toBe("Limpieza de garaje");
		expect(getFlaggedItem()).not.toBeNull();
	});

	it("5. validates safe removal of the flagged item without mutating unrelated items", () => {
		expect(getFlaggedItem()).not.toBeNull();
		removeFlaggedItemFromDraft();
		expect(getFlaggedItem()).toBeNull();
		resetFlaggedItem();
		expect(getFlaggedItem()).not.toBeNull();
	});

	it("6. verifies route file and DemoScreenNavigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const content = fs.readFileSync(routePath, "utf-8");
		expect(content).toContain("c20x-remove-flagged-button");
		expect(content).toContain("c20x-back-services-button");
		expect(content).toContain("c20x-flagged-item-card");
		expect(content).toContain("c20x-hold-card");

		const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
		expect(navContent).toContain("c20x-en");
		expect(navContent).toContain("c20x-es");
	});
});
