import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import TemplateDefault from "../../components/TemplateDefault";

import { TitlePage } from "../templates/styles";
import {
  BoxesIntegration,
  ContainerContent,
  ContainerIntegration,
  ContentIntegration,
  TitleSwitchContainer,
} from "./styles";
import HeaderSelect from "../../components/Integration/HeaderSelect";
import InlineMenu from "../../components/Integration/InlineMenu";
import DualSwitch from "../../components/Integration/DualSwitch";
import Menus from "../../utils/Integration/Menus";
import { useIntegration } from "../../context/IntegrationContext";
import {
  IFieldsByID,
  IMenuActivated,
  ITemplatesById,
} from "./companyIntegration";
import IntegrationNavigate from "../../components/Integration/IntegrationNavigate";
import { integrationsRequest } from "../../services/apis/requests/integration";
import { useProductContext } from "../../context/products";
import { templateRequests } from "../../services/apis/requests/template";
import { IPaginationTemplate } from "../templates/templates";
import { DataField } from "../../components/CustomTable/components/HeaderDropDown/components/NewColumn/RelationForm/RelationForm";
import DefaultForm from "../../components/Integration/DefaultForm";

function Integration(): JSX.Element {
  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const pathnameSize = pathnameSplited.length;
  const integrationId = pathnameSplited[pathnameSize - 1];
  const path = pathnameSplited[pathnameSize - 2] as IMenuActivated;
  const [templates, setTemplates] = useState();

  const [relatedTemplates, setRelatedTemplates] = useState<DataField[]>([]);

  function getRelatedTemplates(id: string): void {
    templateRequests
      .get(id)
      .then((response) => {
        const relations = response.fields.fields
          .filter((fItem: any) => {
            const idOptions = fItem.options
              .filter((oItem: any) => {
                return oItem.templateId;
              })
              .map((mItem: any) => {
                return mItem.templateId;
              });
            if (idOptions.length > 0) {
              const notInitialId = !idOptions.includes(id);
              return notInitialId && fItem.type === "relation";
            }
          })
          .map((mItem: any) => {
            return { label: mItem.title, value: mItem };
          });
        setRelatedTemplates(relations);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos relacionados");
        console.error(error);
      });
  }

  const handleGetTemplates = ({ page, limit }: IPaginationTemplate): void => {
    templateRequests
      .list({ limit, page })
      .then((response) => {
        const newTemplate = response.map((item: any) => {
          return { label: item.name, value: item };
        });
        setTemplates(newTemplate);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetTemplates({ page: 0, limit: 100 });
  }, []);

  const [templatesById, setTemplatesById] = useState<ITemplatesById>(
    {} as ITemplatesById,
  );

  const currentField = templatesById?.payloads?.fields.find((item) => {
    return item.endpointPath === `/${path}`;
  });
  const [headerSelectValue, setHeaderSelectValue] = useState(null);

  const [menuActivated, setMenuActivated] = useState<IMenuActivated>(path);

  const menus: {
    value: string;
    label: string;
    status: "incomplete" | "done" | "";
  }[] = [
    {
      value: "product_brands",
      label: "Config. de Marca",
      status: "done",
    },
    {
      value: "product_categories",
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

  // const headerOptions = [
  // { label: "op1", value: "op1" },
  // { label: "op2", value: "op2" },
  // { label: "op3", value: "op3" },
  // { label: "op4", value: "op4" },
  // ];
  const { environment, setEnvironment } = useIntegration();

  const dualOptions = [
    { label: "Homologação", value: "HOMOLOG" },
    { label: "Produção", value: "PROD" },
  ];

  // const nextMenu: {
  //   [key: string]: { value: IMenuActivated; label: string } | null;
  // } = {
  //   product_categories: {
  //     value: "FeatureConfiguration",
  //     label: "Config. de Características",
  //   },
  //   product_brands: {
  //     value: "product_categories",
  //     label: "Config. de Categorias",
  //   },
  //   ProductConfiguration: {
  //     value: "SKUConfiguration",
  //     label: "Config. de SKU",
  //   },
  //   FeatureConfiguration: {
  //     value: "ProductConfiguration",
  //     label: "Config. de Produtos",
  //   },
  //   SKUConfiguration: null,
  // };

  async function getConfigTemplatesById(id: string): Promise<void> {
    try {
      const configTemplatesById =
        await integrationsRequest.listConfigTemplatesId(id);

      setTemplatesById(configTemplatesById);
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao buscar a lista de integrações");
    }
  }

  useEffect(() => {
    if (integrationId) {
      getConfigTemplatesById(integrationId);
    }
  }, [integrationId]);

  return (
    <TemplateDefault handleGetTemplates={() => ""}>
      <ContainerContent>
        <ContentIntegration>
          <TitleSwitchContainer>
            <TitlePage>
              <span>Integrando com a</span> {templatesById?.name}
            </TitlePage>
            <DualSwitch
              value={environment}
              options={dualOptions}
              setValue={setEnvironment as any}
            />
          </TitleSwitchContainer>
          <BoxesIntegration>
            <ContainerIntegration>
              <InlineMenu
                menus={menus}
                menuActivated={menuActivated}
                setMenuActivated={setMenuActivated}
              />
              {templates && (
                <HeaderSelect
                  headerSelectValue={headerSelectValue}
                  setHeaderSelectValue={(e: any) => {
                    getRelatedTemplates(e.value.id);
                    setHeaderSelectValue(e);
                  }}
                  label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                  placeHolder="Selecione"
                  options={templates as any}
                  required
                />
              )}
              {currentField?.id && (
                <DefaultForm
                  leftColumnName="Propriedades de payloads Nexaas"
                  centerColumnName="Catálogo ListMe"
                  rightColumnName="Campo ListMe"
                  dataForm={currentField}
                  optionsColLeft={relatedTemplates}
                  allTemplates={templates as any}
                />
              )}
              {/* <IntegrationNavigate
                external={false}
                nextMenu={nextMenu[menuActivated]}
                setNextMenu={setMenuActivated}
              /> */}
            </ContainerIntegration>
            {/* <ContainerIntegration> */}
            {/* <HeaderSelect
                headerSelectValue={headerSelectValue}
                setHeaderSelectValue={setHeaderSelectValue}
                label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                placeHolder="Selecione"
                options={headerOptions}
                required
              /> */}
            {/* <FormIntegration menuActivated={menuActivated} /> */}
            {/* </ContainerIntegration> */}
            {/* <IntegrationNavigate
              external
              nextMenu={nextMenu[menuActivated]}
              setNextMenu={setMenuActivated}
            /> */}
          </BoxesIntegration>
        </ContentIntegration>
      </ContainerContent>
    </TemplateDefault>
  );
}

export default Integration;
