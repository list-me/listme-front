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
  const { setFromToIsOpened } = useFromToContext();

  const [currentValue, setCurrentValue] = useState<{
    label: string;
    description: string;
    value: string;
  }>({
    value: "",
    label: "",
    description: "",
  });

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
    setCurrentValue(value);
  };

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
          value={currentValue}
          handleGetNewValue={handleChange}
        />
        <ContainerButtons>
          <BoxButtons>
            <NavigationButton
              abort
              prev
              onClick={() => setFromToIsOpened(false)}
            >
              <PlusIcon />
              Voltar
            </NavigationButton>
            <NavigationButton disabled={!currentValue.value}>
              <PlusIcon />
              Avançar
            </NavigationButton>
          </BoxButtons>
        </ContainerButtons>
      </BoxFromTo>
    </ContainerLinkConfiguration>
  );
}

export default LinkConfiguration;
