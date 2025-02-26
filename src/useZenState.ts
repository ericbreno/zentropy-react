import { State } from 'zentropy';
import { useEffect, useState } from "react";

export default function useZenState<T, RK extends string>(state: State<T, RK>) {
  const [local, setLocal] = useState(state.value);

  useEffect(() => {
    const onChange = (item: T) => setLocal(item);
    const unsub = state.subscribe(onChange);

    return () => unsub();
  }, [state]);

  return { value: local };
}
