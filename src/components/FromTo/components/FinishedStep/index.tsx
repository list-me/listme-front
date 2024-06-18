import React, { useCallback, useEffect } from "react";
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
import { integrationsRequest } from "../../../../services/apis/requests/integration";
import { useIntegration } from "../../../../context/IntegrationContext";

function FinishedStep({
  typeFinished,
  setFinisehdContent,
}: {
  typeFinished: "warn" | "error" | "success";
  setFinisehdContent: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { setFromToIsOpened, setCurrentStep, toClean, csvResponse, stepType } =
    useFromToContext();
  console.log("🚀 ~ csvResponse:", csvResponse);
  const { handleRedirectAndGetProducts } = useProductContext();
  const { setErrors } = useIntegration();

  const configView = {
    title: {
      success: "Sucesso!",
      warn: "Sucesso!",
      error: "Erro",
    },
    text: {
      success: (
        <>
          {csvResponse?.total > 1 ? (
            <>
              Foram importados{" "}
              <span>{csvResponse?.total} itens com sucesso</span>
            </>
          ) : (
            <>
              Foi importado <span>{csvResponse?.total} item com sucesso</span>
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
              Foi importado{" "}
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

  const getErrors = useCallback(async () => {
    try {
      const id = window.location.pathname.split("/")[2];
      const response = await integrationsRequest.listIntegrationsErrors({
        limit: 10,
        offset: 0,
        id,
      });

      setErrors(response);
    } catch (error) {
      // Handle errors here
      console.error("Error fetching errors:", error);
    }
  }, [setErrors]);

  useEffect(() => {
    return () => {
      if (stepType === "fromTo") {
        const id = window.location.pathname.substring(10);
        handleRedirectAndGetProducts(id).then(() => {});
      }
      getErrors();
    };
  }, [getErrors, handleRedirectAndGetProducts, stepType]);

  return (
    <ContainerFinishedStep>
      <ContentFinishedStep>
        <img src={configView.icon[typeFinished]} alt="Vincular lista pública" />
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
          <NavigationButton
            onClick={() => {
              setFromToIsOpened(false);
            }}
          >
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
