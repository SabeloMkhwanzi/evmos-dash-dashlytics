import React from "react";
import { Box } from "@chakra-ui/react";
import { Center, Notification, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import EvmoswapPoolsOverviewTable from "./EvmoswapPoolsOverviewTable";
import LoaderComp from "../../../../LoaderComp";

//COVALENT API Key
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function EvmoswapPoolsOverview() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(
    ["evmoswapPoolsOverview"],
    async () => {
      const res = await fetch(
        `https://api.covalenthq.com/v1/9001/xy=k/evmoswap/pools/?key=${APIKey}`
      );
      return res.json();
    }
  );

  const items = data?.data?.items;

  if (isFetching)
    return (
      <LoaderComp />
    );

  if (error)
    return (
      <Center
        style={{
          width: "100%",
          height: "20%",

          left: "0px",
          top: "0px",
        }}
      >
        <Notification icon={<IconX size={18} />} color="red">
          Error! Failed to Fetch Evmoswap Pool API
        </Notification>
      </Center>
    );

  return (
    <Box>
      <Box minWidth="1220" maxW="600" justifyItems="center" mx="auto" mb="20">
        <Text fw={500}>Top Pairs</Text>
        <EvmoswapPoolsOverviewTable data={items} />
      </Box>
    </Box>
  );
}
