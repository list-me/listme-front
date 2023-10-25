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

export const ContainerNewColumn = styled.div`
  position: absolute;
  left: 210px;
  width: 220px;
  height: 300px;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
`;

export const GhostArrow = styled.div`
  transform: translateY(10px);
  left: -20px;
  width: 90px;
  height: 100%;
  position: absolute;
`;
export const ContainerOption = styled.div`
  :hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-radius: 8px;
  }
`;
