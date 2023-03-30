import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  /* align-items: center;
  justify-content: space-between; */
  width: 100%;

  padding: 16px;
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

    background: #F7F5FF !important;
    border-radius: 6px;
  }
`;
