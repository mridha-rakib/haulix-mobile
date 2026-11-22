import preset from "../tailwind-preset";
import { colors } from "./colors";
import { radius, spacing } from "./spacing";
import { fontFamily, fontSize } from "./typography";

describe("HAULIX Design Tokens — Tailwind Preset", () => {
	it("synchronizes brand colors accurately", () => {
		expect(preset.theme.extend.colors.brand).toBe(colors.brand);
		expect(preset.theme.extend.colors.background).toBe(colors.background);
		expect(preset.theme.extend.colors.surface).toBe(colors.surface);
		expect(preset.theme.extend.colors.elevated).toBe(colors.elevated);
		expect(preset.theme.extend.colors.primaryText).toBe(colors.primaryText);
		expect(preset.theme.extend.colors.secondaryText).toBe(colors.secondaryText);
	});

	it("synchronizes font families with Inter conventions", () => {
		expect(preset.theme.extend.fontFamily.sans[0]).toBe(fontFamily.regular);
		expect(preset.theme.extend.fontFamily.medium[0]).toBe(fontFamily.medium);
		expect(preset.theme.extend.fontFamily.semibold[0]).toBe(
			fontFamily.semiBold,
		);
		expect(preset.theme.extend.fontFamily.bold[0]).toBe(fontFamily.bold);
		expect(preset.theme.extend.fontSize.base[0]).toBe(`${fontSize.base}px`);
	});

	it("synchronizes spacing scale with base grid", () => {
		expect(preset.theme.extend.spacing[4]).toBe(`${spacing[4]}px`);
		expect(preset.theme.extend.spacing[8]).toBe(`${spacing[8]}px`);
	});

	it("synchronizes border radius values", () => {
		expect(preset.theme.extend.borderRadius.lg).toBe(`${radius.lg}px`);
		expect(preset.theme.extend.borderRadius.full).toBe(`${radius.full}px`);
	});
});
