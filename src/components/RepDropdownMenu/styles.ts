import styled from "styled-components";
import { IStyleProps } from "./RepDropdownMenu.d";

export const Container = styled.div<IStyleProps>`
  height: auto;
  width: 320px;

  border-radius: 8px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07);

  background: white;
  position: fixed;
  left: ${({left}) => `${left}px`};
  top: 19%;

  z-index: 999;

  display: flex;
  flex-direction: column;
  
  padding: 16px;

  span:not(:first-child) {
    margin-top: 16px;
  }

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    top: 25rem;
  }

  input {
    height: 21px;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #868E96;
  }

  .ant-input-group-addon {
    background: none;
    border: none;
  }
`;

export const Line = styled.div`
  display: flex;
  height: 21px;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  text-align: center;

  label {
    margin-left: 8px;
  }
`;