import React from "react";
import { useQuery } from "react-query";
import DiffusionStatsOverview from "./DiffusionStatsOverview";
import { Loader, Center, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";

//const DiffusionContractAddress = "0x3f75ceabcdfed1aca03257dc6bdc0408e2b4b026";

export default function DiffusionStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["diffusionStats"], async () => {
    const res = await fetch(
      // coingecko API for Market Stats
      "https://api.coingecko.com/api/v3/coins/diffusion?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
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
      <DiffusionStatsOverview data={data} />
    </>
  );
}
