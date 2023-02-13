import {AuthContext} from "./auth";
import {ProductContextProvider} from "./products";
import {combineContexts} from "./combineContexts";

const providers = [
    ProductContextProvider
]

export const AppContextProvider = combineContexts(...providers);
