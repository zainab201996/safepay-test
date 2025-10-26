export const theme = {
  colors: {
    primary: {
      blue: "#193A8C",
      green: "#00cf83",
      black: "#162f52",
    },
    secondary: {
      midBlue: "#0467d0",
      lightBlue: "#1ebbfd",
      orange: "#ffa700",
      yellow: " #ffdf50",
      gray: "#ebf6ff",
    },
    tertiary: {
      green: "#C2ECE8",
      blue: " #6A9ADB",
      orange: "#F1DCBB",
      yellow: " #F9F2D6",
    },
  },
  fonts: {
    light: "'Roboto', sans-serif",
    bold: "'Roboto', sans-serif",
  },

  fontWeights: {
    light: 300,
    bold: 700,
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
};

export type ThemeType = typeof theme;
