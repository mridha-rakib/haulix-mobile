/**
 * @haulix/logger
 *
 * Lightweight structured logger for HAULIX Mobile applications.
 *
 * Features:
 * - Typed log levels: debug | info | warn | error
 * - App context prefixes: [CUSTOMER] | [DRIVER]
 * - Dev-only debug logs (silent in production)
 * - Error stack trace display
 * - Safe: does not log passwords, tokens, PII, or payment data
 * - Extension point for future crash reporter (Sentry, etc.)
 * - Does NOT monkey-patch console
 *
 * Usage:
 *   import { createLogger } from "@haulix/logger";
 *   const logger = createLogger("CUSTOMER");
 *   logger.info("App started");
 *   logger.error("Something failed", new Error("details"));
 */

export type LogLevel = "debug" | "info" | "warn" | "error";
export type AppContext = "CUSTOMER" | "DRIVER" | "SHARED";

export interface LogEntry {
  timestamp: string;
  context: AppContext;
  level: LogLevel;
  message: string;
  meta?: unknown;
}

/** Optional crash reporter integration contract */
export interface CrashReporter {
  captureException(error: Error, context?: Record<string, unknown>): void;
  captureMessage(message: string, level: LogLevel): void;
}

let crashReporter: CrashReporter | null = null;

/**
 * Register an external crash reporter (e.g., Sentry).
 * Call once at app startup before any logging.
 */
export function registerCrashReporter(reporter: CrashReporter): void {
  crashReporter = reporter;
}

/** Fields that must never appear in logs */
const REDACTED_KEYS = new Set([
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "secret",
  "apiKey",
  "creditCard",
  "cardNumber",
  "cvv",
  "ssn",
  "dob",
  "email",
  "phone",
  "stripe",
  "paymentMethod",
]);

function redact(obj: unknown, depth = 0): unknown {
  if (depth > 4 || obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => redact(item, depth + 1));

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    result[key] = REDACTED_KEYS.has(key.toLowerCase()) ? "[REDACTED]" : redact(value, depth + 1);
  }
  return result;
}

function formatTimestamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 23);
}

function formatMeta(meta: unknown): string {
  if (meta === undefined || meta === null) return "";
  const redacted = redact(meta);
  try {
    return ` | ${JSON.stringify(redacted)}`;
  } catch {
    return ` | [unserializable]`;
  }
}

function formatError(error: Error): string {
  const lines = [`${error.name}: ${error.message}`];
  if (error.stack) {
    const stackLines = error.stack.split("\n").slice(1, 5);
    lines.push(...stackLines);
  }
  return lines.join("\n  ");
}

declare const __DEV__: boolean | undefined;

function isDev(): boolean {
  if (typeof __DEV__ !== "undefined") return Boolean(__DEV__);
  return process.env.NODE_ENV !== "production";
}

export interface Logger {
  debug(message: string, meta?: unknown): void;
  info(message: string, meta?: unknown): void;
  warn(message: string, meta?: unknown): void;
  error(message: string, errorOrMeta?: Error | unknown): void;
}

/**
 * Create a typed logger for a specific app context.
 *
 * @param context - "CUSTOMER" | "DRIVER" | "SHARED"
 */
export function createLogger(context: AppContext): Logger {
  const prefix = `[${context}]`;

  return {
    debug(message: string, meta?: unknown): void {
      if (!isDev()) return; // debug is silent in production
      const line = `${formatTimestamp()} ${prefix}[DEBUG] ${message}${formatMeta(meta)}`;
      console.debug(line); // eslint-disable-line no-console
    },

    info(message: string, meta?: unknown): void {
      const line = `${formatTimestamp()} ${prefix}[INFO]  ${message}${formatMeta(meta)}`;
      console.info(line); // eslint-disable-line no-console
    },

    warn(message: string, meta?: unknown): void {
      const line = `${formatTimestamp()} ${prefix}[WARN]  ${message}${formatMeta(meta)}`;
      console.warn(line); // eslint-disable-line no-console
    },

    error(message: string, errorOrMeta?: Error | unknown): void {
      const isError = errorOrMeta instanceof Error;
      const metaStr = isError ? "" : formatMeta(errorOrMeta);
      const errorStr = isError ? `\n  ${formatError(errorOrMeta)}` : "";
      const line = `${formatTimestamp()} ${prefix}[ERROR] ${message}${metaStr}${errorStr}`;
      console.error(line); // eslint-disable-line no-console

      if (isError && crashReporter) {
        crashReporter.captureException(errorOrMeta, { context, message });
      }
    },
  };
}

/** Pre-built loggers for each application context */
export const customerLogger = createLogger("CUSTOMER");
export const driverLogger = createLogger("DRIVER");
export const sharedLogger = createLogger("SHARED");
