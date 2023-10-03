interface ITheme {
  colors: any;
  fonts: any;
  border: any;
  spacing: any;
}

const theme: ITheme = {
  colors: {
    primary: "#3818D9",
    secondary: "#FFFFFF",
    tertiary: "#868E96",
    fourth: "#000000",

    error: "",
    warning: "",
    success: "",

    shape: "",
    shapeSecondary: "",

    text: "",
    textSecondary: "",
    textLight: "",
    textDisabled: "",

    light: "",
    gold: "",

    grayscale: {
      primary: "#212529",
      fourth: "#868E96",
      seventh: "#DEE2E6",
      eighth: "#E9ECEF",
      ninth: "#F1F3F5",
      tenth: "#F3F4F6",
      eleventh: "#F8F9FA",
      twelfth: "#ADB5BD",
    },

    background: {
      default: "#F3F4F6",
      primary: "#FFFFFF",
      secondary: "",
      tertiary: "#E2E0FF",
    },
    hover: {
      background: "#F7F5FF",
      text: "#3818D9",
    },
  },
  fonts: {
    family: {
      default: '"Satoshi Regular", sans-serif',
      italic: '"Satoshi Italic", sans-serif',
      light: '"Satoshi Light", sans-serif',
      bold: '"Satoshi Bold", sans-serif',
    },
    sizes: {
      xxxsmall: "8px",
      xxsmall: "10px",
      xsmall: "12px",
      small: "14px",
      normal: "16px",
      xmedium: "20px",
      medium: "24px",
      large: "4rem",
      xlarge: "36px",
    },
    weights: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  border: {
    radius: "8px",
  },
  spacing: {
    quark: "4px",
    xxxnano: "8px",
    xxnano: "10px",
    nano: "12px",
    xxxsmall: "18px",
    xxsmall: "22px",
    xsmall: "30px",
    small: "38px",
    medium: "42px",
    large: "56px",
    xlarge: "64px",
    xxlarge: "80px",
    xxxlarge: "110px",
    huge: "160px",
    giant: "200px",
  },
};

export default theme;
