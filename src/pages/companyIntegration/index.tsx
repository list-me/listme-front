import { useEffect, useState } from "react";
import TemplateDefault from "../../components/TemplateDefault";
import { useFilterContext } from "../../context/FilterContext";
import { TitlePage } from "../templates/styles";
import {
  ContainerContent,
  ContainerIntegration,
  ContentIntegration,
  TitleSwitchContainer,
} from "./styles";
import HeaderSelect from "../../components/Integration/HeaderSelect";
import InlineMenu from "../../components/Integration/InlineMenu";
import DualSwitch from "../../components/Integration/DualSwitch";
import OptionalItems from "../../components/Integration/OptionalItems";
import Menus from "../../utils/Integration/Menus";
import FormIntegration from "../../components/Integration/FormIntegration";
import { useIntegration } from "../../context/IntegrationContext";

function Integration(): JSX.Element {
  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();
  const [headerSelectValue, setHeaderSelectValue] = useState<{
    value: string;
    label: string;
  } | null>(null);

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

  const headerOptions = [
    { label: "op1", value: "op1" },
    { label: "op2", value: "op2" },
    { label: "op3", value: "op3" },
    { label: "op4", value: "op4" },
  ];
  const { environment, setEnvironment } = useIntegration();

  const dualOptions = [
    { label: "Homologação", value: "HOMOLOG" },
    { label: "Produção", value: "PROD" },
  ];

  return (
    <TemplateDefault handleGetTemplates={() => ""}>
      <ContainerContent>
        <ContentIntegration>
          <TitleSwitchContainer>
            <TitlePage>
              <span>Integrando com a</span> Nexaas
            </TitlePage>
            <DualSwitch
              value={environment}
              options={dualOptions}
              setValue={setEnvironment as any}
            />
          </TitleSwitchContainer>
          <ContainerIntegration>
            <InlineMenu
              menus={menus}
              menuActivated={menuActivated}
              setMenuActivated={setMenuActivated}
            />
            <HeaderSelect
              headerSelectValue={headerSelectValue}
              setHeaderSelectValue={setHeaderSelectValue}
              label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
              placeHolder="Selecione"
              options={headerOptions}
              required
            />
            <FormIntegration stepValue={menuActivated} />
          </ContainerIntegration>
        </ContentIntegration>
      </ContainerContent>
    </TemplateDefault>
  );
}

export default Integration;
