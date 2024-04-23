import React from "react";

import styled from "styled-components";
import { NavigationButton } from "../../../NavigationButton/styles";

const ContainerModalSelectChildrens = styled.div`
  border-radius: 6px 6px 0px 0px;
  background: #fff;
  box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.16);
  position: fixed;
  bottom: 0%;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 100px;
  align-items: cnetrr;
`;
const Text = styled.p`
  color: #495057;
  margin: 0;
  font-size: 16px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
`;
const ContainerButtons = styled.div<{ isPublic?: boolean }>`
  color: #495057;
  font-size: 16px;
  font-weight: 500;
  padding: 20px 24px;
  display: flex;
  width: ${(props) => (props.isPublic ? "400px" : "300px")};
  gap: 20px;
  button {
    height: 36px;
    font-size: 11px;
  }
`;

function ModalSelectChildrens({
  amount,
  clearSubItensMode,
  onFinishProductChild,
  isPublic = false,
}: {
  amount: number;
  clearSubItensMode: () => void;
  onFinishProductChild: () => Promise<void>;
  // eslint-disable-next-line react/require-default-props
  isPublic?: boolean;
}): JSX.Element {
  function stringToView(): string {
    if (isPublic && !amount) {
      return "Selecione os itens que deseja vincular";
    }
    return `${amount} itens selecionados`;
  }
  return (
    <ContainerModalSelectChildrens>
      <Text>{stringToView()}</Text>
      <ContainerButtons isPublic={isPublic}>
        <NavigationButton abort onClick={clearSubItensMode}>
          Cancelar
        </NavigationButton>
        <NavigationButton disabled={!amount} onClick={onFinishProductChild}>
          {isPublic ? "Vincular itens selecionados" : "Salvar"}
        </NavigationButton>
      </ContainerButtons>
    </ContainerModalSelectChildrens>
  );
}

export default ModalSelectChildrens;
