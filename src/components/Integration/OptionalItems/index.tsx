import React from "react";
import { ContainerOptionalItems } from "./styles";
import { ReactComponent as PlusIcon } from "../../../assets/optional-plus.svg";

function OptionalItems(): JSX.Element {
  return (
    <ContainerOptionalItems>
      Mostrar propriedades opcionais
      <PlusIcon />
    </ContainerOptionalItems>
  );
}

export default OptionalItems;
