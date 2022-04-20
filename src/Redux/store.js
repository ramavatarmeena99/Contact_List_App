import { combineReducers, createStore } from "redux";
import countactReducer from "./reducers";

const rootReducer = combineReducers({
  countactReducer,
});

export const store = createStore(rootReducer);
