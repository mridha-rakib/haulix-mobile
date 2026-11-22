/**
 * @haulix/utils — Finite State Machine Core
 *
 * Lightweight, zero-dependency, type-safe FSM engine.
 */

declare const __DEV__: boolean;

export type StateListener<
	TState extends string,
	TContext = Record<string, unknown>,
> = (state: TState, context: TContext) => void;

export interface StateNode<
	TState extends string,
	TEvent extends string,
	TContext = Record<string, unknown>,
> {
	on?: Partial<
		Record<TEvent, TState | ((context: TContext, payload?: unknown) => TState)>
	>;
	onEnter?: (context: TContext) => void;
	onExit?: (context: TContext) => void;
}

export interface FSMConfig<
	TState extends string,
	TEvent extends string,
	TContext = Record<string, unknown>,
> {
	id: string;
	initial: TState;
	context?: TContext;
	states: Record<TState, StateNode<TState, TEvent, TContext>>;
}

export interface StateMachine<
	TState extends string,
	TEvent extends string,
	TContext = Record<string, unknown>,
> {
	id: string;
	getState(): TState;
	getContext(): TContext;
	can(event: TEvent): boolean;
	send(event: TEvent, payload?: unknown): boolean;
	subscribe(listener: StateListener<TState, TContext>): () => void;
}

export function createFSM<
	TState extends string,
	TEvent extends string,
	TContext = Record<string, unknown>,
>(
	config: FSMConfig<TState, TEvent, TContext>,
): StateMachine<TState, TEvent, TContext> {
	let currentState: TState = config.initial;
	const currentContext: TContext = config.context ?? ({} as TContext);
	const listeners = new Set<StateListener<TState, TContext>>();

	return {
		id: config.id,
		getState: () => currentState,
		getContext: () => currentContext,
		can: (event: TEvent) => {
			const stateConfig = config.states[currentState];
			return Boolean(stateConfig?.on?.[event]);
		},
		send: (event: TEvent, payload?: unknown) => {
			const stateConfig = config.states[currentState];
			const target = stateConfig?.on?.[event];

			if (!target) {
				if (typeof __DEV__ !== "undefined" && __DEV__) {
					console.warn(
						`[FSM:${config.id}] Cannot handle event "${event}" in state "${currentState}"`,
					);
				}
				return false;
			}

			const nextState: TState = (
				typeof target === "function"
					? (target as (context: TContext, payload?: unknown) => TState)(
							currentContext,
							payload,
						)
					: target
			) as TState;

			if (nextState === currentState) {
				return false;
			}

			stateConfig.onExit?.(currentContext);
			currentState = nextState;
			config.states[nextState]?.onEnter?.(currentContext);

			for (const listener of listeners) {
				listener(currentState, currentContext);
			}

			return true;
		},
		subscribe: (listener: StateListener<TState, TContext>) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
	};
}
