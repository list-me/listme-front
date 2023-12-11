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

export const CellContent = styled.div<{ isSearchResult: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  justify-content: center !important;

  padding: 0 8px 0 6px;

  background-color: ${(prop) => (prop.isSearchResult ? "#FCEDD9" : "none")};
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

  overflow: hidden;

  ${({ type }) => getCustomStyle(type?.toUpperCase())}

  label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    width: auto;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    font-size: 12.8px;
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

  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    max-height: 290px;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: unset;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9;
  }
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
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  line-height: 150%;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:focus {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

export const Footer = styled.span`
  width: 100%;
  height: 19px;

  display: flex;
  align-items: center;

  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  line-height: 19px;
  color: #495057;

  svg {
    margin-right: 17px;
  }

  &:hover {
    cursor: pointer;
  }
`;
