import Head from "next/head";

import { AppShell, Navbar, Header } from "@mantine/core";
import { Cronus, Footer, HeaderNavbar, SideNavbarHome } from "../components";

export default function Home() {
  return (
    <AppShell
      navbar={<SideNavbarHome />}
      header={<HeaderNavbar />}
      // eslint-disable-next-line react/jsx-no-duplicate-props
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
      <Cronus />
    </AppShell>
  );
}

//  <Head>
//         <title>Evmos-dashLytics</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>