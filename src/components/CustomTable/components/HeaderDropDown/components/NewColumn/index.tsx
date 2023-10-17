/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React, { useRef, useState } from "react";

import { DropdownMenu } from "../../../../../DropdownMenu";
import { PersonalModal } from "../../../../../CustomModa";
import newColumnOptions from "../../../../../../utils/newColumnOptions";

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
        options={newColumnOptions}
        setIsOpen={() => setIsOpen(false)}
      />
    </>
  );
};
