import React, { useMemo, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage";
import { STORAGE } from "../../constants/localStorage";
import { AuthContext } from "./Auth";
import { AuthContextValues } from "./Auth.d";

const AuthProvider: React.FC<any> = ({ children }) => {
  const [itemStorage, setItem] = useLocalStorage(STORAGE.TOKEN);
  const [token, setToken] = useState<string>(itemStorage as string);

  const value: AuthContextValues = {
    isAuthenticated: token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
