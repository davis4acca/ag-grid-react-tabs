import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import gridReducer from "./reducers/gridReducer";
import logger from "redux-logger";

import thunk from "redux-thunk";

let initialState;
let cache = window.localStorage.getItem("cache");

if (cache) {
  let cacheParsed = JSON.parse(cache);
  initialState = { ...cacheParsed };
} else {
  initialState = {
    currentViewInfo: null,
    allViews: [],
  };
}

export default createStore(
  gridReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
  // composeWithDevTools(applyMiddleware(thunk, logger))
);
