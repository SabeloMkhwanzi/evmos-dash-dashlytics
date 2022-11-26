import React from "react";
import { createStyles, Card, Container } from "@mantine/core";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const useStyles = createStyles((theme) => ({
  card: {
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
}));

const MarketcapChart = ({ marketCap }) => {
  const { classes } = useStyles();

  return (
    <>
      <Container py="xl">
        <Card
          p="md"
          radius="md"
          component="a"
          href="#"
          className={classes.card}
        >
          <BarChart
            margin={{
              top: 10,
              right: 0,
              left: 30,
              bottom: 0,
            }}
            width={500}
            height={300}
            data={marketCap}
          >
            <YAxis />
            <Tooltip />
            <XAxis dataKey="x" />
            <Bar
              type="monotone"
              dataKey="MarketCap"
              stroke="red"
              fill="#82ca9d"
            />
          </BarChart>
        </Card>
      </Container>
    </>
  );
};

export default MarketcapChart;
