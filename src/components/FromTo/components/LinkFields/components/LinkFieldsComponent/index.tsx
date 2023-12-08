import React, { useRef, useState } from "react";
import { Checkbox } from "antd";
import {
  AlertLinkFields,
  ColumnTitleLinkFields,
  ContainerCheckBox,
  ContainerSelectText,
  ContentLinkFields,
  ContentRowLinkFields,
  HeaderLinkFields,
} from "../../styles";
import Origin from "../Origin";
import SelectComponent from "../../../../../Select";
import { DropdownMenu } from "../../../../../DropdownMenu";
import newColumnOptions from "../../../../../../utils/newColumnOptions";
import { PersonalModal } from "../../../../../CustomModa";
import { useProductContext } from "../../../../../../context/products";
import { useFromToContext } from "../../../../../../context/FromToContext";
import { ReactComponent as InfoIcon } from "../../../../../../assets/info.svg";

function LinkFieldsComponent({
  colHeadersToPreviewTable,
  data,
  selectedLinkFields,
  handleSelectChange,
  options,
  fixedOptions,
  setIsOpenModal,
  isOpenModal,
}: {
  colHeadersToPreviewTable: string[] | null;
  data: any[];
  selectedLinkFields: {
    [key: string]: IOption;
  };
  handleSelectChange: (itemKey: string, selectedValue: IOption) => void;
  options: IOption[];
  fixedOptions: (
    | {
        value: string;
        label: string;
        openDropdown: boolean;
      }
    | {
        value: string;
        label: string;
        openDropdown?: undefined;
      }
  )[];
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
}): JSX.Element {
  const iconRef = useRef(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const [dataToModal, setDataToModal] = useState({});
  const {
    template,
    headerTable,
    setHeaderTable,
    setColHeaders,
    handleNewColumn,
    targetHeaderTable,
    setTargetHeaderTable,
    setTargetColHeaders,
    isPublic,
  } = useProductContext();

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
        <ColumnTitleLinkFields>Origem</ColumnTitleLinkFields>
        <ColumnTitleLinkFields>Destino</ColumnTitleLinkFields>
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
          <ContentRowLinkFields
            key={item}
            checkColumn={
              currentLinkConfigurationValue.value === "keepProductsLinked"
            }
          >
            <Origin title={item} example={example(item) || undefined} />
            <ContainerSelectText>
              <SelectComponent
                select={
                  selectedLinkFields[
                    isPublic ? headerTable[index].data : item
                  ] || null
                }
                onChange={(value) =>
                  handleSelectChange(
                    isPublic ? headerTable[index].data : item,
                    value,
                  )
                }
                options={options}
                placeHolder="Selecione"
                small
                isSearchable
                fixedOptions={fixedOptions}
                DropDownComponent={() => (
                  <DropdownMenu
                    isOpen
                    icoRef={iconRef}
                    openModal={(e) => {
                      setIsOpenDropDown(!isOpenDropDown);
                      setIsOpenModal(!isOpenModal);
                      setDataToModal({ type: e?.type });
                    }}
                    options={newColumnOptions}
                    setIsOpen={() => setIsOpenDropDown(false)}
                  />
                )}
              />
            </ContainerSelectText>
            {currentLinkConfigurationValue.value === "keepProductsLinked" && (
              <ContainerCheckBox>
                <Checkbox
                  onChange={() => checkChange(index)}
                  checked={checkedList[index]}
                />
              </ContainerCheckBox>
            )}
          </ContentRowLinkFields>
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

export default LinkFieldsComponent;
