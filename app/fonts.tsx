import { Global } from "@emotion/react";

// const Fonts = () => (
//   <Global
//     styles={`
//     @font-face {
//       font-family: 'Louis George Cafe';
//       src: url('./assets/fonts/Louis-George-Cafe.woff') format('woff');
//     }
//     @font-face {
//       font-family: 'Louis George Cafe';
//       src: url('./assets/fonts/Louis-George-Cafe.woff2') format('woff2');
//     }
//   `}
//   />
// );

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Outfit';
      font-weight: 400;
      src: url('../assets/fonts/Outfit-Regular.woff') format('woff');
    }
    @font-face {
      font-family: 'Outfit';
      font-weight: 500;
      src: url('../assets/fonts/Outfit-Medium.woff') format('woff');
    }
    @font-face {
      font-family: 'Outfit';
      font-weight: 600;
      src: url('../assets/fonts/Outfit-SemiBold.woff') format('woff');
    }
    @font-face {
      font-family: 'Outfit';
      font-weight: 700;
      src: url('../assets/fonts/Outfit-Bold.woff') format('woff');
    }
    @font-face {
      font-family: 'Outfit';
      font-weight: 800;
      src: url('../assets/fonts/Outfit-ExtraBold.woff') format('woff');
    }
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
