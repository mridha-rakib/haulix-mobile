import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C09 Social Sign-in Return / Success (English & Spanish Preview)", () => {
	const routePath = path.resolve(
		__dirname,
		"../../app/(auth)/social-return.tsx",
	);

	it("verifies single auth route social-return.tsx exists in customer app", () => {
		expect(fs.existsSync(routePath)).toBe(true);

		const source = fs.readFileSync(routePath, "utf8");
		expect(source).toContain("export default function SocialReturnScreen");
	});

	it("verifies C09 English strings match authoritative Figma node 331:118", () => {
		expect(en.socialReturn.brandTagline).toBe("WE HAUL IT ALL.");
		expect(en.socialReturn.title).toBe("Account connected.");
		expect(en.socialReturn.subtitle).toBe(
			"The provider completed sign-in for this fictional HAULIX demo profile.",
		);
		expect(en.socialReturn.availability).toBe(
			"PHOENIX, ARIZONA  •  HAULIX CUSTOMER",
		);
		expect(en.socialReturn.providerStatus).toBe(
			"Google sign-in returned successfully",
		);
		expect(en.socialReturn.demoName).toBe("Sarah Mitchell");
		expect(en.socialReturn.demoEmail).toBe("sarah.mitchell@example.test");
		expect(en.socialReturn.explanation).toBe(
			"Your existing customer records are available after secure account matching.",
		);
		expect(en.socialReturn.primaryAction).toBe("Go to My Account");
		expect(en.socialReturn.secondaryAction).toBe("Sign in another way");
		expect(en.socialReturn.demoNotice).toBe(
			"DEMO ONLY • No real authentication or messaging",
		);
	});

	it("verifies C09 Spanish strings match authoritative Figma node 347:283", () => {
		expect(es.socialReturn.brandTagline).toBe("LO RECOGEMOS TODO.");
		expect(es.socialReturn.title).toBe("Cuenta vinculada.");
		expect(es.socialReturn.subtitle).toBe(
			"El proveedor confirmó el acceso a este perfil de demostración.",
		);
		expect(es.socialReturn.availability).toBe(
			"PHOENIX, ARIZONA • CLIENTE HAULIX",
		);
		expect(es.socialReturn.providerStatus).toBe("Acceso con Google correcto");
		expect(es.socialReturn.demoName).toBe("Bryan Lopez");
		expect(es.socialReturn.demoEmail).toBe("bryan.lopez@example.test");
		expect(es.socialReturn.explanation).toBe(
			"Tus reservas estarán disponibles después de validar tu identidad.",
		);
		expect(es.socialReturn.primaryAction).toBe("Ir a mi cuenta");
		expect(es.socialReturn.secondaryAction).toBe("Elegir otro acceso");
		expect(es.socialReturn.demoNotice).toBe(
			"SOLO DEMOSTRACIÓN · Sin acceso ni mensajes reales",
		);
	});

	it("verifies design tokens used across C09 match authoritative Figma palette", () => {
		expect(colors.brand).toBe("#BAFF42");
		expect(colors.background).toBe("#080B0B");
		expect(colors.surface).toBe("#151A19");
		expect(colors.elevated).toBe("#222827");
		expect(colors.primaryText).toBe("#F6F8F6");
		expect(colors.secondaryText).toBe("#ADB7B1");
	});

	it("verifies C09 contains no __DEV__ or release blocks under Frontend-Only QA policy", () => {
		const source = fs.readFileSync(routePath, "utf8");
		// Under revised owner policy, release APK testers can open the designed screen directly
		expect(source).not.toContain("if (!__DEV__)");
		expect(source).not.toContain("c09-production-guard");
	});

	it("verifies demo fixtures (Sarah Mitchell & Bryan Lopez) are never exported or written to persistent auth state", () => {
		const source = fs.readFileSync(routePath, "utf8");
		// Ensures no AsyncStorage, secure storage, or global auth dispatch
		expect(source).not.toContain("AsyncStorage");
		expect(source).not.toContain("SecureStore");
		expect(source).not.toContain("setToken");
		expect(source).not.toContain("login(");
	});

	it("verifies primary CTA (Go to My Account) navigates to C10 account overview for frontend UI testing", () => {
		const source = fs.readFileSync(routePath, "utf8");
		expect(source).toContain("handleGoToMyAccount");
		expect(source).toContain('router.push("/(app)/account")');
	});

	it("verifies secondary CTA (Sign in another way / Elegir otro acceso) navigates back to C06 Sign-in", () => {
		const source = fs.readFileSync(routePath, "utf8");
		expect(source).toContain("handleSignInAnotherWay");
		expect(source).toContain("/(auth)/sign-in");
	});

	it("verifies C06 social buttons (Google/Apple) still display honest pending notices without fake success", () => {
		const signInSource = fs.readFileSync(
			path.resolve(__dirname, "../../app/(auth)/sign-in.tsx"),
			"utf8",
		);
		expect(signInSource).toContain("handleAppleSignIn");
		expect(signInSource).toContain("handleGoogleSignIn");
		expect(signInSource).toContain("signIn.appleNotice");
		expect(signInSource).toContain("signIn.googleNotice");
		// Social buttons on C06 do not redirect to social-return
		expect(signInSource).not.toContain("/(auth)/social-return");
	});

	it("verifies auth route group layout does not contain bottom navigation", () => {
		const authLayout = fs.readFileSync(
			path.resolve(__dirname, "../../app/(auth)/_layout.tsx"),
			"utf8",
		);
		expect(authLayout).not.toContain("BottomTabs");
		expect(authLayout).not.toContain("createBottomTabNavigator");
		expect(authLayout).toContain("Stack");
		expect(authLayout).toContain("headerShown: false");
	});

	it("verifies single route architecture is preserved with no separate Spanish screen file or route fork", () => {
		expect(
			fs.existsSync(
				path.resolve(__dirname, "../../app/(auth)/social-return-es.tsx"),
			),
		).toBe(false);
		expect(
			fs.existsSync(
				path.resolve(__dirname, "../../app/(auth)/es/social-return.tsx"),
			),
		).toBe(false);
	});

	it("verifies customer row adheres strictly to Figma nodes 331:136 and 347:283 with no fabricated avatar badge", () => {
		const source = fs.readFileSync(routePath, "utf8");
		// Extra avatar circle must NOT be present (no SM, no BL)
		expect(source).not.toContain("customerAvatar");
		expect(source).not.toContain("customerAvatarText");
		expect(source).not.toContain(">SM<");
		expect(source).not.toContain(">BL<");
		// Customer info must directly render name and email
		expect(source).toContain("styles.customerRow");
		expect(source).toContain("styles.customerInfo");
		expect(source).toContain("styles.customerName");
		expect(source).toContain("styles.customerEmail");
	});
});
