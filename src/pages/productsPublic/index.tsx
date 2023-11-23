/* eslint-disable import/prefer-default-export */
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";
import { Container, Content } from "./styles";
import Table from "../../components/CustomTable";
import { Loading } from "../../components/Loading";
import { productRequests } from "../../services/apis/requests/product";
import { templateRequests } from "../../services/apis/requests/template";
import {
  ICustomCellType,
  IField,
  IHeader,
  IProductToTable,
} from "../../context/products/product.context";
import ProductsPublicTable from "../../components/FromTo/components/PublicList/ProductsPublicTable";

export const ProductsPublic: React.FC = () => {
  const COMPONENT_CELL_PER_TYPE: ICustomCellType = useMemo(
    () => ({
      RADIO: "radio",
      LIST: "select",
      CHECKED: "checkbox",
      FILE: "file",
      RELATION: "relation",
    }),
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [products, setProducts] = useState<IProductToTable[]>();
  const [colHeaders, setColHeaders] = useState<IProductToTable[]>();

  function getColHeaders(responseTemplates: any): void {
    const fields = responseTemplates?.fields.fields;
    let headersToView = [];

    const headers: IHeader[] = fields?.map((item: IField, index: number) => {
      return {
        title: item.title,
        order: item.order !== undefined ? item.order : index.toString(),
      };
    });

    const sortedHeaders: IHeader[] = headers.sort((a, b) => {
      return Number(a.order) - Number(b.order);
    });

    const headerTitles = sortedHeaders.map((item: any) => {
      return item?.title;
    });

    headersToView = [...headerTitles];
    setColHeaders(headersToView);
  }

  const getProductsPublic = useCallback(
    async (templateId: string) => {
      try {
        const responseTemplate = await templateRequests.get(templateId);
        getColHeaders(responseTemplate);

        const { data: dataProducts }: any = await productRequests.listPublic(
          { page: 0, limit: 100 },
          templateId,
        );

        const productFields: {
          [key: string]: string | string[];
          id: string;
          created_at: string;
        }[] = [];

        if (dataProducts.products.length) {
          dataProducts?.products?.forEach((item: any) => {
            const object: { [key: string]: string | string[] } = {};
            if (item?.fields?.length) {
              item?.fields?.forEach((field: any) => {
                const currentField = responseTemplate.fields.fields.find(
                  (e: any) => {
                    return e.id === field.id;
                  },
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
            };
            productFields.push(toProductFields);
          });
        }

        setProducts(productFields);
        setIsLoading(false);
        return null;
      } catch (error) {
        console.error(error);
        toast.error(
          "Ocorreu um erro com sua solicitação de produtos, tente novamente",
        );
        return null;
      }
    },
    [COMPONENT_CELL_PER_TYPE],
  );

  useEffect(() => {
    setIsLoading(true);
    const id = window.location.pathname.substring(17);
    if (id) {
      getProductsPublic(id);
    }
  }, [getProductsPublic]);

  return (
    <>
      <Content>
        <Container>
          {isLoading ? (
            <Loading />
          ) : (
            products && colHeaders && <ProductsPublicTable />
          )}
        </Container>
      </Content>
    </>
  );
};
