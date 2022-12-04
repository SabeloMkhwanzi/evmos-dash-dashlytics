import Head from "next/head";
import { AppShell } from "@mantine/core";
import {
  StatsDaggableLayer,
  Footer,
  HeaderNavbar,
  SideNavbarCustomizableDashboard,
} from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Customizable Dashboard - EddAlytics</title>
        <meta name="description" content="Emvos Dex Dashboard Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        navbar={<SideNavbarCustomizableDashboard />}
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
        <StatsDaggableLayer />
      </AppShell>
    </>
  );
}
