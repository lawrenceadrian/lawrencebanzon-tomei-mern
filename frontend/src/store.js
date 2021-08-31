import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { signupReducer } from "./reducers/signupReducers.js";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  userRegister: signupReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
