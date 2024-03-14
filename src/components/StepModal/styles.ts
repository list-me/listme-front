import styled from "styled-components";

export const ContainerFromTo = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
export const BoxFromTo = styled.div<{ large?: boolean }>`
  width: ${(props) => (props.large ? "1038px" : "600px")};
  min-height: ${(props) => (props.large ? "890px" : "350px")};
  max-height: 900px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 8px;
  padding: 40px;
  @media (max-height: 950px) {
    min-height: ${(props) => props.large && "initial"};
    height: ${(props) => props.large && "90vh"};
    overflow: ${(props) => props.large && "auto"};
    ::-webkit-scrollbar {
      width: 15px;
      height: 15px;
    }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.grayscale.ninth};
    }
    ::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      border-radius: 8px;
      border: 2px solid transparent;
    }
  }
`;

export const HeaderModal = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
`;
export const TitleModal = styled.h4`
  color: ${({ theme }) => theme.colors.fourth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
`;
export const CloseButton = styled.button`
  margin: 0;
  background: none;
  border: none;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;
export const StepsContainer = styled.div`
  display: flex;
  margin: 16px 0px;
  margin-bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 520px;
  margin: 0 auto;
  margin-bottom: 50px;
`;

export const StepItem = styled.div`
  .firstStep {
    ::before {
      display: none;
    }
  }
  .lastStep {
    ::after {
      display: none;
    }
  }
  position: relative;
`;
export const StepNumber = styled.p<{ active: boolean }>`
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary
      : props.theme.colors.grayscale.twelfth};
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.hover.background
      : props.theme.colors.grayscale.ninth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 0;
  ::after,
  ::before {
    content: "";
    position: absolute;
    width: 53px;
    height: 1px;
    background: ${({ theme }) => theme.colors.grayscale.eighth};
  }
  ::after {
    right: -53px;
  }
  ::before {
    left: -53px;
  }
`;
export const StepSubtitle = styled.p<{ active: boolean }>`
  position: absolute;
  transform: translateX(-30%);
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary
      : props.theme.colors.grayscale.twelfth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
  width: 130px;
  margin-top: 4px;
`;
