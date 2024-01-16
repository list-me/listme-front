/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { ContainerIntegration } from "../../../pages/companyIntegration/styles";
import CharacteristicTypeSelector from "../CharacteristicTypeSelector";
import HeaderSelect from "../HeaderSelect";
import DefaultForm from "../DefaultForm";
import NewFeature from "../NewFeature";
import IntegrationNavigate from "../IntegrationNavigate";
import Menus from "../../../utils/Integration/Menus";
import { IFieldsByID } from "../../../pages/companyIntegration/companyIntegration";

function FeatureForms({
  bodys,
  headerSelectValue,
  setBodys,
  templates,
  menuActivated,
  currentField,
  toClear,
  done,
}: {
  bodys: {
    templateConfigPayloadId: string;
    type: string;
    value: {
      templateId: string;
      fieldId: string;
    };
  }[][];
  headerSelectValue: any;
  setBodys: React.Dispatch<
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
  templates: any;
  menuActivated: string;
  currentField: IFieldsByID | undefined;
  toClear: () => void;
  done: "" | "done" | "undone";
}): JSX.Element {
  const [headersSelect, setHeadersSelect] = useState([headerSelectValue]);

  useEffect(() => {
    if (headerSelectValue) {
      const copyHeadersSelect = headersSelect;
      copyHeadersSelect[0] = headerSelectValue;
      setHeadersSelect(copyHeadersSelect);
    }
  }, [headerSelectValue]);

  return (
    <>
      {bodys.map(
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
          toClear={() => {
            toClear();
            setHeadersSelect([null]);
          }}
          onSave={() => console.log(bodys)}
          isDisabled={!headerSelectValue || done === "done"}
        />
      </>
    </>
  );
}

export default FeatureForms;
