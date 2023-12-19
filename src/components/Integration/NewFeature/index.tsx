import React from "react";
import { ContainerNewFeature } from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../assets/plus-fromto.svg";

// import { Container } from './styles';

function NewFeature(): JSX.Element {
  return (
    <ContainerNewFeature>
      <NavigationButton abort prev>
        <PlusIcon />
        Nova característica
      </NavigationButton>
    </ContainerNewFeature>
  );
}

export default NewFeature;
