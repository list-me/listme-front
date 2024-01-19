import React from "react";

import styled from "styled-components";

export const ContainerTopic = styled.p`
  color: #212529;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`;

function Topic({
  value,
}: {
  value: string | null | undefined;
}): JSX.Element | null {
  if (value) return <ContainerTopic>{value}</ContainerTopic>;
  return null;
}

export default Topic;
