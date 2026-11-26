import { radius, spacing } from "@haulix/design-tokens";
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
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
  const getButtonStyle = (pressed: boolean) => {
    switch (variant) {
      case "outline":
        return [
          styles.baseButton,
          styles.outlineButton,
          size === "large" && styles.largeButton,
          pressed && styles.outlinePressed,
          disabled && styles.disabled,
          style,
        ];
      case "secondary":
        return [
          styles.baseButton,
          styles.secondaryButton,
          size === "large" && styles.largeButton,
          pressed && styles.secondaryPressed,
          disabled && styles.disabled,
          style,
        ];
      case "ghost":
        return [
          styles.baseButton,
          styles.ghostButton,
          size === "large" && styles.largeButton,
          pressed && styles.ghostPressed,
          disabled && styles.disabled,
          style,
        ];
      default:
        return [
          styles.baseButton,
          styles.primaryButton,
          size === "large" && styles.largeButton,
          pressed && styles.primaryPressed,
          disabled && styles.disabled,
          style,
        ];
    }
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
      style={({ pressed }) => getButtonStyle(pressed)}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? "#080B0B" : "#BAFF42"} />
      ) : (
        <Text style={[styles.baseText, getTextStyle()]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 52,
    borderRadius: radius.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  largeButton: {
    height: 56,
    borderRadius: radius["2xl"],
  },
  primaryButton: {
    backgroundColor: "#BAFF42",
  },
  primaryPressed: {
    backgroundColor: "#A8EB35",
  },
  secondaryButton: {
    backgroundColor: "#1E2523",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  secondaryPressed: {
    backgroundColor: "#28322F",
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
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    letterSpacing: 0.2,
  },
  primaryText: {
    color: "#080B0B",
  },
  secondaryText: {
    color: "#F6F8F6",
  },
  outlineText: {
    color: "#F6F8F6",
  },
  ghostText: {
    color: "#ADB8B0",
  },
});
