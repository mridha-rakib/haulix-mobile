import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C22O_DEFAULT_LEDGER } from "../fixtures/c29AiResults";

describe("C22-O Offline Recovery — English (Node 412:433) & Spanish (Node 987:10209)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/ai-offline-recovery.tsx",
	);
	const recognitionRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/ai-recognition.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c22o-es"');
		expect(navContent).toContain('id: "c22o-en"');
		expect(navContent).toContain('route: "/ai-offline-recovery"');
	});

	it("verifies C22 connects to C22-O offline recovery", () => {
		const recognitionContent = fs.readFileSync(recognitionRoutePath, "utf8");
		expect(recognitionContent).toContain('pathname: "/ai-offline-recovery"');
	});

	it("verifies exact C22-O English and Spanish translation strings", () => {
		expect(en.c22oAiOfflineRecovery.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c22oAiOfflineRecovery.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c22oAiOfflineRecovery.title).toBe("You're temporarily offline");
		expect(es.c22oAiOfflineRecovery.title).toBe(
			"Estás temporalmente sin conexión",
		);
		expect(en.c22oAiOfflineRecovery.subtitle).toBe(
			"Previously entered inventory and images remain in this demonstration draft.",
		);
		expect(es.c22oAiOfflineRecovery.subtitle).toBe(
			"El inventario y fotos anteriores siguen en el borrador demo.",
		);
		expect(en.c22oAiOfflineRecovery.sectionOfflineTitle).toBe(
			"No network connection",
		);
		expect(es.c22oAiOfflineRecovery.sectionOfflineTitle).toBe(
			"Sin conexión de red",
		);
		expect(en.c22oAiOfflineRecovery.offlineSupporting).toBe(
			"AI results cannot be loaded right now.",
		);
		expect(es.c22oAiOfflineRecovery.offlineSupporting).toBe(
			"No se pueden cargar los resultados de IA ahora.",
		);
		expect(en.c22oAiOfflineRecovery.offlineGuidance).toBe(
			"Retry when connected or edit previously entered item details.",
		);
		expect(es.c22oAiOfflineRecovery.offlineGuidance).toBe(
			"Reintenta con conexión o edita los detalles anteriores.",
		);
		expect(en.c22oAiOfflineRecovery.primaryCta).toBe("Try again");
		expect(es.c22oAiOfflineRecovery.primaryCta).toBe("Volver a intentar");
		expect(en.c22oAiOfflineRecovery.secondaryManualInventoryCta).toBe(
			"Review manual inventory  ›",
		);
		expect(es.c22oAiOfflineRecovery.secondaryManualInventoryCta).toBe(
			"Revisar inventario manual  ›",
		);
	});

	it("verifies offline draft retention contract", () => {
		expect(C22O_DEFAULT_LEDGER.bookingId).toBe("HX-DEMO-1027");
		expect(C22O_DEFAULT_LEDGER.isSimulatedOfflinePreview).toBe(true);
		expect(C22O_DEFAULT_LEDGER.draftPreserved).toBe(true);
	});

	it("verifies retry simulation and upcoming manual inventory notices", () => {
		expect(en.c22oAiOfflineRecovery.noticeRetryDemo).toContain(
			"Connection retry preview simulated",
		);
		expect(en.c22oAiOfflineRecovery.noticeManualInventory).toContain("C23-M");
		expect(es.c22oAiOfflineRecovery.noticeManualInventory).toContain("C23-M");
		expect(en.c22oAiOfflineRecovery.footerDemo).toBe(
			"DEMO STATE · No validated quote or booking yet",
		);
	});
});
