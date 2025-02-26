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
