/**
 * HAULIX Design Tokens — Spacing & Radius
 *
 * Source: Figma file Q946h4YBGgyLsjnPtdyQNe
 */

/** Spacing scale — base 4px grid */
export const spacing = {
	0: 0,
	0.5: 2,
	1: 4,
	1.5: 6,
	2: 8,
	2.5: 10,
	3: 12,
	4: 16,
	5: 20,
	6: 24,
	7: 28,
	8: 32,
	10: 40,
	12: 48,
	14: 56,
	16: 64,
	20: 80,
	24: 96,
} as const;

/** Border radius scale */
export const radius = {
	none: 0,
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	"2xl": 24,
	"3xl": 32,
	full: 9999,
} as const;

export type SpacingKey = keyof typeof spacing;
export type RadiusKey = keyof typeof radius;
