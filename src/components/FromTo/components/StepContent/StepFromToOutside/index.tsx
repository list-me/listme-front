import React, { useMemo } from "react";
import { StepContentContainer } from "../styles";
import InitialStep from "../../InitialStep";
import SelectList from "../../PublicListOutside/SelectList";
import ImportFile from "../../ImportFile";
import ImportOptions from "../../ImportOptions";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import LinkFields from "../../LinkFields";
import { useFromToContext } from "../../../../../context/FromToContext";
import {
  BoxFromTo,
  CloseButton,
  ContainerFromTo,
  HeaderModal,
  StepItem,
  StepNumber,
  StepSubtitle,
  StepsContainer,
  TitleModal,
} from "../../../styles";
import ImportConfiguration from "../../ImportConfiguration";

const INITIAL_STEP = 0;

function StepFromToOutside({
  currentStep,
}: {
  currentStep: number;
}): JSX.Element {
  const { setFromToIsOpened } = useFromToContext();

  const stepsArray = useMemo(() => {
    return [
      { title: "Importar arquivo de produtos", stepTitle: "Importar arquivo" },
      {
        title: "Importar arquivo de produtos",
        stepTitle: "Config. de import.",
      },
      { title: "Importar arquivo de produtos", stepTitle: "Opç. de import." },
      { title: "Importar arquivo de produtos", stepTitle: "Vincular campos" },
    ];
  }, []);

  const Wrapper = useMemo(() => {
    return ({ children }: { children: React.ReactNode }): JSX.Element => (
      <>
        <ContainerFromTo>
          <BoxFromTo className="BoxFromTo" large={currentStep === 3}>
            <HeaderModal>
              <TitleModal>
                {currentStep === 2
                  ? "Importar produtos"
                  : stepsArray[currentStep - 2].title}
              </TitleModal>
              <CloseButton onClick={() => setFromToIsOpened(false)}>
                <CloseIcon />
              </CloseButton>
            </HeaderModal>
            {currentStep !== INITIAL_STEP && (
              <StepsContainer>
                {stepsArray.map((item, index) => (
                  <StepItem key={index}>
                    <StepNumber
                      active={index + 2 <= currentStep}
                      className={
                        (index === 0 ? "firstStep " : "") +
                        (index + 1 === stepsArray.length ? "lastStep " : "")
                      }
                    >
                      {index + 1}
                    </StepNumber>
                    <StepSubtitle active={index + 2 <= currentStep}>
                      {item.stepTitle}
                    </StepSubtitle>
                  </StepItem>
                ))}
              </StepsContainer>
            )}
            {children}
          </BoxFromTo>
        </ContainerFromTo>
      </>
    );
  }, [currentStep, setFromToIsOpened, stepsArray]);

  return (
    <StepContentContainer>
      {currentStep === 0 && <InitialStep />}
      {currentStep === 1 && <SelectList />}
      {currentStep === 2 && (
        <Wrapper key={currentStep}>
          <ImportFile />
        </Wrapper>
      )}
      {currentStep === 3 && (
        <Wrapper key={currentStep}>
          <ImportConfiguration />
        </Wrapper>
      )}
      {currentStep === 4 && (
        <Wrapper key={currentStep}>
          <ImportOptions />
        </Wrapper>
      )}
      {currentStep === 5 && (
        <Wrapper key={currentStep}>
          <LinkFields />
        </Wrapper>
      )}
    </StepContentContainer>
  );
}

export default StepFromToOutside;
