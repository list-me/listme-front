import React, { useEffect, useState } from "react";
import { PropsRelation } from "./Relation";
import Modal from "../../Modal";
import { Container, Content, Tag, Title } from "./styles";

import { ReactComponent as AddIcon } from "../../../assets/add-gray-large.svg";
import { ReactComponent as CloseIcon } from "../../../assets/close-xsmall-blue.svg";

import { Table } from "antd";
import { templateRequests } from "../../../services/apis/requests/template";
import { productRequests } from "../../../services/apis/requests/product";

export const Relation: React.FC<PropsRelation> = ({ value, templateId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentProducts, setContentProducts] = useState<any[]>(value ?? []);
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  const handleChangeVisible = () => setIsOpen(!isOpen);

  const handleGetValueString = (value: any) => {
    return value?.map((val: any) => {
      if (val && typeof val === "object") {
        return val[0]?.toString();
      }

      return val;
    });
  };

  const buildColumns = () => {
    if (templateId) {
      templateRequests.get(templateId).then((response) => {
        const columnsTable = response.fields.fields
          .map((field: any) => {
            return {
              title: field.title,
              key: field.id,
              dataIndex: field.id,
            };
          })
          .slice(0, 4);

        productRequests.list({ limit: 200 }, templateId).then((response) => {
          const fields: any[] = [];
          console.log({ response });
          response.products?.forEach((product: any) => {
            let props: any = {}; // initialize an empty object
            product.fields.forEach((field: any) => {
              if (field && Object.keys(field).length) {
                props[field?.id] = handleGetValueString(field.value);
              }
              //  return {
              //     [field.id]: "field.value",
              //   };
            });

            fields.push(props);
            //   const coluna = product.fields.map((field: any) => {
            //   //   const col = columnsTable.find((co: any) => co.key == field?.id);
            //   //   if (field && col) {
            //   //     return {
            //   //       [col.key]: field.value,
            //   //     };
            //   //   }
            //   // });
            //   // .filter(Boolean);
            //   console.log({ coluna });
          });

          console.log({ fields });
          setData(fields);
        });
        setColumns(columnsTable);
      });

      // setData([
      //   {
      //     499286: "fiel.value",
      //     769296: "asdlkajs",
      //     106305: "asldkjalsdkj",
      //   },
      //   {
      //     499286: "fiel.value",
      //     769296: "asdlkajs",
      //     106305: "asldkjalsdkj",
      //   },
      // ]);
    }
  };

  useEffect(() => {
    if (isOpen) buildColumns();
  }, [isOpen]);

  return (
    <Container>
      <Modal isOpen={isOpen} changeVisible={handleChangeVisible} width="60vw">
        <Title> Produtos relacionados </Title>
        <Content>
          <div className="contentProducts">
            {!(contentProducts[0] === "") ? (
              contentProducts.map((content, index) => (
                <div className="tagItem" key={index}>
                  <Tag onClick={handleChangeVisible}>
                    {" "}
                    <label>{content?.field}</label>
                  </Tag>
                  <span>
                    <CloseIcon onClick={(e) => console.log("")} />
                  </span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="contentTable">
            <Table columns={columns} dataSource={data} />
          </div>
        </Content>
      </Modal>
      <div className="tagContent">
        {!(contentProducts[0] === "") ? (
          contentProducts.map((content, index) => (
            <Tag key={index} onClick={handleChangeVisible} maxWidth="60">
              {" "}
              <label>{content?.field}</label>{" "}
            </Tag>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="imageContent">
        <AddIcon onClick={handleChangeVisible} />
      </div>
    </Container>
  );
};
