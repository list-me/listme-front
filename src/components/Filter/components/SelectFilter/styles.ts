import styled from "styled-components";
import themeStyle from "../../../../styles/theme";

export const ContainerSelect = styled.div<{ focused?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  width: 100%;
  input {
    color: ${({ theme }) => theme.colors.grayscale.primary} !important;
    font-family: ${({ theme }) => theme.fonts.family.default} !important;
    font-size: 16px !important;
    font-weight: ${({ theme }) => theme.fonts.weights.bold} !important;
    width: initial !important;
  }
  .react-select__control {
    *::-webkit-scrollbar {
      width: 8px;
    }
    *::-webkit-scrollbar-track {
      background-color: unset;
    }
    *::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      border-radius: 4px;
    }

    *::-webkit-scrollbar-thumb:hover {
      background-color: #3818d9;
    }
  }
  .react-select__placeholder {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .react-select__value-container {
    overflow-y: auto;
    display: flex;
    height: 100%;
  }
  .react-select__multi-value {
    display: none !important;
  }

  .react-select__control {
    .react-select__value-container--is-multi {
      input {
        display: ${(props) => (props.focused ? "initial" : "none")};
      }
    }
  }
`;
export const LabelSelect = styled.label`
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
export const FakePlaceHolder = styled.p`
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  padding-left: 8px;
  align-items: center;
`;

// @ts-ignore
export const customStyles = ({ small }: { small?: boolean }): Styles => ({
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "none",
    height: small ? "48px" : "64px",
    borderRadius: "8px",
    border: "1px solid #D1D6DC",
    "&:hover": {
      borderColor: "#D1D6DC",
    },
    boxShadow: "none",
    cursor: "pointer",
    position: "relative",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: themeStyle.colors.grayscale.primary,
    fontFamily: themeStyle.fonts.family.default,
    fontSize: themeStyle.fonts.sizes.normal,
    fontWeight: themeStyle.fonts.weights.regular,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: themeStyle.colors.grayscale.primary,
    fontFamily: themeStyle.fonts.family.default,
    fontSize: themeStyle.fonts.sizes.normal,
    fontWeight: themeStyle.fonts.weights.regular,
  }),
  menu: (provided: any) => ({
    ...provided,
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0px 10px 40px 0px rgba(56, 24, 217, 0.07)",
    position: "absolute !important",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "8px",
    color: state.isSelected
      ? themeStyle.colors.primary
      : themeStyle.colors.grayscale.primary,
    fontFamily: themeStyle.fonts.family.default,
    fontSize: themeStyle.fonts.sizes.normal,
    fontWeight: themeStyle.fonts.weights.regular,
    backgroundColor:
      (state.isSelected || state.isFocused) &&
      themeStyle.colors.background.tertiary,
    cursor: "pointer",
    marginBottom: "8px",
    "&:disabled": {
      background: "none",
    },
    "&:hover": {
      backgroundColor:
        (state.isSelected || state.isFocused) &&
        themeStyle.colors.background.tertiary,
    },
    "&:not(hover)": {
      backgroundColor: !state.isSelected && "initial",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
});
