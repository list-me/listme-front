/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from "react";
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
} from "./styles";
import { ReactComponent as CloseIcon } from "../../assets/close-gray.svg";
import StepContent from "./components/StepContent";
import { useFromToContext } from "../../context/FromToContext";

const INITIAL_STEP = 0;

function FromTo(): JSX.Element | null {
  const { currentStep, fromToIsOpened, setFromToIsOpened, stepType } =
    useFromToContext();
  const stepsArray = [
    { title: "Importar arquivo de produtos", stepTitle: "Importar arquivo" },
    { title: "Importar arquivo de produtos", stepTitle: "Config. de import." },
    { title: "Importar arquivo de produtos", stepTitle: "Opç. de import." },
    { title: "Importar arquivo de produtos", stepTitle: "Vincular campos" },
  ];

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setFromToIsOpened(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setFromToIsOpened]);

  if (!fromToIsOpened) return null;
  return (
    <ContainerFromTo onClick={() => setFromToIsOpened(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        {stepType === "fromTo" ? (
          <BoxFromTo className="BoxFromTo" large={currentStep === 2}>
            <HeaderModal>
              <TitleModal>
                {currentStep === 0
                  ? "Importar produtos"
                  : stepsArray[currentStep - 1].title}
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
                      active={index + 1 <= currentStep}
                      className={
                        (index === 0 ? "firstStep " : "") +
                        (index + 1 === stepsArray.length ? "lastStep " : "")
                      }
                    >
                      {index + 1}
                    </StepNumber>
                    <StepSubtitle active={index + 1 <= currentStep}>
                      {item.stepTitle}
                    </StepSubtitle>
                  </StepItem>
                ))}
              </StepsContainer>
            )}
            <StepContent />
          </BoxFromTo>
        ) : (
          <StepContent />
        )}
      </div>
    </ContainerFromTo>
  );
}

export default FromTo;
