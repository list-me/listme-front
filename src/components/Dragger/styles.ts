import styled from "styled-components";

export const IconContent = styled.div`
  padding: 0;

  width: 16px;
  height: 16px;

  margin-left: 12px;
  margin-top: 18px;

  &:hover {
    filter: brightness(0.2);
    transition: 0.5s;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  margin-top: 6px;
  display: block;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  .ant-form-item-label {
    display: flex;
    height: 24px !important;
    width: 100%;
    margin-bottom: 2px !important;

    label {
      font-family: "Satoshi Regular", sans-serif !important;
      font-style: normal;
      font-weight: 400 !important;
      font-size: 13px !important;
    }
  }

  .ant-form-item {
    height: fit-content !important;
    margin: 0 !important;
    width: 300px !important;

    label {
      font-family: "Satoshi Regular", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 12px !important;
      line-height: 150%;
      color: #212529;
    }
  }

  .ant-form-item-control-input {
    width: fit-content !important;
  }

  .ant-tree-list-holder-inner {
    display: flex;
    align-items: flex-start;
    justify-content: left;
  }

  .ant-tree-treenode {
    display: flex;
    align-items: center;
  }

  .ant-input {
    margin-left: 0;

    width: 300px;
    height: 46px;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-size: 13px;
    line-height: 150%;
    color: #212529;

    margin: 0 !important;
  }

  .ant-tree-switcher {
    display: none;
  }
`;
