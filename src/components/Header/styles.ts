import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: right;
  
  height: 96px;
  
  background: ${({theme}) => theme.colors.background.primary};
`;

export const RightContent = styled.div`
  width: auto;
  max-height: 45px;
  
  display: flex;
  justify-content: end;
  align-items: center;
`;
