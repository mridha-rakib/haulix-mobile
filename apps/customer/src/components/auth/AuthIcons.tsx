import {
	Image,
	type ImageStyle,
	type StyleProp,
	View,
	type ViewStyle,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface IconProps {
	size?: number;
	color?: string;
	style?: StyleProp<ViewStyle>;
}

/**
 * Envelope mail icon — exact path from Figma node 641:274 (auth_mail.svg)
 */
export function AuthMailIcon({
	size = 20,
	color = "#BAD6C4",
	style,
}: IconProps) {
	return (
		<View style={style}>
			<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
				<Path
					d="M3 6H21V19H3V6Z"
					stroke={color}
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M3 7L12 14L21 7"
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
 * Padlock icon — exact path from Figma node 641:281 (auth_lock.svg)
 */
export function AuthLockIcon({
	size = 20,
	color = "#BAD6C4",
	style,
}: IconProps) {
	return (
		<View style={style}>
			<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
				<Path
					d="M5 11H19V21H5V11Z"
					stroke={color}
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M8 11V8C8 1 16 1 16 8V11"
					stroke={color}
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
}

interface EyeIconProps extends IconProps {
	visible: boolean;
}

/**
 * Password visibility eye icon — exact path from Figma node 641:284 / 641:285
 * (password_eye_outline.svg + password_eye_pupil.svg)
 */
export function PasswordEyeIcon({
	size = 20,
	color = "#A1B3A8",
	visible,
	style,
}: EyeIconProps) {
	const scale = size / 20;
	const width = 17 * scale;
	const height = 11 * scale;

	return (
		<View style={style}>
			<Svg width={width} height={height} viewBox="0 0 17 11" fill="none">
				<Path
					d="M8.5 0.700195C10.7322 0.700195 12.7208 1.28659 14.1299 2.19824C15.546 3.11454 16.2998 4.29797 16.2998 5.5C16.2998 6.70203 15.546 7.88546 14.1299 8.80176C12.7208 9.71341 10.7322 10.2998 8.5 10.2998C6.26777 10.2998 4.27921 9.71341 2.87012 8.80176C1.45402 7.88546 0.700195 6.70203 0.700195 5.5C0.700195 4.29797 1.45402 3.11454 2.87012 2.19824C4.27921 1.28659 6.26777 0.700195 8.5 0.700195Z"
					stroke={color}
					strokeWidth="1.4"
				/>
				{visible ? (
					<Circle cx="8.5" cy="5.5" r="2.5" fill={color} />
				) : (
					<Path
						d="M2.5 1.5L14.5 9.5"
						stroke={color}
						strokeWidth="1.4"
						strokeLinecap="round"
					/>
				)}
			</Svg>
		</View>
	);
}

/**
 * Apple provider mark — exact path from Figma node 641:292 (apple_provider_logo.svg)
 */
export function AppleLogoIcon({
	size = 20,
	color = "#FFFFFF",
	style,
}: IconProps) {
	// Original path is located in bounds: x in [6.14, 17.97] (width ~12), y in [13.63, 28.17] (height ~15)
	return (
		<View style={style}>
			<Svg width={size * 0.8} height={size} viewBox="6 13 12 16" fill="none">
				<Path
					d="M12.2337 16.988C12.8897 16.988 13.7119 16.5446 14.2015 15.9533C14.6449 15.4175 14.9683 14.6692 14.9683 13.9209C14.9683 13.8193 14.959 13.7177 14.9406 13.6345C14.2107 13.6622 13.3331 14.1242 12.8065 14.7431C12.3908 15.2143 12.012 15.9533 12.012 16.7109C12.012 16.8217 12.0305 16.9326 12.0397 16.9695C12.0859 16.9788 12.1598 16.988 12.2337 16.988ZM9.92418 28.1663C10.8203 28.1663 11.2175 27.5659 12.3354 27.5659C13.4717 27.5659 13.7211 28.1479 14.7188 28.1479C15.6981 28.1479 16.354 27.2425 16.973 26.3556C17.6659 25.3394 17.9522 24.3417 17.9707 24.2955C17.9061 24.277 16.0307 23.5102 16.0307 21.3577C16.0307 19.4916 17.5088 18.6509 17.592 18.5862C16.6127 17.182 15.1253 17.1451 14.7188 17.1451C13.6195 17.1451 12.7234 17.8102 12.1598 17.8102C11.5501 17.8102 10.7464 17.182 9.79484 17.182C7.98414 17.182 6.14572 18.6786 6.14572 21.5055C6.14572 23.2608 6.82935 25.1177 7.67004 26.3187C8.39062 27.3349 9.01883 28.1663 9.92418 28.1663Z"
					fill={color}
				/>
			</Svg>
		</View>
	);
}

/**
 * User / person icon — exact path from Figma node 617:161 (c07_user.svg)
 */
export function AuthUserIcon({
	size = 20,
	color = "#BAD6C4",
	style,
}: IconProps) {
	return (
		<View style={style}>
			<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
				<Path
					d="M12 4C7 4 7 12 12 12C17 12 17 4 12 4Z"
					stroke={color}
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M4 21C4 12 20 12 20 21"
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
 * Mobile phone icon — exact path from Figma node 617:175 (c07_phone.svg)
 */
export function AuthPhoneIcon({
	size = 20,
	color = "#BAD6C4",
	style,
}: IconProps) {
	return (
		<View style={style}>
			<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
				<Path
					d="M7 3H17V21H7V3Z"
					stroke={color}
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<Path
					d="M11 18H13"
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
 * Checkbox tick mark icon — for checked consent state (Figma node 710:442)
 */
export function CheckboxCheckIcon({
	size = 12,
	color = "#080B0B",
	style,
}: IconProps) {
	return (
		<View style={style}>
			<Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
				<Path
					d="M2.5 6.5L4.8 8.8L9.5 3.5"
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
 * Google G provider logo — exact 2x PNG from Figma node 641:300 (google_g_figma_2x.png)
 */
export function GoogleLogoIcon({
	size = 20,
	style,
}: {
	size?: number;
	style?: StyleProp<ImageStyle>;
}) {
	return (
		<Image
			source={require("../../../assets/c06/original-figma-png/google_g_figma_2x.png")}
			style={[{ width: size, height: size }, style]}
			resizeMode="contain"
		/>
	);
}

/**
 * Chevron right icon — for resend row affordance (Figma node 331:109)
 */
export function ChevronRightIcon({
	size = 16,
	color = "#BAFF42",
	style,
}: IconProps) {
	return (
		<View style={style}>
			<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
				<Path
					d="M9 18L15 12L9 6"
					stroke={color}
					strokeWidth="2.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</Svg>
		</View>
	);
}
