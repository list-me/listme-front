/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { ContainerIntegration } from "../IntegrationForms/CharacteriscFormIntegration/styles";
import CharacteristicTypeSelector from "../CharacteristicTypeSelector";
import NewFeature from "../NewFeature";
import HeaderSelect from "../HeaderSelect";
import Menus from "../../../utils/Integration/Menus";
import SelectComponent from "../../Select";
import DefaultForm from "../DefaultForm";
import { IFieldsByID } from "../../../pages/companyIntegration/companyIntegration";
import IntegrationNavigate from "../IntegrationNavigate";
import { IDataToEdit } from "../../../context/IntegrationContext/IntegrationContext";

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
  currentField,
  toClear,
  onSave,
  filteredOptions,
  done,
  dataToEdit,
}: {
  dataToEdit: IDataToEdit[];
  done: boolean;
  filteredOptions: (list: any) => void;
  onSave: () => void;
  toClear: () => void;
  currentField: IFieldsByID | undefined;
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
      {payloadsToFinish
        .filter((element) => element !== undefined)
        .map(
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
                      done={done}
                      headerSelectValue={headerSelectValues[index]}
                      setHeaderSelectValue={(e: any) => {
                        changeListValue(
                          e,
                          index,
                          headerSelectValues,
                          setHeaderSelectValues,
                        );
                        changeListValue(
                          null as any,
                          index,
                          colHeaderSelectValue,
                          setColHeaderSelectValue,
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
                            index,
                            colHeaderSelectValue,
                            setColHeaderSelectValue,
                          );
                        }}
                        options={filteredOptions(colOptions[index])}
                        small
                        inline
                        subLabel="Apenas campos de múltipla escolha"
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
                    dataToEdit={dataToEdit as IDataToEdit[]}
                    leftColumnName="Propriedades de payloads Nexaas"
                    centerColumnName="Catálogo ListMe"
                    rightColumnName=""
                    dataForm={currentField}
                    valueColLeft={headerSelectValues[index]}
                    payloadToFinish={payloadsToFinish[index]}
                    type={characteristicsType[index]}
                    done={done}
                    characteristic
                    infoLeftColumnName=""
                    infoCenterColumnName=""
                    infoRightColumnName="Refere-se à coluna do catálogo selecionado da ListMe"
                  />
                )}
              </ContainerIntegration>
            ),
        )}

      <>
        <NewFeature
          isDisabled={done}
          onClick={() => {
            const value = Array.from(
              { length: (currentField as any)?.payload?.length || 0 },
              () => ({
                multiple: false,
                templateConfigPayloadId: "",
                type: "",
                value: {
                  templateId: "",
                  fieldId: "",
                },
              }),
            );
            const copyPayloads = [...payloadsToFinish];
            copyPayloads.push(value);
            setPayloadsToFinish(copyPayloads);
            const copyCharacteristicsType = [...characteristicsType, "catalog"];

            setCharacteristicType(copyCharacteristicsType as any);
          }}
          text="Nova característica"
        />
        <IntegrationNavigate
          external
          toClear={() => {
            toClear();
          }}
          onSave={onSave}
          done={done}
          isDisabled={done}
        />
      </>
    </>
  );
}

export default FeatureForms;
