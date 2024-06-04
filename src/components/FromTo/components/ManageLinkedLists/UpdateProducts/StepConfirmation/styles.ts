import styled from "styled-components";

export const ContainerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #00000052;
  display: flex;
  justify-content: center;
  align-items: center;
  > div > div {
    width: 572px !important;
    height: 248px !important;
    min-height: auto !important;
    padding: 40px !important;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    > div {
      margin: 0;
      padding: 0;
    }
  }
`;

export const ContainerConfirmation = styled.div`
  width: 701px;
`;

export const ContentConfirmation = styled.div`
  width: 100%;
`;
export const AlertConfirmation = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  span {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;
