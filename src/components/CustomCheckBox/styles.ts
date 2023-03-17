import { Checkbox } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  .firstContent {
    display: flex;
    flex-direction: column;
  }
  .ant-checkbox-group {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;

    label {
      min-width: 100px;
      
      font-family: "Satoshi Regular", sans-serif !important;
      font-style: normal;
      font-size: 14px !important;
      line-height: 150% !important;

      margin-bottom: 15px;
      margin-left: 0;
    }

    .ant-checkbox-inner::after {
      border-color: white;
      color: red;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background: #3818D9 !important;
      border-color: #3818D9;
    }
  }
`;

export const StyledCheckbox = styled(Checkbox)`
display: flex;
flex-direction: column;
/* margin: 0; */
  /* estilos padrão */
  & + span {
    font-size: 16px;
    color: #333;
  }

  /* estilos da checkbox selecionada */
  &:checked + span {
    color: red;
    font-weight: bold;
  }

  &:checked + span::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: 16px;
    height: 16px;
    border: 2px solid #1890ff;
    border-radius: 4px;
    background-color: #fff;
  }

  &:checked + span::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 4px;
    width: 7px;
    height: 3px;
    border: solid #1890ff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;