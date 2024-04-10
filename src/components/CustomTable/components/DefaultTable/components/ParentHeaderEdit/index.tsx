/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import {
  ContainerButtonsParentHeaderEdit,
  ContainerContentParentHeaderEdit,
  ContainerParentHeaderEdit,
  InputContentParentHeaderEdit,
  LabelContentParentHeaderEdit,
  TitleContentParentHeaderEdit,
} from "./styles";
import { NavigationButton } from "../../../../../NavigationButton/styles";

function ParentHeaderEdit({
  value,
  index,
  onClose,
  onChange,
}: {
  value: string;
  index: number;
  onClose: () => void;
  onChange: (value: string, index: number) => void;
}): JSX.Element {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <ContainerParentHeaderEdit>
      <ContainerContentParentHeaderEdit>
        <TitleContentParentHeaderEdit>
          Editar grupo
        </TitleContentParentHeaderEdit>
        <LabelContentParentHeaderEdit>
          Nome do grupo
          <InputContentParentHeaderEdit
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
          />
        </LabelContentParentHeaderEdit>
        <ContainerButtonsParentHeaderEdit>
          <NavigationButton abort onClick={onClose}>
            Cancelar
          </NavigationButton>
          <NavigationButton
            onClick={() => {
              onChange(currentValue, index);
              onClose();
            }}
          >
            Salvar
          </NavigationButton>
        </ContainerButtonsParentHeaderEdit>
      </ContainerContentParentHeaderEdit>
    </ContainerParentHeaderEdit>
  );
}

export default ParentHeaderEdit;
