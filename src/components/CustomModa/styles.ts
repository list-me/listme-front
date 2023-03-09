import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: fit-content;

  background: #FFFFFF;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  
`;

export const Title = styled.h1`
  font-family: 'Satoshi Bold', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #000000;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  margin-bottom: 8px;
`;

export const Description = styled.h2`
  font-family: 'Satoshi Regular', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #868E96;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const BodyContent = styled.div`
  /* display: flex;
  flex-direction: column; */
  height: 100%;
`;

export const InputContainer = styled.div`
  width: 100%;

  .ant-form-item-label{
    display: flex;
    height: 24px !important;
    width: 100%;
    margin-bottom: 8px !important;
  }
  
  .ant-form-item-required {
    font-family: 'Satoshi Bold', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px !important;
    line-height: 150%;
    color: #212529;
  
    :before {
      display: none !important;
    }
  }
  
  .ant-form-item-row{
    margin-bottom: 24px !important;
  }
  
  .ant-input {
    /* font-family: 'Satoshi Regular', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #ADB5BD; */

    font-family: 'Satoshi Regular', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px !important;
    line-height: 150%;
    color: #212529;

    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px !important;

    width: 100%;
    height: 56px !important;

    border: 1px solid #E9ECEF;
    border-radius: 8px;
  }

  .ant-select {
    border: none !important;
  }

  .ant-select-selector {
    font-family: 'Satoshi Regular', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px !important;
    line-height: 150%;
    color: #212529;

    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px !important;

    width: 100%;
    height: 56px !important;

    border: 1px solid #E9ECEF;
    border-radius: 8px; 
  }

  .ant-row .ant-form-item-row {
    background-color: red;
  }

  .ant-select-open {
    font-family: 'Satoshi Regular', sans-serif !important;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #212529 Impo !important;
  }
`;

export const Item = styled.span`
  .ant-switch{
    width: 24px !important;
    height: 16px !important;
  }

  font-family: 'Satoshi Bold', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #212529;

  display: flex;
  justify-content: space-between;

  margin-bottom: 16px;

  .ant-switch-inner {
    &:hover {
      background: #3818D9;
    }
  }

  .ant-switch-handle::before {
    &:hover {
      background: #3818D9;
    }
  }

  .ant-switch-checked {
    background: #3818D9;
    &:hover {
      background: #3818D9;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100% ;
  height: 92px;
`;

export const PrimaryButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 10px;

  /* primary / second */
  width: 183px;
  height: 52px;

  /* primary / second */

  background: #F7F5FF;
  border-radius: 6px;

  font-family: 'Satoshi Bold', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  border: 0;
  color: #A899F1;
`;

export const Principal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 10px;

  width: 183px;
  height: 52px;

  background: #3818D9;
  border-radius: 6px;

  font-family: 'Satoshi Bold', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  text-align: center;

  color: #FFFFFF;

  margin-left: 24px;
  &:hover {
    cursor: pointer;
  }
`