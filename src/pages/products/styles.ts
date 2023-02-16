import styled from "styled-components";

export const Content = styled.div`
  background: white;
  
  height: 100vh;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  height: 64px;
  
  &:hover {
    cursor: pointer;
  }
`;

export const IconTemplate = styled.span`
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  padding: 16px;
  
  background: black;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: 700;
  line-height: 150%;
  
  margin: 0;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  height: 64px;
  
  button {
    font-family: ${({ theme }) => theme.fonts.family.bold};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    text-align: center;
    
    margin: 0;
  }
  
  .secondButton {
    margin-left: 9px;
    
    svg {
      margin: 0 0 0 10px;
    }
  }
`;

export const Header = styled.header`
  height: 128px;
  background: ${({theme}) => theme.colors.grayscale.tenth};
  
  display: flex;
  justify-content: space-between;

  padding: 32px 16px;
`;

export const MoreOptions = styled.div`
  width: 56px;
  height: 52px;

  display: flex;
  align-items: center;
  padding: 0;
  justify-content: center;

  border-radius: 8px;
  background: ${({theme}) => theme.colors.grayscale.eighth};
  
  margin-right: 9px;
`;


export const Container = styled.div`
  background: white;
  
  .ant-table-thead .ant-table-cell {
    background-color: ${({ theme }) => theme.colors.grayscale.ninth};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    color: ${({ theme }) => theme.colors.grayscale.fourth};
    font-weight: 400;
    line-height: 150%;

    min-width: 197px;
    max-height: 51px !important;
    padding: 16px !important;

    border: 1px solid #DEE2E6;
  }
  
  .ant-table-cell {
    border: 1px solid #DEE2E6;

    height: 51px !important;
    border-radius: 0 !important;

    padding: 16px;
  }

  .editable-cell {
    position: relative;
  }

  .editable-cell-value-wrap {
    padding: 5px 12px;
    cursor: pointer;
  }

  .editable-row:hover .editable-cell-value-wrap {
    //padding: 4px 11px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  
  padding: 16px;
  background: white;
  border: 1px solid #E9ECEF;
`;

export const Item = styled.span`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
  
  svg:first-child {
    margin-right: 8px;
  }

  svg:last-child {
    margin-left: 8px;
  }
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Contents = styled.div`
  display: flex;
  
  span:not(:last-child) {
    margin-right: 24px;
  }
`;

