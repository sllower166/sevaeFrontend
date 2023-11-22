import { types } from "../types/types";

const initialState = {
  report: [],
  loading: false,
  error: null,
};

export const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.generateReport:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.generateReportSuccess:
      return {
        ...state,
        report: action.payload,
        loading: false,
        error: null,
      };

    case types.generateReportError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
