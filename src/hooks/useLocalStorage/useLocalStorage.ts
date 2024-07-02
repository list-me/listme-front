/* eslint-disable import/prefer-default-export */
import { useState } from "react";

export const useLocalStorage = <T>(key: string) => {
  const [itemStorage, setItemStorage] = useState<T>(() => {
    const item = window.localStorage.getItem(key) as T;
    return item;
  });

  const getItem = (): T => {
    const item = window.localStorage.getItem(key) as T;
    setItemStorage(item);

    return item;
  };

  const setItem = (value: string): void => {
    window.localStorage.setItem(key, value);
    setItemStorage(value as T);
  };

  return [itemStorage, setItem, getItem];
};
