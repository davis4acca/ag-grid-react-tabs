import { TabPanel } from "react-tabs";
import MyGrid from "./MyGrid";
import React from "react";

export default function GridPanelsList({ allGrids, className }) {
  let tabPanels = allGrids.map((grid) => {
    return (
      <TabPanel key={grid.id}>
        <MyGrid className={className} {...grid} />
      </TabPanel>
    );
  });

  // Tabs must match tabPanels therefore we need to create a panel for the (ADD TAB / TAB)
  let lastPanel = <TabPanel key="last-tab-panel"></TabPanel>;
  tabPanels.push(lastPanel);

  return tabPanels;
}
