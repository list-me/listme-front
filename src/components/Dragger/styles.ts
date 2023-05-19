import styled from "styled-components";

export const Container = styled.div`
  margin-top: 6px;

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
    height: 56px;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    color: #212529;
  }

  .ant-tree-switcher {
    display: none;
  }
`;
