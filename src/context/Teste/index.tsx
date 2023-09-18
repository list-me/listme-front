import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  IBuildProductFields,
  ICustomFields,
  IField,
  IFields,
  IHandlePost,
  IHeader,
  IProductsData,
  ITemplate,
} from "./test.context";
import { templateRequests } from "../../services/apis/requests/template";
import { productRequests } from "../../services/apis/requests/product";
import { ICustomCellType } from "../products/product.context";
import { ICustom } from "../products";

const COMPONENT_CELL_PER_TYPE: ICustomCellType = {
  RADIO: "radio",
  LIST: "select",
  CHECKED: "checkbox",
  FILE: "file",
  RELATION: "relation",
};

interface TesteContextProps {
  loading: boolean;
  handleRedirectAndGetTestes: (id: string) => Promise<{
    resultGetProducts: Object[];
    headers: IHeader[];
  } | null>;
  template: ITemplate;
  products: Object[] | undefined;
  colHeaders: string[];
  setColHeaders: React.Dispatch<React.SetStateAction<string[]>>;
  headerTable: IHeader[];
  COMPONENT_CELL_PER_TYPE: ICustomCellType;
  hidden: number[];
  handleSave: (
    value: IBuildProductFields,
    isNew: boolean,
    productId: string,
  ) => Promise<void>;
  handleResize: (col: number, newSize: number) => void;
  handleNewColumn: (col: any, fields: any) => void;
  handleHidden: (
    col: number,
    templateHidden: ITemplate,
    able: boolean,
  ) => number[];
  handleMove: (col: ICustomFields[]) => void;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: (product: any) => void;
}

const TesteContext = createContext<TesteContextProps | undefined>(undefined);

const useTesteContext = (): TesteContextProps => {
  const context = useContext(TesteContext);
  if (!context) {
    throw new Error(
      "useTesteContext deve ser usado dentro de um TesteContextProvider",
    );
  }
  return context;
};

function TesteContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [template, setTemplate] = useState<ITemplate>(
    [] as unknown as ITemplate,
  );
  const [loading, setLoading] = useState(false);
  const [colHeaders, setColHeaders] = useState<string[]>([""] as string[]);
  const [headerTable, setHeaderTable] = useState<IHeader[]>([{}] as IHeader[]);
  const [hidden, setHidden] = useState<number[]>([]);
  const [customFields, setCustomFields] = useState<ICustomFields[]>();
  const [filter, setFilter] = useState(undefined);
  const [products, setProducts] = useState<Object[]>();
  const [total, setTotal] = useState<number>(0);

  async function handleGetProducts(
    templateId: string,
    templateFields: IHeader[],
    templateData: ITemplate,
    page: number = 0,
    limit: number = 100,
    keyword: string = "",
  ): Promise<Object[]> {
    // if (total == prod.length) return;
    const response = await productRequests.list(
      { page, limit, keyword },
      templateId,
    );
    const responseData: IProductsData = response.data;

    const productFields: Object[] = [];
    responseData?.products?.forEach((item) => {
      const object: { [key: string]: string | string[] } = {};
      item.fields.forEach((field) => {
        const currentField = templateFields.find((e) => e.data === field.id);

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

    // if (!productFields.length && template) {
    if (!productFields.length && templateData) {
      productFields.push({ [templateData.fields.fields[0].id]: "" });
    }
    setProducts(productFields);
    setTotal(responseData.total);
    return productFields;
  }

  function getFields(templateData: ITemplate): IHeader[] {
    const { fields } = templateData;
    let headers: IHeader[] = fields?.fields?.map(
      (item: IField, index: number) => {
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
          bucket_url: templateData.bucket_url,
        };
      },
    );

    const sortedHeaders = headers.sort((a, b) => {
      return Number(a.order) - Number(b.order);
    });

    const headerTitles = sortedHeaders.map((item) => {
      return item?.title;
    });

    const headersCell = [...headerTitles, " "];
    headers = [...sortedHeaders];
    setColHeaders(headersCell);
    setHeaderTable(headers);

    const hiddenArray = sortedHeaders
      .filter((item) => item.hidden)
      .map((element) => Number(element.order));
    setHidden(hiddenArray);

    const customFieldsArray = sortedHeaders
      .filter((element) => Object.keys(element).length)
      .map((item) => {
        const objectCustom: ICustomFields = {
          order: item.order,
          hidden: item.hidden,
          width: item.width,
          frozen: item.frozen,
          id: item.data,
        };

        return objectCustom;
      });

    setCustomFields(customFieldsArray);
    setFilter(undefined);
    return headers;
  }

  const handleGetTemplate = useCallback(
    async (
      templateId: string,
    ): Promise<{
      headers: IHeader[];
      responseTemplateData: ITemplate;
    } | null> => {
      try {
        setLoading(true);
        const response = await templateRequests.get(templateId);
        const responseTemplateData = response as ITemplate;
        if (responseTemplateData) {
          setTemplate(responseTemplateData);
          const headers = getFields(responseTemplateData);
          return { headers, responseTemplateData };
        }
        return null;
      } catch (er) {
        console.error("Error:", er);
        toast.error("Não foi possível carregar o template, tente novamente!");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleRedirectAndGetTestes = useCallback(
    async (id: string) => {
      const result = await handleGetTemplate(id);
      if (result) {
        const { headers, responseTemplateData } = result;
        if (headers) {
          const resultGetProducts = await handleGetProducts(
            id,
            headers,
            responseTemplateData,
          );
          const currentProducts = { resultGetProducts, headers };
          return currentProducts;
        }
      }
      return null;
    },
    [handleGetTemplate],
  );

  const buildProduct = useCallback(
    (fields: IBuildProductFields) => {
      const obj: { id: string; value: string | string[] }[] = [];
      if (Object.keys(fields).length) {
        const columnKeys = headerTable.map((column) => column?.data);
        Object.keys(fields).forEach((field) => {
          if (
            fields[field] &&
            !["id", "created_at"].includes(field) &&
            columnKeys.includes(field)
          ) {
            obj.push({
              id: field,
              value:
                typeof fields[field] === "object"
                  ? fields[field]
                  : [fields[field]],
            });
          }
        });
      }

      return obj;
    },
    [headerTable],
  );

  const handlePost = async (product: IHandlePost): Promise<any> => {
    return productRequests.save(product);
  };

  const handleSave = useCallback(
    async (
      valuetoSave: IBuildProductFields,
      isNew: boolean,
      productId: string,
    ) => {
      try {
        const fields = buildProduct(valuetoSave);

        if (isNew) {
          await productRequests.update({ id: productId, fields });
          toast.success("Produto atualizado com sucesso");
          return null;
        }
        const newProduct: IHandlePost = {
          id: productId,
          product_template_id: window.location.pathname.substring(10),
          is_public: true,
          fields,
        };

        const product = await handlePost(newProduct);
        const newItem = product.id;

        toast.success("Produto cadastrado com sucesso");
        return newItem;
      } catch (error: any) {
        const message =
          typeof error?.response?.data?.message === "object"
            ? error?.response?.data?.message[0]
            : error?.response?.data?.message;

        toast.error(message);
      }
      return null;
    },
    [buildProduct],
  );

  const handleResize = useCallback(
    (col: number, newSize: number) => {
      if (customFields) {
        const customs = customFields.map((item, index) => {
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
        templateRequests
          .customView(template.id, { fields: customs })
          .catch(() =>
            toast.error("Ocorreu um erro ao alterar o tamanho do campo"),
          );
      }
    },
    [customFields, template.id],
  );

  const handleNewColumn = useCallback((col: any, fields: any) => {
    setTemplate((prevTemplate) => {
      const newTemplate = { ...prevTemplate };
      newTemplate.fields.fields = fields;
      return newTemplate;
    });

    setCustomFields((prev) => [
      ...(prev || []),
      {
        order: col?.order,
        hidden: col?.hidden,
        width: col?.width,
        frozen: col?.frozen,
        id: col?.data,
      },
    ]);

    setHeaderTable((prevHeaderTable) => {
      const newPosition = [...prevHeaderTable, col];
      newPosition.splice(newPosition.length - 2, 1);
      newPosition.push({});
      return newPosition;
    });
  }, []);

  const buildCustomFields = useCallback(
    (
      fields: IField[],
      { order, show, width, frozen }: ICustom,
      col: number,
    ): ICustomFields[] => {
      const updatedCustomFields = (customFields || []).map((custom) => {
        if (+custom?.order === col) {
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
      return updatedCustomFields;
    },
    [customFields],
  );

  const handleHidden = useCallback(
    (col: number, templateHidden: ITemplate, able: boolean): number[] => {
      setCustomFields((prev) => {
        const updatedCustomFields = (prev || []).map((item) => {
          if (item?.order === col.toString()) {
            return {
              ...item,
              hidden: able,
            };
          }
          return item;
        });
        return updatedCustomFields;
      });

      const content = hidden;
      const newValue = content.includes(col)
        ? content.filter((element) => element !== col)
        : [...content, col];
      setHidden(newValue);

      const custom = buildCustomFields(
        templateHidden?.fields?.fields,
        { show: able },
        col,
      );
      templateRequests
        .customView(window.location.pathname.substring(10), { fields: custom })
        .catch(() =>
          toast.error("Ocorreu um erro ao alterar a visibilidade do campo"),
        );

      return newValue;
    },
    [buildCustomFields, hidden],
  );

  const handleMove = (col: ICustomFields[]): void => {
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
      .catch(() =>
        toast.error("Ocorreu um erro ao alterar a posição da coluna"),
      );
  };

  const handleDelete = (product: any): void => {
    try {
      productRequests
        .delete(product.id)
        .then(() => {
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

  const value = useMemo(
    () => ({
      loading,
      handleRedirectAndGetTestes,
      template,
      products,
      colHeaders,
      setColHeaders,
      headerTable,
      COMPONENT_CELL_PER_TYPE,
      hidden,
      handleSave,
      handleResize,
      handleNewColumn,
      handleHidden,
      handleMove,
      total,
      setTotal,
      handleDelete,
    }),
    [
      loading,
      handleRedirectAndGetTestes,
      template,
      products,
      colHeaders,
      setColHeaders,
      headerTable,
      hidden,
      handleSave,
      handleResize,
      handleNewColumn,
      handleHidden,
      handleMove,
      total,
      setTotal,
      handleDelete,
    ],
  );

  return (
    <TesteContext.Provider value={value}>{children}</TesteContext.Provider>
  );
}

export { TesteContextProvider, useTesteContext };
