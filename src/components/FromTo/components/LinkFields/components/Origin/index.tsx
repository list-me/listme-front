/* eslint-disable react/require-default-props */
import React from "react";
import { ContainerOrigin, SubTitleOrigin, TitleOrigin } from "./styles";

function Origin({
  title,
  example,
}: {
  title: string;
  example?: string | number;
}): JSX.Element {
  return (
    <ContainerOrigin>
      <TitleOrigin>{title}</TitleOrigin>
      {example ? <SubTitleOrigin>Amostra: {example}</SubTitleOrigin> : <></>}
    </ContainerOrigin>
  );
}

export default Origin;
