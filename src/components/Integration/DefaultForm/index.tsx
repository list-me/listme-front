import {
  ColumnsDefaultForm,
  ContainerDefaultForm,
  ContainerTitlesDefaultForm,
  ContentDefaultForm,
  TitleColumn,
} from "./styles";
import { IFieldsByID } from "../../../pages/companyIntegration/companyIntegration";

import DefaultFormLine from "./components/DefaultFormLine";
import Topic from "./components/Topic";

function DefaultForm({
  leftColumnName,
  centerColumnName,
  rightColumnName,
  dataForm,
  valueColLeft,
  payloadToFinish,
  type,
  done,
}: {
  done: boolean;
  type: "catalog" | "column";
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
      type,
      value: {
        templateId: valueLeft.value.id,
        fieldId: valueRight.value.id,
      },
    };
  };

  const listTopics: string[] = [];

  const topicToView = (item: {
    id: string;
    key: string;
    cast: string;
    types: string[];
    required: boolean;
  }): string | null | undefined => {
    if (item.key.includes(".")) {
      const topicParts = item.key.split(".");
      const topic = topicParts[0];

      if (!listTopics.includes(topic)) {
        listTopics.push(topic);
        return topic;
      }

      return null;
    }

    return null;
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
          <div key={item.id}>
            <Topic value={topicToView(item)} />
            <DefaultFormLine
              item={item}
              index={index}
              valueColLeft={valueColLeft}
              changePayloadToFinish={changePayloadToFinish}
              type={type}
              done={done}
            />
          </div>
        ))}
      </ContentDefaultForm>
    </ContainerDefaultForm>
  );
}

export default DefaultForm;
