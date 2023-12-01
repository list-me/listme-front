import { useEffect, useMemo, useState } from "react";
import { ContainerLinkFields, WarnAlert } from "./styles";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import { useFromToContext } from "../../../../context/FromToContext";
import { useProductContext } from "../../../../context/products";
import fixedOptions from "./utils/fixedOptions";
import FinishedStep from "../FinishedStep";
import LoadingSpinner from "../LoadingSpinner";
import isEmptyObject from "../../../../utils/isEmptyObject";
import { ReactComponent as PlusIcon } from "../../../../assets/plus-fromto.svg";
import LinkFieldsComponent from "./components/LinkFieldsComponent";

function LinkFields(): JSX.Element {
  const [warnList, setWarnList] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [finisedContent, setFinisehdContent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { template, headerTable } = useProductContext();
  const {
    finishFromTo,
    selectedLinkFields,
    setSelectedLinkFields,
    csvResponse,
    valuesImportConfiguration,
  } = useFromToContext();

  const { setCurrentStep, colHeadersToPreviewTable, data } = useFromToContext();

  const [optionsToVerify, setOptionsToVerify] = useState<string[]>([]);

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
      colHeadersToPreviewTable!.forEach((itemcolHeadersToPreviewTable) => {
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
    colHeadersToPreviewTable,
    headerTable,
    headerTable.length,
    selectedLinkFields,
    setSelectedLinkFields,
  ]);

  const options: IOption[] = template.fields.fields
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

  const handleSelectChange = (
    itemKey: string,
    selectedValue: IOption,
  ): void => {
    const { value, optionsList } = selectedValue;

    if (value !== "Criar nova coluna") {
      setSelectedLinkFields((prevSelected) => ({
        ...prevSelected,
        [itemKey]: selectedValue,
      }));
      if (
        optionsList &&
        optionsList[0] !== "" &&
        typeof optionsList[0] === "string"
      ) {
        const dataValues = data.map((item) => {
          return item[itemKey];
        });

        const typeMultiOptions: { [key: string]: string } = {
          comma: ",",
          semicolon: ";",
        };

        const neverIncludes = optionsList.every(
          (opt) =>
            !dataValues.includes(opt) &&
            !dataValues.includes(
              optionsList.join(
                typeMultiOptions[valuesImportConfiguration.multiOptions.value],
              ),
            ),
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

  function verifyAllIgnore(): boolean {
    const keys = Object.keys(selectedLinkFields);
    const allIgnored = keys.every((key) => {
      return selectedLinkFields[key].value === "Ignorar";
    });
    return allIgnored;
  }

  const typeFinished: "warn" | "error" | "success" = useMemo(() => {
    if (csvResponse?.errors?.length > 0) {
      return "error";
    }
    if (csvResponse?.warnings?.length > 0) {
      return "warn";
    }
    return "success";
  }, [csvResponse]);

  if (loading) return <LoadingSpinner text="Enviando arquivo..." subText="" />;
  if (finisedContent)
    return (
      <FinishedStep
        typeFinished={typeFinished}
        setFinisehdContent={setFinisehdContent}
      />
    );
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
      <LinkFieldsComponent
        colHeadersToPreviewTable={colHeadersToPreviewTable}
        data={data}
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
            setLoading(true);
            const result = await finishFromTo();
            setLoading(false);
            if (result) setFinisehdContent(true);
          }}
        >
          <PlusIcon />
          Importar
        </NavigationButton>
      </BoxButtons>
    </ContainerLinkFields>
  );
}

export default LinkFields;
