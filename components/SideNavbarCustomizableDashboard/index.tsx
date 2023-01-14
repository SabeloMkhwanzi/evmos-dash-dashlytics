import { useState } from "react";
import {
  Navbar,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  Button,
} from "@mantine/core";
import { IconHome2, IconLogout, IconSwitchHorizontal } from "@tabler/icons";
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

export default function SideNavbarCustomizableDashboard() {
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
