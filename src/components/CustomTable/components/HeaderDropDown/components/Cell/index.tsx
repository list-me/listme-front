import React, { useEffect, useRef, useState } from "react";
import { Content } from "./styles";
import { ICellProps, IOption } from "./Cell.d";

import { ReactComponent as PencilIcon } from "../../../../../../assets/pencei-icon.svg";
import { ReactComponent as CopyIcon } from "../../../../../../assets/copy-icon.svg";
import { ReactComponent as EyeOffIcon } from "../../../../../../assets/eye-off.svg";
import { ReactComponent as FrozenIcon } from "../../../../../../assets/frozen.svg";
import { ReactComponent as AscIcon } from "../../../../../../assets/sort-asc.svg";
import { ReactComponent as DescIcon } from "../../../../../../assets/sort-desc.svg";
import { ReactComponent as TrashIcon } from "../../../../../../assets/trash-red.svg";
import { ReactComponent as GroupIcon } from "../../../../../../assets/group-icon.svg";

import { DropdownMenu } from "../../../../../DropdownMenu";
import { PersonalModal } from "../../../../../CustomModa";

export const HeaderCell: React.FC<ICellProps> = ({
  label,
  column,
  template,
  handleFrozen = () => {},
  handleSort = () => {},
  handleHidden = () => {},
  freeze,
  handleDeleteColumn,
  handleGroupEdit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef(null);
  const [titleHeader, setTitleHeader] = useState<string>(label);
  const [options, setOptions] = useState<any[]>();

  useEffect(() => {
    const customOptions: IOption[] = [
      {
        label: "Editar Campo",
        icon: <PencilIcon />,
        action: "update",
      },
      {
        label: "Duplicar Campo",
        icon: <CopyIcon />,
        action: "duplicate",
      },
      {
        label: column?.group
          ? "Desagrupar coluna(s)"
          : "Agrupar com outra(s) coluna(s)",
        icon: <GroupIcon />,
        action: "group",
      },
      {
        label: "Ocultar Coluna",
        icon: <EyeOffIcon />,
        action: "hidden",
      },
      {
        label: freeze ? "Descongelar Campo" : "Congelar Campo",
        icon: <FrozenIcon />,
        action: "freeze",
      },
      {
        label: "Ordenar de A a Z",
        icon: <AscIcon />,
        action: "asc",
      },
      {
        label: "Ordenar de Z a A",
        icon: <DescIcon />,
        action: "desc",
      },
      {
        label: "Excluir coluna",
        icon: <TrashIcon />,
        action: "delete",
      },
    ];
    setOptions([...customOptions]);
  }, [isOpen, column, freeze]);

  return (
    <>
      <DropdownMenu
        isOpen
        icoRef={iconRef}
        openModal={(option): void => {
          if (option.action === "group") {
            handleGroupEdit();
            setIsOpen(!isOpen);
            return;
          }
          if (option.action === "delete") {
            handleDeleteColumn();
            setIsOpen(!isOpen);
            return;
          }

          if (option.label.includes("Ordenar")) {
            handleSort(option, option.action);
          } else if (option?.label.includes("Ocultar")) {
            setIsOpen(!isOpen);
            handleHidden();
            return;
          } else if (option.action === "freeze") {
            if (!freeze) {
              handleFrozen(column, "");
            } else {
              handleFrozen(column, "unfreeze");
            }
          } else {
            setIsOpenModal(!isOpenModal);
          }

          setIsOpen(!isOpen);
        }}
        options={options as any}
        setIsOpen={() => {
          setIsOpen(false);
        }}
        col={column?.order}
      />
      <Content ref={ref}>
        <PersonalModal
          isOpen={isOpenModal}
          onClickModal={() => setIsOpenModal(!isOpenModal)}
          data={column}
          template={template}
          onUpdate={(e: any) => {
            setTitleHeader(e.title);
            // window.location.reload();
          }}
        />
      </Content>
    </>
  );
};

export const Cell = HeaderCell;
