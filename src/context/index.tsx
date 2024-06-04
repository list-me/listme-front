/* eslint-disable import/prefer-default-export */
import { ProductContextProvider } from "./products";
import { FromToContextProvider } from "./FromToContext";
import { FilterContextProvider } from "./FilterContext";
import { IntegrationProvider } from "./IntegrationContext";
import { combineContexts } from "./combineContexts";
import { ImageContextProvider } from "./images";
import AuthProvider from "./auth";

const providers = [
  AuthProvider,
  ProductContextProvider,
  FromToContextProvider,
  FilterContextProvider,
  ImageContextProvider,
  IntegrationProvider,
];

export const AppContextProvider = combineContexts(...providers);
