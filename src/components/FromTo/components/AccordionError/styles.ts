import styled from "styled-components";

const bgColors = {
  warn: "#fffaeb",
  error: "#FFE6E6",
  success: "#F1F3F5",
};

export const AccordionContainer = styled.div<{
  backgroundType: "warn" | "error" | "success";
}>`
  width: 100%;
  margin-bottom: 16px;
  background: ${(props) => bgColors[props.backgroundType]};
  border-radius: 6px;
  padding: 12px;
`;

export const AccordionHeader = styled.div<{ opened?: boolean }>`
  display: flex;
  margin-bottom: ${(props) => (props.opened ? "15px" : "0px")};
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
  transition: max-height 0.2s ease-in-out, padding 0.2s ease-in-out 0.1s;

  &.open {
    max-height: 290px;
    transition: max-height 0.2s ease-in-out;
    overflow: auto;
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
  width: 37%;
  :last-child {
    width: 26%;
  }
`;
export const AccordionSuccessTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin: 0;
`;
export const AccordionItemContent = styled.p`
  display: flex;
  margin-top: 4px;
  background: #fff;
  padding: 8px 12px;
  border-radius: 4px;
`;
export const ItemIntegrationSuccess = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  background: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
