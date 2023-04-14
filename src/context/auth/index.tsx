import generateHookContext from "../../utils/generateHookContext";
import { AuthContext } from "./Auth";
import { AuthProvider } from "./Auth.Provider";

const useAuth = generateHookContext(AuthContext, "Auth");

export { useAuth, AuthContext, AuthProvider as default };
