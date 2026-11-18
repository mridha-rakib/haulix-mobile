import { colors } from "@haulix/design-tokens";
import Svg, { Path, Rect, type SvgProps } from "react-native-svg";

export interface C18BatchIconProps extends SvgProps {
  size?: number;
  color?: string;
}

/**
 * 1. Customer Context Checkmark (17 × 17)
 * Figma Node 382:818 / 382:896
 */
export function C18CheckIcon({ size = 17, color = colors.brand, ...props }: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M2.83333 9.20833L6.375 12.75L14.1667 4.95833"
        stroke={color}
        strokeWidth={1.275}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 2. C18 Junk Removal Truck / Container Icon (18 × 18)
 * Represents heavy clearing, non-hazardous hauling
 */
export function C18JunkIcon({ size = 18, color = colors.brand, ...props }: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 11v6M14 11v6"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 3. C18 Furniture / Armchair Icon (18 × 18)
 * Represents bulky item, furniture moving & handling
 */
export function C18FurnitureIcon({ size = 18, color = colors.brand, ...props }: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M19 9V6a2 2 0 00-2-2H7a2 2 0 00-2 2v3"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 11a2 2 0 012-2h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7z"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 18v2M18 18v2"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 4. C18 Appliance / Refrigerator Icon (18 × 18)
 */
export function C18ApplianceIcon({
  size = 18,
  color = colors.secondaryText,
  ...props
}: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth={1.75} />
      <Path d="M5 10h14M9 5v2M9 13v3" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * 5. C18 Mattress Icon (18 × 18)
 */
export function C18MattressIcon({
  size = 18,
  color = colors.secondaryText,
  ...props
}: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 7h18a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z"
        stroke={color}
        strokeWidth={1.75}
      />
      <Path d="M7 11h10M7 14h10" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * 6. C18 Assembly / Tools Icon (18 × 18)
 */
export function C18ToolsIcon({
  size = 18,
  color = colors.secondaryText,
  ...props
}: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 7. C18 Garage Cleanout Icon (18 × 18)
 */
export function C18GarageIcon({ size = 18, color = colors.brand, ...props }: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M7 13h10M7 16h10M7 19h10" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * 8. C18 Retail Storefront Icon (18 × 18)
 */
export function C18RetailIcon({ size = 18, color = colors.brand, ...props }: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 9l2-5h14l2 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 9h18M9 22V12h6v10"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 9. Hazard Shield / Review Icon (18 × 18)
 */
export function C18HazardShieldIcon({ size = 18, color = "#FFC85A", ...props }: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8v4M12 16h.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 10. Chevron Right Icon (14 × 14)
 */
export function C18ChevronRightIcon({
  size = 14,
  color = colors.secondaryText,
  ...props
}: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 11. Red Alert Triangle Icon for C18-R-E (18 × 18)
 * Figma Node 382:1234 / 980:9279
 */
export function C18AlertTriangleIcon({
  size = 18,
  color = colors.error,
  ...props
}: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 9v4M12 17h.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 12. Alert Circle Icon for C19-V (18 × 18)
 * Figma Node 382:1469 / 980:9578
 */
export function C18AlertCircleIcon({
  size = 18,
  color = colors.error,
  ...props
}: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 8v4M12 16h.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 13. Pin / Location Icon for C20 (21 × 21)
 * Figma Node 382:1741 / 980:9930
 */
export function C20PinIcon({
  size = 21,
  color = colors.secondaryText,
  ...props
}: C18BatchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M10.5 19.25C10.5 19.25 17.5 12.25 17.5 7.875C17.5 6.01848 16.7625 4.23801 15.4497 2.92525C14.137 1.6125 12.3565 0.875 10.5 0.875C8.64348 0.875 6.86301 1.6125 5.55025 2.92525C4.2375 4.23801 3.5 6.01848 3.5 7.875C3.5 12.25 10.5 19.25 10.5 19.25Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.25 7.875C12.25 8.8415 11.4665 9.625 10.5 9.625C9.5335 9.625 8.75 8.8415 8.75 7.875C8.75 6.9085 9.5335 6.125 10.5 6.125C11.4665 6.125 12.25 6.9085 12.25 7.875Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
