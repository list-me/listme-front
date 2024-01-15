import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { IFieldsByID, ITemplatesById } from "./companyIntegration";
import IntegrationNavigate from "../../components/Integration/IntegrationNavigate";
import { integrationsRequest } from "../../services/apis/requests/integration";
import { useProductContext } from "../../context/products";
import { templateRequests } from "../../services/apis/requests/template";
import { IPaginationTemplate } from "../templates/templates";
import { DataField } from "../../components/CustomTable/components/HeaderDropDown/components/NewColumn/RelationForm/RelationForm";
import { ReactComponent as RightArrowIcon } from "../../assets/right-arrow-small.svg";
import DefaultForm from "../../components/Integration/DefaultForm";
import nextMenu from "./utils/nextMenu";
import { NextButton } from "../../components/Integration/IntegrationNavigate/styles";
import { ROUTES } from "../../constants/routes";
import menus from "./utils/menus";

function Integration(): JSX.Element {
  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const pathnameSize = pathnameSplited.length;
  const integrationId = pathnameSplited[pathnameSize - 1];
  const path = pathnameSplited[pathnameSize - 2];
  const navigate = useNavigate();
  const [templates, setTemplates] = useState();

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

  const [menuActivated, setMenuActivated] = useState<string>(path);

  const { environment, setEnvironment } = useIntegration();

  const dualOptions = [
    { label: "Homologação", value: "HOMOLOG" },
    { label: "Produção", value: "PROD" },
  ];

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

  useEffect(() => {
    setHeaderSelectValue(null);
  }, [menuActivated]);

  const toClear = (): void => {
    setHeaderSelectValue(null);
  };

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
                integrationId={integrationId}
              />
              {templates && (
                <HeaderSelect
                  headerSelectValue={headerSelectValue}
                  setHeaderSelectValue={(e: any) => {
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
                  valueColLeft={headerSelectValue}
                />
              )}
              <IntegrationNavigate external={false} toClear={toClear} />
            </ContainerIntegration>
            {nextMenu !== null && (
              <NextButton
                onClick={() => {
                  setMenuActivated((nextMenu[menuActivated] as any).value);
                  navigate(
                    `${ROUTES.INTEGRATION}/${nextMenu.value}/${integrationId}`,
                  );
                }}
              >
                {(nextMenu[menuActivated] as any).label}
                <RightArrowIcon />
              </NextButton>
            )}
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
