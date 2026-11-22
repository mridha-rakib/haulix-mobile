import { colors } from "@haulix/design-tokens";
import Svg, { Circle, Line, Path, Rect, type SvgProps } from "react-native-svg";

export interface C18MIconProps extends SvgProps {
	size?: number;
	color?: string;
}

/**
 * 1. C18-M Customer Booking Check Icon (17 × 17)
 * Original Figma node 382:896 (Editable Vector / check)
 * Stroke width 1.275, stroke #BAFF42
 */
export function C18MCheckIcon({
	size = 17,
	color = colors.brand,
	...props
}: C18MIconProps) {
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
 * 2. C18-M Review Required Check Icon (18 × 18)
 * Original Figma node 382:945 (Editable Vector / check)
 * Stroke width 1.35, stroke #FFC85A
 */
export function C18MReviewCheckIcon({
	size = 18,
	color = "#FFC85A",
	...props
}: C18MIconProps) {
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
 * 3. C18-M User / Customer Profile Icon (18 × 18)
 * Semantic line icon for Section A Customer row
 */
export function C18MUserIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
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
 * 4. C18-M Pickup Location Pin Icon (18 × 18)
 * Semantic line icon for Section A Pickup row
 */
export function C18MPickupPinIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
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
 * 5. C18-M Drop-off Destination Pin Icon (18 × 18)
 * Semantic line icon for Section A Drop-off row
 */
export function C18MDropoffPinIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M4 4V20M4 4H18L14 10L18 16H4"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

/**
 * 6. C18-M Requested Scope / Moving Truck Icon (18 × 18)
 * Semantic line icon for Section A Requested scope row
 */
export function C18MScopeIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
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
 * 6b. C18-M Route Icon (18 × 18)
 * Section A header icon
 */
export function C18MRouteIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Circle cx={6} cy={19} r={3} stroke={color} strokeWidth={2} />
			<Circle cx={18} cy={5} r={3} stroke={color} strokeWidth={2} />
			<Path
				d="M12 19H8M12 5H16M12 19C14.7614 19 17 16.7614 17 14V10C17 7.23858 14.7614 5 12 5"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

/**
 * 6c. C18-M Inventory Icon (18 × 18)
 * Section B header icon
 */
export function C18MInventoryIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

/**
 * 7. C18-M Large Items / Sofa Icon (18 × 18)
 * Semantic line icon for Section B Large items row
 */
export function C18MLargeItemsIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M4 11V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V11"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
			<Path
				d="M2 13C2 11.8954 2.89543 11 4 11H20C21.1046 11 22 11.8954 22 13V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V13Z"
				stroke={color}
				strokeWidth={2}
			/>
			<Line
				x1={6}
				y1={19}
				x2={6}
				y2={21}
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
			<Line
				x1={18}
				y1={19}
				x2={18}
				y2={21}
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

/**
 * 8. C18-M Estimated Weight / Scale Icon (18 × 18)
 * Semantic line icon for Section B Estimated weight row
 */
export function C18MWeightIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M12 3V6M6 6H18M7 6L3 14H11L7 6ZM17 6L13 14H21L17 6ZM12 18V21M8 21H16"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

/**
 * 9. C18-M Stairs Icon (18 × 18)
 * Semantic line icon for Section B Origin/Destination stairs rows
 */
export function C18MStairsIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M4 19H8V15H12V11H16V7H20"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
}

/**
 * 10. C18-M Package / Box Icon (18 × 18)
 * Semantic line icon for Section B Packing request row
 */
export function C18MPackageIcon({
	size = 18,
	color = colors.brand,
	...props
}: C18MIconProps) {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Line
				x1={12}
				y1={12}
				x2={12}
				y2={21}
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
			<Path
				d="M12 12L20 7.5M12 12L4 7.5"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

/**
 * 11. C18-M Crew Shield Icon (20 × 20)
 * Semantic accent icon for Section C Load and crew assessment
 */
export function C18MCrewShieldIcon({
	size = 20,
	color = "#FFC85A",
	...props
}: C18MIconProps) {
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
				d="M12 8V12M12 15V15.5"
				stroke={color}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}
