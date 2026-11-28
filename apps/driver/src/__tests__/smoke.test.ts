/**
 * Driver app smoke test — verifies key shared package imports resolve.
 */

describe("Driver app — shared package imports", () => {
	it("resolves @haulix/design-tokens", async () => {
		const tokens = await import("@haulix/design-tokens");
		expect(tokens.colors.brand).toBe("#BAFF42");
		expect(tokens.colors.background).toBe("#080B0B");
	});

	it("resolves @haulix/logger with DRIVER context", async () => {
		const { createLogger } = await import("@haulix/logger");
		const logger = createLogger("DRIVER");
		expect(typeof logger.info).toBe("function");
	});

	it("driver logger prefix is correct", async () => {
		const spy = jest.spyOn(console, "info").mockImplementation(() => {});
		(global as any).__DEV__ = true;
		const { createLogger } = await import("@haulix/logger");
		const logger = createLogger("DRIVER");
		logger.info("test message");
		expect(spy.mock.calls[0]?.[0]).toContain("[DRIVER][INFO]");
		spy.mockRestore();
	});

	it("resolves @haulix/utils", async () => {
		const { assertDefined } = await import("@haulix/utils");
		expect(assertDefined(42, "num")).toBe(42);
	});
});
