import React from "react";

import {
  chakra,
  Box,
  useColorModeValue,
  SimpleGrid,
  Text,
  Progress,
} from "@chakra-ui/react";
import { useQuery } from "react-query";

export default function DiffusionOverview() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["ecosystem"], async () => {
    //await new Promise((resolve) => (resolve, 1000));
    const res = await fetch(
      "https://api.covalenthq.com/v1/9001/xy=k/diffusion/ecosystem/?&key=ckey_d6d4af1461ba4409b006c1558ec"
    );
    return res.json();
  });
  console.log(data?.data?.items);

  if (isFetching) {
    return "Loading...";
  } //<Progress size="xs" isIndeterminate />;

  if (error) {
    return "Error" + error.message;
  }

  return (
    <div>
      {data?.data?.items.map((ecosystem, index) => (
        <div key={index}>{ecosystem.gas_token_price_quote}</div>
      ))}
    </div>
  );
}
