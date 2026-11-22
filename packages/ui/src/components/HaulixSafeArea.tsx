import { colors } from "@haulix/design-tokens";
import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import {
	SafeAreaView,
	type SafeAreaViewProps,
} from "react-native-safe-area-context";

export interface HaulixSafeAreaProps extends SafeAreaViewProps {
	fill?: boolean;
	className?: string;
	style?: StyleProp<ViewStyle>;
}

const StyledSafeAreaView = SafeAreaView as React.ComponentType<
	SafeAreaViewProps & {
		className?: string;
		style?: StyleProp<ViewStyle>;
	}
>;

export function HaulixSafeArea({
	fill = true,
	style,
	className,
	...props
}: HaulixSafeAreaProps) {
	const areaStyle: ViewStyle = {
		backgroundColor: colors.background,
		...(fill ? { flex: 1 } : {}),
	};
	return (
		<StyledSafeAreaView
			style={[areaStyle, style]}
			className={className}
			{...props}
		/>
	);
}
