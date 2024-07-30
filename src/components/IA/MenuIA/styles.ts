/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const WrapperMenuIA = styled.div`
  position: relative;
`;

export const MainButtonIA = styled.button`
  height: 36px;
  border-radius: 4px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  border: none;
  background: ${({ theme }) => theme.colors.background.tertiary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.fourth};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  gap: 8px;
  margin-right: 16px;
  :hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    path {
      fill: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
export const SecondaryMenuIA = styled.ul`
  position: fixed;
  top: 133px;
  left: 18px;
  z-index: 12;
  height: 96px;
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);

  li {
    button {
      border: none;
      background: none;
      font-family: ${({ theme }) => theme.fonts.family.default};
      font-size: ${({ theme }) => theme.fonts.sizes.normal};
      color: #495057;
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      display: flex;
      align-items: center;
      height: 36px;
      align-items: center;
      gap: 8px;
      padding: 8px;
      cursor: pointer;
    }
  }
`;
export const TertiaryMenuIA = styled.ul`
  position: fixed;
  top: 141px;
  left: 440px;
  z-index: 12;
  height: 272px;
  width: 346px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.1);

  li {
    position: relative;
    button {
      border: none;
      background: none;
      font-family: ${({ theme }) => theme.fonts.family.default};
      font-size: ${({ theme }) => theme.fonts.sizes.normal};
      color: #495057;
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      display: flex;
      align-items: center;
      height: 36px;
      align-items: center;
      gap: 8px;
      padding: 8px;
      cursor: pointer;
    }
  }
  .liHeader {
    position: relative;
    left: -8px;
  }
  .liHeader ::before {
    content: "";
    width: 213px;
    top: 20px;
    height: 1px;
    position: absolute;
    background: ${({ theme }) => theme.colors.grayscale.seventh};
    right: -8px;
  }
`;
