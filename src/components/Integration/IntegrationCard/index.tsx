import { useState } from "react";
import { ContainerIntegrationCard } from "./styles";
import HeaderIntegrationCard from "./components/HeaderIntegrationCard";
import ContentIntegrationCard from "./components/ContentIntegrationCard";
import ActionsIntegrationCard from "./components/ActionsIntegrationCard";

function IntegrationCard(): JSX.Element {
  // oq tem de state tem q ser fora daqui no futuro
  const [isActivated, setIsActivated] = useState(false);
  return (
    <ContainerIntegrationCard>
      <HeaderIntegrationCard
        isActivated={isActivated}
        setIsActivated={setIsActivated}
      />
      <ContentIntegrationCard
        title="Nexaas"
        description="Com a integração Nexaas, simplificamos processos e potencializamos a eficiência do seu negócio. Conecte-se ao sucesso!"
      />
      <ActionsIntegrationCard done />
    </ContainerIntegrationCard>
  );
}

export default IntegrationCard;
