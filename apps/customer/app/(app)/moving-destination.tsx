import { colors, fontFamily, radius } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	BackHandler,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	C17DReviewCheckIcon,
	C17VCheckIcon,
} from "../../src/components/discovery/C17Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
	C15_SERVICES,
	type C15ServiceId,
} from "../../src/fixtures/c15Services";
import {
	C17D_DEFAULT_DESTINATION,
	C17D_DEMO_CONSTANTS,
} from "../../src/fixtures/c17dMovingDestination";
import { C17_DEFAULT_SAVED_ADDRESSES } from "../../src/fixtures/c17PickupAddress";

export interface C17DParams {
	service?: string;
	selectedAddressId?: string;
	pickupAddress?: string;
	destinationAddress?: string;
	destinationCityStateZip?: string;
	destinationType?: string;
	elevator?: string;
}

interface ServiceState {
	isMoving: boolean;
	isUnsupported: boolean;
	serviceName: string;
}

interface DestinationValues {
	dropoff: string;
	cityStateZip: string;
	destType: string;
	elevator: string;
}

const C17D_FALLBACKS = {
	stepIndicator: C17D_DEMO_CONSTANTS.stepIndicator,
	stepSub: C17D_DEMO_CONSTANTS.stepSub,
	title: C17D_DEMO_CONSTANTS.title,
	subtitle: C17D_DEMO_CONSTANTS.subtitle,
	pickupTitle: C17D_DEMO_CONSTANTS.pickupTitle,
	originLabel: C17D_DEMO_CONSTANTS.originLabel,
	destTitle: C17D_DEMO_CONSTANTS.destinationTitle,
	dropoffLabel: C17D_DEMO_CONSTANTS.dropoffAddressLabel,
	cityStateZipLabel: C17D_DEMO_CONSTANTS.cityStateZipLabel,
	destTypeLabel: C17D_DEMO_CONSTANTS.destinationTypeLabel,
	elevatorLabel: C17D_DEMO_CONSTANTS.elevatorLabel,
	safetyTitle: C17D_DEMO_CONSTANTS.safetyTitle,
	reviewBadge: C17D_DEMO_CONSTANTS.reviewRequiredBadge,
	safetyDesc: C17D_DEMO_CONSTANTS.safetyDescription,
	continueCta: C17D_DEMO_CONSTANTS.continueCta,
	returnCta: C17D_DEMO_CONSTANTS.returnPickupCta,
	demoFooter: C17D_DEMO_CONSTANTS.footerNoticeDemo,
	srsFooter: C17D_DEMO_CONSTANTS.footerNoticeSrs,
	dismiss: "Dismiss",
};

const KEYS: [keyof typeof C17D_FALLBACKS, string][] = [
	["stepIndicator", "c17d.stepIndicator"],
	["stepSub", "c17d.stepSub"],
	["title", "c17d.title"],
	["subtitle", "c17d.subtitle"],
	["pickupTitle", "c17d.pickupSectionTitle"],
	["originLabel", "c17d.labelOrigin"],
	["destTitle", "c17d.destinationSectionTitle"],
	["dropoffLabel", "c17d.labelDropoffAddress"],
	["cityStateZipLabel", "c17d.labelCityStateZip"],
	["destTypeLabel", "c17d.labelDestinationType"],
	["elevatorLabel", "c17d.labelElevator"],
	["safetyTitle", "c17d.safetySectionTitle"],
	["reviewBadge", "c17d.reviewRequiredBadge"],
	["safetyDesc", "c17d.safetyDescription"],
	["continueCta", "c17d.continueCta"],
	["returnCta", "c17d.returnPickupCta"],
	["demoFooter", "c17d.footerDemo"],
	["srsFooter", "c17d.footerSrs"],
	["dismiss", "c17d.noticeDismiss"],
];

function useC17DStrings(t: (key: string) => string): typeof C17D_FALLBACKS {
	return useMemo(() => {
		const res: Record<string, string> = { ...C17D_FALLBACKS };
		for (let i = 0; i < KEYS.length; i++) {
			const [field, i18nKey] = KEYS[i];
			const val = t(i18nKey);
			if (val) {
				res[field] = val;
			}
		}
		return res as typeof C17D_FALLBACKS;
	}, [t]);
}

function resolveServiceState(rawService?: string): ServiceState {
	const serviceId = rawService || "moving";
	const valid = C15_SERVICES.find((s) => s.id === (serviceId as C15ServiceId));
	if (!valid) {
		return { isMoving: false, isUnsupported: true, serviceName: serviceId };
	}
	return {
		isMoving: valid.id === "moving",
		isUnsupported: false,
		serviceName: valid.name,
	};
}

function resolveOriginAddress(
	pickupAddress?: string,
	selectedAddressId?: string,
): string {
	if (pickupAddress) {
		return pickupAddress;
	}
	const matched = C17_DEFAULT_SAVED_ADDRESSES.find(
		(addr) => addr.id === selectedAddressId,
	);
	return matched
		? matched.fullAddress
		: C17_DEFAULT_SAVED_ADDRESSES[0].fullAddress;
}

function resolveCustomerChipText(
	template: string,
	profileName: string,
	locale: string,
): string {
	const name =
		locale === "es" && profileName === "Bryan Lopez"
			? "BRYAN LOPEZ MENDOZA"
			: profileName.toUpperCase();
	return template
		.replace("{{name}}", name)
		.replace("{{bookingId}}", C17D_DEMO_CONSTANTS.defaultBookingId);
}

function resolveInitialNotice(
	serviceState: ServiceState,
	t: (key: string) => string,
): string | null {
	if (serviceState.isUnsupported) {
		const template =
			t("c17d.noticeUnsupportedService") ||
			'The requested service "{{service}}" is not recognized. Moving drop-off requires an approved service.';
		return template.replace("{{service}}", serviceState.serviceName);
	}
	if (!serviceState.isMoving) {
		const template =
			t("c17d.noticeNonMoving") ||
			"Drop-off destinations only apply to Moving services. You currently have {{service}} selected. This screen displays an illustrative Moving drop-off preview without altering your active booking.";
		return template.replace("{{service}}", serviceState.serviceName);
	}
	return null;
}

function resolveDestinationValues(
	params: C17DParams,
	t: (key: string) => string,
): DestinationValues {
	return {
		dropoff:
			params.destinationAddress ||
			t("c17d.dropoffAddressValue") ||
			C17D_DEFAULT_DESTINATION.dropoffAddress,
		cityStateZip:
			params.destinationCityStateZip ||
			t("c17d.cityStateZipValue") ||
			C17D_DEFAULT_DESTINATION.cityStateZip,
		destType:
			params.destinationType ||
			t("c17d.destinationTypeValue") ||
			C17D_DEFAULT_DESTINATION.destinationType,
		elevator:
			params.elevator ||
			t("c17d.elevatorValue") ||
			C17D_DEFAULT_DESTINATION.elevator,
	};
}

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

		const unsubscribe = subscribeToProfileEdits(() => {
			if (isMounted) {
				setProfile(getC10DemoProfile(locale));
			}
		});

		return () => {
			isMounted = false;
			unsubscribe();
		};
	}, [locale]);

	return profile;
}

function useHardwareBack(onBack: () => void) {
	useEffect(() => {
		if (Platform.OS !== "android") return;
		const subscription = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				onBack();
				return true;
			},
		);
		return () => subscription.remove();
	}, [onBack]);
}

/**
 * 1. Step Indicator Chip
 * W02 · SERVICE DISCOVERY & INTAKE / C17-D
 */
function C17DStepChip({ indicator, sub }: { indicator: string; sub: string }) {
	return (
		<View style={styles.stepChip} accessibilityRole="text">
			<Text style={styles.stepChipIndicator}>{indicator}</Text>
			<Text style={styles.stepChipSub}>{sub}</Text>
		</View>
	);
}

/**
 * 2. Heading Section
 */
function C17DHeading({ title, subtitle }: { title: string; subtitle: string }) {
	return (
		<View style={styles.headingContainer}>
			<Text style={styles.titleText}>{title}</Text>
			<Text style={styles.subtitleText}>{subtitle}</Text>
		</View>
	);
}

/**
 * 3. Customer Booking Context Chip
 */
function C17DCustomerChip({ contextText }: { contextText: string }) {
	return (
		<View
			style={styles.customerChip}
			accessibilityRole="text"
			accessibilityLabel={`Customer: ${contextText}`}
			testID="c17d-customer-chip"
		>
			<C17VCheckIcon size={17} color={colors.brand} />
			<Text style={styles.customerChipText}>{contextText}</Text>
		</View>
	);
}

/**
 * 4. Non-Moving Guard / Preview Notice Banner
 */
function C17DNoticeBanner({
	message,
	onDismiss,
	dismissLabel,
}: {
	message: string;
	onDismiss: () => void;
	dismissLabel: string;
}) {
	return (
		<View style={styles.noticeContainer} testID="c17d-nonmoving-guard">
			<Text style={styles.noticeText}>{message}</Text>
			<Pressable
				onPress={onDismiss}
				style={styles.noticeDismissBtn}
				accessibilityRole="button"
				accessibilityLabel={dismissLabel}
			>
				<Text style={styles.noticeDismissText}>{dismissLabel}</Text>
			</Pressable>
		</View>
	);
}

/**
 * 5. Section A — Pickup
 */
function C17DPickupSection({
	title,
	originLabel,
	originAddress,
}: {
	title: string;
	originLabel: string;
	originAddress: string;
}) {
	return (
		<View style={styles.card} testID="c17d-pickup-section">
			<Text style={styles.cardHeading}>{title}</Text>
			<View style={styles.detailRow} testID="c17d-origin-row">
				<Text style={styles.detailLabel}>{originLabel}</Text>
				<Text style={styles.detailValue} testID="c17d-origin-value">
					{originAddress}
				</Text>
			</View>
		</View>
	);
}

/**
 * 6. Section B — Destination
 */
function C17DDestinationSection({
	title,
	dropoffLabel,
	cityStateZipLabel,
	destTypeLabel,
	elevatorLabel,
	values,
}: {
	title: string;
	dropoffLabel: string;
	cityStateZipLabel: string;
	destTypeLabel: string;
	elevatorLabel: string;
	values: DestinationValues;
}) {
	return (
		<View style={styles.card} testID="c17d-destination-section">
			<Text style={styles.cardHeading}>{title}</Text>

			<View style={styles.detailRow}>
				<Text style={styles.detailLabel}>{dropoffLabel}</Text>
				<Text style={styles.detailValue}>{values.dropoff}</Text>
			</View>

			<View style={styles.detailRow}>
				<Text style={styles.detailLabel}>{cityStateZipLabel}</Text>
				<Text style={styles.detailValue}>{values.cityStateZip}</Text>
			</View>

			<View style={styles.detailRow}>
				<Text style={styles.detailLabel}>{destTypeLabel}</Text>
				<Text style={styles.detailValue}>{values.destType}</Text>
			</View>

			<View style={styles.detailRow}>
				<Text style={styles.detailLabel}>{elevatorLabel}</Text>
				<Text style={styles.detailValue}>{values.elevator}</Text>
			</View>
		</View>
	);
}

/**
 * 7. Section C — Safe handling checks apply
 */
function C17DSafetyReviewSection({
	title,
	badgeText,
	description,
}: {
	title: string;
	badgeText: string;
	description: string;
}) {
	return (
		<View style={styles.card} testID="c17d-safety-section">
			<Text style={styles.cardHeading}>{title}</Text>
			<View style={styles.reviewBadge} testID="c17d-review-badge">
				<C17DReviewCheckIcon size={18} color="#FFC85A" />
				<Text style={styles.reviewBadgeText}>{badgeText}</Text>
			</View>
			<Text style={styles.safetyDescriptionText}>{description}</Text>
		</View>
	);
}

/**
 * 8. Action Buttons
 */
function C17DActions({
	onContinue,
	onReturn,
	continueLabel,
	returnLabel,
}: {
	onContinue: () => void;
	onReturn: () => void;
	continueLabel: string;
	returnLabel: string;
}) {
	return (
		<View style={styles.actionsContainer}>
			<Pressable
				style={styles.primaryCta}
				onPress={onContinue}
				accessibilityRole="button"
				accessibilityLabel={continueLabel}
				testID="c17d-primary-cta"
			>
				<Text style={styles.primaryCtaText}>{continueLabel}</Text>
			</Pressable>

			<Pressable
				style={styles.secondaryCta}
				onPress={onReturn}
				accessibilityRole="button"
				accessibilityLabel={returnLabel}
				testID="c17d-secondary-cta"
			>
				<Text style={styles.secondaryCtaText}>{returnLabel}</Text>
			</Pressable>
		</View>
	);
}

/**
 * 9. Footer Disclaimers
 */
function C17DFooter({
	demoText,
	srsText,
}: {
	demoText: string;
	srsText: string;
}) {
	return (
		<View style={styles.footerContainer} testID="c17d-footer">
			<Text style={styles.footerText}>{demoText}</Text>
			<Text style={styles.footerText}>{srsText}</Text>
		</View>
	);
}

/**
 * C17-D Moving Drop-off Destination Screen (English & Spanish)
 *
 * Authoritative Figma:
 * - English Node 382:744 (430 × 1340 px)
 * - Spanish Node 974:9628 (430 × 1340 px)
 * Flow Context: W02 Service Discovery & Intake / C17-D [BK-02, SV-14]
 */
export default function MovingDestinationScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const currentLocale = getCurrentLocale();
	const params = useLocalSearchParams<{
		service?: string;
		selectedAddressId?: string;
		pickupAddress?: string;
		destinationAddress?: string;
		destinationCityStateZip?: string;
		destinationType?: string;
		elevator?: string;
	}>();
	const strings = useC17DStrings(t);

	// Dynamic customer profile with locale isolation (Sarah Mitchell for EN / Bryan Lopez for ES)
	const profile = useCustomerProfile(currentLocale);

	const customerChipText = useMemo(() => {
		const template = t("c17d.customerContext") || "{{name}} · {{bookingId}}";
		return resolveCustomerChipText(template, profile.name, currentLocale);
	}, [t, currentLocale, profile.name]);

	const originAddress = useMemo(() => {
		return resolveOriginAddress(params.pickupAddress, params.selectedAddressId);
	}, [params.pickupAddress, params.selectedAddressId]);

	const destinationValues = useMemo(
		() => resolveDestinationValues(params, t),
		[params, t],
	);

	const serviceState = useMemo(() => {
		return resolveServiceState(params.service);
	}, [params.service]);

	const [noticeMessage, setNoticeMessage] = useState<string | null>(() => {
		return resolveInitialNotice(serviceState, t);
	});

	useEffect(() => {
		const notice = resolveInitialNotice(serviceState, t);
		if (notice) {
			setNoticeMessage(notice);
		}
	}, [serviceState, t]);

	const handleContinue = useCallback(() => {
		if (currentLocale === "en") {
			router.push({
				pathname: "/moving-intake",
				params: {
					service: params.service || "moving",
					selectedAddressId: params.selectedAddressId,
					pickupAddress: originAddress,
					destinationAddress: destinationValues.dropoff,
					destinationCityStateZip: destinationValues.cityStateZip,
					destinationType: destinationValues.destType,
					elevator: destinationValues.elevator,
				},
			});
		} else {
			setNoticeMessage(
				t("c17d.noticeC18M") ||
					"La solicitud de mudanza (C18-M) está programada para una próxima fase.",
			);
		}
	}, [
		currentLocale,
		router,
		params.service,
		params.selectedAddressId,
		originAddress,
		destinationValues.dropoff,
		destinationValues.cityStateZip,
		destinationValues.destType,
		destinationValues.elevator,
		t,
	]);

	const handleReturnToPickup = useCallback(() => {
		router.replace({
			pathname: "/pickup-address",
			params: {
				service: params.service,
				selectedAddressId: params.selectedAddressId,
			},
		});
	}, [router, params.service, params.selectedAddressId]);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			handleReturnToPickup();
		}
	}, [router, handleReturnToPickup]);

	useHardwareBack(handleBack);

	return (
		<HaulixSafeArea>
			<View style={styles.screenRoot}>
				{/* Pinned Flow Header outside scroll area */}
				<FlowHeaderBack onBack={handleBack} testID="c17d-back-button" />

				<ScrollView
					style={styles.scrollArea}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c17d-screen"
				>
					{noticeMessage && (
						<C17DNoticeBanner
							message={noticeMessage}
							onDismiss={() => setNoticeMessage(null)}
							dismissLabel={strings.dismiss}
						/>
					)}

					<C17DStepChip
						indicator={strings.stepIndicator}
						sub={strings.stepSub}
					/>

					<C17DHeading title={strings.title} subtitle={strings.subtitle} />

					<C17DCustomerChip contextText={customerChipText} />

					<C17DPickupSection
						title={strings.pickupTitle}
						originLabel={strings.originLabel}
						originAddress={originAddress}
					/>

					<C17DDestinationSection
						title={strings.destTitle}
						dropoffLabel={strings.dropoffLabel}
						cityStateZipLabel={strings.cityStateZipLabel}
						destTypeLabel={strings.destTypeLabel}
						elevatorLabel={strings.elevatorLabel}
						values={destinationValues}
					/>

					<C17DSafetyReviewSection
						title={strings.safetyTitle}
						badgeText={strings.reviewBadge}
						description={strings.safetyDesc}
					/>

					<C17DActions
						onContinue={handleContinue}
						onReturn={handleReturnToPickup}
						continueLabel={strings.continueCta}
						returnLabel={strings.returnCta}
					/>

					<C17DFooter
						demoText={strings.demoFooter}
						srsText={strings.srsFooter}
					/>
				</ScrollView>
			</View>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	screenRoot: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollArea: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 16,
		paddingBottom: 40,
		gap: 17,
	},
	noticeContainer: {
		backgroundColor: "#2C2210",
		borderColor: "#E5A93C",
		borderWidth: 1,
		borderRadius: radius.md,
		padding: 14,
		gap: 8,
	},
	noticeText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 18,
		color: colors.primaryText,
	},
	noticeDismissBtn: {
		alignSelf: "flex-start",
		paddingVertical: 4,
		paddingHorizontal: 10,
		backgroundColor: "#3D2E14",
		borderRadius: radius.sm,
	},
	noticeDismissText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
	},
	stepChip: {
		backgroundColor: colors.surface,
		height: 33,
		paddingHorizontal: 12,
		borderRadius: 9,
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
	},
	stepChipIndicator: {
		fontFamily: fontFamily.semiBold,
		fontSize: 10,
		color: colors.brand,
	},
	stepChipSub: {
		fontFamily: fontFamily.medium,
		fontSize: 10,
		color: colors.secondaryText,
	},
	headingContainer: {
		gap: 9,
	},
	titleText: {
		fontFamily: fontFamily.bold,
		fontSize: 25,
		lineHeight: 30,
		color: colors.primaryText,
	},
	subtitleText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 16,
		color: colors.secondaryText,
	},
	customerChip: {
		backgroundColor: "#1A2510",
		height: 39,
		paddingLeft: 12,
		paddingRight: 16,
		borderRadius: 9,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		alignSelf: "flex-start",
	},
	customerChipText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
	},
	card: {
		backgroundColor: colors.surface,
		borderColor: "#35403B",
		borderWidth: 1,
		borderRadius: 17,
		padding: 16,
		gap: 13,
	},
	cardHeading: {
		fontFamily: fontFamily.semiBold,
		fontSize: 16,
		lineHeight: 22,
		color: colors.primaryText,
	},
	detailRow: {
		backgroundColor: colors.elevated,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
		gap: 6,
	},
	detailLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		lineHeight: 14,
		color: colors.secondaryText,
	},
	detailValue: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		lineHeight: 16,
		color: colors.primaryText,
	},
	reviewBadge: {
		backgroundColor: colors.elevated,
		borderRadius: 8,
		height: 32,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		alignSelf: "flex-start",
	},
	reviewBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.secondaryText,
	},
	safetyDescriptionText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 17,
		color: colors.secondaryText,
	},
	actionsContainer: {
		gap: 11,
		marginTop: 6,
	},
	primaryCta: {
		backgroundColor: colors.brand,
		height: 52,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	primaryCtaText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: "#080B0B",
	},
	secondaryCta: {
		backgroundColor: colors.surface,
		borderColor: "#35403B",
		borderWidth: 1,
		height: 52,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	secondaryCtaText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.brand,
	},
	footerContainer: {
		gap: 10,
		marginTop: 10,
		paddingBottom: 10,
	},
	footerText: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		lineHeight: 14,
		color: "#788580",
	},
});
