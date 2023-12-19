import React from "react";
import {
  ColumnsDefaultForm,
  ContainerDefaultForm,
  ContentDefaultForm,
  KeyText,
  TitleColumn,
} from "./styles";
import SelectComponent from "../../../Select";

function DefaultForm({
  leftColumnName,
  centerColumnName,
  rightColumnName,
  dataForm,
}: {
  leftColumnName: string;
  centerColumnName: string;
  rightColumnName: string;
  dataForm: {
    key: string;
    catalog: boolean;
    field: boolean;
    required: boolean;
  }[];
}): JSX.Element {
  const arrayColumns = [leftColumnName, centerColumnName, rightColumnName];

  return (
    <ContainerDefaultForm>
      {arrayColumns.map((columnName, index) => (
        <ColumnsDefaultForm>
          <TitleColumn>{columnName}</TitleColumn>
          <ContentDefaultForm>
            {dataForm.map((item) => (
              <>
                {index === 0 && (
                  <KeyText>
                    {item.key}
                    {item.required && <span>*</span>}
                  </KeyText>
                )}
                {index === 1 && (
                  <SelectComponent
                    select={undefined}
                    onChange={() => ""}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                )}
                {index === 2 && (
                  <SelectComponent
                    select={undefined}
                    onChange={() => ""}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                )}
              </>
            ))}
          </ContentDefaultForm>
        </ColumnsDefaultForm>
      ))}
    </ContainerDefaultForm>
  );
}

export default DefaultForm;
