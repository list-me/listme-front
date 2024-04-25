import React from "react";
import {
  ColumnTitleLinkFields,
  ContainerSelectText,
  ContentLinkFields,
  ContentRowLinkFields,
  HeaderLinkFields,
} from "../../styles";
import Origin from "../Origin";
import SelectComponent from "../../../../../Select";
import { DropdownMenu } from "../../../../../DropdownMenu";

function LinkFieldsComponents({
  colHeadersToPreviewTable,
  data,
  selectedLinkFields,
  handleSelectChange,
  options,
  fixedOptions,
  iconRef,
  setIsOpenDropDown,
  isOpenDropDown,
  setIsOpenModal,
  isOpenModal,
  setDataToModal,
  newColumnOptions,
}: any): JSX.Element {
  return (
    <>
      <HeaderLinkFields>
        <ColumnTitleLinkFields>Origem</ColumnTitleLinkFields>
        <ColumnTitleLinkFields>Destino</ColumnTitleLinkFields>
      </HeaderLinkFields>
      <ContentLinkFields>
        {colHeadersToPreviewTable?.map(
          (item: string) =>
            item !== "sent_to_integrations" &&
            item !== "third_party_id" &&
            item !== "parent_third_party_id" && (
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
            ),
        )}
      </ContentLinkFields>
    </>
  );
}

export default LinkFieldsComponents;
