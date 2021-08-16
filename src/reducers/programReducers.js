
import {
  PROGRAM_DETAIL_REQUEST,
  PROGRAM_DETAIL_SUCCESS,
  PROGRAM_DETAIL_FAIL,
  PROGRAM_LIST_REQUEST,
  PROGRAM_LIST_SUCCESS,
  PROGRAM_LIST_FAIL,
  
} from "../constants/programConstants";
// export above constants from the separate file

export const programListReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case PROGRAM_LIST_REQUEST:
      return { loading: true, programs: [] };

    case PROGRAM_LIST_SUCCESS:
      return { loading: false, programs: action.payload };

    case PROGRAM_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};




export const programDetailReducer = (state = { program: {} }, action) => {
    switch (action.type) {
      case PROGRAM_DETAIL_REQUEST:
        return { loading: true, ...state};
  
      case PROGRAM_DETAIL_SUCCESS:
        return { loading: false, program: action.payload };
  
      case PROGRAM_DETAIL_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
