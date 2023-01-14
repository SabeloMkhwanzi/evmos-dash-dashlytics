import React from "react";
import { useQuery } from "react-query";
import moment from "moment";
import MarketcapChart from "./MarketcapChart";
import PriceChart from "./PriceChart";
import { SimpleGrid, Center, Notification, Text } from "@mantine/core";
import { Flex } from "@chakra-ui/react";
import TokenPair from "./TokenPair";
import EvmosStats from "./EvmosStats";
import { IconX } from "@tabler/icons";
import LoaderComp from "../LoaderComp";

export default function EmvosOverview() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["ecosystem"], async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/evmos/market_chart?vs_currency=usd&days=183&interval=daily"
    );
    return res.json();
  });

  // Chart data for Evmos market_caps
  const marketCap = data?.market_caps.map((item) => ({
    x: moment(item[0]).format("MMM Do"),
    MarketCap: item[1],
  }));

  // Chart data for Evmos Total Volumes ==> not applied
  // const totalVolumes = data?.total_volumes.map((item) => ({
  //   x: moment(item[0]).format("MMM Do"),
  //   Volumes: item[1],
  // }));

  // Chart data for Evmos price
  const prices = data?.prices.map((item) => ({
    x: moment(item[0]).format("MMM Do"),
    Price: item[1],
  }));

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
          Error! Failed to Fetch API
        </Notification>
      </Center>
    );

  return (
    <>
      <Text c="dimmed" fz="xl" tt="uppercase">
        Evmos Analytics
      </Text>
      <Flex justifyContent="space-evenly">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <PriceChart prices={prices} />
          <MarketcapChart marketCap={marketCap} />
        </SimpleGrid>
      </Flex>
      <EvmosStats />
      <TokenPair />
    </>
  );
}
