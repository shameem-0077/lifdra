import { useEffect, useRef } from "react";

const usePolling = (callback, delay) => {
  const savedCallback = useRef();
  const intervalId = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      intervalId.current = setInterval(() => savedCallback.current(), delay);

      // Cleanup on unmount
      return () => clearInterval(intervalId.current);
    }
  }, [delay]);
};

export default usePolling;
