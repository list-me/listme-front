import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { STORAGE } from "../../constants/localStorage";
import {
  ICustomFields,
  IField,
  IHeader,
  IProductsData,
  ITemplate,
} from "./test.context";
import { templateRequests } from "../../services/apis/requests/template";
import { productRequests } from "../../services/apis/requests/product";
import { ICustomCellType } from "../products/product.context";

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
  const [total, setTotal] = useState<number>();

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

  const value: TesteContextProps = {
    loading,
    handleRedirectAndGetTestes,
    template,
  };

  return (
    <TesteContext.Provider value={value}>{children}</TesteContext.Provider>
  );
}

export { TesteContextProvider, useTesteContext };
