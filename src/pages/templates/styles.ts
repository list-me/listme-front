import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  
  margin-top: 2rem;
  
  div {
    margin-right: 40px !important;
  }
`;

export const TitlePage = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.large};

  :hover {
    cursor: default;
  }
`;

export const Content = styled.div`
  width: 85vw;

  position: relative;
  left: 14.6%;
  
  display: block;
  justify-content: center;
  align-items: center;
  
  padding: 0 2rem;
  
  @media screen
      and (min-device-width: 1200px)
      and (max-device-width: 1600px)
      and (-webkit-min-device-pixel-ratio: 1) {
    width: 82%;
    left: 18.5%;
  }
`;

export const Capsule = styled.div`
`;
