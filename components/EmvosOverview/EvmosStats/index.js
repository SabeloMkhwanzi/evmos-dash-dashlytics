import React from "react";
import { useQuery } from "react-query";
import EvmosStatsOverview from "./EvmosStatsOverview";
import { Loader, Center, Notification } from "@mantine/core";

import { IconX } from "@tabler/icons";

export default function EvmosStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmostats"], async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/evmos/contract/0xd4949664cd82660aae99bedc034a0dea8a0bd517"
    );
    return res.json();
  });

  //console.log(data);

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
        <Loader size="md" color="grape" variant="bars" />
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
      <EvmosStatsOverview data={data} />
    </>
  );
}
