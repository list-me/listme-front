import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TemplateDefault from "../../../TemplateDefault";

import {
  BoxesIntegration,
  ContainerContent,
  ContainerIntegration,
  ContentIntegration,
  TitleSwitchContainer,
} from "./styles";

import HeaderSelect from "../../HeaderSelect";
import InlineMenu from "../../InlineMenu";
import DualSwitch from "../../DualSwitch";
import Menus from "../../../../utils/Integration/Menus";
import { useIntegration } from "../../../../context/IntegrationContext";
import IntegrationNavigate from "../../IntegrationNavigate";
import { integrationsRequest } from "../../../../services/apis/requests/integration";
import { templateRequests } from "../../../../services/apis/requests/template";
import { ReactComponent as RightArrowIcon } from "../../../../assets/right-arrow-small.svg";
import DefaultForm from "../../DefaultForm";
import { NextButton } from "../../IntegrationNavigate/styles";
import { ROUTES } from "../../../../constants/routes";
import { TitlePage } from "../../../../pages/templates/styles";
import { IPaginationTemplate } from "../../../../pages/templates/templates";
import nextMenu from "../../../../pages/companyIntegration/utils/nextMenu";
import { ITemplatesById } from "../../../../pages/companyIntegration/companyIntegration";
import { IDataToEdit } from "../../../../context/IntegrationContext/IntegrationContext";

function DefaultFormIntegration(): JSX.Element {
  const {
    currentMenus,
    setCurrentMenus,
    environment,
    setEnvironment,
    valueProdApi,
    valueHomologApi,
    currentProvider,
    mode,
  } = useIntegration();

  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const pathnameSize = pathnameSplited.length;
  const integrationId = pathnameSplited[pathnameSize - 1];
  const path = pathnameSplited[pathnameSize - 2];
  const navigate = useNavigate();
  const [templates, setTemplates] = useState();
  const [dataToEdit, setDataToEdit] = useState<IDataToEdit>({} as IDataToEdit);
  const [headerSelectValue, setHeaderSelectValue] = useState(null);

  const [templatesById, setTemplatesById] = useState<ITemplatesById>(
    {} as ITemplatesById,
  );

  const currentField = templatesById?.payloads?.fields.find((item) => {
    return item.endpointPath === `/${path}`;
  });
  let payloadToFinish = Array.from(
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

  const handleGetTemplates = useCallback(
    ({ page, limit }: IPaginationTemplate): void => {
      templateRequests
        .list({ limit, page, list: true })
        .then((response) => {
          const newTemplate = response.map((item: any) => {
            return { label: item.name, value: item };
          });

          setTemplates(newTemplate);

          if (mode === "editing" && dataToEdit?.id) {
            const { templateTriggerId } = dataToEdit.fields.entity;
            const headerSelectValueToEdit = (newTemplate as any).find(
              (temp: any) => temp.value.id === templateTriggerId,
            );
            setHeaderSelectValue(headerSelectValueToEdit);
            // @ts-ignore
            // eslint-disable-next-line react-hooks/exhaustive-deps
            payloadToFinish = dataToEdit?.fields?.entity?.payloads;
          }
        })
        .catch((error) => {
          toast.error("Ocorreu um erro ao listar os catálogos");
          console.error(error);
        });
    },
    [dataToEdit?.fields?.entity, mode],
  );

  useEffect(() => {
    if (mode === "registration") {
      handleGetTemplates({ page: 0, limit: 100 });
    }
    if (mode === "editing") {
      handleGetTemplates({ page: 0, limit: 100 });
    }
  }, [dataToEdit?.id, handleGetTemplates, mode]);

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

      const copyCurrentMenus = [...currentMenus];
      currentMenus.forEach((fItem, index) => {
        const fieldFinded = configTemplatesById.payloads.fields.find(
          (findItem: any) => {
            return findItem.endpointPath === `/${fItem.value}`;
          },
        );
        if (fieldFinded.payload[0].id) {
          copyCurrentMenus[index] = {
            ...copyCurrentMenus[index],
            status: "done",
          };
        }
      });
      setCurrentMenus(copyCurrentMenus);
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
      if (mode === "editing" && dataToEdit?.id)
        await templateRequests.patchIntegration(dataToEdit.id, body);
      else await templateRequests.postIntegration(body);
      toast.success(
        `Configuração de ${Menus[menuActivated]} realizado(a) com sucesso.`,
      );
      updateDone();
    } catch (err) {
      console.log(err);
      toast.error(`Ocorreu um erro ao configurar ${Menus[menuActivated]}`);
    }
  };

  const toClear = (): void => {
    setHeaderSelectValue(null);
  };

  const changeEnvironment = async (
    value: "sandbox" | "production",
  ): Promise<void> => {
    const body = {
      production_key: valueProdApi,
      sandbox_key: valueHomologApi,
      environment: value,
      custom_configs: {
        organization_id: currentProvider.config.custom_configs.organization_id,
      },
      status: currentProvider.config.status,
    };
    try {
      await integrationsRequest.patchIntegrationsConfig(
        currentProvider.config.id,
        body,
      );
      setEnvironment(value);
      toast.success(`Ambiente atualizado com sucesso.`);
    } catch (err) {
      toast.success(`Erro ao atualizar ambiente`);
    }
  };

  useEffect(() => {
    const getDataToEdit = async (id: string): Promise<void> => {
      const response: IDataToEdit[] =
        await integrationsRequest.getTemplateEntity(id);

      setDataToEdit(response[0]);
    };
    if (mode === "editing" && currentField?.id) {
      getDataToEdit(currentField?.id);
    }
  }, [currentField?.id, mode]);

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
              setValue={changeEnvironment as any}
            />
          </TitleSwitchContainer>
          <BoxesIntegration>
            <ContainerIntegration>
              <InlineMenu
                menus={currentMenus}
                menuActivated={menuActivated}
                setMenuActivated={setMenuActivated}
                integrationId={integrationId}
                mode={mode}
              />

              <HeaderSelect
                headerSelectValue={headerSelectValue}
                setHeaderSelectValue={(e: any) => {
                  setHeaderSelectValue(e);
                }}
                label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                placeHolder="Selecione..."
                options={templates as any}
                required
                done={mode === "registration" && done === "done"}
              />

              {currentField?.id && (
                <DefaultForm
                  characteristic={false}
                  leftColumnName="Propriedades de payloads Nexaas"
                  centerColumnName="Catálogo ListMe"
                  rightColumnName="Campo ListMe"
                  dataForm={currentField}
                  valueColLeft={headerSelectValue}
                  payloadToFinish={payloadToFinish}
                  type="column"
                  done={mode === "registration" && done === "done"}
                  dataToEdit={dataToEdit}
                />
              )}
              <IntegrationNavigate
                external={false}
                done={mode === "registration" && done === "done"}
                toClear={toClear}
                onSave={onFinish}
                isDisabled={
                  mode === "registration" &&
                  (!headerSelectValue || done === "done")
                }
              />
            </ContainerIntegration>

            {(nextMenu[menuActivated] as any)?.label && (
              <NextButton
                onClick={() => {
                  setMenuActivated((nextMenu[menuActivated] as any).value);
                  navigate(
                    `${ROUTES.INTEGRATION}/${
                      (nextMenu[menuActivated] as any).value
                    }/${integrationId}`,
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

export default DefaultFormIntegration;
