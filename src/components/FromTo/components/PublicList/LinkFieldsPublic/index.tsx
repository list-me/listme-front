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
import { templateRequests } from "../../../../../services/apis/requests/template";
import { productRequests } from "../../../../../services/apis/requests/product";

function LinkFieldsPublic(): JSX.Element {
  const {
    setFromToIsOpened,
    selectedLinkFields,
    setSelectedLinkFields,
    setCurrentStep,
    checkedList,
    allRowsSelected,
    selectedProductsId,
  } = useFromToContext();
  const { headerTable, colHeaders, targetTemplatePublic, template } =
    useProductContext();

  async function onFinish(): Promise<void> {
    const originIds = headerTable.map((item, index) => {
      return { data: item.data, isSync: checkedList[index] };
    });

    const fields = originIds
      // eslint-disable-next-line array-callback-return
      .map((item) => {
        const field = {
          origin: item.data,
          target: selectedLinkFields[item.data]?.value,
          is_sync: !!item.isSync,
        };
        if (field.target) return field;
      })
      .filter((item) => item);

    if (targetTemplatePublic) {
      const templateBody = {
        name: targetTemplatePublic.name,
        type: "sync",
        fields: {
          template_origin: template.id,
          template_target: targetTemplatePublic.id,
          fields,
        },
      };
      const response = await templateRequests.postFromTo(templateBody as any);
      if (response.id) {
        const body = new FormData();
        if (allRowsSelected) {
          body.append("all", "true");
        } else {
          body.append("all", "false");
          const idsCSV = selectedProductsId
            .map((id) => {
              return `${id}\n`;
            })
            .join("");
          body.append("items", idsCSV);
        }
        body.append("template_id", response.id);
        const responseLink = await productRequests.postLink(body);
        console.log(
          "🚀 ~ file: index.tsx:77 ~ onFinish ~ responseLink:",
          responseLink,
        );
      }
    }
  }

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [optionsToVerify, setOptionsToVerify] = useState<string[]>([]);
  const [warnList, setWarnList] = useState<string[]>([]);

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

  const options: IOption[] =
    targetTemplatePublic!.fields?.fields
      ?.map((item: any) => {
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
      }) || [];

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
            onClick={() => onFinish()}
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
