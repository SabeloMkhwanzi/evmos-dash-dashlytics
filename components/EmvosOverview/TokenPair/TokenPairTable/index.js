import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Center,
  TextInput,
  SimpleGrid,
  Paper,
  Text,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons";
import { HStack } from "@chakra-ui/react";
import { v1 as uuidv1 } from 'uuid'

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

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

export default function TokenPairTable({ data }) {
  const { classes, cx } = useStyles();
  const [sortedData, setSortedData] = useState(data);
  const [scrolled, setScrolled] = useState(false);

  // used numbro library to convert big numbers to human readable digits
  var numbro = require("numbro");

  const rows = sortedData?.pairs.map((row) => (
    <tr key={row.url}>
      <td>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Text fontWeight="semibold">{row.baseToken.symbol}</Text>
          <Text fontWeight="semibold">{row.quoteToken.symbol}</Text>
          <Text fontSize="x-small" c="dimmed" size={1} px="md">
            {row.quoteToken.name}
          </Text>
        </SimpleGrid>
      </td>
      <td>
        <HStack>
          <Text extalign="centre" fontWeight="semibold">
            {numbro(row.priceUsd).formatCurrency({
              average: true,
              mantissa: 2,
              optionalMantissa: true,
            })}
          </Text>
          <Text fontSize="small" c="dimmed">
            {row.dexId}
          </Text>
        </HStack>
      </td>
      <td>
        <Text extalign="centre" fontWeight="semibold">
          {numbro(row.volume.h24).formatCurrency({
            average: true,
            mantissa: 2,
            optionalMantissa: true,
          })}
        </Text>
      </td>
      <td>
        <Text extalign="centre" fontWeight="semibold">
          {numbro(row.liquidity.usd).formatCurrency({
            average: true,
            mantissa: 2,
            optionalMantissa: true,
          })}
        </Text>
      </td>
      <td>
        <Text extalign="centre" fontWeight="semibold">
          {numbro(row.fdv).formatCurrency({
            average: true,
            mantissa: 2,
            optionalMantissa: true,
          })}
        </Text>
      </td>
    </tr>
  ));

  return (
    <Center>
      <Paper width="600" withBorder className={classes.card}>
        <ScrollArea
          sx={{ height: 600 }}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <TextInput
            placeholder="Search by any field"
            mb="md"
            icon={<IconSearch size={14} stroke={1.5} />}
          />
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            sx={{ tableLayout: "fixed", minWidth: 700 }}
          >
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <Th>
                  <Text c="dimmed" fw={700} tt="uppercase">
                    TOKENS
                  </Text>
                </Th>
                <Th>
                  <Text c="dimmed" fw={700} tt="uppercase">
                    Price (USD)
                  </Text>
                </Th>
                <Th>
                  <Text c="dimmed" fw={700} tt="uppercase">
                    volume h24
                  </Text>
                </Th>
                <Th>
                  <Text c="dimmed" fw={700} tt="uppercase">
                    Liquidity
                  </Text>
                </Th>
                <Th>
                  <Text c="dimmed" fw={700} tt="uppercase">
                    FDV
                  </Text>
                </Th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td colSpan={Object.keys(data[0]).length}>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </Center>
  );
}
