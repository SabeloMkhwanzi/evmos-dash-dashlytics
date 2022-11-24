import { useState, useEffect } from "react";
import { Box, useColorModeValue, Text } from "@chakra-ui/react";
import TableToken from "./TokenTable";

function Tokens() {
  const [items, setItems] = useState([]);
  const HeadingTextColorMode = useColorModeValue("black", "White");

  useEffect(() => {
    getPools();

    items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPools = async () => {
    const response = await fetch(
      "https://api.covalenthq.com/v1/9001/xy=k/cronus/tokens/?&key=ckey_d6d4af1461ba4409b006c1558ec"
    );
    const data = await response.json();
    setItems(data?.data?.items);
  };

  return (
    <Box>
      <Text
        mt="1%"
        mx="10%"
        fontSize="2xl"
        fontWeight="semibold"
        color={HeadingTextColorMode}
      >
        Claimswap Tokens Analytics
      </Text>
      <Text mx="10%" fontSize="xl" fontWeight="normal" color="gray.400">
        Overview
      </Text>
      <Box minWidth="1000" maxW="600" justifyItems="center" mx="auto">
        <TableToken data={items} rowsPerPage={9} />
      </Box>
    </Box>
  );
}

export default Tokens;
