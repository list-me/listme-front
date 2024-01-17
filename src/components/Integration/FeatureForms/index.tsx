/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { ContainerIntegration } from "../IntegrationForms/CharacteriscFormIntegration/styles";
import CharacteristicTypeSelector from "../CharacteristicTypeSelector";
import NewFeature from "../NewFeature";
import HeaderSelect from "../HeaderSelect";
import Menus from "../../../utils/Integration/Menus";
import SelectComponent from "../../Select";

function FeatureForms({
  setCharacteristicType,
  changeListValue,
  payloadsToFinish,
  setPayloadsToFinish,
  characteristicsType,
  templates,
  headerSelectValues,
  menuActivated,
  setHeaderSelectValues,
  getHeaderCols,
  colHeaderSelectValue,
  setColHeaderSelectValue,
  colOptions,
}: {
  colOptions: any[];
  setColHeaderSelectValue: React.Dispatch<React.SetStateAction<any[]>>;
  colHeaderSelectValue: any[];
  getHeaderCols: (id: string, index: number) => void;
  menuActivated: string;
  headerSelectValues: any[];
  templates: any;
  setCharacteristicType: React.Dispatch<
    React.SetStateAction<"catalog"[] | "column"[]>
  >;
  characteristicsType: "catalog"[] | "column"[];
  changeListValue: (
    value: string,
    index: number,
    list: any[],
    setValue: React.Dispatch<React.SetStateAction<any>>,
  ) => void;
  payloadsToFinish: {
    templateConfigPayloadId: string;
    type: string;
    value: {
      templateId: string;
      fieldId: string;
    };
  }[][];
  setHeaderSelectValues: React.Dispatch<React.SetStateAction<any[]>>;
  setPayloadsToFinish: React.Dispatch<
    React.SetStateAction<
      {
        templateConfigPayloadId: string;
        type: string;
        value: {
          templateId: string;
          fieldId: string;
        };
      }[][]
    >
  >;
}): JSX.Element {
  return (
    <>
      {payloadsToFinish.map(
        (bItem, index) =>
          index !== 0 && (
            <ContainerIntegration key={index}>
              <CharacteristicTypeSelector
                value={characteristicsType[index]}
                setValue={setCharacteristicType}
                onChange={changeListValue}
                index={index}
                listValue={characteristicsType}
              />
              {templates && (
                <div style={{ display: "flex", gap: "32px" }}>
                  <HeaderSelect
                    headerSelectValue={headerSelectValues[index]}
                    setHeaderSelectValue={(e: any) => {
                      changeListValue(
                        e,
                        index,
                        headerSelectValues,
                        setHeaderSelectValues,
                      );
                      getHeaderCols(e.value.id, index);
                    }}
                    label={`Selecione o catálogo de "${Menus[menuActivated]}"`}
                    placeHolder="Selecione..."
                    options={templates as any}
                    required
                  />
                  {characteristicsType[index] === "column" && (
                    <SelectComponent
                      select={colHeaderSelectValue[index]}
                      onChange={(e: any) => {
                        changeListValue(
                          e,
                          0,
                          colHeaderSelectValue,
                          setColHeaderSelectValue,
                        );
                      }}
                      options={colOptions[index]}
                      small
                      inline
                      labelText="Selecione a coluna"
                      placeHolder="Selecione..."
                      required
                      isDisabled={!colOptions[index]}
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
                  valueColLeft={headersSelect[index]}
                  payloadToFinish={payloadsToFinish[index]}
                />
              )}
            </ContainerIntegration>
          ),
      )}

      <>
        <NewFeature
          onClick={() => {
            const value = [
              {
                templateConfigPayloadId: "",
                type: "",
                value: {
                  templateId: "",
                  fieldId: "",
                },
              },
            ];
            const copyPayloads = [...payloadsToFinish];
            copyPayloads.push(value);
            setPayloadsToFinish(copyPayloads);
            const copyCharacteristicsType = [...characteristicsType, "catalog"];

            setCharacteristicType(copyCharacteristicsType as any);
          }}
        />
        {/* <IntegrationNavigate
          external
          toClear={() => {
            toClear();
            setHeadersSelect([null]);
          }}
          onSave={() => console.log(payloadsToFinish)}
          isDisabled={!headerSelectValue || done === "done"}
        /> */}
      </>
    </>
  );
}

export default FeatureForms;
