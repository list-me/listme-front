import React from "react";
import { ContainerNewFeature } from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../assets/plus-fromto.svg";

function NewFeature({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <ContainerNewFeature>
      <NavigationButton abort prev onClick={onClick}>
        <PlusIcon />
        Nova característica
      </NavigationButton>
    </ContainerNewFeature>
  );
}

export default NewFeature;
