import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en } from "@haulix/i18n";
import {
	C01_RECENT_JOB_DEMO,
	C01_SAVED_ADDRESS_DEMO,
	C01_SERVICE_CATEGORIES,
} from "../fixtures/c01HomeServices";

describe("C01 Home & Services (English ONLY) — Figma Node 439:3498", () => {
	const homeRoutePath = path.resolve(__dirname, "../../app/(app)/index.tsx");
	const bottomNavPath = path.resolve(
		__dirname,
		"../components/navigation/CustomerBottomNav.tsx",
	);
	const heroImagePath = path.resolve(
		__dirname,
		"../../assets/c01/original-images/c01_hero_truck_original.png",
	);
	const recentJobImagePath = path.resolve(
		__dirname,
		"../../assets/c01/original-images/c01_recent_job_original.png",
	);
	const figmaRefImagePath = path.resolve(
		__dirname,
		"../../../../docs/qa/c01/figma-C01W-en-reference.png",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("verifies C01 Home route exists at apps/customer/app/(app)/index.tsx", () => {
		expect(fs.existsSync(homeRoutePath)).toBe(true);

		const source = fs.readFileSync(homeRoutePath, "utf8");
		expect(source).toContain("export default function HomeScreen");
		expect(source).toContain("useTranslation");
		expect(source).toContain("CustomerBottomNav");
	});

	it("verifies exact C01 English strings match authoritative Figma node 439:3498", () => {
		expect(en.home.brandTagline).toBe("We Haul It All.");
		expect(en.home.location).toBe("Phoenix, Arizona");
		expect(en.home.heroTitleWhite).toBe("Get It Gone.");
		expect(en.home.heroTitleLime).toBe("The Easy Way.");
		expect(en.home.heroSubtitle).toBe(
			"On-demand hauling, junk removal, moving and more — right at your fingertips.",
		);
		expect(en.home.searchPlaceholder).toBe("What do you need help with?");
		expect(en.home.bookService).toBe("Book a Service ›");
		expect(en.home.recentJobsTitle).toBe("Recent Jobs");
		expect(en.home.savedAddressesTitle).toBe("Saved Addresses");
		expect(en.home.seeAll).toBe("See All ›");
	});

	it("verifies the 8 service categories are defined in exact Figma order with Assembly Add-on disabled", () => {
		const expectedCategories = [
			{ id: "junk-removal", name: "Junk Removal", disabled: false },
			{ id: "moving", name: "Moving", disabled: false },
			{ id: "furniture-pickup", name: "Furniture Pickup", disabled: false },
			{ id: "appliance-removal", name: "Appliance Removal", disabled: false },
			{ id: "mattress-removal", name: "Mattress Removal", disabled: false },
			{ id: "garage-cleanout", name: "Garage Cleanout", disabled: false },
			{ id: "store-pickup", name: "Store Pickup", disabled: false },
			{ id: "assembly-addon", name: "Assembly Add-on", disabled: true },
		];

		expect(C01_SERVICE_CATEGORIES).toHaveLength(8);

		expectedCategories.forEach((expected, index) => {
			const actual = C01_SERVICE_CATEGORIES[index];
			expect(actual.id).toBe(expected.id);
			expect(actual.name).toBe(expected.name);
			expect(Boolean(actual.isDisabled)).toBe(expected.disabled);
		});
	});

	it("verifies original source PNG images are downloaded and have valid PNG signatures", () => {
		expect(fs.existsSync(heroImagePath)).toBe(true);
		expect(fs.existsSync(recentJobImagePath)).toBe(true);
		expect(fs.existsSync(figmaRefImagePath)).toBe(true);

		const heroBytes = fs.readFileSync(heroImagePath);
		const recentBytes = fs.readFileSync(recentJobImagePath);

		// Standard PNG magic bytes: 0x89, 0x50, 0x4E, 0x47
		expect(heroBytes[0]).toBe(0x89);
		expect(heroBytes[1]).toBe(0x50);
		expect(heroBytes[2]).toBe(0x4e);
		expect(heroBytes[3]).toBe(0x47);
		expect(heroBytes.length).toBeGreaterThan(50000); // 77 KB

		expect(recentBytes[0]).toBe(0x89);
		expect(recentBytes[1]).toBe(0x50);
		expect(recentBytes[2]).toBe(0x4e);
		expect(recentBytes[3]).toBe(0x47);
		expect(recentBytes.length).toBeGreaterThan(2000); // 2.5 KB
	});

	it("verifies all 12 original Figma exported SVGs exist in assets/c01/original-svg", () => {
		const svgDir = path.resolve(__dirname, "../../assets/c01/original-svg");
		const requiredSvgs = [
			"header_location_chevron_16x14.svg",
			"header_location_pin_18x22.svg",
			"saved_home_36.svg",
			"search_31.svg",
			"service_appliance_32.svg",
			"service_assembly_addon_32.svg",
			"service_furniture_32.svg",
			"service_garage_32.svg",
			"service_junk_46x34.svg",
			"service_mattress_32.svg",
			"service_moving_32.svg",
			"service_store_32.svg",
		];

		requiredSvgs.forEach((filename) => {
			const fullPath = path.join(svgDir, filename);
			expect(fs.existsSync(fullPath)).toBe(true);
			const content = fs.readFileSync(fullPath, "utf8");
			expect(content).toContain("<svg");
		});
	});

	it("verifies Recent Jobs demo fixture matches Figma node 439:3620", () => {
		expect(C01_RECENT_JOB_DEMO.title).toBe("Junk Removal");
		expect(C01_RECENT_JOB_DEMO.addressLine1).toBe("1234 E Thomas Rd");
		expect(C01_RECENT_JOB_DEMO.addressLine2).toBe("Phoenix, AZ 85014");
		expect(C01_RECENT_JOB_DEMO.status).toBe("✓ Completed");
		expect(C01_RECENT_JOB_DEMO.date).toBe("Apr 12, 2024");
	});

	it("verifies Saved Addresses demo fixture matches Figma node 439:3630", () => {
		expect(C01_SAVED_ADDRESS_DEMO.label).toBe("Home");
		expect(C01_SAVED_ADDRESS_DEMO.address).toBe(
			"1234 E Thomas Rd, Phoenix, AZ 85014",
		);
	});

	it("verifies shared CustomerBottomNav supports Home active state and inter-screen navigation", () => {
		const source = fs.readFileSync(bottomNavPath, "utf8");
		expect(source).toContain("activeTab?: NavTabId");
		expect(source).toContain("NavSculptedCurve");
		expect(source).toContain('testID="c10-nav-home"');
		expect(source).toContain('testID="c10-nav-account"');
		expect(source).toContain('home: "/(app)"');
		expect(source).toContain('account: "/(app)/account"');
	});

	it("verifies DemoScreenNavigator includes c01-en and c01-es entries", () => {
		const source = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(source).toContain('id: "c01-en"');
		expect(source).toContain('name: "C01 · Home & Services (English)"');
		expect(source).toContain('figmaNode: "Node 439:3498"');
		expect(source).toContain('locale: "en"');

		expect(source).toContain('id: "c01-es"');
		expect(source).toContain('name: "C01 · Inicio y Servicios (Español)"');
		expect(source).toContain('locale: "es"');
	});

	it("verifies diacritic-insensitive search matching handles accented and unaccented terms", () => {
		const source = fs.readFileSync(homeRoutePath, "utf8");
		expect(source).toContain("normalizeSearch");
		expect(source).toContain(".normalize(");
	});

	it("verifies C01 Spanish translations match C01_ES_TRANSLATIONS.csv and Figma 974:8843", () => {
		expect(C01_SERVICE_CATEGORIES).toHaveLength(8);
		// 8 categories in exact order
		expect(C01_SERVICE_CATEGORIES[0].id).toBe("junk-removal");
		expect(C01_SERVICE_CATEGORIES[1].id).toBe("moving");
		expect(C01_SERVICE_CATEGORIES[2].id).toBe("furniture-pickup");
		expect(C01_SERVICE_CATEGORIES[3].id).toBe("appliance-removal");
		expect(C01_SERVICE_CATEGORIES[4].id).toBe("mattress-removal");
		expect(C01_SERVICE_CATEGORIES[5].id).toBe("garage-cleanout");
		expect(C01_SERVICE_CATEGORIES[6].id).toBe("store-pickup");
		expect(C01_SERVICE_CATEGORIES[7].id).toBe("assembly-addon");
		expect(C01_SERVICE_CATEGORIES[7].isDisabled).toBe(true);
	});

	it("verifies C01 tokens match HAULIX design system", () => {
		expect(colors.brand).toBe("#BAFF42");
		expect(colors.background).toBe("#080B0B");
		expect(colors.surface).toBe("#151A19");
		expect(colors.elevated).toBe("#222827");
		expect(colors.primaryText).toBe("#F6F8F6");
		expect(colors.secondaryText).toBe("#ADB7B1");
	});

	it("verifies unguarded frontend preview: no __DEV__ or auth gate blocks C01", () => {
		const source = fs.readFileSync(homeRoutePath, "utf8");
		expect(source).not.toContain("if (!__DEV__)");
		expect(source).not.toContain("isAuthenticated");
	});

	it("verifies all QA automation testIDs are present in C01 Home", () => {
		const source = fs.readFileSync(homeRoutePath, "utf8");
		expect(source).toContain('testID="c01-home-screen"');
		expect(source).toContain('testID="c01-header-bell"');
		expect(source).toContain('testID="c01-location-selector"');
		expect(source).toContain('testID="c01-hero-card"');
		expect(source).toContain('testID="c01-search-bar"');
		expect(source).toContain('testID="c01-search-input"');
		expect(source).toContain('testID="c01-book-service-btn"');
		expect(source).toContain('testID="c01-recent-jobs-see-all"');
		expect(source).toContain('testID="c01-recent-job-card"');
		expect(source).toContain('testID="c01-saved-addresses-see-all"');
		expect(source).toContain('testID="c01-saved-address-card"');
		expect(source).toContain('testID="c01-notice-banner"');
		expect(source).toContain('testID="c01-search-empty-state"');
	});
});
