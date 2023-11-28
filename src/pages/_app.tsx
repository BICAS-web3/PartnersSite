import { EffectorNext } from "@effector/next";
import type { AppProps } from "next/app";
import { Fonts } from "@/shared/fonts/Fonts";
import "@/shared/styles/index.scss";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [publicProvider()]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
  return (
    <EffectorNext values={pageProps?.values}>
      <Fonts />
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
    </EffectorNext>
  );
}
