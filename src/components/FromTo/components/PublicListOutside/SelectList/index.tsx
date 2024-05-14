import React, { useState } from "react";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { useFromToContext } from "../../../../../context/FromToContext";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { ReactComponent as CopyIcon } from "../../../../../assets/copy-outside.svg";
import { ReactComponent as AddIcon } from "../../../../../assets/add-outside.svg";
import {
  ContainerButtons,
  ContainerItemLinkMethod,
  ContainerLinkMethod,
  ItemLinkMethod,
  ContentLinkMethod,
  ContentTitleLinkMethod,
} from "./styles";
import { BoxButtons, NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import SelectComponent from "../../../../Select";

function SelectList(): JSX.Element {
  const {
    setFromToIsOpened,
    setCurrentStep,
    currentLinkMethodValue,
    setCurrentLinkMethodValue,
  } = useFromToContext();

  const options: {
    label: string;
    value: "add" | "copy";
    icon: JSX.Element;
  }[] = [
    {
      value: "copy",
      label: "Criar uma cópia",
      icon: <CopyIcon />,
    },
    {
      value: "add",
      label: "Adic. a uma List existente",
      icon: <AddIcon />,
    },
  ];

  const handleChange = (item: {
    label: string;
    value: "add" | "copy";
    icon: JSX.Element;
  }): void => {
    setCurrentLinkMethodValue(item.value);
  };

  return (
    <ContainerLinkMethod>
      <BoxFromTo>
        <HeaderModal borderDisabled>
          <TitleModal>Selecionar List existente</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <SelectComponent
          select={undefined}
          onChange={() => ""}
          options={undefined}
          placeHolder=""
        />
        <ContainerButtons>
          <BoxButtons>
            <NavigationButton
              abort
              prev
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              Voltar
            </NavigationButton>
            <NavigationButton
              disabled={!currentLinkMethodValue}
              onClick={() => setCurrentStep(3)}
            >
              <PlusIcon />
              Continuar
            </NavigationButton>
          </BoxButtons>
        </ContainerButtons>
      </BoxFromTo>
    </ContainerLinkMethod>
  );
}

export default SelectList;
