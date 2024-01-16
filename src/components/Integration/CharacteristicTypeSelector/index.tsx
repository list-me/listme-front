import React, { useState } from "react";

import styled from "styled-components";
import { CustomRadio } from "../../Radio";

const Container = styled.div`
  padding: 24px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  > div {
    .radio-group {
      display: flex;
      flex-direction: row !important;
      gap: 64px !important;
    }
  }
`;
const Text = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

function CharacteristicTypeSelector(): JSX.Element {
  const [value, setValue] = useState("Minha característica é um catálogo");
  return (
    <Container>
      <Text>Primeiro, selecione:</Text>
      <div>
        <CustomRadio
          options={[
            "Minha característica é um catálogo",
            "Minha característica é uma coluna",
          ]}
          value={[value]}
          handleGetNewValue={setValue}
        />
      </div>
    </Container>
  );
}

export default CharacteristicTypeSelector;
