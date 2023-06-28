/* eslint-disable  */

import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";
import { PropsRelation } from "./Relation.d";
import Modal from "../../Modal";
import {
  Button,
  ButtonContainer,
  Container,
  Content,
  HeaderTable,
  PrimaryButton,
  Tag,
  Title,
} from "./styles";

import { ReactComponent as CloseIcon } from "../../../assets/close-xsmall-blue.svg";
import { ReactComponent as CloseWindowIcon } from "../../../assets/close-gray.svg";

import { templateRequests } from "../../../services/apis/requests/template";
import { productRequests } from "../../../services/apis/requests/product";
import { productContext } from "../../../context/products";
import { Loading } from "../../Loading";
import { SearchBar } from "../../SearchBar/SearchBar";

export const Relation: React.FC<PropsRelation> = ({
  currentValue,
  templateId,
  field,
  column,
  dataProvider,
  row,
}) => {
  const [value, setValue] = useState<any[]>(currentValue);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(value.length);
  const [currentProducts, setCurrentProducts] = useState<any[]>(value);

  const [columns, setColumns] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [oldData, setOldData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldTitle, setFieldTitle] = useState<any[]>([]);

  const [keyword, setKeyword] = useState<string>("");
  const [templateRelation, setTemplateRelation] = useState<any>({});

  const { handleSave } = useContext(productContext);

  const handleChangeVisible = (): void => {
    setFieldTitle([]);
    setIsOpen(!isOpen);
  };

  const handleCancel = (): void => {
    setFieldTitle([]);
    setCurrentProducts(value);
    setTotal(value.length);
    setIsOpen(false);
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
    setIsLoading(true);
    try {
      if (templateId) {
        templateRequests.get(templateId).then((response) => {
          let templateRel: any;
          const columnsTable = response.fields.fields
            .map((attribute: any, index: number) => {
              if (index === 0) setTemplateRelation(attribute);

              templateRel = attribute;
              return {
                key: attribute.id,
                dataIndex: attribute.id,
                title: attribute.title,
                render: (text: string) => text || "*Campo sem valor*",
              };
            })
            .slice(0, 4);

          productRequests.list({ limit: 50 }, templateId).then((response) => {
            const fields: any[] = [];
            const allFields: any[] = [];
            response.products?.forEach((product: any) => {
              const currentIds = currentProducts?.map((e) => e.id);
              if (currentIds && !currentIds.includes(product.id)) {
                const props: any = {};

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
                      props.id = product.id;
                    }
                  });
                  allFields.push(props);
                  return fields.push(props);
                }
              } else {
                const props: any = {};
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
                      props.id = product.id;
                    }
                  });
                  return allFields.push(props);
                }
              }
            });

            setData(fields);
            setOldData(allFields);
          });

          setColumns(columnsTable);
          setIsLoading(false);
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        "Ocorreu um erro ao carregar os produtos à serem relacionados",
      );
      setIsOpen(false);
    }
  };

  const handleGetProducts = async () => {
    setIsLoading(true);
    try {
      const productPromises = await currentProducts.map(async (product) => {
        if (product) {
          productRequests
            .get(product?.id)
            .then((response) => {
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
            })
            .catch((error) => {
              throw error;
            });

          return product;
        }
      });

      await Promise.all(productPromises);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(
        "Ocorreu um erro ao carregar os produtos à serem relacionados",
      );
    }
  };

  const handleClick = (product: any) => {
    const fieldTemplate = column.options[0].field;
    const values =
      typeof product[field] === "object"
        ? product[field][0]
        : "*Campo sem valor*";
    const newTitle = { value: values, id: product.id };

    setFieldTitle((prev) => [newTitle, ...prev]);
    setData((prev) => {
      return prev.filter((e) => {
        if (e?.id !== product?.id) return e;
      });
    });

    const newProduct = {
      id: product.id,
      field: fieldTemplate,
      templateId: column.options[0].templateId,
    };

    const products: any[] = [newProduct, ...currentProducts];
    setCurrentProducts(products);
    setTotal(products.length);
  };

  const handleClickRemove = (title: any) => {
    const value = oldData?.find((e) => {
      if (title.id == e.id) return e;
    });

    if (value) setData((prev) => [value, ...prev]);

    setFieldTitle((prev) => {
      return prev.filter((e) => {
        if (e.id !== title.id) return e;
      });
    });

    const products: any[] = currentProducts.filter(
      (current) => current.id !== title.id,
    );
    setCurrentProducts(products);
    setTotal(products.length);
  };

  const handleUpdateProduct = async () => {
    const newData = dataProvider;
    newData[row][column.data] = currentProducts;

    const id = handleSave(newData[row])
      .then((id) => {
        setIsOpen(false);
        return id;
      })
      .catch((error) => {
        toast.error(error);
      });

    setValue(currentProducts);
    if (id) dataProvider[row].id = id;
  };

  const handleSearchProducts = async (): Promise<void> => {
    setIsLoading(true);
    try {
      productRequests
        .list({ limit: 200, keyword }, templateId)
        .then((response) => {
          const fields: any[] = [];
          const allFields: any[] = [];
          response.products?.forEach((product: any) => {
            const currentIds = currentProducts?.map((e) => e.id);
            if (
              (currentIds && !currentIds.includes(product.id)) ||
              !currentProducts?.length
            ) {
              const props: any = {};

              const exceedLimit = product.fields.find((productField: any) => {
                if (
                  productField.id == column.data &&
                  templateRelation.options[0].limit <= productField.value.length
                ) {
                  return productField;
                }
              });

              if (!exceedLimit) {
                product.fields.forEach((element: any) => {
                  if (element && Object.keys(element).length) {
                    props[element?.id] = handleGetValueString(element.value);
                    props.id = product.id;
                  }
                });
                allFields.push(props);
                return fields.push(props);
              }
            } else {
              const props: any = {};
              const exceedLimit = product.fields.find((productField: any) => {
                if (
                  productField.id == column.data &&
                  templateRelation.options[0].limit <= productField.value.length
                ) {
                  return productField;
                }
              });

              if (!exceedLimit) {
                product.fields.forEach((element: any) => {
                  if (element && Object.keys(element).length) {
                    props[element?.id] = handleGetValueString(element.value);
                    props.id = product.id;
                  }
                });
                return allFields.push(props);
              }
            }
          });

          setData(fields);
          setOldData(allFields);
          setIsLoading(false);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      setIsLoading(false);
      toast.error("Ocorreu um erro durante a busca");
    }
  };

  useEffect(() => {
    if (isOpen) {
      buildColumns();
      handleGetProducts();
    }
  }, [isOpen]);

  return (
    <Container onClick={() => {}}>
      <div className="tagContent">
        <Tag onClick={handleChangeVisible} maxWidth="fit-content">
          <label> {total} Item(s) relacionados </label>
        </Tag>
      </div>
      <Modal isOpen={isOpen} changeVisible={() => {}} width="60vw" top="2%">
        <>
          <Title>
            Produtos relacionados
            <CloseWindowIcon onClick={handleCancel} />
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
              {total >= column.options[0].limit ? (
                <label> Número máximo de items já relacionados </label>
              ) : (
                <>
                  <HeaderTable>
                    <Title> Relacionar items </Title>
                    <SearchBar
                      handleChangeInput={(value: string) => setKeyword(value)}
                      onPressEnter={handleSearchProducts}
                    />
                  </HeaderTable>
                  {isLoading ? (
                    <Loading />
                  ) : (
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
                      scroll={{ y: "calc(100vh - 430px)" }}
                      pagination={false}
                      size="middle"
                    />
                  )}
                </>
              )}
            </div>
          </Content>

          <ButtonContainer>
            <PrimaryButton onClick={handleCancel}>Cancelar</PrimaryButton>
            <Button onClick={handleUpdateProduct}>Salvar</Button>
          </ButtonContainer>
        </>
      </Modal>
    </Container>
  );
};
