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

function FromTo(): JSX.Element {
  const { currentStep } = useFromToContext();
  const stepsArray = [
    { title: "Importar arquivo de produtos", stepTitle: "Importar arquivo" },
    { title: "Importar arquivo de produtos", stepTitle: "Config. de import." },
    { title: "Importar arquivo de produtos", stepTitle: "Opç. de import." },
    { title: "Importar arquivo de produtos", stepTitle: "Vincular campos" },
  ];

  return (
    <ContainerFromTo>
      <BoxFromTo large={currentStep === 2}>
        <HeaderModal>
          <TitleModal>
            {currentStep === 0
              ? "Importar produtos"
              : stepsArray[currentStep - 1].title}
          </TitleModal>
          <CloseButton>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        {currentStep !== 0 && (
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
    </ContainerFromTo>
  );
}

export default FromTo;
