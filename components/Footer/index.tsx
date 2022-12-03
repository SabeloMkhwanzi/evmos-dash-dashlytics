import { createStyles, Anchor, Group, ActionIcon, Center } from "@mantine/core";
import {
  IconBrandTwitter,
  //IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons";

import Logo from "../Logo";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 0.5,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

interface FooterCenteredProps {
  links: { link: string; label: string }[];
}

export default function Footer({ links }: FooterCenteredProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a">
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
        <Center>
          <Logo />
        </Center>
        <Group spacing="xs" position="right" noWrap>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component="a"
            target="_blank"
            href="https://github.com/SabeloMkhwanzi/evmos-defi-dashlytics"
          >
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component="a"
            target="_blank"
            href="https://twitter.com/eddalytic"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          {/* <ActionIcon
            component="a"
            target="_blank"
            size="lg"
            variant="default"
            radius="xl"
          >
            <IconBrandLinkedin size={18} stroke={1.5} />
          </ActionIcon> */}
        </Group>
      </div>
    </div>
  );
}
