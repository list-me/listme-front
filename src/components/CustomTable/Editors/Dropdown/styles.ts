/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const Select = styled.div`
  min-width: 150px;

  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const Item = styled.div`
  border-radius: 8px;
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: left;

  height: 35px;

  font-family: "Satoshi regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;

  &:hover {
    cursor: pointer;
    background: #f7f5ff !important;
    color: #a899f1 !important;
  }
`;
