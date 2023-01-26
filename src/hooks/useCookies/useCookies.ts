import {SetValueCookie} from "./useCookies";
import {useCookies} from "react-cookie";
import {useState} from "react";

const useCookie = <T>(key: string, initialValue: T): [T, SetValueCookie<T>] => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const readValue = (): T => {

        const item = cookies;
        return item as T;
    };

    const [storedValue, setStoredValue] = useState<T>(readValue);

    const setValue: SetValueCookie<T> = (value) => {
        try {
            const newValue: string = value instanceof Function ? value(storedValue) : value;
            setCookie(newValue, initialValue);
        } catch (error) {
            console.warn(`Error setting cookie key "${key}": `, error);
        }
    }

    return [storedValue, setValue];
}

