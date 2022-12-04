import React from "react";
import { Button } from "@mantine/core";

import CronusStats from "../DexSwapList/Cronus/CronusStats";
import DiffusionStats from "../DexSwapList/Diffuison/DiffusionStats";
import EvmosStats from "../EmvosOverview/EvmosStats";
import EvmoswapStats from "../DexSwapList/Evmoswap/EvmoswapStats";
import DiffusionCharts from "../DexSwapList/Diffuison/DiffusionCharts";

import { WidthProvider, Responsive } from "react-grid-layout";
import DiffusionPools from "../DexSwapList/Diffuison/DiffusionPools";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class StatsDaggableLayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 2, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30,
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.resetLayout()}>Reset Layout</Button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 2, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={20}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 8, minH: 3 }}>
            <CronusStats />
          </div>
          <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 8, minH: 3 }}>
            <DiffusionStats />
          </div>
          <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 8, minH: 3 }}>
            <EvmosStats />
          </div>
          <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 8, minH: 3 }}>
            <EvmoswapStats />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

if (process.env.STATIC_EXAMPLES === true) {
  import("../../test/test-hook").then((fn) => fn.default(LocalStorageLayout));
}
