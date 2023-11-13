/* eslint-disable import/prefer-default-export */
import { ProductContextProvider } from "./products";
import { FromToContextProvider } from "./FromToContext";
import { FilterContextProvider } from "./FilterContext";
import { combineContexts } from "./combineContexts";
import { ImageContextProvider } from "./images";

const providers = [
  ProductContextProvider,
  FromToContextProvider,
  FilterContextProvider,
  ImageContextProvider,
];

export const AppContextProvider = combineContexts(...providers);
