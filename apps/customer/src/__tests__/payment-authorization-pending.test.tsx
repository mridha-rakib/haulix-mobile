import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C29-P Payment Authorization Pending — English (Node 763:745) & Spanish (Node 766:1131)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/payment-authorization-pending.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file existence and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c29p-es"');
		expect(navContent).toContain('id: "c29p-en"');
		expect(navContent).toContain('route: "/payment-authorization-pending"');
	});

	it("verifies demonstration simulation transitions to C30-D, C30-E, and C31-P", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain(
			'pathname: "/payment-authorization-declined"',
		);
		expect(routeContent).toContain('pathname: "/card-hold-expired"');
		expect(routeContent).toContain('pathname: "/checking-booking-status"');
		expect(routeContent).toContain("recordAuthorizationProcessing");
	});

	it("verifies exact C29-P English and Spanish translation strings", () => {
		expect(en.c29pPaymentAuthorization.progressLabel).toBe(
			"03 / 04  ·  PAYMENT",
		);
		expect(es.c29pPaymentAuthorization.progressLabel).toBe("03 / 04  ·  PAGO");
		expect(en.c29pPaymentAuthorization.screenTitle).toBe(
			"Authorizing your payment",
		);
		expect(es.c29pPaymentAuthorization.screenTitle).toBe("Autorizando tu pago");
		expect(en.c29pPaymentAuthorization.statusBadge).toBe(
			"AUTHORIZATION IN PROGRESS",
		);
		expect(es.c29pPaymentAuthorization.statusBadge).toBe(
			"AUTORIZACIÓN EN PROGRESO",
		);
		expect(en.c29pPaymentAuthorization.holdAmountValue).toBe("$356.00 USD");
		expect(es.c29pPaymentAuthorization.holdAmountValue).toBe("$356.00 USD");
		expect(en.c29pPaymentAuthorization.simulateDeclinedCta).toBe(
			"Simulate declined authorization (C30-D)",
		);
		expect(es.c29pPaymentAuthorization.simulateDeclinedCta).toBe(
			"Simular autorización rechazada (C30-D)",
		);
		expect(en.c29pPaymentAuthorization.simulateExpiredCta).toBe(
			"Simulate expired hold (C30-E)",
		);
		expect(es.c29pPaymentAuthorization.simulateExpiredCta).toBe(
			"Simular retención vencida (C30-E)",
		);
	});

	it("verifies no real transaction execution and proper UI prototype notices", () => {
		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain("c29pPaymentAuthorization.uiNote");
		expect(routeContent).not.toContain("stripe.confirmPayment");
		expect(routeContent).not.toContain("stripe.createPaymentMethod");
	});
});
