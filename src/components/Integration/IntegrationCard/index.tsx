import { useState } from "react";
import { toast } from "react-toastify";
import { ContainerIntegrationCard } from "./styles";
import HeaderIntegrationCard from "./components/HeaderIntegrationCard";
import ContentIntegrationCard from "./components/ContentIntegrationCard";
import ActionsIntegrationCard from "./components/ActionsIntegrationCard";
import { integrationsRequest } from "../../../services/apis/requests/integration";
import { IProvider } from "../../../models/integration/integration";

function IntegrationCard({
  isActive,
  done,
  onClickPrimaryButtonDone,
  onClickSecondaryButtonDone,
  onClickNotDone,
  thumb,
  item,
}: {
  isActive: boolean;
  done: boolean;
  onClickPrimaryButtonDone: () => void;
  onClickSecondaryButtonDone: () => void;
  onClickNotDone: () => void;
  thumb: string;
  item: IProvider;
}): JSX.Element {
  const [currentStatus, setCurrrentStatus] = useState(isActive);

  async function changeStatus(value: boolean): Promise<void> {
    try {
      await integrationsRequest.patchSwitchActivation(item.config.id);
      setCurrrentStatus(value);
    } catch (err) {
      console.log(err);
      toast.error("Ocorreu um erro ao atualizar o status");
    }
  }

  const handleChangeStatus = () => {
    changeStatus(!currentStatus);
  };

  return (
    <ContainerIntegrationCard>
      <HeaderIntegrationCard
        isActive={currentStatus}
        onChange={handleChangeStatus}
        thumb={thumb}
      />
      <ContentIntegrationCard
        title={item.name}
        description={item.description}
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
