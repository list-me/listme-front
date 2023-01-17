import styled from "styled-components";

export const Container = styled.div`

  width: 25rem;
  max-height: 100vh;
  height: 100vh;

  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0;
  padding: 4rem;
  
  background: ${({ theme }) => theme.colors.background.primary};
  font-family: ${({ theme }) => theme.fonts.family.default };
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  
  //background: yellow;
`;

export const Content = styled.div`
  width: auto;
  height: auto;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10rem 0 0 0;
`;

export const Functions = styled.div`
  width: 10rem;
  height: auto;

  position: absolute;
  bottom: 5%;
  left: 25%;
  margin: 0;
  padding: 0;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Shape = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  
  margin-bottom: 9px;
  padding: 1.2rem;

  :hover {
    background: ${({ theme }) => theme.colors.hover.background};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.hover.text};
    border-radius: ${({ theme }) => theme.border.radius};
    transition: all 0.4s ease-in-out;
  }
  
  letter-spacing: .2px;
`;

export const Icon = styled.div`
  width: auto;
  height: 20px;
  
  padding: 0;
  margin: 0 2px 0 0;
`;

export const Label = styled.span`
  font-family: "Satoshi Regular";
  font-weight: 700;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
`;
