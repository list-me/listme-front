import styled from "styled-components";

export const ContainerHeaderDropDown = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
`;
export const BoxDropDown = styled.div<{
  top: number;
  left: number;
  invert: boolean;
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) =>
    props.invert ? `calc(${props.left}px - 210px)` : `${props.left}px`};
  background: blue;
`;
