import { useEffect, useState } from "react";
import State from "zentropy";

export default function useZenState<T, RK extends string>(state: State<T, RK>) {
  const [local, setLocal] = useState(state.value);

  useEffect(() => {
    const onChange = (item: T) => setLocal(item);
    state.subscribe(onChange);

    return () => state.unsubscribe(onChange);
  }, [state]);

  return { value: local };
}
