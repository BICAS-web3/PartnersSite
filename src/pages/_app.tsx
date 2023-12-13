import { EffectorNext } from "@effector/next";
import type { AppProps } from "next/app";

import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";

import { Fonts } from "@/shared/fonts/Fonts";
import "@/shared/styles/index.scss";

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);
const config = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "01e7a60839e8572c2da88e40b1db4893",
      },
    }),
  ],
  publicClient,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <EffectorNext values={pageProps?.values}>
      <Fonts />
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
    </EffectorNext>
  );
}
