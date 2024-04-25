import styled from "styled-components";

export const ContainerPublicListList = styled.div`
  width: 1170px;
  height: 773px;
  padding: 0px, 40px, 0px, 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
`;
export const ContainerTablePublicListList = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e8ebed;
  .ant-table-thead .ant-table-cell {
    background-color: ${({ theme }) => theme.colors.grayscale.eleventh};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    line-height: 150%;
    :before {
      display: none !important;
    }
    height: 56px;
    padding: 16px;
  }
  .ant-table-selection-column {
    display: none;
  }
  .defaultText,
  .blueText,
  .grayText {
    color: ${({ theme }) => theme.colors.grayscale.primary};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
  }
  .blueText {
    color: ${({ theme }) => theme.colors.primary};
  }
  .grayText {
    color: ${({ theme }) => theme.colors.tertiary};
  }
  .ant-pagination {
    display: none;
  }
`;

export const ContentPublicListList = styled.div`
  width: 898px;
  display: flex;
  padding: 40px;
  flex-direction: column;
`;
