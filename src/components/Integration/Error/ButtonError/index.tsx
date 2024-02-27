import React from "react";

import styled from "styled-components";
import { IErrorsIntegrations } from "../../../../context/IntegrationContext/IntegrationContext";

const ContainerButton = styled.button`
  width: 262px;
  min-height: 52px;
  padding: 0px 16px;
  border-radius: 8px;
  background: rgba(255, 107, 107, 0.1);
  margin-right: 9px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1.5px solid transparent;
  :hover {
    border: 1.5px solid #f15757;
  }
`;
const Container = styled.div`
  width: 262px;
  min-height: 52px;
  padding: 0px 16px;
  border-radius: 8px;
  background: rgba(255, 107, 107, 0.1);
  margin-right: 9px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border: 1.5px solid transparent;
  :hover {
    border: 1.5px solid #f15757;
  }
`;
const Ball = styled.div`
  width: 8px;
  height: 8px;
  background: #f15757;
  border-radius: 50%;
`;
const Text = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  span {
    margin: 0;
    color: #000;
    font-size: 16px;
    font-weight: 700;
  }
`;

function ButtonError({
  errors,
  setSidebarErrorOpened,
}: {
  errors: IErrorsIntegrations;
  setSidebarErrorOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const size = errors.total;
  return (
    <Container onClick={() => setSidebarErrorOpened((prev) => !prev)}>
      <Ball />
      <Text>
        <span>{size} itens</span> falharam na integração
      </Text>
    </Container>
  );
}

export default ButtonError;
