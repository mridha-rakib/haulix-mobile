/**
 * HAULIX Design Tokens — Colors
 *
 * Source: Figma file Q946h4YBGgyLsjnPtdyQNe
 * These are the authoritative Figma-defined token values.
 * Do NOT modify without updating the Figma source first.
 *
 * Token naming convention mirrors Figma layer names where applicable.
 */

export const colors = {
	/** brand/neon-lime — Primary brand accent */
	brand: "#BAFF42",

	/** bg/base — Deepest background */
	background: "#080B0B",

	/** bg/surface — Card and modal surface */
	surface: "#151A19",

	/** bg/elevated — Elevated UI elements */
	elevated: "#222827",

	/** text/primary — Primary content text */
	primaryText: "#F6F8F6",

	/** text/secondary — Secondary / muted text */
	secondaryText: "#ADB7B1",

	// Status / Semantic — pending Figma confirmation
	success: "#22C55E",
	warning: "#F59E0B",
	error: "#EF4444",
	info: "#3B82F6",

	// Transparent utility
	transparent: "transparent",
} as const;

export type ColorKey = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorKey];
