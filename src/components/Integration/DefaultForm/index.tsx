import { useState } from "react";
import {
  ColumnsDefaultForm,
  ContainerDefaultForm,
  ContainerTitlesDefaultForm,
  ContentDefaultForm,
  TitleColumn,
} from "./styles";
import { IFieldsByID } from "../../../pages/companyIntegration/companyIntegration";

import { DataField } from "../../CustomTable/components/HeaderDropDown/components/NewColumn/RelationForm/RelationForm";
import DefaultFormLine from "./components/DefaultFormLine";

function DefaultForm({
  leftColumnName,
  centerColumnName,
  rightColumnName,
  dataForm,
  optionsColLeft,
  allTemplates,
}: {
  leftColumnName: string;
  centerColumnName: string;
  rightColumnName: string;
  dataForm: IFieldsByID;
  optionsColLeft: DataField[];
  allTemplates: {
    label: string;
    value: any;
  }[];
}): JSX.Element {
  const arrayColumns = [leftColumnName, centerColumnName, rightColumnName];
  const { payload } = dataForm;

  const [formToFinish, setFormToFinish] = useState(
    Array.from({ length: payload.length }, () => ({
      firstValue: {},
      secondValue: {},
    })),
  );

  const changeForm = (e: any, index: number, localValue: string): void => {
    setFormToFinish((prevForm) => {
      const updatedForm = [...prevForm];
      if (localValue === "first") {
        updatedForm[index].firstValue = e;
        return updatedForm;
      }
      updatedForm[index].secondValue = e;
      return updatedForm;
    });
  };

  return (
    <ContainerDefaultForm>
      <ContainerTitlesDefaultForm>
        {arrayColumns.map((columnName, indexCol) => (
          <ColumnsDefaultForm key={columnName}>
            <TitleColumn>{columnName}</TitleColumn>
          </ColumnsDefaultForm>
        ))}
      </ContainerTitlesDefaultForm>
      <ContentDefaultForm>
        {payload.map((item, indexItem) => (
          <DefaultFormLine
            key={item.id}
            formToFinish={formToFinish}
            indexItem={indexItem}
            item={item}
            changeForm={changeForm}
            optionsColLeft={optionsColLeft}
            allTemplates={allTemplates}
          />
        ))}
      </ContentDefaultForm>
    </ContainerDefaultForm>
  );
}

export default DefaultForm;
