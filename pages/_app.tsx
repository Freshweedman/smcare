import "@/index.css";
import type { AppProps } from "next/app";
import { WouterProvider } from "wouter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WouterProvider>
      <Component {...pageProps} />
    </WouterProvider>
  );
}
