import styled from "styled-components";

export const ContainerLinkFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 69vh;
`;

export const HeaderLinkFields = styled.div`
  display: flex;

  padding-bottom: 13px;
  border-bottom: 1px solid #eee;
`;

export const ColumnTitleLinkFields = styled.p`
  width: 50%;
  display: flex;
  margin: 0%;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  &::-webkit-scrollbar-thumb {
    background-color: blue !important;
    border-radius: 6px;
    border: 3px solid red !important;
  }
`;
export const AlertLinkFields = styled.div`
  stroke: ${({ theme }) => theme.colors.grayscale.fourth};
  path {
    stroke: ${({ theme }) => theme.colors.grayscale.fourth};
    :nth-child(2) {
      stroke: none;
      fill: ${({ theme }) => theme.colors.grayscale.fourth};
    }
  }
  display: flex;
  position: relative;

  > div {
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};

    color: ${({ theme }) => theme.colors.secondary};

    display: none;
    position: absolute;
    width: 380px;
    height: 112px;
    background: rgba(0, 0, 0, 0.75);
    bottom: -122px;
    border-radius: 6px;
    z-index: 10;
    padding: 8px 16px;
    align-items: center;
    justify-content: center;
    left: -350px;
    ::before {
      content: "";
      position: absolute;
      top: -20px;
      right: 12px;
      border: 10px solid transparent;
      border-bottom-color: rgba(0, 0, 0, 0.75);
    }
  }
  :hover {
    > div {
      display: flex;
    }
  }
`;
export const ContentLinkFields = styled.div`
  max-height: 500px;
  padding-right: 10px;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px !important;
    height: 8px !important;
    border-radius: 4px !important;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grayscale.ninth} !important;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #cccccc !important;
    border-radius: 4px !important;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.primary} !important;
  }
`;
export const ContentRowLinkFields = styled.div<{ checkColumn?: boolean }>`
  display: grid;
  width: 100%;
  grid-template-columns: ${(props) =>
    props.checkColumn ? "33% 33% 33%" : "50% 50%"};
`;

export const ContainerSelectText = styled.div`
  width: 100%;
`;
export const ContainerCheckBox = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

export const WarnAlert = styled.p`
  padding: 16px 20px;
  background: #fff9db;
  border: 1px solid #fcc419;
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  border-radius: 8px;
  span {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;
