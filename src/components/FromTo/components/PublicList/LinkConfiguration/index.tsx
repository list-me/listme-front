/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { useFromToContext } from "../../../../../context/FromToContext";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { ContainerButtons, ContainerLinkConfiguration } from "./styles";
import { RadioLinkConfig } from "./components/RadioLinkConfig";
import { BoxButtons, NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";

function LinkConfiguration(): JSX.Element {
  const {
    setFromToIsOpened,
    setCurrentStep,
    currentLinkConfigurationValue,
    setCurrentLinkConfigurationValue,
    stepType,
    currentLinkMethodValue,
  } = useFromToContext();

  const options = [
    {
      value: "keepProductsLinked",
      label: "Manter produtos vinculados",
      description:
        "Somente os criadores podem atualizar a List. Você terá acesso à todas as atualizações feitas pelos criadores e pode decidir quando atualizar seus produtos.",
    },
    {
      value: "importDetachedProducts",
      label: "Importar produtos desvinculados",
      description: "",
    },
  ];

  const handleChange = (value: {
    label: string;
    description: string;
    value: string;
  }): void => {
    setCurrentLinkConfigurationValue(value);
  };

  function handleNextButton(): void {
    if (stepType !== "publicListOutside") {
      setCurrentStep(3);
    } else if (
      currentLinkConfigurationValue.value === "importDetachedProducts"
    ) {
      if (currentLinkMethodValue === "copy") {
        console.log("FAZER FINISH");
      } else if (currentLinkMethodValue === "add") {
        setCurrentStep(4);
        // setCurrentStep(5);
      }
    } else if (currentLinkConfigurationValue.value === "keepProductsLinked") {
      if (currentLinkMethodValue === "add") {
        setCurrentStep(5);
      } else {
        setCurrentStep(4);
      }
    }
  }

  function handlePrevButton(): void {
    if (stepType !== "publicListOutside") {
      setFromToIsOpened(false);
    } else setCurrentStep(2);
  }

  return (
    <ContainerLinkConfiguration>
      <BoxFromTo>
        <HeaderModal borderDisabled>
          <TitleModal>Configuração de vínculo</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <RadioLinkConfig
          options={options}
          value={currentLinkConfigurationValue}
          handleGetNewValue={handleChange}
        />
        <ContainerButtons>
          <BoxButtons>
            <NavigationButton onClick={() => handlePrevButton()} abort>
              <PlusIcon />
              Voltar
            </NavigationButton>
            <NavigationButton
              disabled={!currentLinkConfigurationValue.value}
              onClick={() => handleNextButton()}
            >
              <PlusIcon />
              {currentLinkConfigurationValue.value === "importDetachedProducts"
                ? currentLinkMethodValue === "copy"
                  ? "Concluir"
                  : "Avançar"
                : "Avançar"}
            </NavigationButton>
          </BoxButtons>
        </ContainerButtons>
      </BoxFromTo>
    </ContainerLinkConfiguration>
  );
}

export default LinkConfiguration;
