/* eslint-disable import/prefer-default-export */
import { ProductContextProvider } from "./products";
import { combineContexts } from "./combineContexts";
import { ImageContextProvider } from "./images";

const providers = [ProductContextProvider, ImageContextProvider];

export const AppContextProvider = combineContexts(...providers);
