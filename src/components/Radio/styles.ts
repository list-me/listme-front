import { Radio } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  /* font-family: "Satoshi Bold", sans-serif; */
  font-style: normal;
  /* font-weight: 700; */
  font-size: 14px;
  line-height: 150%;

  display: flex;
  flex-direction: column;

  .radio-group {
    display: flex !important;
    flex-direction: column !important;
  }

  

  .ant-radio-wrapper.ant-radio-wrapper-checked {
    font-family: "Satoshi Bold", sans-serif !important;
    color: #3818D9 !important;

    .ant-radio-inner {
      background: white !important;
      border: 2.4px solid #3818D9 !important;
    }

    .ant-radio-inner::after {
      background: #3818D9;
    }
  }
`;

export const StyledRadio = styled(Radio)`
  color: red;
  

  &.ant-radio-wrapper {

    /* Cor do marcador */
    .ant-radio-input:focus + .ant-radio-inner {
      border-color: red;
    }
    .ant-radio-checked .ant-radio-inner {
      border-color: green;
      background-color: yellow;
    }
    .ant-radio-checked .ant-radio-inner::after {
      background-color: brown;
    }

    /* Tamanho do botão de opção */
    .ant-radio-inner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;