import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	C23S_CONFIRMED_ITEMS,
	C23S_QUOTATION_INPUTS,
} from "../fixtures/c31Verification";

describe("C23-S Customer Confirmed Items — English (Node 412:683) & Spanish (Node 987:10506)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(app)/customer-confirmed-items.tsx",
	);
	const correctRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/correct-ai-items.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies route file and demo navigator registration", () => {
		expect(fs.existsSync(routePath)).toBe(true);
		const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navContent).toContain('id: "c23s-es"');
		expect(navContent).toContain('id: "c23s-en"');
		expect(navContent).toContain('route: "/customer-confirmed-items"');
	});

	it("verifies C23-C connects to C23-S", () => {
		const correctContent = fs.readFileSync(correctRoutePath, "utf8");
		expect(correctContent).toContain('pathname: "/customer-confirmed-items"');

		const routeContent = fs.readFileSync(routePath, "utf8");
		expect(routeContent).toContain('pathname: "/correct-ai-items"');
	});

	it("verifies exact C23-S English and Spanish translation strings", () => {
		expect(en.c23sCustomerConfirmedItems.flowMarker).toBe(
			"W03 · AI RECOGNITION & QUOTE",
		);
		expect(es.c23sCustomerConfirmedItems.flowMarker).toBe(
			"W03 · RECONOCIMIENTO IA Y COTIZACIÓN",
		);
		expect(en.c23sCustomerConfirmedItems.title).toBe("Your confirmed items");
		expect(es.c23sCustomerConfirmedItems.title).toBe("Tus objetos confirmados");
		expect(en.c23sCustomerConfirmedItems.subtitle).toBe(
			"Three categories; four individual pieces verified by Sarah.",
		);
		expect(es.c23sCustomerConfirmedItems.subtitle).toBe(
			"Sarah verificó tres categorías y cuatro piezas individuales.",
		);
		expect(en.c23sCustomerConfirmedItems.sectionConfirmedTitle).toBe(
			"Confirmed for pricing",
		);
		expect(es.c23sCustomerConfirmedItems.sectionConfirmedTitle).toBe(
			"Confirmado para cotizar",
		);
		expect(en.c23sCustomerConfirmedItems.itemSofaTitle).toBe("3-seat sofa");
		expect(es.c23sCustomerConfirmedItems.itemSofaTitle).toBe(
			"Sofá de tres plazas",
		);
		expect(en.c23sCustomerConfirmedItems.itemMattressesTitle).toBe(
			"Queen mattresses",
		);
		expect(es.c23sCustomerConfirmedItems.itemMattressesTitle).toBe(
			"Colchones tamaño queen",
		);
		expect(en.c23sCustomerConfirmedItems.itemTableTitle).toBe("Dining table");
		expect(es.c23sCustomerConfirmedItems.itemTableTitle).toBe(
			"Mesa de comedor",
		);
		expect(en.c23sCustomerConfirmedItems.sectionInputsTitle).toBe(
			"Inputs carried into quotation",
		);
		expect(es.c23sCustomerConfirmedItems.sectionInputsTitle).toBe(
			"Datos incorporados a la cotización",
		);
		expect(en.c23sCustomerConfirmedItems.sectionNoticeTitle).toBe(
			"Confirmation recorded (prototype)",
		);
		expect(es.c23sCustomerConfirmedItems.sectionNoticeTitle).toBe(
			"Confirmación registrada (prototipo)",
		);
		expect(en.c23sCustomerConfirmedItems.primaryCta).toBe(
			"Calculate illustrative quote",
		);
		expect(es.c23sCustomerConfirmedItems.primaryCta).toBe(
			"Calcular cotización ilustrativa",
		);
		expect(en.c23sCustomerConfirmedItems.secondaryCta).toBe(
			"Edit confirmed items  ›",
		);
		expect(es.c23sCustomerConfirmedItems.secondaryCta).toBe(
			"Editar objetos confirmados  ›",
		);
	});

	it("verifies confirmed items preserve invariant of 2 mattresses and genuine photography", () => {
		expect(C23S_CONFIRMED_ITEMS).toHaveLength(3);

		const mattresses = C23S_CONFIRMED_ITEMS.find(
			(i) => i.itemKey === "mattresses",
		);
		expect(mattresses?.confirmedQty).toBe(2);

		const assetsDir = path.resolve(__dirname, "../../assets/images/intake");
		expect(fs.existsSync(path.join(assetsDir, "c18j-sofa.png"))).toBe(true);
		expect(fs.existsSync(path.join(assetsDir, "c18j-mattresses.png"))).toBe(
			true,
		);
		expect(fs.existsSync(path.join(assetsDir, "c18j-table.png"))).toBe(true);

		expect(C23S_QUOTATION_INPUTS.pickupAddress).toContain(
			"1234 E Example Lane",
		);
	});
});
