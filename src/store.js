import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  levelListReducer,

levelCreateReducer,
  searchListReducer,
  subjectDetailReducer,

  levelDeleteReducer,
  levelUpdateReducer,

  programListReducer,
  programCreateReducer,
  programDetailReducer,
  programUpdateReducer,

} from "./reducers/programReducers";

import { userLoginReducer, userListReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  levelList: levelListReducer,
  levelCreate: levelCreateReducer,
  levelUpdate: levelUpdateReducer,
  
  
  programList: programListReducer,
  programDetail: programDetailReducer,

  searchList: searchListReducer,
  subjectDetail: subjectDetailReducer,


  programCreate: programCreateReducer,
  programUpdate: programUpdateReducer,
  
  

  userLogin: userLoginReducer,
  userList: userListReducer,
  levelDelete: levelDeleteReducer,
});



const userInfoFromStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

// const dispatch = useDispatch()
  const initialState = {
    userLogin: {
      userInfo: userInfoFromStorage,
    },
  };
// dispatch(listPrograms());

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
