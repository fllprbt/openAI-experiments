import "../styles/globals.css";
import type { AppProps } from "next/app";

const hasWindow = typeof window !== "undefined";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <h1>OpenAI experiments</h1>
      <div suppressHydrationWarning={true}>
        {hasWindow ? <Component {...pageProps} /> : null}
      </div>
    </div>
  );
}

export default MyApp;
