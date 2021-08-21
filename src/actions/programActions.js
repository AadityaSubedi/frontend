import {
  LEVEL_LIST_REQUEST,
  LEVEL_LIST_SUCCESS,
  LEVEL_LIST_FAIL,

  PROGRAM_LIST_REQUEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,

  PROGRAM_DETAIL_REQUEST,
  PROGRAM_DETAIL_SUCCESS,
  PROGRAM_DETAIL_FAIL,

LEVEL_CREATE_REQUEST,
LEVEL_CREATE_SUCCESS,
LEVEL_CREATE_FAIL,
LEVEL_CREATE_RESET,

LEVEL_UPDATE_REQUEST,
LEVEL_UPDATE_SUCCESS,
LEVEL_UPDATE_FAIL,
LEVEL_UPDATE_RESET,

 PROGRAM_CREATE_REVIEW_REQUEST,
 PROGRAM_CREATE_REVIEW_SUCCESS,
 PROGRAM_CREATE_REVIEW_FAIL,
 PROGRAM_CREATE_REVIEW_RESET,

  LEVEL_DELETE_REQUEST,
  LEVEL_DELETE_SUCCESS,
  LEVEL_DELETE_FAIL,

} from "../constants/programConstants";

import axios from "axios";
export const listLevels = (level) => async (dispatch) => {
  try {
    dispatch({ type: LEVEL_LIST_REQUEST });
    const { data } = await axios.get(`/api/levels`);
    dispatch({
      type: LEVEL_LIST_SUCCESS,
      payload: data['data'],
    });
  } catch (error) {
    dispatch({
      type: LEVEL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};





export const listPrograms = (level) => async (dispatch) => {
  try {
    dispatch({ type: PROGRAM_LIST_REQUEST });
    const { data } = await axios.get(`/api/level/${level}`);

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


export const deleteLevel = (id) => async (dispatch, getState) => {
  try {
      dispatch({
          type: LEVEL_DELETE_REQUEST
      })

      const {
          userLogin: { userInfo },
      } = getState()

      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }
      }

      const { data } = await axios.delete(
          `/api/level/${id}`,
          config
      )

      dispatch({
          type: LEVEL_DELETE_SUCCESS,
      })


  } catch (error) {
      dispatch({
          type: LEVEL_DELETE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}




export const createLevel = () => async (dispatch, getState) => {
  try {
      dispatch({
          type: LEVEL_CREATE_REQUEST
      })

      const {
          userLogin: { userInfo },
      } = getState()

      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }
      }

      const { data } = await axios.post(
          `/api/levels`,
          {},
          config
      )
      dispatch({
          type: LEVEL_CREATE_SUCCESS,
          payload: data,
      })


  } catch (error) {
      dispatch({
          type: LEVEL_CREATE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}





export const updateLevel = (level) => async (dispatch, getState) => {
  try {
      dispatch({
          type: LEVEL_UPDATE_REQUEST
      })

      const {
          userLogin: { userInfo },
      } = getState()

      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }
      }

      const { data } = await axios.put(
          `/api/level/${level._id['$oid']}`,
          level,
          config
      )
      dispatch({
          type: LEVEL_UPDATE_SUCCESS,
          payload: data,
      })


      // dispatch({
      //     type: LEVEL_DETAILS_SUCCESS,
      //     payload: data
      // })


  } catch (error) {
      dispatch({
          type: LEVEL_UPDATE_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}
