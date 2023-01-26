import styled from 'styled-components';

export const ToastWrapStyled = styled.div`
  ${({ theme }) => `
     .Toastify__toast-container {
        width: 360px;

        @media (max-width: 1380) {
            width: 100%;
        }

        .Toastify__toast {
          min-height: 75px;
        }

        .Toastify__toast-body {
          color: #212529;
          font-size: ${theme.fonts.sizes.normal};
          font-weight: ${theme.fonts.weights.regular};
          font-family: ${theme.fonts.family.default};
        }
        
        .Toastify__progress-bar {
            display: flex;
            
        }
        
        .Toastify__toast-icon {
            display: none;
        }
        
        .Toastify__toast--info {
            background: #339AF0;
            border: 1px solid #339AF0;
        }
        
        .Toastify__progress-bar--info {
            background: #339AF0;
        }

        .Toastify__toast--success {
            background: #EBFBEE;
            border: 1px solid #51CF66;
        }

        .Toastify__progress-bar--success {
            background: #EBFBEE;
        }
        
        .Toastify__toast--warning {
            background: #FFF9DB;
            border: 1px solid #FCC419;
        }
        
        .Toastify__progress-bar--warning {
            background: #FFF9DB;
        }

        .Toastify__toast--error {
            background: #FFF5F5;
            border: 1px solid #FF6B6B;
        }
        
        .Toastify__progress-bar--error {
            background: #FFF5F5;
        }
    }
 `};
`;
