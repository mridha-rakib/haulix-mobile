import { colors } from "@haulix/design-tokens";
import type React from "react";
import { View, type ViewProps, type ViewStyle } from "react-native";

type Surface = "base" | "surface" | "elevated" | "transparent";

export interface HaulixViewProps extends ViewProps {
  surface?: Surface;
  className?: string;
  style?: ViewStyle | (ViewStyle | undefined | null | false)[];
}

const surfaceColor: Record<Surface, string> = {
  base: colors.background,
  surface: colors.surface,
  elevated: colors.elevated,
  transparent: colors.transparent,
};

const StyledView = View as React.ComponentType<ViewProps & { className?: string }>;

export function HaulixView({
  surface = "transparent",
  style,
  className,
  ...props
}: HaulixViewProps) {
  const viewStyle: ViewStyle = {
    backgroundColor: surfaceColor[surface],
  };
  return <StyledView style={[viewStyle, style]} className={className} {...props} />;
}
