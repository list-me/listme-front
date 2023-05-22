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
  handleSave = () => {},
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
  const [limit, setLimit] = useState(column.options[0].limit);

  const handleChangeVisible = () => {
    setData([]);
    setOldData([]);
    setFieldTitle([]);
    // setCurrentProducts([]);
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
      templateRequests.get(templateId).then((response) => {
        let templateRel: any;
        const columnsTable = response.fields.fields
          .map((attribute: any) => {
            if (column.options[0].agrrementType == "bilateral") {
              if (attribute.id == column.data) {
                setOpt(attribute.options[0].field);
              }
            } else {
              setOpt(attribute.options[0].field);
            }

            templateRel = attribute;
            return {
              key: attribute.id,
              dataIndex: attribute.id,
              title: attribute.title,
              render: (text: string) => text || "*Campo sem valor*",
            };
          })
          .slice(0, 4);

        productRequests.list({ limit: 200 }, templateId).then((response) => {
          const fields: any[] = [];
          const allFields: any[] = [];
          response.products?.forEach((product: any) => {
            const currentIds = currentProducts.map((e) => e.id);
            if (!currentIds.includes(product.id)) {
              let props: any = {};

              const exceedLimit = product.fields.find((productField: any) => {
                if (
                  productField.id == column.data &&
                  templateRel.options[0].limit <= productField.value.length
                ) {
                  return productField;
                }
              });

              if (!exceedLimit) {
                product.fields.forEach((element: any) => {
                  if (element && Object.keys(element).length) {
                    props[element?.id] = handleGetValueString(element.value);
                    props["id"] = product.id;
                  }
                });
                allFields.push(props);
                return fields.push(props);
              }

              return;
            } else {
              let props: any = {};
              const exceedLimit = product.fields.find((productField: any) => {
                if (
                  productField.id == column.data &&
                  templateRel.options[0].limit <= productField.value.length
                ) {
                  return productField;
                }
              });

              if (!exceedLimit) {
                product.fields.forEach((element: any) => {
                  if (element && Object.keys(element).length) {
                    props[element?.id] = handleGetValueString(element.value);
                    props["id"] = product.id;
                  }
                });
                return allFields.push(props);
              }

              return;
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
    const productPromises = await currentProducts.map(async (product) => {
      if (product) {
        productRequests.get(product?.id).then((response) => {
          const title = response?.fields?.find((e: any) => {
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
    const fieldTemplate = column.options[0]["field"];

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
    const currentField = updatedProduct?.find((item) => {
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
              field: fieldTemplate,
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
              field: fieldTemplate,
              templateId: column.options[0].templateId,
            },
            ...e.value,
          ];
        }
        return e;
      });
    }

    const testing = updatedProduct
      .filter((e) => {
        if (e.id == column.data) return e;
      })
      .map((element) => element.value)[0];

    setCurrentProducts(testing);
    setRelations(updatedProduct);
  };

  const handleClickRemove = (title: any) => {
    const value = oldData?.find((e) => {
      if (title.id == e.id) return e;
    });

    setData((prev) => [value, ...prev]);
    setFieldTitle((prev) => {
      return prev.filter((e) => {
        if (e.id !== title.id) return e;
      });
    });

    const fieldId = column.data;
    const actualy = relations.map((element) => {
      if (element.id == fieldId) {
        element.value = element.value.filter(
          (item: any) => item.id !== title.id,
        );
      }

      return element;
    });
    setRelations(actualy);

    const testing = actualy
      .filter((e) => {
        if (e.id == column.data) return e;
      })
      .map((element) => element.value)[0];

    setCurrentProducts(testing);
  };

  const handleUpdateProduct = async () => {
    const values = relations.find((item) => {
      if (item.id == column.data) {
        return item;
      }
    }).value;

    handleSave(values);
  };

  useEffect(() => {
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
            {currentProducts.filter((e) => e !== "").length >= limit ? (
              <label> Máximo de items relacionados </label>
            ) : (
              <>
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
              </>
            )}
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
          <label>
            {" "}
            {currentProducts.filter((e) => e !== "").length ||
              contentProducts.filter((e) => e !== "").length}{" "}
            Item(s) relacionados{" "}
          </label>
        </Tag>
      </div>
    </Container>
  );
};
