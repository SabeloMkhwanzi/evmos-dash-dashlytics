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
  IconPool,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconChartInfographic,
  IconChartDots,
  IconChartBar,
  IconBook2,
  IconArrowsTransferUp,
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

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconChartDots, label: "Evmos" },
  { icon: IconChartBar, label: "Mission Control" },
  { icon: IconChartInfographic, label: "Assets" },
  { icon: IconArrowsTransferUp, label: "IBC Transfer" },
];

export default function SideNavbarHome() {
  const [active, setActive] = useState(2);
  const { classes, cx } = useStyles();
  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <>
      <Navbar width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={5}>
          <Stack justify="center" spacing={10} my="auto">
            <Tooltip label="Evmos.org" position="right" transitionDuration={0}>
              <Button
                component="a"
                target="_blank"
                href="/https://evmos.org/"
                color="gray"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconChartDots />
              </Button>
            </Tooltip>

            <Tooltip label="Evmos App" position="right" transitionDuration={0}>
              <Button
                component="a"
                target="_blank"
                href="/https://app.evmos.org/"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconChartDots />
              </Button>
            </Tooltip>

            <Tooltip label="Evmso Doc" position="right" transitionDuration={0}>
              <Button
                component="a"
                target="_blank"
                href="/https://docs.evmos.org/"
                className={cx(classes.link, { [classes.active]: active })}
              >
                <IconBook2 />
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
