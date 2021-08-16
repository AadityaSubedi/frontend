import {
  PROGRAM_LIST_REQUEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,

  PROGRAM_DETAIL_REQUEST,
  PROGRAM_DETAIL_SUCCESS,
  PROGRAM_DETAIL_FAIL,
} from "../constants/programConstants";

import axios from "axios";
export const listPrograms = () => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_LIST_REQUEST });
    const { data } = await axios.get("/api/levels");

    dispatch({
      type: PROGRAM_LIST_SUCCESS,
      payload: data['data'],
    });
  } catch (error) {
    dispatch({
      type: PROGRAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listProgramDetail = (code) => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/program/${code}`);
    dispatch({
      type: PROGRAM_DETAIL_SUCCESS,
      payload: data['data'],
    });
  } catch (error) {
    dispatch({
      type: PROGRAM_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
