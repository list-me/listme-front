import styled from "styled-components";

export const AccordionContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
  background: #fffaeb;
  border-radius: 6px;
`;

export const AccordionHeader = styled.div`
  padding: 15px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  h4 {
    color: ${({ theme }) => theme.colors.fourth};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    margin: 0;
  }
`;

export const AccordionContent = styled.div`
  max-height: 0;
  overflow: hidden;
  padding: 0;
  transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out 0.2s;

  &.open {
    max-height: 500px;
    padding: 12px;
    padding-top: 0;
    transition: max-height 0.3s ease-in-out;
  }
`;
export const AccordionHeaderContent = styled.div`
  display: flex;
  padding: 8px 12px;
  padding-top: 0;
`;
export const AccordionColumnContentText = styled.p`
  color: #495057;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
  width: 38%;
  :last-child {
    width: 24%;
  }
`;
export const AccordionItemContent = styled.p`
  display: flex;
  margin-top: 4px;
  background: #fff;
  padding: 8px 12px;
  border-radius: 4px;
`;
