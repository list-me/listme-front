import styled from "styled-components";

export const Content = styled.div`
  .section {
    display: flex;
    flex-direction: column;

    margin-bottom: 2.5rem;
  }

  .selectContainer {
    display: block;
    flex-direction: column;

    margin-bottom: 4rem;

    .ant-form-item-label {
      display: flex;
      height: 24px !important;
      width: 100%;
      margin-bottom: 8px !important;
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
      font-weight: 400;
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
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #212529 !important;

      max-height: 100px !important;
    }
  }

  .label {
    font-size: 14px;
    /* font-weight: 700; */

    margin-bottom: 5px;
  }

  .radio-group {
    display: flex !important;
    justify-content: flex-start !important;
    align-items: start;
    font-family: "Satoshi Regular", sans-serif !important;
    font-weight: 400;
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