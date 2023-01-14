import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Image,
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
import Logo from "../Logo";

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
              <Link
                href="/diffusion"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button variant="subtle" color="white" radius="md" h={50}>
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
              </Link>
              <Link
                href="/cronus"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button variant="subtle" color="white" radius="md" h={50}>
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
              </Link>
              <Link
                href="/evmoswap"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button variant="subtle" color="white" radius="md" h={50}>
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
              </Link>
            </Group>
            <Logo />
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

            <Link component="a" href="/" className={classes.link}>
              Home
            </Link>
            <Link component="a" href="/diffusion" className={classes.link}>
              Diffusion
            </Link>
            <Link href="/cronus" className={classes.link}>
              Cronus Finance
            </Link>
            <Link href="/evmoswap" className={classes.link}>
              EvmoSwap
            </Link>

            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <Group position="center" grow pb="xl" px="md">
              <ColorModeButton />
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
}
