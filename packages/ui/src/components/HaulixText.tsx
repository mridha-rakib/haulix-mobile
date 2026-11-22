import { colors, fontFamily, fontSize } from "@haulix/design-tokens";
import type React from "react";
import { Text, type TextProps, type TextStyle } from "react-native";

type Variant = "primary" | "secondary" | "brand" | "error";
type Size = keyof typeof fontSize;
type Weight = "regular" | "medium" | "semiBold" | "bold";

export interface HaulixTextProps extends TextProps {
	variant?: Variant;
	size?: Size;
	weight?: Weight;
	className?: string;
	children?: React.ReactNode;
	style?: TextStyle | (TextStyle | undefined | null | false)[];
}

const variantColor: Record<Variant, string> = {
	primary: colors.primaryText,
	secondary: colors.secondaryText,
	brand: colors.brand,
	error: colors.error,
};

const StyledText = Text as React.ComponentType<
	TextProps & { className?: string }
>;

export function HaulixText({
	variant = "primary",
	size = "base",
	weight = "regular",
	style,
	className,
	...props
}: HaulixTextProps) {
	const textStyle: TextStyle = {
		color: variantColor[variant],
		fontSize: fontSize[size],
		fontFamily: fontFamily[weight],
	};

	return (
		<StyledText style={[textStyle, style]} className={className} {...props} />
	);
}
