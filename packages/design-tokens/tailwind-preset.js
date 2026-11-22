/**
 * HAULIX Design Tokens — Tailwind Preset
 *
 * Source: Figma file Q946h4YBGgyLsjnPtdyQNe
 * Synchronized with @haulix/design-tokens TypeScript definitions.
 */

module.exports = {
	theme: {
		extend: {
			colors: {
				brand: "#BAFF42",
				background: "#080B0B",
				surface: "#151A19",
				elevated: "#222827",
				"primary-text": "#F6F8F6",
				"secondary-text": "#ADB7B1",
				primaryText: "#F6F8F6",
				secondaryText: "#ADB7B1",
				success: "#22C55E",
				warning: "#F59E0B",
				error: "#EF4444",
				info: "#3B82F6",
			},
			fontFamily: {
				sans: ["Inter_400Regular", "sans-serif"],
				regular: ["Inter_400Regular", "sans-serif"],
				medium: ["Inter_500Medium", "sans-serif"],
				semibold: ["Inter_600SemiBold", "sans-serif"],
				bold: ["Inter_700Bold", "sans-serif"],
			},
			fontSize: {
				xs: ["11px", { lineHeight: "1.5" }],
				sm: ["13px", { lineHeight: "1.5" }],
				base: ["15px", { lineHeight: "1.5" }],
				md: ["17px", { lineHeight: "1.5" }],
				lg: ["20px", { lineHeight: "1.2" }],
				xl: ["24px", { lineHeight: "1.2" }],
				"2xl": ["28px", { lineHeight: "1.2" }],
				"3xl": ["34px", { lineHeight: "1.2" }],
				"4xl": ["40px", { lineHeight: "1.2" }],
			},
			spacing: {
				0: "0px",
				0.5: "2px",
				1: "4px",
				1.5: "6px",
				2: "8px",
				2.5: "10px",
				3: "12px",
				4: "16px",
				5: "20px",
				6: "24px",
				7: "28px",
				8: "32px",
				10: "40px",
				12: "48px",
				14: "56px",
				16: "64px",
				20: "80px",
				24: "96px",
			},
			borderRadius: {
				none: "0px",
				xs: "4px",
				sm: "8px",
				md: "12px",
				lg: "16px",
				xl: "20px",
				"2xl": "24px",
				"3xl": "32px",
				full: "9999px",
			},
		},
	},
};
