import {
	colors,
	fontFamily,
	fontSize,
	radius,
	spacing,
} from "@haulix/design-tokens";
import type React from "react";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	type TextInputProps,
	type TextStyle,
	View,
	type ViewProps,
	type ViewStyle,
} from "react-native";

const StyledView = View as React.ComponentType<
	ViewProps & { className?: string }
>;

type InputFocusEvent = Parameters<NonNullable<TextInputProps["onFocus"]>>[0];

export interface HaulixTextFieldProps
	extends Omit<TextInputProps, "placeholder" | "onFocus" | "onBlur"> {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
	className?: string;
	placeholder?: string;
	onFocus?: (e: InputFocusEvent) => void;
	onBlur?: (e: InputFocusEvent) => void;
}

export function HaulixTextField({
	label,
	error,
	leftIcon,
	rightIcon,
	containerStyle,
	inputStyle,
	className,
	placeholder,
	onFocus,
	onBlur,
	...inputProps
}: HaulixTextFieldProps) {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = (e: InputFocusEvent) => {
		setIsFocused(true);
		onFocus?.(e);
	};

	const handleBlur = (e: InputFocusEvent) => {
		setIsFocused(false);
		onBlur?.(e);
	};

	return (
		<StyledView style={[styles.wrapper, containerStyle]} className={className}>
			{label ? (
				<Text
					style={styles.label}
					accessibilityRole="header"
					accessibilityLabel={label}
				>
					{label}
				</Text>
			) : null}

			<View
				style={[
					styles.inputContainer,
					isFocused && styles.inputFocused,
					Boolean(error) && styles.inputError,
				]}
			>
				{leftIcon ? (
					<View style={styles.leftIconContainer}>{leftIcon}</View>
				) : null}

				<TextInput
					style={[styles.input, inputStyle]}
					placeholder={placeholder}
					placeholderTextColor="#606E66"
					selectionColor={colors.brand}
					onFocus={handleFocus}
					onBlur={handleBlur}
					accessibilityLabel={label ?? placeholder}
					{...inputProps}
				/>

				{rightIcon ? (
					<View style={styles.rightIconContainer}>{rightIcon}</View>
				) : null}
			</View>

			{error ? (
				<Text style={styles.errorText} accessibilityRole="alert">
					{error}
				</Text>
			) : null}
		</StyledView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
	},
	label: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		letterSpacing: 0.8,
		textTransform: "uppercase",
		color: colors.secondaryText,
		marginBottom: spacing[2],
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		height: 56,
		backgroundColor: colors.elevated,
		borderRadius: radius.xl,
		borderWidth: 1,
		borderColor: "#2B3331",
		paddingHorizontal: 14,
	},
	inputFocused: {
		borderColor: colors.brand,
	},
	inputError: {
		borderColor: colors.error,
	},
	leftIconContainer: {
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	rightIconContainer: {
		marginLeft: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		flex: 1,
		fontFamily: fontFamily.regular,
		fontSize: fontSize.base,
		color: colors.primaryText,
		paddingVertical: 0,
		height: "100%",
	},
	errorText: {
		fontFamily: fontFamily.medium,
		fontSize: fontSize.xs,
		color: colors.error,
		marginTop: spacing[1],
	},
});
