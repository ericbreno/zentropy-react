import { act, renderHook } from "@testing-library/react";
import useZenMiddleware from "../src/useZenMiddleware";
import State, { makeState } from "zentropy";

describe("useZenMiddleware", () => {
  let state: State<number, "increment" | "decrement">;
  let middleware: jest.Mock;

  beforeEach(() => {
    // Create a state instance
    state = makeState({
      initial: 0,
      reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
      },
    });

    // Mock middleware function
    middleware = jest.fn();
  });

  it("should call middleware when state updates", () => {
    renderHook(() => useZenMiddleware(state, middleware));

    act(() => {
      state.dispatch("increment");
    });

    expect(middleware).toHaveBeenCalledWith(1, "increment", undefined);
  });

  it("should unsubscribe middleware when hook unmounts", () => {
    const { unmount } = renderHook(() => useZenMiddleware(state, middleware));

    unmount(); // Unmount the hook

    act(() => {
      state.dispatch("increment");
    });

    // Middleware should NOT be called after unmounting
    expect(middleware).toHaveBeenCalledTimes(0);
  });
});
