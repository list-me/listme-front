import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage/useLocalStorage";
import { STORAGE } from "../../constants/localStorage";
import { AuthContextValues } from "./Auth.d";
import { AuthContext } from "./Auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [itemStorage, setItem] = useLocalStorage(STORAGE.TOKEN);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setToken(itemStorage as string);
  }, [itemStorage]);

  const value: AuthContextValues = {
    isAuthenticated: token,
    // @ts-ignore
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
