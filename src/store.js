import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  levelListReducer,
  programDetailReducer,
  levelDeleteReducer,
  programListReducer
} from "./reducers/programReducers";
import { userLoginReducer, userListReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  levelList: levelListReducer,
  programList: programListReducer,
  programDetail: programDetailReducer,
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
