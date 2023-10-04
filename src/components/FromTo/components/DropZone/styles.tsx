import styled from "styled-components";

export const ContainerDropZone = styled.div<{ isDragActive: boolean }>`
  border: 2px dashed
    ${(props) =>
      props.isDragActive
        ? props.theme.colors.primary
        : props.theme.colors.grayscale.eighth};
  border-radius: 8px;
  height: 172px;
  display: flex;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  flex-direction: column;
  gap: 10px;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    color: ${({ theme }) => theme.colors.grayscale.primary};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
  span {
    color: ${({ theme }) => theme.colors.grayscale.twelfth};

    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.sizes.regular};
  }
  svg {
    width: 24px;
    height: 24px;
    stroke: ${(props) =>
      props.isDragActive
        ? props.theme.colors.primary
        : props.theme.colors.grayscale.seventh};
  }
`;
export const ContainerPreview = styled.div`
  height: 72px;
  width: 100%;
  background: ${({ theme }) => theme.colors.grayscale.ninth};
  border-radius: 8px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 8px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.03);
`;

export const TitleFile = styled.p`
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin: 0;
`;

export const CloseButton = styled.button`
  padding: 0;
  margin: 0;
  display: flex;
  border: none;
  margin-left: auto;
`;
