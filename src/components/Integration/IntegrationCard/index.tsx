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
  title,
  description,
  thumb,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  done: boolean;
  onClickPrimaryButtonDone: () => void;
  onClickSecondaryButtonDone: () => void;
  onClickNotDone: () => void;
  title: string;
  description: string;
  thumb: string;
}): JSX.Element {
  return (
    <ContainerIntegrationCard>
      <HeaderIntegrationCard
        isActive={isActive}
        setIsActive={setIsActive}
        thumb={thumb}
      />
      <ContentIntegrationCard title={title} description={description} />
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
