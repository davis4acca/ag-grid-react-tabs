import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/gridActions";

function ActionButtons(props) {
  const dispatch = useDispatch();

  function addNewTab() {
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

    dispatch(actions.createNewTab(gridConfig));
  }

  return (
    <div className={"action-btn-container"}>
      <Button
        className={"action-btn"}
        onClick={() => dispatch(actions.saveStoreStateToLocalStorage())}
        variant="outlined"
        color="primary"
        size="large"
      >
        SAVE STORE TO LOCAL STORAGE
      </Button>

      <Button
        className={"action-btn"}
        onClick={() => dispatch(actions.createNewView())}
        variant="outlined"
        color="primary"
        size="large"
      >
        ADD NEW VIEW
      </Button>

      <Button
        onClick={() => localStorage.clear()}
        className={"action-btn"}
        variant="outlined"
        color="primary"
        size="large"
      >
        CLEAR LOCAL STORAGE
      </Button>

      <Button
        className={"action-btn"}
        onClick={() => addNewTab()}
        variant="outlined"
        color="primary"
        size="large"
      >
        ADD NEW TAB
      </Button>
    </div>
  );
}

export default React.memo(ActionButtons);
