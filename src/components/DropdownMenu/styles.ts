import styled from "styled-components";
import { DropdownMenuStyleProps } from "./DropdownMenu.d";

export const Container = styled.div<DropdownMenuStyleProps>`
  width: ${({ width }) => width};
  height: ${({ heigth }) => heigth};

  position: relative;
  background: white;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  z-index: 9999;
`;

export const SuspenseMenu = styled.div`
  z-index: 9999;

  height: auto;
  width: 265px;

  border-radius: 8px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07);
  top: 245px;

  background: white;
  position: absolute;
  top: 10px;

  display: flex;
  flex-direction: column;

  padding: 16px;

  span:not(:first-child) {
    margin-top: 16px;
  }
`;

export const Item = styled.span<{ isLast?: boolean; isDisabled?: boolean }>`
  font-family: "Satoshi Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ isLast }) => (isLast ? "red" : "#495057")};
  position: relative;
  width: 100%;
  height: 19px;

  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;

  svg {
    margin-right: 15px;
  }

  &:hover {
    cursor: pointer;
    /* filter: brightness(0.2); */

    ::before {
      content: "Não é possível excluir este campo. Campo obrigatório para integração";
      font-family: ${({ theme }) => theme.fonts.family.default};
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      font-size: ${({ theme }) => theme.fonts.sizes.small};
      color: ${({ theme }) => theme.colors.secondary};
      background: #000000bf;
      position: absolute;
      border-radius: 6px;
      top: 28px;
      left: -8px;
      display: ${(props) =>
        // eslint-disable-next-line no-nested-ternary
        !props.isLast ? "none" : props.isDisabled ? "flex" : "none"};
      align-items: center;
      justify-content: center;
      flex-shrink: 1;
      width: 470px;
      height: 35px;
    }
    ::after {
      content: "";
      position: absolute;
      top: 20px;
      left: 0px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #000000bf;
      display: ${(props) =>
        // eslint-disable-next-line no-nested-ternary
        !props.isLast ? "none" : props.isDisabled ? "initial" : "none"};
    }
  }
`;
