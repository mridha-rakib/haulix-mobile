import Svg, { Path, type SvgProps } from "react-native-svg";

export interface C15SIconProps extends SvgProps {
  size?: number;
  color?: string;
}

/**
 * 1. Flow Header Back Arrow Icon (Figma 436:1976 / 429:298)
 * 23 × 23 px
 */
export function C15SBackArrowIcon({ size = 23, color = "#F6F8F6", ...props }: C15SIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 23 23" fill="none" {...props}>
      <Path
        d="M13.4166 4.79102L6.70831 11.4993L13.4166 18.2077"
        stroke={color}
        strokeWidth={1.86875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 2. C15-S Selected Truck Icon (Figma I382:262;317:79)
 * 31 × 31 px
 * The authoritative selected-service truck icon from Figma node 382:241.
 */
export function C15SSelectedTruckIcon({ size = 31, color = "#BAFF42", ...props }: C15SIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 31 31" fill="none" {...props}>
      <Path
        d="M19.375 23.25V7.75H3.875V23.25H19.375ZM19.375 23.25H28.4167V18.0833L24.5417 12.9167H19.375"
        stroke={color}
        strokeWidth={2.325}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.04165 27.1257C10.4684 27.1257 11.625 25.9691 11.625 24.5423C11.625 23.1156 10.4684 21.959 9.04165 21.959C7.61491 21.959 6.45831 23.1156 6.45831 24.5423C6.45831 25.9691 7.61491 27.1257 9.04165 27.1257Z"
        stroke={color}
        strokeWidth={2.325}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.25 27.1257C24.6768 27.1257 25.8334 25.9691 25.8334 24.5423C25.8334 23.1156 24.6768 21.959 23.25 21.959C21.8233 21.959 20.6667 23.1156 20.6667 24.5423C20.6667 25.9691 21.8233 27.1257 23.25 27.1257Z"
        stroke={color}
        strokeWidth={2.325}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
