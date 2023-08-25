/* eslint-disable import/prefer-default-export */
import React from "react";
import { Container } from "./styles";
import { Loading } from "../../Loading";

export const LoadingFetch: React.FC = () => {
  return (
    <Container>
      <Loading />
    </Container>
  );
};
