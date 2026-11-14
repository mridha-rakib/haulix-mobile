import { colors } from "@haulix/design-tokens";
import type { StyleProp, ViewStyle } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * 1. account_shield.svg (Figma 333:40) — 21×21
 */
export function AccountShieldIcon({ size = 21, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" style={style}>
      <Path
        d="M7 10.5L9.625 13.125L14 7.875M10.5 1.75L18.375 5.25V10.5C18.375 14.875 14.875 18.375 10.5 19.25C6.125 18.375 2.625 14.875 2.625 10.5V5.25L10.5 1.75Z"
        stroke={color}
        strokeWidth={1.62}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 2. address_pin.svg (Figma 333:69) — 23×23
 */
export function AddressPinIcon({ size = 23, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" style={style}>
      <Path
        d="M11.5 21.083C11.5 21.083 19.1667 13.4163 19.1667 8.62467C19.1667 6.59135 18.359 4.6413 16.9212 3.20352C15.4834 1.76574 13.5334 0.958008 11.5 0.958008C9.46671 0.958008 7.51667 1.76574 6.07889 3.20352C4.64111 4.6413 3.83337 6.59135 3.83337 8.62467C3.83337 13.4163 11.5 21.083 11.5 21.083Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 10.5413C12.5586 10.5413 13.4167 9.68322 13.4167 8.62467C13.4167 7.56613 12.5586 6.70801 11.5 6.70801C10.4415 6.70801 9.58337 7.56613 9.58337 8.62467C9.58337 9.68322 10.4415 10.5413 11.5 10.5413Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 3. booking_star.svg (Figma 333:90) — 23×23
 */
export function BookingStarIcon({ size = 23, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" style={style}>
      <Path
        d="M11.5 1.91699L14.375 8.62533L21.0833 9.29616L15.9083 14.0878L17.4416 21.0837L11.5 17.2503L5.55829 21.0837L7.09163 14.0878L1.91663 9.29616L8.62496 8.62533L11.5 1.91699Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 4. camera_badge.svg (Figma 941:8498) — 13×13 (dark camera inside lime avatar badge)
 */
export function CameraBadgeIcon({ size = 13, color = "#101915", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 13 13" fill="none" style={style}>
      <Path
        d="M9.75 3.79199H3.25C2.35254 3.79199 1.625 4.51953 1.625 5.41699V9.75033C1.625 10.6478 2.35254 11.3753 3.25 11.3753H9.75C10.6475 11.3753 11.375 10.6478 11.375 9.75033V5.41699C11.375 4.51953 10.6475 3.79199 9.75 3.79199Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.79163 3.79199L4.87496 2.16699H8.12496L9.20829 3.79199"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.5 9.20801C7.39746 9.20801 8.125 8.48047 8.125 7.58301C8.125 6.68555 7.39746 5.95801 6.5 5.95801C5.60254 5.95801 4.875 6.68555 4.875 7.58301C4.875 8.48047 5.60254 9.20801 6.5 9.20801Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 5. change_password.svg (Figma 936:8497) — 20×20
 */
export function ChangePasswordIcon({ size = 20, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
      <Path
        d="M15 8.33301H5.00004C4.07957 8.33301 3.33337 9.0792 3.33337 9.99967V16.6663C3.33337 17.5868 4.07957 18.333 5.00004 18.333H15C15.9205 18.333 16.6667 17.5868 16.6667 16.6663V9.99967C16.6667 9.0792 15.9205 8.33301 15 8.33301Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66663 8.33333V5.83333C6.66663 4.94928 7.01782 4.10143 7.64294 3.47631C8.26806 2.85119 9.1159 2.5 9.99996 2.5C10.884 2.5 11.7319 2.85119 12.357 3.47631C12.9821 4.10143 13.3333 4.94928 13.3333 5.83333V8.33333"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 6. customer_person.svg (Figma 333:46) — 23×23
 */
export function CustomerPersonIcon({ size = 23, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" style={style}>
      <Path
        d="M11.5 10.5417C13.6171 10.5417 15.3333 8.82542 15.3333 6.70833C15.3333 4.59124 13.6171 2.875 11.5 2.875C9.38287 2.875 7.66663 4.59124 7.66663 6.70833C7.66663 8.82542 9.38287 10.5417 11.5 10.5417Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.83337 20.1247V17.2497C3.83337 15.2163 4.64111 13.2663 6.07889 11.8285C7.51667 10.3907 9.46671 9.58301 11.5 9.58301C13.5334 9.58301 15.4834 10.3907 16.9212 11.8285C18.359 13.2663 19.1667 15.2163 19.1667 17.2497V20.1247"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 7. header_back.svg (Figma 349:261) — 21×21
 */
export function HeaderBackIcon({ size = 21, color = colors.primaryText, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" style={style}>
      <Path
        d="M13.125 3.5L6.125 10.5L13.125 17.5"
        stroke={color}
        strokeWidth={1.62}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 8. header_bell.svg (Figma 349:264) — 22×22
 */
export function HeaderBellIcon({ size = 22, color = colors.primaryText, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" style={style}>
      <Path
        d="M9.16671 19.2503H12.8334M4.58337 15.5837H17.4167L15.5834 12.8337V8.25033C15.5834 7.03475 15.1005 5.86896 14.2409 5.00942C13.3814 4.14988 12.2156 3.66699 11 3.66699C9.78447 3.66699 8.61868 4.14988 7.75913 5.00942C6.89959 5.86896 6.41671 7.03475 6.41671 8.25033V12.8337L4.58337 15.5837Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 9. language_globe.svg (Figma 333:76) — 23×23
 */
export function LanguageGlobeIcon({ size = 23, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" style={style}>
      <Path
        d="M11.5 21.0837C16.7928 21.0837 21.0834 16.7931 21.0834 11.5003C21.0834 6.2076 16.7928 1.91699 11.5 1.91699C6.20724 1.91699 1.91663 6.2076 1.91663 11.5003C1.91663 16.7931 6.20724 21.0837 11.5 21.0837Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.91663 11.5H21.0833"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5 1.91699C13.9167 5.75033 15.25 8.62533 15.25 11.5003C15.25 14.3753 13.9167 17.2503 11.5 21.0837C9.08329 17.2503 7.74996 14.3753 7.74996 11.5003C7.74996 8.62533 9.08329 5.75033 11.5 1.91699Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 10. payment_card.svg (Figma 333:83) — 23×23
 */
export function PaymentCardIcon({ size = 23, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" style={style}>
      <Path
        d="M19.1666 4.79199H3.83329C2.77475 4.79199 1.91663 5.65011 1.91663 6.70866V16.292C1.91663 17.3505 2.77475 18.2087 3.83329 18.2087H19.1666C20.2252 18.2087 21.0833 17.3505 21.0833 16.292V6.70866C21.0833 5.65011 20.2252 4.79199 19.1666 4.79199Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.91663 9.58301H21.0833"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 11. phone_verified.svg (Figma 333:57) — 23×23
 */
export function PhoneVerifiedIcon({ size = 23, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" style={style}>
      <Path
        d="M7.66667 11.5003L10.5417 14.3753L15.3333 8.62533M11.5 1.91699L20.125 5.75033V11.5003C20.125 16.292 16.2917 20.1253 11.5 21.0837C6.70833 20.1253 2.875 16.292 2.875 11.5003V5.75033L11.5 1.91699Z"
        stroke={color}
        strokeWidth={1.77}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 12. profile_photo.svg (Figma 936:8503) — 20×20
 */
export function ProfilePhotoIcon({ size = 20, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
      <Path
        d="M15.8333 5.83301H4.16667C3.24619 5.83301 2.5 6.5792 2.5 7.49967V15.833C2.5 16.7535 3.24619 17.4997 4.16667 17.4997H15.8333C16.7538 17.4997 17.5 16.7535 17.5 15.833V7.49967C17.5 6.5792 16.7538 5.83301 15.8333 5.83301Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.83337 5.83301L7.50004 3.33301H12.5L14.1667 5.83301"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 14.167C11.3807 14.167 12.5 13.0477 12.5 11.667C12.5 10.2863 11.3807 9.16699 10 9.16699C8.61929 9.16699 7.5 10.2863 7.5 11.667C7.5 13.0477 8.61929 14.167 10 14.167Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 13. verified_status.svg (Figma 333:63) — 24×24
 */
export function VerifiedStatusIcon({ size = 24, color = "#48D796", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path
        d="M8 12L11 15L16 9M12 2L21 6V12C21 17 17 21 12 22C7 21 3 17 3 12V6L12 2Z"
        stroke={color}
        strokeWidth={1.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 14. nav_home.svg (Figma I959:8556;957:8595) — 26×26
 */
export function NavHomeIcon({ size = 26, color = "#AAB5AF", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none" style={style}>
      <Path
        d="M3.19995 12.7996L13 4.09961L22.7999 12.7996V22.8996C22.7999 23.2974 22.6419 23.679 22.3606 23.9603C22.0793 24.2416 21.6978 24.3996 21.2999 24.3996H15.1V16.0996H10.9V24.3996H4.69995C4.30213 24.3996 3.9206 24.2416 3.63929 23.9603C3.35799 23.679 3.19995 23.2974 3.19995 22.8996V12.7996Z"
        fill={color}
        stroke={color}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <Path d="M10.9 24.3996V16.0996H15.1V24.3996" fill="#080D0C" />
    </Svg>
  );
}

/**
 * 15. nav_my_jobs.svg (Figma I959:8556;957:8598) — 26×26
 */
export function NavMyJobsIcon({ size = 26, color = "#AAB5AF", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none" style={style}>
      <Path
        d="M20.5 5.7998H5.49995C4.2297 5.7998 3.19995 6.82955 3.19995 8.0998V21.4998C3.19995 22.7701 4.2297 23.7998 5.49995 23.7998H20.5C21.7702 23.7998 22.7999 22.7701 22.7999 21.4998V8.0998C22.7999 6.82955 21.7702 5.7998 20.5 5.7998Z"
        stroke={color}
        strokeWidth={1.8}
      />
      <Path
        d="M3.59998 11.2998H22.4M8.39998 3.2998V8.3998M17.6 3.2998V8.3998"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * 16. nav_book_plus.svg (Figma I959:8556;957:8607) — 24×24
 */
export function NavBookPlusIcon({ size = 24, color = "#080D0C", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <Path d="M12 2.5V21.5M2.5 12H21.5" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

/**
 * 17. nav_deals.svg (Figma I959:8556;957:8601) — 26×26
 */
export function NavDealsIcon({ size = 26, color = "#AAB5AF", style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none" style={style}>
      <Path
        d="M3.09998 5.40039H14.6L22.6 13.0004L12.1 23.4004L3.09998 14.8004V5.40039Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M10.1 12.2004C11.1493 12.2004 12 11.3497 12 10.3004C12 9.25105 11.1493 8.40039 10.1 8.40039C9.05061 8.40039 8.19995 9.25105 8.19995 10.3004C8.19995 11.3497 9.05061 12.2004 10.1 12.2004Z"
        stroke={color}
        strokeWidth={1.6}
      />
    </Svg>
  );
}

/**
 * 18. nav_account_active.svg (Figma I959:8556;957:8604) — 26×26
 */
export function NavAccountActiveIcon({ size = 26, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none" style={style}>
      <Path
        d="M13 13.0004C15.4853 13.0004 17.5 10.9857 17.5 8.50039C17.5 6.01511 15.4853 4.00039 13 4.00039C10.5147 4.00039 8.5 6.01511 8.5 8.50039C8.5 10.9857 10.5147 13.0004 13 13.0004Z"
        stroke={color}
        strokeWidth={1.85}
        strokeLinecap="round"
      />
      <Path
        d="M3.59998 24.0004V22.3004C3.59998 19.8074 4.59033 17.4164 6.35319 15.6536C8.11604 13.8907 10.507 12.9004 13 12.9004C15.493 12.9004 17.8839 13.8907 19.6468 15.6536C21.4096 17.4164 22.4 19.8074 22.4 22.3004V24.0004"
        stroke={color}
        strokeWidth={1.85}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * 19. nav_sculpted_curve.svg (Figma I959:8556;957:8585) — 430×128 sculpted curve
 */
export function NavSculptedCurve({ width = 430, height = 128, style }: IconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 430 128"
      fill="none"
      style={style}
      preserveAspectRatio="none"
    >
      <G clipPath="url(#clip0_sculpted)">
        <Rect width={430} height={128} fill="#080B0B" />
        <Path
          d="M0 23H156C172 23 180.5 20 186.5 14C193.5 8 197 4 205 3C208 2.3 211 2 215 2C219 2 222 2.3 225 3C233 4 239 8 246 14C252 20 258 23 274 23H430V128H0V23Z"
          fill="#080D0C"
        />
        <Path
          d="M0 23H156C172 23 178 20 184 14C191 8 197 4 205 3C208 2.3 211 2 215 2C219 2 222 2.3 225 3C233 4 239 8 246 14C252 20 258 23 274 23H430"
          stroke="#35433B"
          strokeOpacity={0.72}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_sculpted">
          <Rect width={430} height={128} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

/**
 * 20. edit_name.svg (Figma 333:137) — 21×21
 */
export function EditNameIcon({ size = 21, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" style={style}>
      <Path
        d="M10.5 9.625C12.433 9.625 14 8.058 14 6.125C14 4.192 12.433 2.625 10.5 2.625C8.567 2.625 7 4.192 7 6.125C7 8.058 8.567 9.625 10.5 9.625Z"
        stroke={color}
        strokeWidth={1.62}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.5 18.375V15.75C3.5 13.8935 4.2375 12.113 5.55025 10.8003C6.86301 9.4875 8.64348 8.75 10.5 8.75C12.3565 8.75 14.137 9.4875 15.4497 10.8003C16.7625 12.113 17.5 13.8935 17.5 15.75V18.375"
        stroke={color}
        strokeWidth={1.62}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 21. edit_phone_shield.svg (Figma 333:146) — 21×21
 */
export function EditPhoneShieldIcon({ size = 21, color = colors.brand, style }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" style={style}>
      <Path
        d="M7 10.5L9.625 13.125L14 7.875M10.5 1.75L18.375 5.25V10.5C18.375 14.875 14.875 18.375 10.5 19.25C6.125 18.375 2.625 14.875 2.625 10.5V5.25L10.5 1.75Z"
        stroke={color}
        strokeWidth={1.62}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
