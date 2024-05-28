import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: ${({ theme }) => theme.colors.tertiary};

  .actionButtons {
    border: none;
    background: none;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    :hover {
      cursor: pointer;
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
      :first-child {
        transform: rotate(-360deg);
      }
      :last-child {
        transform: rotate(180deg);
      }
    }
  }

  .ant-table-row {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;
