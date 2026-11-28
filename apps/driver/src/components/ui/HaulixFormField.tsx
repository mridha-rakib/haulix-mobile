import { radius, spacing } from "@haulix/design-tokens";
import type React from "react";
import { useState } from "react";
import {
  type KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { EyeIcon, EyeOffIcon } from "../icons/DriverIcons";

interface HaulixFormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  editable?: boolean;
  rightAction?: React.ReactNode;
}

export function HaulixFormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  isPassword = false,
  keyboardType = "default",
  autoCapitalize = "none",
  editable = true,
  rightAction,
}: HaulixFormFieldProps) {
  const isSecure = secureTextEntry || isPassword;
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isSecure);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          isFocused && styles.containerFocused,
          Boolean(error) && styles.containerError,
        ]}
      >
        <Text style={styles.label}>{label}</Text>

        <View style={styles.inputRow}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#ADB8B0"
            secureTextEntry={isSecure && !showPassword}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={editable}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.input}
          />

          {isSecure ? (
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {showPassword ? (
                <EyeOffIcon size={20} color="#ADB8B0" />
              ) : (
                <EyeIcon size={20} color="#ADB8B0" />
              )}
            </Pressable>
          ) : rightAction ? (
            <View style={styles.eyeButton}>{rightAction}</View>
          ) : null}
        </View>
      </View>

      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing[3],
  },
  container: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    borderWidth: 1,
    borderColor: "#35403B",
  },
  containerFocused: {
    borderColor: "#BAFF42",
  },
  containerError: {
    borderColor: "#EF4444",
  },
  label: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#F6F8F6",
    marginBottom: spacing[1],
    letterSpacing: 0.3,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "#F6F8F6",
    paddingVertical: spacing[1],
  },
  eyeButton: {
    paddingLeft: spacing[2],
  },
  errorText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#EF4444",
    marginTop: spacing[1],
    paddingLeft: spacing[2],
  },
});
