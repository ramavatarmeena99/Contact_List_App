import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import countactReducer from "./reducers";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["countactReducer"],
}; 

const rootReducer = combineReducers({
  countactReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer);

export const persistor = persistStore(store);



