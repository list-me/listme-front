import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  height: 100%;
  
  label {
    display: flex;
    align-items: center;
    
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    color: #868E96;
    font-weight: 400;
    line-height: 150%;

    svg {
      margin-right: 8px;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  
  svg:first-child {
    margin-right: 12px;
  }
  
  &:hover {
    cursor: pointer;
  }
`;
