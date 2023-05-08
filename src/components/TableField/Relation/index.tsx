import React, { useEffect, useState } from "react";
import { PropsRelation } from "./Relation";
import Modal from "../../Modal";
import { Container, Content, Tag, Title } from "./styles";

import { ReactComponent as AddIcon } from "../../../assets/add-gray-large.svg";
import { ReactComponent as CloseIcon } from "../../../assets/close-xsmall-blue.svg";

import { Table } from "antd";

export const Relation: React.FC<PropsRelation> = ({ value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentProducts, setContentProducts] = useState<any[]>([
    "Text",
    "Product Product",
    "Product2",
    "Product3",
    "Product4",
    "Text",
    "Product Product",
    "Product2",
    "Product3",
    "Product4",
    "Text",
    "Product Product",
    "Product2",
    "Product3",
    "Product4",
    "Text",
    "Product Product",
    "Product2",
    "Product3",
    "Product4",
    "Text",
    "Product Product",
    "Product2",
    "Product3",
    "Product4",
    "Text",
    "Product Product",
    "Product2",
    "Product3",
    "Product4",
  ]);

  const [columns, setColumns] = useState<any[]>([]);

  const handleChangeVisible = () => setIsOpen(!isOpen);

  const buildColumns = () => {};

  // console.log({ value });

  return (
    <Container>
      <Modal isOpen={isOpen} changeVisible={handleChangeVisible} width="60vw">
        <Title> Produtos relacionados </Title>
        <Content>
          <div className="contentProducts">
            {contentProducts.length &&
              contentProducts.map((content, index) => (
                <div className="tagItem">
                  <Tag key={index} onClick={handleChangeVisible}>
                    {" "}
                    <label>{content}</label>
                  </Tag>
                  <span>
                    <CloseIcon onClick={(e) => console.log("")} />
                  </span>
                </div>
              ))}
          </div>
          <Table />
        </Content>
      </Modal>
      <div className="tagContent">
        {contentProducts.length &&
          contentProducts.map((content, index) => (
            <Tag key={index} onClick={handleChangeVisible} maxWidth="60">
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
