import React from "react";
import { useQuery } from "react-query";
import EvmoswapStatsOverview from "./EvmoswapStatsOverview";
import { Loader, Center, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";

export default function EvmoswapStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmoswapStats"], async () => {
    const res = await fetch(
      // coingecko API for Market Stats
      "https://api.coingecko.com/api/v3/coins/evmoswap?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
    );
    return res.json();
  });

  console.log(data);

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
        <Loader size="xs" color="grape" variant="bars" />
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
      {" "}
      <EvmoswapStatsOverview data={data} />
    </>
  );
}
