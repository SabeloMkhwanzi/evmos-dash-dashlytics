import React from "react";
import { Loader, Center, Notification, Text, SimpleGrid } from "@mantine/core";
import { Flex } from "@chakra-ui/react";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import moment from "moment";
import EvmoswapLiquidityChart from "./EvmoswapLiquidityChart";
import EvmoswapVolumeChart from "./EvmoswapVolumeChart";
import EvmoswapStats from "./EvmoswapStats";

//API Key
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function EvmoswapOverview() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmoswapEco"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/9001/xy=k/evmoswap/ecosystem/?&key=${APIKey}`
    );
    return res.json();
  });
  //console.log(data?.data?.items);

  // Chart data for Evmos market_caps
  const EvmoswapLiquidity = data?.data?.items[0].liquidity_chart_30d.map(
    (item) => ({
      X: moment(item.dt).format("MMM Do"),
      Y: item.liquidity_quote,
    })
  );

  const EvmoswapVolume = data?.data?.items[0].volume_chart_30d.map((item) => ({
    X: moment(item.dt).format("MMM Do"),
    Y: item.volume_quote,
  }));

  if (isFetching)
    return (
      <Center
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: "0px",
          top: "0px",
        }}
      >
        <Loader size="xl" color="grape" variant="bars" />
      </Center>
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
        Evmoswap Analytics
      </Text>
      <Flex justifyContent="space-evenly">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <EvmoswapVolumeChart EvmoswapVolume={EvmoswapVolume} />
          <EvmoswapLiquidityChart EvmoswapLiquidity={EvmoswapLiquidity} />
        </SimpleGrid>
      </Flex>
      <EvmoswapStats />
    </>
  );
}
