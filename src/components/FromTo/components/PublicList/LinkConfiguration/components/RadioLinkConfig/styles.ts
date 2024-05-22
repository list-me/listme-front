import { Radio } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: 700;
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
  .ant-radio-wrapper {
    font-family: "Satoshi Bold", sans-serif !important;
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

export const StyledRadio = styled(Radio)`
  color: red;
  &.ant-radio-wrapper {
    .ant-radio-input:focus + .ant-radio-inner {
    }
    .ant-radio-checked .ant-radio-inner {
      border-color: green;
      background-color: yellow;
    }
    .ant-radio-checked .ant-radio-inner::after {
      background-color: brown;
    }
    .ant-radio-inner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;
export const ContainerOption = styled.div<{ isActive?: boolean }>`
  border-radius: 8px;
  border: ${(props) =>
    props.isActive ? "1px solid #3818d9" : "1px solid #dee2e6"};
  padding: 12px;
  cursor: pointer;
`;
export const Description = styled.p`
  margin: 0;
  margin-top: 10px;
  color: #868e96;
  font-size: 14px;
  font-weight: 400;
`;
