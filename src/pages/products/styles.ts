import styled from "styled-components";

export const Content = styled.div`
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

export const HeaderContent = styled.div`
  display: flex;
  border: none;
`;

export const Container = styled.div`
  height: 80vh;
  
  .htMenu.htContextMenu.handsontable {
    .current.highlight {            
        background: red;
    }
  }
  
  .menuContext{
    background: red !important;
    border-radius: 20px;
  }
  
   .handsontable {
     padding: 0;
   }

   .htCore {
     width: auto;
   }
  
  thead {
    th {
      .componentCustom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 53px;
        min-width: 197px;

        border-top: 1px solid #DEE2E6;
        border-right: 1px solid #DEE2E6;
        border-left: 1px solid #DEE2E6;
        background-color: ${({ theme }) => theme.colors.grayscale.ninth};

        font-family: ${({ theme }) => theme.fonts.family.default};
        font-size: ${({ theme }) => theme.fonts.sizes.small};
        color: #868E96;
        font-weight: 400;
        line-height: 150%;
        
        .infos {
          margin-left: 16px;
          img {
            margin-right: 8px;
          }
        }

        .options {
          margin-right: 16px;
          display: flex;

          img:first-child {
            margin-right: 8px;
          }

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
      
  }
  
  tbody {
    tr {
      td {
        border-right: 1px solid #DEE2E6 !important;
        border-left: 1px solid #DEE2E6 !important;
        border-top: none;
        border-bottom: .5px solid #DEE2E6 !important;

        font-family: ${({ theme }) => theme.fonts.family.default};
        font-size: ${({ theme }) => theme.fonts.sizes.small};
        color: #495057;
        font-weight: 400;
        line-height: 150%;
        
        align-self: center;
        padding-left: 16px;
      }
    }
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

