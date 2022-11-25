import React from "react";
import { SimpleGrid, Text, Box, Center } from "@chakra-ui/react";
import { createStyles, Card } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },
}));

export default function TokenOverview({ data }) {
  const { classes } = useStyles();

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  return (
    <Center justifyContent="center">
      <Box>
        <Card withBorder radius="xl" p={0} px="lg">
          {data.map((item) => (
            <SimpleGrid columns={[1, null, 3]} key={item.index}>
              <Box w={320} maxW="xs">
                <Text
                  transform="uppercase"
                  color="dimmed"
                  fontWeight={500}
                  size="md"
                  textAlign="center"
                >
                  Total Fees(24h)
                </Text>
                <Text textAlign="center" className={classes.title}>
                  ${formatCash(item.total_fees_24h)}
                </Text>
              </Box>
              <Box w="full" maxW="xs">
                <Text
                  transform="uppercase"
                  color="dimmed"
                  fontWeight={500}
                  size="md"
                  textAlign="center"
                >
                  Total Pairs (7d)
                </Text>
                <Text textAlign="center" className={classes.title}>
                  {item.total_active_pairs_7d}
                </Text>
              </Box>
              <Box w="full" maxW="xs">
                <Text
                  transform="uppercase"
                  color="dimmed"
                  fontWeight={500}
                  size="md"
                  textAlign="center"
                >
                  Total Swaps (24h)
                </Text>
                <Text textAlign="center" className={classes.title}>
                  {item.total_swaps_24h}
                </Text>
              </Box>
            </SimpleGrid>
          ))}
        </Card>
      </Box>
    </Center>
  );
}
