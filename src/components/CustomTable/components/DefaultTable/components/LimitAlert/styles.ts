/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const ContainerLimitAlert = styled.div<{
  coordX: number;
  coordY: number;
}>`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  p {
    pointer-events: none;
    background: ${({ theme }) => theme.colors.secondary};
    padding: 8px 16px;
    position: absolute;
    box-shadow: 0px 2px 16px #00000029;
    font-size: 16px;
    top: calc(${(props) => props.coordY}px + 30px);
    left: ${(props) => props.coordX}px;
    border-radius: 6px;
  }
`;
