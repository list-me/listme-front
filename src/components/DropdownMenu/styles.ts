import styled from "styled-components";
import { DropdownMenuStyleProps } from "./DropdownMenu.d";

export const Container = styled.div<DropdownMenuStyleProps>`
  width: ${({width}) => width};
  height: ${({heigth}) => heigth};

  position: relative;
  background: white;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SuspenseMenu = styled.div`
  height: 230px;
  width: 220px;

  border-radius: 8px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07);

  background: white;

  position: fixed;

  display: flex;
  flex-direction: column;
  
  margin-top: 32rem;
  padding: 16px;

  span:not(:first-child) {
    margin-top: 16px;
  }
`;

export const Item =  styled.span`
  font-family: "Satoshi Regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #495057;

  width: 100%;
  height: 19px;

  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #495057;

  svg {
    margin-right: 15px;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(.2);
  }
`;