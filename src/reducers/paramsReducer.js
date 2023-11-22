import { types } from "../types/types";

const initialState = {
  nombreIE: "",
  horaIngreso: "",
  horaSalida: "",
};

export const paramsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setSchoolParams:
      return {
        ...action.payload,
      };

    case types.updateSchoolParams:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
