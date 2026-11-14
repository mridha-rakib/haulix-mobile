import { assertDefined, capitalize, clamp, compact, debounce, sleep } from "./index";

describe("assertDefined", () => {
  it("returns defined values", () => {
    expect(assertDefined(42, "num")).toBe(42);
    expect(assertDefined("hello", "str")).toBe("hello");
  });
  it("throws for null", () => {
    expect(() => assertDefined(null, "val")).toThrow();
  });
  it("throws for undefined", () => {
    expect(() => assertDefined(undefined, "val")).toThrow();
  });
});

describe("capitalize", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });
  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("clamp", () => {
  it("clamps to min", () => expect(clamp(-5, 0, 10)).toBe(0));
  it("clamps to max", () => expect(clamp(20, 0, 10)).toBe(10));
  it("returns value within range", () => expect(clamp(5, 0, 10)).toBe(5));
});

describe("compact", () => {
  it("removes undefined keys", () => {
    expect(compact({ a: 1, b: undefined, c: "x" })).toEqual({ a: 1, c: "x" });
  });
});

describe("sleep", () => {
  it("resolves after delay", async () => {
    jest.useFakeTimers();
    const p = sleep(100);
    jest.advanceTimersByTime(100);
    await p;
    jest.useRealTimers();
  });
});

describe("debounce", () => {
  it("delays function execution", () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const debounced = debounce(fn, 200);
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
