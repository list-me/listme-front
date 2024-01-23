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
  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const pathnameSize = pathnameSplited.length;
  const providerId = pathnameSplited[pathnameSize - 1];
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

  const [listDataCard, setListDataCard] = useState<IDataCardList>();

  const getConfigTemplatesList = useCallback(
    async (status: IMenuInlineActivated): Promise<void> => {
      try {
        const configTemplatesList =
          await integrationsRequest.listConfigTemplates(status);
        if (providerId) {
          const toProvider = configTemplatesList.find((item: IProvider) => {
            return item.id === providerId;
          });
          setCurrentProvider(toProvider);
          setEnvironment(toProvider.config.environment);
        }

        setListDataCard(configTemplatesList);
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao buscar a lista de integrações");
      }
    },
    [providerId],
  );

  useEffect(() => {
    getConfigTemplatesList(menuActivated);
  }, [getConfigTemplatesList, menuActivated]);

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
    listDataCard,
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
