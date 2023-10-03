import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerLoadingSpinner = styled.div`
  margin-top: 50px;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    display: inline-block;
    width: 104px;
    height: 104px;
    animation: spin 0.75s linear infinite;
  }
`;
