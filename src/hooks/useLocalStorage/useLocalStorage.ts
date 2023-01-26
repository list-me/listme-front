import {useState} from "react";

export const useLocalStorage = <T>(key: string) => {
    const getItem = (): T => {
        const item = window.localStorage.getItem(key) as T;
        setItemStorage(item);

        return item;
    }

    const [itemStorage, setItemStorage] = useState<T>(getItem);

    const setItem = (value: string): void => {
        window.localStorage.setItem(key, value)
    }

    return [itemStorage, setItem];
}
