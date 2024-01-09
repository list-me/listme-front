import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { Content, TitlePage } from "../templates/styles";
import { CardsContainerIntegration, ContainerIntegration } from "./styles";
import InlineMenu from "../../components/Integration/InlineMenu";
import IntegrationCard from "../../components/Integration/IntegrationCard";
import StepModal from "../../components/StepModal";
import StepModalsContents from "../../components/Integration/StepModalsContents";
import { integrationsRequest } from "../../services/apis/requests/integration";
import {
  IDataCardList,
  IMenuInlineActivated,
  IMenuToInlineMenuList,
} from "../../models/integration/integration";
import logoMock from "../../components/Integration/IntegrationCard/mock/logoIntegration.png";

function Integration(): JSX.Element {
  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fromToIsOpened, setFromToIsOpened] = useState(false);

  const [menuActivated, setMenuActivated] =
    useState<IMenuInlineActivated>("seeAll");

  const menus: IMenuToInlineMenuList = [
    { value: "seeAll", label: "Ver todos", status: "" },
    { value: "active", label: "Ativos", status: "" },
    { value: "inactive", label: "Inativos", status: "" },
  ];

  const [listDataCard, setListDataCard] = useState<IDataCardList>();

  async function getConfigTemplatesList(
    status: IMenuInlineActivated,
  ): Promise<void> {
    try {
      const configTemplatesList = await integrationsRequest.listConfigTemplates(
        status,
      );
      setListDataCard(configTemplatesList);
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao buscar a lista de integrações");
    }
  }

  useEffect(() => {
    getConfigTemplatesList(menuActivated);
  }, [menuActivated]);

  return (
    <TemplateDefault handleGetTemplates={() => ""}>
      <Content>
        <TitlePage> Integrações </TitlePage>
        <ContainerIntegration>
          <InlineMenu
            menus={menus}
            menuActivated={menuActivated}
            setMenuActivated={setMenuActivated}
          />
          <CardsContainerIntegration>
            {listDataCard?.map((item) => (
              <IntegrationCard
                done={!!item?.config?.id}
                onClickPrimaryButtonDone={() => ""}
                onClickSecondaryButtonDone={() => ""}
                onClickNotDone={() => {
                  setFromToIsOpened(true);
                }}
                isActive={item?.config?.status === "active"}
                setIsActive={() => ""}
                title={item.name}
                description={item.description}
                // thumb={item.thumbnailUrl || logoMock}
                thumb={logoMock}
              />
            ))}
            {/* <IntegrationCard
              done={false}
              onClickPrimaryButtonDone={() => ""}
              onClickSecondaryButtonDone={() => ""}
              onClickNotDone={() => {
                setFromToIsOpened(true);
              }}
              isActive={isActive}
              setIsActive={setIsActive}
            />
            <IntegrationCard
              done
              onClickPrimaryButtonDone={() =>
                navigate(`${ROUTES.INTEGRATION}/oi`)
              }
              onClickSecondaryButtonDone={() => ""}
              onClickNotDone={() => setFromToIsOpened(true)}
              isActive={!isActive}
              setIsActive={setIsActive}
            /> */}
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
