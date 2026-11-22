import { createFSM } from "./fsm";
import {
	createAuthSessionMachine,
	createBootstrapMachine,
	createDriverRoleMachine,
	resolveButtonState,
} from "./machines";

describe("Finite State Machine Core (FSM)", () => {
	it("initializes with the given initial state", () => {
		const fsm = createFSM({
			id: "test",
			initial: "idle",
			states: {
				idle: { on: { START: "running" } },
				running: { on: { STOP: "idle" } },
			},
		});

		expect(fsm.getState()).toBe("idle");
		expect(fsm.can("START")).toBe(true);
		expect(fsm.can("STOP")).toBe(false);
	});

	it("transitions cleanly on valid events", () => {
		const fsm = createFSM({
			id: "test",
			initial: "idle",
			states: {
				idle: { on: { START: "running" } },
				running: { on: { STOP: "idle" } },
			},
		});

		const transitioned = fsm.send("START");
		expect(transitioned).toBe(true);
		expect(fsm.getState()).toBe("running");
	});

	it("rejects invalid events without mutating state", () => {
		const fsm = createFSM({
			id: "test",
			initial: "idle",
			states: {
				idle: { on: { START: "running" } },
				running: { on: { STOP: "idle" } },
			},
		});

		const transitioned = fsm.send("STOP"); // Invalid in idle
		expect(transitioned).toBe(false);
		expect(fsm.getState()).toBe("idle");
	});

	it("triggers enter and exit handlers during transitions", () => {
		const exitIdle = jest.fn();
		const enterRunning = jest.fn();

		const fsm = createFSM({
			id: "test",
			initial: "idle",
			states: {
				idle: {
					on: { START: "running" },
					onExit: exitIdle,
				},
				running: {
					on: { STOP: "idle" },
					onEnter: enterRunning,
				},
			},
		});

		fsm.send("START");
		expect(exitIdle).toHaveBeenCalledTimes(1);
		expect(enterRunning).toHaveBeenCalledTimes(1);
	});

	it("notifies subscribers and allows clean unsubscribe", () => {
		const fsm = createFSM({
			id: "test",
			initial: "idle",
			states: {
				idle: { on: { NEXT: "step1" } },
				step1: { on: { NEXT: "step2" } },
				step2: {},
			},
		});

		const listener = jest.fn();
		const unsub = fsm.subscribe(listener);

		fsm.send("NEXT");
		expect(listener).toHaveBeenCalledWith("step1", expect.any(Object));

		unsub();
		fsm.send("NEXT");
		expect(listener).toHaveBeenCalledTimes(1);
	});
});

describe("Domain State Machines", () => {
	describe("createBootstrapMachine", () => {
		it("handles happy-path resources loaded", () => {
			const machine = createBootstrapMachine();
			expect(machine.getState()).toBe("bootstrapping");
			expect(machine.send("RESOURCES_LOADED")).toBe(true);
			expect(machine.getState()).toBe("ready");
		});

		it("transitions to degraded on timeout or non-fatal error", () => {
			const machine = createBootstrapMachine();
			expect(machine.send("TIMEOUT")).toBe(true);
			expect(machine.getState()).toBe("degraded");
		});
	});

	describe("createAuthSessionMachine", () => {
		it("progresses through auth lifecycle", () => {
			const machine = createAuthSessionMachine();
			expect(machine.getState()).toBe("unauthenticated");

			machine.send("START_AUTH");
			expect(machine.getState()).toBe("authenticating");

			machine.send("AUTH_SUCCESS");
			expect(machine.getState()).toBe("authenticated");

			machine.send("SIGN_OUT");
			expect(machine.getState()).toBe("unauthenticated");
		});
	});

	describe("createDriverRoleMachine", () => {
		it("enforces role transitions according to server authority", () => {
			const machine = createDriverRoleMachine();
			expect(machine.getState()).toBe("unauthenticated");

			machine.send("SET_PRIMARY_DRIVER");
			expect(machine.getState()).toBe("primary_driver");

			machine.send("SET_HELPER");
			expect(machine.getState()).toBe("helper");

			machine.send("LOGIN_REQUIRED");
			expect(machine.getState()).toBe("unauthenticated");
		});
	});

	describe("resolveButtonState", () => {
		it("prioritizes loading over disabled", () => {
			expect(resolveButtonState(true, true)).toBe("loading");
			expect(resolveButtonState(true, false)).toBe("loading");
			expect(resolveButtonState(false, true)).toBe("disabled");
			expect(resolveButtonState(false, false)).toBe("idle");
		});
	});
});
