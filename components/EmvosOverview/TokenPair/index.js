import React from "react";
import { useQuery } from "react-query";
import TokenPairTable from "./TokenPairTable";

export default function TokenPair() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmostokenpair"], async () => {
    //await new Promise((resolve) => (resolve, 1000));
    const res = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0xd4949664cd82660aae99bedc034a0dea8a0bd517"
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
      <TokenPairTable data={data} />
    </>
  );
}
