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
  payloadToFinish,
}: {
  leftColumnName: string;
  centerColumnName: string;
  rightColumnName: string;
  dataForm: IFieldsByID;
  valueColLeft: any;
  payloadToFinish: {
    templateConfigPayloadId: string;
    type: string;
    value: {
      templateId: string;
      fieldId: string;
    };
  }[];
}): JSX.Element {
  const arrayColumns = [leftColumnName, centerColumnName, rightColumnName];
  const { payload } = dataForm;

  const changePayloadToFinish = (
    valueLeft: any,
    valueRight: any,
    index: number,
  ): void => {
    // eslint-disable-next-line no-param-reassign
    payloadToFinish[index] = {
      ...payloadToFinish[index],
      templateConfigPayloadId: payload[index].id,
      type: "column",
      value: {
        templateId: valueLeft.value.id,
        fieldId: valueRight.value.id,
      },
    };
  };

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
        {payload.map((item, index) => (
          <DefaultFormLine
            key={item.id}
            item={item}
            index={index}
            valueColLeft={valueColLeft}
            changePayloadToFinish={changePayloadToFinish}
          />
        ))}
      </ContentDefaultForm>
    </ContainerDefaultForm>
  );
}

export default DefaultForm;
