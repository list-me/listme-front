/* eslint-disable import/prefer-default-export */
import { TesteContextProvider } from "./Teste";
import { combineContexts } from "./combineContexts";
import { ImageContextProvider } from "./images";
import { ProductContextProvider } from "./products";

const providers = [
  ProductContextProvider,
  TesteContextProvider,
  ImageContextProvider,
];

export const AppContextProvider = combineContexts(...providers);
