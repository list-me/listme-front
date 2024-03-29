import styled from "styled-components";
import themeStyle from "../../styles/theme";

export const ContainerSelect = styled.div<{ inline?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.inline ? "row" : "column")};
  align-items: ${(props) => (props.inline ? "center" : "none")};
  gap: ${(props) => (props.inline ? "38px" : "8px")};
  width: 100%;
  > div {
    color: ${({ theme }) => theme.colors.grayscale.primary} !important;
    font-family: ${({ theme }) => theme.fonts.family.default} !important;
    font-size: 16px !important;
    font-weight: ${({ theme }) => theme.fonts.weights.bold} !important;
    width: initial !important;
    flex-grow: ${(props) => (props.inline ? "1" : "initial")};
  }
`;

export const LabelSelect = styled.label`
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  display: flex;
  span {
    color: #f15757;
  }
  .subLabel {
    color: #515151;
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
  }
`;

export const customStyles = ({ small }: { small?: boolean }): Styles => ({
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "none",
    height: small ? "48px" : "64px",
    borderRadius: "8px",
    border: "1px solid #D1D6DC",
    "&:hover": {
      borderColor: "#D1D6DC",
    },
    boxShadow: "none",
    position: "relative",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    opacity: state.isDisabled ? 0.5 : 1,
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
    zIndex: 1000000,
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
    path: {
      stroke: state.isSelected
        ? themeStyle.colors.primary
        : themeStyle.colors.grayscale.primary,
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
