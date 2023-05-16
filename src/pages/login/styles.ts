import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 416px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px;
  border: 1px solid #e9ecef;
  border-radius: 8px;

  /* margin-bottom: 162px; */
  margin-top: 80px;

  background: ${({ theme }) => theme.colors.background.primary};

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: 0;
    height: fit-content;
  }
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
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 6rem;

  background: ${({ theme }) => theme.colors.background.default};

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    padding-top: 2rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  margin-bottom: 0;

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    margin-bottom: 2rem;
  }
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

  margin-top: 10px;

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
