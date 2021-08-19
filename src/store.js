import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  programListReducer,
  programDetailReducer,
  levelDeleteReducer
} from "./reducers/programReducers";
import { userLoginReducer, userListReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  programList: programListReducer,
  programDetail: programDetailReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  levelDelete: levelDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
