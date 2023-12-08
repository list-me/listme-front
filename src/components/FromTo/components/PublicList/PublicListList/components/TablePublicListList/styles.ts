import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
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
  .containerLinkIcon {
    display: flex;
    justify-content: center;
    margin-right: 2rem;
  }
  .boxLinkIcon {
    padding: 8px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.focus.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    :hover {
      background: ${({ theme }) => theme.colors.primary};
      path {
        stroke: ${({ theme }) => theme.colors.focus.primary};
      }
    }
  }
`;
