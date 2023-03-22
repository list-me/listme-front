import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  /* border-top: 1px solid #DEE2E6; */
  /* border-right: 1px solid #DEE2E6;
  border-left: 1px solid #DEE2E6; */
  background-color: #F1F3F5;
  position: relative;

  label {
    display: flex;
    align-items: center;
    
    font-family: "Satoshi Regular", sans-serif;
    font-size: 14px;
    color: #868E96;
    font-weight: 400;
    line-height: 150%;

    svg {
      margin-right: 8px;
    }
  }
  /* min-width: 193px; */
  /* width: 100%; */
`;

export const Options = styled.div`
  display: flex;
    
  svg:first-child {
    /* margin-right: 8px; */
  }
  
  &:hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  /* width: 100%; */
  .ant-btn-default {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    gap: 10px;

    /* width: 183px; */
    height: 52px;

    background: #F7F5FF !important;
    border-radius: 6px;
  }
`;
