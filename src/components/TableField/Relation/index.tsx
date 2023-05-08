import React, { useState } from "react";
import { PropsRelation } from "./Relation";
import Modal from "../../Modal";
import { Container, Tag } from "./styles";

import { ReactComponent as AddIcon } from "../../../assets/add-gray-large.svg";

export const Relation: React.FC<PropsRelation> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeVisible = () => setIsOpen(!isOpen);

  return (
    <Container>
      <Modal isOpen={isOpen} changeVisible={handleChangeVisible} />
      <Tag> Wanderson </Tag>
      <AddIcon onClick={handleChangeVisible} />
    </Container>
  );
};
