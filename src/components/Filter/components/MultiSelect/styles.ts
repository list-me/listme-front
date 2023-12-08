import styled from "styled-components";

export const ContainerMultiSelect = styled.button<{ openedMenu: boolean }>`
  height: 48px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  border-color: ${(props) => (props.openedMenu ? "#3818D9" : "#e9ecef")};
  background: none;
  display: flex;
  align-items: center;

  justify-content: space-between;
  position: relative;
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background-color: unset;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9;
  }
`;
export const MultiSelectValue = styled.p<{ active: boolean }>`
  display: flex;
  padding: 0 16px;
  height: 48px;
  justify-content: space-between;
  margin: 0;
  border-radius: 8px;
  width: 100%;
  > div {
    color: ${(props) => (props.active ? "#000" : "#868e96")};
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    display: flex;
    align-items: center;
    gap: 8px;
    path {
      stroke: #000;
    }
  }
`;
export const MenuOptions = styled.p`
  width: 100%;
  background: blue;
  position: absolute;
  left: 0%;
  height: auto;
  top: 52px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 10px 40px 0px rgba(56, 24, 217, 0.07);
  z-index: 9;
  display: flex;
  flex-direction: column;
  gap: 4px;
  .optionsContainer {
    padding: 8px;
    width: 100%;
    max-height: 300px;
    background: blue;
    left: 0%;
    top: 52px;
    border-radius: 8px;
    background: #fff;
    z-index: 9;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
  }
  .searchContainer {
    padding: 8px;
    display: flex;
    position: relative;
    padding-bottom: 0;
  }
  .searchIcon {
    position: absolute;
    top: 22px;
    right: 20px;
  }
`;
export const Option = styled.p<{ active: boolean }>`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  background: ${(props) => (props.active ? "#e2e0ff" : "initial")};
  color: ${(props) => (props.active ? "#3818D9" : "#495057")};
  border-radius: 8px;
  text-align: start;
  path {
    stroke: ${(props) => (props.active ? "#3818D9" : "#495057")};
  }
  :hover {
    background: #e2e0ff;
  }
`;
export const LoadingData = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: #495057;
  border-radius: 8px;
  text-align: start;
`;
export const SearchOption = styled.input`
  border-radius: 8px;
  background: #f1f3f5;
  height: 45px;
  border: none;
  padding: 12px;
  width: 100%;
  color: #000;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
export const Alert = styled.p`
  color: #868e96;
  text-align: start;
  font-size: 14px;
  margin-left: 16px;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
