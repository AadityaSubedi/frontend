import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,

  
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_RESET
} from "../constants/userConstants";

import jwt_decode from "jwt-decode";
import axios from "axios";
import jwtDecode from "jwt-decode";
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/user/login",
      { username: username, password: password },
      config
    );

    let decoded = jwtDecode(data["data"]["access_token"]);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data["data"],...decoded },
    });
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...data["data"],...decoded })
    );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const  logout =() => (dispatch)=>{
localStorage.removeItem('userInfo')
dispatch({type:USER_LOGIN_LOGOUT })
dispatch({type:USER_LIST_RESET })
}



export const listUsers = () => async (dispatch,getState ) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: {userInfo},
    } = getState()

    const config = {
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${userInfo.access_token}`
      },
    };
    const { data } = await axios.get(
      "/user/register",
      config
    );

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data["data"] ,
    });

  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};