import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

import { productRequests } from "../../services/apis/requests/product";
import { templateRequests } from "../../services/apis/requests/template";
import {
  ICustomCellType,
  ICustomField,
  IField,
  IHeader,
  IHeaderTable,
  IProduct,
  IProductToTable,
  IProductsRequest,
  ITemplate,
} from "./product.context";
import { fileRequests } from "../../services/apis/requests/file";
import { isCollectionCompany } from "../../utils";
import { IConditions } from "../FilterContext/FilterContextType";

export interface ICustom {
  show?: boolean;
  width?: string;
  frozen?: boolean;
  order?: string;
}

interface ITypeProductContext {
  products: IProductToTable[];
  filteredData: any[];
  filter: string | undefined;
  setProducts: React.Dispatch<React.SetStateAction<IProductToTable[]>>;
  setFilteredData: Function;
  handleRedirectAndGetProducts: (template: any) => Promise<any>;
  headerTable: IHeader[];
  setHeaderTable: React.Dispatch<React.SetStateAction<IHeader[]>>;
  handleAdd: Function;
  handleSave: (
    value: any,
    isNew: boolean,
    productId: string,
    fieldId: string,
    newValue: string,
    prevValue?: string,
  ) => Promise<any>;
  editing: boolean;
  setEditing: Function;
  colHeaders: string[];
  handleDelete: Function;
  COMPONENT_CELL_PER_TYPE: ICustomCellType;
  handleUpdateTemplate: Function;
  template: any;
  setTemplate: React.Dispatch<React.SetStateAction<any>>;
  hidden: number[];
  handleHidden: Function;
  setHidden: Function;
  handleResize: Function;
  setColHeaders: React.Dispatch<React.SetStateAction<string[]>>;
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
  handleGetProducts: (
    templateId: string,
    templateFields: IHeaderTable[],
  ) => Promise<any>;

  handleGetTemplate: (templateId: string) => Promise<IHeader[] | null>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  handleGetProductsFiltered: (
    key: string,
    templateId: string,
    page: number,
  ) => Promise<any[]>;
  uploadImages: (
    files: Array<File>,
    bucketUrl: string,
    companyId: string,
    optionals?: { brand?: string; name?: string },
  ) => Promise<Array<string> | void>;
  customFields: ICustomField[];
  conditionsFilter: IConditions[];
  setConditionsFilter: React.Dispatch<React.SetStateAction<IConditions[]>>;
}

interface SignedUrlResponse {
  url: string;
  access_url: string;
}

export const productContext = createContext<ITypeProductContext>(
  {} as ITypeProductContext,
);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [products, setProducts] = useState<IProductToTable[]>([]);
  const [template, setTemplate] = useState<ITemplate>();
  const [headerTable, setHeaderTable] = useState<IHeader[]>([]);
  const [colHeaders, setColHeaders] = useState<string[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [hidden, setHidden] = useState<any[]>([]);
  const [customFields, setCustomFields] = useState<ICustomField[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [total, setTotal] = useState<number>(0);
  const [conditionsFilter, setConditionsFilter] = useState<IConditions[]>([
    {},
  ] as IConditions[]);

  const COMPONENT_CELL_PER_TYPE: ICustomCellType = useMemo(
    () => ({
      RADIO: "radio",
      LIST: "select",
      CHECKED: "checkbox",
      FILE: "file",
      RELATION: "relation",
      BOOLEAN: "boolean",
    }),
    [],
  );

  async function handleGetProductsFiltered(
    key: string,
    templateId: string,
    page: number,
  ): Promise<any[]> {
    const { data } = await productRequests.list(
      { keyword: key, limit: 100, page },
      templateId,
    );

    return data;
  }

  const getSignedUrl = async (
    fileName: string,
    fileType: string,
    templateId: string,
    optionals?: { brand?: string; name?: string },
  ): Promise<SignedUrlResponse> => {
    return fileRequests.getSignedUrl(fileName, fileType, templateId, {
      brand: optionals?.brand,
      name: optionals?.name,
    });
  };

  const uploadImages = useCallback(
    async (
      files: File[],
      bucketUrl: string,
      companyId: string,
      optionals?: { brand?: string; name?: string },
    ): Promise<string[] | void> => {
      try {
        const filesNames: string[] = [];
        const uploadPromises = files.map(async (file) => {
          const [fileName, fileType] = file.name.split(".");

          let signedUrl: SignedUrlResponse;
          if (isCollectionCompany(companyId)) {
            if (!optionals?.brand || !optionals?.name) {
              // eslint-disable-next-line @typescript-eslint/no-throw-literal
              throw "Marca e Nome devem estar preenchidos";
            }

            signedUrl = await getSignedUrl(fileName, fileType, bucketUrl, {
              brand: optionals.brand,
              name: optionals.name,
            });
          } else {
            signedUrl = await getSignedUrl(fileName, fileType, bucketUrl);
          }

          filesNames.push(signedUrl.access_url);
          return fileRequests.uploadFile(file, signedUrl.url);
        });

        await Promise.all(uploadPromises);
        return filesNames;
      } catch (error) {
        if (typeof error === "string") {
          toast.warning(error);
        } else {
          throw new Error("Ocorreu um erro ao realizar o upload dos arquivos");
        }
      }
    },
    [],
  );

  const handleUpdateTemplate = (_field: any) => {};

  const handleDelete = (product: any) => {
    try {
      const currentProducts = filteredData.filter((itemProduct: any) => {
        if (itemProduct.id !== product.id) {
          return itemProduct;
        }
      });

      productRequests
        .delete(product.id)
        .then((_response: any) => {
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

  function reorganizeArrayWithChildren(list: IProduct[]): IProduct[] {
    const newArray: IProduct[] = [];

    list.forEach((fItem) => {
      newArray.push(fItem);

      if (fItem.children) {
        fItem.children.forEach((child) => {
          newArray.push(child);
        });

        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        delete fItem.children;
      }
    });

    return newArray;
  }

  const handleGetProducts = useCallback(
    async (
      templateId: string,
      templateFields: IHeaderTable[],
      page: number = 0,
      limit: number = 100,
      keyword: string = "",
      conditions: IConditions[] | undefined = undefined,
      operator?: string,
    ) => {
      const { data }: { data: IProductsRequest } = await productRequests.list(
        { page, limit, keyword },
        templateId,
        conditions,
        operator,
      );

      const listProducts = reorganizeArrayWithChildren(data?.products);

      const productFields: {
        [key: string]: string | string[] | boolean;
        id: string;
        created_at: string;
        is_parent: boolean;
        childrens: any[];
      }[] = [];

      if (listProducts.length) {
        listProducts.forEach((item) => {
          const object: { [key: string]: string | string[] } = {};
          if (item?.fields?.length) {
            item?.fields?.forEach((field) => {
              const currentField = templateFields.find(
                (e) => e.data === field.id,
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
          }

          const toProductFields = {
            ...object,
            id: item.id,
            created_at: item.created_at,
            parent_id: item.parent_id,
            childrens: item.children,
            is_parent: item?.is_parent,
          };

          productFields.push(toProductFields);
        });
      }

      setProducts(productFields as any);
      setTotal(data?.total);
      return { productFields, headerTable };
    },
    [COMPONENT_CELL_PER_TYPE],
  );

  const handleGetTemplate = useCallback(async (templateId: string) => {
    try {
      const response: ITemplate = await templateRequests.get(templateId);

      setTemplate(response);

      const fields = response?.fields;
      let headersCell = [];
      const headers: IHeader[] = fields?.fields?.map(
        (item: IField, index: number) => {
          headersCell.push(item.title);
          return {
            title: item.title,
            data: item.id,
            className: "htLeft htMiddle",
            type: item.type,
            required: item.required,
            options: item.options,
            order: item.order !== undefined ? item.order : index.toString(),
            hidden: item.hidden ? item.hidden : false,
            width: item.width ? item.width : "300px",
            frozen: item.frozen ? item.frozen : false,
            bucket_url: response?.bucket_url,
            limit: item.limit,
            integrations: item.integrations,
          };
        },
      );

      const sortedHeaders: IHeader[] = headers.sort((a, b) => {
        return Number(a.order) - Number(b.order);
      });

      const headerTitles = sortedHeaders.map((item: any) => {
        return item?.title;
      });

      headersCell = [...headerTitles, " "];
      setColHeaders(headersCell);
      const toHeaderTable = [...sortedHeaders, {} as IHeader];
      setHeaderTable(toHeaderTable);
      setHidden(
        sortedHeaders
          .filter((item) => item.hidden)
          .map((element) => Number(element.order)),
      );

      const toCustomFields = sortedHeaders
        .filter((element) => Object.keys(element).length)
        .map((item) => {
          const result = item;
          return {
            order: result.order,
            hidden: result.hidden,
            width: result.width,
            frozen: result.frozen,
            id: result.data,
          };
        });
      setCustomFields(toCustomFields);
      setFilter(undefined);
      return headers;
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível carregar o template, tente novamente!");
      return null;
    }
  }, []);

  const handleRedirectAndGetProducts = useCallback(
    async (id: string) => {
      try {
        const headerTableToGetProducts = (await handleGetTemplate(
          id,
        )) as IHeaderTable[];

        if (headerTableToGetProducts) {
          const product = await handleGetProducts(id, headerTableToGetProducts);
          return product;
        }
        return null;
      } catch (error) {
        console.error(error);
        toast.error(
          "Ocorreu um erro com sua solicitação de produtos, tente novamente",
        );
        return null;
      }
    },
    [handleGetProducts, handleGetTemplate],
  );

  const handlePost = async (product: any): Promise<any> => {
    const responseHandlePost = productRequests.save(product);

    return responseHandlePost;
  };

  const buildProduct = (fields: any) => {
    const obj: any[] = [];
    if (Object.keys(fields).length) {
      // @ts-ignore
      const columnKeys = headerTable.map((column) => column?.data);
      let newValue;

      Object.keys(fields).forEach((field: any) => {
        if (
          !["id", "created_at"].includes(field) &&
          columnKeys.includes(field)
        ) {
          newValue =
            typeof fields[field] === "object"
              ? fields[field] || ""
              : [fields[field]];

          if (newValue[0] !== "")
            obj.push({
              id: field,
              value: newValue || [],
            });
        }
      });
    }

    return obj;
  };

  const handleSave = async (
    value: any,
    isNew: boolean,
    productId: string,
    fieldId: string,
    newValue: string,
    prevValue?: string,
    type?: string,
  ): Promise<any> => {
    try {
      const fields =
        typeof value === "string"
          ? buildProduct({ [fieldId]: value })
          : buildProduct(value);
      if (isNew) {
        const newValueToPatch = () => {
          if (newValue && !prevValue) {
            if (type === "relation") {
              return newValue;
            }
            if (
              (type === "file" || type === "boolean") &&
              typeof newValue !== "string"
            ) {
              if (typeof newValue[0] !== "string") {
                return (newValue as any).flat();
              }
              return newValue;
            }
            return [newValue || ""];
          }
          if (
            !newValue &&
            prevValue &&
            (type === "text" ||
              type === "paragraph" ||
              type === "decimal" ||
              type === "numeric" ||
              type === "checked" ||
              type === "list" ||
              type === "boolean")
          ) {
            return [{ value: prevValue || "", destroy: true }];
          }
          if (!newValue && prevValue && type === "file") {
            // @ts-ignore
            const newArray = prevValue.map((mValue) => {
              return { value: mValue, destroy: true };
            });
            return newArray;
          }
          if (newValue && prevValue && type === "file") {
            return (newValue as unknown as []).flat();
          }
          if (newValue && prevValue && type === "boolean") {
            return (newValue as unknown as []).flat();
          }
          if (type === "relation" && newValue && prevValue) {
            const newIds = (newValue as unknown as any[]).map(
              (item) => item.id,
            );
            const prevIds = (prevValue as unknown as any[]).map(
              (item) => item.id,
            );

            const addedIds = newIds.filter((id) => !prevIds.includes(id));
            const removedIds = prevIds.filter((id) => !newIds.includes(id));

            const newArray = (prevValue as unknown as any[]).map((item) => {
              if (removedIds.includes(item.id)) {
                return { ...item, destroy: true };
              }
              return item;
            });

            const newItems = (newValue as unknown as any[]).filter((item) =>
              addedIds.includes(item.id),
            );
            newArray.push(...newItems);

            return newArray;
          }

          return [newValue];
        };
        const response = await productRequests.patchProductValue({
          value: newValueToPatch() as any,
          productId,
          fieldId,
        });
        toast.success("Produto atualizado com sucesso");
        return response;
      }
      const newProduct = {
        id: productId,
        templateId: window.location.pathname.substring(10),
        is_public: true,
        fields,
      };

      const product = await handlePost(newProduct);

      toast.success("Produto cadastrado com sucesso");
      return product;
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === "object"
          ? error?.response?.data?.message[0]
          : error?.response?.data?.message;

      toast.error(message);
    }
  };

  const handleAdd = () => {
    if (filteredData.find((product: any) => !Object.keys(product).length)) {
      toast.error("Preencha o novo produto em branco!");
      return;
    }

    setProducts((old) => [{} as IProductToTable, ...old]);
  };

  const handleResize = (col: number, newSize: number, template: any) => {
    let saveSize = newSize;

    if (newSize < 210) {
      saveSize = 210;
    }

    const customs = customFields.map((item: any, index: any) => {
      if (item && item?.order == col.toString()) {
        return {
          ...item,
          width: saveSize.toString(),
          order: index.toString(),
        };
      }

      return item;
    });

    setCustomFields(customs);

    templateRequests
      .customView(template.id, { fields: customs })
      .catch(() =>
        toast.error("Ocorreu um erro ao alterar o tamanho do campo"),
      );

    const id = window.location.pathname.substring(10);
    if (id && saveSize === 210) {
      setTimeout(() => {
        handleRedirectAndGetProducts(id).then(() => {});
      }, 0);
    }
  };

  const buildCustomFields = (
    _fields: any,
    { order, show, width, frozen }: ICustom,
    col: number,
    newfields: any,
  ): ICustomField[] => {
    const toBuild = [...newfields];

    const builded = toBuild?.map((custom) => {
      if (custom?.order === col) {
        return {
          id: custom?.id,
          order: order ? order.toString() : custom?.order,
          hidden: show !== undefined ? show : custom?.hidden,
          width: width || custom?.width,
          frozen: frozen || custom?.frozen,
        };
      }
      return custom;
    });
    return builded;
  };

  const handleHidden = async (
    col: number,
    temp: any,
    able: boolean,
  ): Promise<number[]> => {
    const content = hidden;
    let newValue;
    if (content.includes(col)) {
      newValue = content.filter((element) => element !== col);
    } else {
      newValue = [...content, col];
    }

    setHidden(newValue);
    const newfields = customFields.map((item) => {
      if (item?.order === col.toString()) {
        return {
          ...item,
          hidden: able,
        };
      }

      return item;
    });

    setCustomFields(newfields);

    const custom = buildCustomFields(
      temp?.fields?.fields,
      { show: able },
      col,
      newfields,
    );

    setHeaderTable((prev) => {
      return prev.map((item, index) => {
        if (+index === +col) {
          return {
            ...item,
            hidden: able,
          };
        }
        return { ...item };
      });
    });

    try {
      await templateRequests.customView(
        window.location.pathname.substring(10),
        { fields: custom },
      );
    } catch (e) {
      toast.error("Ocorreu um erro ao alterar a visibilidade do campo");
    }

    return newValue;
  };

  const handleFreeze = (col: any, operation?: string) => {
    const paramOrder = +col.order;

    const newCustomFields = customFields.map((item) => {
      if (operation === "unfreeze" && +item.order >= paramOrder) {
        return {
          ...item,
          frozen: false,
        };
      }
      if (+item.order <= paramOrder) {
        return {
          ...item,
          frozen: true,
        };
      }
      return item;
    });
    setHeaderTable((prev) => {
      return prev.map((item, index) => {
        return {
          ...item,
          frozen: newCustomFields[index]?.frozen,
        };
      });
    });
    templateRequests
      .customView(template!.id, { fields: newCustomFields })
      .catch((_error) =>
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
    templateRequests
      .customView(window.location.pathname.substring(10), { fields })
      .catch((_error) =>
        toast.error("Ocorreu um erro ao alterar a posição da coluna"),
      );
  };

  const handleNewColumn = (col: any, fields: any[]) => {
    const newTemplate = template;
    // @ts-ignore
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
  };

  const handleFilter = (word: string): any[] => {
    const filtered = products.filter((row) => {
      const multiOptions: string[] = [];
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

  const handleRemoveColumn = async (
    _column: number,
    fields: any[],
    newColumns: any[],
    fieldId: string,
  ): Promise<void> => {
    const newTemplate = template;
    // @ts-ignore
    newTemplate.fields.fields = fields;
    setTemplate(newTemplate);

    const keys = newColumns
      .filter((item) => Object.keys(item).length)
      .map((item) => item.data);
    const customs = customFields
      .filter((item) => {
        if (keys.includes(item?.id)) return item;
      })
      .map((element, index) => {
        return {
          ...element,
          order: index.toString(),
        };
      });

    setCustomFields(customs);
    setHeaderTable(newColumns);
    templateRequests
      .removeColumn(window.location.pathname.substring(10), { column: fieldId })
      .then((_resolved) => {
        templateRequests
          // @ts-ignore
          .customView(template.id, { fields: customs })
          .catch((_error) =>
            toast.error("Ocorreu um ao alterar os campos customizados"),
          );
      })
      .catch((_error) =>
        toast.error("Ocorreu um erro ao excluir a coluna do template"),
      );
    const id = window.location.pathname.substring(10);
    if (id) {
      setTimeout(() => {
        handleRedirectAndGetProducts(id).then(() => {});
      }, 0);
    }
  };

  const value: ITypeProductContext = {
    products,
    filteredData,
    filter,
    setProducts,
    setFilteredData,
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
    setTemplate,
    hidden,
    total,
    handleHidden,
    setHidden,
    handleResize,
    setColHeaders,
    handleFreeze,
    handleMove,
    handleNewColumn,
    handleFilter,
    handleRemoveColumn,
    handleGetProducts,
    handleGetProductsFiltered,
    handleGetTemplate,
    uploadImages,
    setTotal,
    customFields,
    conditionsFilter,
    setConditionsFilter,
  };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
};

export function useProductContext(): ITypeProductContext {
  const context = useContext(productContext);
  if (!context) {
    throw new Error(
      "useProductContext deve ser usado dentro de um ProductContextProvider",
    );
  }
  return context;
}
