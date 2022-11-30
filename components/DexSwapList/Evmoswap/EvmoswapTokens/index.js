import { Box } from "@chakra-ui/react";
import { Loader, Center, Notification, Text } from "@mantine/core";
import EvmoswapTokenTable from "./EvmoswapTokenTable";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";

//API Key
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function EvmoswapTokens() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmoswapTokens"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/9001/xy=k/evmoswap/tokens/?key=${APIKey}`
    );
    return res.json();
  });

  const items2 = data?.data?.items;

  //console.log(items2);

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
        <Loader ssize="lg" color="blue" variant="bars" />
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
          Error! Failed to Fetch Evmoswap Tokens API
        </Notification>
      </Center>
    );

  return (
    <Box>
      <Box minWidth="1220" maxW="600" justifyItems="center" mx="auto" mb={20}>
        <Text fw={500}>Top Tokens</Text>
        <EvmoswapTokenTable data={items2} />
      </Box>
    </Box>
  );
}
