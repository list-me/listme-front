import styled from "styled-components";
import {IButtonPropsStyles} from "./Button.d";

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

export const ButtonCustom = styled.button<IButtonPropsStyles>`
  cursor: pointer;

  outline: none;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};

  padding: 12px 16px;

  min-width: 100px;
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '100%'};

  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-style: normal;
  font-weight: 800;
  line-height: 150%;
  text-align: center;

  color: ${(props) => props.isSecondary ? props.theme.colors.primary : props.theme.colors.secondary};
  background-color: ${(props) => props.isSecondary ? props.theme.colors.background.default : props.theme.colors.primary };

  &:hover {
    transition: opacity linear 0.4s;
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    min-width: ${({ theme }) => theme.spacing.xxxsmall};
    min-height: ${({ theme }) => theme.spacing.xxxsmall};

    animation: rotate 2s linear infinite;
    
    margin-right: 8px;
  }

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    width: 100%;
    height: 45px;
    font-size: ${({ theme }) => theme.fonts.sizes.xxsmall};
  }
`;
