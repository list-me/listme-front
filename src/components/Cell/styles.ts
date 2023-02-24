import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 53px;
  min-width: 197px;
  
  padding: 15px;
  border-top: 1px solid #DEE2E6;
  border-right: 1px solid #DEE2E6;
  border-left: 1px solid #DEE2E6;
  background-color: ${({ theme }) => theme.colors.grayscale.ninth};

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
    margin-right: 8px;
  }
  
  &:hover {
    cursor: pointer;
  }
`;
