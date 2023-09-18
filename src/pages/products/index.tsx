/* eslint-disable import/prefer-default-export */
import React, { useEffect } from "react";

import { Container, Content } from "./styles";
import { Loading } from "../../components/Loading";
// import TableTest from "../../components/TableTest";
import { useTesteContext } from "../../context/Teste";

export const Products: React.FC = () => {
  const { handleRedirectAndGetTestes, loading } = useTesteContext();

  useEffect(() => {
    const id = window.location.pathname.substring(10);
    if (id) {
      handleRedirectAndGetTestes(id);
    }
  }, [handleRedirectAndGetTestes]);

  return (
    <>
      <Content>
        <Container>{loading ? <Loading /> : <></>}</Container>
      </Content>
    </>
  );
};
