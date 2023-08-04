import { createContext } from "react";
import { AuthContextValues } from "./Auth.d";

const AuthContext = createContext<AuthContextValues>({
  isAuthenticated: false,
});

export { AuthContext };
