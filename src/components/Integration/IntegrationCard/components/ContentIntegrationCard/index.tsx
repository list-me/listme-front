import {
  ContainerContentIntegrationCard,
  DescriptionContentIntegrationCard,
  TitleContentIntegrationCard,
} from "./styles";

function ContentIntegrationCard({
  title,
  description,
}: {
  title: string;
  description: string;
}): JSX.Element {
  return (
    <ContainerContentIntegrationCard>
      <TitleContentIntegrationCard>{title}</TitleContentIntegrationCard>
      <DescriptionContentIntegrationCard>
        {description}
      </DescriptionContentIntegrationCard>
    </ContainerContentIntegrationCard>
  );
}

export default ContentIntegrationCard;
