import { combineReducers } from "redux";
import counterReducer from "./reducers/counter";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
});

export default rootReducer;
