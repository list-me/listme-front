import styled from "styled-components";

export const Container = styled.section`
  margin-top: 32px;
  padding: 10px;

  /* div {
    margin-top: 24px;

    :first-child {
      font-family: ${({ theme }) => theme.fonts.family.default};
      font-size: ${({ theme }) => theme.fonts.sizes.normal};
      color: ${({ theme }) => theme.colors.fourth};
      font-weight: 400;
      line-height: 150%;
    }

    span {
    }
  } */
`;

export const Description = styled.div`
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.fourth};
  font-weight: 400;

  margin-bottom: 24px;
`;

export const Content = styled.section`
  height: 332px;
  margin: 20px;
`;

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: ${({ theme }) => theme.colors.fourth};
  font-weight: 700;
  line-height: 150%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const ButtonCotainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-top: 24px;

  button:first-child {
    margin-right: 24px;
  }
`;

export const Button = styled.button<{backgroundColor?: string, color?: string}>`
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};

  padding: 16px 0;

  min-width: 100px;
  width: 234px;
  height: 52px;

  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: center;

  color: ${({color}) => color};
  background-color: ${({backgroundColor, disabled}) => backgroundColor };

  &:hover {
    transition: opacity linear 0.4s;
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    min-width: ${({ theme }) => theme.spacing.xxxsmall};
    min-height: ${({ theme }) => theme.spacing.xxxsmall};

    animation: rotate 2s linear infinite;
    
    margin-right: 10px;
  }

  /* @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    width: 100%;
    height: 45px;
    font-size: ${({ theme }) => theme.fonts.sizes.xxsmall};
  } */
`;
