import {
  ActionsIntegrationButtonDefault,
  ActionsIntegrationButtonDelete,
  ContainerActionsIntegrationCard,
} from "./styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus.svg";
import { ReactComponent as PenIcon } from "../../../../../assets/pen-edit.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/trash-integration.svg";

function ActionsIntegrationCard({ done }: { done: boolean }): JSX.Element {
  return (
    <ContainerActionsIntegrationCard>
      {!done ? (
        <ActionsIntegrationButtonDefault>
          <PlusIcon />
          Integrar
        </ActionsIntegrationButtonDefault>
      ) : (
        <>
          <ActionsIntegrationButtonDefault>
            <PenIcon />
            Editar integração
          </ActionsIntegrationButtonDefault>
          <ActionsIntegrationButtonDelete>
            <TrashIcon />
            Excluir integração
          </ActionsIntegrationButtonDelete>
        </>
      )}
    </ContainerActionsIntegrationCard>
  );
}

export default ActionsIntegrationCard;
