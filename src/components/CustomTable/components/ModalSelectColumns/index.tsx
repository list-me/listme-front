import React from "react";

import styled from "styled-components";
import { NavigationButton } from "../../../NavigationButton/styles";

const ContainerModalSelectColumns = styled.div`
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
const ContainerButtons = styled.div`
  color: #495057;
  font-size: 16px;
  font-weight: 500;
  padding: 20px 24px;
  display: flex;
  width: 300px;
  gap: 20px;
  button {
    height: 36px;
    font-size: 11px;
  }
`;

function ModalSelectColumns({
  ids,
  clearSubItensMode,
  onFinishProductChild,
  editModeGroup,
  groupReferenceEditMode,
}: {
  ids: string[];
  clearSubItensMode: () => void;
  onFinishProductChild: (newGroup: string) => Promise<void>;
  editModeGroup: "group" | "ungroup" | "";
  groupReferenceEditMode: string;
}): JSX.Element {
  return (
    <ContainerModalSelectColumns>
      <Text>{ids.length} colunas selecionadas</Text>
      <ContainerButtons>
        <NavigationButton abort onClick={clearSubItensMode}>
          Cancelar
        </NavigationButton>
        <NavigationButton
          disabled={ids.length === 0}
          onClick={() =>
            onFinishProductChild(
              editModeGroup === "group"
                ? `Novo Grupo #${ids[0]}`
                : groupReferenceEditMode,
            )
          }
        >
          {editModeGroup === "group" ? "Agrupar colunas" : "Desagrupar colunas"}
        </NavigationButton>
      </ContainerButtons>
    </ContainerModalSelectColumns>
  );
}

export default ModalSelectColumns;
