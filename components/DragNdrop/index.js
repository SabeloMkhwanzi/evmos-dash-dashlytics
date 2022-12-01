import React from "react";
import Draggable from "react-draggable";
import {
  Center,
  Container,
  createStyles,
  Box,
  Paper,
  Button,
} from "@mantine/core";
import CronusStats from "../DexSwapList/Cronus/CronusStats";
import CronusPools from "../DexSwapList/Cronus/CronusPools";

const useStyles = createStyles((theme) => ({
  mainLayout: {
    placeItems: "center",
    height: "100vh",
    width: "100vw",
  },

  customize: {
    position: "relative",
    border: "1px solid black",
    height: "800px",
    overflow: "hidden",
  },

  footer: {
    marginTop: 0.5,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
}));

function DrageNdrop() {
  const { classes } = useStyles();
  return (
    <div className={classes.mainLayout}>
      
    </div>
  );
}

export default DrageNdrop;

const DraggableComponents = () => {
  return (
    <>
      <Draggable>
        <Paper width="20%">
          <Box>
            {/* <CronusStats /> */}
          </Box>
        </Paper>
      </Draggable>
    </>
  );
};
