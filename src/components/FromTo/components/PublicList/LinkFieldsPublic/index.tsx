import React, { useState } from "react";
import {
  ColumnTitleLinkFields,
  ContainerLinkFields,
  ContainerSelectText,
  ContentLinkFields,
  ContentRowLinkFields,
  HeaderLinkFields,
  WarnAlert,
} from "../../LinkFields/styles";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { useFromToContext } from "../../../../../context/FromToContext";
import Origin from "../../LinkFields/components/Origin";
import SelectComponent from "../../../../Select";
import { DropdownMenu } from "../../../../DropdownMenu";

// import { Container } from './styles';

function LinkFieldsPublic(): JSX.Element {
  const { setFromToIsOpened, colHeadersToPreviewTable } = useFromToContext();
  console.log(
    "🚀 ~ file: index.tsx:27 ~ LinkFieldsPublic ~ colHeadersToPreviewTable:",
    colHeadersToPreviewTable,
  );

  const [warnList, setWarnList] = useState<string[]>([]);

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
        <HeaderLinkFields>
          <ColumnTitleLinkFields>Origem</ColumnTitleLinkFields>
          <ColumnTitleLinkFields>Destino</ColumnTitleLinkFields>
        </HeaderLinkFields>
        <ContentLinkFields>
          {/* {colHeadersToPreviewTable?.map((item) => (
            <ContentRowLinkFields key={item}>
              <Origin title={item} example={data[0][item]} />
              <ContainerSelectText>
                <SelectComponent
                  select={selectedLinkFields[item] || null}
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
          ))} */}
        </ContentLinkFields>
        {/*
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

      <PersonalModal
        isOpen={isOpenModal}
        onClickModal={() => setIsOpenModal(false)}
        data={dataToModal}
        template={template}
        onUpdate={(e: any, fields: any) => {
          return setNewColumn(e, fields);
        }}
      /> */}
      </ContainerLinkFields>
    </BoxFromTo>
  );
}

export default LinkFieldsPublic;
