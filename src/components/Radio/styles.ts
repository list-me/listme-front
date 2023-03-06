import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  /* font-weight: 700; */
  font-size: 14px;
  line-height: 150%;

  display: flex;
  flex-direction: column;
  /* identical to box height, or 21px */


  /* primary / main */


  .ant-radio-group {
    display: flex;
    flex-direction: column;
  }

  .ant-radio-input:focus + .ant-radio-inner {
    border-color: #3818D9;
    box-shadow: 0 0 0 2 #3818D9;
  }

  .ant-radio-input:checked + .ant-radio-inner {
    background-color: #3818D9;
    border-color: #3818D9;
  }
`;