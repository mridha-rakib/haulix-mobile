import fs from "node:fs";
import path from "node:path";

jest.mock("react-native-svg", () => {
	const React = require("react");
	const Component = (props: any) => React.createElement("svg-mock", props);
	return {
		__esModule: true,
		default: Component,
		Svg: Component,
		Circle: Component,
		Defs: Component,
		G: Component,
		Line: Component,
		Path: Component,
		Pattern: Component,
		Polygon: Component,
		Polyline: Component,
		Rect: Component,
		Text: Component,
	};
});

import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getW05DispatchState,
	resetDispatchDemo,
} from "../fixtures/c32Dispatch";

describe("HAULIX Phase 03.49 — W05 Final Canonical States & Unrestricted Frontend Routing", () => {
	const routesDir = path.resolve(__dirname, "../../app/(app)");
	const demoNavPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	beforeEach(() => {
		resetDispatchDemo();
	});

	describe("1. Unrestricted Frontend Routing & File Existence", () => {
		const finalScreens = [
			{
				file: "driver-no-show.tsx",
				route: "/driver-no-show",
				headerTestID: "w05-no-show-header",
			},
			{
				file: "dispatch-reschedule.tsx",
				route: "/dispatch-reschedule",
				headerTestID: "w05-reschedule-header",
			},
			{
				file: "dispatch-support.tsx",
				route: "/dispatch-support",
				headerTestID: "w05-support-header",
			},
			{
				file: "job-active-bridge.tsx",
				route: "/job-active-bridge",
				headerTestID: "w05-bridge-header",
			},
		];

		it("verifies all four Phase 03.49 screen files exist with export default", () => {
			for (const item of finalScreens) {
				const filePath = path.join(routesDir, item.file);
				expect(fs.existsSync(filePath)).toBe(true);
				const content = fs.readFileSync(filePath, "utf8");
				expect(content).toContain("export default function");
				expect(content).toContain(item.headerTestID);
			}
		});

		it("verifies zero authentication, payment, or dispatch prerequisite guards exist", () => {
			for (const item of finalScreens) {
				const filePath = path.join(routesDir, item.file);
				const content = fs.readFileSync(filePath, "utf8");
				expect(content).not.toMatch(/if\s*\(!isAuthenticated\)/);
				expect(content).not.toMatch(/if\s*\(!hasBooking\)/);
				expect(content).not.toMatch(/router\.replace\(['"]\/(auth|login)/);
				expect(content).not.toMatch(/router\.replace\(['"]\/(sign-in)/);
			}
		});

		it("verifies hardware back button handling with BackHandler in all screens", () => {
			for (const item of finalScreens) {
				const filePath = path.join(routesDir, item.file);
				const content = fs.readFileSync(filePath, "utf8");
				expect(content).toContain("BackHandler.addEventListener");
				expect(content).toContain("hardwareBackPress");
			}
		});
	});

	describe("2. QA Navigator Registration (8 Entries)", () => {
		it("verifies all 8 EN/ES entries are registered in DemoScreenNavigator", () => {
			const navContent = fs.readFileSync(demoNavPath, "utf8");

			const expectedEntries = [
				{
					id: "w05-no-show-es",
					route: "/driver-no-show",
					locale: "es",
					node: "844:8128",
				},
				{
					id: "w05-no-show-en",
					route: "/driver-no-show",
					locale: "en",
					node: "844:5978",
				},
				{
					id: "w05-reschedule-es",
					route: "/dispatch-reschedule",
					locale: "es",
					node: "844:8496",
				},
				{
					id: "w05-reschedule-en",
					route: "/dispatch-reschedule",
					locale: "en",
					node: "844:6346",
				},
				{
					id: "w05-support-es",
					route: "/dispatch-support",
					locale: "es",
					node: "844:8595",
				},
				{
					id: "w05-support-en",
					route: "/dispatch-support",
					locale: "en",
					node: "844:6445",
				},
				{
					id: "w05-w06-bridge-es",
					route: "/job-active-bridge",
					locale: "es",
					node: "844:8687",
				},
				{
					id: "w05-w06-bridge-en",
					route: "/job-active-bridge",
					locale: "en",
					node: "844:6537",
				},
			];

			for (const entry of expectedEntries) {
				expect(navContent).toContain(`id: "${entry.id}"`);
				expect(navContent).toContain(`route: "${entry.route}"`);
				expect(navContent).toContain(`locale: "${entry.locale}"`);
				expect(navContent).toContain(entry.node);
			}
		});
	});

	describe("3. Bilingual Localization Parity & Integrity", () => {
		const w05Sections = [
			"w05NoShow",
			"w05Reschedule",
			"w05Support",
			"w05W06Bridge",
		] as const;

		it("confirms complete structural symmetry between EN and ES dictionaries", () => {
			for (const section of w05Sections) {
				const enKeys = Object.keys((en as any)[section]).sort();
				const esKeys = Object.keys((es as any)[section]).sort();

				expect(enKeys).toEqual(esKeys);
				expect(enKeys.length).toBeGreaterThan(15);

				// Verify no empty values
				for (const key of enKeys) {
					const enVal = (en as any)[section][key];
					const esVal = (es as any)[section][key];
					expect(typeof enVal).toBe("string");
					expect(typeof esVal).toBe("string");
					expect(enVal.length).toBeGreaterThan(0);
					expect(esVal.length).toBeGreaterThan(0);
				}
			}
		});

		it("verifies accurate canonical titles and badges in both languages", () => {
			expect(en.w05NoShow.screenTitle).toBe("Driver has not arrived");
			expect(es.w05NoShow.screenTitle).toBe("El conductor aún no llega");
			expect(en.w05NoShow.statusBadge).toBe("NO-SHOW REVIEW");
			expect(es.w05NoShow.statusBadge).toBe("REVISIÓN DE AUSENCIA");

			expect(en.w05Reschedule.screenTitle).toBe(
				"Choose another service window",
			);
			expect(es.w05Reschedule.screenTitle).toBe(
				"Elige otra ventana de servicio",
			);
			expect(en.w05Reschedule.statusBadge).toBe("RESCHEDULE OPTIONS");
			expect(es.w05Reschedule.statusBadge).toBe("OPCIONES DE REPROGRAMACIÓN");

			expect(en.w05Support.screenTitle).toBe("Get dispatch support");
			expect(es.w05Support.screenTitle).toBe("Obtener ayuda con el despacho");
			expect(en.w05Support.statusBadge).toBe("SUPPORT · DEMO");
			expect(es.w05Support.statusBadge).toBe("SOPORTE · DEMO");

			expect(en.w05W06Bridge.screenTitle).toBe("Next: arrival and service");
			expect(es.w05W06Bridge.screenTitle).toBe("Siguiente: llegada y servicio");
			expect(en.w05W06Bridge.statusBadge).toBe("W06 HANDOFF · DEMO");
			expect(es.w05W06Bridge.statusBadge).toBe("TRANSFERENCIA A W06 · DEMO");
		});
	});

	describe("4. 20/20 W05 Complete Canonical State Reconciliation", () => {
		const ALL_20_W05_STATES = [
			{
				index: 1,
				state: "S10",
				route: "/searching-for-driver",
				enNode: "844:4571",
				esNode: "844:6721",
			},
			{
				index: 2,
				state: "S20",
				route: "/search-expanded-20mi",
				enNode: "844:4670",
				esNode: "844:6820",
			},
			{
				index: 3,
				state: "S30",
				route: "/search-expanding-30mi",
				enNode: "844:4769",
				esNode: "844:6919",
			},
			{
				index: 4,
				state: "S40",
				route: "/search-expanded-40mi",
				enNode: "844:4868",
				esNode: "844:7018",
			},
			{
				index: 5,
				state: "S50",
				route: "/search-expanded-50mi",
				enNode: "844:4967",
				esNode: "844:7117",
			},
			{
				index: 6,
				state: "ACCEPT_PENDING",
				route: "/driver-offer-pending",
				enNode: "844:5066",
				esNode: "844:7216",
			},
			{
				index: 7,
				state: "ASSIGNED",
				route: "/driver-matched",
				enNode: "844:5165",
				esNode: "844:7315",
			},
			{
				index: 8,
				state: "DRIVER_DETAILS",
				route: "/driver-profile-details",
				enNode: "844:5284",
				esNode: "844:7434",
			},
			{
				index: 9,
				state: "HELPER_PENDING",
				route: "/helper-matching",
				enNode: "844:5403",
				esNode: "844:7553",
			},
			{
				index: 10,
				state: "HELPER_CONFIRMED",
				route: "/crew-tracking",
				enNode: "844:5522",
				esNode: "844:7672",
			},
			{
				index: 11,
				state: "RESTART",
				route: "/dispatch-retry",
				enNode: "844:5641",
				esNode: "844:7791",
			},
			{
				index: 12,
				state: "REASSIGNED",
				route: "/driver-reassigned",
				enNode: "844:5740",
				esNode: "844:7890",
			},
			{
				index: 13,
				state: "DRIVER_LATE",
				route: "/driver-arrival-update",
				enNode: "844:5859",
				esNode: "844:8009",
			},
			{
				index: 14,
				state: "NO_SHOW",
				route: "/driver-no-show",
				enNode: "844:5978",
				esNode: "844:8128",
			},
			{
				index: 15,
				state: "NO_DRIVER",
				route: "/no-driver-available",
				enNode: "844:6070",
				esNode: "844:8220",
			},
			{
				index: 16,
				state: "CANCEL_REVIEW",
				route: "/no-driver-fee-free-cancellation",
				enNode: "844:6162",
				esNode: "844:8312",
			},
			{
				index: 17,
				state: "CANCELED",
				route: "/request-canceled",
				enNode: "844:6254",
				esNode: "844:8404",
			},
			{
				index: 18,
				state: "RESCHEDULE",
				route: "/dispatch-reschedule",
				enNode: "844:6346",
				esNode: "844:8496",
			},
			{
				index: 19,
				state: "SUPPORT",
				route: "/dispatch-support",
				enNode: "844:6445",
				esNode: "844:8595",
			},
			{
				index: 20,
				state: "W06_BRIDGE",
				route: "/job-active-bridge",
				enNode: "844:6537",
				esNode: "844:8687",
			},
		];

		it("verifies all 20 canonical W05 states have corresponding route files", () => {
			expect(ALL_20_W05_STATES).toHaveLength(20);
			for (const item of ALL_20_W05_STATES) {
				const fileName = `${item.route.replace("/", "")}.tsx`;
				const filePath = path.join(routesDir, fileName);
				expect(fs.existsSync(filePath)).toBe(true);
			}
		});
	});
});
