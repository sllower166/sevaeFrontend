import { types } from "../types/types";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getStudents:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.getStudentsSuccess:
      return {
        ...state,
        students: action.payload,
        loading: false,
        error: null,
      };

    case types.getStudentsError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.createStudent:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.createStudentSuccess:
      return {
        ...state,
        students: [...state.students, action.payload],
        loading: false,
        error: null,
      };

    case types.createStudentError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.updateStudent:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.updateStudentSuccess:
      const updatedStudents = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
      return {
        ...state,
        students: updatedStudents,
        loading: false,
        error: null,
      };

    case types.updateStudentError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.deleteStudent:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.deleteStudentSuccess:
      const filteredStudents = state.students.filter(
        (student) => student.id !== action.payload
      );
      return {
        ...state,
        students: filteredStudents,
        loading: false,
        error: null,
      };

    case types.deleteStudentError:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
