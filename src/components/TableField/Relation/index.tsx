import React, { useContext, useEffect, useState } from "react";
import { PropsRelation } from "./Relation.d";
import Modal from "../../Modal";
import {
  Button,
  ButtonContainer,
  Container,
  Content,
  PrimaryButton,
  Tag,
  Title,
} from "./styles";

import { ReactComponent as AddIcon } from "../../../assets/add-column.svg";
import { ReactComponent as CloseIcon } from "../../../assets/close-xsmall-blue.svg";
import { ReactComponent as CloseWindowIcon } from "../../../assets/close-gray.svg";

import { Table } from "antd";
import { templateRequests } from "../../../services/apis/requests/template";
import { productRequests } from "../../../services/apis/requests/product";
import { productContext } from "../../../context/products";
import { toast } from "react-toastify";

export const Relation: React.FC<PropsRelation> = ({
  value,
  templateId,
  field,
  currentItem,
  column,
}) => {
  const buildProduct = (fields: any) => {
    const obj: any[] = [];
    if (fields && Object.keys(fields).length) {
      Object.keys(fields).forEach((field: any) => {
        if (fields[field] && !["id", "created_at"].includes(field)) {
          obj.push({
            id: field,
            value:
              typeof fields[field] == "object"
                ? fields[field]
                : [fields[field]],
          });
        }
      });
    }

    return obj;
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentProducts, setContentProducts] = useState<any[]>(value ?? []);
  const [currentProducts, setCurrentProducts] = useState<any[]>(value ?? []);

  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [oldData, setOldData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [relations, setRelations] = useState<any[]>(buildProduct(currentItem));

  const [fieldTitle, setFieldTitle] = useState<any[]>([]);

  const [opt, setOpt] = useState<string>();

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
            console.log({ attribute, column });
            if (column.options[0].agrrementType == "bilateral") {
              if (attribute.id == column.data) {
                setOpt(attribute.options[0].field);
              }
            } else {
              setOpt(attribute.options[0].field);
            }

            return {
              key: attribute.id,
              dataIndex: attribute.id,
              title: attribute.title,
              width: "10%",
            };
          })
          .slice(0, 4);

        productRequests.list({ limit: 200 }, templateId).then((response) => {
          const fields: any[] = [];
          const allFields: any[] = [];
          response.products?.forEach((product: any) => {
            const currentIds = contentProducts.map((e) => e.id);
            if (!currentIds.includes(product.id)) {
              let props: any = {};
              product.fields.forEach((field: any) => {
                if (field && Object.keys(field).length) {
                  props[field?.id] = handleGetValueString(field.value);
                  props["id"] = product.id;
                }
              });

              fields.push(props);
            } else {
              let props: any = {};
              product.fields.forEach((field: any) => {
                if (field && Object.keys(field).length) {
                  props[field?.id] = handleGetValueString(field.value);
                  props["id"] = product.id;
                }
              });

              allFields.push(props);
            }
          });

          setData(fields);
          setOldData(allFields);
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
            {
              id: product?.id,
              value: title ? title.value[0] : "*Campo sem valor*",
            },
            ...prev,
          ]);
        });

        return product;
      }
    });

    await Promise.all(productPromises);
  };

  const handleClick = (product: any) => {
    const values =
      typeof product[field] == "object"
        ? product[field][0]
        : "*Campo sem valor*";
    const newTitle = { value: values, id: product.id };

    setFieldTitle((prev) => [newTitle, ...prev]);

    setData((prev) => {
      return prev.filter((e) => {
        if (e.id !== product.id) return e;
      });
    });

    const fieldId = column?.data;
    let updatedProduct = relations;
    const currentField = updatedProduct.find((item) => {
      if (item.id == fieldId) {
        return item;
      }
    });

    if (!currentField) {
      updatedProduct = [
        {
          id: fieldId,
          value: [
            {
              id: product.id,
              field: opt,
              templateId: column.options[0].templateId,
            },
          ],
        },
        ...updatedProduct,
      ];
    } else {
      updatedProduct = updatedProduct.map((e) => {
        if (e.id == currentField.id) {
          e.value = [
            {
              id: product.id,
              field: opt,
              templateId: column.options[0].templateId,
            },
            ...e.value,
          ];
        }
        return e;
      });

      const fields = [
        ...updatedProduct
          .map((e) => {
            if (e.id == currentField.id) {
              return e.value;
            }
          })
          .filter(Boolean),
        // ...contentProducts,
      ];
      setContentProducts(fields);
    }

    const testing = updatedProduct.filter((e) => {
      if (e.id == field) return e.value;
    });

    setCurrentProducts(testing);
    setRelations(updatedProduct);
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

    const fieldId = column.data;
    const test = relations.map((element) => {
      if (element.id == fieldId) {
        element.value = element.value.filter(
          (item: any) => item.id !== title.id,
        );
      }

      return element;
    });
    setRelations(test);
  };

  const handleUpdateProduct = async () => {
    productRequests
      .update({ id: currentItem.id, fields: relations })
      .then((resoveld) => toast.success("Produto atualizado com sucesso"))
      .catch((error) => toast.error(error.response.data.message));
  };

  useEffect(() => {
    console.log({ currentProducts, value });
    if (isOpen) {
      buildColumns();
      handleGetProducts().then();
    }
  }, [isOpen]);

  useEffect(() => {}, [currentProducts]);

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
                    <Tag key={index}>
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
            <Title> Relacionar items </Title>
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

        <ButtonContainer>
          <PrimaryButton onClick={handleChangeVisible}>Cancelar</PrimaryButton>
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
              handleUpdateProduct();
            }}
          >
            Salvar
          </Button>
        </ButtonContainer>
      </Modal>

      <div className="tagContent">
        <Tag onClick={handleChangeVisible} maxWidth="fit-content">
          <label> {currentProducts.length} Item(s) relacionados </label>
        </Tag>
      </div>

      {/* <div className="imageContent" onClick={handleChangeVisible}>
        <AddIcon />
      </div> */}
    </Container>
  );
};
