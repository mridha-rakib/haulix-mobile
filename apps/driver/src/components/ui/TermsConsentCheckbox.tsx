import { radius, spacing } from "@haulix/design-tokens";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckmarkIcon } from "../icons/DriverIcons";

interface TermsConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  subtitle?: string;
  error?: string;
}

export function TermsConsentCheckbox({
  checked,
  onChange,
  title,
  subtitle,
  error,
}: TermsConsentCheckboxProps) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => onChange(!checked)}
        style={[
          styles.container,
          checked && styles.containerChecked,
          error ? styles.containerError : null,
        ]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <CheckmarkIcon size={14} color="#080B0B" />}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: spacing[2],
  },
  container: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[3],
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  containerChecked: {
    borderColor: "#BAFF42",
    backgroundColor: "#1A221E",
  },
  containerError: {
    borderColor: "#FF6B6B",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[3],
    marginTop: 2,
    backgroundColor: "#0D1111",
  },
  checkboxChecked: {
    backgroundColor: "#BAFF42",
    borderColor: "#BAFF42",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    lineHeight: 18,
    color: "#F6F8F6",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 15,
    color: "#8E9E99",
    marginTop: 2,
  },
  errorText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: 4,
    marginLeft: spacing[1],
  },
});
