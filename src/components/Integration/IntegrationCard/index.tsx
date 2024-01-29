import { useState } from "react";
import { toast } from "react-toastify";
import { ContainerIntegrationCard } from "./styles";
import HeaderIntegrationCard from "./components/HeaderIntegrationCard";
import ContentIntegrationCard from "./components/ContentIntegrationCard";
import ActionsIntegrationCard from "./components/ActionsIntegrationCard";
import { integrationsRequest } from "../../../services/apis/requests/integration";
import { IProvider } from "../../../models/integration/integration";
import { Confirmation } from "../../Confirmation";

function IntegrationCard({
  isActive,
  done,
  onClickPrimaryButtonDone,
  deleteFunction,
  onClickNotDone,
  thumb,
  item,
}: {
  isActive: boolean;
  done: boolean;
  onClickPrimaryButtonDone: () => void;
  deleteFunction: (id: string) => Promise<void>;
  onClickNotDone: () => void;
  thumb: string;
  item: IProvider;
}): JSX.Element {
  const [currentStatus, setCurrrentStatus] = useState(isActive);

  const [isOpen, setIsOpen] = useState(false);

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
    <>
      <Confirmation
        description="Tem certeza que deseja excluir esta integração?"
        action="DELETE"
        title="Excluir Integração"
        pass="excluir"
        handleChangeVisible={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        handleConfirmation={() => deleteFunction(item.config.id)}
      />
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
          onClickSecondaryButtonDone={() => setIsOpen(true)}
          onClickNotDone={onClickNotDone}
        />
      </ContainerIntegrationCard>
    </>
  );
}

export default IntegrationCard;
