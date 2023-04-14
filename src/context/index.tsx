import { ProductContextProvider } from "./products";
import { combineContexts } from "./combineContexts";
import { EditableContextProvider } from "./editable";

const providers = [ProductContextProvider];

export const AppContextProvider = combineContexts(...providers);
