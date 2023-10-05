import React from "react";
import { ContainerOrigin, SubTitleOrigin, TitleOrigin } from "./styles";

function Origin(): JSX.Element {
  return (
    <ContainerOrigin>
      <TitleOrigin>Nome</TitleOrigin>
      <SubTitleOrigin>Amostra: Luminária Davis</SubTitleOrigin>
    </ContainerOrigin>
  );
}

export default Origin;
