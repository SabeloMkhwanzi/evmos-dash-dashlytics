import React, { useEffect, useState } from "react";
import {
  Button,
  Group,
  Image,
  Center,
  Notification,
  Loader,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import UAuth from "@uauth/js";
import LoaderComp from "../LoaderComp";

const uauth = new UAuth({
  clientID: process.env.NEXT_PUBLIC_UNSTOPPABLEDOMAIN_CLIENT_ID,
  redirectUri: "https://www.eddalytics.xyz/",
  scope: "openid wallet ",
});

export default function UnstoppableLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [authorization, setAuthorization] = useState();

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
      </>
    );
  }

  return (
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
      onClick={handleLogin}
    >
      <Image alt="ud-logo" src="/ud-logo.svg" px={1} />
      Login UNS Domain
    </Button>
  );
}
