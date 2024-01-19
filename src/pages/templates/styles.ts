import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-top: 32px;

  div {
    margin-right: 40px !important;
  }
`;

export const TitlePage = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.large};

  :hover {
    cursor: default;
  }

  span {
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;

export const Capsule = styled.div`
  background: red;
`;

export const Content = styled.div`
  display: block;
  justify-content: center;
  align-items: center;

  margin: 32px;

  .ant-table-thead .ant-table-cell {
    background-color: ${({ theme }) => theme.colors.grayscale.eleventh};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 400;
    line-height: 150%;

    :before {
      display: none !important;
    }

    height: 56px;
    padding: 16px;
  }

  .ant-table {
    border: 1px solid #e9ecef;
    border-radius: 8px;
  }

  .ant-table-cell {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 400;

    height: 56px;

    &:hover {
      cursor: pointer;
    }
  }

  .ant-checkbox {
    width: 16px !important;
    height: 16px !important;
    border-radius: 4px !important;
  }

  .ant-checkbox-inner {
    border: 2px solid #e9ecef !important;
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    .ant-table-thead .ant-table-cell {
      font-size: ${({ theme }) => theme.fonts.sizes.normal};
      font-weight: 400;
      line-height: 150%;

      :before {
        display: none !important;
      }

      height: 56px;
      padding: 16px;
    }
  }
`;
