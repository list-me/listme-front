import {createContext} from "react";
import {GlobalContextValues} from "./Global.d";

const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

export {GlobalContext};
