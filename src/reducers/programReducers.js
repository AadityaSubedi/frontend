import {
  PROGRAM_DETAIL_REQUEST,
  PROGRAM_DETAIL_SUCCESS,
  PROGRAM_DETAIL_FAIL,
  LEVEL_LIST_REQUEST,
  LEVEL_LIST_SUCCESS,
  LEVEL_LIST_FAIL,
  PROGRAM_LIST_REQUEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,
  PROGRAM_LIST_RESET,
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
// export above constants from the separate file

export const levelListReducer = (state = { levels: [] }, action) => {
  switch (action.type) {
    case LEVEL_LIST_REQUEST:
      return { loading: true, levels: [] };

    case LEVEL_LIST_SUCCESS:
      return { loading: false, levels: action.payload };

    case LEVEL_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const programListReducer = (
  state = { level: { programs: [] } },
  action
) => {
  switch (action.type) {
    case PROGRAM_LIST_REQUEST:
      return { loading: true, ...state };

    case PROGRAM_LIST_SUCCESS:
      return { loading: false, level: action.payload };

    case PROGRAM_LIST_FAIL:
      return { loading: false, level: { programs: [] }, error: action.payload };
    case PROGRAM_LIST_RESET:
      return { level: { programs: [] } }; // intial state

    default:
      return state;
  }
};

export const programDetailReducer = (state = { program: {} }, action) => {
  switch (action.type) {
    case PROGRAM_DETAIL_REQUEST:
      return { loading: true, ...state };

    case PROGRAM_DETAIL_SUCCESS:
      return { loading: false, program: action.payload };

    case PROGRAM_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const levelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LEVEL_DELETE_REQUEST:
      return { loading: true };

    case LEVEL_DELETE_SUCCESS:
      return { loading: false, success: true };

    case LEVEL_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const levelCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEVEL_CREATE_REQUEST:
      return { loading: true };

    case LEVEL_CREATE_SUCCESS:
      return { loading: false, success: true, level: action.payload };

    case LEVEL_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case LEVEL_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const levelUpdateReducer = (state = { level: {} }, action) => {
  switch (action.type) {
    case LEVEL_UPDATE_REQUEST:
      return { loading: true };

    case LEVEL_UPDATE_SUCCESS:
      return { loading: false, success: true, level: action.payload };

    case LEVEL_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case LEVEL_UPDATE_RESET:
      return { level: {} };

    default:
      return state;
  }
};
