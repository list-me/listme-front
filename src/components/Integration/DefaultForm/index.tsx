import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ColumnsDefaultForm,
  ContainerDefaultForm,
  ContainerTitlesDefaultForm,
  ContentDefaultForm,
  TitleColumn,
} from "./styles";
import {
  IFieldsByID,
  IPayload,
} from "../../../pages/companyIntegration/companyIntegration";

import DefaultFormLine from "./components/DefaultFormLine";
import Topic from "./components/Topic";
import { IDataToEdit } from "../../../context/IntegrationContext/IntegrationContext";
import NewFeature from "../NewFeature";
import InfoAlert from "../../InfoAlert";

function DefaultForm({
  leftColumnName,
  centerColumnName,
  rightColumnName,
  dataForm,
  valueColLeft,
  payloadToFinish,
  type,
  done,
  dataToEdit,
  characteristic,
  infoLeftColumnName,
  infoCenterColumnName,
  infoRightColumnName,
}: {
  infoLeftColumnName: string;
  infoCenterColumnName: string;
  infoRightColumnName: string;
  characteristic: boolean;
  dataToEdit: IDataToEdit | IDataToEdit[];
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
  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const path = pathnameSplited[2];
  const arrayColumns = [
    { info: infoLeftColumnName, text: leftColumnName },
    { info: infoCenterColumnName, text: centerColumnName },
    { info: infoRightColumnName, text: rightColumnName },
  ];
  const { payload } = dataForm;

  const [currentPayload, setCurrentPayload] = useState<IPayload[]>([]);

  useEffect(() => {
    setCurrentPayload(payload);
    return () => {
      setCurrentPayload([]);
    };
  }, [payload]);

  const changePayloadToFinish = useCallback(
    (valueLeft: any, valueRight: any, index: number): void => {
      // eslint-disable-next-line no-param-reassign
      payloadToFinish[index] = {
        ...payloadToFinish[index],
        templateConfigPayloadId: currentPayload[index]?.id,
        type,
        value: {
          templateId: valueLeft?.value?.id,
          fieldId: valueRight?.value?.id,
        },
      };
    },
    [currentPayload, payloadToFinish, type],
  );

  const listTopics: string[] = [];

  const topicToView = (item: {
    id: string;
    key: string;
    cast: string;
    types: string[];
    required: boolean;
  }): string | null | undefined => {
    if (item?.key?.includes(".")) {
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
          <ColumnsDefaultForm key={columnName.text}>
            <TitleColumn>{columnName.text}</TitleColumn>
            {columnName.text && columnName.info ? (
              <InfoAlert title="" content={columnName.info} toRight lowZindex />
            ) : (
              <></>
            )}
          </ColumnsDefaultForm>
        ))}
      </ContainerTitlesDefaultForm>
      <ContentDefaultForm key={currentPayload[0]?.id}>
        {currentPayload.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${item?.id} + ${index}`}>
            <Topic value={topicToView(item)} />
            <DefaultFormLine
              characteristic={characteristic}
              dataToEdit={dataToEdit}
              item={item}
              index={index}
              valueColLeft={valueColLeft}
              changePayloadToFinish={changePayloadToFinish}
              done={done}
            />
          </div>
        ))}
      </ContentDefaultForm>
      {path === "products" && (
        <div style={{ marginTop: "1.5rem" }}>
          <NewFeature
            isDisabled={done}
            onClick={() => {
              const variants = payload.filter((pItem) => {
                return pItem.key.includes("variant_id");
              });
              setCurrentPayload([...currentPayload, variants[0]]);
            }}
            text="Adicionar variante"
          />
        </div>
      )}
    </ContainerDefaultForm>
  );
}

export default DefaultForm;
