# **Zentropy React - React Adapter for Zentropy**  

A simple React adapter for using [`zentropy`](https://www.npmjs.com/package/zentropy) in React applications. This package provides seamless state updates by subscribing to state changes and triggering re-renders automatically.

## **Why Use Zentropy?**  

- 🌀 **Minimal & Lightweight** – Just one hook, no extra complexity.  
- ⚡ **Auto-Updates** – Keeps your component in sync with `zentropy` state.  
- 🔄 **No Boilerplate** – Works with any `zentropy` state instance.  

---

## **Installation**  

```sh
npm install zentropy-react
```

---

## **Usage**  

### **1. Create Your Zentropy State**  

Define your shared state using `zentropy`:

```ts
import { makeState } from "zentropy";

const counterState = makeState({
  initial: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    add: (state, payload) => state + payload
  },
});

export default counterState;
```

---

### **2. Use `useZenState` in a React Component**  

Subscribe to the state inside a component:  

```tsx
import React from "react";
import { useZenState, useZenMiddleware } from "zentropy-react";
import counterState from "./counterState";

function persistCounter(state, action) {
  // Save your updated state
}

function Counter() {
  const { value } = useZenState(counterState);
  useZenMiddleware(counterState, persistCounter);

  return (
    <div>
      <p>Count: {value}</p>

      {/* use reducer actions */}
      <button onClick={() => counterState.actions.increment()}>+</button>
      <button onClick={() => counterState.actions.decrement()}>-</button>

      {/* or use the dispatch functions */}
      <button onClick={() => counterState.dispatch("increment")}>+</button>
      <button onClick={() => counterState.dispatch("decrement")}>-</button>
    </div>
  );
}

export default Counter;
```

---

## **API**  

### **`useZenState(state)`**  

A React hook that subscribes to a `zentropy` state and keeps components in sync.  

```ts
const { value } = useZenState(yourState);
```

- **`state`** – A `zentropy` state instance.  
- **Returns** – `{ value }`, where `value` is the current state.  

### **`useZenMiddleware(state, (state: T, action: RK, payload?: any) => void)`**  

Hook to add a middleware to listen for changes in the state and run side effects

```ts
useZenMiddleware(yourState, (state, action, payload) => {
  if (action === 'update') {
    saveToDB(state);
  }
});
```

---

## **Why Choose ZenState?**  

✅ **No Context API required** – Just use the hook anywhere.  
✅ **Automatic reactivity** – Renders update only when needed.  
✅ **Lightweight & Simple** – No extra setup, just plug and play.  

---

## **License**  

MIT License.  
