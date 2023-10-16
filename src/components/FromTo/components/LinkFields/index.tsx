import React, { useEffect, useState } from "react";
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
  const { setCurrentStep, setFromToIsOpened, colHeadersToPreviewTable, data } =
    useFromToContext();
  const { template } = useProductContext();
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
    </ContainerLinkFields>
  );
}

export default LinkFields;
