import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: ${({ theme }) => theme.colors.tertiary};

  .actionButtons {
    :hover {
      cursor: pointer;
    }
  }

  .ant-table-row {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;
