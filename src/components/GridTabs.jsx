import React from "react";

import GridTab from "./GridTab";
import { Tab } from "react-tabs";

export default function GridTabs(props) {
  let allTabs = props.allGrids.map((grid, index) => (
    <Tab key={grid.id}>
      <GridTab
        viewId={props.currentView.id}
        gridId={grid.id}
        gridName={grid.name}
        index={index}
      ></GridTab>
    </Tab>
  ));

  // Creates a tab for adding new tabs
  allTabs.push(
    <Tab
      onClick={(e) => {
        e.stopPropagation();
        // only creates a new tab if the click is coming from the button not the tab
        if (e.target.tagName === "BUTTON") props.onAddNewTab();
      }}
      key="last-tab"
    >
      <button className={"add-tab-btn"}> + </button>
    </Tab>
  );

  return allTabs;
}
