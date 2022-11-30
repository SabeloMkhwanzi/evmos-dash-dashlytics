import { Box } from "@chakra-ui/react";
import { Loader, Center, Notification, Text } from "@mantine/core";
import CronusTransactionsTable from "./CronusTransactionsTable";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";

//API Key
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function CronusTransactions() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(
    ["cronusTransactions"],
    async () => {
      const res = await fetch(
        `https://api.covalenthq.com/v1/9001/xy=k/cronus/tokens/address/0x1488346419ffc85c6d54e71be80a222971fb2240/transactions/?key=${APIKey}`
      );
      return res.json();
    }
  );

  const items3 = data?.data?.items;

  //console.log(items3);

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
        <Loader size="lg" color="blue" variant="bars" />
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
          Error! Failed to Fetch Cronus Transactions API
        </Notification>
      </Center>
    );

  return (
    <Box>
      <Box minWidth="1220" maxW="600" justifyItems="center" mx="auto" mb={20}>
        <Text fw={500}>Transactions</Text>
        <CronusTransactionsTable data={items3} />
      </Box>
    </Box>
  );
}
