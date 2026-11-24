/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Test Suite: W08 Batch 1 — Completion Proof, Customer Confirmation & Completion Dispute
 *
 * Verifies:
 * 1. Screen components exist and export default functional components with BackHandler and HaulixSafeArea
 * 2. Shared completion components exist and export W08Header, W08StatusBadge, W08BookingCard, W08DecisionCard, W08PrototypeDisclaimer
 * 3. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 4. 12 bilingual entries registered in DemoScreenNavigator with exact Figma node IDs
 * 5. Exact symmetry in i18n dictionaries for all 6 W08 Batch 1 namespaces across en.ts and es.ts
 * 6. Deterministic transitions between PROOF, PROOF_MISSING, PROOF_DENIED, CONFIRM, ISSUE, and DISPUTE_HOLD
 * 7. Active service completion bridge routes directly to /completion-proof
 * 8. Restricted evidence protection: PROOF_DENIED never exposes unmasked cargo photos
 * 9. Localized common.inventoryScope usage in W08 booking cards
 * 10. Authoritative reconciliation: W08 6/28 canonical states (12/56 bilingual variants) complete
 */

import * as fs from "node:fs";
import * as path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

const customerAppDir = path.resolve(__dirname, "../../app/(app)");
const componentsDir = path.resolve(__dirname, "../../src/components");

describe("W08 Phase 03.61 — Completion Proof & Customer Confirmation", () => {
	const batch1Screens = [
		{
			file: "completion-proof.tsx",
			route: "/completion-proof",
			state: "PROOF",
			enNode: "907:6811",
			esNode: "907:9711",
			enId: "w08-proof-en",
			esId: "w08-proof-es",
			i18nKey: "w08Proof",
		},
		{
			file: "completion-proof-missing.tsx",
			route: "/completion-proof-missing",
			state: "PROOF_MISSING",
			enNode: "907:6913",
			esNode: "907:9813",
			enId: "w08-proof-missing-en",
			esId: "w08-proof-missing-es",
			i18nKey: "w08ProofMissing",
		},
		{
			file: "completion-proof-denied.tsx",
			route: "/completion-proof-denied",
			state: "PROOF_DENIED",
			enNode: "907:7015",
			esNode: "907:9915",
			enId: "w08-proof-denied-en",
			esId: "w08-proof-denied-es",
			i18nKey: "w08ProofDenied",
		},
		{
			file: "completion-confirm.tsx",
			route: "/completion-confirm",
			state: "CONFIRM",
			enNode: "907:7117",
			esNode: "907:10017",
			enId: "w08-confirm-en",
			esId: "w08-confirm-es",
			i18nKey: "w08Confirm",
		},
		{
			file: "completion-issue.tsx",
			route: "/completion-issue",
			state: "ISSUE",
			enNode: "907:7215",
			esNode: "907:10115",
			enId: "w08-issue-en",
			esId: "w08-issue-es",
			i18nKey: "w08Issue",
		},
		{
			file: "completion-dispute-hold.tsx",
			route: "/completion-dispute-hold",
			state: "DISPUTE_HOLD",
			enNode: "907:7316",
			esNode: "907:10216",
			enId: "w08-dispute-hold-en",
			esId: "w08-dispute-hold-es",
			i18nKey: "w08DisputeHold",
		},
	];

	test("verifies all 6 canonical W08 Batch 1 screen files exist and export default functional components with BackHandler", () => {
		for (const screen of batch1Screens) {
			const filePath = path.join(customerAppDir, screen.file);
			expect(fs.existsSync(filePath)).toBe(true);

			const content = fs.readFileSync(filePath, "utf-8");
			expect(content).toContain("export default function");
			expect(content).toContain("BackHandler.addEventListener");
			expect(content).toContain("hardwareBackPress");
			expect(content).toContain("HaulixSafeArea");
			expect(content).toContain("useTranslation");
		}
	});

	test("verifies shared W08CompletionCard component exists and exports shared primitives", () => {
		const sharedPath = path.join(
			componentsDir,
			"completion/W08CompletionCard.tsx",
		);
		expect(fs.existsSync(sharedPath)).toBe(true);

		const content = fs.readFileSync(sharedPath, "utf-8");
		expect(content).toContain("export function W08Header");
		expect(content).toContain("export function W08StatusBadge");
		expect(content).toContain("export function W08BookingCard");
		expect(content).toContain("export function W08DecisionCard");
		expect(content).toContain("export function W08PrototypeDisclaimer");
		expect(content).toContain("common.inventoryScope");
	});

	test("verifies zero route guards and no artificial auth/payment gating across all 6 new screens", () => {
		for (const screen of batch1Screens) {
			const filePath = path.join(customerAppDir, screen.file);
			const source = fs.readFileSync(filePath, "utf-8");
			expect(source).not.toContain("useAuthGuard");
			expect(source).not.toContain("requireAuth");
			expect(source).not.toContain("isAuthenticated");
			expect(source).not.toContain("requirePayment");
			expect(source).not.toContain("requireDriver");
		}
	});

	test("verifies DemoScreenNavigator registers all 12 bilingual entries with exact Figma node IDs", () => {
		const navPath = path.resolve(
			__dirname,
			"../../src/components/demo/DemoScreenNavigator.tsx",
		);
		const navSource = fs.readFileSync(navPath, "utf-8");

		for (const screen of batch1Screens) {
			expect(navSource).toContain(`id: "${screen.enId}"`);
			expect(navSource).toContain(`id: "${screen.esId}"`);
			expect(navSource).toContain(screen.enNode);
			expect(navSource).toContain(screen.esNode);
			expect(navSource).toContain(screen.route);
		}
	});

	test("verifies exact symmetry across all 6 W08 Batch 1 i18n namespaces", () => {
		for (const screen of batch1Screens) {
			const enDict = (en as Record<string, Record<string, string>>)[
				screen.i18nKey
			];
			const esDict = (es as Record<string, Record<string, string>>)[
				screen.i18nKey
			];

			expect(enDict).toBeDefined();
			expect(esDict).toBeDefined();

			const enKeys = Object.keys(enDict).sort();
			const esKeys = Object.keys(esDict).sort();

			expect(enKeys).toEqual(esKeys);
			expect(enKeys.length).toBeGreaterThanOrEqual(15);

			for (const k of enKeys) {
				expect(enDict[k]).toBeTruthy();
				expect(esDict[k]).toBeTruthy();
			}
		}
	});

	test("verifies deterministic navigation transitions across W08 completion proof flow", () => {
		// PROOF -> CONFIRM, PROOF_MISSING, PROOF_DENIED
		const proofSrc = fs.readFileSync(
			path.join(customerAppDir, "completion-proof.tsx"),
			"utf-8",
		);
		expect(proofSrc).toContain('pathname: "/completion-confirm"');
		expect(proofSrc).toContain('pathname: "/completion-proof-missing"');
		expect(proofSrc).toContain('pathname: "/completion-proof-denied"');
		expect(proofSrc).toContain('pathname: "/my-jobs"');

		// CONFIRM -> ISSUE, MY_JOBS
		const confirmSrc = fs.readFileSync(
			path.join(customerAppDir, "completion-confirm.tsx"),
			"utf-8",
		);
		expect(confirmSrc).toContain('pathname: "/completion-issue"');
		expect(confirmSrc).toContain('pathname: "/completion-proof"');
		expect(confirmSrc).toContain('pathname: "/my-jobs"');

		// ISSUE -> DISPUTE_HOLD, PROOF
		const issueSrc = fs.readFileSync(
			path.join(customerAppDir, "completion-issue.tsx"),
			"utf-8",
		);
		expect(issueSrc).toContain('pathname: "/completion-dispute-hold"');
		expect(issueSrc).toContain('pathname: "/completion-proof"');
		expect(issueSrc).toContain('pathname: "/completion-confirm"');

		// PROOF_MISSING -> PROOF, ISSUE
		const missingSrc = fs.readFileSync(
			path.join(customerAppDir, "completion-proof-missing.tsx"),
			"utf-8",
		);
		expect(missingSrc).toContain('pathname: "/completion-proof"');
		expect(missingSrc).toContain('pathname: "/completion-issue"');
		expect(missingSrc).toContain('pathname: "/completion-proof-denied"');

		// PROOF_DENIED -> MY_JOBS, JOB_SUPPORT
		const deniedSrc = fs.readFileSync(
			path.join(customerAppDir, "completion-proof-denied.tsx"),
			"utf-8",
		);
		expect(deniedSrc).toContain('pathname: "/my-jobs"');
		expect(deniedSrc).toContain('pathname: "/job-support"');

		// DISPUTE_HOLD -> ISSUE, MY_JOBS
		const holdSrc = fs.readFileSync(
			path.join(customerAppDir, "completion-dispute-hold.tsx"),
			"utf-8",
		);
		expect(holdSrc).toContain('pathname: "/completion-issue"');
		expect(holdSrc).toContain('pathname: "/my-jobs"');
	});

	test("verifies active-service-completion-bridge routes directly to /completion-proof", () => {
		const bridgeSrc = fs.readFileSync(
			path.join(customerAppDir, "active-service-completion-bridge.tsx"),
			"utf-8",
		);
		expect(bridgeSrc).toContain('pathname: "/completion-proof"');
	});

	test("verifies restricted evidence protection: PROOF_DENIED does not display unmasked cargo photos", () => {
		const deniedSrc = fs.readFileSync(
			path.join(customerAppDir, "completion-proof-denied.tsx"),
			"utf-8",
		);
		// Check that denied screen has masking / lock icon and no photo tile loop
		expect(deniedSrc).toContain("C32LockIcon");
		expect(deniedSrc).toContain("restrictedNoticeBox");
		expect(deniedSrc).not.toContain("photoTileImage");
	});

	test("authoritative reconciliation: DemoScreenNavigator contains 12 W08 bilingual entries (6 canonical states)", () => {
		const navPath = path.resolve(
			__dirname,
			"../../src/components/demo/DemoScreenNavigator.tsx",
		);
		const navSource = fs.readFileSync(navPath, "utf-8");

		const w08Entries = navSource.match(/id:\s*"w08-[a-z0-9-]+"/g) || [];
		expect(w08Entries.length).toBe(12);
	});
});
