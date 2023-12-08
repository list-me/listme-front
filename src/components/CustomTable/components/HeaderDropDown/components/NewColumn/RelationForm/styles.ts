import { InputNumber } from "antd";
import styled from "styled-components";

export const Content = styled.div`
  margin-top: 16px;

  label {
    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    font-size: 10px;
  }

  .section {
    display: flex;
    flex-direction: column;

    margin-bottom: 16px;

    .ant-radio-wrapper {
      font-family: "Satoshi Regular", sans-serif !important;
      font-size: 13px;
    }
  }

  .containerFields {
    display: block;
  }

  .selectCatalog {
    display: flex;
    flex-direction: column;
    height: 65px;

    margin-bottom: 16px;

    overflow: hidden;
    .ant-form-item-label {
      display: flex;
      height: 24px !important;
      width: 100%;
      margin-bottom: 10px !important;
      color: red;
    }

    .ant-select {
      border: none !important;
      width: 80% !important;
    }

    .ant-select-single .ant-select-show-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ant-select-selector {
      font-family: "Satoshi Regular", sans-serif;
      font-style: normal;
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      font-size: 14px !important;
      line-height: 150%;
      color: #212529;

      box-sizing: border-box;

      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 16px !important;

      width: 100%;
      height: 40px !important;

      border: 1px solid #e9ecef;
      border-radius: 8px;
    }

    .ant-select-open {
      font-family: "Satoshi Regular", sans-serif !important;
      font-style: normal;
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      font-size: 16px;
      line-height: 150%;
      color: #212529 !important;

      max-height: 100px !important;
    }
  }

  .selectField {
    display: flex;
    flex-direction: column;

    height: 65px;
    margin-bottom: 16px;

    overflow: hidden;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    font-size: 10px;

    .ant-form-item-label {
      display: flex;
      height: 24px !important;
      width: 100%;

      color: red;
    }

    .ant-select {
      border: none !important;
      width: 40% !important;
    }

    .ant-select-selector {
      font-family: "Satoshi Regular", sans-serif;
      font-style: normal;
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      font-size: 14px !important;
      line-height: 150%;
      color: #212529;

      box-sizing: border-box;

      display: flex;
      align-items: center;

      padding: 16px !important;

      width: 100%;
      height: 40px !important;

      border: 1px solid #e9ecef;
      border-radius: 8px;

      .ant-select-arrow {
        height: 50px !important;
      }
    }

    .ant-select-open {
      font-family: "Satoshi Regular", sans-serif !important;
      font-style: normal;
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      font-size: 10px !important;
      color: #212529 !important;

      max-height: 100px !important;
    }
  }

  .selectField .ant-select-selector {
    display: flex !important;
    align-items: center !important;
    position: relative !important;
  }

  .selectField .ant-select-selector .ant-select-arrow {
    top: 80% !important;
    transform: translateY(-80%);
  }

  .label {
    font-size: 14px;
    margin-bottom: 1px;
  }

  .radio-group {
    display: flex !important;
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

export const Loader = styled.div`
  display: flex;
  justify-content: center;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    width: 10px;
    height: 10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3818d9;
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 10px;

  width: 183px;
  height: 52px;

  background: #3818d9;
  border-radius: 6px;

  border: none;
  outline: none;

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  text-align: center;

  color: #ffffff;

  margin-left: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 10px;

  /* primary / second */
  width: 183px;
  height: 52px;

  /* primary / second */

  background: #f7f5ff;
  border-radius: 6px;

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  border: 0;
  color: #a899f1;
`;

export const CustomNumber = styled(InputNumber)`
  font-family: "Satoshi Regular", sans-serif;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  font-size: 13px;
`;
