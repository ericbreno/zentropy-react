import { renderHook, act } from "@testing-library/react";
import useZenState from "../src/useZenState";
import State, { makeState } from "zentropy";

describe("useZenState hook should", () => {
  let counterState: State<number, 'increment' | 'decrement'>;

  beforeEach(() => {
    counterState = makeState({
      initial: 0,
      reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
      },
    });
  });

  it("initialize with the correct state value", () => {
    const { result } = renderHook(() => useZenState(counterState));

    expect(result.current.value).toBe(0);
  });

  it("update when state changes", () => {
    const { result } = renderHook(() => useZenState(counterState));

    act(() => {
      counterState.dispatch("increment");
    });

    expect(result.current.value).toBe(1);

    act(() => {
      counterState.dispatch("decrement");
    });

    expect(result.current.value).toBe(0);
  });

  it("unsubscribe on unmount", () => {
    const { result, unmount } = renderHook(() => useZenState(counterState));

    act(() => {
      counterState.dispatch("increment");
    });

    expect(result.current.value).toBe(1);

    unmount();

    act(() => {
      counterState.dispatch("increment");
    });

    // Since it's unmounted, it shouldn't update the hook state
    expect(result.current.value).toBe(1);
  });



});

interface TestState {
  count: number;
  text: string;
}

describe("useZenState hook watch should", () => {
  let state: State<TestState, string>;

  beforeEach(() => {
    state = makeState({ initial: { count: 0, text: "hello" } });
  });

  it("update full state when no watch option is provided", () => {
    const { result } = renderHook(() => useZenState(state));

    act(() => {
      state.update({ count: 1, text: "world" });
    });

    expect(result.current.value).toEqual({ count: 1, text: "world" });
  });

  it("update only watched state when watch option is provided", () => {
    const { result } = renderHook(() => useZenState(state, { watch: "text" }));

    expect(result.current.value).toBe("hello");

    act(() => {
      state.update({ count: 1, text: "world" });
    });

    expect(result.current.value).toBe("world");
  });

  it("not update when unrelated state changes", () => {
    const { result } = renderHook(() => useZenState(state, { watch: "count" }));

    act(() => {
      state.update({ count: 0, text: "updated" });
    });

    expect(result.current.value).toBe(0); // Count remains unchanged
  });
});
