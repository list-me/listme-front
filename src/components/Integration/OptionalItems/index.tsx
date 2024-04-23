import React from "react";
import { ContainerOptionalItems } from "./styles";
import { ReactComponent as PlusIcon } from "../../../assets/optional-plus.svg";

function OptionalItems({
  setIsActive,
}: {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <ContainerOptionalItems onClick={() => setIsActive(true)}>
      Mostrar propriedades opcionais
      <PlusIcon />
    </ContainerOptionalItems>
  );
}

export default OptionalItems;
