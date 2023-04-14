import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 416px;
  height: 672px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px;
  border: 1px solid #e9ecef;
  border-radius: 8px;

  margin-bottom: 162px;
  margin-top: 80px;

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const Title = styled.h1`
  margin-bottom: 24px;

  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: 700;
  line-height: 150%;
  text-align: center;
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 10rem 0;

  background: ${({ theme }) => theme.colors.background.default};
`;

export const LogoContainer = styled.span`
  display: flex;
  margin-top: -20px;
`;

export const InputContainer = styled.span`
  .ant-form-item-label {
    height: 24px !important;
    margin-bottom: 8px !important;
  }

  .ant-form-item-required {
    color: ${({ theme }) => theme.colors.fourth} !important;
    font-size: ${({ theme }) => theme.fonts.sizes.normal} !important;
    font-family: ${({ theme }) => theme.fonts.family.default} !important;

    :before {
      display: none !important;
    }
  }

  .ant-form-item-row {
    margin-bottom: 24px !important;
  }

  .ant-input {
    color: ${({ theme }) => theme.colors.fourth} !important;
    font-size: ${({ theme }) => theme.fonts.sizes.normal} !important;
    font-family: ${({ theme }) => theme.fonts.family.default} !important;
  }
`;

export const ButtonContainer = styled.span`
  div:last-child {
    margin-top: 24px;
  }

  button {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 700;
    line-height: 20px;
    text-align: center;
  }

  .ant-checkbox-wrapper {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 400;
    line-height: 150%;
  }
`;

export const BottomContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.colors.tertiary};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};

  margin-top: 24px;

  width: 100%;
`;

export const ButtonCustom = styled.button`
  cursor: pointer;

  outline: none;
  border-radius: ${({ theme }) => theme.border.radius};
  border: 1px solid #e9ecef;

  padding: 20px;
  margin: 24px 0;

  width: 100%;
  height: 64px;

  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: 700;
  line-height: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.grayscale.primary};

  background: ${({ theme }) => theme.colors.background.primary};

  &:hover {
    transition: opacity linear 0.4s;
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    // min-width: ${({ theme }) => theme.spacing.xxxsmall};
    // min-height: ${({ theme }) => theme.spacing.xxxsmall};
    // width: ${({ theme }) => theme.spacing.xxsmall};
    // height: ${({ theme }) => theme.spacing.xxsmall};

    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;
