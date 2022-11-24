import { useState, useEffect } from "react";

import { Box, useColorModeValue, Text } from "@chakra-ui/react";

import LiquidityChart from "./LiquidityChart";
import VolumeChart from "./VolumeChart";
import Overview from "./Overview";
import Pools from "./Pools";
import Tokens from "./Token";
import DiffusionOverview from "../Diffuison/DiffusionOverview";

function Analytics() {
  const [items, setItems] = useState([]);
  const [liquidGraph, setLiquidGraph] = useState([]);
  const [volumeGraph, setVolumeGraph] = useState([]);
  const BoxBgColor = useColorModeValue("#FFE5E5", "#142F43");
  const HeadingTextColorMode = useColorModeValue("black", "White");

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  useEffect(() => {
    getApi();
    items;
    liquidGraph;
    volumeGraph;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handle Ecosystem data
  const getApi = async (e) => {
    const response = await fetch(
      "https://api.covalenthq.com/v1/9001/xy=k/cronus/ecosystem/?&key=ckey_d6d4af1461ba4409b006c1558ec"
    );
    const data = await response.json();
    setItems(data.data.items);
    setLiquidGraph(
      data.data.items[0].liquidity_chart_7d
        .map((item) => ({
          x: new Date(item.dt).toLocaleDateString(),
          y: formatCash(item.liquidity_quote),
        }))
        .reverse()
    );
    setVolumeGraph(
      data.data.items[0].volume_chart_7d
        .map((item) => ({
          x: new Date(item.dt).toLocaleDateString(),
          y: formatCash(item.volume_quote),
        }))
        .reverse()
    );
  };

  return (
    <Box>
      <Box>
        <Text
          mt="1%"
          mx="10%"
          fontSize="2xl"
          fontWeight="semibold"
          color={HeadingTextColorMode}
        >
          Analytics
        </Text>
        <Text mx="10%" fontSize="xl" fontWeight="normal" color="gray.400">
          Overview
        </Text>
        <Overview data={items} />
        <Box
          mx="auto"
          my={5}
          px={5}
          ps={5}
          py={5}
          bg={BoxBgColor}
          rounded="md "
          borderRadius="lg"
          h="450px"
          maxW="1000"
          boxShadow="0px 5px 25px 0px rgba(0, 0, 0, .25);"
        >
          <LiquidityChart data={liquidGraph} />
        </Box>
        <Box
          mx="auto"
          my={5}
          px={5}
          ps={5}
          py={5}
          bg={BoxBgColor}
          rounded="md "
          borderRadius="lg"
          h="450px"
          maxW="1000"
          boxShadow="0px 5px 25px 0px rgba(0, 0, 0, .25);"
        >
          <VolumeChart data={volumeGraph} />
          {/* <Pools /> */}
          {/* <Tokens /> */}
        </Box>
      </Box>
    </Box>
  );
}
export default Analytics;
