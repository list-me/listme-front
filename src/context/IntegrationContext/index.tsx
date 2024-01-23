import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import {
  IEnvironment,
  IErrorsIntegrations,
  IntegrationContextType,
} from "./IntegrationContext";
import {
  IDataCardList,
  IMenuInlineActivated,
  IProvider,
} from "../../models/integration/integration";
import menus from "../../pages/companyIntegration/utils/menus";
import { integrationsRequest } from "../../services/apis/requests/integration";

const IntegrationContext = createContext<IntegrationContextType | undefined>(
  undefined,
);

function IntegrationProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [errors, setErrors] = useState<IErrorsIntegrations>(
    {} as IErrorsIntegrations,
  );
  const [searchIntegration, setSearchIntegration] = useState<string>("");
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [sidebarErrorOpened, setSidebarErrorOpened] = useState(false);
  const [mode, setMode] = useState<"editing" | "registration">("registration");
  const [currentProvider, setCurrentProvider] = useState<IProvider>(
    {} as IProvider,
  );
  const [environment, setEnvironment] = useState<IEnvironment>("production");
  const [valueProdApi, setValueProdApi] = useState(
    "7ff7f9d45c3d4c73b83cc651864edaae",
  );
  const [valueHomologApi, setValueHomologApi] = useState(
    "7ff7f9d45c3d4c73b83cc651864edaae",
  );

  const [currentMenus, setCurrentMenus] = useState(menus);

  const [menuActivated, setMenuActivated] =
    useState<IMenuInlineActivated>("seeAll");

  const value = {
    environment,
    setEnvironment,
    valueProdApi,
    setValueProdApi,
    valueHomologApi,
    setValueHomologApi,
    currentProvider,
    setCurrentProvider,
    mode,
    setMode,
    currentMenus,
    setCurrentMenus,
    errors,
    setErrors,
    sidebarErrorOpened,
    setSidebarErrorOpened,
    offset,
    setOffset,
    limit,
    searchIntegration,
    setSearchIntegration,
    menuActivated,
    setMenuActivated,
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
