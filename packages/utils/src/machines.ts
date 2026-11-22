/**
 * @haulix/utils — Domain State Machine Definitions
 *
 * Explicit contracts replacing ad-hoc boolean soup across the app.
 * Elevates AX by giving AI coding agents strict, compile-time verified domain models.
 */

import { createFSM, type StateMachine } from "./fsm";

// ─── 1. App Bootstrap State Machine ──────────────────────────────────────────

export type AppBootstrapState =
	| "bootstrapping"
	| "ready"
	| "degraded"
	| "failed";
export type AppBootstrapEvent =
	| "RESOURCES_LOADED"
	| "NON_FATAL_ERROR"
	| "TIMEOUT"
	| "FATAL_ERROR";

export interface AppBootstrapContext {
	fontsLoaded: boolean;
	i18nLoaded: boolean;
	error?: Error;
}

export function createBootstrapMachine(
	initialContext: Partial<AppBootstrapContext> = {},
): StateMachine<AppBootstrapState, AppBootstrapEvent, AppBootstrapContext> {
	const context: AppBootstrapContext = {
		fontsLoaded: false,
		i18nLoaded: false,
		...initialContext,
	};

	return createFSM<AppBootstrapState, AppBootstrapEvent, AppBootstrapContext>({
		id: "app-bootstrap",
		initial: "bootstrapping",
		context,
		states: {
			bootstrapping: {
				on: {
					RESOURCES_LOADED: "ready",
					NON_FATAL_ERROR: "degraded",
					TIMEOUT: "degraded",
					FATAL_ERROR: "failed",
				},
			},
			ready: {},
			degraded: {},
			failed: {},
		},
	});
}

// ─── 2. Auth Session State Machine (Customer) ────────────────────────────────

export type AuthSessionState =
	| "unauthenticated"
	| "authenticating"
	| "authenticated";
export type AuthSessionEvent =
	| "START_AUTH"
	| "AUTH_SUCCESS"
	| "AUTH_FAILURE"
	| "SIGN_OUT";

export function createAuthSessionMachine(): StateMachine<
	AuthSessionState,
	AuthSessionEvent
> {
	return createFSM<AuthSessionState, AuthSessionEvent>({
		id: "auth-session",
		initial: "unauthenticated",
		states: {
			unauthenticated: {
				on: {
					START_AUTH: "authenticating",
				},
			},
			authenticating: {
				on: {
					AUTH_SUCCESS: "authenticated",
					AUTH_FAILURE: "unauthenticated",
				},
			},
			authenticated: {
				on: {
					SIGN_OUT: "unauthenticated",
				},
			},
		},
	});
}

// ─── 3. Driver Eligibility State Machine (Server-Authoritative) ──────────────

/**
 * CRITICAL (AGENTS.md Rule 3):
 * Driver role is determined EXCLUSIVELY by backend eligibility data.
 * No local toggle or client-side fabrication is permitted.
 */
export type DriverRoleState =
	| "unauthenticated"
	| "pending_verification"
	| "primary_driver"
	| "helper";

export type DriverRoleEvent =
	| "LOGIN_REQUIRED"
	| "SET_PENDING_VERIFICATION"
	| "SET_PRIMARY_DRIVER"
	| "SET_HELPER"
	| "REVOKE_ROLE";

export function createDriverRoleMachine(): StateMachine<
	DriverRoleState,
	DriverRoleEvent
> {
	return createFSM<DriverRoleState, DriverRoleEvent>({
		id: "driver-role",
		initial: "unauthenticated",
		states: {
			unauthenticated: {
				on: {
					SET_PENDING_VERIFICATION: "pending_verification",
					SET_PRIMARY_DRIVER: "primary_driver",
					SET_HELPER: "helper",
				},
			},
			pending_verification: {
				on: {
					SET_PRIMARY_DRIVER: "primary_driver",
					SET_HELPER: "helper",
					LOGIN_REQUIRED: "unauthenticated",
				},
			},
			primary_driver: {
				on: {
					SET_HELPER: "helper", // Role re-assignment from backend
					REVOKE_ROLE: "pending_verification",
					LOGIN_REQUIRED: "unauthenticated",
				},
			},
			helper: {
				on: {
					SET_PRIMARY_DRIVER: "primary_driver", // Role re-assignment from backend
					REVOKE_ROLE: "pending_verification",
					LOGIN_REQUIRED: "unauthenticated",
				},
			},
		},
	});
}

// ─── 4. Button Interactive State Machine ──────────────────────────────────────

export type ButtonInteractionState = "idle" | "loading" | "disabled";

export function resolveButtonState(
	loading?: boolean,
	disabled?: boolean,
): ButtonInteractionState {
	if (loading) return "loading";
	if (disabled) return "disabled";
	return "idle";
}
