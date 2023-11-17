import styled from "styled-components";

export const Container = styled.div`
  min-width: 120px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  max-height: 150px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    background: transparent !important;
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background-color: unset !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc !important;
    border-radius: 8px !important;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9 !important;
  }
`;

export const Label = styled.label`
  font-family: inherit;
  color: inherit;
  position: relative;
  top: 3px;
  height: 20px;
  margin: 0;
  margin-left: 2px;
  margin-top: 0;

  &:hover {
    cursor: pointer;
  }
`;

export const Option = styled.div<{ isChecked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.25rem 0;

  height: 25px;

  font-family: ${({ theme }) => theme.fonts.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};

  color: ${({ isChecked }) => (!isChecked ? "black" : "#3818d9")};

  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  margin-top: 2px;

  &:hover {
    cursor: pointer;
  }
`;
