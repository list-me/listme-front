import styled from "styled-components";

export const ContainerFilter = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.32);
  display: flex;
  justify-content: flex-end;
`;
export const SidebarFilter = styled.div`
  width: 554px;
  height: 100%;
  padding: 32px;
  background: #fff;
  border-radius: 8px 0px 0px 8px;

  transform: translateX(100%);
  animation: slideIn 0.15s forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;
export const HeaderFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TitleFilter = styled.h4`
  color: ${({ theme }) => theme.colors.fourth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
`;
export const CloseButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  height: 36px;
`;
export const FilterLogic = styled.div`
  width: 100%;
  height: 64px;
  background: #f3f4f6;
  margin-top: 24px;
  border-radius: 4px;
  z-index: 99999999999999999999999999999999999999999999999999999999;
`;
export const Condition = styled.div<{ smallBefore?: boolean }>`
  display: flex;
  padding-left: 24px;
  gap: 16px;
  margin-top: 16px;
  position: relative;
  z-index: 11 !important;
  ::before {
    content: "";
    height: ${(props) => (props.smallBefore ? "40px" : "69px")};
    top: ${(props) => (props.smallBefore ? "-16px" : "-45px")};

    position: absolute;
    width: 12px;
    border-bottom-left-radius: 4px;
    border: 1.5px solid #a899f1;
    border-top: none;
    border-right: none;
    left: 12px;
  }
`;
export const NewCondition = styled.button`
  display: flex;
  align-items: center;
  margin-top: 18px;
  gap: 10px;
  padding: 0;
  border: none;
  background: none;
  position: relative;
  padding-left: 24px;

  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  svg {
    transition: all 0.2s;
  }
  :hover {
    svg {
      transform: rotate(90deg);
    }
  }

  ::before {
    content: "";
    height: 57px;
    top: -45px;
    position: absolute;
    width: 12px;
    border-bottom-left-radius: 4px;
    border: 1.5px solid #a899f1;
    border-top: none;
    border-right: none;
    left: 12px;
  }
`;
