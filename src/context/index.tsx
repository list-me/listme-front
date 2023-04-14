/* eslint-disable import/prefer-default-export */
import { ProductContextProvider } from "./products";
import { combineContexts } from "./combineContexts";

const providers = [ProductContextProvider];

export const AppContextProvider = combineContexts(...providers);
