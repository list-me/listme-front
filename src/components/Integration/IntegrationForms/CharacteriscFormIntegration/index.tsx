import { useEffect, useState } from "react";
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
import IntegrationNavigate from "../../IntegrationNavigate";
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

function CharacteriscFormIntegration(): JSX.Element {
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
  const [payloadsToFinish, setPayloadsToFinish] = useState([
    Array.from({ length: (currentField as any)?.payload?.length || 0 }, () => ({
      templateConfigPayloadId: "",
      type: "",
      value: {
        templateId: "",
        fieldId: "",
      },
    })),
  ]);

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

  // const [colHeaderSelect, setColHeaderSelect] = useState({});

  const [characteristicsType, setCharacteristicType] = useState<
    "catalog"[] | "column"[]
  >(["catalog"]);

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

  const [colOptions, setColOptions] = useState([]);
  const [headerSelectValues, setHeaderSelectValues] = useState([]);

  const [colHeaderSelectValue, setColHeaderSelectValue] = useState([]);

  const getHeaderCols = (id: string, index: number): void => {
    templateRequests
      .get(id)
      .then((response) => {
        const fieldsMap = response.fields.fields.map((mItem: any) => {
          return { label: mItem.title, value: mItem };
        });
        changeListValue(fieldsMap, index, colOptions, setColOptions);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos relacionados");
        console.error(error);
      });
  };

  useEffect(() => {
    setHeaderSelectValues([]);
    setColHeaderSelectValue([]);
    setColOptions([]);
  }, [menuActivated]);

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
                      getHeaderCols(e.value.id, 0);
                    }}
                    label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                    placeHolder="Selecione..."
                    options={templates as any}
                    required
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
                      options={colOptions[0]}
                      small
                      inline
                      labelText="Selecione a coluna"
                      placeHolder="Selecione..."
                      required
                      isDisabled={!colOptions[0]}
                    />
                  )}
                </div>
              )}
              {currentField?.id && (
                <DefaultForm
                  leftColumnName="Propriedades de payloads Nexaas"
                  centerColumnName="Catálogo ListMe"
                  rightColumnName="Campo ListMe"
                  dataForm={currentField}
                  valueColLeft={headerSelectValues[0]}
                  payloadToFinish={payloadsToFinish[0]}
                />
              )}
            </ContainerIntegration>
            {/* aqui */}
            <FeatureForms
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
            />

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

export default CharacteriscFormIntegration;
