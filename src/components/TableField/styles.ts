import styled, { css, FlattenSimpleInterpolation } from "styled-components";

type TypeKeys = "RADIO" | "LIST" | "CHECKED";

type ITypes = {
  [key in TypeKeys]: FlattenSimpleInterpolation;
};

const RADIO_TYPE = css`
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 24px;
  /* width: 100px !important; */
  width: 100% !important;
`;

const CHECKED_TYPE = css`
  background: #f8f9fa;
  border-radius: 24px;
  /* width: fit-content;  */
  min-width: 100px;
  width: 100% !important;
`;

const LIST_TYPE = css`
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  width: 100% !important;
  /* max-width: 200px; */
  min-width: 100px;
`;

const CUSTOM_STYLE: ITypes = {
  RADIO: RADIO_TYPE,
  LIST: LIST_TYPE,
  CHECKED: CHECKED_TYPE,
};

function getCustomStyle(type: string): FlattenSimpleInterpolation {
  return CUSTOM_STYLE[type as TypeKeys];
}

export const CellContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  justify-content: space-between !important;

  .invalid-cell:after {
    content: "Campo obrigatório!";
    color: red;
    font-size: 12px;
  }
`;

export const Container = styled.div<{ type: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  min-width: 60px;
  width: fit-content;
  max-height: 32px;
  flex-wrap: nowrap;

  ${({ type }) => getCustomStyle(type.toUpperCase())}

  label {
    width: auto;
    overflow: hidden;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #212529;

    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: nowrap;
    margin: 4px 6px 4px 8px;

    &:hover {
      cursor: pointer;
    }
  }

  span {
    display: flex;
    width: fit-content;
    height: fit-content;
    align-items: center;
    margin: 10px 9px 10px 0;
    padding: 0;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

export const SuspenseMenu = styled.div<{
  width: number;
  top: number;
  showMenu: boolean;
}>`
  height: auto !important;
  max-height: 500px !important;

  min-width: 150px;
  width: ${({ width }) => `${width}px`} !important;

  border-radius: 8px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07);

  background: white;

  position: absolute;
  top: ${({ top }) => `${top + 55}px`} !important;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 8px;

  overflow-x: hidden;
  overflow-y: auto;
`;

export const Select = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 8px !important;
`;

export const Item = styled.div`
  border-radius: 8px;
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: left;

  height: 35px;

  font-family: "Satoshi regular", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;

  &:hover {
    cursor: pointer;
    background: #3818d9;
    color: white;
  }

  &:focus {
    cursor: pointer;
    background: #3818d9;
    color: white;
  }
`;

export const Footer = styled.span`
  width: 100%;
  height: 19px;

  display: flex;
  align-items: center;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #495057;

  svg {
    margin-right: 17px;
  }

  &:hover {
    cursor: pointer;
  }
`;
