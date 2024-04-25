/* eslint-disable import/prefer-default-export */
import React, { useCallback, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Container, Content } from "./styles";
import Table from "../../components/CustomTable";
import { productContext } from "../../context/products";
import { Loading } from "../../components/Loading";
import { productRequests } from "../../services/apis/requests/product";
import { templateRequests } from "../../services/apis/requests/template";

export const ProductsPublic: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { products, colHeaders } = useContext(productContext);

  const getProductsPublic = useCallback(async (id: string) => {
    try {
      const response = await templateRequests.get(id);
      console.log(
        "🚀 ~ file: index.tsx:20 ~ getProductsPublic ~ response:",
        response,
      );
      // const response = await productRequests.listPublic(
      //   { page: 0, limit: 100 },
      //   id,
      // );
      return null;
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro com sua solicitação de produtos, tente novamente",
      );
      return null;
    }
  }, []);

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
          {isLoading ? <Loading /> : products && colHeaders && <></>}
          {/* {isLoading ? <Loading /> : products && colHeaders && <Table />} */}
        </Container>
      </Content>
    </>
  );
};
