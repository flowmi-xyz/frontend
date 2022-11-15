// root.tsx
import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";

import { ServerStyleContext, ClientStyleContext } from "./context";

import { theme } from "./styles/theme";
import Fonts from "./fonts";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Social DeFi | Chainlink Hackathon",
  viewport: "width=device-width,initial-scale=1",
});

// export let links: LinksFunction = () => {
//   return [
//     { rel: "preconnect", href: "https://fonts.googleapis.com" },
//     { rel: "preconnect", href: "https://fonts.gstatic.com" },
//     {
//       rel: "stylesheet",
//       href: "https://fonts.cdnfonts.com/css/louis-george-cafe",
//     },
//   ];
// };

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <ChakraProvider theme={theme}>
        <Fonts />
        {/* <CSSReset /> */}

        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
