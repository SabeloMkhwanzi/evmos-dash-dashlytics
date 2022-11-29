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
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons";
import { HStack } from "@chakra-ui/react";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
    textAlign: "right",
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

function filterData({ data, search }) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData({ data, payload }) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function TokenPairTable({ data }) {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data?.pairs, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  // used numbro library to convert big numbers to human readable digits
  var numbro = require("numbro");

  const rows = sortedData?.pairs.map((row) => (
    <tr key={row.name}>
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
          <Text textAlign="centre" fontWeight="semibold">
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
        <Text textAlign="centre" fontWeight="semibold">
          {numbro(row.volume.h24).formatCurrency({
            average: true,
            mantissa: 2,
            optionalMantissa: true,
          })}
        </Text>
      </td>
      <td>
        <Text textAlign="centre" fontWeight="semibold">
          {numbro(row.liquidity.usd).formatCurrency({
            average: true,
            mantissa: 2,
            optionalMantissa: true,
          })}
        </Text>
      </td>
      <td>
        <Text textAlign="centre" fontWeight="semibold">
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
        <ScrollArea>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            icon={<IconSearch size={14} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            sx={{ tableLayout: "fixed", minWidth: 700 }}
          >
            <thead>
              <tr>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                >
                  <Text c="dimmed" fw={700} tt="uppercase">
                    TOKENS
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                >
                  <Text c="dimmed" fw={700} tt="uppercase">
                    Price (USD)
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                >
                  <Text c="dimmed" fw={700} tt="uppercase">
                    volume h24
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "email"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("email")}
                >
                  <Text c="dimmed" fw={700} tt="uppercase">
                    Liquidity
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "company"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("company")}
                >
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
