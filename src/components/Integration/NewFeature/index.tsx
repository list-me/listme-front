import React from "react";
import { ContainerNewFeature } from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../assets/plus-fromto.svg";

function NewFeature({
  onClick,
  isDisabled,
  text,
}: {
  onClick: () => void;
  isDisabled: boolean;
  text: string;
}): JSX.Element {
  return (
    <ContainerNewFeature>
      <NavigationButton abort prev onClick={onClick} disabled={isDisabled}>
        <PlusIcon />
        {text}
      </NavigationButton>
    </ContainerNewFeature>
  );
}

export default NewFeature;
