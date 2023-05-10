import React, { useContext, useEffect, useState } from "react";
import { PropsRelation } from "./Relation";
import Modal from "../../Modal";
import { Container, Content, Tag, Title } from "./styles";

import { ReactComponent as AddIcon } from "../../../assets/add-column.svg";
import { ReactComponent as CloseIcon } from "../../../assets/close-xsmall-blue.svg";
import { ReactComponent as CloseWindowIcon } from "../../../assets/close-gray.svg";

import { Table } from "antd";
import { templateRequests } from "../../../services/apis/requests/template";
import { productRequests } from "../../../services/apis/requests/product";
import { productContext } from "../../../context/products";

export const Relation: React.FC<PropsRelation> = ({
  value,
  templateId,
  field,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentProducts, setContentProducts] = useState<any[]>(value ?? []);
  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [oldData, setOldData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fieldTitle, setFieldTitle] = useState<any[]>([]);

  const { template } = useContext(productContext);

  const handleChangeVisible = () => {
    setData([]);
    setOldData([]);
    setFieldTitle([]);
    setIsOpen(!isOpen);
  };

  const handleGetValueString = (value: any) => {
    return value?.map((val: any) => {
      if (val && typeof val === "object") {
        return val[0]?.toString();
      }

      return val;
    });
  };

  const buildColumns = () => {
    try {
    } catch (error) {}
    if (templateId) {
      let title = "";
      templateRequests.get(templateId).then((response) => {
        const columnsTable = response.fields.fields
          .map((attribute: any) => {
            // if (attribute.id == field) {
            //   title = attribute.title;
            // }
            return {
              key: attribute.id,
              dataIndex: attribute.id,
            };
          })
          .slice(0, 4);

        productRequests.list({ limit: 200 }, templateId).then((response) => {
          const fields: any[] = [];
          response.products?.forEach((product: any) => {
            const currentIds = contentProducts.map((e) => e.id);
            if (!currentIds.includes(product.id)) {
              let props: any = {};
              product.fields.forEach((field: any) => {
                if (field && Object.keys(field).length) {
                  props[field?.id] = handleGetValueString(field.value);
                  props["id"] = product.id;
                }
                //  return {
                //     [field.id]: "field.value",
                //   };
              });

              fields.push(props);
            }
          });

          setData(fields);
          setOldData(fields);
        });
        setColumns(columnsTable);
      });
    }
  };

  const handleGetProducts = async () => {
    const productPromises = await contentProducts.map(async (product) => {
      if (product) {
        productRequests.get(product?.id).then((response) => {
          const title = response?.fields.find((e: any) => {
            return e.id == product.field;
          });

          setFieldTitle((prev) => [
            { id: title.id, value: title.value[0] },
            ...prev,
          ]);
        });

        return product;
      }
    });

    await Promise.all(productPromises);
  };

  const handleClick = (product: any) => {
    const newTitle = { value: product[field][0], id: product.id };
    setFieldTitle((prev) => [newTitle, ...prev]);

    setData((prev) => {
      return prev.filter((e) => {
        if (e.id !== product.id) return e;
      });
    });
  };

  const handleClickRemove = (title: any) => {
    const value = oldData.find((e) => {
      if (title.id == e.id) return e;
    });

    setData((prev) => [value, ...prev]);
    setFieldTitle((prev) => {
      return prev.filter((e) => {
        if (e.id !== title.id) return e;
      });
    });
  };

  useEffect(() => {
    if (isOpen) {
      buildColumns();
      handleGetProducts().then((resolved) => console.log("done"));
    }
  }, [isOpen, contentProducts]);

  return (
    <Container>
      <Modal isOpen={isOpen} changeVisible={handleChangeVisible} width="60vw">
        <Title>
          Produtos relacionados
          <CloseWindowIcon onClick={handleChangeVisible} />
        </Title>

        <Content>
          <div className="contentProducts">
            {fieldTitle.length ? (
              fieldTitle.map((content, index) => {
                return (
                  <div className="tagItem" key={index}>
                    <Tag>
                      {" "}
                      <label>{content?.value}</label>
                    </Tag>
                    <span>
                      <CloseIcon onClick={() => handleClickRemove(content)} />
                    </span>
                  </div>
                );
              })
            ) : (
              <label> Nenhum produto relacionado </label>
            )}
          </div>
          <div className="contentTable">
            <Title> Relacionar produtos </Title>
            <Table
              columns={columns}
              dataSource={data}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    handleClick(record);
                  },
                };
              }}
              pagination={false}
            />
          </div>
        </Content>
      </Modal>

      <div className="tagContent">
        <Tag onClick={handleChangeVisible} maxWidth="fit-content">
          <label>
            {" "}
            {
              contentProducts.filter((e) => {
                if (e != "") return e;
              }).length
            }{" "}
            Produto(s) relacionados{" "}
          </label>
        </Tag>
      </div>

      <div className="imageContent" onClick={handleChangeVisible}>
        <AddIcon />
      </div>
    </Container>
  );
};
