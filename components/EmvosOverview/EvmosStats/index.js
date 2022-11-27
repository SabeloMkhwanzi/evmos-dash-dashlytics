import React from "react";
import { useQuery } from "react-query";
import EvmosStatsOverview from "./EvmosStatsOverview";

export default function EvmosStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmostats"], async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/evmos/contract/0xd4949664cd82660aae99bedc034a0dea8a0bd517"
    );
    return res.json();
  });

  //console.log(data);

  if (isFetching) {
    return "Loading...";
  } //<Progress size="xs" isIndeterminate />;

  if (error) {
    return "Error" + error.message;
  }

  return (
    <>
      <EvmosStatsOverview data={data} />
    </>
  );
}

//market_data.current_price.usd;

// Contractinfo, image.thumb, name, symbol;
// market_data.current_price.usd, market_cap_change_percentage_24h;

// market_data.market_cap.usd;

// market_data.total_volume.usd;

// platforms.evmos;

// blockchain_site;

// last_updated;

// homepage;

{
  /* <EvmosStatsOverview data={data} /> */
}
