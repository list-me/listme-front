import styled from "styled-components";

export const ContainerCardSidebarError = styled.div<{ opened: boolean }>`
  min-height: 80px;
  max-height: 0px;
  border-radius: 4px;
  background: rgba(255, 107, 107, 0.1);
  display: flex;
  padding: 16px;
  flex-direction: column;

  max-height: ${(props) => (props.opened ? "528px" : "0px")};
  min-height: ${(props) => (props.opened ? "528px" : "none")};
  transition: max-height 0.5s linear, min-height 0.5s linear;
`;
export const HeaderCardSidebarError = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const HeaderContentLeftCardSidebarError = styled.div`
  display: flex;
  gap: 12px;
`;
export const HeaderContentRightCardSidebarError = styled.div`
  display: flex;
`;
export const ContainerTextMore = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TextHeaderSidebarError = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  span {
    margin: 0;
    color: #000;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const MoreButton = styled.button`
  color: #4a5056;
  font-size: 14px;
  font-weight: 400;
  border: none;
  padding: 0;
  background: none;
  display: inline-flex;
  :hover {
    text-decoration: underline;
  }
`;
export const HourDateText = styled.p`
  color: #4a5056;
  font-size: 14px;
  font-weight: 400;
`;
export const ChevronButton = styled.button`
  svg {
    stroke: #212529;
  }
  @keyframes swing {
    25% {
      transform: rotate(25deg);
    }
    75% {
      transform: rotate(-25deg);
    }
  }
  :hover {
    svg {
      animation: swing 0.75s ease-in-out infinite;
    }
  }
  padding: 0;
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 8px;
  border: none;
  background: none;
`;
export const ContentCardSidebarError = styled.div<{ opened: boolean }>`
  margin-top: ${(props) => (props.opened ? "20px" : "0px")};
  border-top: ${(props) =>
    props.opened ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
  overflow: hidden;
  transition: margin-top 1s, border-top 0s 1s;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    cursor: default;
  }

  ::-webkit-scrollbar-track {
    background-color: unset;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9;
  }
`;
export const ItemErrorDesc = styled.li`
  padding-left: 16px;
  margin: 0;
  margin-top: 16px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  span {
    font-weight: 700;
    position: relative;
    ::before {
      content: "";
      position: absolute;
      left: -11px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #000;
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }
`;
export const ButtonProductView = styled.button`
  color: #3818d9;
  margin-top: 20px;
  display: flex;
  align-self: flex-start;
  font-size: 16px;
  font-weight: 700;
  background: none;
  border: none;
  :hover {
    text-decoration: underline;
  }
`;
