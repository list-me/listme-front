import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { Content, TitlePage } from "../templates/styles";
import { CardsContainerIntegration, ContainerIntegration } from "./styles";
import InlineMenu from "../../components/Integration/InlineMenu";
import IntegrationCard from "../../components/Integration/IntegrationCard";
import StepModal from "../../components/StepModal";
import StepModalsContents from "../../components/Integration/StepModalsContents";
import {
  IDataCardList,
  IMenuInlineActivated,
  IMenuToInlineMenuList,
  IProvider,
} from "../../models/integration/integration";
import logoMock from "../../components/Integration/IntegrationCard/mock/logoIntegration.png";
import { useIntegration } from "../../context/IntegrationContext";
import { integrationsRequest } from "../../services/apis/requests/integration";

function Integration(): JSX.Element {
  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  const {
    setCurrentProvider,
    setMode,
    setEnvironment,
    setValueHomologApi,
    setValueProdApi,
    menuActivated,
    setMenuActivated,
  } = useIntegration();
  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fromToIsOpened, setFromToIsOpened] = useState(false);

  const menus: IMenuToInlineMenuList = [
    { value: "seeAll", label: "Ver todos", status: "" },
    { value: "active", label: "Ativos", status: "" },
    { value: "inactive", label: "Inativos", status: "" },
  ];

  const [listDataCard, setListDataCard] = useState<IDataCardList>();

  const getConfigTemplatesList = useCallback(
    async (status: IMenuInlineActivated): Promise<void> => {
      try {
        const configTemplatesList =
          await integrationsRequest.listConfigTemplates(status);

        setListDataCard(configTemplatesList);
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao buscar a lista de integrações");
      }
    },
    [],
  );

  useEffect(() => {
    getConfigTemplatesList(menuActivated);
  }, [getConfigTemplatesList, menuActivated]);

  const deleteConfigById = async (id: string): Promise<void> => {
    try {
      await integrationsRequest.deleteIntegrationConfig(id);
      getConfigTemplatesList(menuActivated);
      toast.success(`Integração deletada com sucesso`);
    } catch (error) {
      console.log(error);
      toast.error(`Ocorreu um erro ao deletar integração`);
    }
  };

  return (
    <TemplateDefault handleGetTemplates={() => ""} templates={[]}>
      <Content>
        <TitlePage> Integrações </TitlePage>
        <ContainerIntegration>
          <InlineMenu
            menus={menus}
            menuActivated={menuActivated}
            setMenuActivated={setMenuActivated}
            integrationId={null}
            mode={null}
            setMode={() => ""}
          />
          <CardsContainerIntegration>
            {listDataCard?.map((item: IProvider) => (
              <IntegrationCard
                done={!!item?.config?.id}
                onClickPrimaryButtonDone={() => {
                  setMode("editing");
                  setEnvironment(
                    item.config.environment as "sandbox" | "production",
                  );
                  setValueHomologApi(item.config.sandbox_key);
                  setValueProdApi(item.config.production_key);
                  setCurrentProvider(item);
                  setFromToIsOpened(true);
                }}
                deleteFunction={deleteConfigById}
                onClickNotDone={() => {
                  setMode("registration");
                  setCurrentProvider(item);
                  setFromToIsOpened(true);
                }}
                item={item}
                isActive={item?.config?.status === "active"}
                // thumb={item.thumbnailUrl || logoMock}
                thumb={logoMock}
              />
            ))}
          </CardsContainerIntegration>
        </ContainerIntegration>
      </Content>

      <StepModal
        title="Integrando com Nexaas"
        setFromToIsOpened={setFromToIsOpened}
        fromToIsOpened={fromToIsOpened}
        stepMode={false}
        stepsArray={[]}
        large={false}
      >
        <StepModalsContents />
      </StepModal>
    </TemplateDefault>
  );
}

export default Integration;
