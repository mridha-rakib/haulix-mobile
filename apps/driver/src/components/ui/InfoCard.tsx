import { radius, spacing } from "@haulix/design-tokens";
import type React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ShieldIcon } from "../icons/DriverIcons";

export interface InfoCardProps {
  title: string;
  description?: string;
  body?: string;
  icon?: React.ReactNode;
  variant?: "elevated" | "surface" | "accent" | "highlight" | "neutral";
}

export function InfoCard({ title, description, body, icon, variant = "surface" }: InfoCardProps) {
  const contentText = body ?? description ?? "";

  const getBackgroundColor = () => {
    switch (variant) {
      case "highlight":
      case "accent":
        return "#1D2320";
      case "neutral":
      case "elevated":
        return "#18201D";
      default:
        return "#151A19";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.iconContainer}>{icon ?? <ShieldIcon size={22} color="#BAFF42" />}</View>

      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            (variant === "accent" || variant === "highlight") && styles.titleAccent,
          ]}
        >
          {title}
        </Text>
        {contentText ? <Text style={styles.description}>{contentText}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    padding: spacing[3],
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#35403B",
    marginVertical: spacing[2],
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[3],
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#F6F8F6",
    marginBottom: 2,
  },
  titleAccent: {
    color: "#BAFF42",
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "#ADB8B0",
  },
});
