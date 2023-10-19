import styled from "styled-components";

export const ErrorMessage = styled.div<{ position: { x: number; y: number } }>`
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 16px;
  z-index: 150;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;

  width: 285px;
  height: 136px;
  background-color: rgba(0, 0, 0, 0.88);
  border-radius: 6px;
  p {
    color: #fff;
    display: flex;
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    width: 253px;
  }

  .error-title {
    color: #f1bc02;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;
export const ArrowRight = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid rgba(0, 0, 0, 0.88);
  position: absolute;
  top: -8px;
`;
