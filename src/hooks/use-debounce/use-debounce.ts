import { useCallback, useRef } from 'react';

function useDebounce(callback: any, delay: number) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback((args) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      callback.call(null, args);
    }, delay);
  }, [callback, delay]);
  return debouncedCallback;
}

export default useDebounce;
