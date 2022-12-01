import React, { useState } from "react";
import {
  createStyles,
  Table,
  Text,
  Center,
  Paper,
  ScrollArea,
  TextInput,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  th: {
    padding: "0 !important",
    extalign: "right",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    width: 1220,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function EvmoswapTokenTable({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const { classes, cx } = useStyles();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const rows = data.map((index) => (
    <tr key={index.chain_name}>
      <td>{index.contract_name}</td>
      <td>{index.contract_ticker_symbol}</td>
      <td>{formatter.format(index.total_liquidity_quote)}</td>
      <td>{formatter.format(index.total_volume_24h_quote)}</td>
      <td>{formatter.format(index.quote_rate)}</td>
      <td>{index.swap_count_24h}</td>
    </tr>
  ));

  return (
    <>
      <Center>
        <Paper width="600" withBorder className={classes.card}>
          <ScrollArea
            sx={{ height: 400 }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <TextInput placeholder="Search by Ticker name" mb="md" />
            <Table
              highlightOnHover
              horizontalSpacing="xl"
              verticalSpacing="xs"
              sx={{ minWidth: 700 }}
            >
              <thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <tr c="dimmed" fw={700} tt="uppercase">
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Name
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Symbol
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Liquidity Quote
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Volume Quote (24h)
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Price
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Swap Count (24h)
                    </Text>
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Center>
    </>
  );
}
