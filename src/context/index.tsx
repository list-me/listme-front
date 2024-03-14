/* eslint-disable import/prefer-default-export */
import { ProductContextProvider } from "./products";
import { FromToContextProvider } from "./FromToContext";
import { FilterContextProvider } from "./FilterContext";
import { IntegrationProvider } from "./IntegrationContext";
import { combineContexts } from "./combineContexts";
import { ImageContextProvider } from "./images";

const providers = [
  ProductContextProvider,
  FromToContextProvider,
  FilterContextProvider,
  ImageContextProvider,
  IntegrationProvider,
];

export const AppContextProvider = combineContexts(...providers);
