import styled from "styled-components";
import { ICardStyleProps } from "./Card.d";

export const Container = styled.div<ICardStyleProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};

  background: white;
`;
