import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  /* align-items: center;
  justify-content: space-between; */
  width: 100%;

  padding: 16px;
  background-color: #f1f3f5;
  position: relative;

  label {
    &:hover {
      cursor: inherit;
    }

    display: flex;
    align-items: center;

    font-family: "Satoshi Regular", sans-serif;
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    color: ${({ theme }) => theme.colors.tertiary};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    line-height: 150%;

    svg {
      margin-right: 8px;
    }
  }
`;

export const Options = styled.div`
  display: flex;

  svg:first-child {
    margin-left: 8px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;

  .ant-btn-default {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    gap: 10px;

    /* width: 183px; */
    height: 52px;

    background: #f7f5ff !important;
    border-radius: 6px;
  }
`;
