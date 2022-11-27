import React from "react";
import { useQuery } from "react-query";
import TokenPairTable from "./TokenPairTable";
import { Loader, Center, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";

export default function TokenPair() {
  const { data, error, isFetching } = useQuery(["evmostokenpair"], async () => {
    const res = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/0xd4949664cd82660aae99bedc034a0dea8a0bd517"
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
      <TokenPairTable data={data} />
    </>
  );
}
