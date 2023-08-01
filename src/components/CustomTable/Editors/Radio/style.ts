import { Radio } from "antd";
import styled from "styled-components";

/* eslint-disable import/prefer-default-export */
export const Container = styled.div`
  width: 100%;

  /* font-family: "Satoshi Bold", sans-serif; */
  font-style: normal;
  /* font-weight: 700; */
  font-size: 14px;
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
    color: #3818d9 !important;

    .ant-radio-inner {
      background: white !important;
      border: 2.4px solid #3818d9 !important;
    }

    .ant-radio-inner::after {
      background: #3818d9;
    }
  }
`;
