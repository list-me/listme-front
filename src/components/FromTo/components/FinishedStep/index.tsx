import React from "react";
import {
  ContainerFinishedStep,
  TitleFinishedStep,
  ContentFinishedStep,
} from "./styles";
import { BoxButtons, NavigationButton } from "../NavigationButton/styles";
import { useFromToContext } from "../../../../context/FromToContext";
// @ts-ignore
import check from "../../../../assets/images/checkImage.png";
// @ts-ignore
import errorIcon from "../../../../assets/images/error.png";
import AccordionError from "../AccordionError";

function FinishedStep({
  typeFinished,
}: {
  typeFinished: "warn" | "error" | "success";
}): JSX.Element {
  const { setFromToIsOpened, setCurrentStep, toClean } = useFromToContext();

  const configView = {
    title: {
      success: "Sucesso!",
      warn: "Sucesso!",
      error: "Erro",
    },
    text: {
      success: (
        <>
          Foram exportados <span>12 itens com sucesso</span>
        </>
      ),
      warn: (
        <>
          Foram exportados <span>12 itens com sucesso</span>
        </>
      ),
      error: (
        <>
          Seu arquivo deu falha em <span>12 itens</span>
        </>
      ),
    },
    icon: {
      success: check,
      warn: check,
      error: errorIcon,
    },
  };

  return (
    <ContainerFinishedStep>
      <ContentFinishedStep>
        <img src={configView.icon[typeFinished]} alt="Vincular List pública" />
        <TitleFinishedStep>{configView.title[typeFinished]}</TitleFinishedStep>
        {/* <TextFinishedStep>{configView.text[typeFinished]}</TextFinishedStep> */}
      </ContentFinishedStep>
      {typeFinished !== "success" && (
        <AccordionError typeFinished={typeFinished} />
      )}
      <BoxButtons>
        {typeFinished !== "error" && (
          <NavigationButton
            abort
            onClick={() => {
              toClean();
              setCurrentStep(0);
            }}
          >
            Importar mais produtos
          </NavigationButton>
        )}
        {typeFinished !== "error" ? (
          <NavigationButton onClick={() => setFromToIsOpened(false)}>
            Finalizar
          </NavigationButton>
        ) : (
          <NavigationButton
            onClick={() => {
              toClean();
              setCurrentStep(0);
            }}
          >
            Tentar Novamente
          </NavigationButton>
        )}
      </BoxButtons>
    </ContainerFinishedStep>
  );
}

export default FinishedStep;
