import "../src/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/theme";
import Box from "@material-ui/core/Box/Box";
import { Container } from "@material-ui/core";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>OpenAI experiments</title>
        <meta name="description" content="OpenAI POCs" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Box display="flex" minHeight="100vh">
          <Container>
            <Component {...pageProps} />
          </Container>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
