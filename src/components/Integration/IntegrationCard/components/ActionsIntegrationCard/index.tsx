import {
  ActionsIntegrationButtonDefault,
  ActionsIntegrationButtonDelete,
  ContainerActionsIntegrationCard,
} from "./styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus.svg";
import { ReactComponent as PenIcon } from "../../../../../assets/pen-edit.svg";
import { ReactComponent as TrashIcon } from "../../../../../assets/trash-integration.svg";

function ActionsIntegrationCard({
  done,
  onClickPrimaryButtonDone,
  onClickSecondaryButtonDone,
  onClickNotDone,
}: {
  done: boolean;
  onClickPrimaryButtonDone: () => void;
  onClickSecondaryButtonDone: () => void;
  onClickNotDone: () => void;
}): JSX.Element {
  return (
    <ContainerActionsIntegrationCard>
      {!done ? (
        <ActionsIntegrationButtonDefault onClick={onClickNotDone}>
          <PlusIcon />
          Integrar
        </ActionsIntegrationButtonDefault>
      ) : (
        <>
          <ActionsIntegrationButtonDefault onClick={onClickPrimaryButtonDone}>
            <PenIcon />
            Editar integração
          </ActionsIntegrationButtonDefault>
          <ActionsIntegrationButtonDelete onClick={onClickSecondaryButtonDone}>
            <TrashIcon />
            Excluir integração
          </ActionsIntegrationButtonDelete>
        </>
      )}
    </ContainerActionsIntegrationCard>
  );
}

export default ActionsIntegrationCard;
