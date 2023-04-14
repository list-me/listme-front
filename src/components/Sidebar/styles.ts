import styled, { css } from "styled-components";

export interface IPositions {
  position?: string;
  isItem?: boolean;
  isActive: boolean;
}

const Active = css`
  background: ${({ theme }) => theme.colors.hover.background};
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.hover.text};
  }
`;

export const Container = styled.div`
  width: 222px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0;

  background: ${({ theme }) => theme.colors.background.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};

  //@media screen
  //and (min-device-width: 1200px)
  //and (max-device-width: 1600px)
  //and (-webkit-min-device-pixel-ratio: 1) {
  //  width: 12vw;
  //}
`;

export const LogoContainer = styled.span`
  height: 30px;
  width: 158px;
  margin-top: 32px;
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

  margin: 32px 0;
`;

export const Shape = styled.div<IPositions>`
  width: 158px;
  height: 53px;

  display: flex;
  align-items: center;
  // justify-content: ${(props) => props?.position ?? "flex-start"};

  margin-bottom: ${({ isItem }) => (isItem === true ? "5px" : "0")};
  padding: 16px;
  border-radius: ${({ theme }) => theme.border.radius};

  &:hover {
    background: ${({ theme }) => theme.colors.hover.background};
    cursor: pointer;
    transition: all 0.4s ease-in-out;

    span:last-child {
      color: ${({ theme }) => theme.colors.hover.text};
      transition: all 0.4s ease-in-out;
    }
  }

  span:first-child {
    margin-right: 7px;
  }

  ${({ isActive }) => isActive && Active}
`;

export const Icon = styled.span`
  height: 16px;

  display: flex;
  align-items: center;
`;

export const Label = styled.span<{ isItem?: boolean }>`
  text-wrap: normal;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-weight: ${({ isItem }) => (isItem === true ? 700 : 400)};
  font-size: ${({ theme }) => theme.fonts.sizes.xxxsmall};
  color: ${({ theme, isItem }) =>
    isItem === true ? theme.colors.fourth : theme.colors.tertiary};
  line-height: 150%;
`;

export const Capsule = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 100%;

  padding: 0 32px;
`;
