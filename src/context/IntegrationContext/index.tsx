import React, { createContext, useContext, useState } from "react";
import { IEnvironment, IntegrationContextType } from "./IntegrationContext";

const IntegrationContext = createContext<IntegrationContextType | undefined>(
  undefined,
);

function IntegrationProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [environment, setEnvironment] = useState<IEnvironment>("PROD");
  const [valueProdApi, setValueProdApi] = useState("");
  const [valueHomologApi, setValueHomologApi] = useState("");
  const value = {
    environment,
    setEnvironment,
    valueProdApi,
    setValueProdApi,
    valueHomologApi,
    setValueHomologApi,
  };

  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
}

const useIntegration: () => IntegrationContextType = () => {
  const context = useContext(IntegrationContext);
  if (!context) {
    throw new Error(
      "useIntegration deve ser usado dentro de um IntegrationProvider",
    );
  }
  return context;
};

export { IntegrationProvider, useIntegration };
