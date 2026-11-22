import { colors } from "@haulix/design-tokens";
import Svg, { Circle, Path, Rect, type SvgProps } from "react-native-svg";

export interface C17IconProps extends SvgProps {
	size?: number;
	color?: string;
}

/**
 * 1. C17 Check Icon (21 × 21)
 * Original Figma node 382:598 (Editable Vector / check)
 * Used as active selection indicator on saved address cards.
 */
export function C17CheckIcon({
	size = 21,
	color = colors.brand,
	...props
}: C17IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 21 21" fill="none" {...props}>
			<Path
				d="M3.5 11.375L7.875 15.75L17.5 6.125"
				stroke={color}
				strokeWidth={1.575}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

/**
 * 2. C17 Location Pin Icon (21 × 21)
 * Original Figma node 382:606 (Editable Vector / pin)
 * Used on alternate / unselected saved address cards.
 */
export function C17LocationPinIcon({
	size = 21,
	color = "#ADB7B1",
	...props
}: C17IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 21 21" fill="none" {...props}>
			<Path
				d="M10.5 19.25C10.5 19.25 17.5 12.25 17.5 7.875C17.5 6.01848 16.7625 4.23801 15.4497 2.92525C14.137 1.6125 12.3565 0.875 10.5 0.875C8.64348 0.875 6.86301 1.6125 5.55025 2.92525C4.2375 4.23801 3.5 6.01848 3.5 7.875C3.5 12.25 10.5 19.25 10.5 19.25Z"
				stroke={color}
				strokeWidth={1.575}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Circle
				cx={10.5}
				cy={7.875}
				r={1.75}
				stroke={color}
				strokeWidth={1.575}
			/>
		</Svg>
	);
}

/**
 * 3. C17 Chevron Right Icon (17 × 17)
 * Original Figma node 382:603 / 382:612 (Editable Vector / chevron)
 */
export function C17ChevronRightIcon({
	size = 17,
	color = colors.brand,
	...props
}: C17IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 17 17" fill="none" {...props}>
			<Path
				d="M6.375 3.54167L11.3333 8.5L6.375 13.4583"
				stroke={color}
				strokeWidth={1.275}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

/**
 * 4. C17 Contact / User Icon (20 × 20)
 * Used in Pickup Instructions detail row: Contact
 */
export function C17ContactIcon({
	size = 20,
	color = colors.brand,
	...props
}: C17IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Circle
				cx={12}
				cy={8}
				r={4}
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
			<Path
				d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

/**
 * 5. C17 Service Type / Truck Icon (20 × 20)
 * Used in Pickup Instructions detail row: Service type
 */
export function C17ServiceTypeIcon({
	size = 20,
	color = colors.brand,
	...props
}: C17IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Rect
				x={1}
				y={3}
				width={15}
				height={13}
				rx={1}
				stroke={color}
				strokeWidth={2}
			/>
			<Path
				d="M16 8H20L23 11V16H16V8Z"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Circle cx={5.5} cy={18.5} r={2.5} stroke={color} strokeWidth={2} />
			<Circle cx={18.5} cy={18.5} r={2.5} stroke={color} strokeWidth={2} />
		</Svg>
	);
}

/**
 * 6. C17 Pickup Access / Driveway Icon (20 × 20)
 * Used in Pickup Instructions detail row: Pickup access
 */
export function C17PickupAccessIcon({
	size = 20,
	color = colors.brand,
	...props
}: C17IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M3 10L12 3L21 10V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10Z"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M9 21V13H15V21"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

/**
 * 7. C17 Address Rule Shield Icon (20 × 20)
 * Used in Address Rule section header
 */
export function C17RuleShieldIcon({
	size = 20,
	color = colors.brand,
	...props
}: C17IconProps) {
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
				d="M12 8V13M12 16V16.5"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

/**
 * 8. C17-V Warning / Alert Triangle Icon (18 × 18)
 * Original Figma node 382:730 (Editable Vector / alert)
 * Used in C17-V Address Validation Error status banner.
 */
export function C17VAlertIcon({
	size = 18,
	color = "#F36D6D",
	...props
}: C17IconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 18 18" fill="none" {...props}>
			<Path
				d="M9 6.75V10.5M9 13.5H9.075M9 1.5L16.5 15.75H1.5L9 1.5Z"
				stroke={color}
				strokeWidth={1.35}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

/**
 * 9. C17-V Customer Check Icon (17 × 17)
 * Original Figma node 382:723 (Editable Vector / check)
 * Used in customer booking context badge on C17-A & C17-V.
 */
export function C17VCheckIcon({
	size = 17,
	color = colors.brand,
	...props
}: C17IconProps) {
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
 * 10. C17-D Review Required / Amber Check Icon (18 × 18)
 * Original Figma node 382:792 (Editable Vector / check)
 * Used in C17-D Safe handling checks apply status badge.
 */
export function C17DReviewCheckIcon({
	size = 18,
	color = "#FFC85A",
	...props
}: C17IconProps) {
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
