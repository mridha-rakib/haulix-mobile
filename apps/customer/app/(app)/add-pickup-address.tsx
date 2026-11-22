import { colors, fontFamily, radius } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { C17CheckIcon } from "../../src/components/discovery/C17Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  C17A_DEMO_CONSTANTS,
  type C17AFormData,
  type C17AFormErrors,
  getC17AInitialValues,
} from "../../src/fixtures/c17aAddAddress";
import { C17_DEFAULT_SAVED_ADDRESSES } from "../../src/fixtures/c17PickupAddress";

/**
 * Custom hook to manage customer profile data with locale isolation
 */
function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  const [prevLocale, setPrevLocale] = useState(locale);

  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setProfile(getC10DemoProfile(locale));
  }

  useEffect(() => {
    let isMounted = true;
    loadProfileEdits(locale).then(() => {
      if (isMounted) {
        setProfile(getC10DemoProfile(locale));
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  useEffect(() => {
    return subscribeToProfileEdits(() => {
      setProfile(getC10DemoProfile(locale));
    });
  }, [locale]);

  return profile;
}

/**
 * Custom hook for Android hardware back button
 */
function useHardwareBack(onBack: () => void) {
  useEffect(() => {
    const onBackPress = () => {
      onBack();
      return true;
    };
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [onBack]);
}

function isArizona(state: string): boolean {
  const s = state.trim().toLowerCase();
  return s === "arizona" || s === "az";
}

function isValidZip(zip: string): boolean {
  return /^\d{5}$/.test(zip.trim());
}

/**
 * Pure validation helper for C17-A input format checks
 */
function validateC17AInputs(
  formData: C17AFormData,
  t: (key: string) => string
): { isValid: boolean; errors: C17AFormErrors } {
  const errors: C17AFormErrors = {
    label: null,
    street: null,
    city: null,
    state: null,
    zipCode: null,
    pickupNotes: null,
  };

  if (!formData.label.trim()) {
    errors.label = t("c17a.errorLabelRequired") || "Address label is required.";
  }

  if (!formData.street.trim()) {
    errors.street = t("c17a.errorStreetRequired") || "Street address is required.";
  }

  if (!formData.city.trim()) {
    errors.city = t("c17a.errorCityRequired") || "City is required.";
  }

  if (!isArizona(formData.state)) {
    errors.state = t("c17a.errorStateArizonaOnly") || "Service is currently restricted to Arizona.";
  }

  if (!formData.zipCode.trim()) {
    errors.zipCode = t("c17a.errorZipRequired") || "ZIP code is required.";
  } else if (!isValidZip(formData.zipCode)) {
    errors.zipCode = t("c17a.errorZipInvalid") || "Please enter a valid 5-digit US ZIP code.";
  }

  if (formData.pickupNotes && formData.pickupNotes.length > 200) {
    errors.pickupNotes =
      t("c17a.errorNotesTooLong") || "Pickup notes cannot exceed 200 characters.";
  }

  const isValid = !Object.values(errors).some(Boolean);
  return { isValid, errors };
}

/**
 * Notice Banner for C17-A demonstration disclosures
 */
function C17ANoticeBanner({
  message,
  onDismiss,
  dismissLabel = "Dismiss",
}: {
  message: string;
  onDismiss: () => void;
  dismissLabel?: string;
}) {
  return (
    <View
      testID="c17a-notice-banner"
      style={styles.noticeBanner}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <View style={styles.noticeContent}>
        <View style={styles.noticeDot} />
        <Text style={styles.noticeText}>{message}</Text>
      </View>
      <Pressable
        testID="c17a-notice-dismiss"
        style={styles.noticeDismissButton}
        onPress={onDismiss}
        accessibilityRole="button"
        accessibilityLabel={dismissLabel}
      >
        <Text style={styles.noticeDismissText}>{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Step Indicator chip
 */
function C17AStepChip({ indicator, sub }: { indicator: string; sub: string }) {
  return (
    <View style={styles.stepChipContainer}>
      <Text style={styles.stepChipBrand}>{indicator}</Text>
      <Text style={styles.stepChipSub}>{sub}</Text>
    </View>
  );
}

/**
 * Screen Heading and Subtitle
 */
function C17AHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.headingContainer}>
      <Text style={styles.headingTitle}>{title}</Text>
      <Text style={styles.headingSubtitle}>{subtitle}</Text>
    </View>
  );
}

/**
 * Customer booking context chip
 */
function C17ACustomerChip({ contextText }: { contextText: string }) {
  return (
    <View style={styles.customerChipContainer}>
      <C17CheckIcon size={17} color={colors.brand} />
      <Text style={styles.customerChipText}>{contextText}</Text>
    </View>
  );
}

/**
 * Individual input field container with label, focus styling, and inline validation error
 */
function C17AInputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  testID,
  keyboardType = "default",
  autoComplete,
  multiline = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string | null;
  testID: string;
  keyboardType?: "default" | "numeric" | "number-pad";
  autoComplete?: "street-address";
  multiline?: boolean;
  maxLength?: number;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = useId();

  return (
    <View style={styles.fieldOuter}>
      <View
        style={[
          styles.fieldContainer,
          multiline && styles.fieldContainerMultiline,
          isFocused && styles.fieldContainerFocused,
          error ? styles.fieldContainerError : undefined,
        ]}
      >
        <Text nativeID={`${inputId}-label`} style={styles.fieldLabel}>
          {label}
        </Text>
        <TextInput
          testID={testID}
          style={[styles.fieldInput, multiline && styles.fieldInputMultiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#606D67"
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          multiline={multiline}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={label}
          aria-labelledby={`${inputId}-label`}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
      </View>
      {error && (
        <Text style={styles.fieldErrorText} testID={`${testID}-error`}>
          {error}
        </Text>
      )}
    </View>
  );
}

/**
 * New Location Form Card
 */
function C17ANewLocationSection({
  formData,
  errors,
  onChangeField,
  t,
}: {
  formData: C17AFormData;
  errors: C17AFormErrors;
  onChangeField: (field: keyof C17AFormData, value: string) => void;
  t: (key: string) => string;
}) {
  return (
    <View style={styles.sectionCard} testID="c17a-form-card">
      <Text style={styles.sectionTitle}>{t("c17a.newLocationSection") || "New location"}</Text>

      <C17AInputField
        testID="c17a-input-label"
        label={t("c17a.labelAddressLabel") || "Address label"}
        value={formData.label}
        onChangeText={(text) => onChangeField("label", text)}
        placeholder={t("c17a.placeholderAddressLabel") || "Storage unit"}
        error={errors.label}
      />

      <C17AInputField
        testID="c17a-input-street"
        label={t("c17a.labelStreet") || "Street"}
        value={formData.street}
        onChangeText={(text) => onChangeField("street", text)}
        placeholder={t("c17a.placeholderStreet") || "4100 N 24th Street"}
        error={errors.street}
        autoComplete="street-address"
      />

      <C17AInputField
        testID="c17a-input-city"
        label={t("c17a.labelCity") || "City"}
        value={formData.city}
        onChangeText={(text) => onChangeField("city", text)}
        placeholder={t("c17a.placeholderCity") || "Phoenix"}
        error={errors.city}
      />

      <C17AInputField
        testID="c17a-input-state"
        label={t("c17a.labelState") || "State"}
        value={formData.state}
        onChangeText={(text) => onChangeField("state", text)}
        placeholder={t("c17a.placeholderState") || "Arizona"}
        error={errors.state}
      />

      <C17AInputField
        testID="c17a-input-zip"
        label={t("c17a.labelZipCode") || "ZIP code"}
        value={formData.zipCode}
        onChangeText={(text) => onChangeField("zipCode", text)}
        placeholder={t("c17a.placeholderZipCode") || "85016"}
        error={errors.zipCode}
        keyboardType="numeric"
        maxLength={5}
      />

      <C17AInputField
        testID="c17a-input-notes"
        label={t("c17a.labelPickupNotes") || "Pickup notes"}
        value={formData.pickupNotes}
        onChangeText={(text) => onChangeField("pickupNotes", text)}
        placeholder={
          t("c17a.placeholderPickupNotes") || "Gate code provided to assigned driver only"
        }
        error={errors.pickupNotes}
        multiline
        maxLength={200}
      />
    </View>
  );
}

/**
 * Form Validation section card
 */
function C17AValidationSection({
  title,
  badgeText,
  guidance1,
  guidance2,
}: {
  title: string;
  badgeText: string;
  guidance1: string;
  guidance2: string;
}) {
  return (
    <View style={styles.validationCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.validationBadge}>
        <C17CheckIcon size={16} color="#ADB7B1" />
        <Text style={styles.validationBadgeText}>{badgeText}</Text>
      </View>
      <Text style={styles.validationBodyText}>{guidance1}</Text>
      <Text style={styles.validationBodyText}>{guidance2}</Text>
    </View>
  );
}

/**
 * Action CTAs: Validate new address & Keep home as pickup
 */
function C17AActions({
  onValidate,
  onKeepHome,
  validateLabel,
  keepHomeLabel,
}: {
  onValidate: () => void;
  onKeepHome: () => void;
  validateLabel: string;
  keepHomeLabel: string;
}) {
  return (
    <View style={styles.actionsContainer}>
      <Pressable
        testID="c17a-validate-btn"
        style={styles.primaryButton}
        onPress={onValidate}
        accessibilityRole="button"
        accessibilityLabel={validateLabel}
      >
        <Text style={styles.primaryButtonText}>{validateLabel}</Text>
      </Pressable>

      <Pressable
        testID="c17a-keep-home-btn"
        style={styles.secondaryButton}
        onPress={onKeepHome}
        accessibilityRole="button"
        accessibilityLabel={keepHomeLabel}
      >
        <Text style={styles.secondaryButtonText}>{keepHomeLabel}</Text>
      </Pressable>
    </View>
  );
}

/**
 * Footer demo disclaimer
 */
function C17AFooter({ demoText, srsText }: { demoText: string; srsText: string }) {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{demoText}</Text>
      <Text style={styles.footerText}>{srsText}</Text>
    </View>
  );
}

const DEFAULT_BOOKING_ID = C17A_DEMO_CONSTANTS.defaultBookingId;

/**
 * Custom hook to encapsulate C17-A form state, validation, and notice disclosures
 */
function useC17AForm(
  currentLocale: "en" | "es",
  t: (key: string) => string,
  onValidateSuccess?: (data: C17AFormData) => void,
  initialDraft?: Partial<C17AFormData>
) {
  const [formData, setFormData] = useState<C17AFormData>(() => {
    const base = getC17AInitialValues(currentLocale);
    return {
      label: initialDraft?.label ?? base.label,
      street: initialDraft?.street ?? base.street,
      city: initialDraft?.city ?? base.city,
      state: initialDraft?.state ?? base.state,
      zipCode: initialDraft?.zipCode ?? base.zipCode,
      pickupNotes: initialDraft?.pickupNotes ?? base.pickupNotes,
    };
  });
  const [prevLocale, setPrevLocale] = useState(currentLocale);
  const [errors, setErrors] = useState<C17AFormErrors>({
    label: null,
    street: null,
    city: null,
    state: null,
    zipCode: null,
    pickupNotes: null,
  });
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  if (currentLocale !== prevLocale) {
    setPrevLocale(currentLocale);
    setFormData(getC17AInitialValues(currentLocale));
    setErrors({
      label: null,
      street: null,
      city: null,
      state: null,
      zipCode: null,
      pickupNotes: null,
    });
    setNoticeMessage(null);
  }

  const handleFieldChange = useCallback((field: keyof C17AFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const { isValid, errors: validationErrors } = validateC17AInputs(formData, t);
    setErrors(validationErrors);
    return isValid;
  }, [formData, t]);

  const handleValidateNewAddress = useCallback(() => {
    if (!validateForm()) {
      return;
    }
    if (onValidateSuccess) {
      onValidateSuccess(formData);
      return;
    }
    setNoticeMessage(
      t("c17a.noticeValidationNotConnected") ||
        "Demonstration mode: Address validation (C17-V) is scheduled for an upcoming phase. Your entered details have been preserved as an unsaved draft."
    );
  }, [validateForm, onValidateSuccess, formData, t]);

  const dismissNotice = useCallback(() => setNoticeMessage(null), []);

  return {
    formData,
    errors,
    noticeMessage,
    handleFieldChange,
    handleValidateNewAddress,
    dismissNotice,
  };
}

/**
 * C17-A Add New Pickup Address Screen
 *
 * Authoritative Figma: Node 382:645 (EN) & Node 974:9497 (ES)
 * Frame: 430 × 1334 px
 * File: Q946h4YBGgyLsjnPtdyQNe
 */
export default function AddPickupAddressScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLocale = getCurrentLocale();
  const params = useLocalSearchParams<{
    service?: string;
    selectedAddressId?: string;
    label?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    pickupNotes?: string;
  }>();

  // Dynamic customer profile (Sarah Mitchell for EN / Bryan Lopez for ES)
  const profile = useCustomerProfile(currentLocale);

  const initialDraft = useMemo(() => {
    if (
      params.label !== undefined ||
      params.street !== undefined ||
      params.city !== undefined ||
      params.state !== undefined ||
      params.zipCode !== undefined ||
      params.pickupNotes !== undefined
    ) {
      return {
        label: params.label,
        street: params.street,
        city: params.city,
        state: params.state,
        zipCode: params.zipCode,
        pickupNotes: params.pickupNotes,
      };
    }
    return undefined;
  }, [params.label, params.street, params.city, params.state, params.zipCode, params.pickupNotes]);

  const handleNavigateToValidation = useCallback(
    (draft: C17AFormData) => {
      router.push({
        pathname: "/pickup-address-validation",
        params: {
          service: params.service,
          selectedAddressId: params.selectedAddressId,
          label: draft.label,
          street: draft.street,
          city: draft.city,
          state: draft.state,
          zipCode: draft.zipCode,
          pickupNotes: draft.pickupNotes,
        },
      });
    },
    [router, params.service, params.selectedAddressId]
  );

  // Form State & validation encapsulation
  const {
    formData,
    errors,
    noticeMessage,
    handleFieldChange,
    handleValidateNewAddress,
    dismissNotice,
  } = useC17AForm(currentLocale, t, handleNavigateToValidation, initialDraft);

  // Back navigation: returns to C17 preserving query params
  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/pickup-address",
        params: {
          service: params.service,
          selectedAddressId: params.selectedAddressId || C17_DEFAULT_SAVED_ADDRESSES[0].id,
        },
      });
    }
  }, [router, params.service, params.selectedAddressId]);

  // Hardware back handling on Android
  useHardwareBack(handleBack);

  // Keep home as pickup CTA
  const handleKeepHome = useCallback(() => {
    router.replace({
      pathname: "/pickup-address",
      params: {
        service: params.service,
        selectedAddressId: C17_DEFAULT_SAVED_ADDRESSES[0].id,
      },
    });
  }, [router, params.service]);

  const customerChipText = useMemo(() => {
    const template = t("c17a.customerContext") || "{{name}} · {{bookingId}}";
    return template
      .replace("{{name}}", profile.name.toUpperCase())
      .replace("{{bookingId}}", DEFAULT_BOOKING_ID);
  }, [t, profile.name]);

  const firstName =
    profile.name.trim().split(" ")[0] || (currentLocale === "es" ? "Bryan" : "Sarah");
  const customerName = currentLocale === "es" ? profile.name : firstName;
  const validationGuidance2 = useMemo(() => {
    const template =
      t("c17a.validationGuidance2") ||
      (currentLocale === "es"
        ? "{{bookingId}} conserva la dirección habitual de {{name}}."
        : "Existing booking {{bookingId}} remains at {{name}}'s default address.");
    return template.replace("{{bookingId}}", DEFAULT_BOOKING_ID).replace("{{name}}", customerName);
  }, [t, currentLocale, customerName]);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
      <FlowHeaderBack
        testID="c17a-header-back"
        onBack={handleBack}
        backA11y={t("c17a.backA11y") || "Back to pickup address selection"}
      />

      {noticeMessage && (
        <View style={styles.noticeContainer}>
          <C17ANoticeBanner
            message={noticeMessage}
            onDismiss={dismissNotice}
            dismissLabel={t("c17a.noticeDismiss") || "Dismiss"}
          />
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          testID="c17a-screen"
        >
          {/* 1. Step Indicator */}
          <C17AStepChip
            indicator={t("c17a.stepIndicator") || C17A_DEMO_CONSTANTS.stepIndicator}
            sub={t("c17a.stepSub") || C17A_DEMO_CONSTANTS.stepSub}
          />

          {/* 2. Heading */}
          <C17AHeading
            title={t("c17a.title") || C17A_DEMO_CONSTANTS.title}
            subtitle={t("c17a.subtitle") || C17A_DEMO_CONSTANTS.subtitle}
          />

          {/* 3. Customer Booking context chip */}
          <C17ACustomerChip contextText={customerChipText} />

          {/* 4. New Location Section Card */}
          <C17ANewLocationSection
            formData={formData}
            errors={errors}
            onChangeField={handleFieldChange}
            t={t}
          />

          {/* 5. Validation Required Section Card */}
          <C17AValidationSection
            title={t("c17a.validationSectionTitle") || "Validation required"}
            badgeText={t("c17a.validationBadge") || "Service information"}
            guidance1={
              t("c17a.validationGuidance1") ||
              "Demonstration address — not a verified delivery location."
            }
            guidance2={validationGuidance2}
          />

          {/* 6. Actions */}
          <C17AActions
            onValidate={handleValidateNewAddress}
            onKeepHome={handleKeepHome}
            validateLabel={t("c17a.validateNewAddressCta") || "Validate new address"}
            keepHomeLabel={t("c17a.keepHomeCta") || "Keep home as pickup   ›"}
          />

          {/* 7. Footer */}
          <C17AFooter
            demoText={t("c17a.footerDemo") || C17A_DEMO_CONSTANTS.demoDisclaimer}
            srsText={t("c17a.footerSrs") || C17A_DEMO_CONSTANTS.srsFooter}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // #080B0B
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  noticeContainer: {
    paddingHorizontal: 22,
    paddingBottom: 8,
  },
  noticeBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1A2510",
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
  },
  noticeContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noticeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  noticeText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primaryText,
    flex: 1,
    lineHeight: 16,
  },
  noticeDismissButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radius.md,
    backgroundColor: colors.elevated,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  stepChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface, // #151A19
    borderRadius: 9,
    paddingHorizontal: 12,
    height: 33,
    gap: 7,
    alignSelf: "flex-start",
  },
  stepChipBrand: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand, // #BAFF42
    letterSpacing: 0.5,
  },
  stepChipSub: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.secondaryText, // #ADB7B1
  },
  headingContainer: {
    gap: 8,
  },
  headingTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    color: colors.primaryText, // #F6F8F6
    letterSpacing: -0.5,
  },
  headingSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText, // #ADB7B1
    lineHeight: 17,
  },
  customerChipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A2510",
    borderRadius: 9,
    paddingVertical: 9,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(45, 53, 51, 0.4)",
    alignSelf: "flex-start",
  },
  customerChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.4,
  },
  sectionCard: {
    backgroundColor: colors.surface, // #151A19
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#222827",
    padding: 16,
    gap: 13,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.primaryText,
  },
  fieldOuter: {
    gap: 4,
  },
  fieldContainer: {
    backgroundColor: colors.elevated, // #222827
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#35403B",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 64,
    justifyContent: "center",
  },
  fieldContainerMultiline: {
    minHeight: 80,
  },
  fieldContainerFocused: {
    borderColor: colors.brand,
  },
  fieldContainerError: {
    borderColor: "#FF6B6B",
  },
  fieldLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
    marginBottom: 2,
  },
  fieldInput: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
    padding: 0,
    margin: 0,
  },
  fieldInputMultiline: {
    minHeight: 36,
    textAlignVertical: "top",
  },
  fieldErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#FF6B6B",
    paddingHorizontal: 4,
  },
  validationCard: {
    backgroundColor: colors.surface, // #151A19
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#222827",
    padding: 16,
    gap: 11,
  },
  validationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.elevated, // #222827
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 8,
    alignSelf: "flex-start",
  },
  validationBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
  },
  validationBodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  actionsContainer: {
    gap: 11,
    marginTop: 4,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: "#080B0B",
  },
  secondaryButton: {
    height: 52,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerContainer: {
    gap: 6,
    paddingTop: 8,
    alignItems: "center",
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
    textAlign: "center",
  },
});
