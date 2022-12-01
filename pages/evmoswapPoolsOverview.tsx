import Head from "next/head";
import { AppShell } from "@mantine/core";
import { EvmoswapPoolsOverview, Footer, HeaderNavbar } from "../components";
import SideNavbarEvmoswap from "../components/SideNavbarEvmos";

export default function Evmoswap() {
  return (
    <>
      <Head>
        <title>Evmoswap Pairs - EddAlytics</title>
        <meta name="description" content="Emvos Dex Dashboard Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        navbar={<SideNavbarEvmoswap />}
        header={<HeaderNavbar />}
        footer={<Footer links={[]} />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <EvmoswapPoolsOverview />
      </AppShell>
    </>
  );
}
