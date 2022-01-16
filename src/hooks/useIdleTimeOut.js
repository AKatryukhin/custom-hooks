import { useCallback, useEffect, useState } from "react";

// чтобы скрывать интерфейс по бездействию пользователя

export const useIdleTimeOut = (timeout, onTimeout, onActivity, events) => {
  const fireOnTimeOut = useCallback(() => {
    if (typeof onTimeout === "function") {
      onTimeout();
    }
  }, [onTimeout]);

  const fireOnActivity = useCallback(() => {
    if (typeof onActivity === "function") {
      onActivity();
    }
  }, [onActivity]);

  useEffect(() => {
    if (typeof timeout !== "undefined" && typeof window !== "undefined") {
      let fireTimeOut;

      const set = () => {
        fireTimeOut = window.setTimeout(fireOnTimeOut, timeout);
      };

      const clear = () => {
        if (fireTimeOut) {
          window.clearTimeout(fireTimeOut);
        }
      };
      

      const resetTimeout = () => {
        clear();
        set();
      };

      for (let i in events) {
        window.addEventListener(events[i], resetTimeout);
        window.addEventListener(events[i], fireOnActivity);
      }

      set();
      return () => {
        for (let i in events) {
          window.removeEventListener(events[i], resetTimeout);
          window.removeEventListener(events[i], fireOnActivity);
          clear();
        }
      };
    }
  }, [fireOnTimeOut, timeout, fireOnActivity, events]);
};

