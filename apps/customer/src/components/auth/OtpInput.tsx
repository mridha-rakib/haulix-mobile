import { colors, fontFamily, radius } from "@haulix/design-tokens";
import type React from "react";
import { useRef, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewStyle,
} from "react-native";

export interface OtpInputProps {
  value: string;
  onChange: (code: string) => void;
  length?: number;
  hasError?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
  style?: ViewStyle;
}

/**
 * Accessible 6-digit numeric OTP Input
 *
 * Source: Figma node 331:75 (C08 Phone Verification / Default)
 * - Reference geometry: 6 slots, each 50×58 px, 8px gap (340px total).
 * - Single logical numeric TextInput visually projected into 6 slot boxes.
 * - Masked digit representation consistent with Figma bullet dot motif (•).
 * - Empty slots show muted placeholder dots matching Figma visual default.
 * - Active / first slot at rest has lime outline (#BAFF42).
 * - Never logs or persists entered codes.
 */
export function OtpInput({
  value,
  onChange,
  length = 6,
  hasError = false,
  accessibilityLabel = "Six-digit verification code",
  accessibilityHint = "Enter the 6-digit code received via SMS",
  testID = "otp-input",
  style,
}: OtpInputProps) {
  const inputRef = useRef<React.ElementRef<typeof TextInput>>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (rawText: string) => {
    // Only accept numeric digits 0-9, up to length
    const numeric = rawText.replace(/[^0-9]/g, "").slice(0, length);
    onChange(numeric);
  };

  const handlePress = () => {
    inputRef.current?.focus();
  };

  // The active slot is either the current typed length (next unfilled slot),
  // or the last slot if all digits are entered.
  // At rest (unfocused & empty), slot 0 has the lime border per Figma default.
  const activeSlotIndex = isFocused
    ? Math.min(value.length, length - 1)
    : value.length === 0
      ? 0
      : -1;

  const slots = Array.from({ length }, (_, i) => i);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, style]}
      testID={testID}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityValue={{ text: `${value.length} of ${length} digits entered` }}
    >
      {/* Hidden single logical native numeric TextInput */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        style={styles.hiddenInput}
        caretHidden={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        testID={`${testID}-native-input`}
        accessibilityElementsHidden={true}
        importantForAccessibility="no"
      />

      {/* Visually projected 6 individual slot boxes */}
      <View style={styles.slotsRow}>
        {slots.map((slotIndex) => {
          const hasDigit = slotIndex < value.length;
          const isActive = slotIndex === activeSlotIndex;

          return (
            <View
              key={slotIndex}
              testID={`${testID}-slot-${slotIndex}`}
              style={[styles.slot, isActive && styles.slotActive, hasError && styles.slotError]}
            >
              <Text
                style={[
                  styles.slotDot,
                  hasDigit ? styles.slotDotEntered : styles.slotDotPlaceholder,
                ]}
              >
                {"\u2022"}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    position: "relative",
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    zIndex: 2,
  },
  slotsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 6,
  },
  slot: {
    flex: 1,
    maxWidth: 50,
    aspectRatio: 50 / 58,
    borderRadius: radius.xl, // 12px
    backgroundColor: colors.elevated, // #222827
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  slotActive: {
    borderWidth: 2,
    borderColor: colors.brand, // #BAFF42
  },
  slotError: {
    borderColor: colors.error,
  },
  slotDot: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    includeFontPadding: false,
  },
  slotDotEntered: {
    color: colors.primaryText, // #F6F8F6
  },
  slotDotPlaceholder: {
    color: "#4E5A54", // Muted placeholder dot matching Figma visual baseline
  },
});
