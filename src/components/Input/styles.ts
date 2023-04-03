import styled from "styled-components";
import {Input} from 'antd';

export const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: flex-start;

  padding: 0;
`;

export const Label = styled.span`
`;

export const InputCustom = styled(Input)`
  background: #F3F4F6;
  border: none;

  width: 280px;
  max-height: 35px;

  margin: none !important;
  border-radius: 4px;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: #495057;
  font-weight: 400;
  line-height: 150%;

  /* &::before {
    transition: opacity 3s ease-in;
  }

  &::after {
    transition: opacity 1s ease-out;
  } */
`;
