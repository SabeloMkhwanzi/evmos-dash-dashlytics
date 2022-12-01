import React from "react";
import { useQuery } from "react-query";
import { Center, Notification } from "@mantine/core";
import CronusStatsOverview from "./CronusStatsOverview";
import { IconX } from "@tabler/icons";
import LoaderComp from "../../../LoaderComp";

export default function CronusStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["cronusStats"], async () => {
    const res = await fetch(
      // coingecko API for Market Stats
      "https://api.coingecko.com/api/v3/coins/cronus-finance?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
    );
    return res.json();
  });

  //console.log(data);

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
          Error! Failed to Fetch Cronus Stats API
        </Notification>
      </Center>
    );
  return (
    <>
      <CronusStatsOverview data={data} />
    </>
  );
}
