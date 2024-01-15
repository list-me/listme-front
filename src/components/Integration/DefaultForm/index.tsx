import { useEffect, useState } from "react";
import {
  ColumnsDefaultForm,
  ContainerDefaultForm,
  ContainerTitlesDefaultForm,
  ContentDefaultForm,
  TitleColumn,
} from "./styles";
import { IFieldsByID } from "../../../pages/companyIntegration/companyIntegration";

import DefaultFormLine from "./components/DefaultFormLine";

function DefaultForm({
  leftColumnName,
  centerColumnName,
  rightColumnName,
  dataForm,
  valueColLeft,
}: {
  leftColumnName: string;
  centerColumnName: string;
  rightColumnName: string;
  dataForm: IFieldsByID;
  valueColLeft: any;
}): JSX.Element {
  const arrayColumns = [leftColumnName, centerColumnName, rightColumnName];
  const { payload } = dataForm;

  return (
    <ContainerDefaultForm>
      <ContainerTitlesDefaultForm>
        {arrayColumns.map((columnName) => (
          <ColumnsDefaultForm key={columnName}>
            <TitleColumn>{columnName}</TitleColumn>
          </ColumnsDefaultForm>
        ))}
      </ContainerTitlesDefaultForm>
      <ContentDefaultForm>
        {payload.map((item) => (
          <DefaultFormLine
            key={item.id}
            item={item}
            valueColLeft={valueColLeft}
          />
        ))}
      </ContentDefaultForm>
    </ContainerDefaultForm>
  );
}

export default DefaultForm;
