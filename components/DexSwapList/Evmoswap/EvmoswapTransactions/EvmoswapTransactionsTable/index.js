import React, { useState } from "react";
import {
  createStyles,
  Table,
  Text,
  Center,
  Paper,
  ScrollArea,
  Space,
  Tooltip,
} from "@mantine/core";
import moment from "moment";

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

export default function EvmoswapTransactionsTable({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const { classes, cx } = useStyles();

  const getEllipsisTxt = (str, n = 4) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const rows = data
    .slice(0)
    .reverse()
    .map((index) => (
      <tr key={index.chain_id}>
        <td>
          <div style={{ display: "flex" }}>
            <Text fw="bold" color="cyan.9" fz="md">
              {index.act}
            </Text>
            <Space w="xs" />
            <Text>{index.token_0.contract_ticker_symbol}</Text>
            <Space w="xs" />
            <Text>for</Text>
            <Space w="xs" />
            <Text>{index.token_1.contract_ticker_symbol}</Text>
          </div>
        </td>
        <td>
          <Text fw="bold" color="green.9" fz="md">
            {formatter.format(index.total_quote)}
          </Text>
        </td>
        <td>
          <div style={{ display: "flex" }}>
            <Text>{formatter.format(index.token_0_quote_rate)}</Text>
            <Space w="xs" />
            <Text>{index.token_0.contract_ticker_symbol}</Text>
          </div>
        </td>

        <td>
          <div style={{ display: "flex" }}>
            <Text>{formatter.format(index.token_1_quote_rate)}</Text>
            <Space w="xs" />
            <Text>{index.token_1.contract_ticker_symbol}</Text>
          </div>
        </td>

        <td>
          <Tooltip label="Evmos Scan">
            <Text
              color="blue"
              fw="bold"
              component="a"
              target="_blank"
              variant="subtle"
              href={`https://evm.evmos.org/address/${index.sender_address}`}
            >
              {getEllipsisTxt(index.sender_address)}
            </Text>
          </Tooltip>
        </td>
        <td>{moment(index.block_signed_at).startOf("hours").fromNow()}</td>
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
                      Act Types
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Total Value
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Token Amount
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Token Amount
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Account
                    </Text>
                  </th>
                  <th>
                    <Text c="dimmed" fw={700} tt="uppercase">
                      Time
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
