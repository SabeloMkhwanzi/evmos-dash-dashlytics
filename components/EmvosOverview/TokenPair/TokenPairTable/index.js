import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Center,
  TextInput,
  Container,
  Card,
  SimpleGrid,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons";
import { HStack, Text } from "@chakra-ui/react";

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
    // "&:hover": {
    //   transform: "scale(1.01)",
    //   boxShadow: theme.shadows.md,
    // },
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

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(data, payload) {
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

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  const rows = sortedData?.pairs.map((row) => (
    <tr key={row.name}>
      <td>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <Text fontWeight="semibold">{row.baseToken.symbol}</Text>
          <Text fontWeight="semibold">{row.quoteToken.symbol}</Text>
          <Text fontSize="x-small" color="gray" size={1} px="md">
            {row.quoteToken.name}
          </Text>
        </SimpleGrid>
      </td>
      <td>
        <HStack>
          <Text textAlign="centre" fontWeight="semibold">
            ${formatCash(row.priceUsd)}
          </Text>
          <Text fontSize="small" color="gray">
            {row.dexId}
          </Text>
        </HStack>
      </td>
      <td>
        <Text textAlign="centre" fontWeight="semibold">
          ${formatCash(row.volume.h24)}
        </Text>
      </td>
      <td>
        <Text textAlign="centre" fontWeight="semibold">
          ${formatCash(row.liquidity.usd)}
        </Text>
      </td>
      <td>
        <Text textAlign="centre" fontWeight="semibold">
          ${formatCash(row.fdv)}
        </Text>
      </td>
    </tr>
  ));

  return (
    <Center>
      <Card width="600" className={classes.card}>
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
                  <Text fontWeight="bold" textTransform="uppercase">
                    TOKENS
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                >
                  <Text fontWeight="bold" textTransform="uppercase">
                    Price (USD)
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "name"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("name")}
                >
                  <Text fontWeight="bold" textTransform="uppercase">
                    volume h24
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "email"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("email")}
                >
                  <Text fontWeight="bold" textTransform="uppercase">
                    Liquidity
                  </Text>
                </Th>
                <Th
                  sorted={sortBy === "company"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("company")}
                >
                  <Text fontWeight="bold" textTransform="uppercase">
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
      </Card>
    </Center>
  );
}
