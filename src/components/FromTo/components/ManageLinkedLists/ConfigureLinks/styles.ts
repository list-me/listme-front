import styled from "styled-components";

export const ContainerConfigureLinks = styled.div`
  width: 701px;
`;

export const ContentConfigureLinks = styled.div`
  width: 100%;
`;

export const WrapperListSelected = styled.div`
  width: 100%;
  height: 112px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #e8ebed;
  overflow: hidden;
  p,
  span {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    margin: 0;
  }
  span {
    color: ${({ theme }) => theme.colors.primary};
    width: 64px;
    text-align: center;
  }
`;

export const HeaderListSelected = styled.div`
  width: 100%;
  height: 50%;
  background: ${({ theme }) => theme.colors.grayscale.eleventh};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const ContentListSelected = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const HeaderColumns = styled.div`
  display: flex;
  height: 40px;
  align-items: flex-start;
  margin-top: 16px;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
  margin-bottom: 24px;
  > p {
    width: auto;
  }
`;

export const WrapperCheckBox = styled.div`
  width: 69px;
`;
