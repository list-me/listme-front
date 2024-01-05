import { useEffect } from "react";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { Content, TitlePage } from "../templates/styles";
import { ContainerIntegration } from "./styles";

function Integration(): JSX.Element {
  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
  }, [defaultFilter, setConditions, setFilterStatus, setFilters]);

  return (
    <TemplateDefault handleGetTemplates={() => ""}>
      <Content>
        <TitlePage> Integrações </TitlePage>
        <ContainerIntegration />
      </Content>
    </TemplateDefault>
  );
}

export default Integration;
