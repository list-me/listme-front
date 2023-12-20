import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { Content, TitlePage } from "../templates/styles";
import { CardsContainerIntegration, ContainerIntegration } from "./styles";
import InlineMenu from "../../components/Integration/InlineMenu";
import IntegrationCard from "../../components/Integration/IntegrationCard";
import StepModal from "../../components/StepModal";
import StepModalsContents from "../../components/Integration/StepModalsContents";
import { ROUTES } from "../../constants/routes";

function Integration(): JSX.Element {
  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
  }, []);

  const navigate = useNavigate();

  const [fromToIsOpened, setFromToIsOpened] = useState(false);

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

  // aqui tem q ser alterado pra se comportar de acordo com a api
  const [isActive, setIsActive] = useState(false);

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
