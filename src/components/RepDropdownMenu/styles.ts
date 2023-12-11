import { Switch } from "antd";
import styled from "styled-components";
import { IStyleProps } from "./RepDropdownMenu.d";

export const Container = styled.div<IStyleProps>`
  height: auto;
  max-height: 500px;
  width: 320px;

  /* overflow-y: auto; */
  /* overflow-x: hidden; */

  border-radius: 8px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07);

  background: white;
  position: fixed;
  left: ${({ left }) => `${left}px`};
  top: 19%;

  z-index: 999;

  display: flex;
  flex-direction: column;

  padding: 16px;

  span:not(:first-child) {
    margin-top: 16px;
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    top: 25%;
    max-height: 450px;

    .ant-input-group-wrapper {
      margin-right: 0;
    }
  }

  input {
    height: 21px;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    line-height: 150%;
    color: ${({ theme }) => theme.colors.tertiary};
  }

  .ant-input-group-addon {
    background: none;
    border: none;
  }

  .content {
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 8px !important;
      height: 8px !important; /* largura da barra de rolagem */
    }

    ::-webkit-scrollbar-track {
      background-color: unset !important;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #cccccc !important; /* cor do botão da barra de rolagem */
      border-radius: 4px !important; /* raio da borda do botão da barra de rolagem */
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) =>
        theme.colors
          .primary} !important; /* cor do botão da barra de rolagem quando hover */
    }
  }
`;

export const Line = styled.div`
  display: flex;
  height: 21px;

  width: fit-content;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  line-height: 14px;
  text-align: center;

  label {
    margin-left: 8px;
  }

  margin-bottom: 16px;
`;

export const SwitchCustom = styled(Switch)`
  &.ant-switch-checked {
    background-color: ${({ theme }) =>
      theme.colors
        .primary} !important; // Altere a cor de fundo do switch quando está ativado
  }
`;
