/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { useRef, useState } from "react";
import { ReactComponent as TextIcon } from "../../../../../../assets/text-icon.svg";
import { ReactComponent as RadioIcon } from "../../../../../../assets/radio-icon.svg";
import { ReactComponent as CheckBoxIcon } from "../../../../../../assets/checkbox-icon.svg";
import { ReactComponent as ListIcon } from "../../../../../../assets/list-icon.svg";
import { ReactComponent as FileIcon } from "../../../../../../assets/file-icon.svg";
import { ReactComponent as LinkIcon } from "../../../../../../assets/link-gray-sm.svg";
import { DropdownMenu } from "../../../../../DropdownMenu";
import { PersonalModal } from "../../../../../CustomModa";

interface NewColumnProps {
  template: any;
  setNewColumn: Function;
}

export const NewColumn: React.FC<NewColumnProps> = ({
  template,
  setNewColumn,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [data, setData] = useState({});

  const iconRef = useRef(null);

  const options = [
    {
      label: "Campo de texto",
      icon: <TextIcon />,
      type: "text",
    },

    {
      label: "Escolha única",
      icon: <RadioIcon />,
      type: "radio",
    },
    {
      label: "Caixa de seleção",
      icon: <CheckBoxIcon />,
      type: "checked",
    },
    {
      label: "Lista suspensa",
      icon: <ListIcon />,
      type: "list",
    },
    {
      label: "Arquivo",
      icon: <FileIcon />,
      type: "file",
    },
    {
      label: "Relacionamento",
      icon: <LinkIcon />,
      type: "relation",
    },
  ];

  return (
    <>
      <PersonalModal
        isOpen={isOpenModal}
        onClickModal={() => setIsOpenModal(false)}
        data={data}
        template={template}
        onUpdate={(e: any, fields: any) => {
          return setNewColumn(e, fields);
        }}
      />
      <DropdownMenu
        isOpen
        icoRef={iconRef}
        openModal={(e) => {
          setIsOpen(!isOpen);
          setIsOpenModal(!isOpenModal);
          setData({ type: e?.type });
        }}
        options={options}
        setIsOpen={() => setIsOpen(false)}
      />
    </>
  );
};
