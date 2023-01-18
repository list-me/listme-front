import styled from "styled-components";

export const Container = styled.div`
  width: 87%;

  position: relative;
  left: 13%;
  display: flex;
  justify-content: space-between;
  
  margin-top: 7rem;
  //padding: 0 5rem;
  
  div {
    margin-right: 40px !important;
  }
`;

export const TitlePage = styled.h2`
  font-family: "Satoshi Regular";
  font-size: ${({ theme }) => theme.fonts.sizes.large};
  
  :hover {
    cursor: default;
  }
`;
