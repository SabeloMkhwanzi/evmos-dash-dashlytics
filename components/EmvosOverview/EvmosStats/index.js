import React from "react";
import { useQuery } from "react-query";
import EvmosStatsOverview from "./EvmosStatsOverview";
import { Center, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";
import LoaderComp from "../../LoaderComp";

const EvmosContractAddress = "0xd4949664cd82660aae99bedc034a0dea8a0bd517";

export default function EvmosStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmoStats"], async () => {
    const res = await fetch(
      // coingecko API for Market Stats
      `https://api.coingecko.com/api/v3/coins/evmos/contract/${EvmosContractAddress}`
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
