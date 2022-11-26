import React from "react";
import { useQuery } from "react-query";
import moment from "moment";
import MarketcapChart from "./MarketcapChart";
import PriceChart from "./PriceChart";
import { SimpleGrid } from "@mantine/core";
import { Flex } from "@chakra-ui/react";
import TokenPair from "./TokenPair";

export default function EmvosOverview() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["ecosystem"], async () => {
    //await new Promise((resolve) => (resolve, 1000));
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/evmos/market_chart?vs_currency=usd&days=120&interval=daily"
    );
    return res.json();
  });

  // console.log(
  //   data?.prices.map((item) => ({
  //     x: moment(item[0]).format("MMM Do YY"),
  //     line: item[1],
  //   }))
  // );

  // console.log(
  //   data?.market_caps.map((item) => ({
  //     x: moment(item[0]).format("MMM Do YY"),
  //     line: item[1],
  //   }))
  // );

  // console.log(
  //   data?.total_volumes.map((item) => ({
  //     x: moment(item[0]).format("MMM Do YY"),
  //     line: item[1],
  //   }))
  // );

  if (isFetching) {
    return "Loading...";
  } //<Progress size="xs" isIndeterminate />;

  if (error) {
    return "Error" + error.message;
  }

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Chart data for Evmos market_caps
  const marketCap = data?.market_caps.map((item) => ({
    x: moment(item[0]).format("MMM Do"),
    MarketCap: formatCash(item[1]),
  }));

  // Chart data for Evmos Total Volumes
  const totalVolumes = data?.total_volumes.map((item) => ({
    x: moment(item[0]).format("MMM Do"),
    Volumes: item[1],
  }));

  // Chart data for Evmos price
  const prices = data?.prices.map((item) => ({
    x: moment(item[0]).format("MMM Do"),
    Price: item[1],
  }));

  return (
    <>
      <Flex justifyContent="space-evenly">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <PriceChart prices={prices} />
          <MarketcapChart marketCap={marketCap} />
        </SimpleGrid>
      </Flex>
      <TokenPair />
    </>
  );
}
