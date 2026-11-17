import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import { C15_SERVICES } from "../fixtures/c15Services";
import {
	C18M_DEFAULT_INVENTORY,
	C18M_DEFAULT_ROUTE,
	C18M_DEMO_CONSTANTS,
} from "../fixtures/c18mMovingIntake";

describe("C18-M Moving Service Intake — English ONLY (Node 382:881)", () => {
	const c18mRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/moving-intake.tsx",
	);
	const c17dRoutePath = path.resolve(
		__dirname,
		"../../app/(app)/moving-destination.tsx",
	);
	const c18mIconsPath = path.resolve(
		__dirname,
		"../components/discovery/C18MIcons.tsx",
	);
	const demoNavigatorPath = path.resolve(
		__dirname,
		"../components/demo/DemoScreenNavigator.tsx",
	);

	it("1. verifies exact C18-M English copy from authoritative Figma Node 382:881", () => {
		expect(en.c18m.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
		expect(en.c18m.stepSub).toBe("  /  C18-M");
		expect(en.c18m.title).toBe("Moving details");
		expect(en.c18m.subtitle).toBe(
			"Separate fictional scenario HX-DEMO-MOVE-1034 · No production quote.",
		);
		expect(en.c18m.fictionalCustomerBadge).toBe(
			"DANIEL RUIZ · HX-DEMO-MOVE-1034",
		);
		expect(en.c18m.fictionalCustomerName).toBe("Daniel Ruiz · fictional");
		expect(en.c18m.sectionARouteTitle).toBe("Moving route");
		expect(en.c18m.labelCustomer).toBe("Customer");
		expect(en.c18m.labelPickup).toBe("Pickup");
		expect(en.c18m.defaultPickupAddress).toBe(
			"2140 E Sample Road, Phoenix, AZ 85016",
		);
		expect(en.c18m.labelDropoff).toBe("Drop-off");
		expect(en.c18m.defaultDropoffAddress).toBe(
			"5678 N Demo Avenue, Phoenix, AZ 85012",
		);
		expect(en.c18m.labelRequestedScope).toBe("Requested scope");
		expect(en.c18m.defaultRequestedScope).toBe(
			"Household moving · 1-bedroom apartment",
		);
		expect(en.c18m.sectionBInventoryTitle).toBe("Inventory & access");
		expect(en.c18m.labelLargeItems).toBe("Large items");
		expect(en.c18m.defaultLargeItems).toBe(
			"2-seat couch ×1; dresser ×1; 12 moving boxes",
		);
		expect(en.c18m.labelEstimatedWeight).toBe("Estimated weight");
		expect(en.c18m.defaultEstimatedWeight).toBe(
			"Customer estimate ~550 lb total",
		);
		expect(en.c18m.labelOriginStairs).toBe("Origin stairs");
		expect(en.c18m.defaultOriginStairs).toBe("Ground floor");
		expect(en.c18m.labelDestinationStairs).toBe("Destination stairs");
		expect(en.c18m.defaultDestinationStairs).toBe("1 flight, no elevator");
		expect(en.c18m.labelPackingRequest).toBe("Packing request");
		expect(en.c18m.defaultPackingRequest).toBe(
			"No additional packing service selected",
		);
		expect(en.c18m.sectionCAssessmentTitle).toBe(
			"Load and crew assessment needed",
		);
		expect(en.c18m.badgeReviewRequired).toBe("Review required");
		expect(en.c18m.assessmentDescription).toBe(
			"Worker count/vehicle suitability is determined from approved capacity rules.",
		);
		expect(en.c18m.continueCta).toBe("Continue moving details");
		expect(en.c18m.returnServiceListCta).toBe("Return to service list   ›");
		expect(en.c18m.footerDemo).toBe(
			"DEMO ONLY  ·  No confirmed booking, rates or payment",
		);
		expect(en.c18m.footerSrs).toBe(
			"SRS  BK-02, BK-03, SV-14  ·  430 px / vertical scroll",
		);
		expect(en.c18m.noticeC20M).toBe(
			"Moving quote estimation (C20-M) is scheduled for an upcoming phase.",
		);
	});

	it("2. verifies dynamic customer context binding and booking ID isolation", () => {
		const englishProfile = getC10DemoProfile("en");
		expect(englishProfile.name).toBe("Sarah Mitchell");
		expect(C18M_DEMO_CONSTANTS.defaultBookingId).toBe("HX-DEMO-MOVE-1034");

		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("useCustomerProfile");
		expect(source).toContain("customerChipText");
		expect(source).toContain("defaultBookingId");
	});

	it("3. verifies selected pickup address preservation from C17/C17-D", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("params.pickupAddress");
		expect(source).toContain("params.selectedAddressId");
		expect(source).toContain("C17_DEFAULT_SAVED_ADDRESSES");
	});

	it("4. verifies drop-off destination preservation from C17-D", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("params.destinationAddress");
		expect(source).toContain("params.destinationCityStateZip");
		expect(source).toContain("defaultDropoffAddress");
	});

	it("5. verifies Moving service canonical identification", () => {
		const movingService = C15_SERVICES.find((s) => s.id === "moving");
		expect(movingService).toBeDefined();
		expect(movingService?.id).toBe("moving");

		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain('match.id === "moving"');
	});

	it("6. verifies Moving route section structure and 4 detail rows", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("C18MMovingRouteSection");
		expect(source).toContain("c18m-row-customer");
		expect(source).toContain("c18m-row-pickup");
		expect(source).toContain("c18m-row-dropoff");
		expect(source).toContain("c18m-row-scope");
	});

	it("7. verifies Inventory & access section structure and 5 detail rows", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("C18MInventorySection");
		expect(source).toContain("c18m-row-large-items");
		expect(source).toContain("c18m-row-weight");
		expect(source).toContain("c18m-row-origin-stairs");
		expect(source).toContain("c18m-row-destination-stairs");
		expect(source).toContain("c18m-row-packing");
	});

	it("8. verifies customer estimated weight disclaimer without claiming independent weighing", () => {
		expect(C18M_DEFAULT_INVENTORY.estimatedWeight).toContain(
			"Customer estimate",
		);
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("estimatedWeight");
	});

	it("9. verifies origin and destination stair access detail rows", () => {
		expect(C18M_DEFAULT_INVENTORY.originStairs).toBe("Ground floor");
		expect(C18M_DEFAULT_INVENTORY.destinationStairs).toBe(
			"1 flight, no elevator",
		);
	});

	it("10. verifies packing request default handling", () => {
		expect(C18M_DEFAULT_INVENTORY.packingRequest).toBe(
			"No additional packing service selected",
		);
	});

	it("11. verifies original review checkmark vector (18 × 18, amber #FFC85A)", () => {
		const iconsSource = fs.readFileSync(c18mIconsPath, "utf8");
		expect(iconsSource).toContain("C18MReviewCheckIcon");
		expect(iconsSource).toContain("#FFC85A");
		expect(iconsSource).toContain("M3 9.75L6.75 13.5L15 5.25");
	});

	it("12. verifies Load and crew assessment needed section and pending review state", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("C18MCrewAssessmentSection");
		expect(source).toContain("badgeReviewRequired");
		expect(source).toContain("assessmentDescription");
		expect(source).toContain("runtimeClarification");
	});

	it("13. verifies English C17-D navigates to C18-M on Continue CTA", () => {
		const c17dSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(c17dSource).toContain('pathname: "/moving-intake"');
		expect(c17dSource).toContain('currentLocale === "en"');
	});

	it("14. verifies Header Back button navigation preserves safe fallback", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("FlowHeaderBack");
		expect(source).toContain("handleBack");
		expect(source).toContain('pathname: "/moving-destination"');
	});

	it("15. verifies Android hardware back press returns safely to C17-D", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("BackHandler.addEventListener");
		expect(source).toContain("hardwareBackPress");
		expect(source).toContain("useHardwareBack(handleBack)");
	});

	it("16. verifies secondary CTA Return to service list navigates to C15", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("handleReturnToServiceList");
		expect(source).toContain('pathname: "/service-discovery"');
		expect(source).toContain('service: "moving"');
	});

	it("17. verifies primary CTA triggers upcoming C20-M notice banner", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("handleContinue");
		expect(source).toContain("noticeC20M");
	});

	it("18. verifies non-Moving service triggers informative notice without creating moving booking", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("isMoving");
		expect(source).toContain("noticeNonMoving");
	});

	it("19. verifies unsupported service ID handling", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).toContain("isUnsupported");
		expect(source).toContain("noticeUnsupportedService");
	});

	it("20. verifies no fake quote or production booking simulation", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).not.toContain("fakeQuote");
		expect(source).not.toContain("confirmBooking");
		expect(C18M_DEMO_CONSTANTS.footerNoticeDemo).toContain("DEMO ONLY");
	});

	it("21. verifies English Sarah Mitchell profile vs Spanish Bryan Lopez isolation", () => {
		const enProfile = getC10DemoProfile("en");
		const esProfile = getC10DemoProfile("es");
		expect(enProfile.name).toBe("Sarah Mitchell");
		expect(esProfile.name).toBe("Bryan Lopez");
		expect(enProfile.name).not.toBe(esProfile.name);
	});

	it("22. verifies English C17-D regression passes intact", () => {
		const c17dSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(c17dSource).toContain("MovingDestinationScreen");
		expect(c17dSource).toContain("c17d-pickup-section");
		expect(c17dSource).toContain("c17d-destination-section");
	});

	it("23. verifies Spanish C17-D keeps upcoming notice banner until Phase 03.18", () => {
		const c17dSource = fs.readFileSync(c17dRoutePath, "utf8");
		expect(c17dSource).toContain("La solicitud de mudanza (C18-M)");
	});

	it("24. verifies direct QA route registered in DemoScreenNavigator", () => {
		const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
		expect(navSource).toContain('id: "c18m-en"');
		expect(navSource).toContain('route: "/moving-intake"');
		expect(navSource).toContain('figmaNode: "Node 382:881"');
	});

	it("25. verifies no photographic hero image is injected per owner specifications", () => {
		const source = fs.readFileSync(c18mRoutePath, "utf8");
		expect(source).not.toContain("<Image");
		expect(source).not.toContain("stockPhoto");
		expect(source).not.toContain("truckHero");
	});
});
