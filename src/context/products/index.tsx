/* eslint-disable */
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { productRequests } from "../../services/apis/requests/product";
import { templateRequests } from "../../services/apis/requests/template";
import { ICustomCellType } from "./product.context";

export interface ICustomField {
  hidden?: boolean;
  width?: string;
  frozen?: boolean;
  order?: string;
}

export interface ICustom {
  show?: boolean;
  width?: string;
  frozen?: boolean;
  order?: string;
}

interface IRelation {
  agreementType: string;
  field: string;
  mappingType: string;
  owner: string;
  templateId: string;
}
export interface IHeaderTable {
  title?: string;
  type: string;
  data: string;
  className: string;
  options: string[] | IRelation[];
  hidden?: boolean;
  width?: string;
  frozen?: boolean;
  order?: string;
}

interface ITypeProductContext {
  products: any[];
  filteredData: any[];
  filter: string | undefined;
  setProducts: Function;
  handleRedirectAndGetProducts: (template: any) => Promise<any>;
  headerTable: IHeaderTable[];
  setHeaderTable: Function;
  handleAdd: Function;
  handleSave: Function;
  editing: boolean;
  setEditing: Function;
  colHeaders: string[];
  handleDelete: Function;
  COMPONENT_CELL_PER_TYPE: ICustomCellType;
  handleUpdateTemplate: Function;
  template: any;
  hidden: number[];
  handleHidden: Function;
  setHidden: Function;
  handleResize: Function;
  setColHeaders: Function;
  handleFreeze: Function;
  handleMove: Function;
  handleNewColumn: Function;
  handleFilter: Function;
  handleRemoveColumn: (
    column: number,
    fields: any[],
    newColumns: any[],
    fieldId: string,
  ) => void;
}

interface IField {
  id: string;
  type: string;
  group: string;
  title: string;
  options: string[];
  required: boolean;
  help_text: string;
  is_public: string;
  description: string;
  order?: string;
  hidden?: boolean;
  width?: string;
  frozen?: boolean;
}

export const productContext = createContext<ITypeProductContext>({
  products: [],
  filteredData: [],
  filter: "",
  setProducts: () => {},
  handleRedirectAndGetProducts: async (): Promise<any> => {},
  headerTable: [],
  setHeaderTable: () => {},
  handleAdd: () => {},
  handleSave: () => {},
  editing: false,
  setEditing: () => {},
  colHeaders: [],
  handleDelete: () => {},
  COMPONENT_CELL_PER_TYPE: {},
  handleUpdateTemplate: () => {},
  template: {},
  hidden: [],
  handleHidden: () => {},
  setHidden: () => {},
  handleResize: () => {},
  setColHeaders: () => {},
  handleFreeze: () => {},
  handleMove: () => {},
  handleNewColumn: () => {},
  handleFilter: () => {},
  handleRemoveColumn: () => {},
});

export const ProductContextProvider = ({ children }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [template, setTemplate] = useState<any>();
  const [headerTable, setHeaderTable] = useState<IHeaderTable[]>([]);
  const [colHeaders, setColHeaders] = useState<any[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [hidden, setHidden] = useState<any[]>([]);
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const COMPONENT_CELL_PER_TYPE: ICustomCellType = {
    RADIO: "radio",
    LIST: "select",
    CHECKED: "checkbox",
    FILE: "file",
    RELATION: "relation",
  };

  const handleUpdateTemplate = (field: any) => {};

  const handleDelete = (product: any) => {
    try {
      const currentProducts = filteredData.filter((itemProduct: any) => {
        if (itemProduct.id !== product.id) {
          return itemProduct;
        }
      });

      productRequests
        .delete(product.id)
        .then((response: any) => {
          setFilteredData(currentProducts);
          toast.success("Produto excluído com sucesso");
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro na tentativa de deletar este produto");
    }
  };

  const handleGetProducts = async (
    templateId: string,
    templateFields: IHeaderTable[],
  ) => {
    return productRequests
      .list({}, templateId)
      .then((response) => {
        const productFields: any = [];
        response?.products?.forEach((item: any) => {
          let object: any = {};
          item.fields.forEach((field: any) => {
            const currentField = templateFields.find(
              (e: any) => e.data == field.id,
            );

            if (currentField && field.value) {
              const test = !COMPONENT_CELL_PER_TYPE[
                currentField?.type?.toUpperCase()
              ]
                ? field?.value[0]
                : field?.value;

              object[field?.id] = test;
            }
          });
          productFields.push({
            ...object,
            id: item.id,
            created_at: item.created_at,
          });
        });

        if (!productFields.length && template) {
          productFields.push({ [template[0]]: "" });
        }
        setProducts(productFields);
        setFilteredData(productFields);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "Não foi possível carregar os produtos, por favor tente novamente!",
        );
      });
  };

  const handleRedirectAndGetProducts = async (id: string) => {
    try {
      const template = await handleGetTemplates(id);
      await handleGetProducts(id, template);
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro com sua solicitação de produtos, tente novamente",
      );
    }
  };

  const handlePost = async (product: any) => {
    return productRequests
      .save(product)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  };

  const handleSave = async (value: any) => {
    const fields = buildProduct(value);
    try {
      if (value?.id) {
        await Promise.resolve(
          productRequests.update({ id: value.id, fields }),
        ).catch((error) => {
          throw error;
        });
        return;
      } else {
        const newProduct = {
          product_template_id: window.location.pathname.substring(10),
          is_public: true,
          fields: fields,
        };

        let product = await handlePost(newProduct);
        setFilteredData((prev) => {
          return prev.map((element) => {
            if (!element?.id) {
              return {
                ...element,
                id: product?.id,
              };
            }
            return element;
          });
        });
      }
    } catch (error: any) {
      console.error(error.response.data.message[0]);
      toast.error(error.response.data.message);
    }
  };

  const buildProduct = (fields: any) => {
    const obj: any[] = [];
    if (Object.keys(fields).length) {
      const columnKeys = headerTable.map((column) => column?.data);
      Object.keys(fields).forEach((field: any) => {
        if (
          fields[field] &&
          !["id", "created_at"].includes(field) &&
          columnKeys.includes(field)
        ) {
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

  const handleAdd = () => {
    if (filteredData.find((product: any) => !Object.keys(product).length)) {
      toast.error("Preencha o novo produto em branco!");
      return;
    }

    setFilteredData((old) => [{}, ...old]);
  };

  const handleGetTemplates = async (templateId: string) => {
    return templateRequests
      .get(templateId)
      .then((response) => {
        setTemplate(response);
        const fields = response?.fields;
        let headersCell: any[] = [];
        var headers = fields?.fields?.map((item: IField, index: any) => {
          headersCell.push(item.title);
          return {
            title: item.title,
            data: item.id,
            className: "htLeft htMiddle",
            type: item.type,
            options: item.options,
            order: item.order !== undefined ? item.order : index.toString(),
            hidden: item.hidden ? item.hidden : false,
            width: item.width ? item.width : "300px",
            frozen: item.frozen ? item.frozen : false,
          };
        });

        const test = headers.sort((a: any, b: any) => {
          return Number(a.order) - Number(b.order);
        });

        const test1 = headers.map((item: any) => {
          return item?.title;
        });

        headersCell = [...test1, " "];
        headers = [...test, {}];
        setColHeaders(headersCell);
        setHeaderTable(headers);
        setHidden(
          headers
            .filter((item: any) => item.hidden)
            .map((element: any) => Number(element.order)),
        );
        setCustomFields(
          headers
            .filter((element: any) => {
              if (Object.keys(element).length) {
                return element;
              }
            })
            .map((item: any) => {
              const { order, hidden, width, frozen, data } = item;
              return { order, hidden, width, frozen, id: data };
            }),
        );
        setFilter(undefined);
        return headers;
      })
      .catch((error) => {
        console.error(error);
        toast.error("Não foi possível carregar o template, tente novamente!");
      });
  };

  const handleResize = (col: number, newSize: number, template: any) => {
    const columnKeys = headerTable.map((column) => column?.data);

    // setCustomFields(prev => {
    //     return prev.map((item) => {
    //         if (item?.order == col.toString()) {
    //             return {
    //                 ...item,
    //                 width: newSize.toString(),
    //             }
    //         }

    //         return item;
    //     })
    // });

    const customs = customFields.map((item: any, index: any) => {
      if (item && item?.order == col.toString()) {
        return {
          ...item,
          width: newSize.toString(),
          order: index.toString(),
        };
      }

      return item;
    });
    setCustomFields(customs);
    // const custom = buildCustomFields(template.fields.fields, {width: `${newSize.toString()}`}, col);

    templateRequests
      .customView(template.id, { fields: customs })
      .catch((error) =>
        toast.error("Ocorreu um erro ao alterar o tamanho do campo"),
      );
    // return custom;
  };

  const handleHidden = (
    col: number,
    template: any,
    able: boolean,
  ): number[] => {
    const content = hidden;
    let newValue;
    if (content.includes(col)) {
      newValue = content.filter((element) => element != col);
    } else {
      newValue = [...content, col];
    }

    setHidden(newValue);
    setCustomFields((prev) => {
      return prev.map((item) => {
        if (item?.order == col.toString()) {
          return {
            ...item,
            hidden: able,
          };
        }

        return item;
      });
    });

    const custom = buildCustomFields(
      template?.fields?.fields,
      { show: able },
      col,
    );
    templateRequests
      .customView(window.location.pathname.substring(10), { fields: custom })
      .catch((error) =>
        toast.error("Ocorreu um erro ao alterar a visibilidade do campo"),
      );

    return newValue;
  };

  const buildCustomFields = (
    fields: any,
    { order, show, width, frozen }: ICustom,
    col: number,
  ) => {
    const testing = [...customFields];
    return testing?.map((custom) => {
      if (custom?.order == col) {
        return {
          id: custom?.id,
          order: order ? order.toString() : custom?.order,
          hidden: show !== undefined ? show : custom?.hidden,
          width: width ? width : custom?.width,
          frozen: frozen ? frozen : custom?.frozen,
        };
      }
      return custom;
    });
  };

  const handleFreeze = (col: any, state: boolean, operation?: string) => {
    let changeState: any[];
    if (operation && operation == "unfreeze") {
      changeState = customFields.map((customs) => {
        return {
          ...customs,
          frozen: false,
        };
      });

      setCustomFields(changeState);
    } else {
      changeState = customFields.map((customs) => {
        if (Number(customs?.order) <= col?.order) {
          return {
            ...customs,
            frozen: true,
          };
        }

        return customs;
      });

      setCustomFields(customFields);
    }

    setHeaderTable((prev) => {
      return prev.map((item, index) => {
        return {
          ...item,
          width: changeState[index]?.width,
          order: changeState[index]?.order,
          frozen: changeState[index]?.frozen,
          hidden: changeState[index]?.hidden,
        };
      });
    });

    templateRequests
      .customView(template.id, { fields: changeState })
      .catch((error) =>
        toast.error("Ocorreu um erro ao definir o freeze da coluna"),
      );

    return customFields;
  };

  const handleMove = (col: any[]) => {
    const fields = col
      .filter((item) => {
        if (Object.keys(item).length > 0) return item;
      })
      .map((element) => {
        return {
          order: element?.order,
          hidden: element?.hidden,
          width: element?.width,
          frozen: element?.frozen,
          id: element?.data,
        };
      });

    // setHeaderTable(col);
    setCustomFields(fields);
    templateRequests
      .customView(window.location.pathname.substring(10), { fields })
      .catch((error) =>
        toast.error("Ocorreu um erro ao alterar a posição da coluna"),
      );
  };

  const handleNewColumn = (col: any, fields: any[]) => {
    const newTemplate = template;
    newTemplate.fields.fields = fields;
    setTemplate(newTemplate);

    setCustomFields((prev) => [
      ...prev,
      {
        order: col?.order,
        hidden: col?.hidden,
        width: col?.width,
        frozen: col?.frozen,
        id: col?.data,
      },
    ]);

    const newPosition = [...headerTable, col];
    newPosition.splice(newPosition.length - 2, 1);
    newPosition.push({});
    setHeaderTable(newPosition);
    console.log("Added");
  };

  const handleFilter = (word: string): any[] => {
    const filtered = products.filter((row) => {
      let multiOptions: string[] = [];
      let values = Object.values(row).filter((element: any) => {
        if (typeof element === "object") {
          return Object.values(element).forEach((option: any) =>
            multiOptions.push(option),
          );
        }

        return element !== undefined;
      });
      values = [...values, ...multiOptions];

      return values.some((cell) => {
        const option = cell as string;
        if (option.toLocaleLowerCase().includes(word.toLocaleLowerCase())) {
          return cell;
        }
      });
    });

    setFilteredData(filtered);
    setFilter(word === "" ? undefined : word);
    return filtered;
  };

  const handleRemoveColumn = (
    column: number,
    fields: any[],
    newColumns: any[],
    fieldId: string,
  ) => {
    const newTemplate = template;
    newTemplate.fields.fields = fields;
    setTemplate(newTemplate);

    const keys = newColumns
      .filter((item) => Object.keys(item).length)
      .map((item) => item.data);
    const customs = customFields.filter((item, index) => {
      if (keys.includes(item?.id)) {
        return {
          ...item,
          order: index.toString(),
        };
      }
    });

    setCustomFields(customs);

    setHeaderTable(newColumns);
    templateRequests
      .removeColumn(window.location.pathname.substring(10), { column: fieldId })
      // templateRequests
      //   .customView(template.id, { fields: customs })
      //   .catch((error) =>
      //     toast.error("Ocorreu um ao alterar os campos customizados"),
      //   );
      .catch((error) =>
        toast.error("Ocorreu um erro ao excluir a coluna do template"),
      );
  };

  const value: ITypeProductContext = {
    products,
    filteredData,
    filter,
    setProducts,
    handleRedirectAndGetProducts,
    headerTable,
    setHeaderTable,
    handleAdd,
    handleSave,
    editing,
    setEditing,
    colHeaders,
    handleDelete,
    COMPONENT_CELL_PER_TYPE,
    handleUpdateTemplate,
    template,
    hidden,
    handleHidden,
    setHidden,
    handleResize,
    setColHeaders,
    handleFreeze,
    handleMove,
    handleNewColumn,
    handleFilter,
    handleRemoveColumn,
  };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};
