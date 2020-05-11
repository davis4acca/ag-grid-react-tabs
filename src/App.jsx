import React, { Component } from "react";
import "./App.css";
import { TabList, Tabs } from "react-tabs";
import { connect } from "react-redux";
import "react-tabs/style/react-tabs.css";
import { bindActionCreators } from "redux";
import { actions } from "./reducers/gridActions";

import AllViews from "./components/AllViews";
import {
  getCurrentViewTabIndex,
  getCurrentViewAllGrids,
  getCurrentView,
} from "./reducers/selectors";
import GridPanelsList from "./components/GridPanelsList";
import GridTabs from "./components/GridTabs";
class App extends Component {
  addNewTab(event) {
    let url =
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json";
    let columnDefs = [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ];

    let gridConfig = {
      url: url,
      columnDefs,
    };

    this.props.actions.createNewTab(gridConfig);
  }

  render() {
    return (
      <React.Fragment>
        <button
          className="action-button"
          onClick={this.props.actions.saveStoreStateToLocalStorage}
        >
          SAVE STORE TO LOCAL STORAGE
        </button>

        <button
          className="action-button"
          onClick={this.props.actions.createNewView}
        >
          ADD NEW VIEW
        </button>

        <div className="flex-container">
          <AllViews className="all-views"></AllViews>
          <Tabs
            className="tabs-container"
            selectedIndex={this.props.currentViewTabIndex}
            onSelect={(index) => {
              this.props.actions.changeTab(index);
            }}
          >
            {/* Using a function instead of <Component> because of React Tabs issue: https://github.com/reactjs/react-tabs/issues/253#issuecomment-407282036  */}

            <TabList>
              {GridTabs({
                allGrids: this.props.currentViewAllGrids,
                currentView: this.props.currentView,
                onAddNewTab: this.addNewTab.bind(this),
              })}
            </TabList>

            {GridPanelsList({
              allGrids: this.props.currentViewAllGrids,
              className: "grid-panel",
            })}
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allViews: state.allViews,
    currentViewInfo: state.currentViewInfo,
    currentViewAllGrids: getCurrentViewAllGrids(state),
    currentViewTabIndex: getCurrentViewTabIndex(state),
    currentView: getCurrentView(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
