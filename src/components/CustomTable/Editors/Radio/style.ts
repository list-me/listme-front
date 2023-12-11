import { Radio } from "antd";
import styled from "styled-components";

/* eslint-disable import/prefer-default-export */
export const Container = styled.div`
  width: 100%;

  /* font-family: "Satoshi Bold", sans-serif; */
  font-style: normal;
  /* font-weight: 700; */
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  line-height: 150%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .radio-group {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: start;
  }

  .ant-radio-wrapper.ant-radio-wrapper-checked {
    font-family: "Satoshi Bold", sans-serif !important;
    color: ${({ theme }) => theme.colors.primary} !important;

    .ant-radio-inner {
      background: ${({ theme }) => theme.colors.secondary} !important;
      border: 2.4px solid ${({ theme }) => theme.colors.primary} !important;
    }

    .ant-radio-inner::after {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;
