import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: fit-content;

  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px; */

  .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: unset !important;
  }

  .ant-tree .ant-tree-node-content-wrapper:hover {
    background-color: unset !important;
  }

  .dragger {
    width: fit-content;
    /* max-height: 250px; */

    font-family: "Satoshi Regular";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: #212529;

    input:first-child {
      margin-top: 8px;
    }
  }

  .titleContainer {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: 60% !important;
  }
`;

export const Title = styled.h1`
  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #000000;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  margin-bottom: 8px;

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    font-size: 20px;
    margin-bottom: 0px;
  }
`;

export const Description = styled.h2`
  font-family: "Satoshi Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #868e96;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    font-size: 14px;
  }
`;

export const BodyContent = styled.div`
  height: fit-content;
  width: 100%;

  .encapsulator {
    overflow: auto;

    height: fit-content;
    width: 100%;

    padding-right: 16px;

    ::-webkit-scrollbar {
      width: 8px; /* largura da barra de rolagem */
    }

    ::-webkit-scrollbar-track {
      background-color: unset;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #cccccc; /* cor do botão da barra de rolagem */
      border-radius: 4px; /* raio da borda do botão da barra de rolagem */
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #3818d9; /* cor do botão da barra de rolagem quando hover */
    }

    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
      max-height: 500px;
    }
  }
`;

export const InputContainer = styled.div`
  width: 100%;

  .ant-form-item-label {
    display: flex;
    height: 24px !important;
    width: 100%;
    margin-bottom: 8px !important;
  }

  .ant-form-item-required {
    font-family: "Satoshi Bold", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px !important;
    line-height: 150%;
    color: #212529;

    :before {
      display: none !important;
    }
  }

  .ant-form-item-row {
    margin-bottom: 24px !important;
  }

  .ant-input {
    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px !important;
    line-height: 150%;
    color: #212529;

    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px !important;

    width: 100%;
    height: 56px !important;

    border: 1px solid #e9ecef;
    border-radius: 8px;
  }

  .ant-select {
    border: none !important;
  }

  .ant-select-selector {
    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px !important;
    line-height: 150%;
    color: #212529;

    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px !important;

    width: 100%;
    height: 56px !important;

    border: 1px solid #e9ecef;
    border-radius: 8px;
  }

  .ant-row .ant-form-item-row {
  }

  .ant-select-open {
    font-family: "Satoshi Regular", sans-serif !important;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #212529 Impo !important;
  }
`;

export const Item = styled.span`
  .ant-switch {
    width: 24px !important;
    height: 16px !important;
  }

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #212529;

  display: flex;
  justify-content: space-between;

  margin-bottom: 16px;

  .ant-switch-inner {
    &:hover {
      background: #3818d9;
    }
  }

  .ant-switch-handle::before {
    &:hover {
      background: #3818d9;
    }
  }

  .ant-switch-checked {
    background: #3818d9;
    &:hover {
      background: #3818d9;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: fit-content;

  margin-top: 8px;
`;

export const ButtonContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 92px;
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

export const BulkButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  /* primary / second */
  width: auto;
  height: 52px;

  /* primary / second */

  border-radius: 6px;
  background: unset;

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
  border: 0;
  color: #3818d9;
`;

export const AddNew = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 10px;

  width: auto;
  height: 36px;

  background: unset;
  border-radius: 6px;

  border: 1px solid #3818d9;
  outline: none;

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;

  text-align: center;

  color: #3818d9;

  margin-left: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const Principal = styled.button`
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

export const IconContent = styled.span`
  padding: 0;

  width: 12px;
  height: 13.33px;

  margin-left: 18px;

  &:hover {
    filter: brightness(0.2);
    transition: 0.5s;
  }
`;
