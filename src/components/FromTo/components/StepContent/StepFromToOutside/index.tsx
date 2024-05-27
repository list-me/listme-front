import React from "react";
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

function StepFromToOutside(): JSX.Element {
  const { currentStep, setFromToIsOpened } = useFromToContext();

  const stepsArray = [
    { title: "Importar arquivo de produtos", stepTitle: "Importar arquivo" },
    { title: "Importar arquivo de produtos", stepTitle: "Config. de import." },
    { title: "Importar arquivo de produtos", stepTitle: "Opç. de import." },
    { title: "Importar arquivo de produtos", stepTitle: "Vincular campos" },
  ];

  function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return (
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
                  <StepItem>
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
  }

  return (
    <StepContentContainer>
      {currentStep === 0 && <InitialStep />}
      {currentStep === 1 && <SelectList />}
      {currentStep === 2 && (
        <Wrapper>
          <ImportFile />
        </Wrapper>
      )}
      {currentStep === 3 && (
        <Wrapper>
          <ImportConfiguration />
        </Wrapper>
      )}
      {currentStep === 4 && (
        <Wrapper>
          <ImportOptions />
        </Wrapper>
      )}
      {currentStep === 5 && (
        <Wrapper>
          <LinkFields />
        </Wrapper>
      )}
    </StepContentContainer>
  );
}

export default StepFromToOutside;
