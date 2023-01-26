import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 80%;
  
  display: flex;
  justify-content: center;
`;

export const Loader = styled.div`
  border-radius: 50%;
  border-top: 5px solid blue;
  border-bottom: 5px solid blue;
  border-left: 5px solid blue;
  border-right: 5px solid white;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
