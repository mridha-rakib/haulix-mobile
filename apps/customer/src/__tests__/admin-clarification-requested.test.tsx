import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C24-ADM-D Admin Clarification Requested — English (Node 412:1099) & Spanish (Node 987:11000)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/admin-clarification-requested.tsx",
	);
	const adminPendingPath = path.resolve(
		__dirname,
		"../../app/(app)/admin-review-pending.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c24admd-es"');
		expect(navContent).toContain('id: "c24admd-en"');
		expect(navContent).toContain('route: "/admin-clarification-requested"');
	});

	it("verifies C24-ADM connects to C24-ADM-D and C24-ADM-D connects to C23-C and C24-ADM", () => {
		const adminContent = fs.readFileSync(adminPendingPath, "utf8");
		expect(adminContent).toContain(
			'pathname: "/admin-clarification-requested"',
		);

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/correct-ai-items"');
		expect(routeContent).toContain('pathname: "/admin-review-pending"');
	});

	it("verifies exact C24-ADM-D English and Spanish translation strings", () => {
		expect(en.c24admDAdminClarificationRequested.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c24admDAdminClarificationRequested.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c24admDAdminClarificationRequested.title).toBe(
			"More details requested",
		);
		expect(es.c24admDAdminClarificationRequested.title).toBe(
			"Se solicitaron más detalles",
		);
		expect(en.c24admDAdminClarificationRequested.subtitle).toBe(
			"The Admin needs clarification before the request can be priced.",
		);
		expect(es.c24admDAdminClarificationRequested.subtitle).toBe(
			"Admin necesita aclaraciones antes de cotizar.",
		);
		expect(en.c24admDAdminClarificationRequested.sectionNoticeTitle).toBe(
			"Review requires correction",
		);
		expect(es.c24admDAdminClarificationRequested.sectionNoticeTitle).toBe(
			"La revisión requiere corrección",
		);
		expect(en.c24admDAdminClarificationRequested.primaryCta).toBe(
			"Update item details",
		);
		expect(es.c24admDAdminClarificationRequested.primaryCta).toBe(
			"Actualizar detalles del objeto",
		);
		expect(en.c24admDAdminClarificationRequested.secondaryCta).toBe(
			"Review pending case  ›",
		);
		expect(es.c24admDAdminClarificationRequested.secondaryCta).toBe(
			"Ver caso pendiente  ›",
		);
	});
});
