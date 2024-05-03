import styled from "styled-components";

export const ContainerParentHeaderEdit = styled.div`
  width: 100vw;
  height: 100vh;
  background: #00000052;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;
`;

export const ContainerContentParentHeaderEdit = styled.div`
  width: 600px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 40px;
  border-radius: 8px;
`;
export const TitleContentParentHeaderEdit = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
  padding: 0;
`;
export const LabelContentParentHeaderEdit = styled.label`
  margin-top: 16px;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const InputContentParentHeaderEdit = styled.input`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.eighth};
  padding: 0 16px;
`;

export const ContainerButtonsParentHeaderEdit = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
  gap: 24px;
`;
