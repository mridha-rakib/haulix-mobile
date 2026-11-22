/**
 * HAULIX Design Tokens — Typography
 *
 * Uses Inter typeface (via @expo-google-fonts/inter or expo-font).
 * Scale mirrors Figma type hierarchy.
 *
 * Source: Figma file Q946h4YBGgyLsjnPtdyQNe
 */

export const fontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
} as const;

/** Font sizes — px values mirroring Figma */
export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  "2xl": 28,
  "3xl": 34,
  "4xl": 40,
} as const;

/** Line heights — Figma-aligned */
export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
} as const;

/** Letter spacing */
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

export type FontFamilyKey = keyof typeof fontFamily;
export type FontSizeKey = keyof typeof fontSize;
