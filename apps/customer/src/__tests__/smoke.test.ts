/**
 * Customer app smoke test — verifies key shared package imports resolve.
 */

describe("Customer app — shared package imports", () => {
	it("resolves @haulix/design-tokens", async () => {
		const tokens = await import("@haulix/design-tokens");
		expect(tokens.colors.brand).toBe("#BAFF42");
		expect(tokens.colors.background).toBe("#080B0B");
		expect(tokens.colors.surface).toBe("#151A19");
	});

	it("resolves @haulix/logger and creates a logger", async () => {
		const { createLogger } = await import("@haulix/logger");
		const logger = createLogger("CUSTOMER");
		expect(typeof logger.info).toBe("function");
		expect(typeof logger.error).toBe("function");
		expect(typeof logger.debug).toBe("function");
		expect(typeof logger.warn).toBe("function");
	});

	it("resolves @haulix/utils", async () => {
		const { clamp, capitalize } = await import("@haulix/utils");
		expect(clamp(5, 0, 10)).toBe(5);
		expect(capitalize("hello")).toBe("Hello");
	});

	it("design tokens spacing has base values", async () => {
		const { spacing } = await import("@haulix/design-tokens");
		expect(spacing[4]).toBe(16);
		expect(spacing[8]).toBe(32);
	});
});
