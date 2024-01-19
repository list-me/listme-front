import styled from "styled-components";

export const ContainerPaginationError = styled.div`
  display: flex;
  margin-top: 22px;
  justify-content: center;
`;
export const ButtonPaginationError = styled.button<{
  right?: boolean;
  active?: boolean;
}>`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 8px;
  justify-content: center;
  padding: 0;
  border: none;
  align-items: center;
  border-radius: 4px;
  color: ${(props) => (props.active ? "#ffffff" : "#adb5bd")};
  background: ${(props) => (props.active ? "#3818d9" : "none")};
  :hover {
    color: #ffffff;
    background: #3818d9;
  }
  svg {
    transform: ${(props) => (props.right ? "rotate(180deg)" : "initial")};
  }
  :disabled {
    opacity: 0.5;
    :hover {
      color: #adb5bd;
      background: none;
    }
  }
`;
