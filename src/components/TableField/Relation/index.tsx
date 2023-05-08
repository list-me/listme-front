import React, { useState } from "react";
import { PropsRelation } from "./Relation";
import Modal from "../../Modal";
import { Container, Tag } from "./styles";

import { ReactComponent as AddIcon } from "../../../assets/add-gray-large.svg";

export const Relation: React.FC<PropsRelation> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentProducts, setContentProducts] = useState<any[]>([
    "1",
    "Product Product",
    "Product2",
    "Product3",
    "Product4",
  ]);

  const handleChangeVisible = () => setIsOpen(!isOpen);

  return (
    <Container>
      <Modal isOpen={isOpen} changeVisible={handleChangeVisible} />
      <div className="tagContent">
        {contentProducts.length &&
          contentProducts.map((content) => (
            <Tag>
              {" "}
              <label>{content}</label>{" "}
            </Tag>
          ))}
      </div>
      <div className="imageContent">
        <AddIcon onClick={handleChangeVisible} />
      </div>
    </Container>
  );
};
