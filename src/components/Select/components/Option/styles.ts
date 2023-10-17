import styled from "styled-components";

export const ValueWidthDropDown = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

export const IconDropDown = styled.div`
  display: flex;
  align-items: center;
  svg {
    transform: rotate(-90deg);
  }
`;
export const GhostArrow = styled.div`
  top: 289px;
  left: -20px;
  width: 90px;
  height: 45px;
  position: absolute;
`;
export const ContainerNewColumn = styled.div`
  position: absolute;
  top: -300px;
  left: 210px;
  width: 270px;
  height: 616px;
  background: blue;
  display: flex;
  align-items: center;
`;
