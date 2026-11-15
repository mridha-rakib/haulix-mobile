import Svg, { Path, type SvgProps } from "react-native-svg";

export interface C15IconProps extends SvgProps {
  size?: number;
  color?: string;
}

/**
 * 1. Customer Demo Context Check Icon (Figma 382:140)
 * 17 × 17 px
 */
export function ContextCheckIcon({ size = 17, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M2.83333 9.20898L6.37499 12.7507L14.1667 4.95898"
        stroke={color}
        strokeWidth={1.275}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 2. Service Information Check Icon (Figma 382:221)
 * 18 × 18 px
 */
export function ServiceInfoCheckIcon({ size = 18, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M3 9.75L6.75 13.5L15 5.25"
        stroke={color}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 3. Service Row Chevron Right Icon (Figma 382:152)
 * 17 × 17 px
 */
export function ServiceChevronIcon({ size = 17, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M6.375 3.54102L11.3333 8.49935L6.375 13.4577"
        stroke={color}
        strokeWidth={1.275}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 4. Junk Removal Category Icon (Figma 382:152)
 * 25 × 25 px
 */
export function ServiceJunkRemovalIcon({ size = 25, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M4.16667 7.29102H20.8333M9.375 4.16602H15.625M7.29167 7.29102L8.33334 21.8743H16.6667L17.7083 7.29102M10.4167 11.4577V18.7493M14.5833 11.4577V18.7493"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 5. Moving Category Icon (Figma 382:160)
 * 25 × 25 px
 */
export function ServiceMovingIcon({ size = 25, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M14.5833 6.25H3.12499C2.5497 6.25 2.08333 6.71637 2.08333 7.29167V16.6667C2.08333 17.242 2.5497 17.7083 3.12499 17.7083H14.5833C15.1586 17.7083 15.625 17.242 15.625 16.6667V7.29167C15.625 6.71637 15.1586 6.25 14.5833 6.25Z"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.625 10.416H19.7917L22.9167 14.5827V17.7077H15.625"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.29166 20.8327C8.44225 20.8327 9.37499 19.8999 9.37499 18.7493C9.37499 17.5988 8.44225 16.666 7.29166 16.666C6.14107 16.666 5.20833 17.5988 5.20833 18.7493C5.20833 19.8999 6.14107 20.8327 7.29166 20.8327Z"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.7917 20.8327C20.9423 20.8327 21.875 19.8999 21.875 18.7493C21.875 17.5988 20.9423 16.666 19.7917 16.666C18.6411 16.666 17.7083 17.5988 17.7083 18.7493C17.7083 19.8999 18.6411 20.8327 19.7917 20.8327Z"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 6. Furniture Pickup Category Icon (Figma 382:171)
 * 25 × 25 px
 */
export function ServiceFurnitureIcon({ size = 25, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M5.20833 12.5007V8.33398C5.20833 7.50518 5.53757 6.71033 6.12362 6.12428C6.70967 5.53822 7.50453 5.20898 8.33333 5.20898H16.6667C17.4955 5.20898 18.2903 5.53822 18.8764 6.12428C19.4624 6.71033 19.7917 7.50518 19.7917 8.33398V12.5007M2.08333 13.5423V18.7507H5.20833M22.9167 13.5423V18.7507H19.7917M4.16666 12.5007H20.8333V20.834H4.16666V12.5007Z"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 7. Appliance Removal Category Icon (Figma 382:179)
 * Note: C15 appliance icon is an isometric shipping box/cube, distinct from C01 washing machine.
 * 25 × 25 px
 */
export function ServiceApplianceIcon({ size = 25, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M3.125 7.29232V17.709L12.5 22.9173L21.875 17.709V7.29232L12.5 2.08398L3.125 7.29232ZM21.875 7.29232L12.5 12.5007M12.5 22.9173V12.5007M3.125 7.29232L12.5 12.5007"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 8. Mattress Removal Category Icon (Figma 382:187)
 * 25 × 25 px
 */
export function ServiceMattressIcon({ size = 25, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M3.125 19.7923V8.33398M21.875 19.7923V8.33398M3.125 13.5423H21.875M6.25 10.4173H12.5M3.125 16.6673H21.875"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 9. Garage Cleanout Category Icon (Figma 382:195)
 * 25 × 25 px
 */
export function ServiceGarageIcon({ size = 25, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M9.375 21.875V14.5833H15.625V21.875M3.125 10.4167L12.5 3.125L21.875 10.4167V21.875H3.125V10.4167Z"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * 10. Store Pickup Category Icon (Figma 382:203)
 * 25 × 25 px
 */
export function ServiceStoreIcon({ size = 25, color = "#BAFF42", ...props }: C15IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M2.08333 4.16602H5.20833L8.33333 16.666H19.7917L22.9167 7.29102H6.24999"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.37499 21.8743C9.95029 21.8743 10.4167 21.408 10.4167 20.8327C10.4167 20.2574 9.95029 19.791 9.37499 19.791C8.7997 19.791 8.33333 20.2574 8.33333 20.8327C8.33333 21.408 8.7997 21.8743 9.37499 21.8743Z"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.75 21.8743C19.3253 21.8743 19.7917 21.408 19.7917 20.8327C19.7917 20.2574 19.3253 19.791 18.75 19.791C18.1747 19.791 17.7083 20.2574 17.7083 20.8327C17.7083 21.408 18.1747 21.8743 18.75 21.8743Z"
        stroke={color}
        strokeWidth={1.875}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
