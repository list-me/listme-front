import { useState } from "react";
import { Container } from "./styles";

interface IProps {
  value: string;
}

export const TextCell = ({ value }: IProps) => {
  const [inputValue, setInputValue] = useState<string>(value ?? "");

  return (
    <Container>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Container>
  );
};
