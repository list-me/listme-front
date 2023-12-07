import { useEffect, useState } from "react";
import { ContainerLinkFields, WarnAlert } from "../../LinkFields/styles";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { useFromToContext } from "../../../../../context/FromToContext";
import LinkFieldsComponent from "../../LinkFields/components/LinkFieldsComponent";
import { useProductContext } from "../../../../../context/products";
import { BoxButtons, NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import isEmptyObject from "../../../../../utils/isEmptyObject";
import fixedOptions from "../../LinkFields/utils/fixedOptions";

function LinkFieldsPublic(): JSX.Element {
  const {
    setFromToIsOpened,
    selectedLinkFields,
    setSelectedLinkFields,
    setCurrentStep,
  } = useFromToContext();
  console.log(
    "🚀 ~ file: index.tsx:26 ~ LinkFieldsPublic ~ selectedLinkFields:",
    selectedLinkFields,
  );
  const { headerTable, colHeaders, targetTemplatePublic } = useProductContext();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [optionsToVerify, setOptionsToVerify] = useState<string[]>([]);
  const [warnList, setWarnList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [finisedContent, setFinisehdContent] = useState<boolean>(false);

  const handleSelectChange = (
    itemKey: string,
    selectedValue: IOption,
  ): void => {
    const { value } = selectedValue;

    if (value !== "Criar nova coluna") {
      setSelectedLinkFields((prevSelected) => ({
        ...prevSelected,
        [itemKey]: selectedValue,
      }));
    }
  };

  useEffect(() => {
    const keys = Object.keys(selectedLinkFields);
    const valuesToVerify = keys.map((key) => {
      return selectedLinkFields[key].value;
    });
    setOptionsToVerify(valuesToVerify);
    const copyArray = [...headerTable];

    copyArray.pop();

    const allIgnore = copyArray.every((item) => {
      return valuesToVerify.includes(item.data.toString());
    });
    if (allIgnore) {
      colHeaders!.forEach((itemcolHeadersToPreviewTable) => {
        if (!selectedLinkFields[itemcolHeadersToPreviewTable]) {
          const ignore = { value: "Ignorar", label: "Ignorar" };

          setSelectedLinkFields((prevSelected) => ({
            ...prevSelected,
            [itemcolHeadersToPreviewTable]: ignore,
          }));
        }
      });
    }
  }, [
    colHeaders,
    headerTable,
    headerTable.length,
    selectedLinkFields,
    setSelectedLinkFields,
  ]);

  const options: IOption[] = targetTemplatePublic!.fields.fields
    .map((item: any) => {
      const newItem = {
        value: item.id,
        label: item.title,
        type: item.type,
        optionsList: item.options,
      };
      return newItem;
    })
    .filter((itemOption: IOption) => {
      return !optionsToVerify.includes(itemOption.value);
    });

  function verifyAllIgnore(): boolean {
    const keys = Object.keys(selectedLinkFields);
    const allIgnored = keys.every((key) => {
      return selectedLinkFields[key].value === "Ignorar";
    });
    return allIgnored;
  }

  const colHeadersToPreviewTable = [...colHeaders];
  colHeadersToPreviewTable.pop();

  return (
    <BoxFromTo>
      <HeaderModal borderDisabled>
        <TitleModal>Vincular campos</TitleModal>
        <CloseButton onClick={() => setFromToIsOpened(false)}>
          <CloseIcon />
        </CloseButton>
      </HeaderModal>
      <ContainerLinkFields>
        {warnList.length > 0 ? (
          <WarnAlert>
            <span>Atenção:</span> Campo exportável{" "}
            <span>&quot;{warnList?.join(", ")}&quot;</span> incompatível devido
            a validação fraca nas escolhas múltiplas. Revise a amostra ou
            exporte mesmo assim.
          </WarnAlert>
        ) : (
          <></>
        )}
        <LinkFieldsComponent
          colHeadersToPreviewTable={colHeadersToPreviewTable}
          data={[]}
          selectedLinkFields={selectedLinkFields}
          handleSelectChange={handleSelectChange}
          options={options}
          fixedOptions={fixedOptions}
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
        />
        <BoxButtons>
          <NavigationButton
            abort
            prev
            onClick={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          >
            <PlusIcon />
            Voltar
          </NavigationButton>
          <NavigationButton
            disabled={isEmptyObject(selectedLinkFields) || verifyAllIgnore()}
            onClick={async () => {
              // setLoading(true);
              // finalizar
              // const result = await finishFromTo();
              // setLoading(false);
              // if (result) setFinisehdContent(true);
            }}
          >
            <PlusIcon />
            Importar
          </NavigationButton>
        </BoxButtons>
      </ContainerLinkFields>
    </BoxFromTo>
  );
}

export default LinkFieldsPublic;
