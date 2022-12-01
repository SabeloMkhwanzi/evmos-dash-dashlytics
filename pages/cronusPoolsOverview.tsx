import Head from "next/head";
import { AppShell } from "@mantine/core";
import { CronusPoolsOverview, Footer, HeaderNavbar } from "../components";
import SideNavbarCronus from "../components/SideNavbarCronus";

export default function cronusOverviewT() {
  return (
    <>
      <Head>
        <title>Cronus-Finance Pairs - EddAlytics</title>
        <meta name="description" content="Emvos Dex Dashboard Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        navbar={<SideNavbarCronus />}
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
        <CronusPoolsOverview />
      </AppShell>
    </>
  );
}
