import { AppProps } from "next/app";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useState } from "react";

// import react-query
import { QueryClient, QueryClientProvider } from "react-query";

// import Rainbow Wallet setting here
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [] : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.

      apiKey: "oMM0vOj56LhAqY5t4YGaI8CdktKDNFsD",
      //apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "EVMOS-LYTICS",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

// Create a client for react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(props: AppProps) {
  // Defining Color Mode
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { Component, pageProps } = props;

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            /** mantine theme override code here */
            breakpoints: {
              xs: 500,
              sm: 800,
              md: 1000,
              lg: 1200,
              xl: 1400,
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains}>
                <Component {...pageProps} />
              </RainbowKitProvider>
            </WagmiConfig>
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
