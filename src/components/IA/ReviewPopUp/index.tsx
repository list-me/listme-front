import { useState } from "react";
import Modal from "../../Modal";
import { ReactComponent as CloseIcon } from "../../../assets/close-gray.svg";
import {
  ButtonClose,
  ContainerButton,
  ContainerRadios,
  Header,
  Radio,
  RadioItem,
  SectionTitle,
  Text,
  Title,
} from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";
import "./styles.css";

function ReviewPopUp(): JSX.Element {
  const [approve, setApprove] = useState(true);
  const [step, setStep] = useState(2);
  return (
    <Modal isOpen changeVisible={() => ""} width={600}>
      <Header>
        <Title>Finalizar revisão</Title>
        <ButtonClose onClick={() => ""}>
          <CloseIcon />
        </ButtonClose>
      </Header>
      {step === 1 ? (
        <Text>
          Você está prestes a concluir a revisão. Ao finalizar, as descrições
          aprovadas serão salvas.
        </Text>
      ) : (
        <Text>
          Ao concluir a revisão, as descrições aprovadas e reprovadas serão
          movidas para a tabela original.
        </Text>
      )}
      {step === 1 ? (
        <SectionTitle>Por favor, escolha uma das opções abaixo:</SectionTitle>
      ) : (
        <SectionTitle>Tem certeza de que deseja continuar?</SectionTitle>
      )}
      {step === 1 && (
        <ContainerRadios>
          <RadioItem active={approve} onClick={() => setApprove(true)}>
            <Radio active={approve} />
            Aprovar todas
          </RadioItem>
          <RadioItem active={!approve} onClick={() => setApprove(false)}>
            <Radio active={!approve} />
            Reprovar todas
          </RadioItem>
        </ContainerRadios>
      )}
      <ContainerButton>
        <NavigationButton abort>Cancelar</NavigationButton>
        <NavigationButton>Finalizar</NavigationButton>
      </ContainerButton>
    </Modal>
  );
}

export default ReviewPopUp;
