/* eslint-disable import/prefer-default-export */
import React, { useContext, useEffect, useState } from "react";

import { Container, Content } from "./styles";
import Table from "../../components/CustomTable";
import { productContext } from "../../context/products";
import { Loading } from "../../components/Loading";
import SidebarError from "../../components/Integration/Error/SidebarError";
import { useIntegration } from "../../context/IntegrationContext";

export const Products: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleRedirectAndGetProducts, products, colHeaders } =
    useContext(productContext);

  const {
    sidebarErrorOpened,
    errors,
    setSidebarErrorOpened,
    limit,
    offset,
    setOffset,
    setSearchIntegration,
    setSearchSwitch,
  } = useIntegration();

  useEffect(() => {
    setIsLoading(true);
    const id = window.location.pathname.substring(10);
    if (id) {
      handleRedirectAndGetProducts(id).then(() => {
        setIsLoading(false);
      });
    }
    return () => {
      setOffset(0);
      setSidebarErrorOpened(false);
      setSearchIntegration("");
      setSearchSwitch(false);
    };
  }, [
    handleRedirectAndGetProducts,
    setOffset,
    setSearchIntegration,
    setSearchSwitch,
    setSidebarErrorOpened,
  ]);

  return (
    <>
      <Content>
        <Container>
          {sidebarErrorOpened && (
            <SidebarError
              errors={errors}
              setSidebarErrorOpened={setSidebarErrorOpened}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
              total={errors.total}
              setSearchIntegration={setSearchIntegration}
              setSearchSwitch={setSearchSwitch}
            />
          )}
          {isLoading ? <Loading /> : products && colHeaders && <Table />}
        </Container>
      </Content>
    </>
  );
};
