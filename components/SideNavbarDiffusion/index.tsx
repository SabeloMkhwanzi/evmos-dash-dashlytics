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
  TablerIcon,
  IconHome2,
  IconDeviceDesktopAnalytics,
  IconPool,
  IconCoin,
  IconExchange,
  IconWallet,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons";

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

export default function SideNavbarDiffusion() {
  const [active, setActive] = useState(2);
  const { classes, cx } = useStyles();

  return (
    <>
      <Navbar width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={5}>
          <Stack justify="center" spacing={10} my="auto">
            <Tooltip label="Home" position="right" transitionDuration={0}>
              <Button
                component="a"
                href="/"
                color="gray"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconHome2 />
              </Button>
            </Tooltip>

            <Tooltip label="Analytics" position="right" transitionDuration={0}>
              <Button
                component="a"
                href="/diffusion"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconDeviceDesktopAnalytics />
              </Button>
            </Tooltip>

            <Tooltip label="Pairs" position="right" transitionDuration={0}>
              <Button
                component="a"
                href="/diffusionPoolsOverview"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconPool />
              </Button>
            </Tooltip>

            <Tooltip label="Tokens" position="right" transitionDuration={0}>
              <Button
                component="a"
                href="diffusionTokensOverview"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconCoin />
              </Button>
            </Tooltip>

            <Tooltip
              label="Diffusion Dex"
              position="right"
              transitionDuration={0}
            >
              <Button
                component="a"
                target="_blank"
                href="https://app.diffusion.fi/#/swap"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconExchange />
              </Button>
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
