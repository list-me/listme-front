import React from "react";
import {
  ContainerFinishedStep,
  TitleFinishedStep,
  TextFinishedStep,
  ContentFinishedStep,
} from "./styles";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import { useFromToContext } from "../../../../context/FromToContext";
// @ts-ignore
import check from "../../../../assets/images/checkImage.png";
import AccordionError from "../AccordionError";

function FinishedStep(): JSX.Element {
  const { setFromToIsOpened } = useFromToContext();
  return (
    <ContainerFinishedStep>
      <ContentFinishedStep>
        <img src={check} alt="Vincular List pública" />
        <TitleFinishedStep>Sucesso!</TitleFinishedStep>
        <TextFinishedStep>
          Foram exportados <span>12 itens com sucesso</span>
        </TextFinishedStep>
      </ContentFinishedStep>
      <AccordionError />
      <BoxButtons>
        <NavigationButton abort onClick={() => ""}>
          Importar mais produtos
        </NavigationButton>
        <NavigationButton onClick={() => setFromToIsOpened(false)}>
          Finalizar
        </NavigationButton>
      </BoxButtons>
    </ContainerFinishedStep>
  );
}

export default FinishedStep;
