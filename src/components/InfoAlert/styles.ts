import styled from "styled-components";

export const ContainerInfoAlert = styled.div<{ isActive: boolean }>`
  position: relative;
  margin-left: 8px;
  svg {
    cursor: pointer;
    path {
      stroke: ${(props) =>
        props.isActive
          ? props.theme.colors.primary
          : props.theme.colors.tertiary};
    }
  }
`;
export const ContentInfoAlert = styled.div`
  position: absolute;
  top: 28px;
  right: -5.5px;
  width: 350px;
  padding: 8px 16px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.8);
  p {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }
  span {
    color: #d1d3d6;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
  }
  ::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #000;
    position: absolute;
    top: -8px;
    right: 8px;
  }
`;
