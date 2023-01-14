import React from "react";
import Head from "next/head";
import { AppShell } from "@mantine/core";

import {
  EmvosOverview,
  Footer,
  HeaderNavbar,
  SideNavbarHome,
  UnstoppableLogin,
} from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>EddAlytics - Emvos Dex Dashboard Analytics</title>
        <meta name="description" content="Emvos Dex Dashboard Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        navbar={<SideNavbarHome />}
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
        <UnstoppableLogin />
        <EmvosOverview />
      </AppShell>
    </>
  );
}
