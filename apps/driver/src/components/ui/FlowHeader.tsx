import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import type React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChevronLeftIcon } from "../icons/DriverIcons";

interface FlowHeaderProps {
  title: string;
  subtitle?: string;
  step?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightElement?: React.ReactNode;
}

export function FlowHeader({
  title,
  subtitle,
  step,
  onBack,
  showBack = true,
  rightElement,
}: FlowHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ChevronLeftIcon size={24} color="#F6F8F6" />
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {rightElement ? (
          <View style={styles.rightContainer}>{rightElement}</View>
        ) : step ? (
          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[4],
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: "rgba(23, 35, 28, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backPlaceholder: {
    width: 44,
  },
  title: {
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#F6F8F6",
    textAlign: "left",
    marginLeft: spacing[2],
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
    marginTop: spacing[1],
    paddingLeft: spacing[1],
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  stepBadge: {
    backgroundColor: "#1A221E",
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  stepText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#BAFF42",
  },
});
