import { State } from 'zentropy';
import { useEffect, useState } from "react";

type Options<T> = {
  watch?: keyof T;
}

export default function useZenState<T, RK extends string>(state: State<T, RK>, { watch }: Options<T> = {}) {
  const [value, setValue] = useState(watch ? state.value[watch] : state.value);

  useEffect(() => {
    const onChange = (item: T) => setValue(watch ? item[watch] : item);
    const unsub = state.subscribe(onChange);

    return () => unsub();
  }, [state, watch]);

  return { value, stateValue: state.value };
}
