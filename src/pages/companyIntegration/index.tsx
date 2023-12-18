import { useEffect, useState } from "react";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { Content, TitlePage } from "../templates/styles";
import { ContainerIntegration } from "./styles";
import InlineMenu from "../../components/Integration/InlineMenu";

function Integration(): JSX.Element {
  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
  }, [defaultFilter, setConditions, setFilterStatus, setFilters]);

  const [menuActivated, setMenuActivated] = useState<
    | "BrandConfiguration"
    | "CategoryConfiguration"
    | "FeatureConfiguration"
    | "ProductConfiguration"
    | "SKUConfiguration"
  >("BrandConfiguration");

  const menus: {
    value: string;
    label: string;
    status: "incomplete" | "done" | "";
  }[] = [
    {
      value: "BrandConfiguration",
      label: "Config. de Marca",
      status: "done",
    },
    {
      value: "CategoryConfiguration",
      label: "Config. de Categorias",
      status: "incomplete",
    },
    {
      value: "FeatureConfiguration",
      label: "Config. de Características",
      status: "incomplete",
    },
    {
      value: "ProductConfiguration",
      label: "Config. de Produtos",
      status: "incomplete",
    },
    {
      value: "SKUConfiguration",
      label: "Config. de SKU",
      status: "incomplete",
    },
  ];

  return (
    <TemplateDefault handleGetTemplates={() => ""}>
      <Content>
        <TitlePage>
          <span>Integrando com a</span> Nexaas
        </TitlePage>
        <ContainerIntegration>
          <InlineMenu
            menus={menus}
            menuActivated={menuActivated}
            setMenuActivated={setMenuActivated}
          />
        </ContainerIntegration>
      </Content>
    </TemplateDefault>
  );
}

export default Integration;
