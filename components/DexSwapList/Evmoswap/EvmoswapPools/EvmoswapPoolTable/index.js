import React, { useState } from "react";
import {
  createStyles,
  Table,
  Group,
  Text,
  ThemeIcon,
  Center,
  Paper,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons";

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

export default function EvmoswapPoolTable({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const { classes, cx } = useStyles();

  const DiffIcon =
    data.annualized_fee > 0 ? IconArrowUpRight : IconArrowDownRight;

  var numbro = require("numbro");

  const rows = data.map((index) => (
    <tr key={index.chain_name}>
      <td>
        <Group>
          {index.token_0.contract_ticker_symbol}-
          {index.token_1.contract_ticker_symbol}
        </Group>
      </td>

      <td>
        {numbro(index.total_liquidity_quote).formatCurrency({
          average: true,
          mantissa: 2,
          optionalMantissa: true,
        })}
      </td>
      <td>
        {numbro(index.volume_24h_quote).formatCurrency({
          average: true,
          mantissa: 2,
          optionalMantissa: true,
        })}
      </td>
      <td>
        {numbro(index.volume_7d_quote).formatCurrency({
          average: true,
          mantissa: 2,
          optionalMantissa: true,
        })}
      </td>
      <td>
        {numbro(index.fee_24h_quote).formatCurrency({
          average: true,
          mantissa: 2,
          optionalMantissa: true,
        })}
      </td>
      <td>
        <Group spacing="2xs">
          <Text>
            <Text
              color={
                numbro(index.annualized_fee).format({
                  thousandSeparated: true,
                  output: "percent",
                  spaceSeparated: true,
                  mantissa: 2,
                }) > 0
                  ? "teal"
                  : "red"
              }
            >
              {numbro(index.annualized_fee).format({
                thousandSeparated: true,
                mantissa: 2,
                output: "percent",
                spaceSeparated: true,
              })}
            </Text>
          </Text>

          <ThemeIcon
            color="gray"
            variant="subtle"
            sx={(theme) => ({
              color:
                numbro(index.annualized_fee).format({
                  thousandSeparated: true,
                  mantissa: 2,
                  output: "percent",
                  spaceSeparated: true,
                }) > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={30}
            radius="full"
          >
            <DiffIcon size={28} stroke={1.5} />
          </ThemeIcon>
        </Group>
      </td>
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
              sx={{ tableLayout: "fixed", minWidth: 700 }}
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
                      Liquidity
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Volume(24h)
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Volume 7d
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Fees (24h)
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      1y Fees/Liquidity
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
