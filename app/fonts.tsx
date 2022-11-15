import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('./assets/fonts/Louis-George-Cafe.woff') format('woff');
    }
    @font-face {
      font-family: 'Louis George Cafe';
      src: url('./assets/fonts/Louis-George-Cafe.woff2') format('woff2');
    }
  `}
  />
);

export default Fonts;
