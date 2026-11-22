import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getC10DemoProfile,
	resetProfileEdits,
} from "../fixtures/c10DemoProfile";
import {
	getIntakeDraftState,
	resetIntakeDraft,
	saveIntakeDraft,
} from "../fixtures/c21IntakeReview";

describe("C21 Full Intake Review — English (Node 382:1966) & Spanish (Node 980:10268)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/intake-review.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	beforeEach(() => {
		resetProfileEdits();
		resetIntakeDraft();
	});

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c21-es"');
		expect(navContent).toContain('id: "c21-en"');
		expect(navContent).toContain('route: "/intake-review"');
	});

	it("verifies exact C21 English and Spanish translation strings", () => {
		expect(en.c21.title).toBe("Review your service details");
		expect(es.c21.title).toBe("Revisar detalles del servicio");
		expect(en.c21.selectedBookingId).toBe("HX-DEMO-1027 · Junk Removal");
		expect(es.c21.selectedBookingId).toBe("HX-DEMO-1027 · Retiro de objetos");
		expect(en.c21.primaryCta).toBe("Confirm intake & continue to AI");
		expect(es.c21.primaryCta).toBe("Confirmar solicitud y continuar a IA");
		expect(en.c21.mediaAttachedTag).toBe("Attached · replaceable demo media");
		expect(es.c21.mediaAttachedTag).toBe(
			"Adjunto · multimedia de demo reemplazable",
		);
	});

	it("verifies customer profile dynamic binding and locale isolation", () => {
		const enProfile = getC10DemoProfile("en");
		const esProfile = getC10DemoProfile("es");
		expect(enProfile.name).toBe("Sarah Mitchell");
		expect(esProfile.name).toBe("Bryan Lopez");
	});

	it("verifies draft state updates and attachment integrity", () => {
		const initial = getIntakeDraftState();
		expect(initial.isDraftSaved).toBe(false);
		expect(initial.mediaAttachments.length).toBe(4);

		saveIntakeDraft();
		expect(getIntakeDraftState().isDraftSaved).toBe(true);
	});
});
