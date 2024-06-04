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

function LinkMethod(): JSX.Element {
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
          <TitleModal>Como deseja vincular essa List</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <ContentLinkMethod>
          <ContentTitleLinkMethod>Selecione</ContentTitleLinkMethod>
          <ContainerItemLinkMethod>
            {options.map((item) => (
              <ItemLinkMethod
                active={item.value === currentLinkMethodValue}
                onClick={() => handleChange(item)}
              >
                {item.icon}
                <p>{item.label}</p>
              </ItemLinkMethod>
            ))}
          </ContainerItemLinkMethod>
        </ContentLinkMethod>
        <ContainerButtons>
          <BoxButtons>
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

export default LinkMethod;
