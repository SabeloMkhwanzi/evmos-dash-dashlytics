import React from "react";
import { createStyles, Container, Paper } from "@mantine/core";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
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
}));

export default function CronusVolumeChart({ CronusVolume }) {
  const { classes } = useStyles();

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
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              margin={{
                top: 10,
                right: 0,
                left: 30,
                bottom: 0,
              }}
              width={500}
              height={300}
              data={CronusVolume}
            >
              <YAxis />
              <Tooltip />
              <XAxis dataKey="X" />
              <Area type="monotone" dataKey="Y" stroke="red" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Container>
    </>
  );
}
