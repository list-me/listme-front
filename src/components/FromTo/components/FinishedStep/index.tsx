import React, { useEffect } from "react";
import {
  ContainerFinishedStep,
  TitleFinishedStep,
  ContentFinishedStep,
  TextFinishedStep,
} from "./styles";
import { BoxButtons, NavigationButton } from "../../../NavigationButton/styles";
import { useFromToContext } from "../../../../context/FromToContext";
// @ts-ignore
import check from "../../../../assets/images/checkImage.png";
// @ts-ignore
import errorIcon from "../../../../assets/images/error.png";
import AccordionError from "../AccordionError";
import { useProductContext } from "../../../../context/products";
import { ReactComponent as PlusIcon } from "../../../../assets/plus-fromto.svg";

function FinishedStep({
  typeFinished,
  setFinisehdContent,
}: {
  typeFinished: "warn" | "error" | "success";
  setFinisehdContent: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { setFromToIsOpened, setCurrentStep, toClean, csvResponse } =
    useFromToContext();
  const { handleRedirectAndGetProducts } = useProductContext();

  const configView = {
    title: {
      success: "Sucesso!",
      warn: "Sucesso!",
      error: "Erro",
    },
    text: {
      success: (
        <>
          {csvResponse.total > 1 ? (
            <>
              Foram importados{" "}
              <span>{csvResponse.total} itens com sucesso</span>
            </>
          ) : (
            <>
              Foi exportado <span>{csvResponse.total} item com sucesso</span>
            </>
          )}
        </>
      ),
      warn: (
        <>
          {csvResponse.warnings?.length > 1 ? (
            <>
              Foram importados{" "}
              <span>{csvResponse.warnings?.length} itens com sucesso</span>
            </>
          ) : (
            <>
              Foi exportado{" "}
              <span>{csvResponse.warnings?.length} item com sucesso</span>
            </>
          )}
        </>
      ),
      error: (
        <>
          {csvResponse.errors?.length > 1 ? (
            <>
              Seu arquivo deu falha em{" "}
              <span>{csvResponse.errors?.length} itens</span>
            </>
          ) : (
            <>
              Seu arquivo deu falha em{" "}
              <span>{csvResponse.errors?.length} item</span>
            </>
          )}
        </>
      ),
    },
    icon: {
      success: check,
      warn: check,
      error: errorIcon,
    },
  };

  useEffect(() => {
    const id = window.location.pathname.substring(10);
    handleRedirectAndGetProducts(id).then(() => {});
  }, [handleRedirectAndGetProducts]);

  return (
    <ContainerFinishedStep>
      <ContentFinishedStep>
        <img src={configView.icon[typeFinished]} alt="Vincular List pública" />
        <TitleFinishedStep>{configView.title[typeFinished]}</TitleFinishedStep>
        <TextFinishedStep>{configView.text[typeFinished]}</TextFinishedStep>
      </ContentFinishedStep>
      <AccordionError typeFinished={typeFinished} />
      <BoxButtons>
        {typeFinished !== "error" && (
          <NavigationButton
            abort
            prev
            onClick={() => {
              toClean();
              setCurrentStep(0);
            }}
          >
            <PlusIcon />
            Importar mais produtos
          </NavigationButton>
        )}
        {typeFinished !== "error" ? (
          <NavigationButton onClick={() => setFromToIsOpened(false)}>
            <PlusIcon />
            Finalizar
          </NavigationButton>
        ) : (
          <NavigationButton
            onClick={() => {
              setFinisehdContent(false);
            }}
          >
            <PlusIcon />
            Tentar Novamente
          </NavigationButton>
        )}
      </BoxButtons>
    </ContainerFinishedStep>
  );
}

export default FinishedStep;
