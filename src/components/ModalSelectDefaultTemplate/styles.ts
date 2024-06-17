/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const ContentModalSelectDefaultTemplate = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    text-align: left;
    margin: 0;
  }
  p {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    color: ${({ theme }) => theme.colors.tertiary};
    margin: 0;
  }
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

export const ContainerCardSelectDefaultTemplate = styled.div`
  display: flex;
  gap: 16px;
`;

export const ItemCardSelectDefaultTemplate = styled.button`
  border-radius: 8px;
  padding: 8px;
  width: 232px;
  height: 232px;
  border: 1px solid #eeeeee;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    img {
      width: 80px;
      height: 80px;
    }
    p {
      font-family: ${({ theme }) => theme.fonts.family.default};
      font-size: ${({ theme }) => theme.fonts.sizes.normal};
      font-weight: ${({ theme }) => theme.fonts.weights.bold};
      color: ${({ theme }) => theme.colors.grayscale.primary};
      margin: 0;
    }
  }
`;

export const CloseButton = styled.button`
  display: flex;
  position: absolute;
  right: 24px;
  border: none;
  background: none;
  cursor: pointer;
`;
