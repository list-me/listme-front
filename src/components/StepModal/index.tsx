/* eslint-disable react/require-default-props */
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

const INITIAL_STEP = 0;

interface IStepModal {
  title: string;
  setFromToIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  fromToIsOpened: boolean;
  stepMode: boolean;
  currentStep?: number;
  stepsArray: {
    title: string;
    stepTitle: string;
  }[];
  children: React.ReactNode;
  large: boolean;
}

function StepModal({
  title,
  setFromToIsOpened,
  fromToIsOpened,
  stepMode,
  currentStep,
  stepsArray,
  children,
  large,
}: IStepModal): JSX.Element | null {
  if (!fromToIsOpened) return null;
  return (
    <ContainerFromTo>
      <BoxFromTo large={large}>
        <HeaderModal>
          <TitleModal>{title}</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        {stepMode && currentStep && currentStep !== INITIAL_STEP && (
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
        {children}
      </BoxFromTo>
    </ContainerFromTo>
  );
}

export default StepModal;
