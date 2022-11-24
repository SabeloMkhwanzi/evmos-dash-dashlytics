import React, { useEffect } from "react";

import { Box, Button, useColorModeValue } from "@chakra-ui/react";

const TableFooter = ({ range, setPage, page, slice }) => {
  const BoxBgColor = useColorModeValue("#FFE5E5", "#142F43");
  const TextColor = useColorModeValue("#FC770A", "#FC770A");

  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <Box
      bgColor={BoxBgColor}
      padding="8px 0px"
      width="100%"
      fontWight="500"
      text-align="16px"
      color="gray.700"
      borderBottomLeftRadius="lg"
      borderBottomRightRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {range.map((el, index) => (
        <Button
          color={TextColor}
          p="7px 14px"
          border="1px"
          cursor="pointer"
          margin-right="4px"
          margin-left="4px"
          key={index}
          onClick={() => setPage(el)}
          _hover={{ bg: "gray.500" }}
          _active={{
            bg: "#FC770A",
            transform: "scale(0.98)",
            borderColor: "#FC770A",
          }}
        >
          {el}
        </Button>
      ))}
    </Box>
  );
};

export default TableFooter;
