import {
  createStyles,
  Header,
  Group,
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Avatar,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import Link from "next/link";
import ChainStatus from "../ChainStatus";
import ColorModeButton from "../ColorModeButton";
//import ConnectLoginButton from "../ConnectLoginButton";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function HeaderNavbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <>
      <Box pb={0.5}>
        <Header height={75} px="md">
          <Group position="apart" sx={{ height: "100%" }}>
            <Group
              sx={{ height: "100%" }}
              spacing={5}
              className={classes.hiddenMobile}
            >
              <Button
                href="diffusion"
                component="a"
                variant="subtle"
                color="white"
                radius="md"
                h={50}
              >
                <Avatar
                  variant="outline"
                  radius="xl"
                  mx={3}
                  color="white"
                  alt="diffusion"
                  src="https://assets.coingecko.com/coins/images/25331/small/photo5451952870917257644.jpg?1651826321"
                />
                Diffusion
              </Button>
              <Button
                href="cronus"
                component="a"
                variant="subtle"
                color="white"
                radius="md"
                h={50}
              >
                <Avatar
                  variant="outline"
                  radius="xl"
                  mx={3}
                  color="white"
                  alt="diffusion"
                  src="https://assets.coingecko.com/coins/images/24022/small/h8GHzr2W_400x400.jpg?1646096205"
                />
                Cronus Finance
              </Button>
              <Button
                href="evmoswap"
                component="a"
                variant="subtle"
                color="white"
                radius="md"
                h={50}
              >
                <Avatar
                  variant="outline"
                  radius="xl"
                  mx={3}
                  color="white"
                  alt="diffusion"
                  src="https://assets.coingecko.com/coins/images/25800/small/logox200.png?1653970616"
                />
                EvmoSwap
              </Button>
            </Group>
            <Link href="/">
              <MantineLogo size={30} color="violet" />
            </Link>
            <Group className={classes.hiddenMobile}>
              <ChainStatus />
              <ColorModeButton />
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <Group position="center" grow pb="xl" px="md">
              <ColorModeButton />
              {/* <ConnectLoginButton /> */}
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
}
