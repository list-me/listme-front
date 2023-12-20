import { ContainerIntegrationCard } from "./styles";
import HeaderIntegrationCard from "./components/HeaderIntegrationCard";
import ContentIntegrationCard from "./components/ContentIntegrationCard";
import ActionsIntegrationCard from "./components/ActionsIntegrationCard";

function IntegrationCard({
  isActive,
  setIsActive,
  done,
  onClickPrimaryButtonDone,
  onClickSecondaryButtonDone,
  onClickNotDone,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  done: boolean;
  onClickPrimaryButtonDone: () => void;
  onClickSecondaryButtonDone: () => void;
  onClickNotDone: () => void;
}): JSX.Element {
  return (
    <ContainerIntegrationCard>
      <HeaderIntegrationCard isActive={isActive} setIsActive={setIsActive} />
      <ContentIntegrationCard
        title="Nexaas"
        description="Com a integração Nexaas, simplificamos processos e potencializamos a eficiência do seu negócio. Conecte-se ao sucesso!"
      />
      <ActionsIntegrationCard
        done={done}
        onClickPrimaryButtonDone={onClickPrimaryButtonDone}
        onClickSecondaryButtonDone={onClickSecondaryButtonDone}
        onClickNotDone={onClickNotDone}
      />
    </ContainerIntegrationCard>
  );
}

export default IntegrationCard;
