import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  AppShell,
  createStyles,
  Container,
  Text,
  Button,
  Group,
  Image,
  Center,
  Notification,
  Box,
} from "@mantine/core";
import { IconX } from "@tabler/icons";

import {
  EmvosOverview,
  Footer,
  HeaderNavbar,
  LoaderComp,
  Logo,
  SideNavbarHome,
} from "../components";
import UAuth from "@uauth/js";
import Link from "next/link";

const uauth = new UAuth({
  clientID: process.env.NEXT_PUBLIC_UNSTOPPABLEDOMAIN_CLIENT_ID,
  redirectUri: "https://www.eddalytics.xyz/",
  scope: "openid wallet ",
});

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [authorization, setAuthorization] = useState();
  const { classes } = useStyles();

  // Check to see if the user is inside the cache
  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Login with a popup and save the user
  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(setAuthorization)
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  // Logout and delete user
  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <LoaderComp />;
  }

  if (error) {
    console.error(error);
    return (
      <Center
        style={{
          position: "fixed",
        }}
      >
        <Notification icon={<IconX size={18} />} color="red">
          Error! Failed to Connect
        </Notification>
      </Center>
    );
  }

  const getEllipsisTxt = (str, n = 5) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  if (user && authorization) {
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
          <Group>
            <Button
              sx={(theme) => ({
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: theme.shadows.md,
                },
              })}
              radius="md"
              variant="default"
              fz={{ base: "ms", md: "md" }}
              onClick={handleLogout}
            >
              <Image src="/ud-logo.svg" alt="ud-logo" px={1} />
              {user.sub}
            </Button>

            <Button
              sx={(theme) => ({
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: theme.shadows.md,
                },
              })}
              radius="md"
              variant="default"
              fz={{ base: "ms", md: "md" }}
              onClick={handleLogout}
            >
              {getEllipsisTxt(user.wallet_address)}
            </Button>
          </Group>
          <EmvosOverview />
        </AppShell>
      </>
    );
  }

  return (
    <Container h="100hv" className={classes.inner}>
      <Center>
        <Box my={20}>
          <Link href="www.eddalytics.xyz">
            <Image
              pb={2}
              src="/eddalytics-logo6.png"
              alt="gigiblock-logo"
              width="100%"
              height="100%"
            />
          </Link>
        </Box>
      </Center>

      <h1 className={classes.title}>
        A{" "}
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: "blue", to: "orange" }}
          inherit
        >
          DEX Visual Analytics
        </Text>{" "}
        <Center>dashboard site</Center>
      </h1>

      <Text className={classes.description} color="dimmed">
        Providing a visual analytics front-end with detailed data about Dex’s
        performance and health on the Evmos Mainnet.
      </Text>

      <Center>
        <Group className={classes.controls}>
          <Button
            ml={2}
            bg="#0D67FE"
            radius="md"
            size="md"
            onClick={handleLogin}
          >
            <Image alt="ud-logo" src="/ud-logo.svg" px={1} />
            Login UNS Domain
          </Button>
          <Link
            href="/evmos"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button radius="md" size="md" variant="default">
              Click to Continue
            </Button>
          </Link>
        </Group>
      </Center>
    </Container>
  );
}
