import { Middleware, State } from 'zentropy';
import { useEffect, useState } from "react";

export default function useZenMiddleware<T, RK extends string>(state: State<T, RK>, middleware: Middleware<T>) {
  useEffect(() => {
    const unsub = state.use(middleware);

    return () => unsub();
  }, [state]);
}
