import styled from "styled-components";

export const ContainerModalIA = styled.div<{ errorMode: boolean }>`
  width: 298px;
  background: blue;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 12px 0px #0000001f;
  background: ${(props) =>
    props.errorMode ? "#FDF5F5" : props.theme.colors.secondary};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2;
  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  }
`;
export const TitleButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
  border: none;
  background: none;
  text-align: start;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ContainerContent = styled.div<{ red?: boolean }>`
  width: 100%;
  height: 54px;
  border: 1px solid
    ${(prop) => (prop.red ? "#FA5252" : prop.theme.colors.grayscale.seventh)};
  border-radius: 8px;
  padding: 12px;
`;
export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.grayscale.seventh};
  border-radius: 4px;
  position: relative;
`;
export const Bar = styled.div`
  width: 50%;
  height: 4px;
  background: linear-gradient(90deg, #b8abf7 0%, #3818d9 100%);
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
`;
export const ContainerButton = styled.div`
  > button {
    background: #fa525214;
    color: #fa5252;
    height: 36px;
  }
`;
export const TextError = styled.p<{ red?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
  color: ${(prop) => (prop.red ? "#FA5252" : "#495057")};
`;
export const ContainerButtonError = styled.div`
  > button {
    height: 36px;
  }
`;
