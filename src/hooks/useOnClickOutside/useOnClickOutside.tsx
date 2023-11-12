import { useEffect, RefObject, useCallback } from "react";

type OutsideClickHandler = (e?: MouseEvent) => void;

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: OutsideClickHandler,
): void => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref!.current && !ref!.current!.contains(e.target as Node)) {
        callback(e);
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback, handleClick]);
};

export default useOutsideClick;
