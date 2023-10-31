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
  width: 220px;

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

export const Item = styled.span<{ isLast?: boolean }>`
  font-family: "Satoshi Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ isLast }) => (isLast ? "red" : "#495057")};

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
    filter: brightness(0.2);
  }
`;
