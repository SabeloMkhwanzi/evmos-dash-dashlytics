import {
  Avatar,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

import useTable from "../../../../../hooks/useTable";
import PoolFooter from "./PoolFooter";

const PoolTable = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const BoxBgColor = useColorModeValue("#FFE5E5", "#142F43");
  const TextColor = useColorModeValue("gray.900", "gray.900");
  const TextColorMode = useColorModeValue("gray.500", "gray.400");
  const TrColorMode = useColorModeValue("#EEEEEE", "#5F939A");

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  return (
    <>
      <Table variant="simple">
        <Thead
          bgColor={BoxBgColor}
          transition="all 0.25s ease"
          borderRadius="md"
        >
          <Tr>
            <Th
              color={TextColorMode}
              p="12px"
              fontWeight="sm"
              fontStyle="normal"
              textAlign="left"
              borderTopLeftRadius="lg"
            >
              Contract Name
            </Th>
            <Th
              color={TextColorMode}
              p="12px"
              fontWeight="sm"
              fontStyle="normal"
              bgColor
            >
              Ticker Symbol
            </Th>
            <Th
              color={TextColorMode}
              p="12px"
              fontWeight="sm"
              fontStyle="normal"
              bgColor
            >
              Quote Rate
            </Th>
            <Th
              color={TextColorMode}
              p="12px"
              fontWeight="sm"
              fontStyle="normal"
              bgColor
            >
              Swap Count (24h)
            </Th>
            <Th
              color={TextColorMode}
              p="12px"
              fontWeight="sm"
              fontStyle="normal"
              bgColor
              borderTopRightRadius="lg"
            >
              Total Liquidity
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {slice.map((el) => (
            <Tr bg={TrColorMode} cursor="auto" key={el.id}>
              <Td p="12px" fontSize="md" fontWeight="bold" color={TextColor}>
                <Stack direction="row">
                  <Avatar name={el.logo_url} src={el.logo_url} />
                  {el.contract_name}
                </Stack>
              </Td>
              <Td P="12px" fontWeight="bold" fontSize="sm" color={TextColor}>
                {el.contract_ticker_symbol}
              </Td>
              <Td P="12px" fontSize="sm" fontWeight="bold" color={TextColor}>
                ${formatCash(el.quote_rate)}
              </Td>
              <Td P="12px" fontSize="sm" fontWeight="bold" color={TextColor}>
                {el.swap_count_24h}
              </Td>
              <Td P="12px" fontSize="sm" fontWeight="bold" color={TextColor}>
                ${formatCash(el.total_liquidity_quote)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PoolFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default PoolTable;
