import { useState } from "react";

export const useDebouncedState = <T>(initialValue: T, delay: number): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(initialValue);
  let timeoutId: NodeJS.Timeout;

  const updateState = (value: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setState(value);
    }, delay);
  };

  return [state, updateState];
};