import React, { useEffect, useRef, useState } from "react";
import {
  ColumnTitleLinkFields,
  ContainerLinkFields,
  ContainerSelectText,
  ContentLinkFields,
  ContentRowLinkFields,
  HeaderLinkFields,
  WarnAlert,
} from "./styles";
import Origin from "./components/Origin";
import SelectComponent from "../../../Select";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import { useFromToContext } from "../../../../context/FromToContext";
import { useProductContext } from "../../../../context/products";
import { CSVRow } from "../../../../context/FromToContext/fromToContext";
import { Confirmation } from "../../../Confirmation";
import { DropdownMenu } from "../../../DropdownMenu";
import newColumnOptions from "../../../../utils/newColumnOptions";
import { PersonalModal } from "../../../CustomModa";

interface IOption {
  value: string;
  label: string;
  type: string;
  optionsList?: string[];
  openDropdown?: boolean;
}

const fixedOptions = [
  {
    value: "Criar nova coluna",
    label: "Criar nova coluna",
    openDropdown: true,
  },
  { value: "Ignorar", label: "Ignorar" },
];

function checkSample(
  data: CSVRow[],
  option: IOption,
  key: string,
): JSX.Element {
  if (
    option?.optionsList &&
    option?.optionsList[0] &&
    typeof option?.optionsList[0] === "string"
  ) {
    const { optionsList } = option;
    const dataValues = data.map((itemData) => {
      return itemData[key];
    });
    const neverIncludes = dataValues.every((itemDataValues) => {
      return !optionsList.includes(itemDataValues.toString());
    });
    if (neverIncludes) {
      return <WarnAlert className="warnAlert">Erro</WarnAlert>;
    }
  }
  return <></>;
}

function LinkFields(): JSX.Element {
  const [selected, setSelected] = useState<{ [key: string]: IOption }>({});

  const {
    template,
    headerTable,
    setHeaderTable,
    setColHeaders,
    handleNewColumn,
  } = useProductContext();

  const iconRef = useRef(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const [dataToModal, setDataToModal] = useState({});
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  function setNewColumn(newColumn: any, templateUpdated: any): void {
    // eslint-disable-next-line no-param-reassign
    newColumn = {
      ...newColumn,
      className: "htLeft htMiddle",
      frozen: false,
      hidden: false,
      order: String(headerTable.length + 1),
      width: "300",
    };

    const newPosition = [...headerTable, newColumn];
    newPosition.splice(newPosition.length - 2, 1);
    newPosition.push({});
    setHeaderTable(newPosition);

    const contentHeaders = headerTable.map((item) => item?.title);
    contentHeaders.splice(headerTable.length - 1, 1);
    contentHeaders.push(newColumn?.title);
    contentHeaders.push(" ");
    setColHeaders(contentHeaders);
    handleNewColumn(newColumn, templateUpdated);
  }

  const { setCurrentStep, setFromToIsOpened, colHeadersToPreviewTable, data } =
    useFromToContext();

  const [hasErrors, setHasErrors] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const options: IOption[] = template.fields.fields.map((item: any) => {
    const newItem = {
      value: item.title,
      label: item.title,
      type: item.type,
      optionsList: item.options,
    };
    return newItem;
  });

  const handleSelectChange = (
    itemKey: string,
    selectedValue: IOption,
  ): void => {
    if (selectedValue.value !== "Criar nova coluna")
      setSelected((prevSelected) => ({
        ...prevSelected,
        [itemKey]: selectedValue,
      }));
  };

  useEffect(() => {
    const warn = document.getElementsByClassName("warnAlert");
    const warnArray = Array.from(warn);
    if (warnArray.length) {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  }, [selected]);

  return (
    <ContainerLinkFields>
      <Confirmation
        description="Tem certeza?"
        action="IMPORTAR"
        title="IMPORTAR"
        pass="importar"
        handleChangeVisible={() => setOpenConfirmation(false)}
        isOpen={openConfirmation}
        handleConfirmation={() => setFromToIsOpened(false)}
      />
      <HeaderLinkFields>
        <ColumnTitleLinkFields>Origem</ColumnTitleLinkFields>
        <ColumnTitleLinkFields>Destino</ColumnTitleLinkFields>
      </HeaderLinkFields>
      <ContentLinkFields>
        {colHeadersToPreviewTable?.map((item) => (
          <ContentRowLinkFields key={item}>
            <Origin title={item} example={data[0][item]} />
            <ContainerSelectText>
              <SelectComponent
                select={selected[item] || null}
                onChange={(value) => handleSelectChange(item, value)}
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
              {checkSample(data, selected[item], item)}
            </ContainerSelectText>
          </ContentRowLinkFields>
        ))}
      </ContentLinkFields>
      <BoxButtons>
        <NavigationButton
          abort
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Voltar
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            if (!hasErrors) setFromToIsOpened(false);
            else {
              setOpenConfirmation(true);
            }
          }}
        >
          Importar
        </NavigationButton>
      </BoxButtons>

      <PersonalModal
        isOpen={isOpenModal}
        onClickModal={() => setIsOpenModal(false)}
        data={dataToModal}
        template={template}
        onUpdate={(e: any, fields: any) => {
          return setNewColumn(e, fields);
        }}
      />
    </ContainerLinkFields>
  );
}

export default LinkFields;
