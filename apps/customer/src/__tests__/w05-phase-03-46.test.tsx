/**
 * HAULIX Customer Mobile App — Phase 03.46
 * Automated Test Suite: Authentic Figma Fidelity & Critical UX Remediation
 *
 * Covers:
 * 1. Authentic Figma Phoenix Map Artwork assets and resolution
 * 2. Wordmark header deduplication across all 8 canonical W05 screens
 * 3. Driver avatar authenticity (Mike R. and Sarah L.)
 * 4. Safe cancellation state machine (zero auto-mutation on mount)
 * 5. Truthful support contact messaging (EN & ES)
 * 6. Customer confirmed inventory preservation (4 pieces, 3 categories)
 */

import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
	getW05DispatchState,
	resetDispatchDemo,
	setDispatchPhase,
	simulateFeeFreeExit,
	W03_CUSTOMER_CONFIRMED_INVENTORY,
} from "../fixtures/c32Dispatch";

describe("HAULIX Phase 03.46 — W05 Authentic Figma Fidelity & UX Remediation", () => {
	const routesDir = path.resolve(__dirname, "../../app/(app)");
	const mapsDir = path.resolve(__dirname, "../../assets/maps");
	const imagesDir = path.resolve(__dirname, "../../assets/images");
	const mapComponentPath = path.resolve(
		__dirname,
		"../components/map/HaulixDispatchMap.tsx",
	);

	const canonicalRoutes = [
		{
			id: "C32-A",
			file: "searching-for-driver.tsx",
			route: "/searching-for-driver",
		},
		{ id: "C32-B", file: "driver-matched.tsx", route: "/driver-matched" },
		{ id: "C32-C", file: "crew-tracking.tsx", route: "/crew-tracking" },
		{
			id: "C32-D",
			file: "cancellation-windows.tsx",
			route: "/cancellation-windows",
		},
		{
			id: "W05-ND",
			file: "no-driver-available.tsx",
			route: "/no-driver-available",
		},
		{
			id: "W05-DL",
			file: "driver-arrival-update.tsx",
			route: "/driver-arrival-update",
		},
		{
			id: "W05-RA",
			file: "driver-reassigned.tsx",
			route: "/driver-reassigned",
		},
		{ id: "W05-CN", file: "request-canceled.tsx", route: "/request-canceled" },
	];

	beforeEach(() => {
		resetDispatchDemo();
	});

	describe("1. Authentic Figma Phoenix Map Artworks (P0-01)", () => {
		const requiredMapAssets = [
			"map-s10-searching.png",
			"map-driver-matched.png",
			"map-crew-tracking.png",
			"map-driver-late.png",
			"map-driver-reassigned.png",
			"map-no-driver.png",
			"map-cancellation-windows.png",
			"map-request-canceled.png",
		];

		it.each(requiredMapAssets)(
			"confirms authentic map PNG asset %s exists on disk",
			(asset) => {
				const assetPath = path.join(mapsDir, asset);
				expect(fs.existsSync(assetPath)).toBe(true);
				const stat = fs.statSync(assetPath);
				expect(stat.size).toBeGreaterThan(100000); // High-res map asset > 100KB
			},
		);

		it("confirms HaulixDispatchMap resolves authentic Figma assets and supports all W05 modes", () => {
			const mapContent = fs.readFileSync(mapComponentPath, "utf8");
			expect(mapContent).toContain("map-s10-searching.png");
			expect(mapContent).toContain("map-driver-matched.png");
			expect(mapContent).toContain("map-crew-tracking.png");
			expect(mapContent).toContain("map-driver-late.png");
			expect(mapContent).toContain("map-driver-reassigned.png");
			expect(mapContent).toContain("map-no-driver.png");
			expect(mapContent).toContain("map-cancellation-windows.png");
			expect(mapContent).toContain("map-request-canceled.png");

			// Verify SVG primitives are retained for overlay & testing contracts
			expect(mapContent).toContain("<Svg");
			expect(mapContent).toContain("<Path");
			expect(mapContent).toContain("<Circle");
			expect(mapContent).toContain("<Rect");
		});
	});

	describe("2. Wordmark & Header Deduplication (P0-02)", () => {
		it.each(canonicalRoutes)(
			"confirms screen $file does NOT contain duplicated HAULIX brandRow wordmark",
			({ file }) => {
				const filePath = path.join(routesDir, file);
				const content = fs.readFileSync(filePath, "utf8");

				// Should NOT contain the duplicated brand wordmark under header
				expect(content).not.toContain(
					"<Text style={styles.brandText}>HAULIX</Text>",
				);
				expect(content).not.toContain("<Text style={styles.brandWordmark}>");
			},
		);
	});

	describe("3. Driver Avatar Authenticity (P0-03)", () => {
		it("confirms authentic driver avatar assets exist in assets/images/", () => {
			expect(fs.existsSync(path.join(imagesDir, "driver-mike.png"))).toBe(true);
			expect(fs.existsSync(path.join(imagesDir, "driver-sarah.png"))).toBe(
				true,
			);
		});

		it("confirms driver-matched and driver-arrival-update render driver-mike.png", () => {
			const matchedContent = fs.readFileSync(
				path.join(routesDir, "driver-matched.tsx"),
				"utf8",
			);
			const lateContent = fs.readFileSync(
				path.join(routesDir, "driver-arrival-update.tsx"),
				"utf8",
			);
			expect(matchedContent).toContain("driver-mike.png");
			expect(lateContent).toContain("driver-mike.png");
		});

		it("confirms driver-reassigned renders driver-sarah.png", () => {
			const reassignedContent = fs.readFileSync(
				path.join(routesDir, "driver-reassigned.tsx"),
				"utf8",
			);
			expect(reassignedContent).toContain("driver-sarah.png");
		});
	});

	describe("4. Cancellation State Machine Safety (P0-05)", () => {
		it("confirms viewing cancellation screens does NOT mutate dispatch state on mount", () => {
			setDispatchPhase("en_route");
			const stateBefore = getW05DispatchState();
			expect(stateBefore.phase).toBe("en_route");

			// Check file source: request-canceled and cancellation-windows must not call setDispatchPhase in mount effect
			const cancelContent = fs.readFileSync(
				path.join(routesDir, "request-canceled.tsx"),
				"utf8",
			);
			const windowsContent = fs.readFileSync(
				path.join(routesDir, "cancellation-windows.tsx"),
				"utf8",
			);

			expect(cancelContent).not.toMatch(
				/useEffect\(\(\)\s*=>\s*\{\s*setDispatchPhase/,
			);
			expect(windowsContent).not.toMatch(
				/useEffect\(\(\)\s*=>\s*\{\s*setDispatchPhase/,
			);
		});

		it("verifies explicit fee-free cancellation mutation only happens on explicit action", () => {
			setDispatchPhase("searching");
			expect(getW05DispatchState().phase).toBe("searching");

			simulateFeeFreeExit("customer_requested_fee_free");
			expect(getW05DispatchState().phase).toBe("cancelled_fee_free");
			expect(getW05DispatchState().isCancelled).toBe(true);
		});
	});

	describe("5. Truthful Support Contact Preview Messaging (P0-06)", () => {
		const namespaces = [
			"w05NoDriver",
			"w05DriverLate",
			"w05Reassigned",
			"w05Canceled",
		] as const;

		it.each(namespaces)(
			"confirms namespace %s contains truthful demo support copy in EN and ES",
			(ns) => {
				const enNs = (en as Record<string, Record<string, string>>)[ns];
				const esNs = (es as Record<string, Record<string, string>>)[ns];

				expect(enNs.supportToast).toBe(
					"Support contact is available in the live service. This is an interactive demo preview.",
				);
				expect(esNs.supportToast).toBe(
					"El contacto de soporte está disponible en el servicio en vivo. Esta es una vista previa de demostración.",
				);
			},
		);
	});

	describe("6. Customer Inventory Isolation & Preservation (P0-07)", () => {
		it("confirms customer inventory strictly preserves 4 pieces across 3 categories", () => {
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY).toBeDefined();
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY.piecesCount).toBe(4);
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY.categoriesCount).toBe(3);
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn).toContain(
				"1 sofa",
			);
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn).toContain(
				"2 queen mattresses",
			);
			expect(W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn).toContain(
				"1 dining table",
			);
		});
	});
});
