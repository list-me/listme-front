import styled from "styled-components";

export const Contents = styled.div`
  display: flex;

  span:not(:last-child) {
    margin-right: 24px;
  }
`;

export const Item = styled.span`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: center;

  svg:first-child {
    margin-right: 8px;
  }

  svg:last-child {
    margin-left: 8px;
    &:hover {
      cursor: pointer;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const ButtonCustom = styled.button<{ width: string; height: string }>`
  cursor: pointer;

  outline: none;
  border: none;
  border-radius: 8px;

  padding: 12px 16px;
  margin-left: 1rem;

  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};

  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-align: center;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};

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
    margin-right: 8px;
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    width: 100%;
    height: 38px !important;
    border-radius: 6px;

    font-size: ${({ theme }) => theme.fonts.sizes.xxxsmall};
  }
`;
