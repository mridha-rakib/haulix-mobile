import { colors } from "@haulix/design-tokens";
import preset from "@haulix/design-tokens/tailwind-preset";
import {
	HaulixButton,
	HaulixSafeArea,
	HaulixText,
	HaulixView,
} from "@haulix/ui";
import { resolveButtonState } from "@haulix/utils";

describe("Customer App — Styling & UI Primitives Foundation", () => {
	it("resolves all shared UI primitives from @haulix/ui", () => {
		expect(HaulixButton).toBeDefined();
		expect(HaulixText).toBeDefined();
		expect(HaulixView).toBeDefined();
		expect(HaulixSafeArea).toBeDefined();
	});

	it("verifies Tailwind preset extends the exact HAULIX brand tokens", () => {
		expect(preset.theme.extend.colors.brand).toBe(colors.brand);
		expect(preset.theme.extend.colors.background).toBe(colors.background);
		expect(preset.theme.extend.colors.surface).toBe(colors.surface);
		expect(preset.theme.extend.colors.elevated).toBe(colors.elevated);
	});

	it("resolves button interaction states deterministically", () => {
		expect(resolveButtonState(false, false)).toBe("idle");
		expect(resolveButtonState(true, false)).toBe("loading");
		expect(resolveButtonState(false, true)).toBe("disabled");
		expect(resolveButtonState(true, true)).toBe("loading");
	});
});
