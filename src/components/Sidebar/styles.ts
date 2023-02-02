import styled from "styled-components";

export interface IPositions {
    position?: string;
}

export const Container = styled.div`
  min-width: 200px;
  width: 15vw;
  max-height: 100vh;
  height: 100vh;

  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0;
  
  background: ${({ theme }) => theme.colors.background.primary};
  font-family: ${({ theme }) => theme.fonts.family.default };
  font-size: ${({ theme }) => theme.fonts.sizes.small};

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    width: 12vw;
  }
`;

export const LogoContainer = styled.span`
  min-height: 30px;
  
  position: relative;
  top: 30px;
`;

export const Content = styled.div`
  min-width: 170px;
  width: auto;
  height: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10rem 0 0 0;
`;

export const Functions = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    margin:  0 0 2rem .5rem;
  }
`;

export const Shape = styled.div<IPositions>`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: ${(props) => props?.position ?? "flex-start"};
  flex-direction: row;
  flex-wrap: nowrap;
  
  margin-bottom: 5px;
  padding: 1.2rem;

  :hover {
    background: ${({ theme }) => theme.colors.hover.background};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.hover.text};
    border-radius: ${({ theme }) => theme.border.radius};
    transition: all 0.4s ease-in-out;
  }

  span:first-child {
    margin-right: 7px;
  }
  
  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    height: 35px;
    padding: 2rem;
  }
`;

export const Icon = styled.span`
  width: auto;
  height: auto;
  
  display: flex;
  align-items: center;
`;

export const Label = styled.span`
  max-width: 100%;
  text-wrap: normal;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fonts.sizes.normal};

  @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1600px)
    and (-webkit-min-device-pixel-ratio: 1) {
      font-size: ${({ theme }) => theme.fonts.sizes.xxxsmall};
  }
`;

export const Capsule = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  height: 100%;
  width: 100%;
  
  padding: 3rem 4rem;

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    padding: 1rem 2rem;
  }
`;
