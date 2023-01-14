import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Button,
} from "@mantine/core";
import {
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconPool,
  IconCoin,
  IconExchange,
  IconLogout,
  IconSwitchHorizontal,
  IconTemplate,
} from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function SideNavbarEvmoswap() {
  const [active, setActive] = useState(2);
  const { classes, cx } = useStyles();

  return (
    <>
      <Navbar width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={5}>
          <Stack justify="center" spacing={10} my="auto">
            <Tooltip label="Home" position="right" transitionDuration={0}>
              <Link
                href="/evmos"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  color="gray"
                  className={cx(classes.link, { [classes.active]: active })}
                >
                  <IconHome2 />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip label="Analytics" position="right" transitionDuration={0}>
              <Link
                href="/evmoswap"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  className={cx(classes.link, { [classes.active]: active })}
                >
                  <IconDeviceDesktopAnalytics />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip label="Pairs" position="right" transitionDuration={0}>
              <Link
                href="/evmoswapPoolsOverview"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  className={cx(classes.link, { [classes.active]: active })}
                >
                  <IconPool />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip label="Tokens" position="right" transitionDuration={0}>
              <Link
                href="evmoswapTokensOverview"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  className={cx(classes.link, { [classes.active]: active })}
                >
                  <IconCoin />
                </Button>
              </Link>
            </Tooltip>

            <Tooltip
              label="evmoswap Dex"
              position="right"
              transitionDuration={0}
            >
              <Button
                component="a"
                target="_blank"
                href="https://app.evmoswap.org/swap "
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconExchange />
              </Button>
            </Tooltip>
            <Tooltip
              label="Customizable Dashboard"
              position="right"
              transitionDuration={0}
            >
              <Link
                href="/customizableDashboard"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button
                  className={cx(classes.link, { [classes.active]: active })}
                >
                  <IconTemplate />
                </Button>
              </Link>
            </Tooltip>
          </Stack>
        </Navbar.Section>

        <Navbar.Section>
          <Stack justify="center" spacing={10}>
            <UnstyledButton
              className={cx(classes.link, { [classes.active]: active })}
            >
              <IconSwitchHorizontal />
            </UnstyledButton>
            <UnstyledButton
              className={cx(classes.link, { [classes.active]: active })}
            >
              <IconLogout />
            </UnstyledButton>
          </Stack>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
