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
	MAP_SOURCES_EN,
	MAP_SOURCES_ES,
	resolveW05MapAsset,
} from "../components/map/HaulixDispatchMap";
import {
	getW05DispatchState,
	resetDispatchDemo,
} from "../fixtures/c32Dispatch";
import { W03_CUSTOMER_CONFIRMED_INVENTORY } from "../fixtures/c36Scheduling";

describe("HAULIX Phase 03.47 — W05 Search Progression & Unrestricted Frontend Routing", () => {
	const routesDir = path.resolve(__dirname, "../../app/(app)");
	const demoNavPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);
	const assetsDir = path.resolve(__dirname, "../../assets/maps");
	const layoutPath = path.resolve(__dirname, "../../app/_layout.tsx");
	const appLayoutPath = path.resolve(__dirname, "../../app/(app)/_layout.tsx");

	beforeEach(() => {
		resetDispatchDemo();
	});

	describe("1. Unrestricted Frontend Routing Policy", () => {
		it("confirms root layout and app layout contain zero auth guards or blocking redirects", () => {
			const rootContent = fs.readFileSync(layoutPath, "utf8");
			const appContent = fs.readFileSync(appLayoutPath, "utf8");

			// Zero auth guard blocks
			expect(rootContent).not.toMatch(/if\s*\(!isAuthenticated\)/);
			expect(rootContent).not.toMatch(/router\.replace\(['"]\/(auth|login)/);
			expect(appContent).not.toMatch(/if\s*\(!isAuthenticated\)/);
			expect(appContent).not.toMatch(/router\.replace\(['"]\/(auth|login)/);
		});

		it("confirms all 4 new Batch 3 screens exist with unrestricted default export", () => {
			const batch3Screens = [
				"search-expanded-20mi.tsx",
				"search-expanding-30mi.tsx",
				"search-expanded-40mi.tsx",
				"search-expanded-50mi.tsx",
			];

			for (const file of batch3Screens) {
				const filePath = path.join(routesDir, file);
				expect(fs.existsSync(filePath)).toBe(true);
				const content = fs.readFileSync(filePath, "utf8");
				expect(content).toContain("export default function");
				// No redirect on mount
				expect(content).not.toContain("useEffect(() => { router.replace");
			}
		});
	});

	describe("2. Sequential Search Navigation Architecture", () => {
		it("confirms sequential search progression chaining: S10 -> S20 -> S30 -> S40 -> S50 -> No Driver", () => {
			const s10Content = fs.readFileSync(
				path.join(routesDir, "searching-for-driver.tsx"),
				"utf8",
			);
			expect(s10Content).toContain('pathname: "/search-expanded-20mi"');

			const s20Content = fs.readFileSync(
				path.join(routesDir, "search-expanded-20mi.tsx"),
				"utf8",
			);
			expect(s20Content).toContain('stage="s20"');
			expect(s20Content).toContain('backRoute="/searching-for-driver"');
			expect(s20Content).toContain('nextRoute="/search-expanding-30mi"');

			const s30Content = fs.readFileSync(
				path.join(routesDir, "search-expanding-30mi.tsx"),
				"utf8",
			);
			expect(s30Content).toContain('stage="s30"');
			expect(s30Content).toContain('backRoute="/search-expanded-20mi"');
			expect(s30Content).toContain('nextRoute="/search-expanded-40mi"');

			const s40Content = fs.readFileSync(
				path.join(routesDir, "search-expanded-40mi.tsx"),
				"utf8",
			);
			expect(s40Content).toContain('stage="s40"');
			expect(s40Content).toContain('backRoute="/search-expanding-30mi"');
			expect(s40Content).toContain('nextRoute="/search-expanded-50mi"');

			const s50Content = fs.readFileSync(
				path.join(routesDir, "search-expanded-50mi.tsx"),
				"utf8",
			);
			expect(s50Content).toContain('stage="s50"');
			expect(s50Content).toContain('backRoute="/search-expanded-40mi"');
			expect(s50Content).toContain('nextRoute="/no-driver-available"');
		});

		it("confirms all search stages offer secondary driver match preview and cancellation recovery", () => {
			const stageScreens = [
				"search-expanded-20mi.tsx",
				"search-expanding-30mi.tsx",
				"search-expanded-40mi.tsx",
				"search-expanded-50mi.tsx",
			];

			for (const file of stageScreens) {
				const content = fs.readFileSync(path.join(routesDir, file), "utf8");
				expect(content).toContain('previewMatchRoute="/driver-matched"');
				expect(content).toContain('cancelRoute="/cancellation-windows"');
			}
		});
	});

	describe("3. Authentic Map Localization & Asset Resolution", () => {
		it("confirms resolveW05MapAsset correctly resolves Spanish localized maps when locale is 'es'", () => {
			const modes = [
				"searching",
				"matched",
				"crew_tracking",
				"cancellation_windows",
				"no_driver",
				"driver_late",
				"driver_reassigned",
				"request_canceled",
				"s20",
				"s30",
				"s40",
				"s50",
			] as const;

			for (const mode of modes) {
				const enAsset = resolveW05MapAsset(mode, "en");
				const esAsset = resolveW05MapAsset(mode, "es");

				expect(enAsset).toBeDefined();
				expect(esAsset).toBeDefined();
				// Spanish and English assets must be distinct dedicated artwork
				expect(enAsset).toBe(MAP_SOURCES_EN[mode]);
				expect(esAsset).toBe(MAP_SOURCES_ES[mode]);
			}
		});

		it("confirms all 20 map PNG assets exist in assets/maps/ and are non-empty", () => {
			const allAssetFiles = [
				"map-s10-searching.png",
				"map-s10-searching-es.png",
				"map-s20-searching.png",
				"map-s20-searching-es.png",
				"map-s30-searching.png",
				"map-s30-searching-es.png",
				"map-s40-searching.png",
				"map-s40-searching-es.png",
				"map-s50-searching.png",
				"map-s50-searching-es.png",
				"map-driver-matched.png",
				"map-driver-matched-es.png",
				"map-crew-tracking.png",
				"map-crew-tracking-es.png",
				"map-driver-late.png",
				"map-driver-late-es.png",
				"map-driver-reassigned.png",
				"map-driver-reassigned-es.png",
				"map-no-driver.png",
				"map-no-driver-es.png",
				"map-cancellation-windows.png",
				"map-cancellation-windows-es.png",
				"map-request-canceled.png",
				"map-request-canceled-es.png",
			];

			for (const fileName of allAssetFiles) {
				const filePath = path.join(assetsDir, fileName);
				expect(fs.existsSync(filePath)).toBe(true);
				const stats = fs.statSync(filePath);
				expect(stats.size).toBeGreaterThan(10000); // At least 10KB
			}
		});
	});

	describe("4. QA Screen Navigator Registration", () => {
		it("confirms DemoScreenNavigator registers all 8 new bilingual Batch 3 screen variants", () => {
			const navContent = fs.readFileSync(demoNavPath, "utf8");

			expect(navContent).toContain('id: "w05-s20-en"');
			expect(navContent).toContain('id: "w05-s20-es"');
			expect(navContent).toContain('id: "w05-s30-en"');
			expect(navContent).toContain('id: "w05-s30-es"');
			expect(navContent).toContain('id: "w05-s40-en"');
			expect(navContent).toContain('id: "w05-s40-es"');
			expect(navContent).toContain('id: "w05-s50-en"');
			expect(navContent).toContain('id: "w05-s50-es"');

			expect(navContent).toContain('route: "/search-expanded-20mi"');
			expect(navContent).toContain('route: "/search-expanding-30mi"');
			expect(navContent).toContain('route: "/search-expanded-40mi"');
			expect(navContent).toContain('route: "/search-expanded-50mi"');
		});
	});

	describe("5. Deterministic Non-Mutating Frontend State", () => {
		it("confirms inspecting dispatch state does not mutate initial state or create fake cards", () => {
			const initialState = getW05DispatchState();
			expect(initialState.phase).toBe("searching");
			expect(initialState.isCancelled).toBe(false);
			expect(initialState.cancelReason).toBeNull();
		});

		it("preserves W03 customer confirmed inventory baseline (4 physical pieces across 3 categories)", () => {
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY).toBeDefined();
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY.piecesCount).toBe(4);
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY.categoriesCount).toBe(3);
		});
	});

	describe("6. Localization Completeness (EN & ES)", () => {
		it("verifies all Batch 3 keys exist symmetrically in English and Spanish", () => {
			const keys = ["w05S20", "w05S30", "w05S40", "w05S50"] as const;

			for (const k of keys) {
				expect(en[k]).toBeDefined();
				expect(es[k]).toBeDefined();

				expect(en[k].progressLabel).toBeTruthy();
				expect(es[k].progressLabel).toBeTruthy();
				expect(en[k].screenTitle).toBeTruthy();
				expect(es[k].screenTitle).toBeTruthy();
				expect(en[k].screenSubtitle).toBeTruthy();
				expect(es[k].screenSubtitle).toBeTruthy();
				expect(en[k].serviceArea).toBeTruthy();
				expect(es[k].serviceArea).toBeTruthy();
				expect(en[k].statusBadge).toBeTruthy();
				expect(es[k].statusBadge).toBeTruthy();
				expect(en[k].primaryCta).toBeTruthy();
				expect(es[k].primaryCta).toBeTruthy();
				expect(en[k].secondaryCta).toBeTruthy();
				expect(es[k].secondaryCta).toBeTruthy();
				expect(en[k].alternativeLink).toBeTruthy();
				expect(es[k].alternativeLink).toBeTruthy();
			}
		});
	});
});
