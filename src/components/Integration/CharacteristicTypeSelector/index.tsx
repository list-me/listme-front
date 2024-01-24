import React from "react";

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

function CharacteristicTypeSelector({
  value,
  onChange,
  index,
  listValue,
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<"catalog"[] | "column"[]>>;
  value: "catalog" | "column";
  onChange: (
    value: string,
    index: number,
    list: any[],
    setValue: React.Dispatch<React.SetStateAction<any>>,
  ) => void;
  index: number;
  listValue: "catalog"[] | "column"[];
}): JSX.Element {
  const changeValue = (val: string): void => {
    if (val === "Minha característica é um catálogo") {
      onChange("catalog", index, listValue, setValue);
    } else onChange("column", index, listValue, setValue);
  };

  const valueToView = (val: string): string => {
    if (val === "catalog") {
      return "Minha característica é um catálogo";
    }
    return "Minha característica é uma coluna";
  };
  return (
    <Container>
      <Text>Primeiro, selecione:</Text>
      <div>
        <CustomRadio
          options={[
            "Minha característica é um catálogo",
            "Minha característica é uma coluna",
          ]}
          value={[valueToView(value)]}
          handleGetNewValue={changeValue}
        />
      </div>
    </Container>
  );
}

export default CharacteristicTypeSelector;
