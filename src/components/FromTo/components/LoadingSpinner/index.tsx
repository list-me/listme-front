import React from "react";
import {
  BoxTexts,
  ContainerLoadingSpinner,
  SubTextLoading,
  TextLoading,
} from "./styles";
import { ReactComponent as LoadingSipinner } from "../../../../assets/loading-spinner.svg";

function LoadingSpinner({
  text,
  subText,
}: {
  text: string;
  subText: string;
}): JSX.Element {
  return (
    <ContainerLoadingSpinner>
      <LoadingSipinner />
      <BoxTexts>
        <TextLoading>{text}</TextLoading>
        <SubTextLoading>{subText}</SubTextLoading>
      </BoxTexts>
    </ContainerLoadingSpinner>
  );
}

export default LoadingSpinner;
