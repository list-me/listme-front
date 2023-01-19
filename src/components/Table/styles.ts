import styled from "styled-components";

export const Container = styled.div`
  margin-top: 2rem;
  padding: 2rem;

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
