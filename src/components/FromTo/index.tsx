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
  const { currentStep, fromToIsOpened, setFromToIsOpened } = useFromToContext();
  const stepsArray = [
    { title: "Configurações de importação", stepTitle: "Config. de import." },
    {
      title: "Selecione as opções de importação",
      stepTitle: "Opç. de import.",
    },
    { title: "Configurações de integração", stepTitle: "Config. de integra." },
    { title: "Importar arquivo de produtos", stepTitle: "Vincular campos" },
  ];
  if (!fromToIsOpened) return null;
  return (
    <ContainerFromTo>
      <BoxFromTo large={currentStep === 2}>
        <HeaderModal>
          <TitleModal>
            {currentStep === 1
              ? "Importar arquivo de produtos"
              : stepsArray[currentStep - 1].title}
          </TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        {currentStep !== INITIAL_STEP && currentStep !== 1 && (
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
        <StepContent />
      </BoxFromTo>
    </ContainerFromTo>
  );
}

export default FromTo;
