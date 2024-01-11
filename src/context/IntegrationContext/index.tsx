import React, { createContext, useContext, useState } from "react";
import { IEnvironment, IntegrationContextType } from "./IntegrationContext";
import { IProvider } from "../../models/integration/integration";

const IntegrationContext = createContext<IntegrationContextType | undefined>(
  undefined,
);

function IntegrationProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [currentProvider, setCurrentProvider] = useState<IProvider>();
  const [environment, setEnvironment] = useState<IEnvironment>("production");
  const [valueProdApi, setValueProdApi] = useState(
    "7ff7f9d45c3d4c73b83cc651864edaae",
  );
  const [valueHomologApi, setValueHomologApi] = useState(
    "7ff7f9d45c3d4c73b83cc651864edaae",
  );
  const value = {
    environment,
    setEnvironment,
    valueProdApi,
    setValueProdApi,
    valueHomologApi,
    setValueHomologApi,
    currentProvider,
    setCurrentProvider,
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
