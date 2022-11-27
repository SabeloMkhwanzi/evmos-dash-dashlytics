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
                color="violet"
                radius="md"
                h={50}
              >
                <Avatar
                  variant="outline"
                  radius="lg"
                  mx={3}
                  color="grape"
                  alt="diffusion"
                  src="https://assets-global.website-files.com/626a943b5e0d745c0313657b/626ad0718bf48d5b671e67f2_sZ0ATBDy_400x400.jpeg"
                />
                Diffusion
              </Button>
              <Button
                href="cronus"
                component="a"
                variant="subtle"
                color="violet"
                radius="md"
                h={50}
              >
                <Avatar
                  variant="outline"
                  radius="lg"
                  mx={3}
                  color="grape"
                  alt="diffusion"
                  src="https://assets-global.website-files.com/626a943b5e0d745c0313657b/626a96b1e0ea623fad409fb8_Cronus%20Finance.jpeg"
                />
                Cronus Finance
              </Button>
              <Button
                href="evmoswap"
                component="a"
                variant="subtle"
                color="violet"
                radius="md"
                h={50}
              >
                <Avatar
                  variant="outline"
                  radius="lg"
                  mx={3}
                  color="grape"
                  alt="diffusion"
                  src="https://assets-global.website-files.com/626a943b5e0d745c0313657b/63121af2ab5c98098a5c1ff0_evmosswap_400x400.jpeg"
                />
                EvmoSwap
              </Button>
            </Group>
            <Link href="/">
              <MantineLogo size={30} color="violet" />
            </Link>
            <Group className={classes.hiddenMobile}>
              <ColorModeButton />
              {/* <ConnectLoginButton /> */}
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
