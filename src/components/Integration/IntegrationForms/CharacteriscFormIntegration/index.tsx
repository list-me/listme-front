import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TemplateDefault from "../../../TemplateDefault";

import { TitlePage } from "../../../../pages/templates/styles";
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
import { ITemplatesById } from "../../../../pages/companyIntegration/companyIntegration";
import { integrationsRequest } from "../../../../services/apis/requests/integration";
import { templateRequests } from "../../../../services/apis/requests/template";
import { IPaginationTemplate } from "../../../../pages/templates/templates";
import { ReactComponent as RightArrowIcon } from "../../../../assets/right-arrow-small.svg";
import DefaultForm from "../../DefaultForm";
import nextMenu from "../../../../pages/companyIntegration/utils/nextMenu";
import { NextButton } from "../../IntegrationNavigate/styles";
import { ROUTES } from "../../../../constants/routes";
import CharacteristicTypeSelector from "../../CharacteristicTypeSelector";
import FeatureForms from "../../FeatureForms";
import SelectComponent from "../../../Select";
import { IDataToEdit } from "../../../../context/IntegrationContext/IntegrationContext";

function CharacteriscFormIntegration(): JSX.Element {
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
  const [dataToEdit, setDataToEdit] = useState<IDataToEdit[]>([
    {},
  ] as IDataToEdit[]);
  const [headerSelectValues, setHeaderSelectValues] = useState([]);
  const [payloadsToFinish, setPayloadsToFinish] = useState<any[][]>([[]]);
  const [colOptions, setColOptions] = useState([]);

  const [colHeaderSelectValue, setColHeaderSelectValue] = useState([]);

  const changeListValue = (
    value: string,
    index: number,
    list: any[],
    setValue: React.Dispatch<React.SetStateAction<any>>,
  ): void => {
    const copyList = [...list];

    copyList[index] = value;

    setValue(copyList);
  };

  const getHeaderCols = useCallback(
    (id: string, index: number): void => {
      templateRequests
        .get(id)
        .then((response) => {
          const fieldsMap = response.fields.fields.map((mItem: any) => {
            return { label: mItem.title, value: mItem };
          });
          changeListValue(fieldsMap, index, colOptions, setColOptions);
          dataToEdit.forEach((fItem, index) => {
            const itemFinded = fieldsMap.find((findItem: any) => {
              return (
                findItem.value.id ===
                fItem.fields.entity.payloads[0].value.fieldId
              );
            });
          });
        })
        .catch((error) => {
          toast.error("Ocorreu um erro ao listar os catálogos relacionados");
          console.error(error);
        });
    },
    [dataToEdit],
  );

  const handleGetTemplates = useCallback(
    ({ page, limit }: IPaginationTemplate) => {
      templateRequests
        .list({ limit, page, list: true })
        .then((response) => {
          const newTemplate = response.map((item: any) => {
            return { label: item.name, value: item };
          });

          setTemplates(newTemplate);

          if (mode === "editing") {
            const listToHeadersSelectValueToEdit: any[] = [];

            dataToEdit.forEach((itemDataToEdit: any) => {
              const entityFields = itemDataToEdit?.fields?.entity;

              if (entityFields) {
                const { templateTriggerId } = entityFields;

                const headerSelectValueToEdit = (newTemplate as any).find(
                  (temp: any) => temp.value.id === templateTriggerId,
                );

                if (headerSelectValueToEdit) {
                  listToHeadersSelectValueToEdit.push(headerSelectValueToEdit);
                }
              }
            });

            setHeaderSelectValues(listToHeadersSelectValueToEdit as any);

            listToHeadersSelectValueToEdit.forEach((fItem, index) => {
              getHeaderCols(fItem.value.id, index);
            });

            const listPayloadToFinish: any[] = [];
            dataToEdit.forEach((itemDataToEdit: any) => {
              listPayloadToFinish.push(
                itemDataToEdit?.fields?.entity?.payloads,
              );
            });
            setPayloadsToFinish(listPayloadToFinish);
          }
        })
        .catch((error) => {
          toast.error("Ocorreu um erro ao listar os catálogos");
          console.error(error);
        });
    },
    [dataToEdit, getHeaderCols, mode],
  );

  useEffect(() => {
    if (mode === "registration") handleGetTemplates({ page: 0, limit: 100 });
    if (mode === "editing" && dataToEdit[0]?.id)
      handleGetTemplates({ page: 0, limit: 100 });
  }, [dataToEdit, handleGetTemplates, mode]);

  const [templatesById, setTemplatesById] = useState<ITemplatesById>(
    {} as ITemplatesById,
  );

  const currentField = templatesById?.payloads?.fields.find((item) => {
    return item.endpointPath === `/${path}`;
  });

  useEffect(() => {
    const initialPayload = Array.from(
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
    if (currentField) {
      setPayloadsToFinish([initialPayload]);
    }
  }, [currentField]);

  const [menuActivated, setMenuActivated] = useState<string>(path);

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

  const [characteristicsType, setCharacteristicType] = useState<
    "catalog"[] | "column"[]
  >(["catalog"]);

  useEffect(() => {
    setHeaderSelectValues([]);
    setColHeaderSelectValue([]);
    setColOptions([]);
  }, [menuActivated]);
  const menusToUpdate = [...currentMenus];

  const indexMenu = menusToUpdate.findIndex((elem) => {
    return elem.value === `${menuActivated}`;
  });

  const done = menusToUpdate[indexMenu].status;

  const updateDone = (): void => {
    if (indexMenu !== -1) {
      menusToUpdate[indexMenu].status = "done";
      setCurrentMenus(menusToUpdate);
    }
  };

  const toClear = (): void => {
    setHeaderSelectValues([]);
    setColOptions([]);
    setColHeaderSelectValue([]);
    setPayloadsToFinish([
      Array.from(
        { length: (currentField as any)?.payload?.length || 0 },
        () => ({
          templateConfigPayloadId: "",
          type: "",
          value: {
            templateId: "",
            fieldId: "",
          },
        }),
      ),
    ]);
  };

  const onFinish = async (): Promise<void> => {
    if (currentField) {
      currentField.payload.forEach((item, index) => {
        payloadsToFinish[index] = payloadsToFinish[index]?.map((pItem) => {
          if (characteristicsType[index] === "catalog") {
            return {
              ...pItem,
              templateConfigPayloadId: currentField?.payload[index]?.id as any,
              type: characteristicsType[index],
              value: {
                templateId: (headerSelectValues[index] as any)?.value?.id,
              },
            };
          }
          if (characteristicsType[index] === "column") {
            return {
              ...pItem,
              templateConfigPayloadId: currentField?.payload[index]?.id as any,
              type: characteristicsType[index],
              value: {
                templateId: (headerSelectValues[index] as any)?.value?.id,
                fieldId: (colHeaderSelectValue[index] as any)?.value?.id,
              },
            };
          }
        });
      });
    }

    const isOk = payloadsToFinish.map((payload, index) => {
      if (!currentField?.id) {
        return false;
      }
      // eslint-disable-next-line array-callback-return, consistent-return
      const idsRequired = currentField?.payload
        .map((mItem, mIndex) => {
          if (mItem.required) {
            return mIndex;
          }
          return null;
        })
        .filter((elem) => {
          return typeof elem === "number";
        });

      if (idsRequired?.length === 0) {
        return false;
      }
      const notDone = payloadsToFinish[index]?.find((item, fIndex) => {
        if (idsRequired.includes(fIndex)) {
          if (item.type === "catalog" && !item.value.templateId) return item;
          if (item.type === "column" && !item.value.fieldId) return item;
        }
      });

      // eslint-disable-next-line no-useless-return
      if (characteristicsType[index] === "column" && notDone) {
        toast.warn("Algum campo obrigatório não está preenchido.");
        return false;
      }
      return true;
    });
    const onSuccess = (): void => {
      toast.success(
        `Configuração de ${Menus[menuActivated]} realizado(a) com sucesso.`,
      );
      updateDone();
    };

    const onError = (error: any): void => {
      console.error(error);
      toast.error(`Ocorreu um erro ao configurar ${Menus[menuActivated]}`);
    };

    if (isOk.every((result) => result)) {
      try {
        const requests = payloadsToFinish.map(async (payload, index) => {
          const templateConfigEntityId = currentField?.id;
          const templateTriggerId = (headerSelectValues as any)[index].value.id;
          const templateConfigId = integrationId;

          const body = {
            fields: {
              templateConfigId,
              entity: {
                templateConfigEntityId,
                templateTriggerId,
                payloads: [...payloadsToFinish[index]],
              },
            },
            type: "integration",
          };

          if (mode === "registration")
            await templateRequests.postIntegration(body);
          if (mode === "editing")
            await templateRequests.patchIntegration(dataToEdit[index].id, body);
        });

        await Promise.all(requests);

        onSuccess();
      } catch (error) {
        onError(error);
      }
    }
  };

  const filteredOptions = (list: any) => {
    return (list as any)?.filter((fItem: any) => {
      return ["radio", "checked", "list"].includes(fItem.value.type);
    });
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
      const response = await integrationsRequest.getTemplateEntity(id);

      const typelist: any[] = [];
      response.forEach((res: any) => {
        typelist.push(res.fields.entity.payloads[0].type);
      });

      setCharacteristicType(typelist as any[]);

      setDataToEdit(response);
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
              />
              <CharacteristicTypeSelector
                value={characteristicsType[0]}
                onChange={changeListValue}
                index={0}
                listValue={characteristicsType}
                setValue={setCharacteristicType}
              />
              {templates && (
                <div style={{ display: "flex", gap: "32px" }}>
                  <HeaderSelect
                    headerSelectValue={headerSelectValues[0]}
                    setHeaderSelectValue={(e: any) => {
                      changeListValue(
                        e,
                        0,
                        headerSelectValues,
                        setHeaderSelectValues,
                      );
                      changeListValue(
                        null as any,
                        0,
                        colHeaderSelectValue,
                        setColHeaderSelectValue,
                      );
                      getHeaderCols(e.value.id, 0);
                    }}
                    label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                    placeHolder="Selecione..."
                    options={templates as any}
                    required
                    done={done === "done"}
                  />
                  {characteristicsType[0] === "column" && (
                    <SelectComponent
                      select={colHeaderSelectValue[0]}
                      onChange={(e: any) => {
                        changeListValue(
                          e,
                          0,
                          colHeaderSelectValue,
                          setColHeaderSelectValue,
                        );
                      }}
                      options={filteredOptions(colOptions[0])}
                      small
                      inline
                      labelText="Selecione a coluna"
                      placeHolder="Selecione..."
                      required
                      isDisabled={done === "done" || !colOptions[0]}
                    />
                  )}
                </div>
              )}
              {currentField?.id && (
                <DefaultForm
                  leftColumnName="Propriedades de payloads Nexaas"
                  centerColumnName="Catálogo ListMe"
                  rightColumnName=""
                  dataForm={currentField}
                  valueColLeft={headerSelectValues[0]}
                  payloadToFinish={payloadsToFinish[0]}
                  type={characteristicsType[0]}
                  done={done === "done"}
                  dataToEdit={dataToEdit as IDataToEdit[]}
                  characteristic
                />
              )}
            </ContainerIntegration>
            <FeatureForms
              dataToEdit={dataToEdit}
              changeListValue={changeListValue}
              payloadsToFinish={payloadsToFinish}
              setPayloadsToFinish={setPayloadsToFinish}
              characteristicsType={characteristicsType}
              setCharacteristicType={setCharacteristicType}
              templates={templates}
              headerSelectValues={headerSelectValues}
              menuActivated={menuActivated}
              setHeaderSelectValues={setHeaderSelectValues as any}
              getHeaderCols={getHeaderCols}
              colHeaderSelectValue={colHeaderSelectValue}
              setColHeaderSelectValue={setColHeaderSelectValue as any}
              colOptions={colOptions}
              currentField={currentField}
              toClear={toClear}
              onSave={onFinish}
              filteredOptions={filteredOptions}
              done={done === "done"}
            />

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

export default CharacteriscFormIntegration;
