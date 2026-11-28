import { type StyleProp, View, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, Line, Path, Polygon, Polyline, Rect } from "react-native-svg";

interface IconProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Truck icon for Primary Driver role (Figma 1193:995)
 */
export function DriverTruckIcon({ size = 28, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="1"
          y="3"
          width="15"
          height="13"
          rx="2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 8H20L23 11V16H16V8Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth="1.8" />
        <Circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth="1.8" />
      </Svg>
    </View>
  );
}

/**
 * Users icon for Helper / Crew role (Figma 1193:1013)
 */
export function HelperUsersIcon({ size = 28, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle
          cx="9"
          cy="7"
          r="4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Shield icon for Security & Separate Decision notes (Figma 1085:110, 1193:1025)
 */
export function ShieldIcon({ size = 24, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9 12L11 14L15 10"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Clock timer icon for OTP expiration (Figma 1085:146)
 */
export function ClockTimerIcon({ size = 24, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
        <Polyline
          points="12 6 12 12 16 14"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Back Chevron Icon
 */
export function ChevronLeftIcon({ size = 24, color = "#F6F8F6", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M15 18L9 12L15 6"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Eye visibility icon
 */
export function EyeIcon({ size = 20, color = "#8E9E99", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle
          cx="12"
          cy="12"
          r="3"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Eye-off hidden icon
 */
export function EyeOffIcon({ size = 20, color = "#8E9E99", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12A24.8 24.8 0 0 1 5.06 6.06L17.94 17.94Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.9 4.24A9.12 9.12 0 0 1 12 4C19 4 23 12 23 12A24.6 24.6 0 0 1 19.78 15.78"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="1"
          y1="1"
          x2="23"
          y2="23"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Checkmark icon
 */
export function CheckmarkIcon({ size = 16, color = "#080B0B", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Polyline
          points="20 6 9 17 4 12"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

// Canonical Aliases
export const TruckIcon = DriverTruckIcon;
export const UsersIcon = HelperUsersIcon;
export const ClockIcon = ClockTimerIcon;
export const ShieldCheckIcon = ShieldIcon;

export function LifeBuoyIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
        <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" />
        <Path
          d="M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

/**
 * DW01 Welcome Card 1 Icon: Delivery Truck (Figma 1085:3)
 */
export function WelcomeTruckIcon({ size = 22, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="2"
          y="5"
          width="13"
          height="10"
          rx="1.5"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15 8H18.5L21.5 11.5V15H15V8Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="6" cy="18" r="2" stroke={color} strokeWidth="1.8" />
        <Circle cx="18" cy="18" r="2" stroke={color} strokeWidth="1.8" />
      </Svg>
    </View>
  );
}

/**
 * DW01 Welcome Card 2 Icon: Track Earnings Coins (Figma 1085:3)
 */
export function WelcomeCoinsIcon({ size = 22, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Left coin */}
        <Ellipse cx="8.5" cy="7.5" rx="5" ry="2.2" stroke={color} strokeWidth="1.8" />
        <Path
          d="M3.5 7.5V12C3.5 13.2 5.7 14.2 8.5 14.2C11.3 14.2 13.5 13.2 13.5 12V7.5"
          stroke={color}
          strokeWidth="1.8"
        />
        {/* Right overlapping coin */}
        <Ellipse cx="14.5" cy="10.5" rx="5" ry="2.2" stroke={color} strokeWidth="1.8" />
        <Path
          d="M9.5 10.5V15C9.5 16.2 11.7 17.2 14.5 17.2C17.3 17.2 19.5 16.2 19.5 15V10.5"
          stroke={color}
          strokeWidth="1.8"
        />
      </Svg>
    </View>
  );
}

/**
 * DW01 Welcome Card 3 Icon: Get Paid Fast Calendar (Figma 1085:3)
 */
export function WelcomeCalendarIcon({ size = 22, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke={color} strokeWidth="1.8" />
        <Line
          x1="8"
          y1="2.5"
          x2="8"
          y2="5.5"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Line
          x1="16"
          y1="2.5"
          x2="16"
          y2="5.5"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Line x1="3" y1="9" x2="21" y2="9" stroke={color} strokeWidth="1.5" />
        <Polyline
          points="8 14 11 17 16 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Mail envelope icon
 */
export function MailIcon({ size = 20, color = "#8E9E99", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="2"
          y="4"
          width="20"
          height="16"
          rx="2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22 6L12 13L2 6"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/**
 * Phone icon
 */
export function PhoneIcon({ size = 20, color = "#8E9E99", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M22 16.92V19.92C22 20.48 21.54 20.93 20.97 20.92C10.43 20.24 3.76 13.57 3.08 3.03C3.07 2.46 3.52 2 4.08 2H7.08C7.6 2 8.04 2.38 8.1 2.89L8.72 6.78C8.78 7.21 8.57 7.63 8.21 7.87L6.46 9.07C7.61 11.53 9.47 13.39 11.93 14.54L13.13 12.79C13.37 12.43 13.79 12.22 14.22 12.28L18.11 12.9C18.62 12.96 19 13.4 19 13.92V16.92H22Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

// ─── Authoritative 5-Tab Navigation Icons (Figma 1084:26, 1314:320) ─────────────────

export function TabHomeIcon({ active = false, size = 24 }: { active?: boolean; size?: number }) {
  const color = active ? "#BAFF42" : "#8E9E99";
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 21.5V12.5H15V21.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabJobsIcon({ active = false, size = 24 }: { active?: boolean; size?: number }) {
  const color = active ? "#BAFF42" : "#8E9E99";
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="2"
        y="7"
        width="20"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabEarningsIcon({
  active = false,
  size = 24,
}: {
  active?: boolean;
  size?: number;
}) {
  const color = active ? "#BAFF42" : "#8E9E99";
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line
        x1="12"
        y1="1"
        x2="12"
        y2="23"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H6"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabMessagesIcon({
  active = false,
  size = 24,
}: {
  active?: boolean;
  size?: number;
}) {
  const color = active ? "#BAFF42" : "#8E9E99";
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="9" cy="10" r="1" fill={color} />
      <Circle cx="14" cy="10" r="1" fill={color} />
      <Circle cx="19" cy="10" r="1" fill={color} />
    </Svg>
  );
}

export function TabProfileIcon({ active = false, size = 24 }: { active?: boolean; size?: number }) {
  const color = active ? "#BAFF42" : "#8E9E99";
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="12"
        cy="7"
        r="4"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DocumentIcon({ size = 24, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth="1.8" />
        <Line
          x1="16"
          y1="13"
          x2="8"
          y2="13"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Line
          x1="16"
          y1="17"
          x2="8"
          y2="17"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export function UserIcon({ size = 24, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" />
      </Svg>
    </View>
  );
}

export function ChevronRightIcon({ size = 20, color = "#8E9E99", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 18L15 12L9 6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function MapPinIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="1.8" />
      </Svg>
    </View>
  );
}

export function PowerIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M18.36 6.64C19.8703 8.15177 20.7188 10.2016 20.7188 12.3395C20.7188 14.4774 19.8703 16.5272 18.36 18.039C16.8482 19.5493 14.7984 20.3978 12.6605 20.3978C10.5226 20.3978 8.47278 19.5493 6.961 18.039C5.45022 16.5272 4.60175 14.4774 4.60175 12.3395C4.60175 10.2016 5.45022 8.15177 6.961 6.64"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line x1="12" y1="2" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

export function StarIcon({ size = 16, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function ChevronDownIcon({ size = 16, color = "#ADB8B0", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M6 9L12 15L18 9"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function CalendarIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          ry="2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="16"
          y1="2"
          x2="16"
          y2="6"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line
          x1="3"
          y1="10"
          x2="21"
          y2="10"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export function SofaIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20 9V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V9"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2 11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V17H2V11Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4 17V19M20 17V19"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function BoxIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 16V8L12 3L3 8V16L12 21L21 16Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.27 6.96L12 12.01L20.73 6.96M12 22.08V12"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function WalletIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="2"
          y="5"
          width="20"
          height="14"
          rx="2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="1.8" />
        <Circle cx="16" cy="14" r="1.5" fill={color} />
      </Svg>
    </View>
  );
}

export function BellIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.73 21A2 2 0 0 1 10.27 21"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function BriefcaseIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="2"
          y="7"
          width="20"
          height="14"
          rx="2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.8" />
      </Svg>
    </View>
  );
}

export function InfoIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
        <Line
          x1="12"
          y1="16"
          x2="12"
          y2="12"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Circle cx="12" cy="8" r="1" fill={color} />
      </Svg>
    </View>
  );
}

export function MessageSquareIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function FileTextIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Polyline
          points="14 2 14 8 20 8"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="16"
          y1="13"
          x2="8"
          y2="13"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Line
          x1="16"
          y1="17"
          x2="8"
          y2="17"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

export function PlayIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Polygon
          points="5 3 19 12 5 21 5 3"
          fill={color}
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function PaperclipIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function AlertTriangleIcon({ size = 24, color = "#FFB020", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Circle cx="12" cy="17" r="1" fill={color} />
      </Svg>
    </View>
  );
}

export function WifiIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M5 12.55a11 11 0 0 1 14.08 0"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Path
          d="M1.42 9a16 16 0 0 1 21.16 0"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Path
          d="M8.53 16.11a6 6 0 0 1 6.95 0"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Circle cx="12" cy="20" r="1" fill={color} />
      </Svg>
    </View>
  );
}

/** 3D Cube / Package icon for original scope in DW20 */
export function PackageCubeIcon({ size = 24, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M16.5 9.4L7.55 4.24a1.78 1.78 0 0 0-1.8 0L2.8 5.92A1.82 1.82 0 0 0 2 7.5v9a1.82 1.82 0 0 0 .8 1.58l3 1.68a1.78 1.78 0 0 0 1.8 0l8.9-5.16a1.82 1.82 0 0 0 .8-1.58V4.5a1.82 1.82 0 0 0-.8-1.58l-3-1.68a1.78 1.78 0 0 0-1.8 0L3.6 5.8"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Polyline
          points="3.27 6.96 12 12.01 20.73 6.96"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="12"
          y1="22.08"
          x2="12"
          y2="12"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

/** Clipboard notice icon for additional services in DW20 */
export function ClipboardNoticeIcon({ size = 24, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Rect
          x="8"
          y="2"
          width="8"
          height="4"
          rx="1"
          ry="1"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="9"
          y1="12"
          x2="15"
          y2="12"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Line
          x1="9"
          y1="16"
          x2="13"
          y2="16"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export function CameraIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle
          cx="12"
          cy="13"
          r="4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function ArrowLeftIcon({ size = 24, color = "#FFFFFF", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function BankIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function CreditCardIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect
          x="2"
          y="5"
          width="20"
          height="14"
          rx="2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="1.8" />
      </Svg>
    </View>
  );
}

export function LockIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="1.8" />
        <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

export function GlobeIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
        <Line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.8" />
        <Path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          stroke={color}
          strokeWidth="1.8"
        />
      </Svg>
    </View>
  );
}

export function LogOutIcon({ size = 20, color = "#EF4444", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Polyline
          points="16 17 21 12 16 7"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="21"
          y1="12"
          x2="9"
          y2="12"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function TrashIcon({ size = 20, color = "#EF4444", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Polyline
          points="3 6 5 6 21 6"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function HeadphonesIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M3 18v-6a9 9 0 0 1 18 0v6"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
          stroke={color}
          strokeWidth="1.8"
        />
      </Svg>
    </View>
  );
}

export function ZapIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Polygon
          points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function ReceiptIcon({ size = 20, color = "#BAFF42", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1zM8 7h8M8 11h8M8 15h4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function DownloadIcon({ size = 18, color = "#FFFFFF", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function AlertCircleIcon({ size = 24, color = "#FF5C5C", style }: IconProps) {
  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
        <Line
          x1="12"
          y1="8"
          x2="12"
          y2="12"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <Circle cx="12" cy="16" r="0.8" fill={color} stroke={color} strokeWidth="1" />
      </Svg>
    </View>
  );
}
