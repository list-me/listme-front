/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const ContentModalSelectDefaultTemplate = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    text-align: left;
  }
  gap: 12px;
  display: flex;
  flex-direction: column;
`;
export const ItemCardSelectDefaultTemplate = styled.button`
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #eeeeee;
  background: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;
export const CoverCardSelectDefaultTemplate = styled.p`
  width: 48px;
  height: 48px;
  color: #a899f1;
  background: ${({ theme }) => theme.colors.hover.background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  border-radius: 4px;
`;

export const CloseButton = styled.button`
  display: flex;
  position: absolute;
  right: 24px;
  border: none;
  background: none;
  cursor: pointer;
`;
