import {
	colors,
	fontFamily,
	fontSize,
	radius,
	spacing,
} from "@haulix/design-tokens";
import { type ButtonInteractionState, resolveButtonState } from "@haulix/utils";
import type React from "react";
import {
	ActivityIndicator,
	Pressable,
	type PressableProps,
	type TextStyle,
	type ViewStyle,
} from "react-native";

import { HaulixText } from "./HaulixText";

type Variant = "primary" | "secondary" | "ghost";

export interface HaulixButtonProps extends Omit<PressableProps, "style"> {
	variant?: Variant;
	label: string;
	loading?: boolean;
	disabled?: boolean;
	state?: ButtonInteractionState;
	fullWidth?: boolean;
	style?: ViewStyle;
	className?: string;
	textClassName?: string;
}

const styles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
	primary: {
		container: {
			backgroundColor: colors.brand,
			borderRadius: radius.lg,
			paddingVertical: spacing[4],
			paddingHorizontal: spacing[6],
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			color: colors.background,
			fontFamily: fontFamily.semiBold,
			fontSize: fontSize.base,
		},
	},
	secondary: {
		container: {
			backgroundColor: colors.elevated,
			borderRadius: radius.lg,
			paddingVertical: spacing[4],
			paddingHorizontal: spacing[6],
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			color: colors.primaryText,
			fontFamily: fontFamily.semiBold,
			fontSize: fontSize.base,
		},
	},
	ghost: {
		container: {
			backgroundColor: colors.transparent,
			borderRadius: radius.lg,
			paddingVertical: spacing[4],
			paddingHorizontal: spacing[6],
			alignItems: "center",
			justifyContent: "center",
		},
		text: {
			color: colors.brand,
			fontFamily: fontFamily.medium,
			fontSize: fontSize.base,
		},
	},
};

const StyledPressable = Pressable as React.ComponentType<
	PressableProps & { className?: string }
>;

export function HaulixButton({
	variant = "primary",
	label,
	loading = false,
	disabled,
	state,
	fullWidth = false,
	style,
	className,
	textClassName,
	...props
}: HaulixButtonProps) {
	const buttonState: ButtonInteractionState =
		state ?? resolveButtonState(loading, disabled);
	const isBlocked = buttonState === "loading" || buttonState === "disabled";

	return (
		<StyledPressable
			className={className}
			style={[
				styles[variant].container,
				fullWidth ? { width: "100%" } : null,
				isBlocked ? { opacity: 0.5 } : null,
				style,
			]}
			disabled={isBlocked}
			aria-busy={buttonState === "loading"}
			accessibilityRole="button"
			accessibilityState={{
				disabled: isBlocked,
				busy: buttonState === "loading",
			}}
			{...props}
		>
			{buttonState === "loading" ? (
				<ActivityIndicator
					color={variant === "primary" ? colors.background : colors.brand}
				/>
			) : (
				<HaulixText className={textClassName} style={styles[variant].text}>
					{label}
				</HaulixText>
			)}
		</StyledPressable>
	);
}
