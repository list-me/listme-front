import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 416px;
  height: 60vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
  border: 1px solid #E9ECEF;
  border-radius: 8px;

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    height: 75vh;
    margin-top: 4rem;
    padding: 30px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 6rem;

  font-family: ${({ theme }) => theme.fonts.family.default };
  font-size: ${({ theme }) => theme.fonts.sizes.medium};;
  font-weight: 800;
  
  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    min-height: 30px;
    margin-bottom: 5rem;
  }
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled.span`
  position: absolute;
  top: 7%;
`;

export const InputContainer = styled.span`
  margin-top: 24px;

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: 10px;
  }
`;

export const ButtonContainer = styled.span`
  margin-top: 24px;

  div:last-child {
    margin-top: 18px;
  }
`;

export const BottomContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({theme}) => theme.colors.tertiary};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  
  margin-top: 24px;

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: 10px;
  }
`;

export const ButtonCustom = styled.button`
  cursor: pointer;

  outline: none;
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid #E9ECEF;
  
  padding: 16px 24px;
  margin: 24px 0;

  min-width: 100px;
  
  width: 100%;
  height: 100%;

  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: 800;
  text-align: center;
  letter-spacing: 1px;

  color: ${({theme}) => theme.colors.fourth};
  background: ${({theme}) => theme.colors.background.primary};

  &:hover {
    transition: opacity linear 0.4s;
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: space-around;

  svg {
    // min-width: ${({ theme }) => theme.spacing.xxxsmall};
    // min-height: ${({ theme }) => theme.spacing.xxxsmall};
    // width: ${({ theme }) => theme.spacing.xxsmall};
    // height: ${({ theme }) => theme.spacing.xxsmall};
    
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 450px) {
    width: 100%;
    height: 100%;

    font-size: 0.9rem;
    padding: 0.5rem;
    margin: 0;
  }
`;
