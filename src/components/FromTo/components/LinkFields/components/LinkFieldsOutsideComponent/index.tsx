import React, { useRef, useState } from "react";
import { Checkbox } from "antd";
import {
  AlertLinkFields,
  ColumnTitleLinkFields,
  ContainerCheckBox,
  ContentLinkFields,
  ContentRowLinkFieldsOutside,
  HeaderLinkFields,
} from "../../styles";
import Origin from "../Origin";
import { PersonalModal } from "../../../../../CustomModa";
import { useProductContext } from "../../../../../../context/products";
import { useFromToContext } from "../../../../../../context/FromToContext";
import { ReactComponent as InfoIcon } from "../../../../../../assets/info.svg";

function LinkFieldsOutsideComponent({
  colHeadersToPreviewTable,
  data,
  setIsOpenModal,
  isOpenModal,
}: {
  colHeadersToPreviewTable: string[] | null;
  data: any[];
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
}): JSX.Element {
  const [dataToModal] = useState({});
  const {
    template,
    headerTable,
    setHeaderTable,
    setColHeaders,
    handleNewColumn,
    targetHeaderTable,
    setTargetHeaderTable,
    setTargetColHeaders,
  } = useProductContext();
  const url = window.location.href;
  const isPublic = url.includes("public");
  const { currentLinkConfigurationValue, checkedList, setCheckedList } =
    useFromToContext();
  const currentHeaderTable = isPublic ? targetHeaderTable : headerTable;

  const example = (item: string): string | number | undefined => {
    if (item && data.length) {
      return data[0][item];
    }
    return undefined;
  };

  function setNewColumn(newColumn: any, templateUpdated: any): void {
    // eslint-disable-next-line no-param-reassign
    newColumn = {
      ...newColumn,
      className: "htLeft htMiddle",
      frozen: false,
      hidden: false,
      order: String(currentHeaderTable.length + 1),
      width: "300",
    };

    const newPosition = [...currentHeaderTable, newColumn];
    newPosition.splice(newPosition.length - 2, 1);
    newPosition.push({});

    const contentHeaders = currentHeaderTable.map((item) => item?.title);
    contentHeaders.splice(currentHeaderTable.length - 1, 1);
    contentHeaders.push(newColumn?.title);
    contentHeaders.push(" ");
    if (isPublic) {
      setTargetHeaderTable(newPosition);

      setTargetColHeaders(contentHeaders);
    } else {
      setHeaderTable(newPosition);
      setColHeaders(contentHeaders);
    }
    handleNewColumn(newColumn, templateUpdated);
  }

  function checkChange(index: number): void {
    const copyList = [...checkedList];
    copyList[index] = !checkedList[index];
    setCheckedList(copyList);
  }

  return (
    <>
      <HeaderLinkFields>
        <ColumnTitleLinkFields>Atributo</ColumnTitleLinkFields>
        {currentLinkConfigurationValue.value === "keepProductsLinked" && (
          <ColumnTitleLinkFields>
            Manter vínculo
            <AlertLinkFields>
              <InfoIcon />
              <div>
                Só os criadores atualizam os produtos. Você verá todas as
                atualizações deles. Se quiser editar os campos e não receber
                atualizações posteriormente, desmarque essa opção.
              </div>
            </AlertLinkFields>
          </ColumnTitleLinkFields>
        )}
      </HeaderLinkFields>
      <ContentLinkFields>
        {colHeadersToPreviewTable?.map((item, index) => (
          <ContentRowLinkFieldsOutside key={item}>
            <Origin title={item} example={example(item) || undefined} />
            {currentLinkConfigurationValue.value === "keepProductsLinked" && (
              <ContainerCheckBox>
                <Checkbox
                  onChange={() => checkChange(index)}
                  checked={checkedList[index]}
                />
              </ContainerCheckBox>
            )}
          </ContentRowLinkFieldsOutside>
        ))}
      </ContentLinkFields>
      <PersonalModal
        isOpen={isOpenModal}
        onClickModal={() => setIsOpenModal(false)}
        data={dataToModal}
        template={template}
        onUpdate={(e: any, fields: any) => {
          return setNewColumn(e, fields);
        }}
      />
    </>
  );
}

export default LinkFieldsOutsideComponent;
