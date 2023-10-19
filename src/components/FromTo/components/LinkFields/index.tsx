import { useEffect, useRef, useState } from "react";
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
import { DropdownMenu } from "../../../DropdownMenu";
import newColumnOptions from "../../../../utils/newColumnOptions";
import { PersonalModal } from "../../../CustomModa";
import fixedOptions from "./utils/fixedOptions";
import FinishedStep from "../FinishedStep";

function LinkFields(): JSX.Element {
  const iconRef = useRef(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const [dataToModal, setDataToModal] = useState({});
  const [warnList, setWarnList] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<{ [key: string]: IOption }>({});

  const [finisedContent, setFinisehdContent] = useState<boolean>(false);

  const {
    template,
    headerTable,
    setHeaderTable,
    setColHeaders,
    handleNewColumn,
  } = useProductContext();

  const { setCurrentStep, colHeadersToPreviewTable, data } = useFromToContext();

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
    const { value, optionsList } = selectedValue;

    if (value !== "Criar nova coluna") {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [itemKey]: selectedValue,
      }));

      if (
        optionsList &&
        optionsList[0] !== "" &&
        typeof optionsList[0] === "string"
      ) {
        const dataValues = data.map((item) => item[itemKey].toString());
        const neverIncludes = optionsList.every(
          (opt) => !dataValues.includes(opt),
        );
        if (neverIncludes) {
          if (!warnList?.includes(itemKey)) setWarnList([...warnList, itemKey]);
        } else if (warnList?.includes(itemKey))
          setWarnList(warnList.filter((item) => item !== itemKey));
      } else {
        setWarnList(warnList?.filter((item) => item !== itemKey));
      }
    }
  };

  const typeFinished: "warn" | "error" | "success" = "warn";
  if (finisedContent) return <FinishedStep typeFinished={typeFinished} />;
  return (
    <ContainerLinkFields>
      {warnList.length > 0 ? (
        <WarnAlert>
          <span>Atenção:</span> Campo exportável{" "}
          <span>&quot;{warnList?.join(", ")}&quot;</span> incompatível devido a
          validação fraca nas escolhas múltiplas. Revise a amostra ou exporte
          mesmo assim.
        </WarnAlert>
      ) : (
        <></>
      )}
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
        <NavigationButton onClick={() => setFinisehdContent(true)}>
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
