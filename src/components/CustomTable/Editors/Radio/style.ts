import styled from "styled-components";

export const Container = styled.div`
  min-width: 120px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Label = styled.label`
  font-family: inherit;
  color: inherit;

  height: 20px;

  margin-left: 2px;
  margin-top: 0;
`;

export const Option = styled.div<{ isChecked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 25px;

  font-family: ${({ theme }) => theme.fonts.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};

  color: ${({ isChecked }) => (!isChecked ? "black" : "#3818d9")};
`;

export const Input = styled.input`
  margin-top: 4px;
`;
