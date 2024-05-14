/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Loading } from "../../components/Loading";
import ProductsPublicTable from "../../components/FromTo/components/PublicList/ProductsPublicTable";
import { Container, Content } from "../products/styles";
import { useProductContext } from "../../context/products";
import { ROUTES } from "../../constants/routes";

export const ProductsPublic: React.FC = () => {
  const location = useLocation();
  const isOutsidePage = location.pathname.includes("outside");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleRedirectAndGetProducts,
    products,
    colHeaders,
    targetTemplatePublic,
  } = useProductContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isOutsidePage && !targetTemplatePublic) {
      navigate(`${ROUTES.TEMPLATES}`);
    }
    setIsLoading(true);

    const id = window.location.pathname.split("/").pop();
    if (id) {
      handleRedirectAndGetProducts(id).then(() => {
        setIsLoading(false);
      });
    }
  }, [
    handleRedirectAndGetProducts,
    isOutsidePage,
    navigate,
    targetTemplatePublic,
  ]);

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
