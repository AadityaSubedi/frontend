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



  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,  



  PROGRAM_CREATE_REQUEST,
  PROGRAM_CREATE_SUCCESS,
  PROGRAM_CREATE_FAIL,
  PROGRAM_CREATE_RESET,

  LEVEL_UPDATE_REQUEST,
  LEVEL_UPDATE_SUCCESS,
  LEVEL_UPDATE_FAIL,
  LEVEL_UPDATE_RESET,

PROGRAM_UPDATE_REQUEST,
PROGRAM_UPDATE_SUCCESS,
PROGRAM_UPDATE_FAIL,
PROGRAM_UPDATE_RESET,




  PROGRAM_CREATE_REVIEW_REQUEST,
  PROGRAM_CREATE_REVIEW_SUCCESS,
  PROGRAM_CREATE_REVIEW_FAIL,
  PROGRAM_CREATE_REVIEW_RESET,
  LEVEL_DELETE_REQUEST,
  LEVEL_DELETE_SUCCESS,
  LEVEL_DELETE_FAIL,


  SUBJECT_DETAIL_REQUEST,
  SUBJECT_DETAIL_SUCCESS,
  SUBJECT_DETAIL_FAIL,


  PROGRAM_DELETE_REQUEST,
  PROGRAM_DELETE_SUCCESS,
  PROGRAM_DELETE_FAIL,

  BULK_CREATE_REQUEST,
  BULK_CREATE_SUCCESS,
  BULK_CREATE_FAIL,

} from "../constants/programConstants";


import axios from "axios";
export const listLevels = () => async (dispatch) => {
  try {
    dispatch({ type: LEVEL_LIST_REQUEST });
    const { data } = await axios.get(`/api/levels`);
    dispatch({
      type: LEVEL_LIST_SUCCESS,
      payload: data["data"],
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
    // console.log("me")
    dispatch({
      type: PROGRAM_LIST_SUCCESS,
      payload: data["data"],
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
      payload: data["data"],
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


export const listSearchData = (searchType, searchValue) => async (dispatch) => {
  try {

    dispatch({ type: SEARCH_REQUEST });
    const { data } = await axios.get(`/api/search/${searchType}/${searchValue}`);
console.log(data["data"])
    dispatch({
      type: SEARCH_SUCCESS,
      payload: data['data'],
    });
  } catch (error) {
    dispatch({
      type: SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listSubjectDetail = (code) => async (dispatch) => {
  try {
    dispatch({ type: SUBJECT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/subject/${code}`);
    
    dispatch({
      type: SUBJECT_DETAIL_SUCCESS,
      payload: data['data'],
    });
  } catch (error) {
    dispatch({
      type: SUBJECT_DETAIL_FAIL,
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
      type: LEVEL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();


    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/level/${id}`, config);

    dispatch({
      type: LEVEL_DELETE_SUCCESS,
    });

  } catch (error) {
    dispatch({
      type: LEVEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};





export const deleteProgram = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROGRAM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/program/${id}`, config);

    dispatch({
      type: PROGRAM_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROGRAM_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createLevel = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEVEL_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access_token}`,
      },
    };

    const { data } = await axios.post(`/api/levels`, {}, config);
    dispatch({
      type: LEVEL_CREATE_SUCCESS,
      payload: data['data'],
    });
  } catch (error) {
    dispatch({
      type: LEVEL_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};





export const createProgram = (levelCode =null) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROGRAM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/programs`, {levelCode:levelCode}, config);
    dispatch({
      type: PROGRAM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROGRAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



export const updateLevel = (level) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEVEL_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    delete(level.image)

    const formData = new FormData();
    for (const [key, value] of Object.entries(level)) {
      if (key === "_id") continue;
      if (typeof value === "object" && key !=="file")
        formData.append(key, JSON.stringify(value));
      else {
        formData.append(key, value);
      }
    }

    const { data } = await axios.put(
      `/api/level/${level._id["$oid"]}`,
      formData,
      config
    );

    dispatch({
      type: LEVEL_UPDATE_SUCCESS,
      payload: level,
    });

    // dispatch({
    //   type: PROGRAM_LIST_SUCCESS,
    //   payload: level,
    // });
  } catch (error) {
    dispatch({
      type: LEVEL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};






export const updateProgram = (program) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROGRAM_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    delete(program.image)

    const formData = new FormData();
    for (const [key, value] of Object.entries(program)) {
      if (key === "_id") continue;
      if (typeof value === "object" && key !=="file")
        formData.append(key, JSON.stringify(value));
      else {
        formData.append(key, value);
      }
    }

    const { data } = await axios.put(
      `api/program/${program._id["$oid"]}`,
      formData,
      config
    );

    dispatch({
      type: PROGRAM_UPDATE_SUCCESS,
      payload: program,
    });

    // dispatch({
    //   type: PROGRAM_LIST_SUCCESS,
    //   payload: level,
    // });
  } catch (error) {
    dispatch({
      type: PROGRAM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



export const createBulkSyllabus = ({subLevel, datafile, syllabus}) => async (dispatch, getState={}) => {
  try {
    dispatch({
      type: BULK_CREATE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append('level', subLevel);
    formData.append("csv_file", datafile);
    for (const csv in syllabus){
      formData.append([csv.name],csv);
    }
    
    console.log("after")
    const { data } = await axios.post(
      `api/bulk/syllabus`,
      formData,
      config
    );

    dispatch({
      type: BULK_CREATE_SUCCESS,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: BULK_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createBulkSubject = ({ datafile }) => async (dispatch, getState={}) => {
  try {
    dispatch({
      type: BULK_CREATE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("csv_file", datafile);
    console.log("after")
    const { data } = await axios.post(
      `api/bulk/subject`,
      formData,
      config
    );

    dispatch({
      type: BULK_CREATE_SUCCESS,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: BULK_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
