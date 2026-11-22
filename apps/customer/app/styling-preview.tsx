import { i18next, useTranslation } from "@haulix/i18n";
import {
	HaulixButton,
	HaulixSafeArea,
	HaulixText,
	HaulixView,
} from "@haulix/ui";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

/**
 * Styling Compatibility & Reusable Component Verification Screen
 *
 * Dedicated Phase 01.2 verification artifact demonstrating:
 * 1. HAULIX token-synchronized colors (brand, background, surface, elevated, text).
 * 2. NativeWind className utility styling across primitives and containers.
 * 3. Shared HAULIX UI primitives (HaulixButton, HaulixText, HaulixView, HaulixSafeArea).
 * 4. Inter typography scales and weights.
 * 5. Horizontal/vertical spacing and responsive constraints.
 * 6. Accessible interaction states (idle, pressed, disabled, loading).
 * 7. English/Spanish layout fidelity under localization.
 */
export default function StylingPreviewScreen() {
	const { t } = useTranslation();
	const [currentLocale, setCurrentLocale] = useState<string>(
		i18next.language || "en",
	);
	const [clickCount, setClickCount] = useState(0);

	// In production builds, redirect to prevent exposure
	if (!__DEV__) {
		return <Redirect href="/(auth)/welcome" />;
	}

	const toggleLocale = async () => {
		const nextLocale = currentLocale === "en" ? "es" : "en";
		await i18next.changeLanguage(nextLocale);
		setCurrentLocale(nextLocale);
	};

	return (
		<HaulixSafeArea>
			<ScrollView
				className="flex-1 px-4 py-4"
				contentContainerStyle={{ paddingBottom: 40 }}
			>
				{/* Top Navigation Bar */}
				<View className="flex-row items-center justify-between pb-4 border-b border-elevated mb-6">
					<Link href="/(auth)/welcome" asChild>
						<HaulixButton label="← Back" variant="ghost" />
					</Link>
					<HaulixText variant="brand" weight="bold" size="lg">
						Style Foundation
					</HaulixText>
					<HaulixButton
						label={currentLocale.toUpperCase()}
						variant="secondary"
						onPress={toggleLocale}
					/>
				</View>

				{/* Section 1: Brand Tokens & NativeWind Utilities */}
				<View className="mb-6">
					<HaulixText variant="brand" weight="bold" size="lg" className="mb-2">
						1. Brand Color & NativeWind Utilities
					</HaulixText>
					<View className="bg-surface p-4 rounded-xl border border-elevated mb-3">
						<View className="flex-row items-center gap-3 mb-3">
							<View className="w-8 h-8 rounded-full bg-brand" />
							<View className="flex-1">
								<HaulixText variant="brand" weight="bold">
									Neon Lime (#BAFF42)
								</HaulixText>
								<HaulixText variant="secondary" size="xs">
									className="bg-brand text-brand"
								</HaulixText>
							</View>
						</View>
						<View className="flex-row items-center gap-3 mb-3">
							<View className="w-8 h-8 rounded-md bg-elevated border border-brand" />
							<View className="flex-1">
								<HaulixText variant="primary" weight="medium">
									Elevated Surface (#222827)
								</HaulixText>
								<HaulixText variant="secondary" size="xs">
									className="bg-elevated border-brand"
								</HaulixText>
							</View>
						</View>
						<View className="flex-row items-center gap-3">
							<View className="w-8 h-8 rounded-md bg-surface border border-elevated" />
							<View className="flex-1">
								<HaulixText variant="secondary" weight="regular">
									Card Surface (#151A19)
								</HaulixText>
								<HaulixText variant="secondary" size="xs">
									className="bg-surface"
								</HaulixText>
							</View>
						</View>
					</View>
				</View>

				{/* Section 2: Typography & Inter Weights */}
				<View className="mb-6">
					<HaulixText variant="brand" weight="bold" size="lg" className="mb-2">
						2. Inter Typography Scale
					</HaulixText>
					<HaulixView
						surface="surface"
						className="p-4 rounded-xl border border-elevated"
					>
						<HaulixText
							variant="primary"
							size="3xl"
							weight="bold"
							className="mb-1"
						>
							Heading 3XL Bold
						</HaulixText>
						<HaulixText
							variant="primary"
							size="xl"
							weight="semiBold"
							className="mb-1"
						>
							Heading XL SemiBold
						</HaulixText>
						<HaulixText
							variant="primary"
							size="base"
							weight="medium"
							className="mb-1"
						>
							Body Base Medium
						</HaulixText>
						<HaulixText
							variant="secondary"
							size="sm"
							weight="regular"
							className="mb-1"
						>
							Body Small Regular (Muted)
						</HaulixText>
						<HaulixText variant="brand" size="xs" weight="semiBold">
							Caption XS SemiBold (Brand Accent)
						</HaulixText>
					</HaulixView>
				</View>

				{/* Section 3: Interactive Shared Button States */}
				<View className="mb-6">
					<HaulixText variant="brand" weight="bold" size="lg" className="mb-2">
						3. Shared Button Interaction States
					</HaulixText>
					<View className="gap-3">
						<HaulixButton
							label={`Primary Action (Taps: ${clickCount})`}
							variant="primary"
							fullWidth
							onPress={() => setClickCount((c) => c + 1)}
						/>
						<HaulixButton
							label="Secondary Action"
							variant="secondary"
							fullWidth
							onPress={() => {}}
						/>
						<HaulixButton
							label="Ghost Action"
							variant="ghost"
							fullWidth
							onPress={() => {}}
						/>
						<HaulixButton
							label="Loading State"
							variant="primary"
							state="loading"
							fullWidth
						/>
						<HaulixButton
							label="Disabled State"
							variant="primary"
							state="disabled"
							fullWidth
						/>
					</View>
				</View>

				{/* Section 4: Localization & Layout Symmetry (EN / ES) */}
				<View className="mb-6">
					<HaulixText variant="brand" weight="bold" size="lg" className="mb-2">
						4. Localization (EN / ES)
					</HaulixText>
					<HaulixView
						surface="surface"
						className="p-4 rounded-xl border border-elevated"
					>
						<HaulixText variant="primary" weight="semiBold" className="mb-2">
							Current: {currentLocale === "en" ? "English" : "Español"}
						</HaulixText>
						<View className="gap-2">
							<HaulixText variant="secondary" size="sm">
								Common Retry:{" "}
								<HaulixText variant="brand" weight="medium">
									{t("common.retry")}
								</HaulixText>
							</HaulixText>
							<HaulixText variant="secondary" size="sm">
								Auth Sign In:{" "}
								<HaulixText variant="brand" weight="medium">
									{t("auth.signIn")}
								</HaulixText>
							</HaulixText>
							<HaulixText variant="secondary" size="sm">
								Network Error:{" "}
								<HaulixText variant="brand" weight="medium">
									{t("errors.network")}
								</HaulixText>
							</HaulixText>
						</View>
					</HaulixView>
				</View>

				{/* Section 5: Responsive Width Behavior */}
				<View className="mb-6">
					<HaulixText variant="brand" weight="bold" size="lg" className="mb-2">
						5. Responsive Constraints
					</HaulixText>
					<View className="w-full max-w-sm self-center bg-surface p-4 rounded-xl border border-elevated items-center">
						<HaulixText variant="secondary" size="sm" className="text-center">
							Constrained Container (w-full max-w-sm self-center)
						</HaulixText>
					</View>
				</View>

				{/* Section 6: Phase 02.5 QA Auth Routes */}
				<View className="mb-6">
					<HaulixText variant="brand" weight="bold" size="lg" className="mb-2">
						6. Auth Flow QA Entry Points
					</HaulixText>
					<View className="bg-surface p-4 rounded-xl border border-elevated gap-3">
						<Link href="/(auth)/create-account" asChild>
							<HaulixButton
								label="C07: Create Account Screen"
								variant="secondary"
							/>
						</Link>
						<Link href="/(auth)/verify-phone" asChild>
							<HaulixButton
								label="C08: Phone Verification (OTP)"
								variant="primary"
							/>
						</Link>
						<Link href="/(auth)/social-return" asChild>
							<HaulixButton
								label="C09: Social Return / Preview (Dev Only)"
								variant="secondary"
							/>
						</Link>
						<Link href="/(app)/account" asChild>
							<HaulixButton
								label="C10: My Account Overview Screen"
								variant="primary"
							/>
						</Link>
					</View>
				</View>
			</ScrollView>
		</HaulixSafeArea>
	);
}
