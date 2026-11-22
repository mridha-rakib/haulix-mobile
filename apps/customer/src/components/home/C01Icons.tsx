import { colors } from "@haulix/design-tokens";
import type { StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

export interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * 1. search_31.svg (Figma 439:3540) — 31×31
 */
export function SearchIcon({ size = 20, color = "#080B0B", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 31 31" fill="none" style={style}>
      <Path
        d="M13.7778 21.5279C18.5336 21.5279 22.3889 17.6726 22.3889 12.9168C22.3889 8.16099 18.5336 4.30566 13.7778 4.30566C9.022 4.30566 5.16667 8.16099 5.16667 12.9168C5.16667 17.6726 9.022 21.5279 13.7778 21.5279Z"
        stroke={color}
        strokeWidth={2.06667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.6667 19.8057L27.5556 26.6946"
        stroke={color}
        strokeWidth={2.06667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 2. saved_home_36.svg (Figma 439:3632) — 36×36
 */
export function SavedHomeIcon({ size = 24, color = "#F6F8F6", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none" style={style}>
      <Path
        d="M5 16L18 5L31 16M9 15V31H27V15M15 31V21H22V31"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 3. header_location_pin_18x22.svg (Figma 558:298) — 18×22
 */
export function HeaderLocationPinIcon({
  width = 18,
  height = 22,
  pinColor = "#E9F5EB",
  dotColor = colors.brand,
  style,
}: {
  width?: number;
  height?: number;
  pinColor?: string;
  dotColor?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 22" fill="none" style={style}>
      <Path
        d="M9 1.7998C5 1.7998 2 4.7998 2 8.7998C2 14.3998 9 20.7998 9 20.7998C9 20.7998 16 14.3998 16 8.7998C16 4.7998 13 1.7998 9 1.7998Z"
        stroke={pinColor}
        strokeWidth={1.85}
        strokeLinejoin="round"
      />
      <Path
        d="M9 11.2998C10.3807 11.2998 11.5 10.1805 11.5 8.7998C11.5 7.41909 10.3807 6.2998 9 6.2998C7.61929 6.2998 6.5 7.41909 6.5 8.7998C6.5 10.1805 7.61929 11.2998 9 11.2998Z"
        stroke={dotColor}
        strokeWidth={1.75}
      />
    </Svg>
  );
}

/**
 * 4. header_location_chevron_16x14.svg (Figma 558:302) — 16×14
 */
export function HeaderLocationChevronIcon({ size = 14, color = "#DDECE3", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 14" fill="none" style={style}>
      <Path
        d="M2.79999 4.90039L7.99999 10.1004L13.2 4.90039"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 5. service_junk_46x34.svg (Figma 439:3549) — 46×34
 */
export function ServiceJunkIcon({
  width = 36,
  height = 27,
  color = colors.brand,
  style,
}: {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 46 34" fill="none" style={style}>
      <Path
        d="M10.2222 9.44466H35.7778M14.0556 9.44466L15.3333 31.1669H30.6667L31.9444 9.44466M19.1667 6.61133H28.1111M19.1667 13.2224V26.4447M26.8333 13.2224V26.4447"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 6. service_moving_32.svg (Figma 439:3557) — 32×32
 */
export function ServiceMovingIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <Path
        d="M20.4445 24.8887V8.88867H2.66669V24.8887H20.4445ZM20.4445 24.8887H30.2222V20.4442L25.7778 15.1109H20.4445V24.8887Z"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.88893 28.4447C10.3617 28.4447 11.5556 27.2508 11.5556 25.778C11.5556 24.3052 10.3617 23.1113 8.88893 23.1113C7.41617 23.1113 6.22226 24.3052 6.22226 25.778C6.22226 27.2508 7.41617 28.4447 8.88893 28.4447Z"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25.7778 28.4447C27.2506 28.4447 28.4445 27.2508 28.4445 25.778C28.4445 24.3052 27.2506 23.1113 25.7778 23.1113C24.3051 23.1113 23.1111 24.3052 23.1111 25.778C23.1111 27.2508 24.3051 28.4447 25.7778 28.4447Z"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 7. service_furniture_32.svg (Figma 439:3567) — 32×32
 */
export function ServiceFurnitureIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <Path
        d="M5.33331 16.8893V9.77821C5.33331 8.83522 5.70791 7.93085 6.37471 7.26405C7.04151 6.59726 7.94588 6.22266 8.88887 6.22266H24C24.943 6.22266 25.8473 6.59726 26.5141 7.26405C27.1809 7.93085 27.5555 8.83522 27.5555 9.77821V16.8893"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.33333 24.8889V28.4444M26.6667 24.8889V28.4444M4.44444 16H28.4444C29.1517 16 29.83 16.281 30.3301 16.781C30.8301 17.2811 31.1111 17.9594 31.1111 18.6667V24.8889H1.77777V18.6667C1.77777 17.9594 2.05872 17.2811 2.55882 16.781C3.05892 16.281 3.73719 16 4.44444 16Z"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 8. service_appliance_32.svg (Figma 439:3576) — 32×32
 */
export function ServiceApplianceIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <Path
        d="M24.8889 2.66699H8.00001C7.01817 2.66699 6.22223 3.46293 6.22223 4.44477V28.4448C6.22223 29.4266 7.01817 30.2225 8.00001 30.2225H24.8889C25.8707 30.2225 26.6667 29.4266 26.6667 28.4448V4.44477C26.6667 3.46293 25.8707 2.66699 24.8889 2.66699Z"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.22223 9.77832H26.6667"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.4445 25.778C19.39 25.778 21.7778 23.3902 21.7778 20.4447C21.7778 17.4991 19.39 15.1113 16.4445 15.1113C13.499 15.1113 11.1111 17.4991 11.1111 20.4447C11.1111 23.3902 13.499 25.778 16.4445 25.778Z"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 9. service_mattress_32.svg (Figma 439:3586) — 32×32
 */
export function ServiceMattressIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <Path
        d="M3.55556 13.333H28.4444M28.4444 13.333L24 5.33301H8L3.55556 13.333L6.22222 26.6663H25.7778L28.4444 13.333ZM6.22222 20.4441H25.7778M11.5556 8.88856H15.1111M18.6667 8.88856H22.2222"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 10. service_garage_32.svg (Figma 439:3594) — 32×32
 */
export function ServiceGarageIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <Path
        d="M1.77777 14.2225L16 2.66699L30.2222 14.2225M5.33333 12.4448V30.2225H26.6667V12.4448M9.77777 30.2225V18.667H22.2222V30.2225M10.6667 22.2225H21.3333M10.6667 25.7781H21.3333"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 11. service_store_32.svg (Figma 439:3602) — 32×32
 */
export function ServiceStoreIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <Path
        d="M2.66666 4.44434H7.1111L11.5555 23.9999H25.7778L29.3333 9.77767H8.88888M12.4444 28.4443H13.3333M25.7778 28.4443H26.6667"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 12. service_assembly_addon_32.svg (Figma 439:3610) — 32×32
 */
export function ServiceAssemblyAddonIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <Path
        d="M24 2.66699L16.8889 9.7781M4.44443 27.5559L12.4444 19.5559M27.5555 7.11144L22.2222 12.4448M7.1111 3.55588L28.4444 24.8892L24.8889 28.4448L3.55554 7.11144L7.1111 3.55588Z"
        stroke={color}
        strokeWidth={2.13333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Micro-chevron for Service Cards (Figma 439:3552) — 7×12
 */
export function ServiceCardChevronRight({
  width = 6,
  height = 10,
  color = "#35403B",
  style,
}: {
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 7 12" fill="none" style={style}>
      <Path
        d="M1 1L6 6L1 11"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
