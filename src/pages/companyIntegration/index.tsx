/* eslint-disable react/no-array-index-key */
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
import { ITemplatesById } from "./companyIntegration";
import IntegrationNavigate from "../../components/Integration/IntegrationNavigate";
import { integrationsRequest } from "../../services/apis/requests/integration";
import { templateRequests } from "../../services/apis/requests/template";
import { IPaginationTemplate } from "../templates/templates";
import { ReactComponent as RightArrowIcon } from "../../assets/right-arrow-small.svg";
import DefaultForm from "../../components/Integration/DefaultForm";
import nextMenu from "./utils/nextMenu";
import { NextButton } from "../../components/Integration/IntegrationNavigate/styles";
import { ROUTES } from "../../constants/routes";
import CharacteristicTypeSelector from "../../components/Integration/CharacteristicTypeSelector";
import NewFeature from "../../components/Integration/NewFeature";

function Integration(): JSX.Element {
  const { currentMenus, setCurrentMenus, environment, setEnvironment } =
    useIntegration();

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
  const payloadToFinish = Array.from(
    { length: (currentField as any)?.payload?.length || 0 },
    () => ({
      templateConfigPayloadId: "",
      type: "",
      value: {
        templateId: "",
        fieldId: "",
      },
    }),
  );
  const [headerSelectValue, setHeaderSelectValue] = useState(null);

  const [menuActivated, setMenuActivated] = useState<string>(path);

  const menusToUpdate = [...currentMenus];
  const indexMenu = menusToUpdate.findIndex((elem) => {
    return elem.value === `${menuActivated}`;
  });
  const done = menusToUpdate[indexMenu].status;

  const dualOptions = [
    { label: "Homologação", value: "sandbox" },
    { label: "Produção", value: "production" },
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

  const updateDone = (): void => {
    if (indexMenu !== -1) {
      menusToUpdate[indexMenu].status = "done";
      setCurrentMenus(menusToUpdate);
    }
  };

  const onFinish = async (): Promise<void> => {
    const templateConfigEntityId = currentField?.id;
    const templateTriggerId = (headerSelectValue as any).value.id;
    const templateConfigId = integrationId;
    if (!currentField?.id) {
      return;
    }
    // eslint-disable-next-line array-callback-return, consistent-return
    const idsRequired = currentField?.payload
      .map((mItem, index) => {
        if (mItem.required) {
          return index;
        }
        return null;
      })
      .filter((elem) => {
        return typeof elem === "number";
      });

    if (idsRequired?.length === 0) {
      return;
    }

    const notDone = payloadToFinish.find((item, index) => {
      if (idsRequired.includes(index)) {
        if (!item.value.fieldId) return item;
      }
    });
    // eslint-disable-next-line no-useless-return
    if (notDone) {
      toast.warn("Algum campo obrigatório não está preenchido.");
      return;
    }

    const body = {
      fields: {
        templateConfigId,
        entity: {
          templateConfigEntityId,
          templateTriggerId,
          payloads: [...payloadToFinish],
        },
      },
      type: "integration",
    };
    try {
      await templateRequests.postIntegration(body);
      toast.success(
        `Configuração de ${Menus[menuActivated]} realizado(a) com sucesso.`,
      );
      updateDone();
    } catch (err) {
      console.log(err);
      toast.error(`Ocorreu um erro ao configurar ${Menus[menuActivated]}`);
    }
  };

  const [bodys, setBodys] = useState([payloadToFinish]);
  const [headersSelect, setHeadersSelect] = useState([headerSelectValue]);

  useEffect(() => {
    if (headerSelectValue) {
      const copyHeadersSelect = headersSelect;
      copyHeadersSelect[0] = headerSelectValue;
      setHeadersSelect(copyHeadersSelect);
    }
  }, [headerSelectValue]);

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
                menus={currentMenus}
                menuActivated={menuActivated}
                setMenuActivated={setMenuActivated}
                integrationId={integrationId}
              />
              {menuActivated === "product_features" && (
                <CharacteristicTypeSelector />
              )}
              {templates && (
                <HeaderSelect
                  headerSelectValue={headerSelectValue}
                  setHeaderSelectValue={(e: any) => {
                    setHeaderSelectValue(e);
                  }}
                  label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                  placeHolder="Selecione..."
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
                  payloadToFinish={
                    menuActivated === "product_features"
                      ? bodys[0]
                      : payloadToFinish
                  }
                />
              )}
              {menuActivated !== "product_features" && (
                <IntegrationNavigate
                  external={false}
                  toClear={toClear}
                  onSave={onFinish}
                  isDisabled={!headerSelectValue || done === "done"}
                />
              )}
            </ContainerIntegration>

            {menuActivated === "product_features" &&
              bodys.map(
                (bItem, index) =>
                  index !== 0 && (
                    <ContainerIntegration key={index}>
                      <CharacteristicTypeSelector />
                      {templates && (
                        <HeaderSelect
                          headerSelectValue={headersSelect[index]}
                          setHeaderSelectValue={(e: any) => {
                            const copyHeaders = [...headersSelect];
                            copyHeaders[index] = e;
                            setHeadersSelect(copyHeaders);
                          }}
                          label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                          placeHolder="Selecione..."
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
                          valueColLeft={headersSelect[index]}
                          payloadToFinish={bodys[index]}
                        />
                      )}
                    </ContainerIntegration>
                  ),
              )}
            {menuActivated === "product_features" && (
              <>
                <NewFeature
                  onClick={() => {
                    const newBody = [
                      ...bodys,
                      [
                        {
                          templateConfigPayloadId: "",
                          type: "",
                          value: {
                            templateId: "",
                            fieldId: "",
                          },
                        },
                      ],
                    ];
                    setBodys(newBody);
                  }}
                />
                <IntegrationNavigate
                  external
                  toClear={toClear}
                  onSave={() => console.log(bodys)}
                  isDisabled={!headerSelectValue || done === "done"}
                />
              </>
            )}
            {(nextMenu[menuActivated] as any)?.label && (
              <NextButton
                onClick={() => {
                  setMenuActivated((nextMenu[menuActivated] as any).value);
                  navigate(
                    `${ROUTES.INTEGRATION}/${nextMenu.value}/${integrationId}`,
                  );
                }}
              >
                {(nextMenu[menuActivated] as any)?.label}
                <RightArrowIcon />
              </NextButton>
            )}
          </BoxesIntegration>
        </ContentIntegration>
      </ContainerContent>
    </TemplateDefault>
  );
}

export default Integration;
