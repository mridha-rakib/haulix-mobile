/**
 * @haulix/logger — Tests
 */

import type { CrashReporter } from "../src/logger";
import { createLogger, registerCrashReporter } from "../src/logger";

// Suppress actual console output during tests
const mockConsole = {
  debug: jest.spyOn(console, "debug").mockImplementation(() => {}),
  info: jest.spyOn(console, "info").mockImplementation(() => {}),
  warn: jest.spyOn(console, "warn").mockImplementation(() => {}),
  error: jest.spyOn(console, "error").mockImplementation(() => {}),
};

beforeEach(() => {
  jest.clearAllMocks();
  // Set DEV mode for tests
  (global as any).__DEV__ = true;
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("createLogger", () => {
  it("prefixes messages with the app context", () => {
    const logger = createLogger("CUSTOMER");
    logger.info("hello");
    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    expect((mockConsole.info.mock.calls[0] as string[])[0]).toContain("[CUSTOMER][INFO]");
  });

  it("prefixes DRIVER context correctly", () => {
    const logger = createLogger("DRIVER");
    logger.warn("check this");
    expect((mockConsole.warn.mock.calls[0] as string[])[0]).toContain("[DRIVER][WARN]");
  });

  it("includes the message text", () => {
    const logger = createLogger("CUSTOMER");
    logger.info("server started");
    expect((mockConsole.info.mock.calls[0] as string[])[0]).toContain("server started");
  });

  it("logs error with stack trace", () => {
    const logger = createLogger("CUSTOMER");
    const err = new Error("oops");
    logger.error("failed", err);
    const output = (mockConsole.error.mock.calls[0] as string[])[0];
    expect(output).toContain("[ERROR]");
    expect(output).toContain("oops");
  });

  it("redacts sensitive keys from meta", () => {
    const logger = createLogger("CUSTOMER");
    logger.info("user action", { password: "secret123", name: "Alice" });
    const output = (mockConsole.info.mock.calls[0] as string[])[0];
    expect(output).not.toContain("secret123");
    expect(output).toContain("[REDACTED]");
    expect(output).toContain("Alice");
  });

  it("debug is silent when __DEV__ is false", () => {
    (global as any).__DEV__ = false;
    const logger = createLogger("CUSTOMER");
    logger.debug("trace");
    expect(mockConsole.debug).not.toHaveBeenCalled();
  });

  it("debug fires when __DEV__ is true", () => {
    (global as any).__DEV__ = true;
    const logger = createLogger("CUSTOMER");
    logger.debug("trace");
    expect(mockConsole.debug).toHaveBeenCalledTimes(1);
  });
});

describe("registerCrashReporter", () => {
  it("calls captureException on error log", () => {
    const reporter: CrashReporter = {
      captureException: jest.fn(),
      captureMessage: jest.fn(),
    };
    registerCrashReporter(reporter);
    const logger = createLogger("DRIVER");
    const err = new Error("crash");
    logger.error("system failure", err);
    expect(reporter.captureException).toHaveBeenCalledWith(err, {
      context: "DRIVER",
      message: "system failure",
    });
  });
});
