// eslint-disable-next-line import/no-cycle
import { ContainerButtons, ContainerModal, Text } from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";

// import { Container } from './styles';

function ReviewModal(): JSX.Element {
  return (
    <ContainerModal>
      <div>
        <Text>Revise suas descrições.</Text>
      </div>
      <ContainerButtons>
        <NavigationButton>Finalizar revisão</NavigationButton>
      </ContainerButtons>
    </ContainerModal>
  );
}

export default ReviewModal;
