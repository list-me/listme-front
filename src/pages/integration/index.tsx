import { useEffect, useState } from "react";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { Content, TitlePage } from "../templates/styles";
import { CardsContainerIntegration, ContainerIntegration } from "./styles";
import InlineMenu from "../../components/Integration/InlineMenu";
import IntegrationCard from "../../components/Integration/IntegrationCard";
import StepModal from "../../components/StepModal";
import DefaultInput from "../../components/DefaultInput";
import StepModalsContents from "../../components/Integration/StepModalsContents";

function Integration(): JSX.Element {
  const [fromToIsOpened, setFromToIsOpened] = useState(false);

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

  const menus: {
    value: string;
    label: string;
    status: "incomplete" | "done" | "";
  }[] = [
    { value: "seeAll", label: "Ver todos", status: "" },
    { value: "active", label: "Ativos", status: "" },
    { value: "inactive", label: "Inativos", status: "" },
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
            <IntegrationCard
              done={false}
              onClickPrimaryButtonDone={() => ""}
              onClickSecondaryButtonDone={() => ""}
              onClickNotDone={() => {
                setFromToIsOpened(true);
              }}
            />
            <IntegrationCard
              done
              onClickPrimaryButtonDone={() => ""}
              onClickSecondaryButtonDone={() => ""}
              onClickNotDone={() => setFromToIsOpened(true)}
            />
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
