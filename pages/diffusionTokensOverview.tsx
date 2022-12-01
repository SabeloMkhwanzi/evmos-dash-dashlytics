import Head from "next/head";
import { AppShell } from "@mantine/core";
import { DiffusionTokensOverview, Footer, HeaderNavbar } from "../components";
import SideNavbarDiffusion from "../components/SideNavbarDiffusion";

export default function Diffusion() {
  return (
    <>
     <Head>
        <title>Diffusion Tokens - EddAlytics</title>
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
        <DiffusionTokensOverview />
      </AppShell>
    </>
  );
}
