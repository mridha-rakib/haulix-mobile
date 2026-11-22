import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import {
	C20E_DEFAULT_DATA,
	declineHandlingRequest,
	getHandlingRequestState,
	resetHandlingRequest,
	saveHandlingRequestDraft,
} from "../fixtures/c20eHandlingRequest";

describe("C20-E Extra Access Help — English (Node 382:1767) & Spanish (Node 980:9977)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/extra-access-help.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	beforeEach(() => {
		resetHandlingRequest();
	});

	afterEach(async () => {
		await resetProfileEdits("en");
		await resetProfileEdits("es");
		resetHandlingRequest();
	});

	it("1. verifies exact English copy from Figma Node 382:1767", () => {
		expect(en.c20e.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c20e.stepSub).toBe("  /  C20-E");
		expect(en.c20e.title).toBe("Request additional handling");
		expect(en.c20e.subtitle).toBe(
			"Optional labor and disassembly are assessed during quotation, not pre-authorized here.",
		);
		expect(en.c20e.sectionExampleTitle).toBe("Example handling request");
		expect(en.c20e.labelTask).toBe("Task");
		expect(en.c20e.valueTask).toBe("Disassemble and reassemble table");
		expect(en.c20e.labelLocation).toBe("Location");
		expect(en.c20e.valueLocation).toBe("Living room");
		expect(en.c20e.labelAccess).toBe("Access");
		expect(en.c20e.valueAccess).toBe("Ground level; driveway accessible");
		expect(en.c20e.labelScopeStatus).toBe("Scope status");
		expect(en.c20e.valueScopeStatus).toBe(
			"Customer request · Not priced or accepted",
		);
		expect(en.c20e.sectionReviewTitle).toBe("Optional work requires approval");
		expect(en.c20e.reviewBadge).toBe("Review required");
		expect(en.c20e.reviewGuidance1).toBe(
			"Extra help affects scope, worker time and safe handling checks.",
		);
		expect(en.c20e.reviewGuidance2).toBe(
			"Final quote and any extra-work approvals occur later, subject to SRS rules.",
		);
		expect(en.c20e.saveRequestCta).toBe("Save access request");
		expect(en.c20e.doNotRequestCta).toBe("Do not request extra help   ›");
		expect(en.c20e.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c20e.footerSrs).toBe(
			"SRS  SV-04, BK-03  ·  430 px / vertical scroll",
		);
	});

	it("2. verifies exact Spanish copy from Figma Node 980:9977", () => {
		expect(es.c20e.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
		expect(es.c20e.stepSub).toBe("  /  C20-E");
		expect(es.c20e.title).toBe("Solicitar manejo adicional");
		expect(es.c20e.subtitle).toBe(
			"La mano de obra y desmontaje se evalúan al cotizar; no se autorizan aquí.",
		);
		expect(es.c20e.sectionExampleTitle).toBe("Solicitud de manejo de ejemplo");
		expect(es.c20e.labelTask).toBe("Tarea");
		expect(es.c20e.valueTask).toBe("Desmontar y volver a montar la mesa");
		expect(es.c20e.labelLocation).toBe("Ubicación");
		expect(es.c20e.valueLocation).toBe("Sala de estar");
		expect(es.c20e.labelAccess).toBe("Acceso");
		expect(es.c20e.valueAccess).toBe(
			"Planta baja; entrada vehicular accesible",
		);
		expect(es.c20e.labelScopeStatus).toBe("Estado del alcance");
		expect(es.c20e.valueScopeStatus).toBe(
			"Solicitud del cliente · Sin precio ni aceptación",
		);
		expect(es.c20e.sectionReviewTitle).toBe(
			"El trabajo opcional requiere aprobación",
		);
		expect(es.c20e.reviewBadge).toBe("Revisión necesaria");
		expect(es.c20e.reviewGuidance1).toBe(
			"La ayuda extra afecta alcance, tiempo y manejo seguro.",
		);
		expect(es.c20e.reviewGuidance2).toBe(
			"La cotización y aprobación de extras se realizan después, según SRS.",
		);
		expect(es.c20e.saveRequestCta).toBe("Guardar solicitud de acceso");
		expect(es.c20e.doNotRequestCta).toBe("No pedir ayuda extra   ›");
		expect(es.c20e.footerDemo).toBe(
			"SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
		);
		expect(es.c20e.footerSrs).toBe(
			"SRS  SV-04, BK-03  ·  430 px / desplazamiento vertical",
		);
	});

	it("3. validates customer profiles for English and Spanish", () => {
		const enProfile = getC10DemoProfile("en");
		expect(enProfile.name).toBe("Sarah Mitchell");

		const esProfile = getC10DemoProfile("es");
		expect(esProfile.name).toBe("Bryan Lopez");
	});

	it("4. validates default C20-E request fixture structure", () => {
		expect(C20E_DEFAULT_DATA.exampleRequest.id).toBe("req-table-disassembly");
		expect(C20E_DEFAULT_DATA.isRequested).toBe(false);
		expect(C20E_DEFAULT_DATA.isDeclined).toBe(false);
		expect(C20E_DEFAULT_DATA.status).toBe("unrequested");
	});

	it("5. validates handling request draft save and decline lifecycle", () => {
		expect(getHandlingRequestState().status).toBe("unrequested");
		saveHandlingRequestDraft();
		expect(getHandlingRequestState().status).toBe("pending_quote");
		expect(getHandlingRequestState().isRequested).toBe(true);
		expect(getHandlingRequestState().isDeclined).toBe(false);

		declineHandlingRequest();
		expect(getHandlingRequestState().status).toBe("declined");
		expect(getHandlingRequestState().isRequested).toBe(false);
		expect(getHandlingRequestState().isDeclined).toBe(true);

		resetHandlingRequest();
		expect(getHandlingRequestState().status).toBe("unrequested");
	});

	it("6. verifies route file and DemoScreenNavigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const content = fs.readFileSync(routePath, "utf-8");
		expect(content).toContain("c20e-save-request-button");
		expect(content).toContain("c20e-decline-button");
		expect(content).toContain("c20e-example-request-card");
		expect(content).toContain("c20e-review-card");

		const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
		expect(navContent).toContain("c20e-en");
		expect(navContent).toContain("c20e-es");
	});
});
