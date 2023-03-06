import styled from "styled-components";

export const Container = styled.div`
  .ant-checkbox-group {
    display: flex;
    justify-content: left;
    flex-direction: column;

    label {
      margin: 0 0 16px 0;

      font-family: "Satoshi Regular", sans-serif;
      font-style: normal;
      font-size: 14px;
      line-height: 150%;

      input:checked {
        background-color: red !important;
      }
    }
  }
`;