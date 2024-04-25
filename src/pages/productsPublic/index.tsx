/* eslint-disable import/prefer-default-export */
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";
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
import { Container, Content } from "../products/styles";
import { useProductContext } from "../../context/products";

export const ProductsPublic: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleRedirectAndGetProducts, products, colHeaders } =
    useProductContext();
  useEffect(() => {
    setIsLoading(true);
    const id = window.location.pathname.substring(17);
    if (id) {
      handleRedirectAndGetProducts(id).then(() => {
        setIsLoading(false);
      });
    }
  }, [handleRedirectAndGetProducts]);

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
