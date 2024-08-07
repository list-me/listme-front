import styled from "styled-components";

export const Container = styled.div<{ isDisabled?: boolean }>`
  width: calc(100% + 16px);
  height: fit-content;
  max-height: 85vh;
  overflow-y: auto;
  background: #ffffff;

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
  .ant-modal-content {
    margin-right: 0 !important;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px; */
  .modalNotEdit {
    width: 100%;
  }
  .modalNotEdit:hover {
    position: relative;
    ::before {
      content: "Não é possível editar estes campos. Campos obrigatórios para integração";
      font-family: ${({ theme }) => theme.fonts.family.default};
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      font-size: ${({ theme }) => theme.fonts.sizes.small};
      color: ${({ theme }) => theme.colors.secondary};
      background: #000000bf;
      position: absolute;
      border-radius: 6px;
      top: 100px;
      left: 0px;
      display: ${(props) => (props.isDisabled ? "flex" : "none")};
      align-items: center;
      justify-content: center;
      flex-shrink: 1;
      width: 470px;
      height: 35px;
      z-index: 1;
    }
    ::after {
      content: "";
      position: absolute;
      top: 92px;
      left: 8px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #000000bf;
      display: ${(props) => (props.isDisabled ? "initial" : "none")};
    }
  }
  input:hover {
  }

  .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: unset !important;
  }

  .ant-tree .ant-tree-node-content-wrapper:hover {
    background-color: unset !important;
  }

  .dragger {
    width: fit-content;
    margin-top: 12px;

    font-family: "Satoshi Bold";
    font-size: 15px;
    color: #212529;

    p:first-child {
      margin-bottom: -8px;
    }

    .onDragger {
      height: fit-content !important;
      margin: 0 !important;

      label {
        font-family: "Satoshi Regular", sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: #212529;
      }
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
  color: ${({ theme }) => theme.colors.tertiary};

  flex: none;
  order: 1;
  align-self: stretch;
  /* flex-grow: 0; */

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    font-size: 14px;
  }
`;

export const BodyContent = styled.div`
  width: 100%;

  .encapsulator {
    width: 100%;

    padding-right: 16px;
  }
`;

export const Footer = styled.div`
  height: auto;
  margin-top: 16px;

  .ant-form-item-label {
    height: fit-content !important;
    margin: 0 !important;

    label {
      font-family: "Satoshi Bold", sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 150%;
      color: #212529;
    }
  }

  .ant-switch {
    width: 24px !important;
    height: 16px !important;
  }

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

export const InputContainer = styled.div`
  width: 100%;

  .no-bold-label .ant-form-item-label > label {
    font-weight: normal !important;
  }

  .ant-form-item-label {
    display: flex;
    height: 24px !important;
    width: 100%;
    margin-bottom: 6px !important;

    label {
      font-family: "Satoshi Regular", sans-serif !important;
      font-style: normal;
      font-weight: 400 !important;
      font-size: 13px !important;
    }
  }

  .ant-form-item-explain-error {
    font-family: "Satoshi Regular", sans-serif !important;
    font-style: normal;
    font-weight: 400 !important;
    font-size: 13px !important;
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

    ::placeholder {
      font-size: 14px !important;
    }
  }

  .ant-select {
    border: none !important;
    height: fit-content !important;
  }

  .ant-select-selection-placeholder {
    font-size: 14px !important;
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

    ::placeholder {
      font-size: 14px !important;
    }
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
  .ant-modal-close {
    position: relative;
    right: 20px;
  }

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
  height: fit-content;
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

  &:disabled {
    background-color: #dee2e6;
    cursor: auto;
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
export const CharacterLimitContainer = styled.div`
  .ant-form-item-label {
    .ant-form-item-no-colon {
      width: 100%;
      padding: 0;
    }
  }
  .label-content {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  button {
    position: relative;
    right: -10px;
  }
`;
