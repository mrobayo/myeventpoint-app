import { useEffect, useRef, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500): T | undefined {
  const [debouncedValue, setDebouncedValue] = useState<T>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerRef.current);
  }, [value, delay]);

  return debouncedValue;
};
