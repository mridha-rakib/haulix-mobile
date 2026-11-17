import { colors } from "@haulix/design-tokens";
import Svg, { Circle, Line, Path, Rect, type SvgProps } from "react-native-svg";

export interface C16IconProps extends SvgProps {
  size?: number;
  color?: string;
}

/**
 * 1. Location Pin Icon (24 × 24)
 * Used in Requested pickup region header badge (lime) & Use this location CTA (dark).
 */
export function C16LocationPinIcon({ size = 24, color = colors.brand, ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 21C16 16.5 19 12.5 19 9A7 7 0 1 0 5 9C5 12.5 8 16.5 12 21Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={9} r={2.5} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

/**
 * 2. Home Line Icon (24 × 24)
 * Used in Street address row.
 */
export function C16HomeIcon({ size = 24, color = "#F6F8F6", ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 21V12H15V21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 3. Buildings Line Icon (24 × 24)
 * Used in City row.
 */
export function C16BuildingsIcon({ size = 24, color = "#F6F8F6", ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect
        x={3}
        y={6}
        width={8}
        height={15}
        rx={1}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={13}
        y={3}
        width={8}
        height={18}
        rx={1}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1={6} y1={10} x2={8} y2={10} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Line x1={6} y1={14} x2={8} y2={14} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Line x1={16} y1={7} x2={18} y2={7} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Line
        x1={16}
        y1={11}
        x2={18}
        y2={11}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Line
        x1={16}
        y1={15}
        x2={18}
        y2={15}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * 4. Folded Map Line Icon (24 × 24)
 * Used in State row.
 */
export function C16MapFoldIcon({ size = 24, color = "#F6F8F6", ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9 18L3 21V6L9 3M9 18L15 21M9 18V3M15 21L21 18V3L15 6M15 21V6M15 6L9 3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 5. Postal Envelope Icon (24 × 24)
 * Used in ZIP code row.
 */
export function C16PostalEnvelopeIcon({ size = 24, color = "#F6F8F6", ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect
        x={3}
        y={5}
        width={18}
        height={14}
        rx={2}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 7L12 13L21 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 6. Shield Check Icon (24 × 24)
 * Used in Arizona request heading badge.
 */
export function C16ShieldCheckIcon({ size = 24, color = colors.brand, ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 3L4 6V11C4 16.5 7.5 21.5 12 22C16.5 21.5 20 16.5 20 11V6L12 3Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 11.5L11 13.5L15 9.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 7. Demo Check Icon (18 × 18)
 * Used in Completed in this demo status ribbon.
 */
export function C16DemoCheckIcon({ size = 18, color = colors.brand, ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 8. Swap Arrows Icon (24 × 24)
 * Used in Choose another location CTA.
 */
export function C16SwapArrowsIcon({ size = 24, color = colors.brand, ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M7 8H19M19 8L15 4M19 8L15 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 16H5M5 16L9 12M5 16L9 20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 9. Crosshair / Target Icon (24 × 24)
 * Used in See outside-zone response CTA.
 */
export function C16CrosshairIcon({ size = 24, color = colors.brand, ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={7} stroke={color} strokeWidth={2} />
      <Line x1={12} y1={2} x2={12} y2={6} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={12} y1={18} x2={12} y2={22} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={2} y1={12} x2={6} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1={18} y1={12} x2={22} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={12} r={1.5} fill={color} />
    </Svg>
  );
}

/**
 * 10. Info Circle Icon (24 × 24)
 * Used in Location permission help CTA.
 */
export function C16InfoCircleIcon({ size = 24, color = colors.brand, ...props }: C16IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
      <Line x1={12} y1={11} x2={12} y2={17} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={8} r={1.2} fill={color} />
    </Svg>
  );
}
