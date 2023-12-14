import { useEffect, useState } from "react";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { Content, TitlePage } from "../templates/styles";
import { CardsContainerIntegration, ContainerIntegration } from "./styles";
import InlineMenu from "../../components/Integration/InlineMenu";
import IntegrationCard from "../../components/Integration/IntegrationCard";

function Integration(): JSX.Element {
  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
  }, [defaultFilter, setConditions, setFilterStatus, setFilters]);

  const [menuActivated, setMenuActivated] = useState<
    "seeAll" | "active" | "inactive"
  >("seeAll");

  const menus = [
    { value: "seeAll", label: "Ver todos" },
    { value: "active", label: "Ativos" },
    { value: "inactive", label: "Inativos" },
  ];

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
            <IntegrationCard done={false} />
            <IntegrationCard done />
          </CardsContainerIntegration>
        </ContainerIntegration>
      </Content>
    </TemplateDefault>
  );
}

export default Integration;
