import styled from "styled-components";

export const ContainerLinkFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HeaderLinkFields = styled.div`
  display: flex;
  padding-bottom: 13px;
  border-bottom: 1px solid #eee;
`;

export const ColumnTitleLinkFields = styled.p`
  width: 50%;
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
export const ContentRowLinkFields = styled.div`
  display: flex;
  width: 100%;
`;
