import React from "react";
import {
  createStyles,
  Container,
  Paper,
  Space,
  Text,
  Flex,
  Button,
} from "@mantine/core";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const useStyles = createStyles((theme) => ({
  Paper: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    width: 590,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  tooltip: {
    borderRadius: "0.25rem",
    background: "#26313c",
    color: "#fff",
    padding: "1rem",
    boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
    extalign: "center",
  },
}));

export default function EvmoswapVolumeChart({ EvmoswapVolume }) {
  const { classes } = useStyles();
  var numbro = require("numbro");

  return (
    <>
      <Container py="xl">
        <Paper
          withBorder
          p="md"
          radius="md"
          component="a"
          href="#"
          className={classes.Paper}
        >
          <Flex justify="center" align="center" direction="row">
            <Text fw="bold">Volume Chart</Text>
          </Flex>
          <Flex
            mih={30}
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
          >
            <Button variant="default" compact>
              30D
            </Button>
          </Flex>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={EvmoswapVolume}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4C6793" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#4C6793" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area dataKey="Y" stroke="#4C6793" fill="url(#color)" />
              <XAxis axisLine={false} tickLine={false} dataKey="X" />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickCount={8}
                tickFormatter={(number) =>
                  numbro(number).formatCurrency({
                    average: true,
                    mantissa: 1,
                    optionalMantissa: true,
                  })
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </>
  );
}

function CustomTooltip({ active, payload, label }) {
  const { classes } = useStyles();
  var numbro = require("numbro");
  if (active) {
    return (
      <Container spacing="xs" className={classes.tooltip}>
        <Text>{label}</Text>
        <Space h="x-small" />
        <Text>
          {numbro(payload[0].value).formatCurrency({
            average: true,
          })}
        </Text>
      </Container>
    );
  }
  return null;
}
