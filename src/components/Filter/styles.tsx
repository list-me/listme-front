/* eslint-disable no-nested-ternary */
import styled from "styled-components";
import { IFilter } from "../../context/FilterContext/FilterContextType";

export const ContainerFilter = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.32);
  display: flex;
  justify-content: flex-end;
`;
export const CloseButtonTransparent = styled.button`
  background: transparent;
  flex-grow: 1;
  border: none;
  cursor: initial;
`;

export const SidebarFilter = styled.div`
  /* width: 684px !important; */
  width: 45% !important;
  height: 100%;
  padding: 32px;
  background: #fff;
  padding-right: 26px;
  border-radius: 8px 0px 0px 8px;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  animation: slideIn 0.15s forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
export const HeaderFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 6px;
`;
export const TitleFilter = styled.h4`
  color: ${({ theme }) => theme.colors.fourth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
`;
export const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  height: 36px;
`;
export const FilterLogic = styled.div`
  width: 100%;
  padding: 16px;
  height: 64px;
  background: #f3f4f6;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  align-items: center;

  color: ${({ theme }) => theme.colors.fourth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
export const FilterLogicSelectContainer = styled.div`
  width: 115px;
`;
export const FilterCenterContent = styled.div`
  height: 100%;
  overflow: auto;
  padding-right: 4px;
  margin-bottom: 24px;
  margin-top: 24px;
  padding-bottom: 64px;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grayscale.ninth};
  }
  ::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 8px;
    border: 2px solid transparent;
  }
`;
export const Filter = styled.div<{ smallBefore?: boolean; small?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    !props.small ? "1fr 1fr 48px" : "1fr 1fr 1fr 48px"};
  padding-left: 24px;
  gap: 16px;
  margin-top: 16px;
  position: relative;
  width: 100%;
  ::before {
    content: "";
    height: ${(props) => (props.smallBefore ? "40px" : "69px")};
    top: ${(props) => (props.smallBefore ? "-16px" : "-45px")};

    position: absolute;
    width: 12px;
    border-bottom-left-radius: 4px;
    border: 1.5px solid #a899f1;
    border-top: none;
    border-right: none;
    left: 12px;
  }
`;
export const FilterItem = styled.div<{ small?: boolean; trash?: boolean }>`
  display: flex;
  flex-grow: 1;
  width: auto;
`;
export const NewFilter = styled.button<{ filters: IFilter[] }>`
  display: flex;
  align-items: center;
  margin-top: 18px;
  gap: 10px;
  padding: 0;
  border: none;
  background: none;
  position: relative;
  padding-left: 24px;

  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  svg {
    transition: all 0.2s;
  }
  :hover {
    svg {
      transform: rotate(90deg);
    }
  }

  ::before {
    content: "";
    height: 57px;
    top: -45px;
    position: absolute;
    width: 12px;
    border-bottom-left-radius: 4px;
    border: 1.5px solid #a899f1;
    border-top: none;
    border-right: none;
    left: 12px;
    display: ${(props) => (props.filters.length ? "initial" : "none")};
  }
`;

export const TrashButton = styled.button`
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`;
export const InputFilter = styled.input`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: none;
  border-radius: 6px;
  width: 100%;
  border: 1px solid #d1d6dc;
  padding: 8px;
`;
