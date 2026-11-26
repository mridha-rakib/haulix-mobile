import { spacing } from "@haulix/design-tokens";
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

export interface ActionCtaButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "large" | "small";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ActionCtaButton({
  label,
  onPress,
  variant = "primary",
  size = "default",
  disabled = false,
  loading = false,
  style,
}: ActionCtaButtonProps) {
  const getButtonBgStyle = (pressed: boolean) => {
    const variantMap: Record<string, { base: ViewStyle; pressed: ViewStyle }> = {
      outline: { base: styles.outlineButton, pressed: styles.outlinePressed },
      secondary: { base: styles.secondaryButton, pressed: styles.secondaryPressed },
      ghost: { base: styles.ghostButton, pressed: styles.ghostPressed },
      primary: { base: styles.primaryButton, pressed: styles.primaryPressed },
    };

    const currentVariant = variantMap[variant] || variantMap.primary;

    return [
      styles.baseButton,
      currentVariant.base,
      size === "large" ? styles.largeButton : null,
      size === "small" ? styles.smallButton : null,
      pressed ? currentVariant.pressed : null,
      disabled ? styles.disabled : null,
      style,
    ].filter(Boolean) as StyleProp<ViewStyle>;
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outline":
        return styles.outlineText;
      case "secondary":
        return styles.secondaryText;
      case "ghost":
        return styles.ghostText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading }}
      style={{ width: "100%" }}
    >
      {({ pressed }) => (
        <View style={getButtonBgStyle(pressed)}>
          {loading ? (
            <ActivityIndicator size="small" color={variant === "primary" ? "#080B0B" : "#BAFF42"} />
          ) : (
            <Text style={[styles.baseText, getTextStyle()]}>{label}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 52,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
    overflow: "hidden",
  },
  largeButton: {
    height: 56,
    borderRadius: 28,
  },
  smallButton: {
    height: 44,
    borderRadius: 22,
  },
  primaryButton: {
    backgroundColor: "#BAFF42",
  },
  primaryPressed: {
    backgroundColor: "#A8EB35",
  },
  secondaryButton: {
    backgroundColor: "#0D1110",
    borderWidth: 1.5,
    borderColor: "#35403B",
  },
  secondaryPressed: {
    backgroundColor: "#161D1A",
    borderColor: "#BAFF42",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#35403B",
  },
  outlinePressed: {
    borderColor: "#BAFF42",
    backgroundColor: "rgba(186, 255, 66, 0.05)",
  },
  ghostButton: {
    backgroundColor: "transparent",
  },
  ghostPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  disabled: {
    opacity: 0.45,
  },
  baseText: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  primaryText: {
    color: "#080B0B",
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: "#FFFFFF",
  },
  ghostText: {
    color: "#ADB8B0",
  },
});
