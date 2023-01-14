import Head from "next/head";
import { AppShell } from "@mantine/core";
import {
  Diffuison,
  Footer,
  HeaderNavbar,
  UnstoppableLogin,
} from "../components";
import SideNavbarDiffusion from "../components/SideNavbarDiffusion";

export default function Diffusion() {
  return (
    <>
      <Head>
        <title>Diffusion Analytics - EddAlytics</title>
        <meta name="description" content="Emvos Dex Dashboard Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        navbar={<SideNavbarDiffusion />}
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
        <Diffuison />
      </AppShell>
    </>
  );
}
